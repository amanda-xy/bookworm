import styled from "styled-components";

export const StyledBookListItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e8d2e9;
  padding: 10px 10px 0px 10px;
  border-radius: 10px;
  width: 420px;
  margin-right: 25px;
  position: relative;

  .book-info-progress-container {
    height: ${(props) => (props.updateProgress ? "149px" : "130px")};
  }

  .book-image-info-container {
    display: flex;
    flex-direction: row;
    width: 100%;

    img {
      height: 110px;
      border-radius: 10px;
      margin-right: 20px;
    }

    .book-info-container {
      display: flex;
      flex-direction: column;
      width: 100%;

      p {
        font-weight: 600;
        padding: 0;
        margin: 0px 0 2px 0;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .book-title-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        font-size: 18px;
        margin-top: 3px;
        margin-bottom: 8px;
        justify-content: space-between;

        .book-title {
          color: #251462;
          width: 100%;
        }

        svg {
          ${(props) => (props.updateProgress ? "" : "display: none")};
          height: 30px;
          width: 30px;
          fill: #251462;
          transform: rotate(180deg);

          &.up {
            transition: 150ms linear all;
            transform: scale(-1, 1);
            translate: (50, 0);
            stroke-width: 0.3px;
          }

          &.down {
            transition: 200ms linear all;
            transform: scale(1, -1);
            translate: (50, 0);
          }

          &:hover {
            cursor: pointer;
          }
        }
      }

      .book-genre,
      .book-pages,
      .book-author {
        color: #9a9a9a;
      }
    }
  }

  .progress-bar-container {
    ${(props) => (props.updateProgress ? "" : "display: none")};
    margin-top: 12px;
  }

  .update-progress-container {
    position: absolute;
    top: 149px;
    left: 0;
    padding: 0px 12px 10px 12px;
    transition: all 1s ease-in-out;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    background-color: #e8d2e9;
    border-radius: 0px 0px 10px 10px;

    &.visible {
      animation: hide-scroll 1.2s backwards;
      visibility: visible;
      max-height: 300px;

      & > * {
        visibility: visible;
      }
    }

    &.hidden {
      max-height: 0px;
      visibility: hidden;
      transition: 0.8s all 0.2s ease !important;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      color: #251462;
    }

    .update-progress-content {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 8px;

      .update-progress-input-container {
        span {
          font-size: 14px;
          font-weight: 600;
          color: #251462;
          white-space: nowrap;
        }

        input {
          width: 50px;
          margin: 0 10px;
          border: none;
          font-size: 14px;
          font-family: Quicksand;
          font-weight: 600;
          padding: 2px;
          border-radius: 5px;

          &:focus {
            outline: none;
          }
        }
      }

      .update-button-container {
        button {
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
  }
`;
