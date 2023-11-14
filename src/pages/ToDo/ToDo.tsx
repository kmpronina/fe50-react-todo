import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Task } from './models/Task.ts';
import { User } from './models/User.ts';
import { Post } from './models/Post.ts';
import Header from '../../containers/Header/Header.tsx';
import ToDoBlueprint from '../../containers/ToDoBlueprint/ToDoBlueprint.tsx';
import ToDoList from '../../containers/ToDoLIst/ToDoList.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getUsersDataAction } from '../../store/reducers/usersReducer/actions.ts';
import { getPostsDataAction } from '../../store/reducers/postReducer/actions.ts';
import { setTasks } from '../../store/reducers/taskReducer/index.ts';
import { Box, Button, List, Paper, ListItem, TextField } from '@mui/material';
import PostList from '../../containers/PostList/PostList.tsx';
import { UserName } from '../../components/UserName/UserName.tsx';
import { UserCard } from '../../containers/UserCard/UserCard.tsx';
import { useDebounce } from '../../hooks/useDebounce.tsx';
import { setSearchValueToStore } from '../../store/reducers/searchValueReducer/actions.ts';

const ToDo = () => {
  const { tasks } = useAppSelector((state) => state.taskReducer);
  const { users } = useAppSelector((state) => state.usersReducer);
  const { posts } = useAppSelector((state) => state.postReducer);
  const { searchValue } = useAppSelector((state) => state.searchValueReducer);

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
  const [searcAllLabelsValue, setSearcAllLabelsValue] = useState<string>('');

  useEffect(() => {
    dispatch(getUsersDataAction());
    dispatch(getPostsDataAction());
  }, []);

  const debouncedValue = useDebounce(searcAllLabelsValue);

  useEffect(() => {
    dispatch(setSearchValueToStore(debouncedValue));
  }, [debouncedValue]);

  const resetInteraction = () => {
    setSearcAllLabelsValue('');
    setUserSelected(false);
    setShowExecutorlessTasks(false);
    setSelectedUserLabel(undefined);
    setSelectedUserId(undefined);
  };

  const handleCreateNewTask = (newTask: Task) => {
    resetInteraction();
    dispatch(setTasks([newTask, ...tasks]));
  };

  const showCurrentTasks = () => {
    console.log(tasks);
    console.log(debouncedValue, 'debouncedValue');
    console.log(searchValue, 'searchValue');
  };

  const handleShowExecutorlessTask = () => {
    setShowExecutorlessTasks((prevstate) => !prevstate);
    setSearcAllLabelsValue('');
    setUserSelected(false);
    setSelectedUserLabel(undefined);
    setSelectedUserId(undefined);
  };

  const handleSelectUser = (userLabel: string, userId: number) => {
    console.log('selected user label', userLabel);
    setSelectedUserId(userId);
    setSearcAllLabelsValue('');
    setSelectedUserLabel(userLabel);
    setShowExecutorlessTasks(false);
    setUserSelected(true);
  };

  const handleSearcAllLabels = (event: BaseSyntheticEvent) => {
    resetInteraction();
    setSearcAllLabelsValue(event.target.value);
  };

  return (
    <>
      <Header />
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
          <ToDoList
            tasks={tasks.filter((task: Task) =>
              debouncedValue
                ? task.label
                    .toLowerCase()
                    .includes(debouncedValue.toLowerCase())
                : showExecutorlessTasks
                ? task.userName === undefined
                : userSelected
                ? task.userName === selectedUserLabel
                : tasks
            )}
          />
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
              {debouncedValue ? (
                <List>
                  {users
                    .filter((user: User) =>
                      user.label
                        .toLowerCase()
                        .includes(debouncedValue.toLowerCase())
                    )
                    .map((user: User) => (
                      <ListItem
                        sx={{
                          display: 'flex',
                          flexDiraction: 'row',
                          alignItems: 'center',
                          gap: '5px',
                          cursor: 'pointer',
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
                      }}
                      key={user.id}
                      onClick={() => handleSelectUser(user.label, user.id)}
                    >
                      <UserName name={user.label} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ padding: '10px' }} onClick={resetInteraction}>
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
              <PostList
                posts={posts.filter((post: Post) =>
                  debouncedValue
                    ? post.label
                        .toLowerCase()
                        .includes(debouncedValue.toLowerCase())
                    : selectedUserId
                    ? post.userId === selectedUserId
                    : posts
                )}
              />
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ToDo;
