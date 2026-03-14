function isValidDescription(value) {
  return value && value.trim().length > 0 && value.trim().length <= 350;
}

function isValidUnits(value) {
  console.log("in isValidUnits(), value has ", value);
  return value === "squareFeet" || value === "squareYards";
}

function isValidAmount(value) {
  let amountEntered;
  amountEntered = parseFloat(value);
  console.log("amount in isValidAmount ", amountEntered);
  return !isNaN(amountEntered) && amountEntered > 0;
}

// function isValidDate(value) {
//   return value && new Date(value).getTime() < new Date().getTime();
// }

export function validateSupplyInput(input) {
  let validationErrors = {};

  if (!isValidDescription(input.description)) {
    validationErrors.description =
      "Invalid expense title. Must be at most 30 characters long.";
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount = "Invalid amount. Must be  > 0";
  }

  if (!isValidUnits(input.units)) {
    validationErrors.units = "Invalid units. Must be cubic yards, cubic feet";
  }

  // if (!isValidImageLocation(input.imageLocation)) {
  //   validationErrors.imageLocation = "Invalid URL.";
  // }
  console.log("right before returning to addItem ", validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    console.log("validation error is ", validationErrors);
    throw validationErrors;
  }
}
