import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';
import { STATES } from 'presenters/TaskPresenter';

const useTasks = () => {
  const board = useSelector((state) => state.tasksSlice.board);
  const { loadColumn, loadColumnMore, taskCreate, taskLoad, taskUpdate, taskDestroy } = useTasksActions();
  const loadBoard = () => Promise.all(STATES.map(({ key }) => loadColumn(key)));

  return {
    board,
    loadBoard,
    loadColumn,
    loadColumnMore,
    taskCreate,
    taskLoad,
    taskUpdate,
    taskDestroy,
  };
};

export default useTasks;
