import React, { useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./views/Login";
import Signup from "./views/Signup";
import DashBoard from "./views/DashBoard";
import Racks from "./views/Racks";
import Objects from "./views/Objects";
import Networks from "./views/Networks";

import RacksForm from "./forms/RacksForm";
import ObjectsForm from "./forms/ObjectsForm";
import NetworksForm from "./forms/NetworksForm";

import Rack from "./single-views/Rack";
import SingularObject from "./single-views/SingularObject";
import Network from "./single-views/Network";

import RackUpdate from "./update_forms/RackUpdate";
import ObjectUpdate from "./update_forms/ObjectUpdate";
import NetworkUpdate from "./update_forms/NetworkUpdate";

function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  if (!token) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/signup"
              element={<Signup setToken={setToken} setUser={setUser} />}
            />
            <Route
              path="/login"
              element={<Login setToken={setToken} setUser={setUser} />}
            />

            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
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
          <Link to="/networks">Networks</Link>
        </nav>
        <div class="body">
          <Routes>
            <Route
              exact
              path="/dashboard"
              element={<DashBoard token={token} user={user} />}
            />

            {/* racks */}
            <Route
              path="/rack/:id"
              element={<Rack token={token} user={user} />}
            />

            <Route
              path="/rack/:id/update"
              element={<RackUpdate token={token} user={user} />}
            />

            <Route
              exact
              path="/racks/new"
              element={<RacksForm token={token} user={user} />}
            />

            <Route
              path="/racks/"
              element={<Racks token={token} user={user} />}
            />

            {/* Objects */}
            <Route
              path="/object/:id"
              element={<SingularObject token={token} user={user} />}
            />

            <Route
              path="/object/:id/update"
              element={<ObjectUpdate token={token} user={user} />}
            />

            <Route
              path="/objects/new"
              element={<ObjectsForm token={token} user={user} />}
            />

            <Route
              path="/objects"
              element={<Objects token={token} user={user} />}
            />

            {/* Networks */}
            <Route
              path="/network/:id"
              element={<Network token={token} user={user} />}
            />

            <Route
              path="/network/:id/update"
              element={<NetworkUpdate token={token} user={user} />}
            />

            <Route
              path="/networks/new"
              element={<NetworksForm token={token} user={user} />}
            />

            <Route
              path="/networks"
              element={<Networks token={token} user={user} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
