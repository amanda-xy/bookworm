import styled from "styled-components";

export const StyledFilterPanel = styled.div`
  display: flex;
  flex-direction: row;

  .genre-dropdown {
    display: flex;
    margin-right: 20px;
  }

  .author-dropdown {
    display: flex;
    margin-right: 35px;
  }

  .search-input {
    display: flex;
    align-items: center;

    .searchbar-container {
      display: flex;
      flex-direction: row;
      margin-top: -12px;
      border-radius: 10px;
      background-color: #dddddd;
      padding: 5px;

      input {
        font-family: Quicksand;
        font-weight: 600;
        border: none;
        border-radius: 10px;
        background-color: #dddddd;
        width: 200px;
        font-size: 14px;

        &:focus {
          outline: none;
          border: none;
        }
      }

      svg {
        height: 20px;
        fill: #251462;
      }
    }
  }
`;
