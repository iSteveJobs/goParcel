import React from "react";
import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";

const clientLogos = [
  amazon,
  amazonVector,
  casio,
  moonstar,
  randstad,
  star,
  startPeople,
];

const Brands = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-extrabold text-center mb-4 text-blue-900 ">
          We've helped thousands of sales teams
        </h2>

        <Marquee speed={50} pauseOnHover gradient={false}>
          {clientLogos.map((logo, index) => (
            <div key={index} className="mx-10 flex items-center justify-center">
              <img
                src={logo}
                alt="Client Logo"
                className="w-auto object-contain transition"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Brands;
