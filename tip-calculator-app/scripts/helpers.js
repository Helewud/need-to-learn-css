export const CONTROL_KEYS = new Set([
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
  "Escape",
]);

/**
 * Checks if a given key is a control key.
 */
export const isControlKey = (key) => CONTROL_KEYS.has(key);

/**
 * Checks if the key represents a numeric figure.
 */
export const isNumberKey = (key) => /^[0-9]$|^Numpad[0-9]$|^[.]$/.test(key);

/**
 * Determines if a key is valid for input.
 * A valid key is one that is not invalid and is either a control key or a number key.
 */
export const isValidKey = (key) => isControlKey(key) || isNumberKey(key);

/**
 * Checks if the input value's length is within the allowed limit.
 * The length is calculated by removing the decimal point.
 */
export const hasValidLength = (value, validLength) =>
  value.replace(".", "").length < validLength;

/**
 * Checks if the given key is a decimal point.
 */
export const isDecimalPoint = (key) => key === ".";

/**
 * Checks if the input string already contains a decimal point.
 */
export const hasExistingDecimal = (value) => value.includes(".");

/**
 * Calculates the tip based on the provided amount and tip percentage.
 */
export const calculateTip = (amount, percentage) =>
  ((Number(percentage) / 100) * Number(amount)).toFixed(2);

/**
 * Splits the calculated tip among a number of people.
 */
export const splitTip = (calcTip, splitNum) =>
  (Number(calcTip) / Number(splitNum)).toFixed(2);

/**
 * Checks if given value starts with "0"
 */
export const hasLeadingZero = (value) => value.startsWith("0");
