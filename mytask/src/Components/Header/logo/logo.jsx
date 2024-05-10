import React from "react";
import "./logo.css";
import { IoLogoReact } from "react-icons/io5";

function Logo() {
  return (
    <div className="logo">
      <IoLogoReact className="iconlogo" />
      <div className="title-logo">Taskjet</div>
      {/* Stollie */}
    </div>
  );
}

export default Logo;
