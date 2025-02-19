/**
 * Converts a fraction (numerator/denominator) into a percentage string.
 *
 * @param {number|string} numerator - The part value.
 * @param {number|string} denominator - The whole value.
 * @returns {string} - The calculated percentage as a string (e.g., "75%").
 *
 */
export const convertToPercentage = (numerator, denominator) => {
  // Convert input values to numbers and calculate the percentage.
  const num = Number(numerator);
  const denom = Number(denominator);
  const percentage = (num / denom) * 100;
  return `${percentage}%`;
};

/**
 * Copies the provided password text to the system clipboard.
 *
 * @param {string} passwordText - The password text to copy.
 * @returns {Promise<boolean>} - Resolves to true if the copy was successful, false otherwise.
 *
 */
export const copyPasswordToClipboard = async (passwordText) => {
  // Check if the Clipboard API is available in the current browser.
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      // Attempt to write the text to the clipboard.
      await navigator.clipboard.writeText(passwordText);
      return true;
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  }

  // Warn if the Clipboard API is not supported.
  console.warn("Clipboard API not supported. Please update your browser!");
  return false;
};
/**
 * Generates a random password based on the provided configuration.
 *
 * @param {Object} config - Configuration for the password.
 * @param {number} config.length - Desired length of the password.
 * @param {boolean} config.includeUppercase - Whether to include uppercase letters.
 * @param {boolean} config.includeLowercase - Whether to include lowercase letters.
 * @param {boolean} config.includeNumbers - Whether to include numbers.
 * @param {boolean} config.includeSymbols - Whether to include special symbols.
 * @returns {string} - The generated password.
 */
export const generatePassword = (config) => {
  const {
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  } = config;

  // Define character sets.
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*-_=+|;:.?";

  // Build the pool of allowed characters.
  let allowedChars = "";
  if (includeUppercase) allowedChars += uppercaseChars;
  if (includeLowercase) allowedChars += lowercaseChars;
  if (includeNumbers) allowedChars += numberChars;
  if (includeSymbols) allowedChars += symbolChars;

  // If no character type is selected, return an empty string.
  if (allowedChars.length === 0) {
    return "";
  }

  // Generate the password by randomly picking characters from the allowed set.
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  return password;
};

/**
 * Determines the strength of a given password on a scale from 1 to 4.
 * The strength is based on length and the variety of character types present.
 *
 * @param {string} password - The password to evaluate.
 * @returns {number} - A strength score between 1 (weak) and 4 (very strong).
 *
 */
export const getPasswordStrength = (password) => {
  // Immediately rate weak if the password is too short.
  if (password.length < 8) {
    return 1;
  }

  let penalties = 0;
  const lowerPassword = password.toLowerCase();

  // 1. Check for dictionary/common words.
  const commonWords = [
    "password",
    "admin",
    "qwerty",
    "123456",
    "letmein",
    "welcome",
    "iloveyou",
  ];
  for (const word of commonWords) {
    if (lowerPassword.includes(word)) {
      penalties += 20;
      break; // Penalize once if any common word is found.
    }
  }

  // 2. Check for sequential characters (ascending or descending sequences of at least 3).
  let sequenceCount = 0;
  for (let i = 0; i < password.length - 2; i++) {
    const charCode0 = password.charCodeAt(i);
    const charCode1 = password.charCodeAt(i + 1);
    const charCode2 = password.charCodeAt(i + 2);
    // Ascending sequence (e.g., "abc", "123")
    if (charCode1 === charCode0 + 1 && charCode2 === charCode1 + 1) {
      sequenceCount++;
    }
    // Descending sequence (e.g., "cba", "321")
    if (charCode1 === charCode0 - 1 && charCode2 === charCode1 - 1) {
      sequenceCount++;
    }
  }
  penalties += sequenceCount * 5; // Apply a penalty for each detected sequence.

  // 3. Check for repeated characters (3 or more identical characters in a row).
  const repeatedCharRegex = /(\w)\1\1/;
  if (repeatedCharRegex.test(password)) {
    penalties += 10;
  }

  // 4. Check for common keyboard patterns.
  const keyboardPatterns = ["qwerty", "asdfgh", "zxcvbn", "12345"];
  for (const pattern of keyboardPatterns) {
    if (lowerPassword.includes(pattern)) {
      penalties += 15;
      break;
    }
  }

  // 5. Check for character substitution patterns.
  // Normalize common substitutions and then check against dictionary words.
  const substitutions = { "@": "a", 3: "e", 0: "o", $: "s", 1: "l", "!": "i" };
  let normalizedPassword = password.toLowerCase();
  for (const key in substitutions) {
    normalizedPassword = normalizedPassword.replace(
      new RegExp(key, "g"),
      substitutions[key]
    );
  }
  for (const word of commonWords) {
    if (normalizedPassword.includes(word)) {
      penalties += 15;
      break;
    }
  }

  // 6. Check for date/year patterns (4-digit numbers that may represent a year).
  const yearMatch = password.match(/(\d{4})/);
  if (yearMatch) {
    const year = Number(yearMatch[0]);
    if (year >= 1900 && year <= 2099) {
      penalties += 10;
    }
  }

  // 7. Check for character variety.
  let varietyCount = 0;
  if (/[A-Z]/.test(password)) varietyCount++;
  if (/[a-z]/.test(password)) varietyCount++;
  if (/[0-9]/.test(password)) varietyCount++;
  if (/[^A-Za-z0-9]/.test(password)) varietyCount++;
  // Penalize if less than 3 types are present.
  if (varietyCount < 3) {
    penalties += 20;
  }

  // Start with a base score and subtract penalties.
  const baseScore = 100;
  const finalScore = baseScore - penalties;

  // Map the final score to a rating scale:
  // finalScore < 40: 1 (weak)
  // 40 <= finalScore < 61: 2 (moderate)
  // 61 <= finalScore < 81: 3 (strong)
  // finalScore >= 81: 4 (very strong)
  let rating;
  if (finalScore < 40) {
    rating = 1;
  } else if (finalScore < 61) {
    rating = 2;
  } else if (finalScore < 81) {
    rating = 3;
  } else {
    rating = 4;
  }

  return rating;
};
