import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register">
          <AuthForm register />
        </Route>
        <Route path="/login">
          <AuthForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
