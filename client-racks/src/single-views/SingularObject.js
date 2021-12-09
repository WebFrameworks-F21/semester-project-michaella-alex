import React, { useState, useEffect } from "react";
import { Navigate, Link, useParams } from "react-router-dom";

async function deleteObject(token, id, setRedirect) {
  try {
    const response = await fetch(`http://localhost:8000/racks/unit/${id}/`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    alert("Rack has been deleted!");
    setRedirect(true);
    console.log(response);
  } catch (error) {
    console.log(error, "something went wrong");
  }
}

export default function SingularObject({ token, user }) {
  const { id } = useParams();
  const [rack, setRack] = useState({});
  const [obj, setObj] = useState({});
  const [objRack, setObjRack] = useState({});
  const [cards, setCards] = useState([]);
  const [redirect, setRedirect] = useState(false);

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
        console.log("object at getObject() >>>", obj);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getObject();
  }, []);

  useEffect(() => {
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
        console.log("object at getRack() >>>", json);
        setRack(json);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }
    if (objRack) {
      getRack();
    }
  }, [objRack]);

  useEffect(() => {
    if (obj.cards) {
      console.log("obj cards >>>", obj.cards);
      const rowCards = obj.cards.map((card) => {
        return (
          <tr>
            <td>{card.network_id}</td>
            <td>{card.ip_address}</td>
          </tr>
        );
      });

      console.log("obj cards after mapping >>>", rowCards);

      setCards(rowCards);
    }
  }, [obj]);

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
      <button onClick={() => deleteObject(token, id, setRedirect)}>
        Delete Rack
      </button>
      <button>
        <Link to={`/object/${obj.id}/update`}>Update Object</Link>
      </button>

      {obj.resourcetype === "Server" && (
        <button>
          <Link to={`/server/${obj.id}/networkcards/new`}>
            Create Network Card
          </Link>
        </button>
      )}

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

      {obj.resourcetype === "Server" && (
        <div>
          <h4>Network Cards</h4>
          <table>
            <tr>
              <th>Network</th>
              <th>IP Address</th>
            </tr>
            {cards}
          </table>
        </div>
      )}

      <h4>Rack</h4>
      <table>
        <tr>
          <th>Position</th>
          <th>Objects</th>
        </tr>
        {objectRows}
      </table>
      {redirect && <Navigate to="/objects" />}
    </div>
  );
}
