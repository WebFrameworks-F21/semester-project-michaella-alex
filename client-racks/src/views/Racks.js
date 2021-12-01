import React, { useState, useEffect } from "react";

// id name, owner, size, public status

export default function Racks(props) {
  const [racks, setRacks] = useState([]);
  let rackList = [];

  useEffect(() => {
    async function getRacks() {
      try {
        const response = await fetch("");
        const json = await response.json();
        setRacks([...json]);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getRacks();
  }, []);

  rackList = racks.map((rack) => {
    return <div>This is a rack</div>;
  });

  return <div>{rackList}</div>;
}
