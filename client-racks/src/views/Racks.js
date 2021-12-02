import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

// id name, owner, size, public status

export default function Racks(props) {
  const [racks, setRacks] = useState([]);
  // const { id } = useParams();
  let rackList = [];

  useEffect(() => {
    async function getRacks() {
      const myHeaders = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      });

      console.log("my headers >>>", myHeaders);

      try {
        const response = await fetch("http://localhost:8000/racks/rackspace/", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token.token}`,
          },
        });
        const json = await response.json();
        console.log(response);
        setRacks(json);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getRacks();
    console.log(racks);
  }, []);

  rackList = racks.map((rack) => {
    return (
      <tr>
        <td>{rack.name}</td>
        <td>{rack.user}</td>
        <td>{rack.size}</td>
      </tr>
    );
  });

  return (
    <div>
      <h3>Racks Available</h3>
      <Link to="/racks/new">
        <button>New Rack</button>
      </Link>
      {/* have a modal around here */}
      <table>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Size (Us)</th>
        </tr>
        {rackList}
      </table>
    </div>
  );
}
