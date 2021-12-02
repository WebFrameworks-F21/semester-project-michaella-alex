import React from "react";
import { Link, Redirect } from "react-router-dom";

export default function Racks(props) {
  return (
    <div>
      Objects
      <Link to="/objects/new">
        <button>New Rack</button>
      </Link>
    </div>
  );
}
