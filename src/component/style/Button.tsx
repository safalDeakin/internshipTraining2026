import styled, { keyframes } from "styled-components";

export const Button = styled.button`
  background: brown;
  color: white;
  padding: 4px;
  transition: all 0.3s ease;
  &:hover {
    background: pink;
    color: blue;
    transform: scale(1.05);
  }
`;

export const Thing = styled.div.attrs(() => ({ tabIndex: 0 }))`
  padding: 10px;
  color: red;
  &:hover {
    color: brown;
  }
  & ~ & {
    background: green;
  }

  & + & {
    background: tomato;
  }

  &.something {
    background: purple;
  }
  .something-else & {
    padding: 4px;
    border: 3px solid purple;
  }
`;

export const Searchinput = styled.input`
  width: 200px;
  height: 40px;
  outline: none;
  border: 1px solid gray;
  padding: 2px 1px;

  &::placeholder {
    color: #374151;
  }
  &:hover {
    border-color: blue;
  }
`;

export const Card = styled.div`
background:white;
padding:20px;
border-radius:12px,
box-shadow:0 2px 8px rgba (0,0,0,0.1);
transition:all 0.5s ease;
&:hover {
transform:translateY(-8px);
box-shadow:0 8px 20px rgba(0,0,0,0.15);
}
`;

const move = keyframes`
from{
transform:translateX(0)
}
to{
transform:translateY(50px)}
`;

export const Box = styled.div`
  width: 50px;
  height: 50px;
  background: gray;
  animation: ${move} 2s ease-in-out infinite alternate;
`;

const rotate = keyframes`
from{
transform:rotate(0deg)
}
to{
transform:rotate(360deg)
`;

export const Boxes = styled.div`
  width: 50px;
  height: 50px;
  background: gray;
  animation: ${rotate} 2s linear infinite;
`;
