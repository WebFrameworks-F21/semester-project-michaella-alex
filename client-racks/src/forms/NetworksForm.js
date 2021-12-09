import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

async function createNetwork(details, token) {
  console.log(details);
  const response = await fetch("http://localhost:8000/racks/network/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(details),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(JSON.parse(text)["ip_address"][0]);
      });
    } else {
      return res.json();
    }
  });

  console.log(response);
}

export default function NetworksForm({ token, user }) {
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [visibility, setVisibility] = useState("PR");

  const [ipAddress, setIpAddress] = useState("");
  const [prefix, setPrefix] = useState(0);

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async function (event) {
    event.preventDefault();

    try {
      const obj = await createNetwork(
        {
          name,
          size,
          public: visibility,
          ip_address: ipAddress,
          prefix,
          user,
        },
        token
      );

      console.log(obj);
      alert("A new Network has been created!");
      setRedirect(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h3> Create a new Network </h3>

      <form onSubmit={handleSubmit}>
        <label>
          Network Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label for="visibility">
          Visibility:
          <select
            value={visibility}
            onChange={(e) => {
              setVisibility(e.target.value);
            }}
          >
            <option value="Private">Private</option>
            <option value="Read-Only">Read-Only</option>
            <option value="Public">Public</option>
          </select>
        </label>

        <label>
          IP Address:
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
        </label>

        <label>
          Prefix:
          <input
            type="number"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
        </label>

        <input type="submit" />
      </form>
      {redirect && <Navigate to="/networks" />}
    </div>
  );
}
