import { useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useMatches,
  useParams,
  useNavigation,
} from "react-router";

function SupplyForm(supplyData) {
  const [cuFeetIsChecked, setcuFeetIsChecked] = useState(true);
  const [cuYardsIsChecked, setcuYardsIsChecked] = useState(false);
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const params = useParams();
  const matches = useMatches();
  // const supplies = matches.find((match) => match.id === "routes/supplies");
  // const supplyData = supplies.find((supply) => supply.id === params.id);
  const navigation = useNavigation();

  const handleChangeSqFeet = () => {
    // Toggle the state when the checkbox is clicked
    console.log("checked a checkbox -cuFeetIsChecked ", cuFeetIsChecked);
    setcuFeetIsChecked(!cuFeetIsChecked);
  };

  const defaultValues = supplyData
    ? {
        supplyType: supplyData.supplyType,
        id: supplyData.id,
        amount: supplyData.amount,
        units: supplyData.units,
        description: supplyData.description,
        date: supplyData.createdAt,
        location: supplyData.location,
        imageLocation: supplyData.imageLocation,
      }
    : {
        supplyType: "potting soil, for example",
        id: "",
        amount: "",
        units: "",
        description: "",
        date: "",
        location: "",
        imageLocation: "",
      };

  const isSubmitting = navigation.state !== "idle";

  return (
    <Form
      method={supplyData ? "patch" : "post"}
      id="expense-form"
      className="pl-10"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
          <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
            <div className="pl-4 py-8  border-slate-200">
              <p>
                <label
                  className="block text-lg/6 font-medium text-gray-900 dark:text-white"
                  htmlFor="supplyType"
                >
                  Supply Type
                </label>
                <input
                  id="supplyType"
                  name="supplyType"
                  type="text"
                  autoComplete="given-name"
                  className="block w-1/2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
              </p>

              <p>
                <label
                  htmlFor="amount"
                  className="block text-lg/6 font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </label>
                <input
                  className="block w-1/2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  type="number"
                  id="amount"
                  name="amount"
                  min="0"
                  step="0.01"
                  required
                  defaultValue={defaultValues.amount}
                />
              </p>

              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    defaultChecked
                    id="cuYards"
                    name="units"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="cuYards"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  >
                    Cubic Inches
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="cuFeet"
                    name="units"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="cuFeet"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  >
                    Cubic Feet
                  </label>
                </div>
              </div>

              <p>
                <label
                  htmlFor="date"
                  className="mt-4 block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  className="block w-1/2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  type="date"
                  id="date"
                  name="date"
                  max={today}
                  required
                  defaultValue={
                    defaultValues.date ? defaultValues.date.slice(0, 10) : ""
                  }
                />
              </p>
            </div>
          </div>

          {validationErrors && <p>Validation Errors</p>}

          {/* {validationErrors && (
            <ul>
              {Object.values(validationErrors).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )} */}

          <div className="w-full p-2 rounded-md mb-2 flex items-center justify-center">
            <div className="w-md flex items-center justify-between">
              <button
                className="flex bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Expense"}
              </button>
              <Link
                className="flex bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 items-center gap-2 mr-2"
                to=".."
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default SupplyForm;
