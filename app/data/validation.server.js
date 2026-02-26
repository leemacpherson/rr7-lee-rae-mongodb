function isValidDescription(value) {
  console.log("isValidDescription was passed this argument ", value);
  console.log(
    "isValidDescription returns",
    value && value.trim().length > 0 && value.trim().length <= 350,
  );

  return value && value.trim().length > 0 && value.trim().length <= 350;
}

// function isValidUnits(value) {
//   return value === "cubic yards" || "cubic feet" || "cu. yd." || "cu. ft.";
// }

function isValidUnits(value) {
  return (value === "cubic feet") | (value === "cubic yards");
}

// function isValidAmount(value) {
//   const amount = parseFloat(value);
//   return !isNaN(amount) && amount > 0;
// }

// function isValidDate(value) {
//   return value && new Date(value).getTime() < new Date().getTime();
// }

export function validateSupplyInput(input) {
  let validationErrors = {};
  console.log("validateSupplyInput just started");

  if (!isValidDescription(input.description)) {
    validationErrors.description =
      "Invalid expense title. Must be at most 30 characters long.";
  }

  if (!isValidUnits(input.units)) {
    validationErrors.units =
      "Invalid units. Must be cubic yards, cubic feet, cu. yd, cu. ft..";
  }

  // if (!isValidImageLocation(input.imageLocation)) {
  //   validationErrors.imageLocation = "Invalid URL.";
  // }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
