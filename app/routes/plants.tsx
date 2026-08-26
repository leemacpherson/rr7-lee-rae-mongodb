import { useLoaderData, Outlet, Link } from "react-router";
import { FaPlus, FaDownload } from "react-icons/fa";
import PlantsList from "~/components/PlantsList";
import type { ActionFunctionArgs } from "react-router";

// Import safely from your server-only file
import { getPresignedDownloadUrl } from "~/data/s3.server";
import { getSupplies } from "~/data/items.server";

interface Plants {
  _id: string;
  description: string;
  amount: string;
  units: string;
  imageLocation?: string; // This will hold our temporary presigned URL
  location: string;
  type: string;
  volume: string;
}

interface LoaderData {
  items: Plants[];
}

// Server-side loader: Fetches data from MongoDB AND generates URLs
export async function loader(): Promise<LoaderData> {
  console.log("PLANTS LOADER");

  let mode = "plants"; // Default mode for plants

  const collectionName = "rr7-plants"; // Specify your collection name

  const plantsData = (await getSupplies({ collectionName })) as
    | { items?: Plants[] }
    | undefined;

  const items = plantsData?.items ?? []; // If plantsData is null or undefined, default to an empty array

  // Map every item in your array to resolve its signed download URL concurrently
  // wrap your .map() block inside a Promise.all() to prevent your loader from resolving early.

  const itemsWithUrls = await Promise.all(
    items.map(async (item) => {
      if (!item.imageLocation) {
        return item;
      }

      try {
        // Swap the internal file path/key with a temporary presigned URL

        const secureUrl = await getPresignedDownloadUrl(
          item.imageLocation,
          mode,
        );

        const updatedItem = { ...item, imageLocation: secureUrl };

        return updatedItem;
      } catch (error) {
        console.error(`Error signing URL for item ${item._id}:`, error);
        return item; // Fallback to item as-is if signing fails
      }
    }),
  );

  return { items: itemsWithUrls };
}

export function HydrateFallback() {
  return <p>Loading Plants...</p>;
}

export default function Plants() {
  // TypeScript now infers the type safely from the loader return
  const { items } = useLoaderData<typeof loader>();
  // console.log(".   $$$$.  Supplies items:", items);

  return (
    <>
      <Outlet />
      <main>
        <section className="w-full bg-gray-100 p-2 rounded-md mb-2 flex items-center justify-center">
          <div className="w-md flex items-center justify-between">
            <Link
              to="add"
              className="flex bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 items-center gap-2"
            >
              <FaPlus />
              <span>Add Plant</span>
            </Link>
          </div>
        </section>
        {/* Safely pass the actual array down */}
        <PlantsList plants={items} />
      </main>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // Custom logic to validate and process other form fields

  const plantsData = {
    plantName: formData.get("plantName"),
    description: formData.get("description"),
    units: formData.get("units"),
    location: formData.get("location"),
    amount: Number(formData.get("amount")),
    date: formData.get("date"),
    imageLocation: formData.get("fileUpload"), // This will be the value returned from uploadFileHandler
  };
  console.log("SS-action-1 in supplies.server, supplyData:", plantsData);
  return plantsData;
}
