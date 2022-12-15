import styled from "styled-components";

export const InnerBar = styled.div`
  width: ${(props) => props.progress}%;
  background-color: rgb(145, 238, 153);
  height: 20px;
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
`;

// color: rgb(145, 238, 153);

export const OuterBar = styled.div`
  border: 1px solid rgb(145, 238, 153);
  padding: 0;
  height: 20px;
  color: #0d0e14;
  box-sizing: border-box;
  overflow: hidden;

  position: relative;
`;

export const ProgressNumber = styled.span`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 0;
  color: ${(props) => (props.progress >= 60 ? "black" : "white")};
`;
