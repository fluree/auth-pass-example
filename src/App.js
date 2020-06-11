import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import jwt from "jsonwebtoken";
import AuthForm from "./components/Authentication/AuthForm";
import BookList from "./components/Comics/BookList";
import { UserContext } from "./contexts/UserContext";
import { ListContext } from "./contexts/ListContext";
import { axiosHeaders, axiosBase } from "./utils/axios";
// import "./App.css";

function App() {
  const [user, setUser] = useState({
    username: "",
    _id: "",
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authExample");
    if (token) {
      const decodedToken = jwt.decode(token);
      const userAuth = decodedToken.sub;
      const query = {
        selectOne: {
          "_user/_auth": ["*"],
        },
        from: ["_auth/id", userAuth],
        opts: {
          compact: true,
        },
      };
      axiosBase
        .post("/fdb/example/comics/query", query)
        .then((res) => {
          console.log(res);
          const { username, _id } = res.data._user[0];
          setUser({
            username,
            _id,
          });
          const listQuery = {
            selectOne: { pull_list: ["*"] },
            from: _id,
          };
          console.log(listQuery);
          axiosBase.post("/fdb/example/comics/query", listQuery).then((res) => {
            console.log("list", res);
            const pullList = res.data.pull_list;
            setList(pullList);
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
        <ListContext.Provider value={list}>
          <Container maxWidth="md">
            <Switch>
              <Route path="/" exact>
                <BookList />
              </Route>
              <Route path="/register">
                <AuthForm register />
              </Route>
              <Route path="/login">
                <AuthForm />
              </Route>
            </Switch>
          </Container>
        </ListContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
