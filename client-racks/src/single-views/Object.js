import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Object({ token, user }) {
  // const { id } = useParams();
  const id = 5;
  const [rack, setRack] = useState({});
  const [obj, setObj] = useState();
  // const [objRack, setObjRack] = useState({});
  const [objRows, setObjRows] = useState([]);

  useEffect(() => {
    async function getObject() {
      try {
        const responseObject = await fetch(
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
        const objectJSON = await responseObject.json();
        // console.log(json);
        // setObj(objectJSON);

        const responseRack = await fetch(
          `http://localhost:8000/racks/rackspace/${objectJSON.rack_detail.id}/`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        const rackJSON = await responseRack.json();

        // setObjRack(rackJson.rack_detail);
        // console.log("get object is called");
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }

    getObject();
  }, []);

  // useEffect(() => {
  //   async function getRack() {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8000/racks/rackspace/${obj.rack_detail.id}/`,
  //         {
  //           method: "GET",
  //           mode: "cors",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Token ${token}`,
  //           },
  //         }
  //       );
  //       const json = await response.json();
  //       console.log("get rack is called");
  //       setRack(json);
  //     } catch (error) {
  //       console.log(error, "something went wrong");
  //     }
  //   }

  //   if (objRack) {
  //     getRack();
  //   }
  // }, [obj]);

  // useEffect(() => {
  //   if (rack.items) {
  //     const object = rack.items;
  //     let rows = [];
  //     let index = 0;

  //     for (let i = 1; i < rack.size + 1; i++) {
  //       if (object[index]) {
  //         if (object[index].start === i) {
  //           // console.log("object is occupying at position", i);
  //           rows.push(
  //             <tr>
  //               <td>{i}</td>
  //               <td rowspan={object[index].size}>{object[index].name}</td>
  //             </tr>
  //           );
  //           index++;
  //           continue;
  //         }
  //       }
  //       rows.push(
  //         <tr>
  //           <td>{i}</td>
  //         </tr>
  //       );
  //     }
  //     setObjRows((state) => rows);
  //   }

  //   console.log("get obj rows is called");
  // }, []);

  return (
    <div>
      <h2>Object {obj.name}</h2>
      {/* <h3>Located in Rack {objRack.name}</h3> */}
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
        {objRows}
      </table>
    </div>
  );
}
