import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import {
  Form,
  Link,
  useActionData,
  useMatches,
  useParams,
  useNavigation,
} from "react-router";

const locations = [
  { id: 1, name: "unspecified location" },
  { id: 2, name: "big shed in lower yard" },
  { id: 3, name: "small shed in lower yard" },
  { id: 4, name: "in basement" },
  { id: 5, name: "under kitchen under house" },
  { id: 6, name: "laundry room cabinet right side" },
  { id: 7, name: "laundry room cabinet left side" },
];

export default function SupplyForm() {
  const [selected, setSelected] = useState(locations[3]);
  const actionData = useActionData();

  const params = useParams();
  const paramsId = String(params.id);
  const matches = useMatches();

  let supplyData;
  let validationErrors;

  if (matches) {
    // Safely grab supplyData
    const routeMatch = matches?.find((match) => match.id === "routes/supplies");
    console.log("routeMatch in SupplyForm.jsx", routeMatch);
    const supplies = routeMatch?.data?.items;
    supplyData = supplies?.find((supply) => supply._id === paramsId);

    if (actionData?.errors) {
      // Access Zod's .flatten() or field errors safely
      console.log("-------Validation Errors:", actionData.errors);
      console.log(
        "+++++++ supplyType error in Validation Errors:",
        actionData.errors.properties.supplyType.errors[0],
      );
      validationErrors = actionData.errors.properties;
      console.log(
        "%%%%%%%%%% validationErrors in SupplyForm.jsx",
        validationErrors,
      );
      console.log(
        "^^^^^^^^^ validationErrors.supplyType in SupplyForm.jsx",
        validationErrors.supplyType.errors[0],
      );
    }
  }

  const navigation = useNavigation();

  // const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const defaultValues = supplyData
    ? {
        supplyType: supplyData.supplyType,
        amount: supplyData.amount,
        units: supplyData.units,
        description: supplyData.description,
        location: supplyData.location,
        imageLocation: supplyData.imageLocation,
        fileUpload: supplyData.fileUpload,
        date: supplyData.date,
      }
    : {
        supplyType: "",
        amount: "",
        units: "",
        description: "",
        location: "",
        imageLocation: "",
        fileUpload: "placeholder.jpg",
        date: "",
      };
  const enteredAmount = actionData?.fields?.amount ?? defaultValues.amount;
  const enteredUnits = actionData?.fields?.units ?? "cubic yards"; // or your default

  const isSubmitting = navigation.state !== "idle";
  console.log(actionData, "actionData in SupplyForm.jsx");
  return (
    <Form
      method={supplyData ? "patch" : "post"}
      encType="multipart/form-data"
      id="expense-form"
      className="pl-10"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
          <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
            <div className="pl-4 py-8  border-slate-200">
              <div>
                <label
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  htmlFor="supplyType"
                >
                  Supply Type
                </label>
                <input
                  id="supplyType"
                  name="supplyType"
                  type="text"
                  defaultValue={defaultValues?.supplyType || ""}
                  placeholder="enter soil, pots, etc."
                  className="block w-1/2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
                {/* Render supply type validation errors if they exist */}
                {validationErrors?.supplyType?.errors && (
                  <p style={{ color: "red" }}>
                    {validationErrors.supplyType.errors[0]}
                  </p>
                )}
              </div>

              <p>
                <label
                  htmlFor="amount"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </label>
                <input
                  className="block w-1/2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  type="number"
                  id="amount"
                  name="amount"
                  min="0"
                  step="1"
                  required
                  defaultValue={defaultValues.amount}
                />
                {/* Render amount validation errors if they exist */}
                {validationErrors?.amount?.errors && (
                  <p style={{ color: "red" }}>
                    {validationErrors.amount.errors[0]}
                  </p>
                )}
              </p>

              <div className="flex items-center gap-x-6 mt-4">
                <div className="flex items-center gap-x-3">
                  <input
                    defaultChecked
                    id="cuYards"
                    name="units"
                    type="radio"
                    value="cubic yards"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="cuYards"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  >
                    Cubic Yards
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="cuFeet"
                    name="units"
                    type="radio"
                    value="cubic feet"
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
                  required
                  defaultValue={
                    defaultValues.date ? defaultValues.date.slice(0, 10) : ""
                  }
                />
              </p>
              {/* Render date validation errors if they exist */}
              {validationErrors?.date?.errors && (
                <p style={{ color: "red" }}>
                  {validationErrors.date.errors[0]}
                </p>
              )}

              <div className=" fixed mt-1 mb-1 pt-2 pb-2 w-80 max-w-1/2 left-0. bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <Listbox
                  name="location"
                  value={selected.name}
                  defaultValue={defaultValues.location}
                  onChange={setSelected}
                >
                  <Label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                    Located in...
                  </Label>
                  <div className="relative mt-2">
                    <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:focus-visible:outline-indigo-500">
                      <span className="col-start-1 row-start-1 truncate pr-6">
                        {selected.name}
                      </span>
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                      />
                    </ListboxButton>

                    <ListboxOptions
                      transition
                      className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                    >
                      {locations.map((person) => (
                        <ListboxOption
                          key={person.id}
                          value={person}
                          className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden dark:text-white dark:data-focus:bg-indigo-500"
                        >
                          <span className="block truncate font-normal group-data-selected:font-semibold">
                            {person.name}
                          </span>

                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white dark:text-indigo-400">
                            <CheckIcon aria-hidden="true" className="size-5" />
                          </span>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>

              <p>
                <label
                  className="block pt-12 mt-16 text-sm/6 font-medium py-2 text-gray-900 dark:text-white"
                  htmlFor="description"
                >
                  Description and notes about the supply item
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  className="block w-full rounded-md bg-white px-3 mt-2 mb-2 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  defaultValue={defaultValues.description}
                />
              </p>
              {/* 
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="size-12 text-gray-300 dark:text-gray-500"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
                  >
                    Change
                  </button>
                </div>
              </div> */}

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Upload a photo of the supply item (optional)
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-3 dark:border-white/25">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-8 text-gray-300 dark:text-gray-600"
                    />
                    <div className="mt-4 flex text-sm/6 text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="fileUpload"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:focus-within:outline-indigo-500 dark:hover:text-indigo-300"
                      >
                        <span>Upload a file</span>
                        <input
                          id="fileUpload"
                          name="fileUpload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
