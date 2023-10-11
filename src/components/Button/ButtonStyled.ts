import styled from 'styled-components';

export const ButtonStyled = styled.button`
  border-radius: 4px;
  width: 75px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  background-color: #72a0c1;
  border: 1px solid #72a0c1;
  color: #fff;
  margin: 5px;
  &:hover {
    background-color: #191970;
    border-color: #191970;
    color: #f0f8ff;
  }
`;
