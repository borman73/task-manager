import { propEq } from 'ramda';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';

import TasksRepository from 'repositories/TasksRepository';
import TaskPresenter, { STATES } from 'presenters/TaskPresenter';

const initialState = {
  board: {
    columns: STATES.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });

      return state;
    },

    loadColumnMoreSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: [...column.cards, ...items],
        meta,
      });

      return state;
    },
  },
});

const { loadColumnSuccess, loadColumnMoreSuccess } = tasksSlice.actions;

export default tasksSlice.reducer;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadColumn = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state, s: 'id desc' },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state, s: 'id desc' },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnMoreSuccess({ ...data, columnId: state }));
    });
  };

  const taskCreate = (attributes) => TasksRepository.create(attributes);

  const taskLoad = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  const taskUpdate = (task, attributes) => TasksRepository.update(TaskPresenter.id(task), attributes);

  const taskDestroy = (task) => TasksRepository.destroy(TaskPresenter.id(task));

  const uploadImage = (task, attachment) => TasksRepository.attachImage(task.id, attachment);

  const removeImage = (task) => TasksRepository.removeImage(task.id);

  return {
    loadColumn,
    loadColumnMore,
    taskCreate,
    taskLoad,
    taskUpdate,
    taskDestroy,
    uploadImage,
    removeImage,
  };
};
