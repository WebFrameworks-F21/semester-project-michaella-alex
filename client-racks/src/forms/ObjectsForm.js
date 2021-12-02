import React, { useState, useEffect } from "react";

async function createObject(details, token) {
  console.log(details);
  // const response = await fetch("http://localhost:8000/racks/rackspace/", {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Token ${token}`,
  //   },
  //   body: JSON.stringify(details),
  // });

  // console.log(response);
}

export default function ObjectsForm({ token, user }) {
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [visibility, setVisibility] = useState("Private");
  const [objType, setObjType] = useState("");
  const [rackLocation, setRackLocation] = useState();
  const [rackPosition, setRackPosition] = useState();
  const [ports, setPorts] = useState();
  const [runTime, setRunTime] = useState();
  const [watts, setWatts] = useState();
  const [cpu, setCpu] = useState();
  const [ram, setRam] = useState();
  const [storage, setStorage] = useState(); //hdisk_size
  const [graphics, setGraphics] = useState();
  const [slots, setSlots] = useState();
  const [outlets, setOutlets] = useState();
  const [surgeProtection, setSurgeProtection] = useState(false);

  const handleSubmit = async function (event) {
    event.preventDefault();
    let details = {};

    if (objType === "server") {
      details = { cpu, ram, storage, graphics };
    } else if (objType === "patch-panel") {
      details = { ports };
    } else if (objType === "jbod") {
      details = { slots, storage };
    } else if (objType === "switch") {
      details = { ports };
    } else if (objType === "ups") {
      details = { watts, runTime };
    }

    try {
      const rack = await createObject(
        {
          user,
          name,
          size,
          visibility,
          ...details,
        },
        token
      );

      console.log(rack);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3> Create a new Object </h3>

      <form onSubmit={handleSubmit}>
        <label>
          Object Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Object Size:
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          Us
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
        <label for="type">
          Object Type:
          <select
            value={objType}
            onChange={(e) => {
              setObjType(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="server">Server</option>
            <option value="patch-panel">Patch Panel</option>
            <option value="jbod">JBODs</option>
            <option value="switch">Switch</option>
            <option value="ups">UPS</option>
          </select>
        </label>

        <label for="rack">
          Rack Location:
          <select
            value={rackLocation}
            onChange={(e) => {
              setRackLocation(e.target.value);
            }}
          ></select>
        </label>

        <label for="position">
          Rack Position:
          <input
            type="number"
            min={1}
            max={100}
            value={rackPosition}
            onChange={(e) => setRackPosition(e.target.value)}
          />
        </label>

        {(objType === "patch-panel" || objType === "switch") && (
          <div className="label-form">
            <label for="ports">Ports:</label>
            <input
              type="number"
              min={1}
              value={ports}
              onChange={(e) => setPorts(e.target.value)}
            />
          </div>
        )}

        {objType === "ups" && (
          <label for="runtime">
            Run-time:
            <input
              type="number"
              min={1}
              value={runTime}
              onChange={(e) => setRunTime(e.target.value)}
            />{" "}
            hours
          </label>
        )}

        {objType === "ups" && (
          <label for="watts">
            Watts:
            <input
              type="number"
              min={1}
              value={watts}
              onChange={(e) => setWatts(e.target.value)}
            />
            {" W"}
          </label>
        )}

        {objType === "ups" && (
          <label for="outlets">
            Outlets:
            <input
              type="number"
              min={1}
              value={outlets}
              onChange={(e) => setOutlets(e.target.value)}
            />
          </label>
        )}

        {objType === "ups" && (
          <label for="surge-protection">
            Surge Protection:
            <input
              type="radio"
              value={true}
              name="surge-protection"
              onChange={(e) => setSurgeProtection(e.target.value)}
            />
            {"Yes"}
            <input
              type="radio"
              value={false}
              name="surge-protection"
              onChange={(e) => setSurgeProtection(e.target.value)}
            />
            {"No"}
          </label>
        )}

        {objType === "server" && (
          <label for="cpu">
            CPU speed:
            <input
              type="number"
              min={1}
              value={cpu}
              onChange={(e) => setCpu(e.target.value)}
            />
            {" GHz "}
          </label>
        )}

        {objType === "server" && (
          <label for="ram">
            RAM capacity:
            <input
              type="number"
              min={1}
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            />
            {" GB"}
          </label>
        )}

        {(objType === "server" || objType === "jbod") && (
          <label for="hdisk">
            Storage:
            <input
              type="number"
              min={1}
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
            />{" "}
            {objType === "server" && " TB"}
            {objType === "jbod" && " "}
          </label>
        )}

        {objType === "server" && (
          <label for="graphics">
            Graphics:
            <input
              type="number"
              min={1}
              value={graphics}
              onChange={(e) => setGraphics(e.target.value)}
            />{" "}
            {" MHz"}
          </label>
        )}

        {objType === "jbod" && (
          <label for="slots">
            Disk Slots:
            <input
              type="number"
              min={1}
              value={slots}
              onChange={(e) => setSlots(e.target.value)}
            />
          </label>
        )}

        <input type="submit" />
      </form>
    </div>
  );
}
