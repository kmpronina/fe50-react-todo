import React, { ReactNode, useContext } from 'react';
import { TasksContext } from '../store/context.ts';
import { Task } from '../../models/Task.ts';
import { ReturnDeletedTasksButtonStyled } from './ReturnDeletedTasksButtonStyled.ts';

interface Props {
  onClick: () => void;
  disable: boolean;
  children: ReactNode;
}

export const ReturnDeletedTasksButton: React.FC<Props> = (props) => {
  const { children, disable, onClick } = props;
  const { tasks, deletedTasks, setDeletedTask } = useContext(TasksContext);

  const handleClick = () => {
    console.log(deletedTasks);
  };

  return (
    <ReturnDeletedTasksButtonStyled onClick={handleClick} disabled={disable}>
      {children}
    </ReturnDeletedTasksButtonStyled>
  );
};
