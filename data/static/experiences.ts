import { type Experience } from "@/lib/objects";

export const staticExperiences: Experience[] = [
  // ── Most recent first ──────────────────────────────────────────────────────
  {
    id: 2,
    company: "Bluestock Fintech Pvt. Ltd., Pune, India",
    start: "2025-01",
    end: "2025-03",
    tenure: "3 months",
    positions: [
      {
        role: "Software Development Intern",
        start: "2025-01",
        end: "2025-03",
        work_done: `- Developed and tested web application modules using **Java, Python, JavaScript, SQL, REST APIs**, and JSON
- Executed **functional, regression, integration, UI, database, and end-to-end** test scenarios
- Automated UI and API testing using **Selenium WebDriver, TestNG, Postman**, and **Page Object Model (POM)**
- Validated REST/GraphQL requests, responses, authentication, JSON data, and database operations using SQL
- Managed test cases, test data, defect tracking, and regression testing using **Jira**
- Used **Maven, Git**, and CI/CD workflows for automated quality checks
- Collaborated with developers through the full **SDLC** and **Agile/Scrum** process`,
        projects: [
          { id: 2, name: "Stock Analytics Platform" },
        ],
      },
    ],
    technologies: [
      {
        id: 1,
        name: "Java",
        image_url: "https://cdn.simpleicons.org/openjdk",
        fallback_image_url: "https://img.shields.io/badge/-Java-black?logo=openjdk",
      },
      {
        id: 2,
        name: "Python",
        image_url: "https://cdn.simpleicons.org/python",
        fallback_image_url: "https://img.shields.io/badge/-Python-black?logo=python",
      },
      {
        id: 3,
        name: "JavaScript",
        image_url: "https://cdn.simpleicons.org/javascript",
        fallback_image_url: "https://img.shields.io/badge/-JavaScript-black?logo=javascript",
      },
      {
        id: 46,
        name: "Selenium",
        image_url: "https://cdn.simpleicons.org/selenium",
        fallback_image_url: "https://img.shields.io/badge/-Selenium-black?logo=selenium",
      },
      {
        id: 22,
        name: "GraphQL",
        image_url: "https://cdn.simpleicons.org/graphql",
        fallback_image_url: "https://img.shields.io/badge/-GraphQL-black?logo=graphql",
      },
      {
        id: 30,
        name: "MySQL",
        image_url: "https://cdn.simpleicons.org/mysql",
        fallback_image_url: "https://img.shields.io/badge/-MySQL-black?logo=mysql",
      },
      {
        id: 43,
        name: "Maven",
        image_url: "https://cdn.simpleicons.org/apachemaven",
        fallback_image_url: "https://img.shields.io/badge/-Maven-black?logo=apachemaven",
      },
      {
        id: 45,
        name: "Jira",
        image_url: "https://cdn.simpleicons.org/jira",
        fallback_image_url: "https://img.shields.io/badge/-Jira-black?logo=jira",
      },
    ],
  },

  {
    id: 3,
    company: "Softtek Technologies, Pune, India",
    start: "2022-05",
    end: "2022-07",
    tenure: "3 months",
    positions: [
      {
        role: "Full Stack Developer Intern",
        start: "2022-05",
        end: "2022-07",
        work_done: `- Developed responsive web pages using **HTML, CSS, JavaScript**, and **Bootstrap**
- Implemented interactive frontend functionality and form validation using **JavaScript**
- Built database-driven web functionality using **PHP** and **MySQL**
- Connected frontend forms with backend database operations for storing and retrieving application data
- Worked with **Git** for version control and followed basic software development and testing practices`,
        projects: [
          { id: 8, name: "Smart Attendance Monitoring System" },
        ],
      },
    ],
    technologies: [
      {
        id: 10,
        name: "HTML",
        image_url: "https://cdn.simpleicons.org/html5",
        fallback_image_url: "https://img.shields.io/badge/-HTML-black?logo=html5",
      },
      {
        id: 11,
        name: "CSS",
        image_url: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/css3.svg",
        fallback_image_url: "https://img.shields.io/badge/-CSS-black?logo=css3",
      },
      {
        id: 3,
        name: "JavaScript",
        image_url: "https://cdn.simpleicons.org/javascript",
        fallback_image_url: "https://img.shields.io/badge/-JavaScript-black?logo=javascript",
      },
      {
        id: 80,
        name: "Bootstrap",
        image_url: "https://cdn.simpleicons.org/bootstrap",
        fallback_image_url: "https://img.shields.io/badge/-Bootstrap-black?logo=bootstrap",
      },
      {
        id: 81,
        name: "PHP",
        image_url: "https://cdn.simpleicons.org/php",
        fallback_image_url: "https://img.shields.io/badge/-PHP-black?logo=php",
      },
      {
        id: 30,
        name: "MySQL",
        image_url: "https://cdn.simpleicons.org/mysql",
        fallback_image_url: "https://img.shields.io/badge/-MySQL-black?logo=mysql",
      },
      {
        id: 40,
        name: "Git",
        image_url: "https://cdn.simpleicons.org/git",
        fallback_image_url: "https://img.shields.io/badge/-Git-black?logo=git",
      },
    ],
  },
];
