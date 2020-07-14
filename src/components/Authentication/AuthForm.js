import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  registerFlureeUser,
  loginFlureeUser,
} from "../../utils/flureeFunctions";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 100 },
  formWrap: {
    padding: 4,
    // boxShadow: "2px 2px 2px #000000"
  },
  authForm: {
    display: "flex",
    flexDirection: "column",
  },
  roleSelect: {
    marginTop: 10,
  },
}));

function AuthForm(props) {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    passConfirm: "",
    role: "customer",
  });

  const history = useHistory();

  const validPass = () => {
    return formState.password === formState.passConfirm;
  };

  const changeHandler = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const radioHandler = (e) => {
    setFormState({
      ...formState,
      role: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let authToken = null;
      if (props.register) {
        authToken = await registerFlureeUser({
          password: formState.password,
          user: formState.email,
          "create-user?": true,
          expire: 999999999,
          roles: [["_role/id", formState.role]],
        });
      } else {
        authToken = await loginFlureeUser({
          user: formState.email,
          password: formState.password,
          expire: 999999999,
        });
      }
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        history.push("/books");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={classes.root} maxWidth="sm">
      <Paper className={classes.formWrap} elevation={3}>
        {/* <UserContext.Provider value={user}> */}
        <form className={classes.authForm} onSubmit={submitHandler}>
          <TextField
            name="email"
            className={classes.fields}
            value={formState.email}
            label="Email"
            onChange={changeHandler}
          />
          <TextField
            name="password"
            className={classes.fields}
            value={formState.password}
            type="password"
            label="Password"
            onChange={changeHandler}
          />
          {props.register && (
            <TextField
              name="passConfirm"
              className={classes.fields}
              vaue={formState.passConfirm}
              type="password"
              label="Confirm Password"
              onChange={changeHandler}
              error={!validPass()}
              helperText={validPass() ? "" : "Passwords do not match"}
            />
          )}
          {props.register && (
            <FormControl component="fieldset" className={classes.roleSelect}>
              <FormLabel component="legend">User Role</FormLabel>
              <RadioGroup
                aria-label="user-role"
                name="role1"
                value={formState.role}
                onChange={radioHandler}
              >
                <FormControlLabel
                  value="customer"
                  control={<Radio />}
                  label="Customer"
                />
                <FormControlLabel
                  value="employee"
                  control={<Radio />}
                  label="Employee"
                />
              </RadioGroup>
            </FormControl>
          )}

          <Button
            type="submit"
            disabled={
              (props.register && !validPass()) || formState.password === ""
            }
          >
            {props.register ? "Register" : "Login"}
          </Button>
        </form>
        {/* </UserContext.Provider> */}
      </Paper>
    </Container>
  );
}

export default AuthForm;
