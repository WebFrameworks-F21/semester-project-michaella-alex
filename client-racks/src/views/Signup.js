import React from "react";
import { useState } from "react";

import { Navigate } from "react-router-dom";

const score = 4

const strength= {
  1: "Insufficent",
  2: "Insufficent",
  3: "Good",
  4: "Great"
}

class StrengthBar extends React.Component {
  render() {
    let password = this.props.password
    let variations = {
      'digits': /\d/.test(password),
      'lowercase charcters': /[a-z]/.test(password),
      'uppercase charcters': /[A-Z]/.test(password),
      'special charcters': /\W/.test(password),
  }
  let score = Object.keys(variations).reduce(((total, key) => variations[key] + total), 0)
  this.props.setStrength(score)
  let bars = []
  for (var i=0; i < score; i++) {
    bars.push(<div className="bar"></div>)
  }
  const info = Object.keys(variations).map((key, test) =>
  <li>{variations[key] === true ? '✔️' : '❌'} has {key}</li>
  )
    return (
      <div>
        <p>{strength[score]} Strength</p>
        <br></br>
        <div>
        {bars}
        </div>
        <ul>
          {info}
        </ul>

      </div>
    )
  }
}


async function createUser(credentials) {
  return fetch("http://localhost:8000/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [userName, setUserName] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordAgain, setUserPasswordAgain] = useState(false);
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async function (event) {
    event.preventDefault();
    console.log(userName);
    console.log(userPassword);
    if (userPassword !== userPasswordAgain) {
      setError("The Passwords do not match")
    }
    else if (passwordStrength < 3){
      setError("Password too weak")
    }
    else {
      const token = await createUser({
        "username": userName,
        "password": userPassword,
      });
      setRedirect(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p>Error: {error}</p>}
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
        <StrengthBar password={userPassword} setStrength={setPasswordStrength}/>
        <input type="submit" />
        {redirect && <Navigate to="/login"/>}
      </form>
    </div>
  );
}
