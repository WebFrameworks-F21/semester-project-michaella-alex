import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

// id name, owner, size, public status

export default function Racks(props) {
  const [racks, setRacks] = useState([]);
  const { id } = useParams();
  let rackList = [];

  useEffect(() => {
    async function getRacks() {
      const myHeaders = new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      });

      try {
        const response = await fetch(
          "http://localhost:8000/racks/rackspace",
          myHeaders
        );
        const json = await response.json();
        setRacks([...json]);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getRacks();
  }, []);

  rackList = racks.map((rack) => {
    return (
      <tr>
        <td>{rack.name}</td>
        <td>{rack.owner}</td>
        <td>{rack.size}</td>
      </tr>
    );
  });

  return (
    <div>
      <h3>Racks Available</h3>
      <button>New Rack</button>
      {/* have a modal around here */}
      <table>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Size (Us)</th>
        </tr>
      </table>
      the id on this page {id}
    </div>
  );
}
