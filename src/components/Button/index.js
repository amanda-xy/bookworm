import { StyledButton } from "./StyledButton";

const Button = ({ text, onClickHandler, className }) => {
  return (
    <StyledButton className={className} onClick={onClickHandler ? (e) => onClickHandler(e) : null}>
      {text}
    </StyledButton>
  );
};

export default Button;
