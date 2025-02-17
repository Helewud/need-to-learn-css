const activityStyleData = {
  Work: {
    color: "#FF8B64",
    imgUrl: "icon-work.svg",
    imgAlt: "work suitecase icon",
  },
  Play: {
    color: "#55C2E6",
    imgUrl: "icon-play.svg",
    imgAlt: "game pad icon",
  },
  Study: {
    color: "#FF5E7D",
    imgUrl: "icon-study.svg",
    imgAlt: "book icon",
  },
  Exercise: {
    color: "#4BCF82",
    imgUrl: "icon-exercise.svg",
    imgAlt: "running man icon",
  },
  Social: {
    color: "#7335D2",
    imgUrl: "icon-social.svg",
    imgAlt: "chat icon",
  },
  "Self Care": {
    color: "#F1C75B",
    imgUrl: "icon-self-care.svg",
    imgAlt: "love icon",
  },
};

class ActivityTracker {
  constructor() {
    this.elements = {
      activityCollection: document.querySelector(".activity-collection"),
      dailyButton: document.querySelector(".daily-activity"),
      weeklyButton: document.querySelector(".weekly-activity"),
      monthlyButton: document.querySelector(".monthly-activity"),
    };

    // Configuration
    this.config = {
      timeframes: {
        daily: "Yesterday",
        weekly: "Last Week",
        monthly: "Last Month",
      },
      storageKey: "time_tracking.activities",
      dataUrl: "/time-tracking-dashboard/assets/data/data.json",
    };

    // Activities data
    this.activities = null;

    // Bind methods to maintain 'this' context
    this.switchCategory = this.switchCategory.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  async initialize() {
    await this.loadActivities();
    this.renderActivities();
    this.initializeEventListeners();

    // Set initial state
    this.elements.dailyButton.classList.add("active-state");
  }

  async loadActivities() {
    try {
      const stored = window.localStorage.getItem(this.config.storageKey);

      if (stored) {
        this.activities = JSON.parse(stored);
        return;
      }

      const response = await fetch(this.config.dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.activities = await response.json();

      window.localStorage.setItem(
        this.config.storageKey,
        JSON.stringify(this.activities)
      );
    } catch (error) {
      console.error("Error loading activities:", error);
      this.activities = [];
    }
  }

  renderActivities() {
    this.elements.activityCollection.innerHTML = "";

    this.activities.forEach((activity) => {
      const card = this.createActivityCard(activity, "daily");

      this.elements.activityCollection.appendChild(card);
    });
  }

  createActivityCard(activity, timeframe = "daily") {
    const styleData = activityStyleData[activity.title];
    const time = activity.timeframes[timeframe];
    const title = activity.title;
    const timeframeLabel = this.config.timeframes[timeframe];

    const iconName = styleData["imgUrl"];
    const iconAlt = styleData["imgAlt"];
    const cardColor = styleData["color"];

    const currentTime = time["current"] || 0;
    const previousTime = time["previous"] || 0;

    const div = document.createElement("div");
    div.classList.add("activity-card");
    div.style.backgroundColor = cardColor;

    div.innerHTML = `
    <div>
      <img src="./assets/icons/${iconName}" alt="${iconAlt}" />
    </div>
    <div>
      <div>
        <div class="activity-title">
          <p>${title}</p>
          <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                      fill="#BBC0FF"
                      fill-rule="evenodd"
                    />
          </svg>
        </div>
        <div class="activity-stat">
          <h2>${currentTime}hrs</h2>
          <h3>${timeframeLabel} - ${previousTime}hrs</h3>
        </div>
      </div>
    </div>
    `;

    return div;
  }

  async switchCategory(category) {
    const cards = document.querySelectorAll(".activity-card");
    const timeframeLabel = this.config.timeframes[category];

    const activitiesMap = {};
    this.activities.forEach((activity) => {
      activitiesMap[activity.title] = activity;
    });

    cards.forEach((card) => {
      const titleNode = card.querySelector(".activity-title p");
      const activity = activitiesMap[titleNode.textContent];

      if (activity) {
        const current = activity.timeframes[category].current;
        const previous = activity.timeframes[category].previous;

        card.querySelector(".activity-stat h2").textContent = `${current}hrs`;
        card.querySelector(
          ".activity-stat h3"
        ).textContent = `${timeframeLabel} - ${previous}hrs`;
      }
    });
  }

  initializeEventListeners() {
    const buttons = {
      daily: this.elements.dailyButton,
      weekly: this.elements.weeklyButton,
      monthly: this.elements.monthlyButton,
    };

    Object.entries(buttons).forEach(([category, button]) => {
      button.addEventListener("click", () =>
        this.handleButtonClick(category, buttons)
      );
    });
  }

  handleButtonClick(category, buttons) {
    this.switchCategory(category);

    Object.values(buttons).forEach((btn) =>
      btn.classList.remove("active-state")
    );

    buttons[category].classList.add("active-state");
  }
}

const tracker = new ActivityTracker();
tracker.initialize();
