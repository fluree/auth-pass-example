import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import AuthForm from "./components/Authentication/AuthForm";
import BookList from "./components/Comics/BookList";
// import "./App.css";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
