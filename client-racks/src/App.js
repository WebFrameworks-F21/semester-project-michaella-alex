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
import Ipv4 from "./views/Ipv4";

import RacksForm from "./forms/RacksForm";
import ObjectsForm from "./forms/ObjectsForm";

import Rack from "./single-views/Rack";
import Object from "./single-views/Object";

import RackUpdate from "./update_forms/RackUpdate";
import ObjectUpdate from "./update_forms/ObjectUpdate";

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
          <Link to="/ipv4">Ipv4</Link>
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
              element={<Object token={token} user={user} />}
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

            <Route path="/ipv4" element={<Ipv4 token={token} user={user} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
