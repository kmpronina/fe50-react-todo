import React from 'react';
import { Task } from '../../models/Task';
import ToDoItem from '../ToDoItem/ToDoItem.tsx';
import { ToDoListStyled } from './ToDoListStyled.ts';

interface Props {
  tasks: Task[];
}

const ToDoList: React.FC<Props> = (props) => {
  const { tasks } = props;
  return (
    <ToDoListStyled>
      {!!tasks.length
        ? tasks.map((task) => <ToDoItem task={task} key={task.id} />)
        : 'Tasks not founded:('}
    </ToDoListStyled>
  );
};

export default ToDoList;
