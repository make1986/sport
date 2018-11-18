import React from "react";
import { Link } from "react-router-dom";

export default function Add({ link }) {
  return (
    <Link to={link} className="addbutton">
      +
    </Link>
  );
}
