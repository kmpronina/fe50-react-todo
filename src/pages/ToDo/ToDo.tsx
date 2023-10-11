import React, { useEffect, useState } from 'react';
import { Task } from './models/Task.tsx';
import { TasksContext } from '../../components/store/context.ts';
import Header from '../../containers/Header/Header.tsx';
import ToDoBlueprint from '../../containers/ToDoBlueprint/ToDoBlueprint.tsx';
import ToDoList from '../../containers/ToDoLIst/ToDoList.tsx';
import { ReturnDeletedTasksButton } from '../../components/ReturnDeletedTasksButton/ReturnDeletedTasksButton.tsx';

const ToDo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<number | undefined>(
    undefined
  );
  const handleCreateNewTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleChangeActiveId = (newId: number | undefined) => {
    setActiveTaskId(newId);
  };
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  return (
    <>
      <Header />
      <TasksContext.Provider
        value={{
          tasks: tasks,
          activeTaskId: activeTaskId,
          setActiveTaskId: handleChangeActiveId,
          deletedTasks: deletedTasks,
        }}
      >
        <ToDoBlueprint onCreateTask={handleCreateNewTask} />

        <ToDoList tasks={tasks} />
        <ReturnDeletedTasksButton>
          Return <br /> Deleted <br /> Tasks
        </ReturnDeletedTasksButton>
      </TasksContext.Provider>
    </>
  );
};

export default ToDo;
