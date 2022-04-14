import styled from "styled-components";

export const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: row;
  padding: 70px 100px;
  justify-content: center;
  align-items: center;

  .links {
  }

  .logo-container {
    position: absolute;
    left: 100px;
    display: flex;
    flex-direction: column;

    .logo {
      height: 40px;
      fill: #251462;
    }

    label {
      color: #251462;
      font-weight: 600;
      font-size: 18px;
    }
  }

  .link {
    text-decoration: none;
    color: #b6b6b6;
    font-weight: 600;
    margin-right: 20px;
    font-size: 22px;
    transition: all 0.5s ease;

    &::after {
      transform: translateX(-50%);
      border-radius: 100%;
      position: absolute;
      background: #251462;
      top: 28px;
      height: 5px;
      content: "";
      width: 5px;
      left: 50%;
      opacity: 0;
      transition: opacity 0s;
    }

    &.active {
      display: inline-block;
      vertical-align: top;
      color: #251462;
      position: relative;
      text-align: center;

      &::after {
        transform: translateX(-50%);
        border-radius: 100%;
        position: absolute;
        background: #251462;
        top: 28px;
        height: 5px;
        content: "";
        width: 5px;
        left: 50%;
        opacity: 1;
        transition: opacity 0.3s ease;
      }
    }
  }
`;
