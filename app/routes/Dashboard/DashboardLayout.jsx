import React from "react";
import { NavLink, Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col md:flex-row py-8">
      <aside className="md:w-1/4 p-4 bg-gray-50 rounded-lg shadow-md md:mr-6 md:mb-0">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Dashboard Navigation
        </h3>
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "block bg-blue-100 text-blue-800 font-semibold py-2 px-3 rounded-md"
                  : "block text-gray-700 hover:bg-gray-200 py-2 px-3 rounded-md transition duration-200"
              }
            >
              Dashboard Home
            </NavLink>
            <NavLink
              to="/dashboard/profile"
              end
              className={({ isActive }) =>
                isActive
                  ? "block bg-blue-100 text-blue-800 font-semibold py-2 px-3 rounded-md"
                  : "block text-gray-700 hover:bg-gray-200 py-2 px-3 rounded-md transition duration-200"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              end
              className={({ isActive }) =>
                isActive
                  ? "block bg-blue-100 text-blue-800 font-semibold py-2 px-3 rounded-md"
                  : "block text-gray-700 hover:bg-gray-200 py-2 px-3 rounded-md transition duration-200"
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="md:w-3/4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Dashboard Content
        </h2>
        {/* Outlet renders the matched child route element */}
        <Outlet />
      </div>
    </div>
  );
}
