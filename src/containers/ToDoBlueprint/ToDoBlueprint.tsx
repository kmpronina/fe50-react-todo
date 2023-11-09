import React, { BaseSyntheticEvent, useEffect } from 'react';
import { useState } from 'react';
import { Task } from '../../../models/Task.ts';
import { ToDoBlueprintStyled } from './ToDoBluprintStyled.ts';
import { Button } from '../../components/Button/Button.tsx';
// import { Input } from '../../components/Input/Input.tsx';
import { TextField } from '@mui/material';
// import { TasksContext } from '../../components/store/context';

interface Props {
  onCreateTask: (newTask: Task) => void;
}

const ToDoBlueprint: React.FC<Props> = (props) => {
  const { onCreateTask } = props;

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeInput = (event: BaseSyntheticEvent) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    const newTask: Task = {
      label: inputValue,
      id: new Date().valueOf(),
      completed: false,
      userName: undefined,
      userId: undefined,
    };
    onCreateTask(newTask);
    setInputValue('');
  };

  useEffect(() => {
    setIsButtonDisabled(!inputValue.length);
  }, [inputValue]);

  return (
    <ToDoBlueprintStyled>
      <TextField
        type="text"
        label={'Add your task here'}
        fullWidth
        value={inputValue}
        onChange={handleChangeInput}
      />
      <Button onClick={handleClick} disable={isButtonDisabled}>
        Submit
      </Button>
    </ToDoBlueprintStyled>
  );
};

export default ToDoBlueprint;
