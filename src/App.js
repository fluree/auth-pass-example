import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { Container } from "@material-ui/core";
import jwt from "jsonwebtoken";
import AuthForm from "./components/Authentication/AuthForm";
import BookList from "./components/Comics/BookList";
import PullList from "./components/Comics/PullList";
import AllLists from "./components/Admin/AllLists";
import { UserContext } from "./contexts/UserContext";
import { flureeQuery, lookForDbs } from "./utils/flureeFunctions";
import setupFluree from "./setup/setupFluree";
import NavBar from "./components/Navigation/NavBar";
// import "./App.css";

function App() {
  const history = useHistory();
  const location = useLocation();

  const initialUser = {
    _id: 0,
    username: "",
    role: "",
  };

  const [user, setUser] = useState(initialUser);

  const [session, setSession] = useState({
    loggedIn: false,
    token: "",
  });

  useEffect(() => {
    lookForDbs()
      .then((database) => {
        console.log(database);
        if (!database) {
          setupFluree();
        }
      })
      .catch((err) => err);
  }, []);

  useEffect(() => {
    if (session.loggedIn === false) {
      const token = localStorage.getItem("authToken");
      if (token) {
        setSession({
          ...session,
          loggedIn: true,
          token,
        });
      }
    }
  }, [location]);

  useEffect(() => {
    if (session.token) {
      const decodedToken = jwt.decode(session.token);
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
      flureeQuery(query)
        .then((res) => {
          console.log("user", res);
          const gotUser = res["_user"][0];
          console.log("ping");
          setUser({
            username: gotUser.username,
            _id: gotUser._id,
            role: gotUser.roles[0].id,
            pull_list: gotUser.pull_list,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session.loggedIn]);

  const logout = () => {
    localStorage.clear();
    setSession({
      loggedIn: false,
      token: "",
    });
    setUser(initialUser);
    history.push("/login");
  };

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <NavBar logout={logout} />
        <Container maxWidth="md">
          <Switch>
            <Route path="/books">
              {/* {user.role === "employee" && <h1>Employee</h1>} */}
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
            </Route>
            <Route path="/adminlist">
              <AllLists />
            </Route>
          </Switch>
        </Container>
      </UserContext.Provider>
    </div>
  );
}

export default App;
