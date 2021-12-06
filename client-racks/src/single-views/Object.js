import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Rack({ token, user }) {
  const { id } = useParams();
  const [rack, setRack] = useState({});
  const [obj, setObj] = useState({});
  const [objRack, setObjRack] = useState({});

  useEffect(() => {
    async function getObject() {
      try {
        const response = await fetch(
          `http://localhost:8000/racks/unit/${id}/`,
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
        setObj(json);
        setObjRack(json.rack_detail);
        console.log("THE object >>>", obj);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    async function getRack() {
      try {
        const response = await fetch(
          `http://localhost:8000/racks/rackspace/${obj.rack_detail.id}/`,
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

    getObject();
    getRack();
  }, []);

  const objectRows = (function () {
    const rows = [];
    let object = rack.items;
    let index = 0;

    // console.log("object >>>", object);
    for (let i = 1; i < rack.size + 1; i++) {
      if (object[index]) {
        if (object[index].start === i) {
          // console.log("object is occupying at position", i);
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

  // console.log("rack >>", rack);
  //   console.log("objectRow >>", objectRows);

  return (
    <div>
      <h2>Object {obj.name}</h2>
      <h3>Located in Rack {objRack.name}</h3>
      <button>
        <Link to={`/object/${obj.id}/update`}>Update Object</Link>
      </button>
      <div>
        <p>Size: {obj.size}</p>
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
    </div>
  );
}
