import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import Homepage from "./Homepage.js";
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    // Set the title when the component mounts
    document.title = "ScholarFlow";
  }, []);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/SignUp">
          <SignUp />
        </Route>
        <Route path="/Homepage">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
