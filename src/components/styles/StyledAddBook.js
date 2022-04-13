import styled from "styled-components";

export const StyledAddBook = styled.div`
  background-color: #fcfcfc;
  padding: 20px 20px 20px 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 10px 2px;
  border-radius: 10px;

  form {
    margin-top: 40px;

    .field {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      color: #b6b6b6;
      margin-bottom: 20px;
    }

    label {
      margin-bottom: 5px;
    }

    input,
    select,
    textarea {
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid #e8d2e9;
      font-size: 14px;
      font-weight: 600;
      font-family: Quicksand;

      &:active {
        border: 1px solid #e8d2e9;
        outline: none;
      }

      &:focus {
        outline: none;
        border: 1px solid #e8d2e9;
        background-color: #e8d2e9;
      }
    }

    textarea {
      resize: none;
    }
  }
`;
