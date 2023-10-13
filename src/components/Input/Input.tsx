import React, { BaseSyntheticEvent, useState } from 'react';
// import { TasksContext } from '../../components/store/context.ts';
import { InputStyled, InputWrapper } from './InputStyled.ts';

interface Props {
  onChange: (newValue: string) => void;
}

export const Input: React.FC<Props> = (props) => {
  const { onChange } = props;
  // const { setActiveTaskId } = useContext(TasksContext);

  const [value, setValue] = useState<string>('');

  const handleChange = (event: BaseSyntheticEvent) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  // const handleFocus = () => {
  //   setActiveTaskId(undefined);
  // };
  return (
    <InputWrapper>
      <InputStyled value={value} onChange={handleChange} />
    </InputWrapper>
  );
};
