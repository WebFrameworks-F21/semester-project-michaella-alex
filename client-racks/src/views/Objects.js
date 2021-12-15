import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

export default function Objects({ token, user }) {
  const [objects, setObjects] = useState([]);
  const [objList, setObjList] = useState([]);

  useEffect(() => {
    async function getObjects() {
      try {
        const response = await fetch("http://localhost:8000/racks/unit/", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const json = await response.json();
        setObjects(json);
      } catch (error) {
        // console.log(error, "something went wrong");
      }
    }

    getObjects();
  }, []);

  useEffect(() => {
    if (objects) {
      let objlist = objects.map((obj) => {
        return (
          <tr>
            <td>
              <Link to={`/object/${obj.id}`}>{obj.name}</Link>
            </td>
            <td>{obj.rack_detail.user}</td>
            <td>{obj.rack_detail.name}</td>
            <td>{obj.size}</td>
          </tr>
        );
      });
      setObjList(objlist);
    }
  }, [objects]);

  return (
    <div className="view">
      <div className="title-button">
        <h2>Objects Available</h2>
        <Link to="/objects/new">
          <button>New Object</button>
        </Link>
      </div>

      <table>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Rack</th>
          <th>Size (Us)</th>
        </tr>
        {objList}
      </table>
    </div>
  );
}
