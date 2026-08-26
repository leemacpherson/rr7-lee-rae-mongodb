import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-linear-to-r from-purple-600 to-indigo-700 dark:from-purple-950 dark:to-slate-900 p-4 shadow-lg dark:shadow-purple-950/20 dark:border-b dark:border-purple-900/40 transition-colors duration-300">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-white dark:text-purple-100 text-3xl font-bold tracking-wide rounded-md px-2 p-1">
          Lee & Rae's Site
        </h1>
        <ul className="flex flex-wrap space-x-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 dark:text-yellow-400 font-bold border-b-2 border-yellow-300 dark:border-yellow-400 pb-1"
                : "text-white dark:text-gray-200 hover:text-yellow-200 dark:hover:text-yellow-300 transition duration-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/supplies"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 dark:text-yellow-400 font-bold border-b-2 border-yellow-300 dark:border-yellow-400 pb-1"
                : "text-white dark:text-gray-200 hover:text-yellow-200 dark:hover:text-yellow-300 transition duration-300"
            }
          >
            Supplies
          </NavLink>
          <NavLink
            to={"/plants"}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-200 transition duration-300"
            }
          >
            Plants
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
            to={"/auth"}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-200 transition duration-300"
            }
          >
            Login
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
