import React from "react";
import { useState } from "react";

import { Link, Redirect } from "react-router-dom";

async function loginUser(credentials) {
  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = async function (event) {
    event.preventDefault();
    console.log(userName);
    console.log(userPassword);
    const token = await loginUser({
      userName,
      userPassword,
    });
    setToken(token);
  };

  return (
    <div>
      <div>
        Don't have an account yet?{" "}
        <Link to="/signup">Create an account here</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
