import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  rightButton: {
    marginRight: theme.spacing(2),
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);

  const clickHandler = (url) => {
    history.push(url);
  };


  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => clickHandler("/books")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => clickHandler("/list")}>
          List
        </Button>
        {user.role === "employee" && (
          <Button color="inherit" onClick={() => clickHandler("/adminlist")}>Admin List</Button>
        )}
        <Button
          color="inherit"
          className={classes.rightButton}
          onClick={props.logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
