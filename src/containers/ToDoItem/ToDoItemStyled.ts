import styled from 'styled-components';

export const ToDoItemStyled = styled.div`
  width: 500px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  transition: 0.2s;
  & > button {
    margin: 10px;
  }
`;

export const Text = styled.p`
  margin: 0.5rem;
  color: gray;
`;

export const CheckBox = styled.input``;

export const Label = styled.label`
  margin: 10px;
  color: #002d62;
`;
