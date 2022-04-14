import { StyledProgressBar } from "./StyledProgressBar";

const ProgressBar = ({ completed }) => {
  return (
    <StyledProgressBar completed={completed}>
      <div className="progress-indicator"></div>
    </StyledProgressBar>
  );
};

export default ProgressBar;
