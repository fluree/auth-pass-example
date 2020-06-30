import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import jwt from "jsonwebtoken";
import instance, {
  flureeQuery,
  flureeTransact,
} from "../../utils/flureeFunctions";
import { UserContext } from "../../contexts/UserContext";

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

  /**
   * Register user in database, generate password, and
   * Saves a JWT to localstorage
   * @param {Array} user Contains transaction list to add user to FlureeDB
   */
  const registerUser = (user) => {
      const newUser = {
        "password": formState.password,
        "user": formState.email,
        "createUser?": true,
        "roles": [["_role/id", formState.role]],
        "expire": 999999999
      }
      instance.post("/pw/generate", newUser)
      .then(console.log(res))
      .catch((err) => {
        debugger;
        console.log(err);
      });
  };

  const loginUser = (user) => {
    instance
      .post("/pw/login", user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("authToken", res.data);
        history.push("/books");
        // const token = res.data;
        // if (token) {
        //   const decodedToken = jwt.decode(token);
        //   const userAuth = decodedToken.sub;
        //   const query = {
        //     selectOne: [
        //       {
        //         "_user/_auth": [
        //           "*",
        //           {
        //             "_user/roles": ["*"],
        //           },
        //         ],
        //       },
        //     ],
        //     from: ["_auth/id", userAuth],
        //     opts: {
        //       compact: true,
        //     },
        //   };
        //   flureeQuery(query)
        //     .then((data) => {
        //       console.log(data);
        //       const user = data._user[0];
        //       setUser({
        //         username: user.username,
        //         _id: user._id,
        //         role: user.roles[0].id,
        //       });
        //       history.push("/books");
        //     })
        //     .catch((err) => {
        //       console.log("get user error", err);
        //       return err;
        //     });
        // }
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
              <FormControl component="fieldset">
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
