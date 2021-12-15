import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";

async function deleteNetwork(token, id, setRedirect) {
  try {
    const response = await fetch(`http://localhost:8000/racks/network/${id}/`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error("You do not permission to delete rack");
        });
      } else {
        alert("Network has been deleted!");
        setRedirect(true);
      }
    });
  } catch (error) {
    alert(error);
  }
}

export default function Network({ token, user }) {
  const { id } = useParams();
  const [network, setNetwork] = useState({});
  const [networkRows, setNetworkRows] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function getNetwork() {
      try {
        const response = await fetch(
          `http://localhost:8000/racks/network/${id}/`,
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
        setNetwork(json);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getNetwork();
  }, []);

  useEffect(() => {
    if (network.devices) {
      const devices = network.devices;
      let rows = [];
      console.log(network);

      rows = devices.map((device) => {
        return (
          <tr>
            <td>{device.ip_address}</td>
            <td>{device.id}</td>
            <td>{device.server_id}</td>
            <td>{device.network_id}</td>
          </tr>
        );
      });

      setNetworkRows(rows);
    }
  }, [network]);

  return (
    <div className="view">
      <div className="title-button">
        <h2>Network {network.name}</h2>
        <h3>Owned by user {network.user}</h3>

        <Link to={`/network/${network.id}/update`}>
          <button>Update Network</button>
        </Link>

        <button onClick={() => deleteNetwork(token, id, setRedirect)}>
          Delete Network
        </button>

        <div>
          <p>
            Visibility:{" "}
            {network.public === "PR"
              ? "Private"
              : network.public === "PB"
              ? "Public"
              : "Read-Only"}
          </p>
        </div>
      </div>

      <table>
        <tr>
          <th>IP Address</th>
          <th>Device ID</th>
          <th>Server ID</th>
          <th>Network ID</th>
        </tr>
        {networkRows}
      </table>
      {redirect && <Navigate to="/networks" />}
    </div>
  );
}
