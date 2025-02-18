import {
  calculateTip,
  isControlKey,
  isDecimalPoint,
  isNumberKey,
  splitTip,
} from "./helpers.js";
import {
  preventDecimalInput,
  preventInvalidInput,
  preventInvalidInputLength,
  preventLeadingZeroInput,
  validateDecimalInput,
} from "./validators.js";

/**
 * Class representing the tip and split calculator.
 */
class TipSplitter {
  // Holds references to key DOM elements
  elements = {};

  /**
   * Creates an instance of TipSplitter.
   * Initializes DOM element references and configuration for input validation.
   */
  constructor() {
    this.elements = {
      resetButton: document.querySelector("#reset-btn"),
      billAmountInput: document.querySelector("#bill-amount-input"),
      billAmountLabel: document.querySelector(".bill-amount-label"),
      tipSplitInput: document.querySelector("#tip-split-input"),
      tipSplitLabel: document.querySelector(".tip-split-label"),
      tipButtons: document.querySelectorAll("button.tip-button"),
      customTip: document.querySelector("#custom-tip"),
      tipPercentageLabel: document.querySelector(".tip-percentage-label"),
      tipAmountDisplay: document.querySelector(".tip-amount .result-value"),
      tipTotalDisplay: document.querySelector(".tip-total .result-value"),
    };

    // Configuration for input validations for different fields
    this.inputConfigs = [
      {
        inputElement: this.elements.billAmountInput,
        labelElement: this.elements.billAmountLabel,
        maxLength: 6,
        allowDecimal: true,
      },
      {
        inputElement: this.elements.tipSplitInput,
        labelElement: this.elements.tipSplitLabel,
        maxLength: 3,
        allowDecimal: false,
      },
      {
        inputElement: this.elements.customTip,
        labelElement: this.elements.tipPercentageLabel,
        maxLength: 2,
        allowDecimal: true,
      },
    ];

    // Object to hold the current values of inputs by their IDs.
    this.inputValues = {
      "bill-amount-input": 0.0,
      "tip-input": 0.0,
      "tip-split-input": 0.0,
    };
  }

  /**
   * Creates a label element to display a validation error message.
   * @param {string} id - The id of the input element.
   * @param {string} textContent - The error message text.
   * @returns {HTMLElement} - The created error label element.
   */
  createValidationErrorNode(id, textContent) {
    const errorLabel = document.createElement("label");
    errorLabel.classList.add("validation-error-text");
    errorLabel.setAttribute("for", id);
    errorLabel.textContent = textContent;
    return errorLabel;
  }

  /**
   * Displays a validation error message on an input.
   * @param {HTMLElement} inputElement - The input element.
   * @param {HTMLElement} labelElement - The label element container.
   * @param {string} message - The error message to display.
   */
  addValidationError(inputElement, labelElement, message) {
    const existingError = labelElement.querySelector(".validation-error-text");
    if (!existingError && message) {
      labelElement.appendChild(
        this.createValidationErrorNode(inputElement.id, message)
      );
    }
    inputElement.classList.add("validation-error");
  }

  /**
   * Clears any validation error message from an input.
   * @param {HTMLElement} inputElement - The input element.
   * @param {HTMLElement} labelElement - The label element container.
   */
  clearValidationError(inputElement, labelElement) {
    labelElement.querySelector(".validation-error-text")?.remove();
    inputElement.classList.remove("validation-error");
  }

  /**
   * Adds an active state class to a button element.
   * @param {HTMLElement} buttonElement - The button element.
   */
  addButtonActiveState(buttonElement) {
    buttonElement.classList.add("btn-active-state");
  }

  /**
   * Removes the active state class from a button element.
   * @param {HTMLElement | Element} buttonElement - The button element.
   */
  removeButtonActiveState(buttonElement) {
    buttonElement.classList.remove("btn-active-state");
  }

  /**
   * Resets all inputs and their associated UI states.
   */
  clearAllState() {
    // Reset input values
    this.inputValues = {
      "bill-amount-input": 0,
      "tip-input": 0,
      "tip-split-input": 0,
    };

    // Remove validation error styles from input fields
    this.elements.billAmountInput.classList.remove("validation-error");
    this.elements.tipSplitInput.classList.remove("validation-error");
    this.elements.customTip.classList.remove("validation-error");

    // Remove validation error labels from input fields
    this.elements.billAmountLabel.classList.remove("validation-error-text");
    this.elements.tipSplitLabel.classList.remove("validation-error-text");
    this.elements.tipPercentageLabel.classList.remove("validation-error-text");

    // Clear input values and reset displayed results
    this.elements.billAmountInput.value = "";
    this.elements.tipSplitInput.value = "";
    this.elements.customTip.value = "";
    this.elements.tipAmountDisplay.textContent = "$0.00";
    this.elements.tipTotalDisplay.textContent = "$0.00";

    // Remove active state from all tip percentage buttons
    for (const btn of this.elements.tipButtons) {
      if (btn) {
        this.removeButtonActiveState(btn);
      }
    }
  }

  /**
   * Calculates the tip based on current input values.
   * @param {Object} inputValues - An object with input values.
   * @returns {Object} - An object containing tipPerPerson and totalTip.
   */
  resolveTip(inputValues) {
    const billAmount = Number(inputValues["bill-amount-input"]);
    const tipPercentage = Number(inputValues["tip-input"]);
    const splitCount = Number(inputValues["tip-split-input"]);

    const tipResult = {
      tipPerPerson: 0,
      totalTip: 0,
    };

    if (billAmount && tipPercentage && splitCount) {
      const totalTip = calculateTip(billAmount, tipPercentage);
      const tipPerPerson = splitTip(totalTip, splitCount);

      tipResult.tipPerPerson = Number(tipPerPerson);
      tipResult.totalTip = Number(totalTip);
    }

    return tipResult;
  }

  /**
   * Calculates the tip result and updates the UI.
   */
  calculateAndRenderResult() {
    const { tipPerPerson, totalTip } = this.resolveTip(this.inputValues);

    this.elements.tipAmountDisplay.textContent = `$${
      tipPerPerson ? tipPerPerson : "0.00"
    }`;
    this.elements.tipTotalDisplay.textContent = `$${
      totalTip ? totalTip : "0.00"
    }`;
  }

  /**
   * Handles the keydown event for input validation.
   * @param {KeyboardEvent} event - The keydown event.
   * @param {HTMLElement} inputElement - The input element.
   * @param {HTMLElement} labelElement - The associated label element.
   * @param {number} maxAllowedLength - Maximum number of characters allowed.
   * @param {boolean} allowDecimal - Flag indicating if decimal input is allowed.
   */
  handleKeyDownEvent(
    event,
    inputElement,
    labelElement,
    maxAllowedLength,
    allowDecimal
  ) {
    // if (isNumberKey(event.key)) {
    //   this.syncButtonState(inputElement);
    // }

    // Prevent leading zero input.
    if (preventLeadingZeroInput(event)) {
      this.addValidationError(inputElement, labelElement, "Can't be zero");
      return;
    }

    // Prevent invalid input.
    if (preventInvalidInput(event)) {
      this.addValidationError(inputElement, labelElement, "Not allowed");
      return;
    }

    // If decimals are not allowed, prevent decimal input.
    if (!allowDecimal) {
      if (preventDecimalInput(event)) return;
    }

    // Allow control keys without further validation.
    if (isControlKey(event.key)) {
      this.clearValidationError(inputElement, labelElement);
      return;
    }

    // When decimals are allowed, validate duplicate decimal points.
    if (allowDecimal) {
      if (isDecimalPoint(event.key)) {
        validateDecimalInput(event, event.target && event.target["value"]);
      }
    }

    // Check if the input would exceed the maximum allowed length.
    if (preventInvalidInputLength(event, maxAllowedLength)) {
      this.addValidationError(inputElement, labelElement, "Max char length");
      return;
    }

    this.clearValidationError(inputElement, labelElement);
  }

  /**
   * Handles the paste event by showing an error message.
   * @param {HTMLElement} inputElement - The input element.
   * @param {HTMLElement} labelElement - The associated label element.
   */
  handlePasteEvent(inputElement, labelElement) {
    this.addValidationError(inputElement, labelElement, "Not allowed");
  }

  /**
   * Handles the blur event.
   * Updates the stored input value, clears any validation errors, and recalculates results.
   * @param {Event} event - The blur event.
   * @param {HTMLElement} inputElement - The input element.
   * @param {HTMLElement} labelElement - The associated label element.
   * @param {Object} inputValues - The object storing input values.
   */
  handleBlurEvent(event, inputElement, labelElement, inputValues) {
    if (inputElement.id === "custom-tip") {
      inputValues["tip-input"] = event.target && event.target["value"];
    } else {
      inputValues[inputElement.id] = event.target && event.target["value"];
    }

    this.clearValidationError(inputElement, labelElement);
    this.calculateAndRenderResult();
  }

  /**
   * Synchronizes the active state of tip percentage buttons.
   * Clears the active state from all buttons if the input is for tip percentage.
   * @param {HTMLElement} inputElement - The input element.
   */
  syncButtonState(inputElement) {
    if (inputElement.id === "custom-tip" && inputElement.parentElement) {
      for (const btn of inputElement.parentElement.children) {
        this.removeButtonActiveState(btn);
      }
    }
  }

  /**
   * Attaches event listeners to an input element based on the provided configuration.
   * @param {Object} config - The input configuration.
   * @param {HTMLElement} config.inputElement - The input element.
   * @param {HTMLElement} config.labelElement - The label element.
   * @param {number} config.maxLength - Maximum allowed input length.
   * @param {boolean} config.allowDecimal - Whether decimal input is allowed.
   */
  initializeInputValidation({
    inputElement,
    labelElement,
    maxLength,
    allowDecimal,
  }) {
    if (inputElement && labelElement) {
      inputElement.addEventListener("keydown", (event) =>
        this.handleKeyDownEvent(
          event,
          inputElement,
          labelElement,
          maxLength,
          allowDecimal
        )
      );

      inputElement.addEventListener("blur", (event) =>
        this.handleBlurEvent(
          event,
          inputElement,
          labelElement,
          this.inputValues
        )
      );

      inputElement.addEventListener("paste", () =>
        this.handlePasteEvent(inputElement, labelElement)
      );
    }
  }

  /**
   * Handles the click event on tip percentage buttons.
   * Clears active states from sibling buttons, updates the tip percentage value,
   * and resets the tip percentage input field.
   * @param {Event} event - The click event.
   */
  initializeButtonInput(event) {
    // Clear active state from all sibling buttons
    if (event.target) {
      for (const btn of event.target["parentElement"].children) {
        this.removeButtonActiveState(btn);
      }

      // Update stored tip percentage value and clear the input field.
      this.inputValues["tip-input"] = event.target["value"];
      this.elements.customTip.value = "";
      // @ts-ignore
      this.addButtonActiveState(event.target);
      this.calculateAndRenderResult();
    }
  }

  /**
   * Initializes the TipSplitter by attaching event listeners to inputs and buttons.
   */
  start() {
    // Attach validation listeners to each configured input field.
    for (const config of this.inputConfigs) {
      this.initializeInputValidation(config);
    }

    // Attach click event listener to each tip percentage button.
    for (const btn of this.elements.tipButtons) {
      if (btn) {
        btn.addEventListener("click", this.initializeButtonInput.bind(this));
      }
    }

    // Attach click event listener to the reset button.
    this.elements.resetButton.addEventListener(
      "click",
      this.clearAllState.bind(this)
    );
  }
}

// Create an instance of TipSplitter and initialize it.
const tipSplitter = new TipSplitter();
tipSplitter.start();
