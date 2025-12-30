import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Normal marker
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Highlighted marker
const highlightIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [35, 50],
  iconAnchor: [17, 50],
});

// Map controller for flyTo and popup
const FlyToDistrict = ({ center, markerRefs }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo([center.latitude, center.longitude], 10, {
        duration: 1.5,
      });

      // Popup open
      const marker = markerRefs.current[center.district];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [center, map, markerRefs]);

  return null;
};

const BangladeshMap = ({ serviceCenters, selectedCenter }) => {
  const bangladeshCenter = [23.685, 90.3563];
  const markerRefs = useRef({});

  return (
    <div className="relative z-0 w-full h-[700px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={bangladeshCenter}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Fly to searched district */}
        <FlyToDistrict center={selectedCenter} markerRefs={markerRefs} />

        {serviceCenters.map((center, index) => (
          <Marker
            key={index}
            position={[center.latitude, center.longitude]}
            icon={
              selectedCenter?.district === center.district
                ? highlightIcon
                : defaultIcon
            }
            ref={(ref) => {
              if (ref) markerRefs.current[center.district] = ref;
            }}
          >
            <Popup>
              <strong>{center.district}</strong>
              <br />
              Covered Areas: {center.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
