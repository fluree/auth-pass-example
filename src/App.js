import React from "react";
import AuthForm from "./components/Authentication/AuthForm";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthForm register/>
      {/* <LoginForm /> */}
    </div>
  );
}

export default App;
