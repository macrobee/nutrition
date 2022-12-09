import styled from "styled-components";

export const Input = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #91ee99;
  color: #91ee99;
  ::placeholder {
    color: #91ee99;
    text-decoration: none;
    opacity: 0.5;
  }
  :hover {
    background-color: rgba(200, 255, 200, 0.2);
  }
`;
