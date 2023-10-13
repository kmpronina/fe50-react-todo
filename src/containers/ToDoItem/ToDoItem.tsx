import React, { useContext, useState } from 'react';
import { Button } from '../../components/Button/Button.tsx';
import { TasksContext } from '../../components/store/context.ts';
import { Task } from '../../models/Task.ts';
import { ToDoItemStyled, Text, CheckBox, Label } from './ToDoItemStyled.ts';
import { Input } from '../../components/Input/Input.tsx';

interface Props {
  task: Task;
  onSave: (id: number, editedText: string) => void;
}

const ToDoItem: React.FC<Props> = (props) => {
  const { task, onSave } = props;
  const { tasks, activeTaskId, setActiveTaskId, deletedTasks } =
    useContext(TasksContext);
  const [completed, setCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const handleClickTask = () => {
    setActiveTaskId(task.id);
  };

  const changeCompletedStatus = () => {
    task.completed = !task.completed;
    setCompleted(task.completed);
    console.log(task);
  };

  const deleteThisTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    deletedTasks.push(tasks[index]);
    console.log(deletedTasks);
    tasks.splice(index, 1);
  };

  const editThisTask = (id) => {
    console.log(id);
    setIsEditing(true);
  };

  const saveEditedTitle = (task) => {
    setIsEditing(false);
  };

  const changeTitleHandler = (editedText, task) => {
    setEditedText(editedText);
  };

  return (
    <ToDoItemStyled
      onClick={handleClickTask}
      style={{
        border: `1px solid ${activeTaskId === task.id ? '#002D62' : '#72A0C1'}`,
      }}
    >
      {isEditing ? (
        <div>
          <Input
            placeholder="Edit your title"
            value={editedText}
            onChange={(editedText) => changeTitleHandler(editedText, task)}
          />
          <Button onClick={() => saveEditedTitle(task)}>Save</Button>
        </div>
      ) : (
        <Text>{`${editedText ? editedText : task.text}`}</Text>
      )}
      <Label for="complete">
        Complete
        <CheckBox
          type="checkbox"
          name="complete"
          onClick={() => changeCompletedStatus()}
        />
      </Label>
      <div>
        <Button onClick={() => deleteThisTask(task.id)}>Delete</Button>
        <Button onClick={() => editThisTask(task.id)}>Edit</Button>
      </div>
    </ToDoItemStyled>
  );
};

export default ToDoItem;
