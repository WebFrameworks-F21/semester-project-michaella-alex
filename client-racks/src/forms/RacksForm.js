import React, { useState, useEffect } from "react";

// id name, owner, size, public status

export default function RacksForm(props) {
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [visibility, setVisibility] = useState("Private");

  return (
    <div>
      <h3> Create a new Rack </h3>
      <form>
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
            type="text"
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
      {visibility}
    </div>
  );
}
