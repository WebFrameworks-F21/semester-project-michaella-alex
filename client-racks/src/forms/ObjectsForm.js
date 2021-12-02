import React, { useState, useEffect } from "react";

export default function ObjectsForm(props) {
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [visibility, setVisibility] = useState("Private");
  const [objType, setObjType] = useState("Server");

  return (
    <div>
      <h3> Create a new Object </h3>

      <form>
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
            value={objType}
            onChange={(e) => {
              setObjType(e.target.value);
            }}
          ></select>
        </label>

        <label for="position">
          Rack Position:
          <input
            type="number"
            min={1}
            max={100}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        {(objType === "patch-panel" || objType === "switch") && (
          <div className="label-form">
            <label for="ports">Ports:</label>
            <input
              type="number"
              min={1}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
        )}

        {objType === "ups" && (
          <label for="runtime">
            Run-time:
            <input
              type="number"
              min={1}
              value={size}
              onChange={(e) => setSize(e.target.value)}
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
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            {" W"}
          </label>
        )}

        {objType === "server" && (
          <label for="hdisk">
            Storage:
            <input
              type="number"
              min={1}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            {" TB"}
          </label>
        )}

        {objType === "server" && (
          <label for="graphics">
            Graphics:
            <input
              type="number"
              min={1}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />{" "}
            {" MHz"}
          </label>
        )}

        {objType === "server" && (
          <label for="network">
            Network:
            <input
              type="number"
              min={1}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            {" Mbps"}
          </label>
        )}

        <input type="submit" />
      </form>
    </div>
  );
}
