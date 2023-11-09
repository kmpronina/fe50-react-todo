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
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Avatar,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useAppSelector, useAppDispatch } from '../../store/store.ts';
import { setTasks } from '../../store/reducers/taskReducer/index.ts';
import { getUsersDataAction } from '../../store/reducers/usersReducer/actions.ts';
import { User } from '../../models/User.ts';
import { UserName } from '../../components/UserName/UserName.tsx';

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

  const deleteThisTask = (taskId: number) => {
    dispatch(
      setTasks(tasks.filter((taskItem: Task) => taskItem.id !== taskId))
    );
  };

  const handleOpenEditDialog = (taskId: number) => {
    setIsEditing(true);
    setEditingTaskId(taskId);
    setNewTaksText(tasks.find((task: Task) => task.id === taskId)?.label || '');
  };

  const handleChangeTaskText = (e: BaseSyntheticEvent) => {
    setNewTaksText(e.target.value);
  };

  const handleSaveNewTaskText = () => {
    const newTasks: Task[] = structuredClone(tasks);
    dispatch(
      setTasks(
        newTasks.map((task) =>
          task.id === editingTaskId ? { ...task, label: newTaksText } : task
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

  return (
    <Paper
      sx={{ padding: '15px', width: '350px', marginBottom: '10px' }}
      // onClick={handleClickTask}
      // style={{
      //   border: `1px solid ${activeTaskId === task.id ? '#002D62' : '#72A0C1'}`,
      // }}
    >
      <Text>{`${task.label}`}</Text>
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
              width: '300px',
              height: '56px',
              display: 'flex',
              flexDiraction: 'row',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleShowSelectUser(task.id)}
          >
            <Avatar sx={{ bgcolor: 'gray' }}>
              <PersonAddAlt1Icon />
            </Avatar>
            Choose an executor
          </Typography>
        ) : (
          <UserName name={task.userName} />
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
              {users.map((user: User) => (
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
