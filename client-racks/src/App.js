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
import Racks from "./views/Racks";
import Objects from "./views/Objects";
import Ipv4 from "./views/Ipv4";

function App() {
  const [token, setToken] = useState();

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
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/racks">Racks</Link>
            <Link to="/objects">Objects</Link>
            <Link to="/ipv4">Ipv4</Link>
          </nav>
          <Switch>
            <Route path="/dashboard">
              <DashBoard token={token} />
            </Route>
            <Route path="/racks/">
              <Racks token={token} />
            </Route>
            <Route path="/racks/:id">
              <Racks token={token} />
            </Route>
            <Route path="/objects">
              <Objects token={token} />
            </Route>
            <Route path="/ipv4">
              <Ipv4 token={token} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;