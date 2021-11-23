import React, { useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Login from "./views/Login";
import Signup from "./views/Signup";
import DashBoard from "./views/DashBoard";

function App() {
  const [token, setToken] = useState("");

  if (!token) {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route path="/signup">
                <Signup setToken={setToken} />
              </Route>
              <Route path="/login">
                <Login setToken={setToken} />
              </Route>
              <Route path="/">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/dashboard">
              <DashBoard token={token} />
            </Route>
            <Route path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
