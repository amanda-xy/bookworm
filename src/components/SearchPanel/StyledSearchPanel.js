import styled from "styled-components";

export const StyledSearchPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.spaceBetween ? "space-between" : "flex-start")};
  border: 1px solid transparent;
  margin-top: ${(props) => props.marginTop};
  transition: all 0.5s ease-out;
  width: ${(props) => (props.spaceBetween ? "100%;" : "fit-content")};
  max-width: 100%;
  padding: 10px 10px 10px 0px;

  &.active {
    box-shadow: rgba(100, 100, 111, 0.2) 1px 3px 10px 1px;
    border-radius: 8px;
    max-width: 100vw;
    transition: 2s box-shadow 0.5s ease-out;
  }

  .search-icon-container {
    display: flex;
    margin-top: 5px;
    justify-self: flex-end;
  }

  .search-icon {
    overflow: visible;
    fill: #251462;

    &:hover {
      fill: #6044f2;
      cursor: pointer;
    }
  }

  .searchbar-container {
    display: flex;
    background-color: transparent;
  }

  input {
    position: relative;
    align-self: center;
    font-family: ${(props) => props.fontFamily};
    font-size: ${(props) => props.fontSize};
    font-weight: 600;
    border: none;
    padding-left: 10px;
    transition: all 0.8s ease;
    overflow: hidden;
    height: min-content;

    &.hidden {
      visibility: hidden;
      padding: 0;
      margin: 0;
      max-width: 0px;
    }

    &.visible {
      visibility: visible;
      max-width: 100vw;
      transition: 0.8s all 0.8s ease;

      & > * {
        visibility: visible;
      }
    }

    &:focus {
      border: none;
      outline: none;
    }
  }

  label {
    align-self: center;
    font-family: ${(props) => props.fontFamily};
    font-size: ${(props) => props.fontSize};
    padding: 2px 10px 2px 0px;
    margin-right: 3px;
    color: #251462;
    overflow: hidden;
    transition: all 0.8s cubic-bezier(0, 1, 0, 1);
    word-break: keep-all;
    white-space: nowrap;
    font-weight: 600;

    &.hidden {
      visibility: hidden;
      max-width: 0px;
      padding: 2px 0px;
      margin: 0;
    }

    &.visible {
      visibility: visible;
      max-width: 100vw;
      transition: 0.8s all 0.8s ease;

      & > * {
        visibility: visible;
      }
    }
  }
`;
