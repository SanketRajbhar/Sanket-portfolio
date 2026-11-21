/**
 * Portfolio content — edit this file to update the site.
 *
 * Everything in [BRACKETS] is a placeholder. Replace it with your real details.
 * Empty arrays (achievements, testimonials) hide their sections automatically.
 * Never fill these with invented facts.
 */

export type ProjectCategory =
  | "Websites"
  | "Web Applications"
  | "SaaS Products"
  | "Dashboards"
  | "Developer Tools"
  | "Automation Tools"
  | "E-commerce"
  | "Experiments";

/** Drives the placeholder interface sketch until a real screenshot is added. */
export type ProjectVisualKind = "dashboard" | "website" | "app" | "terminal" | "commerce" | "flow";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  /** Path or URL to a real screenshot. Leave empty to show the labelled sketch. */
  image: string;
  imageAlt: string;
  gallery: string[];
  visual: ProjectVisualKind;
  role: string;
  tech: string[];
  features: string[];
  background: string;
  problem: string;
  goals: string[];
  solution: string;
  designDecisions: string[];
  architecture: string;
  challenges: string[];
  /** Only fill with real, verifiable results. Empty hides the block. */
  outcomes: string[];
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const profile = {
  name: "Sanket Rajbhar",
  initials: "SR",
  title: "[YOUR PROFESSIONAL TITLE]",
  introLabel: "Full-stack developer",
  location: "[YOUR LOCATION]",
  timezone: "[YOUR TIMEZONE]",
  tagline: "[YOUR TAGLINE]",
  headline: ["Building digital", "products that", "solve real problems."],
  headlineEmphasis: "real problems.",
  intro:
    "[YOUR SHORT INTRODUCTION — one or two sentences on what you build and who you build it for.]",
  yearsOfExperience: "",
  email: "sanketrajbhar515@gmail.com",
  resumeUrl: "[RESUME / CV LINK]",
  availability: "[AVAILABLE FOR FREELANCE / OPEN TO OPPORTUNITIES]",
  /** Set to false to hide the green availability dot. */
  isAvailable: true,
} as const;

export const socials: SocialLink[] = [
  { label: "GitHub", href: "[GITHUB PROFILE]" },
  { label: "LinkedIn", href: "[LINKEDIN PROFILE]" },
  { label: "Other", href: "[OTHER LINKS]" },
];

export const site = {
  title: "[SITE TITLE]",
  description: "[SITE DESCRIPTION]",
  domain: "[DOMAIN]",
} as const;

export const navItems = [
  { id: "work", label: "Work", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "services", label: "Services", index: "04" },
  { id: "contact", label: "Contact", index: "07" },
] as const;

export const projectCategories: ProjectCategory[] = [
  "Websites",
  "Web Applications",
  "SaaS Products",
  "Dashboards",
  "Developer Tools",
  "Automation Tools",
  "E-commerce",
  "Experiments",
];

function placeholderProject(
  n: number,
  category: ProjectCategory,
  visual: ProjectVisualKind,
  featured: boolean,
): Project {
  const id = String(n).padStart(2, "0");
  return {
    slug: `project-${id}`,
    name: `[PROJECT NAME ${id}]`,
    category,
    year: "[YEAR]",
    summary: "[SHORT PROJECT DESCRIPTION — what it is and who it helps, in one sentence.]",
    image: "",
    imageAlt: `[PROJECT IMAGE] for project ${id}`,
    gallery: [],
    visual,
    role: "[MY ROLE]",
    tech: ["[TECH 1]", "[TECH 2]", "[TECH 3]"],
    features: ["[KEY FEATURE 1]", "[KEY FEATURE 2]", "[KEY FEATURE 3]"],
    background: "[PROJECT BACKGROUND — context, the client or idea, and why it mattered.]",
    problem: "[PROBLEM SOLVED — the specific pain point this project addressed.]",
    goals: ["[GOAL / REQUIREMENT 1]", "[GOAL / REQUIREMENT 2]", "[GOAL / REQUIREMENT 3]"],
    solution: "[SOLUTION / APPROACH — how you tackled it and what you built.]",
    designDecisions: ["[DESIGN DECISION 1]", "[DESIGN DECISION 2]"],
    architecture: "[TECHNICAL ARCHITECTURE — frontend, backend, data, hosting, integrations.]",
    challenges: ["[CHALLENGE ENCOUNTERED 1]", "[CHALLENGE ENCOUNTERED 2]"],
    outcomes: [],
    liveUrl: "[LIVE DEMO URL]",
    repoUrl: "[GITHUB REPOSITORY URL]",
    featured,
  };
}

export const projects: Project[] = [
  placeholderProject(1, "SaaS Products", "dashboard", true),
  placeholderProject(2, "Websites", "website", true),
  placeholderProject(3, "Web Applications", "app", true),
  placeholderProject(4, "Developer Tools", "terminal", false),
  placeholderProject(5, "E-commerce", "commerce", false),
  placeholderProject(6, "Automation Tools", "flow", false),
];

export const about = {
  intro: "[PERSONAL INTRODUCTION]",
  paragraphs: [
    "[DEVELOPMENT BACKGROUND — how you got into building for the web.]",
    "[WHAT I ENJOY BUILDING — the kinds of products and problems that pull you in.]",
    "[MY APPROACH TO TECHNOLOGY — how you pick tools and make trade-offs.]",
  ],
  notes: [
    { label: "Values", value: "[MY PROFESSIONAL VALUES]" },
    { label: "Working style", value: "[MY WORKING STYLE]" },
    { label: "Off the clock", value: "[MY INTERESTS]" },
  ],
  /** Path or URL to a portrait / workspace photo. Leave empty to hide. */
  photo: "",
} as const;

export const skillGroups = [
  { title: "Frontend", items: ["[FRONTEND TECHNOLOGIES]"] },
  { title: "Backend", items: ["[BACKEND TECHNOLOGIES]"] },
  { title: "Languages", items: ["[PROGRAMMING LANGUAGES]"] },
  { title: "Databases", items: ["[DATABASE TECHNOLOGIES]"] },
  { title: "Tools & Platforms", items: ["[TOOLS AND PLATFORMS]"] },
  { title: "Design & Workflow", items: ["[DESIGN TOOLS AND WORKFLOW]"] },
];

/** Keep only the services you actually offer. */
export const services = [
  {
    title: "Custom websites",
    description: "Fast, accessible marketing and business sites built to be edited, not rebuilt.",
    problem: "Your current site is slow, dated, or painful to update.",
    deliverables: ["[DELIVERABLE]", "[TECHNOLOGY]"],
  },
  {
    title: "Full-stack web applications",
    description: "Product-grade apps with auth, data, and the business logic behind them.",
    problem: "You have a workflow or idea that spreadsheets can't hold anymore.",
    deliverables: ["[DELIVERABLE]", "[TECHNOLOGY]"],
  },
  {
    title: "SaaS & MVP builds",
    description: "Scoped first versions that ship early and leave room to grow.",
    problem: "You need to validate an idea with real users before scaling.",
    deliverables: ["[DELIVERABLE]", "[TECHNOLOGY]"],
  },
  {
    title: "Dashboards & admin panels",
    description: "Internal tools that turn scattered data into decisions.",
    problem: "Your team is stitching reports together by hand.",
    deliverables: ["[DELIVERABLE]", "[TECHNOLOGY]"],
  },
  {
    title: "APIs & integrations",
    description: "Clean APIs and reliable connections between the tools you already use.",
    problem: "Your systems don't talk to each other, so people copy data around.",
    deliverables: ["[DELIVERABLE]", "[TECHNOLOGY]"],
  },
  {
    title: "Automation & workflow tools",
    description: "Small, focused tools that remove repetitive work.",
    problem: "Hours every week go to tasks a script could do.",
    deliverables: ["[DELIVERABLE]", "[TECHNOLOGY]"],
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Discovery",
    body: "Understand the idea, the people it serves, the business goals and the constraints.",
  },
  {
    n: "02",
    title: "Planning",
    body: "Define scope, architecture, priorities, technology choices and milestones.",
  },
  {
    n: "03",
    title: "Design & prototyping",
    body: "Shape the structure, interface direction and interaction patterns before code hardens.",
  },
  {
    n: "04",
    title: "Development",
    body: "Build in small, reviewable increments on a maintainable, practical architecture.",
  },
  {
    n: "05",
    title: "Testing & refinement",
    body: "Check function, responsiveness, performance, accessibility and reliability.",
  },
  {
    n: "06",
    title: "Launch & iteration",
    body: "Deploy, monitor, and improve based on real usage and feedback.",
  },
];

/** Replace with real roles, freelance work, or milestones. Empty hides the section. */
export const journey = [
  {
    period: "[START DATE] — [END DATE OR PRESENT]",
    title: "[JOB TITLE]",
    org: "[COMPANY / ORGANIZATION]",
    summary: "[RESPONSIBILITIES & KEY CONTRIBUTIONS]",
    tech: ["[TECHNOLOGIES USED]"],
  },
  {
    period: "[START DATE] — [END DATE]",
    title: "[JOB TITLE / MILESTONE]",
    org: "[COMPANY / ORGANIZATION]",
    summary: "[RESPONSIBILITIES & KEY CONTRIBUTIONS]",
    tech: ["[TECHNOLOGIES USED]"],
  },
];

/** Only verified numbers, e.g. { value: "12", label: "Products shipped" }. Empty hides the section. */
export const achievements: { value: string; label: string }[] = [];

/** Only real testimonials. Empty hides the section. */
export const testimonials: { quote: string; name: string; role: string; company: string }[] = [];

export const projectTypes = [
  "Website",
  "Web application",
  "SaaS / MVP",
  "Dashboard / internal tool",
  "API / integration",
  "Automation",
  "Something else",
];

export const budgetRanges = ["[BUDGET RANGE 1]", "[BUDGET RANGE 2]", "[BUDGET RANGE 3]", "Not sure yet"];
