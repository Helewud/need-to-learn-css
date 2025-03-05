class App {
  private elements: {
    navOpen: HTMLDivElement;
    navClose: HTMLDivElement;
    sideNav: HTMLDivElement;
  };

  constructor() {
    this.elements = {
      navOpen: this.getElement<HTMLDivElement>("#nav-open"),
      navClose: this.getElement<HTMLDivElement>("#nav-close"),
      sideNav: this.getElement<HTMLDivElement>("#side-nav"),
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

  private handleNav() {
    if (this.elements.sideNav.classList.contains("translate-x-full")) {
      this.elements.sideNav.classList.replace(
        "translate-x-full",
        "translate-x-0",
      );
      return;
    }

    this.elements.sideNav.classList.replace(
      "translate-x-0",
      "translate-x-full",
    );
  }

  /**
   * Initializes event listeners
   */
  initialize(): void {
    // Listen for nav open
    this.elements.navOpen.addEventListener("click", this.handleNav.bind(this));

    // Listen for nav close
    this.elements.navClose.addEventListener("click", this.handleNav.bind(this));
  }
}

const app = new App();
app.initialize();
