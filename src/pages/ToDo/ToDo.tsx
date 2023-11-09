import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Task } from './models/Task.ts';
import { User } from './models/User.ts';
import { Post } from './models/Post.ts';
// import { TasksContext } from '../../store/context.ts';
import Header from '../../containers/Header/Header.tsx';
import ToDoBlueprint from '../../containers/ToDoBlueprint/ToDoBlueprint.tsx';
import ToDoList from '../../containers/ToDoLIst/ToDoList.tsx';
// import { ReturnDeletedTasksButton } from '../../components/ReturnDeletedTasksButton/ReturnDeletedTasksButton.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getUsersDataAction } from '../../store/reducers/usersReducer/actions.ts';
import { getPostsDataAction } from '../../store/reducers/postReducer/actions.ts';
import { setTasks } from '../../store/reducers/taskReducer/index.ts';
import { Box, Button, List, Paper, ListItem, TextField } from '@mui/material';
import PostList from '../../containers/PostList/PostList.tsx';
import { UserName } from '../../components/UserName/UserName.tsx';
import { UserCard } from '../../containers/UserCard/UserCard.tsx';

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
  const { users } = useAppSelector((state) => state.usersReducer);
  const { posts } = useAppSelector((state) => state.postReducer);

  const dispatch = useAppDispatch();

  const [showExecutorlessTasks, setShowExecutorlessTasks] =
    useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<boolean>(false);
  const [selectedUserLabel, setSelectedUserLabel] = useState<
    string | undefined
  >(undefined);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined
  );
  const [searcAllLabelsValue, setSearcAllLabelsValue] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    dispatch(getUsersDataAction());
    dispatch(getPostsDataAction());
  }, []);

  const handleCreateNewTask = (newTask: Task) => {
    setSearcAllLabelsValue('');
    setUserSelected(false);
    setShowExecutorlessTasks(false);
    setSelectedUserLabel(undefined);
    setSelectedUserId(undefined);
    dispatch(setTasks([...tasks, newTask]));
  };

  const showCurrentTasks = () => {
    console.log(tasks);
  };

  const handleShowExecutorlessTask = () => {
    setShowExecutorlessTasks(!showExecutorlessTasks);
    setSearcAllLabelsValue('');
    setUserSelected(false);
    setSelectedUserLabel(undefined);
    setSelectedUserId(undefined);
  };

  const handleSelectUser = (userLabel: string, userId: number) => {
    console.log('selected user label', userLabel);
    setSelectedUserId(userId);
    // if (userLabel === selectedUserLabel) {
    //   setUserSelected(false);
    //   setShowExecutorlessTasks(false);
    //   setSelectedUserLabel(undefined);
    //   setSelectedUserId(undefined);
    // } else {
    setSearcAllLabelsValue('');
    setSelectedUserLabel(userLabel);
    setShowExecutorlessTasks(false);
    setUserSelected(true);
    // }
  };

  const handleCloseSelectedUser = () => {
    setSearcAllLabelsValue('');
    setUserSelected(false);
    setShowExecutorlessTasks(false);
    setSelectedUserLabel(undefined);
    setSelectedUserId(undefined);
  };

  const handleSearcAllLabels = (event: BaseSyntheticEvent) => {
    setUserSelected(false);
    setShowExecutorlessTasks(false);
    setSelectedUserLabel(undefined);
    setSelectedUserId(undefined);
    setSearcAllLabelsValue(event.target.value);
    console.log('search value for all labels', searcAllLabelsValue);
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
      <Box sx={{ padding: '15px' }}>
        <TextField
          variant="outlined"
          value={searcAllLabelsValue}
          label={'Search for all labels'}
          sx={{ width: '500px' }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSearcAllLabels(event)
          }
        />
      </Box>
      <Box sx={{ padding: '15px' }}>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}
        >
          {searcAllLabelsValue ? (
            <ToDoList
              tasks={tasks.filter(
                (task: Task) => task.label === searcAllLabelsValue
              )}
            />
          ) : showExecutorlessTasks ? (
            <ToDoList
              tasks={tasks.filter((task: Task) => task.userName === undefined)}
            />
          ) : userSelected ? (
            <ToDoList
              tasks={tasks.filter(
                (task: Task) => task.userName === selectedUserLabel
              )}
            />
          ) : (
            <ToDoList tasks={tasks} />
          )}

          <Box
            sx={{
              width: '45%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {searcAllLabelsValue ? (
                <List>
                  {users
                    .filter((user: User) => user.label === searcAllLabelsValue)
                    .map((user: User) => (
                      <ListItem
                        sx={{
                          display: 'flex',
                          flexDiraction: 'row',
                          alignItems: 'center',
                          gap: '5px',
                          cursor: 'pointer',
                          // backgroundColor:
                          //   user.label === selecterUserLabel ? '#f0f8ff' : '',
                        }}
                        key={user.id}
                        onClick={() => handleSelectUser(user.label, user.id)}
                      >
                        <UserName name={user.label} />
                      </ListItem>
                    ))}
                </List>
              ) : !selectedUserId ? (
                <List>
                  {users.map((user: User) => (
                    <ListItem
                      sx={{
                        display: 'flex',
                        flexDiraction: 'row',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer',
                        // backgroundColor:
                        //   user.label === selecterUserLabel ? '#f0f8ff' : '',
                      }}
                      key={user.id}
                      onClick={() => handleSelectUser(user.label, user.id)}
                    >
                      <UserName name={user.label} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ padding: '10px' }} onClick={handleCloseSelectedUser}>
                  <UserName
                    name={
                      users.find((user: User) => user.id === selectedUserId)
                        .label
                    }
                  />
                  <UserCard
                    user={users.find(
                      (user: User) => user.id === selectedUserId
                    )}
                  />
                </Box>
              )}
            </Paper>
            <Paper>
              {searcAllLabelsValue ? (
                <PostList
                  posts={posts.filter(
                    (post: Post) => post.label === searcAllLabelsValue
                  )}
                />
              ) : selectedUserId ? (
                <PostList
                  posts={posts.filter(
                    (post: Post) => post.userId === selectedUserId
                  )}
                />
              ) : (
                <PostList posts={posts} />
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
      {/* </ReturnDeletedTasksButton> */}
      {/* </TasksContext.Provider> */}
    </>
  );
};

export default ToDo;
