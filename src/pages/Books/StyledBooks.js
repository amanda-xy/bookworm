import styled from "styled-components";

export const StyledBooks = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 100px;
  margin-top: 30px;

  .books-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .books-container {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .arrow-container {
    display: flex;
    align-items: center;
  }

  .arrow-icon {
    fill: #251462;
    transform: rotate(90deg);
    height: 70px;
    stroke: #251462;

    &:hover {
      cursor: pointer;
    }
  }

  .bookshelf-container {
    display: flex;
    flex-direction: row;
    background-color: #e8d2e9;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 70px;
    padding: 20px 25px;
    height: 170px;
    width: 100%;

    img {
      height: 130px;
      border-radius: 10px;
      margin-right: 30px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .currently-reading-container {
    display: flex;
    flex-direction: row;
    background-color: #e8d2e9;
    border-radius: 10px;
    margin-top: 20px;
    padding: 20px 25px;
    height: 170px;

    img {
      height: 130px;
      border-radius: 10px;
      margin-right: 30px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .add-book-container {
    display: flex;
    height: fit-content;
    width: fit-content;
    overflow: hidden;
    transition: all 0.4s ease;
    flex-direction: row;
    padding: 30px;
    z-index: 1000;
    position: fixed;
    right: 0;
    top: 0;

    &.visible {
      max-width: 500px;
      opacity: 1;
    }

    &.hidden {
      max-width: 0px;
      opacity: 0;
    }
  }

  .add-book-button {
    position: absolute;
    right: 100px;
  }
`;
