import elevateImg from "../assets/Elevate.png";
import untrackedImg from "../assets/Untracked.png";
import naturaLynxImg from "../assets/NaturaLynx.png";
import naturaLearnImg from "../assets/NaturaLearn.png";
import hedgeOverviewImg from "../assets/HedgeLab-overview.jpg";
import hedgeRiskImg from "../assets/HedgeLab-risk.jpg";
import hedgeMechanicsImg from "../assets/HedgeLab-mechanics.jpg";

export const links = {
  email: "novalim1116@gmail.com",
  github: "https://github.com/Nova-Alim",
  linkedin: "https://www.linkedin.com/in/nova-alim",
  resume: "/Nova_Alim_Resume.pdf",
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  project: string; // which mission this number comes from
  missionId: string;
  hue: number;
};

// Headline numbers under the hero; each one links to the project it came from
export const telemetry: Stat[] = [
  { value: 800, suffix: "+", label: "live ticket-queue checks an hour, beating a competing bot to new tickets", project: "Helpdesk Engine", missionId: "helpdesk", hue: 190 },
  { value: 3900, suffix: "+", label: "trading days of bond ETF data backtested across 3 hedging strategies", project: "HedgeLabs", missionId: "hedgelabs", hue: 150 },
  { value: 200, prefix: "<", suffix: " ms", label: "response time across 10+ API endpoints in my AI time tracker", project: "Untracked", missionId: "untracked", hue: 268 },
  { value: 1500, suffix: "+", label: "workout and nutrition records powering a fitness dashboard", project: "Elevate", missionId: "elevate", hue: 330 },
];

export type Mission = {
  id: string;
  title: string;
  year: string;
  kind: string;
  hue: number; // color of this mission's planet
  tagline: string;
  stats?: { value: string; label: string }[];
  bullets: string[];
  stack: string[];
  images?: string[];
  gallery?: boolean; // wide screenshots: show one at a time with tabs
  galleryLabels?: string[];
  live?: string; // live demo URL
};

export const missions: Mission[] = [
  {
    id: "helpdesk",
    title: "Helpdesk Auto-Assignment Engine",
    year: "Nov 2026",
    kind: "Automation",
    hue: 190,
    tagline:
      "A Python and Playwright monitor that watches a live OpenERP ticket queue and claims new tickets before a competing system can.",
    stats: [
      { value: "800+", label: "checks per hour" },
      { value: "82%", label: "less time lost on claimed tickets" },
      { value: "100+", label: "tests across 8 suites" },
    ],
    bullets: [
      "Races a competing system for new tickets on a live production queue.",
      "Uses DOM status detection to skip already-claimed tickets, plus a JSON-RPC claim path designed to bring assignment from 7 s to under 2 s.",
      "Runs unattended all day with A/B benchmarks and exponential-backoff error recovery.",
    ],
    stack: ["Python", "Playwright", "JSON-RPC", "OpenERP"],
  },
  {
    id: "hedgelabs",
    title: "HedgeLabs",
    year: "Oct 2026",
    kind: "Fintech",
    hue: 150,
    tagline:
      "A risk analytics platform that backtests hedging strategies on high-yield bond ETFs and explains the results in plain language.",
    stats: [
      { value: "3,900+", label: "trading days of data" },
      { value: "15+", label: "years of history" },
      { value: "3", label: "hedging strategies backtested" },
    ],
    bullets: [
      "Quantifies returns, P&L, and drawdowns for $1M portfolios across unhedged, short-position, and inverse ETF strategies.",
      "Deployed React, FastAPI, and TimescaleDB on AWS (EC2, RDS, S3).",
      "Integrated Gemini into Plotly dashboards so non-experts get plain-language explanations.",
    ],
    stack: ["React", "TypeScript", "Python", "FastAPI", "AWS", "TimescaleDB", "Plotly"],
    images: [hedgeOverviewImg, hedgeRiskImg, hedgeMechanicsImg],
    gallery: true,
    galleryLabels: ["Hedge simulator", "Risk analysis", "Hedge mechanics"],
    live: "https://restricted-book-hedger-tiger.onrender.com/",
  },
  {
    id: "untracked",
    title: "Untracked",
    year: "Jul 2026",
    kind: "AI · Productivity",
    hue: 268,
    tagline:
      "An AI-powered time tracker that organizes how you spend your day and turns it into real insight about your habits.",
    stats: [
      { value: "2,500+", label: "activity records organized" },
      { value: "<200 ms", label: "across 10+ REST endpoints" },
      { value: "80%+", label: "less raw data sent to the AI" },
    ],
    bullets: [
      "Full-stack tracker built with React, TypeScript, FastAPI, PostgreSQL, and Supabase.",
      "Designed FastAPI services with SQLAlchemy to keep every read and write fast.",
      "Aggregates 250+ weekly records in PostgreSQL first, so the Anthropic API gets a summary instead of raw logs.",
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Supabase", "Anthropic API"],
    images: [untrackedImg],
  },
  {
    id: "elevate",
    title: "Elevate",
    year: "Aug 2025",
    kind: "Health · Web",
    hue: 330,
    tagline:
      "A full-stack fitness hub to log workouts and meals, follow tutorials, and see your week at a glance.",
    stats: [
      { value: "1,500+", label: "workout & nutrition records" },
      { value: "500+", label: "weekly records aggregated" },
    ],
    bullets: [
      "Full-stack platform built with React, Express, PostgreSQL, and Redux, with Auth0 and JWT sign-in.",
      "PostgreSQL aggregations power leaderboards, milestone progress, and per-user performance stats.",
      "Dashboards for daily calories, water intake, and workout history, plus a geolocation gym finder.",
    ],
    stack: ["React", "Express", "PostgreSQL", "Redux", "Pandas", "Tailwind CSS", "Auth0"],
    images: [elevateImg],
  },
  {
    id: "naturalynx",
    title: "NaturaLynx",
    year: "",
    kind: "Mobile",
    hue: 105,
    tagline:
      "A mobile app that pairs real-time plant identification with friendly lessons for families, educators, and new botanists.",
    bullets: [
      "Point your camera at a plant to identify it in real time.",
      "NaturaLearn lessons turn each discovery into something to learn.",
      "Designed for beginners, so exploring nature feels simple.",
    ],
    stack: ["Mobile", "Plant ID", "UX design"],
    images: [naturaLynxImg, naturaLearnImg],
  },
];

export type Role = {
  role: string;
  org: string;
  when: string;
  where: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    role: "Software Engineering Intern",
    org: "EXIT Alliance Realty",
    when: "Feb 2025 – Aug 2025",
    where: "Jamaica, NY",
    bullets: [
      "Built one agent dashboard for listings, inquiries, and showings with React, TypeScript, FastAPI, and PostgreSQL.",
      "Added plain-language listing search with RAG, LangChain, and pgvector.",
      "Improved page load performance by 40% and set up CI/CD with Docker, GitHub Actions, and AWS S3.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "Cowan Consulting",
    when: "Jan 2024 – Dec 2024",
    where: "Farmingdale, NY",
    bullets: [
      "Led full-stack development of a production real-estate platform with 200+ listings.",
      "Cut redundant database reads by 35% for 1,000+ users by simplifying Firestore lookups.",
      "Secured accounts and image uploads with Firebase Auth, Firestore, and Cloud Storage.",
    ],
  },
  {
    role: "B.S. Computer Science",
    org: "Farmingdale State College",
    when: "Graduated Dec 2024",
    where: "Farmingdale, NY",
    bullets: ["CompTIA Security+ certified."],
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "C++", "C", "Kotlin", "HTML/CSS"] },
  { group: "Frontend", items: ["React", "Redux", "Tailwind CSS", "Plotly"] },
  { group: "Backend & Data", items: ["FastAPI", "Node.js", "Express", "Spring Boot", "PostgreSQL", "TimescaleDB", "Firebase", "Supabase", "GraphQL", "Pandas"] },
  { group: "AI & Automation", items: ["LangChain", "pgvector", "Anthropic API", "Gemini", "Playwright"] },
  { group: "Cloud & Tools", items: ["AWS", "Docker", "GitHub Actions", "Git", "Linux", "Postman", "JUnit", "Mockito"] },
];

export const aboutMe =
  "I'm Nova, someone who loves the balance between relaxing and building things. When I'm not coding, I'm playing games, walking my dog, or going down a rabbit hole about anything computers. That curiosity is what got me into software, and now my favorite feeling is turning an idea into something real that people actually use.";
