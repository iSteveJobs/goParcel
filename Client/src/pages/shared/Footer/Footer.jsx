import React from "react";
import GoParcel from "../goParcel/GoParcel";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700 mt-24 text-gray-200">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <GoParcel />
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Reliable door-to-door parcel delivery service across Bangladesh.
            Fast, secure & affordable logistics solution.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-green-500">Home</li>
            <li className="cursor-pointer hover:text-green-500">Coverage</li>
            <li className="cursor-pointer hover:text-green-500">Send Parcel</li>
            <li className="cursor-pointer hover:text-green-500">Login</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Document Delivery</li>
            <li>Non-Document Parcel</li>
            <li>Same District Delivery</li>
            <li>Nationwide Coverage</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-4 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-green-500" />
            <FaTwitter className="cursor-pointer hover:text-green-500" />
            <FaYoutube className="cursor-pointer hover:text-green-500" />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} GoParcel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
