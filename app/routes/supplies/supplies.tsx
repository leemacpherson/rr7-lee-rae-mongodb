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
  // return (
  //   <div className="py-8">
  //     <h2 className="text-4xl font-bold text-grey-900 mb-6">Our Supplies</h2>
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //       {items.map((supply) => (
  //         <div
  //           key={supply._id}
  //           className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
  //         >
  //           <h2 className="text-indigo-700 mb-4">{supply.type}</h2>
  //           <h3 className="text-xl font-semibold text-indigo-700 mb-2">
  //             {supply.description}
  //           </h3>
  //           <p className="text-gray-600 mb-4">{supply.units}</p>
  //           <img
  //             alt="photo here"
  //             src={supply.imageLocation}
  //             className="object-cover object-left rounded-full h-48 w-96"
  //           />

  //           <NavLink
  //             to={`/supplies/${supply._id}`}
  //             className={
  //               "inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
  //             }
  //           >
  //             View Details
  //           </NavLink>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
}
