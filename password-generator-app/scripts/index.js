import {
  convertToPercentage,
  copyPasswordToClipboard,
  generatePassword,
  getPasswordStrength,
} from "./helpers.js";

class PasswordGenerator {
  elements = {};
  config = {
    length: 0,
    strength: "",
    includeUppercase: false,
    includeLowercase: false,
    includeNumbers: false,
    includeSymbols: false,
  };

  constructor() {
    this.elements = {
      passwordDisplay: document.querySelector(".password-display"),
      copyPasswordText: document.querySelector(".copy-password p"),
      copyPasswordButton: document.querySelector(".copy-password svg"),
      passwordRange: document.querySelector(".password-range"),
      passwordLengthLabel: document.querySelector(".password-length-label"),
      passwordLengthRange: document.querySelector("#password-length-range"),
      passwordLengthRangeText: document.querySelector(
        ".password-length-range-text"
      ),
      configOptionUppercase: document.querySelector("#option-uppercase"),
      configOptionLowercase: document.querySelector("#option-lowercase"),
      configOptionNumbers: document.querySelector("#option-numbers"),
      configOptionSymbol: document.querySelector("#option-symbols"),
      passwordStrengthText: document.querySelector(".strength-text"),
      passwordStrengthBars: document.querySelectorAll(".strength-bar"),
      passwordGenerateButton: document.querySelector(".generate-password"),
    };
  }

  /**
   * Displays the generated password in the UI and adds a visual indicator.
   * @param {string} password - The generated password.
   */
  displayGeneratedPassword(password) {
    console.log(this.elements.passwordDisplay.textContent, password);
    this.elements.passwordDisplay.textContent = password;
    this.elements.passwordDisplay.classList.add("password-generated");
  }

  /**
   * Shows the "COPIED" text.
   */
  showCopiedTooltip() {
    this.elements.copyPasswordText.style.display = "inline";
  }

  /**
   * Hides the "COPIED" text.
   */
  hideCopiedTooltip() {
    this.elements.copyPasswordText.style.display = "none";
  }

  /**
   * Toggles the active state of a configuration option button.
   * @param {Event} event - The click event.
   */
  toggleOptionActiveState(event) {
    if (event.target) {
      console.log(event);

      if (event.target["className"].includes("option-checked")) {
        event.target["classList"].remove("option-checked");
        event.target["ariaChecked"] = "false";
        return;
      }

      event.target["classList"].add("option-checked");
      event.target["ariaChecked"] = "true";
    }
  }

  /**
   * Updates the configuration state based on the clicked option's id.
   * @param {string} id - The id of the clicked configuration option.
   */
  updateConfigOption(id) {
    switch (id) {
      case "option-uppercase":
        this.config.includeUppercase = !this.config.includeUppercase;
        break;
      case "option-lowercase":
        this.config.includeLowercase = !this.config.includeLowercase;
        break;
      case "option-numbers":
        this.config.includeNumbers = !this.config.includeNumbers;
        break;
      case "option-symbols":
        this.config.includeSymbols = !this.config.includeSymbols;
        break;
    }
  }

  /**
   * Handles clicks on configuration option buttons.
   * @param {Event} event - The click event.
   */
  handleConfigOptions(event) {
    this.toggleOptionActiveState(event);
    event.target && this.updateConfigOption(event.target["id"]);
  }

  /**
   * Updates the text that displays the password strength.
   * @param {string} strengthText - The strength description.
   */
  displayPasswordStrengthText(strengthText) {
    this.elements.passwordStrengthText.textContent = strengthText;
  }

  /**
   * Activates a specified number of strength indicator bars by adding a class.
   * @param {string} className - The CSS class to add (e.g., "weak-strength").
   * @param {number} count - Number of bars to activate.
   */
  activateStrengthBars(className, count) {
    const bars = this.elements.passwordStrengthBars;
    for (let i = 0; i < count; i++) {
      const element = bars[i];
      element.classList.add(className);
    }
  }

  /**
   * Clears the active state (CSS classes) from all strength indicator bars.
   */
  clearStrengthBars() {
    const bars = this.elements.passwordStrengthBars;
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList = [];
    }
  }

  /**
   * Updates the strength indicator based on the evaluated strength (1 to 4).
   * @param {number} strength - The strength rating of the password.
   */
  updateStrengthIndicator(strength) {
    this.clearStrengthBars();

    switch (strength) {
      case 1:
        this.activateStrengthBars("too-weak-strength", 1);
        this.displayPasswordStrengthText("very weak");
        break;
      case 2:
        this.activateStrengthBars("weak-strength", 2);
        this.displayPasswordStrengthText("weak");
        break;
      case 3:
        this.activateStrengthBars("medium-strength", 3);
        this.displayPasswordStrengthText("medium");
        break;
      case 4:
        this.activateStrengthBars("strong-strength", 4);
        this.displayPasswordStrengthText("strong");
        break;
    }
  }

  /**
   * Handles changes to the password length slider.
   * Updates the configuration and the visual progress indicator.
   * @param {Event} event - The change event from the slider.
   */
  handlePasswordLengthSliderChange(event) {
    if (event.target) {
      // Update the desired password length.
      this.config.length = event.target["value"];

      // Calculate progress percentage for the slider indicator.
      const progressPercentage = convertToPercentage(
        this.config.length,
        event.target["max"]
      );

      // Update the slider's custom CSS property to reflect progress.
      this.elements.passwordLengthRange.style.setProperty(
        "--webkitProgressPercent",
        progressPercentage
      );

      // Update the displayed text for the password length.
      this.elements.passwordLengthRangeText.textContent = this.config.length;
    }
  }

  /**
   * Copies the generated password to the clipboard and shows a tooltip.
   */
  async handleCopyPassword() {
    const passwordValue = this.elements.passwordDisplay.textContent;

    // Avoid copying if the default password is still displayed.
    if (passwordValue === "P4$5W0rD!") return false;

    if (await copyPasswordToClipboard(passwordValue)) {
      this.showCopiedTooltip();

      // Hide the tooltip after 2 second.
      await new Promise((resolve) =>
        setTimeout(() => resolve(this.hideCopiedTooltip()), 2000)
      );
    }
  }

  /**
   * Generates a new password based on the current configuration,
   * updates the display, and updates the strength indicator.
   */
  async handleGeneratePassword() {
    const password = generatePassword(this.config);
    if (password !== "") {
      const strengthRating = getPasswordStrength(password);
      this.displayGeneratedPassword(password);
      this.updateStrengthIndicator(strengthRating);
    }
  }

  /**
   * Initializes event listeners for configuration options, slider,
   * copy button, and generate button.
   */
  initialize() {
    // Attach click events to each configuration option.
    [
      this.elements.configOptionUppercase,
      this.elements.configOptionLowercase,
      this.elements.configOptionNumbers,
      this.elements.configOptionSymbol,
    ].forEach((optionElement) => {
      optionElement.addEventListener(
        "click",
        this.handleConfigOptions.bind(this)
      );
    });

    // Attach event listener to the password length slider.
    this.elements.passwordLengthRange.addEventListener(
      "change",
      this.handlePasswordLengthSliderChange.bind(this)
    );

    // Attach event listener for copying the password.
    this.elements.copyPasswordButton.addEventListener(
      "click",
      this.handleCopyPassword.bind(this)
    );

    // Attach event listener for generating a new password.
    this.elements.passwordGenerateButton.addEventListener(
      "click",
      this.handleGeneratePassword.bind(this)
    );
  }
}

const generator = new PasswordGenerator();
generator.initialize();
