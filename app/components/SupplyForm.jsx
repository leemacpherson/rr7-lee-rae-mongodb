import { useState } from "react";

// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import {
  Form,
  Link,
  useActionData,
  useMatches,
  useParams,
  useNavigation,
} from "react-router";

export default function SupplyForm() {
  // const [selected, setSelected] = useState(locations[3]);
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

    // if (actionData?.errors) {
    //   // Access Zod's .flatten() or field errors safely
    //   console.log("-------Validation Errors:", actionData.errors);
    //   console.log(
    //     "+++++++ supplyType error in Validation Errors:",
    //     actionData.errors.properties.supplyType.errors[0],
    //   );
    //   validationErrors = actionData.errors.properties;
    //   console.log(
    //     "%%%%%%%%%% validationErrors in SupplyForm.jsx",
    //     validationErrors,
    //   );
    //   console.log(
    //     "^^^^^^^^^ validationErrors.supplyType in SupplyForm.jsx",
    //     validationErrors.supplyType.errors[0],
    //   );
    // }
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
  // The ?? defaultValues.amount checks if the expression on the left is nullish (meaning strictly null or undefined). If it is, it uses defaultValues.amount instead.

  // const enteredAmount = actionData?.fields?.amount ?? defaultValues.amount;
  // const enteredUnits = actionData?.fields?.units ?? "cubic yards"; // or your default

  const isSubmitting = navigation.state !== "idle";
  console.log(actionData, "actionData in SupplyForm.jsx");
  return (
    <Form
      method={supplyData ? "patch" : "post"}
      encType="multipart/form-data"
      id="expense-form"
      className="pl-10 display: block min-h-dvh "
      noValidate
    >
      <div className="space-y-14 ">
        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
          <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
            <div className="pl-4 py-4ß  border-slate-200">
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
                  step=".5"
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

              <div className="flex items-center gap-x-6 mt-4">
                <div className="flex items-center gap-x-3">
                  <input
                    defaultChecked
                    id="large shed"
                    name="location"
                    type="radio"
                    value="large shed"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="large shed"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  >
                    Large Shed
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="small shed"
                    name="location"
                    type="radio"
                    value="small shed"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="small shed"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  >
                    Small Shed
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="laundry room cabinet"
                    name="location"
                    type="radio"
                    value="laundry room cabinet"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="laundry room cabinet"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  >
                    Laundry Room Cabinet
                  </label>
                </div>
              </div>

              <p>
                <label
                  className="block pt-2 mt-4 text-sm/6 font-medium py-2 text-gray-900 dark:text-white"
                  htmlFor="description"
                >
                  Description of the supply item
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  className="block w-full rounded-md bg-white px-1 mt-2 mb-2 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  defaultValue={defaultValues.description}
                />
              </p>

              {/* this section is for allowing for the image to be changed 
              see the older versions of this component for the code that was there */}

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Upload a photo of the supply item (optional)
                </label>
                <div className="flex relative justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-3 dark:border-white/25">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-8 text-gray-300 dark:text-gray-600"
                    />
                    <div className="flex text-sm/6 text-gray-600 dark:text-gray-400">
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

          <div className="w-full p-0.5 rounded-md flex items-center justify-center">
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
