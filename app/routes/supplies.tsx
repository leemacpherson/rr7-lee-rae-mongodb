import { Form, NavLink } from "react-router";
import { getDb } from "../data/db.server";
import type { Route } from "./+types/supplies";

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
export async function loader() {
  const db = await getDb();
  const data = await db.collection("rr7-supplies").find().toArray();
  console.log(
    "LOADER in supplies route, when we run getDb( what we get back is ",
    data,
  );
  // Serialize _id to string for component usage
  return {
    items: data.map((i) => ({ ...i, _id: i._id.toString() })) as Supply[],
  };
}

export default function Supplies({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData;
  console.log(
    "SUPPLIES component - in supplies route, when we run deconstruct loaderData, what we get back is ",
    items,
  );
  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold text-grey-900 mb-6">Our Supplies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((supply) => (
          <div
            key={supply._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <h2 className="text-indigo-700 mb-4">{supply.type}</h2>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {supply.description}
            </h3>
            <p className="text-gray-600 mb-4">{supply.units}</p>
            <img
              alt="photo here"
              src={supply.imageLocation}
              className="object-cover object-left rounded-full h-48 w-96"
            />

            <NavLink
              to={`/supplies/${supply._id}`}
              className={
                "inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
              }
            >
              View Details
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
