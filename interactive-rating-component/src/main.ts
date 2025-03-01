class RatingComponent {
  elements: {
    submissionContainer: HTMLElement;
    completionContainer: HTMLElement;
    optionsList: HTMLElement;
    ratingInputs?: NodeListOf<HTMLElement>;
    ratingLabels?: NodeListOf<HTMLElement>;
    submitButton: HTMLElement;
    confirmationBanner: HTMLElement;
  };

  ratingValue = 0;

  constructor() {
    this.elements = {
      submissionContainer: document.querySelector(".rating-submission")!,
      completionContainer: document.querySelector(".rating-completion")!,
      optionsList: document.querySelector<HTMLElement>("#rating-group")!,
      submitButton: document.querySelector<HTMLElement>("#rating-submission")!,
      confirmationBanner: document.querySelector<HTMLElement>("#text-banner")!,
    };
  }

  /**
   * Initializes the rating component by rendering options and setting up event listeners.
   */
  initialize(): void {
    this.renderRatingOptions();

    // Add click event listener for each rating input option
    for (const optionInput of this.elements.ratingInputs!) {
      optionInput.addEventListener(
        "click",
        this.handleRatingOptionClick.bind(this)
      );
    }

    // Add click event listener to the submit button
    this.elements.submitButton.addEventListener(
      "click",
      this.handleRatingSubmitClick.bind(this)
    );
  }

  /**
   * Creates a single rating option list item with a radio input and label.
   */
  createRatingOption(rating: number): HTMLLIElement {
    // Create radio input for the rating
    const input = document.createElement("input");
    input.classList.add("rating-selection");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "rating-selection");
    input.setAttribute("value", rating.toString());

    // Create label element for the radio input
    const label = document.createElement("label");
    label.classList.add("rating-option");
    label.textContent = rating.toString();
    label.appendChild(input);

    // Wrap the label in a list item
    const listItem = document.createElement("li");
    listItem.appendChild(label);

    return listItem;
  }

  /**
   * Renders the rating options
   */
  renderRatingOptions(): void {
    if (!this.elements.optionsList) return;

    for (const rating of [1, 2, 3, 4, 5]) {
      const listItem = this.createRatingOption(rating);
      this.elements.optionsList.appendChild(listItem);
    }

    // Save references to the rating inputs and labels for later use
    this.elements.ratingInputs =
      document.querySelectorAll<HTMLElement>(".rating-selection");
    this.elements.ratingLabels =
      document.querySelectorAll<HTMLElement>(".rating-option");
  }

  /**
   * Removes the 'selected-rating-option' class from all rating option labels.
   */
  resetRatingSelectionStates(): void {
    if (!this.elements.ratingLabels) return;

    for (const label of this.elements.ratingLabels) {
      label.classList.remove("selected-rating-option");
    }
  }

  /**
   * Sets the active state for a selected option
   */
  setRatingSelectionState(listItem: HTMLLIElement): void {
    this.resetRatingSelectionStates();

    listItem.classList.add("selected-rating-option");
  }

  /**
   * Toggles the visibility of the content on the display card
   */
  toggleVisibility(element: HTMLElement): void {
    if (element.classList.contains("flex")) {
      element.classList.remove("flex");
      element.classList.add("hidden");
      return;
    }

    element.classList.remove("hidden");
    element.classList.add("flex");
  }

  /**
   * Handles click events on a rating option.
   * Highlights the selected option and updates the rating value.
   */
  handleRatingOptionClick(event: MouseEvent): void {
    this.resetRatingSelectionStates();

    const clickedInput = event.currentTarget as HTMLInputElement;

    // Highlight the selected rating
    clickedInput.parentElement!.classList.add("selected-rating-option");

    // Update the rating value from the input's value.
    this.ratingValue = +clickedInput.value;
  }

  /**
   * Handles the rating submission.
   */
  handleRatingSubmitClick(event: MouseEvent): void {
    // Prevent submission if no rating was selected
    if (this.ratingValue < 1) return event.preventDefault();

    // Clear selection state
    this.resetRatingSelectionStates();

    // Update the confirmation banner with the selected rating
    const text = document.createElement("p");
    text.textContent = `You selected ${this.ratingValue} out of 5`;
    text.setAttribute("aria-live", "polite");
    this.elements.confirmationBanner.appendChild(text);

    // Toggle visibility of submission and completion views
    this.toggleVisibility(this.elements.submissionContainer);
    this.toggleVisibility(this.elements.completionContainer);

    // Reset rating value for future submissions
    this.ratingValue = 0;
  }
}

const ratingComponent = new RatingComponent();
ratingComponent.initialize();
