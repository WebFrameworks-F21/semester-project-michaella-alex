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

import RacksForm from "./forms/RacksForm";
import ObjectsForm from "./forms/ObjectsForm";

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
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/racks">Racks</Link>
          <Link to="/objects">Objects</Link>
          <Link to="/ipv4">Ipv4</Link>
        </nav>
        <div class="body">
          <Switch>
            <Route path="/dashboard">
              <DashBoard token={token} />
            </Route>

            {/* racks */}
            <Route path="/racks/new">
              <RacksForm token={token} />
            </Route>
            <Route path="/racks/">
              <Racks token={token} />
            </Route>
            <Route path="/racks/:id">
              <Racks token={token} />
            </Route>

            {/* objects */}
            <Route path="/objects/new">
              <ObjectsForm token={token} />
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
