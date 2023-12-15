import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../Context/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.removeId();
  }

  let content = (
    <>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <button onClick={logoutHandler}>Logout</button>
      </li>
    </>
  );
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.idToken && <li>
            <Link to="/auth">Login</Link>
          </li>}
          {authCtx.idToken && content}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
