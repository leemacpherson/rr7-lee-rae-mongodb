import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-linear-to-r from-purple-600 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-white text-3xl font-bold tracking-wide rounded-md px-2 p-1">
          Lee & Rae's Site
        </h1>
        <ul className="flex flex-wrap space-x-6 text-lg">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-200 transition duration-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-200 transition duration-300"
            }
          >
            About
          </NavLink>
          <NavLink
            to={"/supplies"}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-200 transition duration-300"
            }
          >
            Supplies
          </NavLink>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-200 transition duration-300"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/addItem"}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-200 transition duration-300"
            }
          >
            Add Supply
          </NavLink>
          <NavLink
            to={"/forms"}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-200 transition duration-300"
            }
          >
            Forms
          </NavLink>
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-200 transition duration-300"
            }
          >
            Contact
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
