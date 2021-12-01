import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

export default function DashBoard(props) {
  return (
    <div>
      Dashboard, no strangers allowed
      <div class="dash-menu">
        <Link to="/racks">
          <div class="dash-button">Racks</div>
        </Link>
        <Link to="/objects">
          <div class="dash-button">Objects</div>
        </Link>
        <Link to="/ipv4">
          <div class="dash-button">Ipv4 Space</div>
        </Link>
      </div>
    </div>
  );
}
