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
      position: relative;

      .description {
        color: #251462;
        font-weight: 600;
        font-size: 16px;
      }

      .book-image {
        position: absolute;
        left: 60%;
        bottom: -320px;
        height: 350px;
        border-radius: 10px;
      }
    }

    .book-info {
    }
  }

  .side-container {
    display: flex;
    margin-left: 70px;
    width: 30%;
  }
`;
