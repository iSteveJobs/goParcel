import React, { useState } from "react";
import { useLoaderData } from "react-router";
import BangladeshMap from "./BangladeshMap";

const Coverage = () => {
  const serviceCenters = useLoaderData();

  const [searchText, setSearchText] = useState("");
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const handleInputChange = (value) => {
    setSearchText(value);

    if (!value.trim()) {
      setFilteredCenters([]);
      return;
    }

    const filtered = serviceCenters.filter((center) =>
      center.district.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCenters(filtered);
  };

  const handleSearch = () => {
    if (filteredCenters.length > 0) {
      selectDistrict(filteredCenters[0]);
    } else {
      alert("District not found");
    }
  };

  const selectDistrict = (center) => {
    setSelectedCenter(center);
    setSearchText(center.district);
    setFilteredCenters([]);
  };

  return (
    <div className="py-20 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-3">
          Nationwide Coverage
        </h1>

        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          We deliver parcels across all 64 districts of Bangladesh with care and
          reliability.
        </p>

        {/* Search Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 max-w-xl mx-auto mb-12 shadow-sm relative">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search district"
              className="input w-full bg-white border border-slate-300 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-green-500"
              value={searchText}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button
              className="btn bg-green-500 text-white hover:bg-green-600 px-6"
              onClick={handleSearch}
            >
              Go
            </button>
          </div>

          {/* Suggestions */}
          {filteredCenters.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-slate-200 mt-2 rounded-md shadow-md max-h-60 overflow-y-auto z-20">
              {filteredCenters.map((center, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer text-slate-700 hover:bg-slate-100"
                  onClick={() => selectDistrict(center)}
                >
                  {center.district}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Map Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
          <BangladeshMap
            serviceCenters={serviceCenters}
            selectedCenter={selectedCenter}
          />
        </div>
      </div>
    </div>
  );
};

export default Coverage;
