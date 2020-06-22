import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rightButton: {
    marginRight: theme.spacing(2),
  },
}));

function NavBar() {
  const classes = useStyles();
  const history = useHistory();

  const clickHandler = (url) => {
    history.push(url);
  };

  const logout = () => {
    localStorage.removeItem("authExample");
    history.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => clickHandler("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => clickHandler("/list")}>
          List
        </Button>
        <Button
          color="inherit"
          className={classes.rightButton}
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
