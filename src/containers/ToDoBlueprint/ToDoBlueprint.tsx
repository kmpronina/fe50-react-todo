import React, { useEffect } from 'react';
import { useState } from 'react';
import { Task } from '../../../models/Task.ts';
import { ToDoBlueprintStyled } from './ToDoBluprintStyled.ts';
import { Button } from '../../components/Button/Button.tsx';
import { Input } from '../../components/Input/Input.tsx';
// import { TasksContext } from '../../components/store/context';

interface Props {
  onCreateTask: (newTask: Task) => void;
}

const ToDoBlueprint: React.FC<Props> = (props) => {
  const { onCreateTask } = props;

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeInput = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleClick = () => {
    const newTask: Task = {
      text: inputValue,
      id: new Date().valueOf(),
      completed: false,
    };
    onCreateTask(newTask);
  };

  useEffect(() => {
    setIsButtonDisabled(!inputValue.length);
  }, [inputValue]);

  return (
    <ToDoBlueprintStyled>
      <Input placeholder={'Your title'} onChange={handleChangeInput} />
      <Button onClick={handleClick} disable={isButtonDisabled}>
        Submit
      </Button>
    </ToDoBlueprintStyled>
  );
};

export default ToDoBlueprint;
