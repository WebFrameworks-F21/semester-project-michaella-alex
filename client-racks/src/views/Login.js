import React from "react";
import { useState } from "react";

import { Link, Redirect } from "react-router-dom";

async function loginUser(credentials) {
  const data = await fetch("http://localhost:8000/api-auth/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const dataJSON = data.json();
  const status = data.status;
  console.log(data);

  if (status !== 200) {
    throw "wrong credentials";
  }

  return dataJSON;
}

export default function Login({ setToken }) {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      const token = await loginUser({
        // username: userName,
        // password: userPassword,
        username: "ming",
        password: "karamell",
      });
      console.log(token);
      setToken(token);
    } catch (error) {
      console.log("wrong credentials buddy");
    }
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
