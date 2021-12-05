import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

// id name, owner, size, public status

async function updateRack(details, token, id) {
  const response = await fetch(`http://localhost:8000/racks/rackspace/${id}/`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(details),
  });
}

export default function RacksForm({ token, user }) {
  const { id } = useParams();
  const [rack, setRack] = useState({});

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
  const [redirect, setRedirect] = useState(false);

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
        id
      );
      alert("Rack has been updated!");
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(name, size, visibility);

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
