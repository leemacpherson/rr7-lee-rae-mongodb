import { Form } from "react-router";
import { useState } from "react";
import ErrorEditItem from "./ErrorEditItem";

// import RadioButtons from "./RadioButtons";
// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function EditItem() {
  const [value, setValue] = useState("none");
  const [selectedUnits, setSelectedUnits] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value); // Update state on change
  };

  const handleUnitsChange = (event: any) => {
    console.log(
      "in EditItem, we just entered handleUnitsChange and event holds ",
      event.target.value,
    );
    setSelectedUnits(event.target.value);
  };

  return (
    <Form method="post" className="pl-10 pr-10">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
          <h2 className="text-base/18 font-extrabold text-blue-700 dark:text-white">
            Supply entry page
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
            Add each new item here.
          </p>

          <div className="col-span-full">
            <div className="flex items-center space-x-4 flex-nowrap">
              <label
                htmlFor="amount"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                how many cubic yards / feet?
              </label>
              <input
                id="amount"
                name="amount"
                type="text"
                autoComplete="given-name"
                className="block w-1/12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />

              <div className="flex space-x-4 gap-10">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex space-x-4 items-center cursor-pointer"
                    htmlFor="squareFeet"
                  >
                    <input
                      name="units"
                      type="radio"
                      className="ml-4 relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                      id="squareFeet"
                      value="squareFeet"
                      checked={selectedUnits === "squareFeet"}
                      onChange={handleUnitsChange}
                    />
                  </label>
                  <label
                    className="ml-2 text-slate-600 cursor-pointer text-sm"
                    htmlFor="squareFeet"
                  >
                    square feet
                  </label>
                  <label
                    className="relative flex items-center cursor-pointer pr-4"
                    htmlFor="squareFeet"
                  >
                    <input
                      name="units"
                      type="radio"
                      className="ml-4 relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                      id="squareYards"
                      value="squareYards"
                      checked={selectedUnits === "squareYards"}
                      onChange={handleUnitsChange}
                    />
                  </label>
                  <label
                    className="text-slate-600 cursor-pointer text-sm"
                    htmlFor="squareYards"
                  >
                    square yards
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <label
                htmlFor="type"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white mr-6 pr-3"
              >
                choose the type of supply:
                {/* The 'value' prop on <select> makes it a controlled component */}
                <select name="type" value={value} onChange={handleChange}>
                  <option value="potting soil, outdoor">
                    Outdoor potting soil
                  </option>
                  <option value="potting soil, indoor">
                    Indoor potting soil
                  </option>
                  <option value="potting soil, cactus">
                    Cactus pottng soil
                  </option>
                  <option value="pumic">Pumice</option>
                </select>
              </label>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Where it is stored (below)
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 dark:text-gray-400"></div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="small garden shed"
                      className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                      defaultValue={"lower yard"}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Description and notes
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">
                  Write down information about what it was bought for, et
                  cetera.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-self-start gap-x-6">
          <button
            type="button"
            className="rounded-md bg-indigo-300 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
          >
            Save
          </button>
          <ErrorEditItem />
        </div>
      </div>
    </Form>
  );
}
