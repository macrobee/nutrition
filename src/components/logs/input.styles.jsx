import styled from "styled-components";

export const SearchLabel = styled.label`
  color: #91ee99;
`;

export const SearchInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #91ee99;
  color: #91ee99;
  ::placeholder {
    color: #91ee99;
    text-decoration: none;
    opacity: 0.5;
  }
`;

export const SearchButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #91ee99;
  color: #91ee99;
  padding: 1px 20px;
  :hover {
    background-color: #91ee99;
    color: #000;
  }
  :active {
    background-color: #fff;
  }
`;
