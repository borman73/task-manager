/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Task from 'components/Task';
import TaskPresenter from 'presenters/TaskPresenter';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import ColumnHeader from 'components/ColumnHeader';
import TaskForm from 'forms/TaskForm';
import useTasks from 'hooks/store/useTasks';
import useStyles from './useStyles';

const MODES = {
  ADD: 'add',
  EDIT: 'edit',
  NONE: 'none',
};

const TaskBoard = () => {
  const {
    board,
    loadBoard,
    loadColumn,
    taskLoad,
    loadColumnMore,
    taskCreate,
    taskUpdate,
    taskDestroy,
    uploadImage,
    removeImage,
  } = useTasks();
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const styles = useStyles();

  useEffect(() => {
    loadBoard();
  }, []);

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const handleLoadColumnMore = (state, page = 1, perPage = 10) => {
    loadColumnMore(state, page, perPage);
  };

  const handleCardDragEnd = (task, source, destination) => {
    const transition = TaskPresenter.transitions(task).find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return taskUpdate(task, { stateEvent: transition.event })
      .then(() => {
        loadColumn(source.fromColumnId);
        loadColumn(destination.toColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`);
      });
  };

  const handleTaskCreate = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);

    return taskCreate(attributes).then(({ data: { task } }) => {
      loadColumn(TaskPresenter.state(task));
      setMode(MODES.NONE);
    });
  };

  const handleTaskLoad = (id) => taskLoad(id);

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return taskUpdate(task, attributes).then(() => {
      loadColumn(TaskPresenter.state(task));
      handleClose();
    });
  };

  const handleTaskDestroy = (task) =>
    taskDestroy(task).then(() => {
      loadColumn(TaskPresenter.state(task));
      handleClose();
    });

  const handleAttachImage = (task, attachment) =>
    uploadImage(task, attachment).then(() => {
      handleClose();
    });

  const handleRemoveImage = (task) =>
    removeImage(task).then(() => {
      handleClose();
    });

  return (
    <>
      <Fab onClick={handleOpenAddPopup} className={styles.addButton} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <KanbanBoard
        disableColumnDrag
        onCardDragEnd={handleCardDragEnd}
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={handleLoadColumnMore} />}
        renderCard={(card) => <Task onClick={handleOpenEditPopup} task={card} />}
      >
        {board}
      </KanbanBoard>

      {mode === MODES.ADD && <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />}
      {mode === MODES.EDIT && (
        <EditPopup
          onCardLoad={handleTaskLoad}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onAttachImage={handleAttachImage}
          onRemoveImage={handleRemoveImage}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}
    </>
  );
};

export default TaskBoard;
