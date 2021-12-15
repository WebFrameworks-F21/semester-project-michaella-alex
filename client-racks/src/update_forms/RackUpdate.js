import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

// id name, owner, size, public status

async function updateRack(details, token, id, setRedirect) {
  const response = await fetch(`http://localhost:8000/racks/rackspace/${id}/`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(details),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error("You do not permission to update rack");
      });
    } else {
      alert("Rack has been updated!");
      setRedirect(true);
    }
  });
}

export default function RacksForm({ token, user }) {
  const { id } = useParams();
  const [rack, setRack] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function getRack() {
      try {
        const response = await fetch(
          `http://localhost:8000/racks/rackspace/${id}/`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        const json = await response.json();
        // console.log(json);
        setRack(json);
        console.log("rack in update>>>", rack);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getRack();
  }, []);

  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [visibility, setVisibility] = useState("PR");

  useEffect(() => {
    setName(rack.name);
    setSize(rack.size);
    setVisibility(rack.public);
  }, [rack]);

  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      const rack = await updateRack(
        {
          user,
          name,
          size,
          visibility,
        },
        token,
        id,
        setRedirect
      );
      alert("Rack has been updated!");
      setRedirect(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h3> Update Rack </h3>
      {rack && (
        <form onSubmit={handleSubmit}>
          <label>
            Rack Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Rack Size:
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
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
              required
            >
              <option value="PR">Private</option>
              <option value="RO">Read-Only</option>
              <option value="PB">Public</option>
            </select>
          </label>
          <input type="submit" />
        </form>
      )}
      {redirect && <Navigate to="/racks" />}
    </div>
  );
}
