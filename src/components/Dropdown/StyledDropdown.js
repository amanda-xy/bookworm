import styled from "styled-components";

export const StyledDropdown = styled.div`
  width: "fit-content";
  position: relative;
  height: 70px;

  .inner {
    transition: all 0.5s ease-out;
    background-color: #fcfcfc;
    border-radius: 15px;
  }

  &.open {
    .inner {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 10px 2px;
      border-radius: 15px;
    }

    span {
      color: #18171f;
    }
  }

  &.closed {
    .inner {
      box-shadow: none;
      transition: 1s all 0.5s ease-out;
    }
  }

  .organization-name {
    background-color: transparent;
    border: none;
    font-size: 14px;
    width: "100%";
    white-space: nowrap;
    display: flex;
    color: #18171f;
    padding: 15px 20px 10px 37px;
    justify-content: center;
  }

  button {
    background-color: #fcfcfc;
    border: none;
    border-radius: 5px;
    width: 100%;
    white-space: nowrap;
    display: flex;
    color: #251462;
    padding: 15px 15px 10px 20px;
    font-family: Quicksand;
    font-weight: 600;

    &:hover {
      cursor: pointer;
    }

    span {
      font-size: 18px;
      width: 100%;
      text-align: left;
      padding-right: 8px;
      color: #251462;
    }

    div.arrow-container {
      width: fit-content;
      justify-self: end;
      align-self: center;
      text-align: end;
      padding-right: 0.5%;

      svg {
        fill: #251462;

        &.down {
          transition: 200ms linear all;
          transform: scale(1, -1);
          translate: (50, 0);
        }

        &.up {
          transition: 150ms linear all;
          transform: scale(-1, 1);
          translate: (50, 0);
          stroke-width: 0.3px;
        }
      }
    }
  }
`;

export const StyledDropdownMenu = styled.div`
  position: relative;
  background-color: #fcfcfc;
  transition: all 1s ease-in-out;
  border-radius: 5px;
  width: 100%;
  padding: 0px 10px 10px 10px;
  overflow: hidden;

  &.visible {
    animation: hide-scroll 1.2s backwards;
    visibility: visible;
    max-height: 300px;
    overflow-y: auto;

    & > * {
      visibility: visible;
    }

    hr {
      border: 0.5px solid #e8e7ee;
    }
  }

  &.hidden {
    max-height: 0px;
    visibility: hidden;
    transition: 0.8s all 0.2s ease !important;

    hr {
      visibility: hidden;
    }
  }

  @keyframes hide-scroll {
    from,
    to {
      overflow: hidden;
    }
  }
`;

export const StyledDropdownItem = styled.div`
  text-align: left;
  margin-top: 8px;
  padding: 15px 17px 15px 10px;
  font-size: 18px;
  overflow-wrap: break-word;
  border-radius: 10px;
  width: 100%;
  font-weight: 600;
  color: #251462;
  background-color: #fcfcfc;

  &:hover {
    background-color: #e8d2e9;
    cursor: pointer;
  }
`;
