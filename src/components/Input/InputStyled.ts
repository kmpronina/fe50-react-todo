import styled from 'styled-components';

interface IProps {
  ref?: any;
}

export const InputWrapper = styled.div`
  width: 75%;
  margin: auto;
`;

export const InputStyled = styled.input<IProps>`
  width: 350px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  padding: 6px 12px;
  transition: all 0.3s ease-in-out;
`;
