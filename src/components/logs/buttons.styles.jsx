import styled from 'styled-components';

export const BaseButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #91ee99;
  color: #91ee99;
  padding: 1px 20px;
  font-family: 'Roboto Mono', monospace;
  :hover {
    background-color: #91ee99;
    color: #000;
  }
  :active {
    background-color: #fff;
  }
`;


export const AddButton = styled(BaseButton)`
border: 1px solid #5ca4f2;
color: #5ca4f2;
:hover {
    background-color: #6088ff;

  }
  
`

export const DeleteButton = styled(BaseButton)`
border: 1px solid #f2635c;
color: #f2635c;
:hover {
    background-color: #ff6060;

  }
`