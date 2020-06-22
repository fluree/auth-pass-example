import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import jwt from "jsonwebtoken";
import AuthForm from "./components/Authentication/AuthForm";
import BookList from "./components/Comics/BookList";
import PullList from "./components/Comics/PullList";
import AllLists from "./components/Admin/AllLists";
import { UserContext } from "./contexts/UserContext";
import { axiosBase } from "./utils/axios";
import NavBar from "./components/Navigation/NavBar";
// import "./App.css";

function App() {
  const [user, setUser] = useState({});
  console.log(user);
  const token = localStorage.getItem("authExample");

  useEffect(() => {
    if (token) {
      const decodedToken = jwt.decode(token);
      const userAuth = decodedToken.sub;
      const query = {
        selectOne: [
          {
            "_user/_auth": [
              "*",
              {
                "_user/roles": ["*"],
              },
            ],
          },
        ],
        from: ["_auth/id", userAuth],
        opts: {
          compact: true,
        },
      };
      axiosBase
        .post("/fdb/example/comics/query", query)
        .then((res) => {
          console.log("user", res);
          const gotUser = res.data["_user"][0];
          setUser({
            username: gotUser.username,
            _id: gotUser._id,
            role: gotUser.roles[0].id || "customer",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <NavBar />
        <Container maxWidth="md">
          <Switch>
            <Route path="/" exact>
              {user.role === "employee" && <h1>Employee</h1>}
              <BookList />
            </Route>
            <Route path="/register">
              <AuthForm register />
            </Route>
            <Route path="/login">
              <AuthForm />
            </Route>
            <Route path="/list">
              <PullList />
              {user.role === "employee" && <AllLists />}
            </Route>
          </Switch>
        </Container>
      </UserContext.Provider>
    </div>
  );
}

export default App;
