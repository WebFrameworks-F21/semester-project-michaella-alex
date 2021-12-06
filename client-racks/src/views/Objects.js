import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

export default function Objects({ token, user }) {
  const [objects, setObjects] = useState([]);
  let objectList = [];

  useEffect(() => {
    async function getObjects() {
      try {
        const response = await fetch("http://localhost:8000/racks/unit/", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const json = await response.json();
        console.log(response);
        setObjects(json);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getObjects();
    console.log(objects);
  }, []);

  objectList = objects.map((obj) => {
    return (
      <tr>
        <td>
          <Link to={`/object/${obj.id}`}>{obj.name}</Link>
        </td>
        <td>{obj.rack.user}</td>
        <td>{obj.rack.name}</td>
        <td>{obj.size}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Objects Available</h2>
      <Link to="/objects/new">
        <button>New Rack</button>
      </Link>
      <table>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Rack</th>
          <th>Size (Us)</th>
        </tr>
        {objectList}
      </table>
    </div>
  );
}
