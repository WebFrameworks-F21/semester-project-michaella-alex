import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

async function createNetworkCard(details, token) {
  console.log(details);
  const response = await fetch("http://localhost:8000/racks/card/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(details),
  });

  console.log(response);
}

export default function NetworkCardsForm({ token, user }) {
  const serverId = useParams();

  const [ipAddress, setIpAddress] = useState("");
  const [networks, setNetworks] = useState([]);
  const [networkId, setNetworkId] = useState("");
  const [networkOptions, setNetworkOptions] = useState([]);

  const [redirect, setRedirect] = useState(false);

  console.log(serverId);

  const handleSubmit = async function (event) {
    event.preventDefault();
    console.log(networkId);

    try {
      const obj = await createNetworkCard(
        {
          server_id: parseInt(serverId.id),
          network_id: null,
          ip_address: null,
        },
        token
      );

      console.log(obj);
      alert("A new Network Card has been created!");
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

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
        console.log(json);
        setNetworks(json);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getNetworks();
  }, []);

  useEffect(() => {
    if (networks) {
      let options = networks.map((network) => {
        return (
          <option value={parseInt(network.id)}>
            {network.name} and {network.id}
          </option>
        );
      });

      setNetworkOptions(options);
    }
  }, [networks]);

  return (
    <div>
      <h3> Create a new Network Card </h3>
      <form onSubmit={handleSubmit}>
        <label for="network">
          Network:
          <select
            value={networkId}
            onChange={(e) => {
              setNetworkId(e.target.value);
            }}
            required
          >
            <option value={undefined}></option>
            {networkOptions}
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

        <input type="submit" />
      </form>
      {/* {redirect && <Navigate to={/>} */}
    </div>
  );
}
