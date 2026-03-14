const units = [
  {
    id: "sqFeet",
    name: "sqFeet",
    description: "square feet",
  },
  {
    id: "sqYards",
    name: "sqYards",
    description: "square yards",
  },
];

export default function RadioButtons() {
  return (
    <fieldset aria-label="Plan">
      <div className="flex space-x-4 space-y-5">
        {units.map((unit) => (
          <div key={unit.id} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                defaultChecked={unit.id === "small"}
                id={unit.id}
                name="plan"
                type="radio"
                aria-describedby={`${unit.id}-description`}
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
              />
            </div>
            <div className="ml-3 text-sm/6">
              <label
                htmlFor={unit.id}
                className="font-medium text-gray-900 dark:text-white"
              >
                {unit.description}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
