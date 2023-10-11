import React from 'react';
import { ButtonStyled } from './ButtonStyled.ts';

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
    <ButtonStyled onClick={handleClick} disabled={disable}>
      {children}
    </ButtonStyled>
  );
};
