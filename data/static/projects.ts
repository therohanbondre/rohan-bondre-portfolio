import { type Project } from "@/lib/objects";

export const staticProjects: Project[] = [
  {
    id: 1,
    name: "City Grievance Services",
    description: `**A digital platform for reporting and managing city-related complaints.**

Built with **Python**, **Flask**, **HTML**, **CSS**, **JavaScript**, and **MySQL**. Citizens submit complaints about city services — roads, sanitation, streetlights — through validated web forms. Administrators review, update, and manage records through a centralized dashboard with full **CRUD** support.

**My Contribution:** Developed the Flask backend, built frontend pages, integrated MySQL, implemented complaint workflows, and added input validation and error handling.`,
    image_url: "/projects/city-grievance.jpg",
    github_url: "https://github.com/therohanbondre/City-Grievance-Services",
    // project_url: "",  ← Uncomment and add a live demo URL when available
    technologies: [
      {
        id: 2,
        name: "Python",
        image_url: "https://cdn.simpleicons.org/python",
        fallback_image_url:
          "https://img.shields.io/badge/-Python-black?logo=python",
      },
      {
        id: 20,
        name: "Flask",
        image_url: "https://cdn.simpleicons.org/flask",
        fallback_image_url:
          "https://img.shields.io/badge/-Flask-black?logo=flask",
      },
      {
        id: 10,
        name: "HTML",
        image_url: "https://cdn.simpleicons.org/html5",
        fallback_image_url:
          "https://img.shields.io/badge/-HTML-black?logo=html5",
      },
      {
        id: 11,
        name: "CSS",
        image_url: "https://cdn.simpleicons.org/css3",
        fallback_image_url:
          "https://img.shields.io/badge/-CSS-black?logo=css3",
      },
      {
        id: 3,
        name: "JavaScript",
        image_url: "https://cdn.simpleicons.org/javascript",
        fallback_image_url:
          "https://img.shields.io/badge/-JavaScript-black?logo=javascript",
      },
      {
        id: 30,
        name: "MySQL",
        image_url: "https://cdn.simpleicons.org/mysql",
        fallback_image_url:
          "https://img.shields.io/badge/-MySQL-black?logo=mysql",
      },
      {
        id: 4,
        name: "SQL",
        image_url: "https://cdn.simpleicons.org/mysql",
        fallback_image_url:
          "https://img.shields.io/badge/-SQL-black?logo=mysql",
      },
    ],
    featured: true,
  },

  {
    id: 2,
    name: "Stock Analytics Platform",
    description: `**A full-stack platform for financial data collection, analysis, and visualization.**

Built with **Python**, **React.js**, **REST APIs**, and **MySQL**. Fetches market data through financial APIs, stores and processes it in MySQL, and displays historical trends and metrics through interactive charts and dashboard components.

**System flow:** React.js Frontend → REST API → Python Backend → Financial Data API → MySQL → Analytics Dashboard

**My Contribution:** Developed backend data processing, integrated financial APIs, built React.js dashboard components, connected frontend and backend, and debugged API and database integrations.`,
    image_url: "/projects/stock-analytics.png",
    // github_url: "",   ← Uncomment and add your repo URL when available
    // project_url: "",  ← Uncomment and add a live demo URL when available
    technologies: [
      {
        id: 2,
        name: "Python",
        image_url: "https://cdn.simpleicons.org/python",
        fallback_image_url:
          "https://img.shields.io/badge/-Python-black?logo=python",
      },
      {
        id: 3,
        name: "JavaScript",
        image_url: "https://cdn.simpleicons.org/javascript",
        fallback_image_url:
          "https://img.shields.io/badge/-JavaScript-black?logo=javascript",
      },
      {
        id: 12,
        name: "React.js",
        image_url: "https://cdn.simpleicons.org/react",
        fallback_image_url:
          "https://img.shields.io/badge/-React-black?logo=react",
      },
      {
        id: 21,
        name: "REST APIs",
        image_url: "https://cdn.simpleicons.org/fastapi",
        fallback_image_url:
          "https://img.shields.io/badge/-REST_APIs-black?logo=fastapi",
      },
      {
        id: 4,
        name: "SQL",
        image_url: "https://cdn.simpleicons.org/mysql",
        fallback_image_url:
          "https://img.shields.io/badge/-SQL-black?logo=mysql",
      },
      {
        id: 30,
        name: "MySQL",
        image_url: "https://cdn.simpleicons.org/mysql",
        fallback_image_url:
          "https://img.shields.io/badge/-MySQL-black?logo=mysql",
      },
      {
        id: 10,
        name: "HTML",
        image_url: "https://cdn.simpleicons.org/html5",
        fallback_image_url:
          "https://img.shields.io/badge/-HTML-black?logo=html5",
      },
      {
        id: 11,
        name: "CSS",
        image_url: "https://cdn.simpleicons.org/css3",
        fallback_image_url:
          "https://img.shields.io/badge/-CSS-black?logo=css3",
      },
    ],
    featured: true,
  },

  {
    id: 3,
    name: "Network Monitoring & Troubleshooting Lab",
    description: `**Practical networking lab for packet analysis, TCP/IP troubleshooting, and communication diagnostics.**

Captured and inspected network packets using **Wireshark**, applied **TCP/IP** concepts to investigate communication behavior, identified abnormal traffic patterns, and performed connectivity troubleshooting across multiple scenarios using **Linux**.

**My Contribution:** Analyzed network traffic, investigated protocol issues, validated behavior across scenarios, and documented all findings systematically.`,
    image_url: "/projects/network-monitoring.png",
    // github_url: "",   ← Uncomment and add your repo URL when available
    technologies: [
      {
        id: 49,
        name: "Wireshark",
        image_url: "https://cdn.simpleicons.org/wireshark",
        fallback_image_url:
          "https://img.shields.io/badge/-Wireshark-black?logo=wireshark",
      },
      {
        id: 53,
        name: "TCP/IP Networking",
        image_url: "https://cdn.simpleicons.org/cisco",
        fallback_image_url:
          "https://img.shields.io/badge/-TCP%2FIP-black?logo=cisco",
      },
      {
        id: 47,
        name: "Linux / Unix",
        image_url: "https://cdn.simpleicons.org/linux",
        fallback_image_url:
          "https://img.shields.io/badge/-Linux-black?logo=linux",
      },
      {
        id: 2,
        name: "Python",
        image_url: "https://cdn.simpleicons.org/python",
        fallback_image_url:
          "https://img.shields.io/badge/-Python-black?logo=python",
      },
    ],
    featured: false,
  },

  {
    id: 5,
    name: "PropVista – Intelligent Property Selection System",
    description: `**Intelligent property selection using environmental, location, and lifestyle parameters.**

An Android application built with **Java**, **Android Studio**, **Firebase**, and **SQLite**. Collects property details, environmental conditions, soil/moisture data, and user preferences to generate suitability scores and side-by-side property comparisons.

**My Contribution:** Developed Android functionality in Java, built XML layouts, implemented property evaluation workflows, integrated Firebase and SQLite storage, and tested and debugged the application.`,
    image_url: "/projects/propvista.jpg",
    // github_url: "",   ← Uncomment and add your repo URL when available
    // project_url: "",  ← Uncomment and add a live demo URL when available
    technologies: [
      {
        id: 1,
        name: "Java",
        image_url: "https://cdn.simpleicons.org/openjdk",
        fallback_image_url:
          "https://img.shields.io/badge/-Java-black?logo=openjdk",
      },
      {
        id: 60,
        name: "Android Studio",
        image_url: "https://cdn.simpleicons.org/androidstudio",
        fallback_image_url:
          "https://img.shields.io/badge/-Android_Studio-black?logo=androidstudio",
      },
      {
        id: 63,
        name: "Android SDK",
        image_url: "https://cdn.simpleicons.org/android",
        fallback_image_url:
          "https://img.shields.io/badge/-Android_SDK-black?logo=android",
      },
      {
        id: 61,
        name: "Firebase",
        image_url: "https://cdn.simpleicons.org/firebase",
        fallback_image_url:
          "https://img.shields.io/badge/-Firebase-black?logo=firebase",
      },
      {
        id: 62,
        name: "SQLite",
        image_url: "https://cdn.simpleicons.org/sqlite",
        fallback_image_url:
          "https://img.shields.io/badge/-SQLite-black?logo=sqlite",
      },
      {
        id: 4,
        name: "SQL",
        image_url: "https://cdn.simpleicons.org/mysql",
        fallback_image_url:
          "https://img.shields.io/badge/-SQL-black?logo=mysql",
      },
    ],
    featured: true,
  },

  // ── 1Fi EMI Store ─────────────────────────────────────────────────────────
  {
    id: 6,
    name: "1Fi EMI Store – Full Stack EMI Shopping Platform",
    description: `**A full-stack e-commerce platform for browsing products and managing EMI-oriented shopping workflows.**

Built with **React.js**, **Vite**, **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**. The React frontend communicates with the Express backend through REST APIs, while Prisma manages database operations with PostgreSQL hosted on **Neon**.

**My Contribution:** Worked on React and Vite frontend, set up Node.js/Express backend, configured Prisma with Neon PostgreSQL, managed migrations and seed data, integrated APIs, and resolved build and development issues throughout.`,
    image_url: "/projects/1fi-emi-store.png",
    github_url: "https://github.com/therohanbondre/1fi-emi-store",
    // project_url: "",  ← Uncomment and add a live demo URL when available
    technologies: [
      {
        id: 12,
        name: "React.js",
        image_url: "https://cdn.simpleicons.org/react",
        fallback_image_url:
          "https://img.shields.io/badge/-React-black?logo=react",
      },
      {
        id: 66,
        name: "Vite",
        image_url: "https://cdn.simpleicons.org/vite",
        fallback_image_url:
          "https://img.shields.io/badge/-Vite-black?logo=vite",
      },
      {
        id: 3,
        name: "JavaScript",
        image_url: "https://cdn.simpleicons.org/javascript",
        fallback_image_url:
          "https://img.shields.io/badge/-JavaScript-black?logo=javascript",
      },
      {
        id: 10,
        name: "HTML",
        image_url: "https://cdn.simpleicons.org/html5",
        fallback_image_url:
          "https://img.shields.io/badge/-HTML-black?logo=html5",
      },
      {
        id: 11,
        name: "CSS",
        image_url: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/css3.svg",
        fallback_image_url:
          "https://img.shields.io/badge/-CSS-black?logo=css3",
      },
      {
        id: 64,
        name: "Node.js",
        image_url: "https://cdn.simpleicons.org/nodedotjs",
        fallback_image_url:
          "https://img.shields.io/badge/-Node.js-black?logo=nodedotjs",
      },
      {
        id: 65,
        name: "Express.js",
        image_url: "https://cdn.simpleicons.org/express",
        fallback_image_url:
          "https://img.shields.io/badge/-Express.js-black?logo=express",
      },
      {
        id: 21,
        name: "REST APIs",
        image_url: "https://cdn.simpleicons.org/fastapi",
        fallback_image_url:
          "https://img.shields.io/badge/-REST_APIs-black?logo=fastapi",
      },
      {
        id: 67,
        name: "PostgreSQL",
        image_url: "https://cdn.simpleicons.org/postgresql",
        fallback_image_url:
          "https://img.shields.io/badge/-PostgreSQL-black?logo=postgresql",
      },
      {
        id: 68,
        name: "Prisma ORM",
        image_url: "https://cdn.simpleicons.org/prisma",
        fallback_image_url:
          "https://img.shields.io/badge/-Prisma-black?logo=prisma",
      },
      {
        id: 69,
        name: "Neon",
        image_url: "https://cdn.simpleicons.org/neon",
        fallback_image_url:
          "https://img.shields.io/badge/-Neon-black",
      },
      {
        id: 41,
        name: "GitHub",
        image_url: "https://cdn.simpleicons.org/github",
        fallback_image_url:
          "https://img.shields.io/badge/-GitHub-black?logo=github",
      },
    ],
    featured: false,
  },

  // ── AI Career Mentor Platform ──────────────────────────────────────────────
  {
    id: 7,
    name: "AI Career Mentor Platform",
    description: `**AI-powered career guidance, resume analysis, and interview preparation platform.**

A full-stack GenAI application combining a **Next.js** + React frontend with a **Python** backend using **LangChain**, **LangGraph**, and RAG-based retrieval. Analyzes resumes, matches them against job descriptions, identifies skill gaps, and generates personalized career guidance and interview preparation content.

**My Contribution:** Built full-stack application structure, Next.js frontend, Python AI processing, LangChain/LangGraph workflows, RAG pipelines, prompt engineering, backend API integration, and PostgreSQL + Prisma ORM data layer.`,
    image_url: "/projects/ai-career-mentor.png",
    github_url: "https://github.com/therohanbondre/ai-career-mentor",
    // project_url: "",  ← Uncomment and add a live demo URL when available
    technologies: [
      {
        id: 2,
        name: "Python",
        image_url: "https://cdn.simpleicons.org/python",
        fallback_image_url:
          "https://img.shields.io/badge/-Python-black?logo=python",
      },
      {
        id: 70,
        name: "Next.js",
        image_url: "https://cdn.simpleicons.org/nextdotjs",
        fallback_image_url:
          "https://img.shields.io/badge/-Next.js-black?logo=nextdotjs",
      },
      {
        id: 12,
        name: "React.js",
        image_url: "https://cdn.simpleicons.org/react",
        fallback_image_url:
          "https://img.shields.io/badge/-React-black?logo=react",
      },
      {
        id: 71,
        name: "TypeScript",
        image_url: "https://cdn.simpleicons.org/typescript",
        fallback_image_url:
          "https://img.shields.io/badge/-TypeScript-black?logo=typescript",
      },
      {
        id: 72,
        name: "Tailwind CSS",
        image_url: "https://cdn.simpleicons.org/tailwindcss",
        fallback_image_url:
          "https://img.shields.io/badge/-Tailwind-black?logo=tailwindcss",
      },
      {
        id: 73,
        name: "LangChain",
        image_url: "https://cdn.simpleicons.org/langchain",
        fallback_image_url:
          "https://img.shields.io/badge/-LangChain-black",
      },
      {
        id: 74,
        name: "LangGraph",
        image_url: "https://cdn.simpleicons.org/langgraph",
        fallback_image_url:
          "https://img.shields.io/badge/-LangGraph-black",
      },
      {
        id: 75,
        name: "RAG",
        image_url: "https://cdn.simpleicons.org/semanticscholar",
        fallback_image_url:
          "https://img.shields.io/badge/-RAG-black",
      },
      {
        id: 67,
        name: "PostgreSQL",
        image_url: "https://cdn.simpleicons.org/postgresql",
        fallback_image_url:
          "https://img.shields.io/badge/-PostgreSQL-black?logo=postgresql",
      },
      {
        id: 68,
        name: "Prisma ORM",
        image_url: "https://cdn.simpleicons.org/prisma",
        fallback_image_url:
          "https://img.shields.io/badge/-Prisma-black?logo=prisma",
      },
      {
        id: 21,
        name: "REST APIs",
        image_url: "https://cdn.simpleicons.org/fastapi",
        fallback_image_url:
          "https://img.shields.io/badge/-REST_APIs-black?logo=fastapi",
      },
      {
        id: 41,
        name: "GitHub",
        image_url: "https://cdn.simpleicons.org/github",
        fallback_image_url:
          "https://img.shields.io/badge/-GitHub-black?logo=github",
      },
    ],
    featured: false,
  },
];
