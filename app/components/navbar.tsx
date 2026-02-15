import React from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <div className="bg-linear-to-r from-purple-200 to-indigo-600 p-4 shadow-lg">
      <div className="container flex flex-col md:flex-row items-center py-5 justify-between mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="text-xl font-black text-blue-500 select-none ">
              Lee & Rae's{" "}
            </span>
            <span className="text-blue-800">Website</span>
          </NavLink>
          <nav className="flex-wrap items-center ml-0 md:ml-8 md:border-l md:pl-8">
            <NavLink
              to="/"
              end
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              About
            </NavLink>
            <NavLink
              to="/addItem"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Add an item
            </NavLink>
            <NavLink
              to="/supplies"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Supplies
            </NavLink>
            <NavLink
              to="/forms"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Forms
            </NavLink>
            <NavLink
              to="/dashboard"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/contact"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
// first div is to wrap the entire navbar around
// second div is to define the structure of it
// third div is to contain our logo
// The <span> is to eliminate any padding between the two sets of text
// The first NavLink is for making the 'logo' clickable
