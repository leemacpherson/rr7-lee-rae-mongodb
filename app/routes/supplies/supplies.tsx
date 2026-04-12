import { Form, NavLink } from "react-router";
import { getSupplies } from "../../data/supplies.server";
import type { Route } from "./+types/supplies";
import { Outlet, Link } from "react-router";
import { FaPlus, FaDownload } from "react-icons/fa";
import SuppliesList from "~/components/SuppliesList";

interface Supply {
  _id: string;
  description: string;
  amount: string;
  units: string;
  imageLocation?: string;
  location: string;
  type: string;
  volume: string;
}

// Server-side loader: Fetches data from MongoDB
export async function loader(): Promise<{ items: Supply[] }> {
  console.log("SUPPLIES LOADER");
  return getSupplies() as unknown as { items: Supply[] };
}

export default function Supplies({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData;

  return (
    <>
      <Outlet />
      <main>
        <section
          className={
            " w-full bg-gray-100 p-2 rounded-md mb-2 flex items-center justify-center"
          }
        >
          <div className="w-md flex items-center justify-between">
            <Link
              to="add"
              className="flex bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 items-center gap-2"
            >
              <FaPlus />
              <span>Add Expense</span>
            </Link>
            <a
              className="flex bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 items-center gap-2 mr-2"
              href="/expenses/raw"
            >
              <FaDownload />
              <span>Load Raw Data</span>
            </a>
          </div>
        </section>
        <SuppliesList supplies={items} />
      </main>
    </>
  );
}
