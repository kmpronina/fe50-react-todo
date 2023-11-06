import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button.tsx';
// import { TasksContext } from '../../store/context.ts';
import { Task } from '../../models/Task.ts';
import { Text, Label } from './ToDoItemStyled.ts';
import {
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Select,
  useRadioGroup,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Avatar,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/store.ts';
import { setTasks } from '../../store/reducers/taskReducer/index.ts';
import { getUsersDataAction } from '../../store/reducers/usersReducer/actions.ts';
import { User } from '../../models/User.ts';

interface Props {
  task: Task;
  // onSave: (id: number, editedText: string) => void;
}

const ToDoItem: React.FC<Props> = (props) => {
  const { task } = props;
  const { tasks } = useAppSelector((state) => state.taskReducer);
  const { users } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  // const { tasks, activeTaskId, setActiveTaskId, deletedTasks } =
  //   useContext(TasksContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTaksText, setNewTaksText] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  // const [addedUser, setAddedUser] = useState<string | null>(null);
  // const [taskIdToAddUser, setTaskIdToAddUser] = useState<number | null>(null);
  const [addingUserTaskId, setAddingUserTaskId] = useState<number | null>(null);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<string>('');

  useEffect(() => {
    dispatch(getUsersDataAction());
  }, []);

  // const handleClickTask = () => {
  //   setActiveTaskId(task.id);
  // };

  const changeCompletedStatus = () => {
    dispatch(
      setTasks(
        tasks.map((taskItem: Task) =>
          taskItem.id === task.id
            ? { ...taskItem, completed: !task.completed }
            : taskItem
        )
      )
    );
  };

  const deleteThisTask = (id: number) => {
    console.log(users);
    dispatch(
      setTasks(tasks.filter((taskItem: Task) => taskItem.id !== task.id))
    );
  };

  const handleOpenEditDialog = (taskId: number) => {
    setIsEditing(true);
    setEditingTaskId(taskId);
    setNewTaksText(tasks.find((task: Task) => task.id === taskId)?.text || '');
  };

  const handleChangeTaskText = (e: BaseSyntheticEvent) => {
    setNewTaksText(e.target.value);
  };

  const handleSaveNewTaskText = () => {
    const newTasks: Task[] = structuredClone(tasks);
    dispatch(
      setTasks(
        newTasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: newTaksText } : task
        )
      )
    );
    setIsEditing(false);
  };
  const handleShowSelectUser = (taskId: number) => {
    setShowSelect(true);
    setAddingUserTaskId(taskId);
  };

  const handleChooseUserToTask = (event: SelectChangeEvent) => {
    setNewUser(event.target.value as string);
    const newTasks: Task[] = structuredClone(tasks);
    dispatch(
      setTasks(
        newTasks.map((task) =>
          task.id === addingUserTaskId
            ? { ...task, userName: event.target.value }
            : task
        )
      )
    );
    setShowSelect(false);
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Paper
      sx={{ padding: '15px', width: '350px', marginBottom: '10px' }}
      // onClick={handleClickTask}
      // style={{
      //   border: `1px solid ${activeTaskId === task.id ? '#002D62' : '#72A0C1'}`,
      // }}
    >
      <Text>{`${task.text}`}</Text>
      <Label for="complete">
        <FormControlLabel
          control={
            <Checkbox
              checked={task.completed}
              onClick={() => changeCompletedStatus()}
            />
          }
          label="Complete"
        />
      </Label>

      <div>
        {task.userName === undefined ? (
          <Typography
            sx={{
              padding: '5px',
              width: '300px',
              height: '56px',
              border: '1px, solid, gray',
            }}
            onClick={() => handleShowSelectUser(task.id)}
          >
            {' '}
            <Avatar {...stringAvatar('X X')} />
            Choose an executor
          </Typography>
        ) : (
          <Text>
            <Avatar {...stringAvatar(`${task.userName}`)} />
            {`${task.userName}`}
          </Text>
        )}
        {showSelect && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newUser}
              label="User"
              onChange={handleChooseUserToTask}
            >
              {users.map((user) => (
                <MenuItem value={user.label} key={user.id}>
                  {user.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <div>
        <Button onClick={() => deleteThisTask(task.id)}>Delete</Button>
        <Button onClick={() => handleOpenEditDialog(task.id)}> Edit </Button>
      </div>

      <Dialog open={isEditing}>
        <DialogTitle>Change task text</DialogTitle>
        <DialogContent>
          <TextField value={newTaksText} onChange={handleChangeTaskText} />
        </DialogContent>
        <DialogActions>
          <Button variant={'text'} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button variant={'text'} onClick={() => handleSaveNewTaskText()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ToDoItem;
