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
    }
  }
`;
