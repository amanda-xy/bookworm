import styled from "styled-components";

export const StyledBookDetails = styled.div`
  padding: 0px 100px;
  display: flex;
  flex-direction: column;

  .styled-book-details {
    display: flex;
    flex-direction: row;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    width: 65%;

    .description-container {
      background-color: #e8d2e9;
      padding: 20px 40px;
      border-radius: 10px;
      margin-top: 20px;

      .description {
        color: #251462;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }

  .side-container {
    display: flex;
    margin-left: 70px;
    width: 30%;
  }
`;
