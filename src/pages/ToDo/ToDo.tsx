import React, { useContext, useState } from 'react';
import { Task } from './models/Task.tsx';
import { TasksContext } from '../../store/context.ts';
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
  const { deletedTasks } = useContext(TasksContext);
  const returnDeletedTasks = () => {
    if (deletedTasks.length) {
      const index = deletedTasks.length;
      setTasks([...tasks, deletedTasks[index - 1]]);
      deletedTasks.pop();
    }
  };

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
        <ReturnDeletedTasksButton onClick={returnDeletedTasks}>
          Return <br /> last deleted <br /> task
        </ReturnDeletedTasksButton>
      </TasksContext.Provider>
    </>
  );
};

export default ToDo;
