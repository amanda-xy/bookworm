import styled from "styled-components";

export const StyledHome = styled.div`
  display: flex;
  padding: 0px 100px;
  flex-direction: column;
  height: fit-content;

  .reading-data-container {
    display: flex;
    flex-direction: row;
    background-color: #e8d2e9;
    padding: 30px 40px;
    width: 100%;
    border-radius: 10px;
    justify-content: space-between;
  }

  .reading-progress-container {
    display: flex;
    flex-direction: column;

    .book-progress-container {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin-top: 40px;

      .book-progress {
        display: flex;
        flex-direction: column;
        padding-right: 40px;
        align-items: center;

        img {
          height: 130px;
          width: auto;
          border-radius: 10px;
          margin-bottom: 20px;
          justify-self: center;
        }

        .progress-bar-container {
          width: 150px;
        }
      }
    }
  }

  .reading-summary-container {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 100%;
    min-height: 100%;
    position: relative;

    .achievements {
      margin-top: 10px;
    }

    p {
      font-weight: 600;
      color: #251462;
      font-size: 20px;
    }

    span.achievement-text {
      float: left;
      margin: 0px 0px 10px 0px;
    }

    span.achievement-result {
      float: right;
    }
  }

  .update-button-container {
    margin-top: 50px;
    justify-self: flex-end;
    align-self: flex-end;
  }

  .recommended-for-you-container {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
  }

  .recommended-books-container {
    display: flex;
    flex-direction: row;
    margin-top: 30px;

    img {
      height: 180px;
      width: auto;
      border-radius: 10px;
      margin-bottom: 20px;
      margin-right: 30px;
    }
  }
`;
