import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../models/Task.ts';

type TaskReducerStateType = {
  tasks: Task[];
  activeTaskId: number | undefined;
};

const taskReducer = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    activeTaskId: undefined,
  } as TaskReducerStateType,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setActiveTaskId: (state, action) => {
      state.activeTaskId = action.payload;
    },
  },
});

export const { setTasks, setActiveTaskId } = taskReducer.actions;

export default taskReducer.reducer;
