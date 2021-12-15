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
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error("You do not permission to delete rack");
        });
      } else {
        alert("Object has been deleted!");
        setRedirect(true);
      }
    });
  } catch (error) {
    alert(error);
  }
}

export default function SingularObject({ token, user }) {
  const { id } = useParams();
  const [objId, setObjId] = useState(id);
  const [rack, setRack] = useState({});
  const [obj, setObj] = useState({});
  const [objRack, setObjRack] = useState({});
  const [cards, setCards] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setObjId(id);
  });

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
      } catch (error) {
        // console.log(error, "something went wrong");
      }
    }

    getObject();
  }, [objId]);

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
        setRack(json);
      } catch (error) {
        // console.log(error, "something went wrong");
      }
    }
    if (objRack) {
      getRack();
    }
  }, [objRack]);

  useEffect(() => {
    if (obj.cards) {
      const rowCards = obj.cards.map((card) => {
        return (
          <tr>
            <td>{card.network_id ? card.network_id : "Empty"}</td>
            <td>{card.ip_address}</td>
          </tr>
        );
      });

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
              <td rowspan={object[index].size}>
                <Link to={`/object/${object[index].id}`}>
                  {object[index].name}
                </Link>
              </td>
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

  return (
    <div className="single-view">
      <div>
        <h2>Object {obj.name}</h2>
        <h3>Located in Rack {objRack.name}</h3>
        <button onClick={() => deleteObject(token, id, setRedirect)}>
          Delete Object
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
          <p>
            <b>Type:</b> {obj.resourcetype}
          </p>
          <p>
            <b>Size:</b> {obj.size}
          </p>
          <p>
            <b>Visibility:</b>{" "}
            {rack.public === "PR"
              ? "Private"
              : rack.public === "PB"
              ? "Public"
              : "Read-Only"}
          </p>

          {(obj.resourcetype === "PatchPanel" ||
            obj.resourcetype === "Switch") && (
            <div>
              <p>
                <b>Ports:</b> {obj.ports}
              </p>
            </div>
          )}

          {obj.resourcetype === "UPS" && (
            <div>
              <p>
                <b>Run Time:</b> {obj.watt_hours}
                {" hours"}
              </p>
              <p>
                <b>Max Watts:</b>
                {obj.max_watts} {" W"}
              </p>
              <p>
                <b>Outlets:</b>
                {obj.outlets}
              </p>
              <p>
                <b>Surge Protection:</b> {obj.surge_protection}
              </p>
            </div>
          )}

          {obj.resourcetype === "JBOD" && (
            <div>
              <p>
                <b>Disk Slots:</b> {obj.disk_slots}
              </p>
            </div>
          )}

          {obj.resourcetype === "Server" && (
            <div>
              <p>
                <b>CPU Speed:</b> {obj.cpu} {" GHz"}
              </p>
              <p>
                <b>Memory:</b> {obj.ram} {" GB"}
              </p>
              <p>
                <b>Graphics:</b> {obj.graphics} {" MHz"}
              </p>
            </div>
          )}

          {(obj.resourcetype === "JBOD" || obj.resourcetype === "Server") && (
            <div>
              <p>
                <b>Disk Size:</b> {obj.hdisk_size} {" TB"}
              </p>
            </div>
          )}
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
      </div>

      <div>
        <table>
          <tr>
            <th>Position</th>
            <th>Objects</th>
          </tr>
          {objectRows}
        </table>
      </div>

      {redirect && <Navigate to="/objects" />}
    </div>
  );
}
