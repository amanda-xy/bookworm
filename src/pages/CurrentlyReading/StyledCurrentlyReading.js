import styled from "styled-components";

export const StyledCurrentlyReading = styled.div`
  display: flex;
  padding: 0px 100px;
  flex-direction: column;

  .filter-panel-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .books-container {
    display: flex;
    flex-direction: row;
    margin-top: 30px;

    a {
      text-decoration: none;
    }

    .book-container {
      display: flex;
      flex-direction: column;
      background-color: #e8d2e9;
      padding: 10px;
      border-radius: 10px;
      width: 420px;
      margin-right: 25px;

      .book-image-info-container {
        display: flex;
        flex-direction: row;

        img {
          height: 110px;
          border-radius: 10px;
          margin-right: 20px;
        }

        .book-info-container {
          p {
            font-weight: 600;
            padding: 0;
            margin: 0px 0 2px 0;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .book-title {
            color: #251462;
            font-size: 18px;
            margin-top: 3px;
            margin-bottom: 8px;
          }

          .book-genre,
          .book-pages,
          .book-author {
            color: #9a9a9a;
          }
        }
      }

      .progress-bar-container {
        margin-top: 12px;
      }
    }
  }
`;
