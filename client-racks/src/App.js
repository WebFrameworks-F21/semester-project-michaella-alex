import React from "react";
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

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* <nav>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
          </nav> */}

          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
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

export default App;
