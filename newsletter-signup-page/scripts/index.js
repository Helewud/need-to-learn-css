console.log("Script intiated...");

const INDEX_PAGE = document.querySelector(".index-pg");
const SUCCESS_PAGE = document.querySelector(".success-pg");

if (INDEX_PAGE) {
  const CONTENT_FORM = document.querySelector("#content-form");
  const EMAIL_INPUT = document.querySelector("#email-input");
  const VALIDATION_MESSAGE = document.querySelector(".validation-message");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  EMAIL_INPUT.addEventListener("input", function (e) {
    const email = EMAIL_INPUT.value.trim();
    const isValid = emailRegex.test(email);

    EMAIL_INPUT.classList.remove("validation-error-state");
    VALIDATION_MESSAGE.textContent = "";

    if (email !== "" && email.includes("@") && !isValid) {
      EMAIL_INPUT.classList.add("validation-error-state");
      VALIDATION_MESSAGE.textContent = "Valid email required";
    }

    EMAIL_INPUT.focus();
  });

  EMAIL_INPUT.addEventListener("blur", function (e) {
    const email = EMAIL_INPUT.value.trim();

    if (email === "") {
      EMAIL_INPUT.classList.remove("validation-error-state");
      VALIDATION_MESSAGE.textContent = "";
    }
  });

  CONTENT_FORM.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = EMAIL_INPUT.value.trim();
    const isValid = emailRegex.test(email);

    if (email === "") {
      EMAIL_INPUT.classList.add("validation-error-state");
      VALIDATION_MESSAGE.textContent = "Email field cannot be empty";
      EMAIL_INPUT.focus();
      return;
    }

    if (!isValid) {
      EMAIL_INPUT.classList.add("validation-error-state");
      VALIDATION_MESSAGE.textContent = "Valid email required";
      EMAIL_INPUT.focus();
      return;
    }

    window.location.replace(`./success.html?email=${EMAIL_INPUT.value}`);
  });
}

if (SUCCESS_PAGE) {
  const DISMISS_MESSAGE_BTN = document.querySelector(".submit-button");
  const EMAIL_VALUE = document.querySelector(".email-value");

  const urlParams = new URLSearchParams(window.location.search);

  EMAIL_VALUE.textContent = urlParams.get("email") ?? "email@company.com";

  DISMISS_MESSAGE_BTN.addEventListener("click", function (e) {
    window.location.replace(`./index.html`);
  });
}

console.log("Script loaded...");
