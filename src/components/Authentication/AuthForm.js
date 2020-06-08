import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "0 auto",
  },
  authForm: {
    display: "flex",
    flexDirection: "column",
  },
}));

function AuthForm(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    passConfirm: "",
  });

  const changeHandler = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const validPass = () => {
    return formState.password === formState.passConfirm;
  };

  const registerUser = (user) => {
    axios
      .post("/fdb/example/comics/transact", user)
      .then((res) => {
        const userId = Object.values(res.data.tempids)[0];
        console.log(userId);
        axios
          .post("/fdb/example/comics/pw/generate", {
            _id: userId,
            password: formState.password,
            expire: 999999999,
          })
          .then((res) => {
            console.log(res)
            localStorage.setItem("authExample", res.data)
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (props.register) {
      registerUser([
        {
          _id: "_user?1",
          username: formState.email,
        },
      ]);
    }
  };

  return (
    <div className={classes.root}>
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
            helperText={validPass() ? "" : "passwords don't match"}
          />
        )}
        <Button type="submit">{props.register ? "Register" : "Login"}</Button>
      </form>
    </div>
  );
}

export default AuthForm;
