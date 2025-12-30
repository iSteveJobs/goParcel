// components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({service}) => {
    const {icon: Icon, title, description} = service
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-400 hover:shadow-xl transition">
      <div className="text-primary text-4xl mb-4">
        <Icon />
      </div>
      <h3 className="font-semibold text-lg mb-2 text-primary">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
