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

export default function PlantForm() {
  // const [selected, setSelected] = useState(locations[3]);
  const actionData = useActionData();

  const params = useParams();
  const paramsId = String(params.id);
  const matches = useMatches();

  let plantData;
  let validationErrors;

  if (matches) {
    // Safely grab plantData
    const routeMatch = matches?.find((match) => match.id === "routes/plants");
    console.log("routeMatch in PlantForm.jsx", routeMatch);
    const plants = routeMatch?.data?.items;
    plantData = plants?.find((plant) => plant._id === paramsId);
  }

  const navigation = useNavigation();

  // const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const defaultValues = plantData
    ? {
        plantType: plantData.plantType,
        amount: plantData.amount,
        units: plantData.units,
        description: plantData.description,
        location: plantData.location,
        imageLocation: plantData.imageLocation,
        fileUpload: plantData.fileUpload,
        date: plantData.date,
      }
    : {
        plantType: "",
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
  console.log(actionData, "actionData in PlantForm.jsx");
  return (
    <Form
      method={plantData ? "patch" : "post"}
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
                  htmlFor="plantype"
                >
                  Plant Type
                </label>
                <input
                  id="plantType"
                  name="plantType"
                  type="text"
                  defaultValue={defaultValues?.plantType || ""}
                  placeholder="enter soil, pots, etc."
                  className="block w-1/2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
                {/* Render plant type validation errors if they exist */}
                {validationErrors?.plantType?.errors && (
                  <p style={{ color: "red" }}>
                    {validationErrors.plantType.errors[0]}
                  </p>
                )}
              </div>

              <p>
                <label
                  htmlFor="amount"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Quantity of the plant
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
                    id="perennial"
                    name="units"
                    type="radio"
                    value="perennial"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="perennial"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  >
                    perennial
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="annual"
                    name="units"
                    type="radio"
                    value="annual"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="annual"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                  >
                    annual
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

              <div className="flex flex-col gap-y-4 mt-4">
                {/* First Row: 3 items */}
                <div className="flex items-center gap-x-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      defaultChecked
                      id="the-wedge"
                      name="location"
                      type="radio"
                      value="the wedge"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor="the-wedge"
                      className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                    >
                      The Wedge
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      id="raised-bed"
                      name="location"
                      type="radio"
                      value="raised bed"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor="raised-bed"
                      className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                    >
                      Raised Bed
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      id="lower-terrace"
                      name="location"
                      type="radio"
                      value="lower terrace"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor="lower-terrace"
                      className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                    >
                      Lower Terrace
                    </label>
                  </div>
                </div>

                {/* Second Row: Starts at 4th item (Back Deck) */}
                <div className="flex items-center gap-x-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="back-deck"
                      name="location"
                      type="radio"
                      value="back deck"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor="back-deck"
                      className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                    >
                      Back Deck
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      id="front-deck"
                      name="location"
                      type="radio"
                      value="front deck"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor="front-deck"
                      className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                    >
                      Front Deck
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      id="other-location"
                      name="location"
                      type="radio"
                      value="other"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor="other-location"
                      className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                    >
                      Other (see description)
                    </label>
                  </div>
                </div>
              </div>

              <p>
                <label
                  className="block pt-2 mt-4 text-sm/6 font-medium py-2 text-gray-900 dark:text-white"
                  htmlFor="description"
                >
                  Description of the plant (optional)
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
                {isSubmitting ? "Saving..." : "Save Plant"}
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
