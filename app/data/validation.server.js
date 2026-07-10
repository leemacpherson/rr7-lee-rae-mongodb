function isValidDescription(value) {
  return value && value.trim().length > 0 && value.trim().length <= 350;
}

function isValidType(value) {
  return value && value.trim().length > 0 && value.trim().length <= 30;
}

function isValidUnits(value) {
  return value === "cubic yards" || value === "cubic feet";
}

function isValidAmount(value) {
  let amountEntered;
  amountEntered = parseFloat(value);

  return !isNaN(amountEntered) && amountEntered > 0;
}

function isValidDate(value) {
  return value && new Date(value).getTime() < new Date().getTime();
}

export function validateSupplyInput(input) {
  let validationErrors = [];

  if (!isValidType(input.supplyType)) {
    validationErrors.push(
      "Invalid supply type. Must enter a short description .",
    );
  }
  if (!isValidDescription(input.description)) {
    validationErrors.push(
      "Invalid expense title. Must be at most 350 characters long.",
    );
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.push("Invalid amount. Must be  > 0");
  }

  if (!isValidUnits(input.units)) {
    validationErrors.push("Invalid units. Must be cubic yards, cubic feet");
  }

  if (!isValidDate(input.date)) {
    validationErrors.push("Invalid date. Must be a date no later than today.");
  }

  // if (!isValidImageLocation(input.imageLocation)) {
  //   validationErrors.imageLocation = "Invalid URL.";
  // }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  } else {
    return null;
  }
}
