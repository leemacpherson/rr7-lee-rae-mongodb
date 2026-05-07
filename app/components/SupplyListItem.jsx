import { Link, useFetcher } from "react-router";

function SupplyListItem({
  id,
  description,
  amount,
  supplyType,
  location,
  imageLocation,
  units,
}) {
  // const submit = useSubmit();
  const fetcher = useFetcher();
  // console.log("in SupplyListItem, the fetcher holds ", fetcher);
  let amountInt = parseInt(amount, 10);

  function editSupplyItemHandler() {
    console.log("Editing item with id ", id);
    console.log("the supply list item has fetcher of  ", fetcher);
    fetcher.submit(null, { method: "patch", action: `${id}` });

    if (fetcher.state !== "idle") {
      return (
        <article className="expense-item locked">
          <p>Deleting...</p>
        </article>
      );
    }
  }

  function deleteSupplyItemHandler() {
    const proceed = confirm("Are you sure? Do you want to delete this item?");

    if (!proceed) {
      return;
    }
    console.log("Deleting item with id ", id);
    console.log("the supply list item has fetcher of  ", fetcher);
    fetcher.submit(null, { method: "delete", action: `${id}` });

    if (fetcher.state !== "idle") {
      return (
        <article className="expense-item locked">
          <p>Deleting...</p>
        </article>
      );
    }
  }

  return (
    <article>
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">
        {supplyType}
      </h3>

      <p className="text-gray-600 mb-4">
        {amount} {units} in {location}
      </p>
      <h2 className=" text-indigo-700 mb-2">{description}</h2>
      <div className="w-full md:w-1/4">
        <div className="overflow-hidden rounded-md shadow-xl">
          <img
            src={imageLocation}
            alt="Explore supplies"
            className="w-full h-auto"
          />
        </div>
      </div>

      <menu className="flex gap-2 mt-4">
        <button
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          onClick={deleteSupplyItemHandler}
        >
          Delete
        </button>
        <Link
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          to={`/supplies/${id}`}
        >
          Edit
        </Link>
      </menu>
    </article>
  );
}

export default SupplyListItem;
