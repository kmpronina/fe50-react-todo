import { Task } from '../../../models/Task';
import { ToDosReducerEnum } from './actionTypes';

export const setToDoToStore = (todos: Task[]) => {
  return { type: ToDosReducerEnum.SET_TODO, todos };
};
