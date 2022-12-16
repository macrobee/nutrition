import styled from "styled-components";

export const Input = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #91ee99;
  padding: 2px 20px;
  color: #91ee99;
  ::placeholder {
    color: #91ee99;
    text-decoration: none;
    opacity: 0.5;
    text-align: center;
  }
  :hover {
    background-color: rgba(200, 255, 200, 0.2);
  }
`;
