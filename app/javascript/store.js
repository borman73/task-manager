import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from 'slices/TasksSlice';

const store = configureStore({
  reducer: {
    tasksSlice,
  },
});

export default store;
