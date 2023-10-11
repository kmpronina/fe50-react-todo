import React, { useContext, useState } from 'react';
import { Button } from '../../components/Button/Button.tsx';
import { TasksContext } from '../../components/store/context.ts';
import { Task } from '../../models/Task.ts';
import { ToDoItemStyled, Text, CheckBox, Label } from './ToDoItemStyled.ts';

interface Props {
  task: Task;
}

const ToDoItem: React.FC<Props> = (props) => {
  const { task } = props;
  const { tasks, activeTaskId, setActiveTaskId, deletedTasks } =
    useContext(TasksContext);
  const [completed, setCompleted] = useState(false);

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

  return (
    <ToDoItemStyled
      onClick={handleClickTask}
      style={{
        border: `1px solid ${activeTaskId === task.id ? '#002D62' : '#72A0C1'}`,
      }}
    >
      <Text>{`${task.text}`}</Text>
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
        <Button>Edit</Button>
      </div>
    </ToDoItemStyled>
  );
};

export default ToDoItem;
