import { StyledNavbar } from "./styles/StyledNavbar";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../images/logo.svg";

const Navbar = () => {
  return (
    <StyledNavbar>
      <div className="logo-container">
        <Logo className="logo" />
        <label>Bookworm</label>
      </div>
      <div className="links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active link" : "link")}>
          Home
        </NavLink>
        <NavLink to="/books" className={({ isActive }) => (isActive ? "active link" : "link")}>
          Books
        </NavLink>
        <NavLink to="/authors" className={({ isActive }) => (isActive ? "active link" : "link")}>
          Authors
        </NavLink>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
