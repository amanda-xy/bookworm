import { StyledNavbar } from "./styles/StyledNavbar";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/logo.svg";

const Navbar = () => {
  return (
    <StyledNavbar>
      <div className="logo-container">
        <Logo className="logo" />
        <label>Bookworm</label>
      </div>
      <div className="links">
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/books">Books</Link>
        <Link to="/authors">Authors</Link>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
