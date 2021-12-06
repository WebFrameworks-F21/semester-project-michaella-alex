import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

// id name, owner, size, public status

export default function Networks({ token, user }) {
  const [networks, setNetworks] = useState([]);
  let networkList = [];

  console.log("useParams >>>", useParams());

  useEffect(() => {
    async function getNetworks() {
      try {
        const response = await fetch("http://localhost:8000/racks/network/", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const json = await response.json();
        console.log(response);
        setNetworks(json);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getNetworks();
    console.log(networks);
  }, []);

  networkList = networks.map((net) => {
    return (
      <tr>
        <td>
          <Link to={`/network/${net.id}`}>{net.name}</Link>
        </td>
        <td>{net.user}</td>
        <td>
          {net.ip_address}/{net.prefix}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Networks Available</h2>
      <Link to="/networks/new">
        <button>New Network</button>
      </Link>
      <table>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Size (Us)</th>
        </tr>
        {networkList}
      </table>
    </div>
  );
}
