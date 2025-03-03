class FAQAccordion {
  elements: {
    faqItems?: NodeListOf<HTMLElement>;
  };

  constructor() {
    this.elements = {
      faqItems: document.querySelectorAll<HTMLElement>(".faq-option")!,
    };
  }

  /**
   * Initializes the FAQ accordion by attaching click event listeners
   * to each FAQ item.
   */
  initialize(): void {
    // Attach a click event listener to each FAQ item
    for (const faqItem of this.elements.faqItems!) {
      faqItem.addEventListener("click", this.handleFaqToggle.bind(this));
    }
  }

  /**
   * Handles the click event to toggle the expanded state of a FAQ item.
   * @param event - The MouseEvent triggered by clicking a FAQ item.
   */
  handleFaqToggle(event: MouseEvent): void {
    // Get the parent element of the clicked item, which represents the entire FAQ entry.
    const faqEntry = (event.currentTarget as HTMLElement)
      .parentElement as HTMLDivElement;

    // If the FAQ entry is already expanded, collapse it.
    if (faqEntry.classList.contains("expand")) {
      faqEntry.classList.remove("expand");
      return;
    }

    // Otherwise, collapse all FAQ entries first, then expand the clicked one.
    this.closeAllFaqEntries();
    faqEntry.classList.add("expand");
  }

  /**
   * Collapses all FAQ entries by removing the 'expand' class.
   */
  closeAllFaqEntries(): void {
    for (const faqItem of this.elements.faqItems!) {
      const faqEntry = faqItem.parentElement as HTMLDivElement;
      faqEntry.classList.remove("expand");
    }
  }
}

const faqAccordion = new FAQAccordion();
faqAccordion.initialize();
