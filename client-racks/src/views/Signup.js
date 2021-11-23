import React from "react";
import { useState } from "react";
export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordAgain, setUserPasswordAgain] = useState("");

  const handleSubmit = function (event) {
    event.preventDefault();
    console.log(userName);
    console.log(userPassword);
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
