import React from 'react';
// import { ButtonStyled } from './ButtonStyled.ts';
import { Button as MuiButton } from '@mui/material';

interface Props {
  onClick: () => void;
  disable: boolean;
  children: string;
}

export const Button: React.FC<Props> = (props) => {
  const { children, disable, onClick } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <MuiButton onClick={handleClick} disabled={disable}>
      {children}
    </MuiButton>
  );
};
