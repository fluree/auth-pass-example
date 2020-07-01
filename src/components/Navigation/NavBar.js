import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";

function NavBar(props) {
  const history = useHistory();
  const {pathname} = useLocation();
  const user = useContext(UserContext);

  const clickHandler = (url) => {
    history.push(url);
  };

  if (pathname === "/login" || pathname === "/register") {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Button color="inherit" onClick={() => clickHandler("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => clickHandler("/register")}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit" onClick={() => clickHandler("/books")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => clickHandler("/list")}>
          List
        </Button>
        {user.role === "employee" && (
          <Button color="inherit" onClick={() => clickHandler("/adminlist")}>
            Admin List
          </Button>
        )}
        <Button color="inherit" onClick={props.logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
