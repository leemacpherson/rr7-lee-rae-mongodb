import { Link, useFetcher } from "react-router";

function SupplyListItem({ id, description, amount, supplyType, units }) {
  // const submit = useSubmit();
  const fetcher = useFetcher();
  // console.log("in SupplyListItem, the fetcher holds ", fetcher);
  let amountInt = parseInt(amount, 10);

  function deleteSupplyItemHandler() {
    const proceed = confirm("Are you sure? Do you want to delete this item?");

    if (!proceed) {
      return;
    }
    console.log("Deleting item with id ", id);
    console.log("the supply list item has fetcher of  ", fetcher);
    fetcher.submit(null, { method: "delete", action: `${id}` });
  }

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article>
      <h2 className="text-indigo-700 mb-4">{supplyType}</h2>
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">
        {description}
      </h3>
      <p className="text-gray-600 mb-4">{units}</p>

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
