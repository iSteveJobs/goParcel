import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router/dom";
import { router } from "./router/router.jsx";

import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";

Aos.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Full width background */}
    <div className="font-inter bg-gray-50 min-h-screen">
      {/* Centered content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </div>
  </StrictMode>
);
