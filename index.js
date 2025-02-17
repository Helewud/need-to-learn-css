const projectList = [
  {
    url: "./qr-code-card-component/index.html",
    title: "QR Code Card Component",
  },
  {
    url: "./blog-preview-card-component/index.html",
    title: "Blog Preview Card Component",
  },
  {
    url: "./social-link-profile-card-component/index.html",
    title: "Social Link Profile Card Component",
  },
  {
    url: "./recipe-page/index.html",
    title: "Recipe Page",
  },
  {
    url: "./preview-card-component/index.html",
    title: "Preview Card Component",
  },
  {
    url: "./preview-card-component/index.html",
    title: "Preview Card Component",
  },
  {
    url: "./four-card-feature-section/index.html",
    title: "Four Card Feature Section",
  },
  {
    url: "./testimonial-grid-sections/index.html",
    title: "Testimonial Grid Section",
  },
  {
    url: "./meet-landing-page/index.html",
    title: "Meet Landing Page",
  },
  {
    url: "./article-preview-component/index.html",
    title: "Article Preview Component",
  },
  {
    url: "./newsletter-signup-page/index.html",
    title: "News Letter Signup Page",
  },
  {
    url: "./time-tracking-dashboard/index.html",
    title: "Time Tracking Dashboard",
  },
];

class ProjectList {
  constructor() {
    this.elements = {
      container: document.querySelector(".container"),
    };
  }

  initialize() {
    this.renderProjectList();
  }

  renderProjectList() {
    this.elements.container.innerHTML = "";

    const listCollectionNode = document.createElement("ul");
    listCollectionNode.classList.add("url-list");

    for (const project of projectList) {
      const listNode = this.createProjectList(project);
      listCollectionNode.appendChild(listNode);
    }

    console.log(listCollectionNode);

    this.elements.container.appendChild(listCollectionNode);
  }

  createProjectList(p) {
    const link = document.createElement("a");
    link.textContent = p.title;
    link.setAttribute("aria-label", `View ${p.title}`);
    link.setAttribute("href", p.url);

    const list = document.createElement("li");
    list.appendChild(link);
    return list;
  }
}

const pl = new ProjectList();
pl.initialize();
