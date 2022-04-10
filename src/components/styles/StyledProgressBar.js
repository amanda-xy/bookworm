import styled from "styled-components";

export const StyledProgressBar = styled.div`
  height: 7px;
  width: 100%;
  background-color: #b6b6b6;
  border-radius: 50px;
  overflow: hidden;

  .progress-indicator {
    height: 100%;
    width: ${(props) => props.completed}%;
    background-color: #fbd661;
    border-radius: inherit;
    text-align: right;
  }
`;
