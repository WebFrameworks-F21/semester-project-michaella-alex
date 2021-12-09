import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// id name, owner, size, public status

async function createRack(details, token, setError) {
  const response = await fetch("http://localhost:8000/racks/rackspace/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(details),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      let data = response.json()
      setError(true)
      console.log("theres an error")
      console.log(data)
      data.error = true
      return {error: true};
    }
  });
}

export default function RacksForm({ token, user }) {
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [error, setError] = useState(false);
  const [visibility, setVisibility] = useState("Private");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      const rack = await createRack(
        {
          user,
          name,
          size,
          visibility,
        },
        token,
        setError
      );
      console.log(rack)
      if (rack.error == true) {
        alert("Something went wrong");
      }
      else {
        alert("Rack has been created!");
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3> Create a new Rack </h3>
      <form onSubmit={handleSubmit}>
        <label>
          Rack Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Rack Size:
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          Us
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
        <input type="submit" />
      </form>
      {redirect && <Navigate to="/racks" />}
    </div>
  );
}
