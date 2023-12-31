import styled from 'styled-components';

export const ReturnDeletedTasksButtonStyled = styled.button<{ disable }>`
  all: unset;
  position: sticky;
  bottom: 50px;
  left: 80%;
  cursor: pointer;
  background-color: ${({ disable }) =>
    disable === false ? '#fff' : '#002d62'};
  color: #fff;
  padding: 20px;
  border-radius: 50%;
  text-align: center;
`;
