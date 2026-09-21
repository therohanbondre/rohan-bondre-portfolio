import { GetUserDetails } from "@/data/user-details";
import { GetProjects } from "@/data/projects";
import { GetExperiences } from "@/data/experiences";
import { GetTechnologies } from "@/data/technologies";
import { TechnologyCategory } from "@/lib/objects";
import { getTechnologyCategoryLabel } from "@/lib/utils";

// ─── PERSONALISE ──────────────────────────────────────────────────────────────
// Update these constants with your own details.
// They are used in the markdown representations of your pages (for LLM agents).
const OWNER_NAME = "Rohan Bondre";
const SITE_URL = "https://github.com/therohanbondre"; // TODO: Replace with deployed domain
const OWNER_EMAIL = "rohanbondre96@gmail.com";
const OWNER_GITHUB = "https://github.com/therohanbondre";
const OWNER_LINKEDIN = "https://www.linkedin.com/in/rohan-bondre1/";
// ─────────────────────────────────────────────────────────────────────────────

export async function getMarkdownForPath(
  path: string,
): Promise<{ content: string; status: number }> {
  if (path === "") path = "/";
  if (!path.startsWith("/")) path = `/${path}`;

  try {
    switch (path) {
      case "/":
        return { content: await generateHomeMarkdown(), status: 200 };
      case "/projects":
        return { content: await generateProjectsMarkdown(), status: 200 };
      case "/contact":
        return { content: generateContactMarkdown(), status: 200 };
      case "/achievements":
        return { content: await generateAchievementsMarkdown(), status: 200 };
      case "/resume":
        return { content: generateResumeMarkdown(), status: 200 };
      case "/privacy":
        return { content: generatePrivacyMarkdown(), status: 200 };
      default:
        return { content: generateNotFoundMarkdown(path), status: 404 };
    }
  } catch (error) {
    console.error("Error generating markdown for path:", path, error);
    return {
      content: `# Error\n\nThere was an error generating the content for ${path}. Please try again later.`,
      status: 500,
    };
  }
}

async function generateHomeMarkdown() {
  const details = await GetUserDetails();
  const { projects } = await GetProjects({ Featured: true });
  const { experiences } = await GetExperiences();
  const { technologies } = await GetTechnologies();

  let md = `# ${OWNER_NAME}\n\n`;
  md += `${details.about}\n\n`;

  md += `## Technologies\n\n`;
  const categories = Object.values(TechnologyCategory)
    .filter(
      (category) =>
        category !== TechnologyCategory.Invalid &&
        category !== TechnologyCategory.None,
    )
    .sort((left, right) => {
      const leftOrder =
        left === TechnologyCategory.Language ? 0 : (left as number);
      const rightOrder =
        right === TechnologyCategory.Language ? 0 : (right as number);
      return leftOrder - rightOrder;
    });

  categories.forEach((category) => {
    const catTechs = technologies.filter((t) => t.category === category);
    if (catTechs.length > 0) {
      md += `### ${getTechnologyCategoryLabel(category)}\n`;
      md += `${catTechs.map((t) => t.name).join(", ")}\n\n`;
    }
  });

  md += `## Experience\n\n`;
  experiences.slice(0, 3).forEach((exp) => {
    md += `### ${exp.company}\n`;
    md += `**Tenure:** ${exp.tenure} (${exp.start} - ${exp.end || "Present"})\n\n`;
    exp.positions.forEach((pos) => {
      md += `#### ${pos.role}\n`;
      md += `${pos.work_done}\n\n`;
    });
    if (exp.technologies && exp.technologies.length > 0) {
      md += `**Technologies:** ${exp.technologies.map((t) => t.name).join(", ")}\n\n`;
    }
  });

  if (projects.length > 0) {
    md += `## Featured Projects\n\n`;
    projects.forEach((p) => {
      md += `### ${p.name}\n`;
      md += `${p.description}\n\n`;
      if (p.technologies && p.technologies.length > 0) {
        md += `**Technologies:** ${p.technologies.map((t) => t.name).join(", ")}\n\n`;
      }
      if (p.project_url) md += `[View Project](${p.project_url}) | `;
      if (p.github_url) md += `[GitHub](${p.github_url})`;
      md += `\n\n`;
    });
  }

  md += `\n[View Full Resume](/resume) | [Contact Me](/contact)`;
  return md;
}

async function generateProjectsMarkdown() {
  const { projects } = await GetProjects({ Featured: false });

  let md = `# Projects\n\nHere's a list of projects I have worked on or am working on.\n\n`;

  projects.forEach((p) => {
    md += `## ${p.name}\n`;
    if (p.featured) md += `*(Featured)*\n\n`;
    md += `${p.description}\n\n`;

    if (p.technologies && p.technologies.length > 0) {
      md += `**Technologies:** ${p.technologies.map((t) => t.name).join(", ")}\n\n`;
    }

    if (p.project_url) md += `- [Live Demo](${p.project_url})\n`;
    if (p.github_url) md += `- [Source Code](${p.github_url})\n`;

    md += `\n---\n\n`;
  });

  return md;
}

function generateContactMarkdown() {
  return `# Contact ${OWNER_NAME}\n
Get in touch through any of the following:

- **Email**: [${OWNER_EMAIL}](mailto:${OWNER_EMAIL})
- **LinkedIn**: [${OWNER_NAME}](${OWNER_LINKEDIN})
- **GitHub**: [${OWNER_GITHUB}](${OWNER_GITHUB})

You can also use the contact form at [${SITE_URL}/contact](${SITE_URL}/contact).
`;
}

async function generateAchievementsMarkdown() {
  return `# Achievements — ${OWNER_NAME}

## Academic Performance
- **B.E. Computer Engineering** — CGPA 9.13 / 10  
  Indira College of Engineering and Management, Pune · SPPU (2022 – 2026)
- **Diploma in Information Technology** — 85.13%  
  Pimpri Chinchwad Polytechnic, Pune · MSBTE (2020 – 2023)

## Leadership & Responsibilities
- **Placement Coordinator** — Coordinated recruitment activities, schedules, communication, documentation, and follow-ups among recruiters, faculty, and students.
- **NSS Coordinator** — Coordinated volunteer teams and supported community and environmental initiatives.

## Languages
- **Japanese Language — JLPT N5** (Japan Foundation)

## Activities & Participation
- Inter-College Technical Events
- Coding Competitions
- Project Exhibitions
- Seminar Presentations & Public Speaking
- Entrepreneurship Cell & Innovation Activities
- Technical Workshops & Industrial Visits
- College Fest Management & Event Volunteering
- Social Service & Leadership Development Programs
`;
}

function generateResumeMarkdown() {
  return `# Resume: ${OWNER_NAME}\n
My full resume is available as a PDF document.

[**Download or View Resume PDF**](${SITE_URL}/resume/resume.pdf)

To see a summary of my experience and projects, please visit the [Homepage](/).
`;
}

function generatePrivacyMarkdown() {
  return `# Privacy Policy\n
This portfolio uses third-party analytics and spam-protection services.

## Data Collection and Usage
- **Analytics:** We use Vercel Analytics, Google Analytics, and Microsoft Clarity to understand how visitors interact with the website.
- **Contact Form:** Information you provide (name, email, message) is used solely to respond to your inquiry.
- **Cookies:** Analytics providers and spam-protection services may use cookies to function properly.

## Third-Party Services
- Vercel (Hosting & Analytics)
- Google Analytics
- Microsoft Clarity
- Cloudflare Turnstile (Bot protection)

## Contact
Questions about this privacy policy? Use the [Contact Page](/contact) or email [${OWNER_EMAIL}](mailto:${OWNER_EMAIL}).
`;
}

function generateNotFoundMarkdown(path: string) {
  return `# 404 - Not Found\n
The page you requested (\`${path}\`) does not exist on this server.

## Helpful Links
- [Sitemap](${SITE_URL}/sitemap.xml)
- [Homepage](${SITE_URL}/)
- [Projects](${SITE_URL}/projects)
- [Achievements](${SITE_URL}/achievements)
- [Contact](${SITE_URL}/contact)
`;
}
