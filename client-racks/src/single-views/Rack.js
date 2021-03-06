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
    ).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error("You do not have permission to delete rack");
        });
      } else {
        alert("Rack has been deleted!");
        setRedirect(true);
      }
    });
  } catch (error) {
    alert(error);
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
              <td rowspan={object[index].size}>
                <Link to={`/object/${object[index].id}`}>
                  {object[index].name}
                </Link>
              </td>
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
    <div className="single-view">
      <div>
        <h2>Rack {rack.name}</h2>
        <h3>Owned by user {rack.user}</h3>

        <button>
          <Link to={`/rack/${rack.id}/update`}>Update Rack </Link>
        </button>

        <button onClick={() => deleteRack(token, id, setRedirect)}>
          Delete Rack
        </button>
        <div>
          <p>
            <b>Size:</b> {rack.size}
          </p>
          <p>
            <b>Visibility:</b>{" "}
            {rack.public === "PR"
              ? "Private"
              : rack.public === "PB"
              ? "Public"
              : "Read-Only"}
          </p>
        </div>
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
