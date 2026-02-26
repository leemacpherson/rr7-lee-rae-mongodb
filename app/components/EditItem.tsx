import { Form } from "react-router";
import { useState } from "react";
// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function EditItem() {
  const [value, setValue] = useState("none");
  const handleChange = (event: any) => {
    setValue(event.target.value); // Update state on change
  };

  return (
    <Form method="post" className="pl-10 pr-10">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
          <h2 className="text-base/18 font-semibold text-blue-700 dark:text-white">
            Supply entry page
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
            Add each new item here.
          </p>

          <div className="mt-10">
            <label
              htmlFor="units"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white mr-6 pr-3"
            >
              choose units
              {/* The 'value' prop on <select> makes it a controlled component */}
              <select
                name="units"
                value={value}
                onChange={handleChange}
                defaultValue={"cubic feet"}
              >
                <option value="cubic feet">cubic feet</option>
                <option value="cubic yards">cubic yards</option>
              </select>
            </label>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="amount"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              how many cubic yards / feet?
            </label>
            <div className="mt-2">
              <input
                id="amount"
                name="amount"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                defaultValue={"1"}
              />
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
                <option value="potting soil, cactus">Cactus pottng soil</option>
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
                Write down information about what it was bought for, et cetera.
              </p>
            </div>

            {/* <div className="col-span-full">
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

            {/* <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-white/25">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-300 dark:text-gray-600"
                  />
                  <div className="mt-4 flex text-sm/6 text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:focus-within:outline-indigo-500 dark:hover:text-indigo-300"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm/6 font-semibold text-gray-900 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
