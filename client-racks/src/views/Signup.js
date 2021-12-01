import React from "react";
import { useState } from "react";

import { Link, Redirect } from "react-router-dom";

async function createUser(credentials) {
  return fetch("http://localhost:3000/signup", {
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
  const [userPasswordAgain, setUserPasswordAgain] = useState("");

  const handleSubmit = async function (event) {
    event.preventDefault();
    console.log(userName);
    console.log(userPassword);
    const token = await createUser({
      userName,
      userPassword,
    });
    setToken(token);
  };

  return (
    <div>
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
        <label>
          Re-type password:
          <input
            type="password"
            value={userPasswordAgain}
            onChange={(e) => setUserPasswordAgain(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}