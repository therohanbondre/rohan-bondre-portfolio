import { TechnologyCategory, type Technology } from "@/lib/objects";

export const staticTechnologies: Technology[] = [
  // ── Languages ──────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Java",
    image_url: "https://cdn.simpleicons.org/openjdk",
    fallback_image_url: "https://img.shields.io/badge/-Java-black?logo=openjdk",
    category: TechnologyCategory.Language,
  },
  {
    id: 2,
    name: "Python",
    image_url: "https://cdn.simpleicons.org/python",
    fallback_image_url: "https://img.shields.io/badge/-Python-black?logo=python",
    category: TechnologyCategory.Language,
  },
  {
    id: 3,
    name: "JavaScript",
    image_url: "https://cdn.simpleicons.org/javascript",
    fallback_image_url:
      "https://img.shields.io/badge/-JavaScript-black?logo=javascript",
    category: TechnologyCategory.Language,
  },
  {
    id: 4,
    name: "SQL",
    image_url: "https://cdn.simpleicons.org/mysql",
    fallback_image_url: "https://img.shields.io/badge/-SQL-black?logo=mysql",
    category: TechnologyCategory.Language,
  },
  {
    id: 5,
    name: "JSON",
    image_url: "https://cdn.simpleicons.org/json",
    fallback_image_url: "https://img.shields.io/badge/-JSON-black?logo=json",
    category: TechnologyCategory.Language,
  },

  // ── Frontend ───────────────────────────────────────────────────────────────
  {
    id: 10,
    name: "HTML",
    image_url: "https://cdn.simpleicons.org/html5",
    fallback_image_url: "https://img.shields.io/badge/-HTML-black?logo=html5",
    category: TechnologyCategory.Frontend,
  },
  {
    id: 11,
    name: "CSS",
    // css3 removed from simpleicons CDN — using versioned jsDelivr npm package
    image_url: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/css3.svg",
    fallback_image_url: "https://img.shields.io/badge/-CSS-black?logo=css3",
    category: TechnologyCategory.Frontend,
  },
  {
    id: 12,
    name: "React.js",
    image_url: "https://cdn.simpleicons.org/react",
    fallback_image_url: "https://img.shields.io/badge/-React-black?logo=react",
    category: TechnologyCategory.Frontend,
  },

  // ── Backend & APIs ─────────────────────────────────────────────────────────
  {
    id: 20,
    name: "Flask",
    image_url: "https://cdn.simpleicons.org/flask",
    fallback_image_url: "https://img.shields.io/badge/-Flask-black?logo=flask",
    category: TechnologyCategory.Backend,
  },
  {
    id: 21,
    name: "REST APIs",
    image_url: "https://cdn.simpleicons.org/fastapi",
    fallback_image_url:
      "https://img.shields.io/badge/-REST_APIs-black?logo=fastapi",
    category: TechnologyCategory.Backend,
  },
  {
    id: 22,
    name: "GraphQL",
    image_url: "https://cdn.simpleicons.org/graphql",
    fallback_image_url:
      "https://img.shields.io/badge/-GraphQL-black?logo=graphql",
    category: TechnologyCategory.Backend,
  },

  // ── Databases ──────────────────────────────────────────────────────────────
  {
    id: 30,
    name: "MySQL",
    image_url: "https://cdn.simpleicons.org/mysql",
    fallback_image_url: "https://img.shields.io/badge/-MySQL-black?logo=mysql",
    category: TechnologyCategory.Db,
  },
  {
    id: 31,
    name: "ETL",
    image_url: "https://cdn.simpleicons.org/apacheairflow",
    fallback_image_url: "https://img.shields.io/badge/-ETL-black",
    category: TechnologyCategory.Db,
  },

  // ── Tools & DevOps ─────────────────────────────────────────────────────────
  {
    id: 40,
    name: "Git",
    image_url: "https://cdn.simpleicons.org/git",
    fallback_image_url: "https://img.shields.io/badge/-Git-black?logo=git",
    category: TechnologyCategory.Tool,
  },
  {
    id: 41,
    name: "GitHub",
    image_url: "https://cdn.simpleicons.org/github",
    fallback_image_url: "https://img.shields.io/badge/-GitHub-black?logo=github",
    category: TechnologyCategory.Tool,
  },
  {
    id: 42,
    name: "GitHub Actions",
    image_url: "https://cdn.simpleicons.org/githubactions",
    fallback_image_url:
      "https://img.shields.io/badge/-GitHub_Actions-black?logo=githubactions",
    category: TechnologyCategory.Tool,
  },
  {
    id: 43,
    name: "Maven",
    image_url: "https://cdn.simpleicons.org/apachemaven",
    fallback_image_url:
      "https://img.shields.io/badge/-Maven-black?logo=apachemaven",
    category: TechnologyCategory.Tool,
  },
  {
    id: 44,
    name: "Postman",
    image_url: "https://cdn.simpleicons.org/postman",
    fallback_image_url:
      "https://img.shields.io/badge/-Postman-black?logo=postman",
    category: TechnologyCategory.Tool,
  },
  {
    id: 45,
    name: "Jira",
    image_url: "https://cdn.simpleicons.org/jira",
    fallback_image_url: "https://img.shields.io/badge/-Jira-black?logo=jira",
    category: TechnologyCategory.Tool,
  },
  {
    id: 46,
    name: "Selenium WebDriver",
    image_url: "https://cdn.simpleicons.org/selenium",
    fallback_image_url:
      "https://img.shields.io/badge/-Selenium-black?logo=selenium",
    category: TechnologyCategory.Tool,
  },
  {
    id: 47,
    name: "Linux / Unix",
    image_url: "https://cdn.simpleicons.org/linux",
    fallback_image_url: "https://img.shields.io/badge/-Linux-black?logo=linux",
    category: TechnologyCategory.Tool,
  },
  {
    id: 48,
    name: "AWS",
    // AWS slug not available on simpleicons CDN — using versioned jsDelivr npm package
    image_url: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/amazonwebservices.svg",
    fallback_image_url:
      "https://img.shields.io/badge/-AWS-black?logo=amazonaws",
    category: TechnologyCategory.Tool,
  },
  {
    id: 49,
    name: "Wireshark",
    image_url: "https://cdn.simpleicons.org/wireshark",
    fallback_image_url:
      "https://img.shields.io/badge/-Wireshark-black?logo=wireshark",
    category: TechnologyCategory.Tool,
  },
  {
    id: 54,
    name: "TestNG",
    image_url: "https://cdn.simpleicons.org/testcafe",
    fallback_image_url: "https://img.shields.io/badge/-TestNG-black",
    category: TechnologyCategory.Tool,
  },

  // ── Academics / Engineering Concepts ──────────────────────────────────────
  {
    id: 50,
    name: "Data Structures & Algorithms",
    image_url: "https://cdn.simpleicons.org/thealgorithms",
    fallback_image_url: "https://img.shields.io/badge/-DSA-black",
    category: TechnologyCategory.Academics,
  },
  {
    id: 51,
    name: "SDLC",
    image_url: "https://cdn.simpleicons.org/confluence",
    fallback_image_url: "https://img.shields.io/badge/-SDLC-black",
    category: TechnologyCategory.Academics,
  },
  {
    id: 52,
    name: "Agile / Scrum",
    image_url: "https://cdn.simpleicons.org/jira",
    fallback_image_url: "https://img.shields.io/badge/-Agile-black",
    category: TechnologyCategory.Academics,
  },
  {
    id: 53,
    name: "TCP/IP Networking",
    image_url: "https://cdn.simpleicons.org/cisco",
    fallback_image_url:
      "https://img.shields.io/badge/-TCP%2FIP-black?logo=cisco",
    category: TechnologyCategory.Academics,
  },
  {
    id: 55,
    name: "Page Object Model",
    image_url: "https://cdn.simpleicons.org/selenium",
    fallback_image_url: "https://img.shields.io/badge/-POM-black",
    category: TechnologyCategory.Academics,
  },
  {
    id: 56,
    name: "Debugging & Troubleshooting",
    image_url: "https://cdn.simpleicons.org/gnubash",
    fallback_image_url: "https://img.shields.io/badge/-Debugging-black",
    category: TechnologyCategory.Academics,
  },

  // ── Data / Visualization ──────────────────────────────────────────────────
  {
    id: 57,
    name: "Plotly",
    image_url: "https://cdn.simpleicons.org/plotly",
    fallback_image_url:
      "https://img.shields.io/badge/-Plotly-black?logo=plotly",
    category: TechnologyCategory.Tool,
  },
  {
    id: 58,
    name: "Alpha Vantage",
    image_url: "https://cdn.simpleicons.org/databricks",
    fallback_image_url:
      "https://img.shields.io/badge/-Alpha_Vantage-black",
    category: TechnologyCategory.Tool,
  },
  {
    id: 59,
    name: "Yahoo Finance",
    // Yahoo Finance has no simpleicons icon — using jsDelivr for the Yahoo brand icon
    image_url: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/yahoo.svg",
    fallback_image_url:
      "https://img.shields.io/badge/-Yahoo_Finance-black",
    category: TechnologyCategory.Tool,
  },

  // ── Mobile / Android ──────────────────────────────────────────────────────
  {
    id: 60,
    name: "Android Studio",
    image_url: "https://cdn.simpleicons.org/androidstudio",
    fallback_image_url:
      "https://img.shields.io/badge/-Android_Studio-black?logo=androidstudio",
    category: TechnologyCategory.Tool,
  },
  {
    id: 61,
    name: "Firebase",
    image_url: "https://cdn.simpleicons.org/firebase",
    fallback_image_url:
      "https://img.shields.io/badge/-Firebase-black?logo=firebase",
    category: TechnologyCategory.Tool,
  },
  {
    id: 62,
    name: "SQLite",
    image_url: "https://cdn.simpleicons.org/sqlite",
    fallback_image_url:
      "https://img.shields.io/badge/-SQLite-black?logo=sqlite",
    category: TechnologyCategory.Db,
  },
  {
    id: 63,
    name: "Android SDK",
    image_url: "https://cdn.simpleicons.org/android",
    fallback_image_url:
      "https://img.shields.io/badge/-Android_SDK-black?logo=android",
    category: TechnologyCategory.Tool,
  },

  // ── Node / Full-Stack (added for 1Fi EMI Store) ───────────────────────────
  {
    id: 64,
    name: "Node.js",
    image_url: "https://cdn.simpleicons.org/nodedotjs",
    fallback_image_url:
      "https://img.shields.io/badge/-Node.js-black?logo=nodedotjs",
    category: TechnologyCategory.Backend,
  },
  {
    id: 65,
    name: "Express.js",
    image_url: "https://cdn.simpleicons.org/express",
    fallback_image_url:
      "https://img.shields.io/badge/-Express.js-black?logo=express",
    category: TechnologyCategory.Backend,
  },
  {
    id: 66,
    name: "Vite",
    image_url: "https://cdn.simpleicons.org/vite",
    fallback_image_url: "https://img.shields.io/badge/-Vite-black?logo=vite",
    category: TechnologyCategory.Tool,
  },
  {
    id: 67,
    name: "PostgreSQL",
    image_url: "https://cdn.simpleicons.org/postgresql",
    fallback_image_url:
      "https://img.shields.io/badge/-PostgreSQL-black?logo=postgresql",
    category: TechnologyCategory.Db,
  },
  {
    id: 68,
    name: "Prisma ORM",
    image_url: "https://cdn.simpleicons.org/prisma",
    fallback_image_url:
      "https://img.shields.io/badge/-Prisma-black?logo=prisma",
    category: TechnologyCategory.Tool,
  },
  {
    id: 69,
    name: "Neon",
    image_url: "https://cdn.simpleicons.org/neon",
    fallback_image_url: "https://img.shields.io/badge/-Neon-black",
    category: TechnologyCategory.Db,
  },

  // ── AI / GenAI (added for AI Career Mentor Platform) ─────────────────────
  {
    id: 70,
    name: "Next.js",
    image_url: "https://cdn.simpleicons.org/nextdotjs",
    fallback_image_url:
      "https://img.shields.io/badge/-Next.js-black?logo=nextdotjs",
    category: TechnologyCategory.Frontend,
  },
  {
    id: 71,
    name: "TypeScript",
    image_url: "https://cdn.simpleicons.org/typescript",
    fallback_image_url:
      "https://img.shields.io/badge/-TypeScript-black?logo=typescript",
    category: TechnologyCategory.Language,
  },
  {
    id: 72,
    name: "Tailwind CSS",
    image_url: "https://cdn.simpleicons.org/tailwindcss",
    fallback_image_url:
      "https://img.shields.io/badge/-Tailwind-black?logo=tailwindcss",
    category: TechnologyCategory.Frontend,
  },
  {
    id: 73,
    name: "LangChain",
    image_url: "https://cdn.simpleicons.org/langchain",
    fallback_image_url:
      "https://img.shields.io/badge/-LangChain-black",
    category: TechnologyCategory.Tool,
  },
  {
    id: 74,
    name: "LangGraph",
    image_url: "https://cdn.simpleicons.org/langgraph",
    fallback_image_url:
      "https://img.shields.io/badge/-LangGraph-black",
    category: TechnologyCategory.Tool,
  },
  {
    id: 75,
    name: "RAG",
    image_url: "https://cdn.simpleicons.org/semanticscholar",
    fallback_image_url:
      "https://img.shields.io/badge/-RAG-black",
    category: TechnologyCategory.Tool,
  },
];
