import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import GoParcel from "../pages/shared/goParcel/GoParcel";
import Footer from "../pages/shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="p-12 bg-base-200">
      <GoParcel />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
            <img src={authImage} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default AuthLayout;
