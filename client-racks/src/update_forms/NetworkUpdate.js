import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

async function updateNetwork(details, token, id) {
  console.log(details);
  const response = await fetch(`http://localhost:8000/racks/network/${id}/`, {
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
        throw new Error(JSON.parse(text)["ip_address"][0]);
      });
    } else {
      return res.json();
    }
  });
}

export default function NetworksForm({ token, user }) {
  const { id } = useParams();
  const [network, setNetwork] = useState({});

  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState("PR");

  const [ipAddress, setIpAddress] = useState("");
  const [prefix, setPrefix] = useState(0);

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
    setName(network.name);
    setVisibility(network.public);
    setIpAddress(network.ip_address);
    setPrefix(network.prefix);
  }, [network]);

  const handleSubmit = async function (event) {
    event.preventDefault();

    try {
      const obj = await updateNetwork(
        {
          name,
          public: visibility,
          ip_address: ipAddress,
          prefix,
          user,
        },
        token,
        id
      );

      console.log(obj);
      alert("Network has been updated!");
      setRedirect(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h3> Update Network </h3>

      <form onSubmit={handleSubmit}>
        <label>
          Network Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

        <label>
          IP Address:
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
        </label>

        <label>
          Prefix:
          <input
            type="number"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      {redirect && <Navigate to="/networks" />}
    </div>
  );
}
