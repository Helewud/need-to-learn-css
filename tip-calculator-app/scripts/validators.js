import {
  hasExistingDecimal,
  hasValidLength,
  isDecimalPoint,
  hasLeadingZero,
  isValidKey,
} from "./helpers.js";

/**
 * Validates that a decimal point isn't entered twice.
 * If the pressed key is a decimal point and the current value already contains one,
 * it prevents the key event from adding another decimal.
 */
export const validateDecimalInput = (event, value) => {
  if (isDecimalPoint(event.key) && hasExistingDecimal(value)) {
    event.preventDefault(); // Stops the event's default behavior
    return false;
  }
  return true;
};

/**
 * Validates and prevents decimal input
 */
export const preventDecimalInput = (event) => {
  if (isDecimalPoint(event.key)) {
    event.preventDefault();
    return true;
  }
  return false;
};

/**
 * Validates and prevents leading zero
 */
export const preventLeadingZeroInput = (event) => {
  if (hasLeadingZero(event.target.value) && event.key === "0") {
    event.preventDefault();
    return true;
  }

  if (hasLeadingZero(event.target.value) && event.key !== "0") {
    event.target.value = "";
  }

  false;
};

/**
 * Validates and prevents invalid key input
 * Valid input must be number or control key only
 */
export const preventInvalidInput = (event) => {
  if (!isValidKey(event.key)) {
    event.preventDefault();
    return true;
  }
  return false;
};

/**
 * Validates and prevents invalid key input
 */
export const preventInvalidInputLength = (event, validLength) => {
  if (!hasValidLength(event.target.value, validLength)) {
    event.preventDefault();
    return true;
  }
  return false;
};
