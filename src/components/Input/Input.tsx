import React, { BaseSyntheticEvent, useRef, useState } from 'react';
// import { TasksContext } from '../../components/store/context.ts';
import { InputWrapper } from './InputStyled.ts';
import { IconButton, TextField as MuiTextField } from '@mui/material';

interface Props {
  onChange: (newValue: string) => void;
}

export const Input: React.FC<Props> = (props) => {
  const { onChange } = props;

  // const { setActiveTaskId } = useContext(TasksContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: BaseSyntheticEvent) => {
    setValue(event.target.value);
    if (inputRef.current === null) return;
    // console.log(inputRef.current.value)

    onChange(inputRef.current.value);
  };

  const [value, setValue] = useState<string>('');

  // const handleChange = (event: BaseSyntheticEvent) => {
  //   setValue(event.target.value);
  //   onChange(event.target.value);
  // };

  // const handleFocus = () => {
  //   setActiveTaskId(undefined);
  // };
  return (
    <InputWrapper>
      <MuiTextField
        label={'Add your task here'}
        fullWidth
        InputProps={{
          inputRef: inputRef,
          startAdornment: <IconButton></IconButton>,
        }}
        value={value}
        margin="normal"
        onChange={handleChange}
      />
    </InputWrapper>
  );
};
