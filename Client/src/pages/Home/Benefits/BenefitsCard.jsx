import React from "react";

const BenefitCard = ({ image, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition gap-4 w-full">
      {/* Left Image */}
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="h-24 w-24 object-contain"
        />
      </div>

      {/* Vertical Line */}
      <div className="hidden md:block w-px bg-gray-300 mx-4 self-stretch"></div>

      {/* Right Content */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-semibold mb-2 text-blue-950">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
