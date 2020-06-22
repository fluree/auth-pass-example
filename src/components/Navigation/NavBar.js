import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";

function NavBar() {
  const history = useHistory();

  const clickHandler = (url) => {
    history.push(url);
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
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
