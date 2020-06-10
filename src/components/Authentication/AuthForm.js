import React, { useState } from "react";
import { TextField, Button, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import jwt from "jsonwebtoken";
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  root: {},
  formWrap: {
    marginTop: 100,
    border: 2,
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

  /**
   * Register user in database, generate password, and 
   * Saves a JWT to localstorage
   * @param {Array} user Contains transaction list to add user to FlureeDB
   */
  const registerUser = (user) => {
    axios
    // add user to FlureeDB _user collection
      .post("/fdb/example/comics/transact", user)
      .then((res) => {
        const userId = Object.values(res.data.tempids)[0];
        console.log(userId);
        return axios
          .post("/fdb/example/comics/pw/generate", {
            _id: userId,
            password: formState.password,
            expire: 999999999,
          })
          .then((res) => {
            // res.data is JWT
            console.log(res);
            const token = res.data;
            localStorage.setItem("authExample", token);
            // decode the token
            const decodedToken = jwt.decode(token);
            console.log(decodedToken);
            // return the sub predicate from the decoded token
            return decodedToken.sub;
          })
          .then((res) => {
            // create Fluree transaction that links newly created password-based auth
            // record to user subject
            const flureeTransaction = [
              {
                _id: Number(userId),
                "_user/auth": [["_auth/id", res]],
              },
            ];
            return axios
              .post("/fdb/example/comics/transact", flureeTransaction)
              .then((res) => res)
              .catch((err) => err);
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res, "success!");
            }
          });
        // get sub from token
        // transaction associating auth with _user
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  };

  const loginUser = (user) => {
    axios
      .post("/fdb/example/comics/pw/login", user)
      .then((res) => console.log(res))
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
    } else {
      loginUser({
        user: formState.email,
        password: formState.password,
        expire: 999999999,
      });
    }
  };

  return (
    <Container className={classes.root} maxWidth="sm">
      <Box className={classes.formWrap}>
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
          <Button
            type="submit"
            disabled={(props.register && !validPass()) || formState.password === ""}
          >
            {props.register ? "Register" : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AuthForm;
