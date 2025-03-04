interface ValidationError {
  field: string;
  // element reference where the error should be displayed.
  element?: HTMLElement | null;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

class ContactForm {
  private elements: {
    firstNameInput: HTMLInputElement;
    lastNameInput: HTMLInputElement;
    emailInput: HTMLInputElement;
    querySelect: HTMLSelectElement;
    messageTextarea: HTMLTextAreaElement;
    consentCheckbox: HTMLInputElement;
    formElement: HTMLFormElement;
    successDialog: HTMLDivElement;
  };

  constructor() {
    this.elements = {
      firstNameInput: this.getElement<HTMLInputElement>("#firstname"),
      lastNameInput: this.getElement<HTMLInputElement>("#lastname"),
      emailInput: this.getElement<HTMLInputElement>("#email"),
      querySelect: this.getElement<HTMLSelectElement>("#query-type"),
      messageTextarea: this.getElement<HTMLTextAreaElement>("#message"),
      consentCheckbox: this.getElement<HTMLInputElement>("#consent"),
      formElement: this.getElement<HTMLFormElement>("#contact-form"),
      successDialog: this.getElement<HTMLDivElement>("#success-dialog"),
    };
  }

  /**
   * Safely selects an element from the DOM based on a selector.
   */
  private getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }

  /**
   * Toggles the active state of a query option label.
   */
  private toggleQueryOptionActiveState(label: HTMLLabelElement): void {
    label.classList.toggle("active-checked");
  }

  /**
   * Resets the active state for all query option labels.
   */
  private resetQueryOptionStates(): void {
    // Convert the select element's children to an array of labels.
    const optionLabels = Array.from(
      this.elements.querySelect.children,
    ) as HTMLLabelElement[];

    optionLabels.forEach((label) => label.classList.remove("active-checked"));
  }

  /**
   * Validates the form data.
   * Checks that required fields are filled and returns an object containing the validation results.
   */
  private validateForm(formData: FormData): ValidationResult {
    const errors: ValidationError[] = [];

    // Define required fields and their corresponding elements.
    const requiredFields = [
      { key: "firstname", element: this.elements.firstNameInput },
      { key: "lastname", element: this.elements.lastNameInput },
      { key: "email", element: this.elements.emailInput },
      { key: "message", element: this.elements.messageTextarea },
    ];

    // Check each required field for non-empty values.
    requiredFields.forEach((field) => {
      const value = formData.get(field.key);
      if (!value || value.toString().trim() === "") {
        errors.push({
          field: field.key,
          // Use the parent element for error display context
          element: field.element.parentElement,
        });
      }
    });

    // Validate that a query type is selected.
    if (!formData.get("query-type")) {
      errors.push({
        field: "query-type",
        element: this.elements.querySelect,
      });
    }

    // Validate that the consent checkbox is checked.
    if (!formData.get("consent")) {
      const consentContainer = this.elements.consentCheckbox.parentElement;
      if (consentContainer) {
        errors.push({
          field: "consent",
          element: consentContainer.parentElement,
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Displays validation errors by revealing error message elements for each invalid field.
   */
  private displayValidationErrors(errors: ValidationError[]): void {
    // Hide all existing error messages first.
    const allErrorMessages = document.querySelectorAll("p.error-message");
    allErrorMessages.forEach((msg) => msg.classList.add("hidden"));

    // For each error, reveal its associated error message element.
    errors.forEach((error) => {
      const errorMessageElement =
        error.element?.querySelector("p.error-message");

      if (errorMessageElement) {
        errorMessageElement.classList.remove("hidden");
      }
    });
  }

  /**
   * Initializes event listeners for form submission and query option selection.
   */
  initialize(): void {
    // Listen for the form submission event.
    this.elements.formElement.addEventListener(
      "submit",
      this.handleFormSubmit.bind(this),
    );

    // Listen for changes on the query select element.
    this.elements.querySelect.addEventListener(
      "change",
      this.handleQuerySelectChange.bind(this),
    );
  }

  /**
   * Handles changes to the query select input by toggling the active state on its label.
   */
  private handleQuerySelectChange(event: Event): void {
    this.resetQueryOptionStates();
    const target = event.target as HTMLInputElement;
    const label = target.parentElement as HTMLLabelElement;
    this.toggleQueryOptionActiveState(label);
  }

  /**
   * Handles the form submission event, performs validation,
   * displays errors if any, or shows the success dialog upon valid submission.
   */
  private async handleFormSubmit(event: SubmitEvent): Promise<void> {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Collect form data and validate the form.
    const formData = new FormData(event.target as HTMLFormElement);
    const validationResult = this.validateForm(formData);

    // If the form is not valid, display errors and exit.
    if (!validationResult.isValid) {
      this.displayValidationErrors(validationResult.errors);
      return;
    }

    // Toggle the success dialog to show submission success.
    this.elements.successDialog.classList.toggle("hidden");

    // Wait for 5 seconds before toggling the dialog back.
    await new Promise((resolve) => {
      setTimeout(() => {
        this.elements.successDialog.classList.toggle("hidden");
        resolve(true);
      }, 5000);
    });

    // reset form
    window.location.reload();
  }
}
// Create an instance of the ContactForm and initialize event listeners.
const contactForm = new ContactForm();
contactForm.initialize();
