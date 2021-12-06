import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";

async function deleteRack(token, id, setRedirect) {
  try {
    const response = await fetch(
      `http://localhost:8000/racks/rackspace/${id}/`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    alert("Rack has been deleted!");
    setRedirect(true);
    console.log(response);
  } catch (error) {
    console.log(error, "something went wrong");
  }
}

export default function Rack({ token, user }) {
  const { id } = useParams();
  const [rack, setRack] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function getRack() {
      try {
        const response = await fetch(
          `http://localhost:8000/racks/rackspace/${id}`,
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
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getRack();
  }, []);

  const objectRows = (function () {
    const rows = [];
    let object = rack.items;
    let index = 0;

    for (let i = 1; i < rack.size + 1; i++) {
      if (object[index]) {
        if (object[index].start === i) {
          rows.push(
            <tr>
              <td>{i}</td>
              <td rowspan={object[index].size}>{object[index].name}</td>
            </tr>
          );
          index++;
          continue;
        }
      }
      rows.push(
        <tr>
          <td>{i}</td>
        </tr>
      );
    }
    return rows;
  })();

  return (
    <div>
      <h2>Rack {rack.name}</h2>
      <h3>Owned by user {rack.user}</h3>
      <button>
        <Link to={`/rack/${rack.id}/update`}>Update Rack</Link>
      </button>
      <button onClick={() => deleteRack(token, id, setRedirect)}>
        Delete Rack
      </button>

      <div>
        <p>Size: {rack.size}</p>
        <p>
          Visibility:{" "}
          {rack.public === "PR"
            ? "Private"
            : rack.public === "PB"
            ? "Public"
            : "Read-Only"}
        </p>
      </div>

      <table>
        <tr>
          <th>Position</th>
          <th>Objects</th>
        </tr>
        {objectRows}
      </table>
      {redirect && <Navigate to="/racks" />}
    </div>
  );
}
