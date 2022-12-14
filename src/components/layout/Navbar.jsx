import classes from "./Navbar.module.css";
import titleIcon from "../../assets/img/title-icon.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={classes.nav}>
      <div className={classes.titleContainer}>
        <img src={titleIcon} alt="title-icon" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className={classes.title}>My Contacts</h1>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
