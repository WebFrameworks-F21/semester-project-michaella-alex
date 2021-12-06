import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

async function updateObject(details, token, id) {
  console.log(details);
  const response = await fetch(`http://localhost:8000/racks/unit/${id}/`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(details),
  });

  console.log(response);
}

export default function ObjectsForm({ token, user }) {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [visibility, setVisibility] = useState("PR");
  const [objType, setObjType] = useState("");
  const [rackLocation, setRackLocation] = useState("");
  const [rackPosition, setRackPosition] = useState(0);

  const [ports, setPorts] = useState(0);
  const [runTime, setRunTime] = useState(0);
  const [watts, setWatts] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [storage, setStorage] = useState(0); //hdisk_size
  const [graphics, setGraphics] = useState(0);
  const [slots, setSlots] = useState(0);
  const [outlets, setOutlets] = useState(0);
  const [surgeProtection, setSurgeProtection] = useState(false);

  const [racks, setRacks] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const [object, setObject] = useState({});

  //   for the rack options
  useEffect(() => {
    async function getRacks() {
      try {
        const response = await fetch("http://localhost:8000/racks/rackspace/", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const json = await response.json();
        console.log(json);
        setRacks(json);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getRacks();
    console.log(racks);
  }, []);

  //   for getting curent object's details
  useEffect(() => {
    async function getObject() {
      try {
        const response = await fetch(`http://localhost:8000/racks/unit/${id}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const json = await response.json();
        console.log(json);
        setObject(json);
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getObject();
    console.log(racks);
  }, []);

  useEffect(() => {
    setName(object.name);
    setSize(object.size);
    setVisibility(object.public);
    setObjType(object.resourcetype);

    if (object.rack_detail) {
      setRackLocation(object.rack_detail.id);
    }
    setRackPosition(object.start);

    setPorts(object.ports);
    setRunTime(object.watt_hours);
    setWatts(object.max_watts);
    setCpu(object.cpu);
    setRam(object.ram);
    setStorage(object.hdisk_size);
    setGraphics(object.graphics);
    setSlots(object.disk_slots);
    setOutlets(object.outlets);
    setSurgeProtection(object.surge_protection);
  }, [object]);

  const rackOptions = racks.map((rack) => {
    return <option value={rack.id}>{rack.name}</option>;
  });

  const handleSubmit = async function (event) {
    event.preventDefault();
    let details = {};

    if (objType === "Server") {
      details = { cpu, ram, hdisk_size: storage, graphics };
    } else if (objType === "PatchPanel") {
      details = { ports };
    } else if (objType === "JBOD") {
      details = { disk_slots: slots, hdisk_size: storage };
    } else if (objType === "Switch") {
      details = { ports };
    } else if (objType === "UPS") {
      details = {
        max_watts: watts,
        watt_hours: runTime,
        outlets,
        surge_protection: surgeProtection,
      };
    }

    try {
      const obj = await updateObject(
        {
          name,
          size,
          public: visibility,
          rack: rackLocation,
          start: rackPosition,
          resourcetype: objType,
          ...details,
        },
        token,
        id
      );

      console.log(obj);
      alert("A new Object has been created!");
      setRedirect(true);
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
            <option value="PR">Private</option>
            <option value="RO">Read-Only</option>
            <option value="PB">Public</option>
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
            <option value="Server">Server</option>
            <option value="PatchPanel">Patch Panel</option>
            <option value="JBOD">JBODs</option>
            <option value="Switch">Switch</option>
            <option value="UPS">UPS</option>
          </select>
        </label>

        {/* gets all the possible racks and then lets user pick it? */}
        <label for="rack">
          Rack Location:
          <select
            value={rackLocation}
            onChange={(e) => {
              setRackLocation(e.target.value);
            }}
          >
            {rackOptions}
          </select>
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

        {(objType === "PatchPanel" || objType === "Switch") && (
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

        {objType === "UPS" && (
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

        {objType === "UPS" && (
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

        {objType === "UPS" && (
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

        {objType === "UPS" && (
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

        {objType === "Server" && (
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

        {objType === "Server" && (
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

        {(objType === "Server" || objType === "JBOD") && (
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

        {objType === "Server" && (
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

        {objType === "JBOD" && (
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
      {redirect && <Navigate to="/objects" />}
    </div>
  );
}
