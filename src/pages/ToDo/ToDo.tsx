import React, { useContext, useState } from 'react';
import { Task } from './models/Task.tsx';
// import { TasksContext } from '../../store/context.ts';
import Header from '../../containers/Header/Header.tsx';
import ToDoBlueprint from '../../containers/ToDoBlueprint/ToDoBlueprint.tsx';
import ToDoList from '../../containers/ToDoLIst/ToDoList.tsx';
import { ReturnDeletedTasksButton } from '../../components/ReturnDeletedTasksButton/ReturnDeletedTasksButton.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { setTasks } from '../../store/reducers/taskReducer/index.ts';
import { Box, Button } from '@mui/material';

const ToDo = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);

  // const [activeTaskId, setActiveTaskId] = useState<number | undefined>(
  //   undefined
  // );
  // const handleCreateNewTask = (newTask: Task) => {
  //   setTasks([...tasks, newTask]);
  // };
  // const handleChangeActiveId = (newId: number | undefined) => {
  //   setActiveTaskId(newId);
  // };
  // const { deletedTasks } = useContext(TasksContext);
  // const returnDeletedTasks = () => {
  //   if (deletedTasks.length) {
  //     const index = deletedTasks.length;
  //     setTasks([...tasks, deletedTasks[index - 1]]);
  //     deletedTasks.pop();
  //   }
  // };
  const { tasks } = useAppSelector((state) => state.taskReducer);
  const dispatch = useAppDispatch();
  const [showExecutorlessTasks, setShowExecutorlessTasks] =
    useState<boolean>(false);

  const handleCreateNewTask = (newTask: Task) => {
    dispatch(setTasks([...tasks, newTask]));
  };

  const showCurrentTasks = () => {
    console.log(tasks);
  };

  const handleShowExecutorlessTask = () => {
    setShowExecutorlessTasks(!showExecutorlessTasks);
  };

  return (
    <>
      <Header />
      {/* <TasksContext.Provider
        value={{
          tasks: tasks,
          activeTaskId: activeTaskId,
          setActiveTaskId: handleChangeActiveId,
          deletedTasks: deletedTasks,
        }}
      > */}
      <ToDoBlueprint onCreateTask={handleCreateNewTask} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={showCurrentTasks}>Log current tasks</Button>
        <Button onClick={handleShowExecutorlessTask}>
          {!showExecutorlessTasks
            ? 'Show tasks without executor'
            : 'Show all tasks'}
        </Button>
      </Box>
      {showExecutorlessTasks ? (
        <ToDoList tasks={tasks.filter((task) => task.userName === undefined)} />
      ) : (
        <ToDoList tasks={tasks} />
      )}

      {/* </ReturnDeletedTasksButton> */}
      {/* </TasksContext.Provider> */}
    </>
  );
};

export default ToDo;
