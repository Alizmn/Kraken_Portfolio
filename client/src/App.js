import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";

import Navbar from "./Components/Navbar/Navbar";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/login" render={() => <Login />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
