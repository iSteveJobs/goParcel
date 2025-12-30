import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const GoParcel = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-2" src={logo} alt="" />
        <p className="text-3xl font-extrabold -ms-2">
          <span className="text-green-500">go</span>
          <span className="text-blue-800">Parcel</span>
        </p>
      </div>
    </Link>
  );
};

export default GoParcel;
