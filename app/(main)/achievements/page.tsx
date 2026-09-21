import { Metadata } from "next";
import { Trophy, GraduationCap, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements | Rohan Bondre",
  description:
    "Academic achievements, certifications, leadership activities, and milestones of Rohan Bondre.",
  metadataBase: new URL("https://github.com/therohanbondre"),
  alternates: {
    canonical: "/achievements",
  },
  openGraph: {
    title: "Achievements | Rohan Bondre",
    description:
      "Academic achievements, certifications, leadership activities, and milestones.",
    siteName: "Rohan Bondre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements | Rohan Bondre",
    description:
      "Academic achievements, certifications, leadership activities, and milestones.",
  },
};

// ─── TYPES ────────────────────────────────────────────────────────────────────

type IconName = "Trophy" | "GraduationCap" | "Award" | "Users";

type Achievement = {
  icon: IconName;
  title: string;
  subtitle?: string;
  date?: string;
  detail?: string;
  tags?: string[];
};

type AchievementSection = {
  category: string;
  description?: string;
  items: Achievement[];
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const sections: AchievementSection[] = [
  {
    category: "Academic Performance",
    description: "Consistent results across all levels of formal education.",
    items: [
      {
        icon: "GraduationCap",
        title: "B.E. Computer Engineering",
        subtitle: "Indira College of Engineering and Management · SPPU, Pune",
        date: "2022 – 2026",
        detail: "Maintained a CGPA of 9.13 / 10 across all semesters of the four-year program.",
      },
      {
        icon: "GraduationCap",
        title: "Diploma in Information Technology",
        subtitle: "Pimpri Chinchwad Polytechnic · MSBTE, Pune",
        date: "2020 – 2023",
        detail: "Graduated with 85.13%, building a strong foundation in programming, networking, and software development.",
      },
      {
        icon: "GraduationCap",
        title: "S.S.C.",
        subtitle: "Sakharwadi Vidyalaya, Phaltan · Maharashtra State Board",
        date: "Jun 2020",
        detail: "Scored 85.20%. Active participant in the District-Level Marathi Elocution Competition and National Scout Cadet.",
      },
      {
        icon: "Award",
        title: "Japanese Language — JLPT N5",
        subtitle: "Japan Foundation",
        detail: "Completed foundational Japanese language studies, demonstrating initiative to learn beyond the technical domain.",
      },
    ],
  },
  {
    category: "Leadership & Responsibilities",
    description: "Roles that involved ownership, coordination, and initiative.",
    items: [
      {
        icon: "Users",
        title: "Placement Coordinator",
        subtitle: "Indira College of Engineering and Management, Pune",
        detail:
          "Coordinated campus recruitment — managed schedules, recruiter communication, documentation, and follow-ups between students and hiring teams.",
      },
      {
        icon: "Users",
        title: "NSS Coordinator",
        subtitle: "National Service Scheme",
        detail:
          "Led volunteer teams for community service and environmental initiatives under the National Service Scheme.",
      },
    ],
  },
  {
    category: "Activities & Participation",
    description: "Technical events, competitions, and college contributions.",
    items: [
      {
        icon: "Trophy",
        title: "Technical Competitions & Events",
        subtitle: "College & Inter-College Level",
        detail: "Represented the department in inter-college technical events and participated in coding competitions at both college and inter-college levels.",
        tags: ["Coding Competitions", "Inter-College Events", "Project Exhibitions"],
      },
      {
        icon: "Award",
        title: "College Contributions",
        subtitle: "Indira College of Engineering and Management, Pune",
        detail: "Actively involved across academic and extracurricular domains — from organising college fests to public speaking, entrepreneurship initiatives, and alumni interaction programs.",
        tags: ["College Fest Management", "Public Speaking", "Entrepreneurship Cell", "Technical Workshops", "Industrial Visits"],
      },
    ],
  },
];

// ─── ICON MAP ─────────────────────────────────────────────────────────────────

const iconMap = { Trophy, GraduationCap, Award, Users } as const;

// ─── ACCENT CONFIG ────────────────────────────────────────────────────────────

const accents = [
  {
    section: "border-emerald-500/20 bg-emerald-500/5",
    card: "hover:border-emerald-500/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.08)]",
    icon: "text-emerald-400 group-hover:border-emerald-500/40",
    heading: "text-emerald-400",
    tag: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300/80",
  },
  {
    section: "border-blue-500/20 bg-blue-500/5",
    card: "hover:border-blue-500/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)]",
    icon: "text-blue-400 group-hover:border-blue-500/40",
    heading: "text-blue-400",
    tag: "border-blue-500/20 bg-blue-500/5 text-blue-300/80",
  },
  {
    section: "border-violet-500/20 bg-violet-500/5",
    card: "hover:border-violet-500/30 hover:shadow-[0_0_24px_rgba(139,92,246,0.08)]",
    icon: "text-violet-400 group-hover:border-violet-500/40",
    heading: "text-violet-400",
    tag: "border-violet-500/20 bg-violet-500/5 text-violet-300/80",
  },
] as const;

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Achievements() {
  return (
    <div className="relative min-h-screen py-8 sm:py-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Page header */}
        <div className="max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Achievements
          </h1>
          <p className="mt-2 text-lg leading-8 text-white/50">
            Academic milestones, leadership roles, and notable contributions.
          </p>
        </div>

        {/* Sections */}
        <div className="mt-12 space-y-14">
          {sections.map((section, si) => {
            const accent = accents[si % accents.length];

            return (
              <div key={section.category}>

                {/* Section header */}
                <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${accent.section}`}>
                  <span className={`text-sm font-semibold tracking-wide ${accent.heading}`}>
                    {section.category}
                  </span>
                </div>
                {section.description ? (
                  <p className="-mt-3 mb-6 text-sm text-white/40">{section.description}</p>
                ) : null}

                {/* Cards */}
                <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <li
                        key={item.title}
                        className={`group relative flex flex-col rounded-2xl border border-white/5 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 ${accent.card}`}
                      >
                        {/* Hover shimmer */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                        <div className="relative z-10 flex items-start gap-4">
                          {/* Icon */}
                          <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-200 ${accent.icon}`}>
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                              <h3 className="text-sm font-bold leading-snug tracking-tight text-white">
                                {item.title}
                              </h3>
                              {item.date ? (
                                <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-white/50">
                                  {item.date}
                                </span>
                              ) : null}
                            </div>

                            {item.subtitle ? (
                              <p className="mt-1 text-xs font-medium text-white/40">
                                {item.subtitle}
                              </p>
                            ) : null}

                            {item.detail ? (
                              <p className="mt-2.5 text-xs leading-relaxed text-white/60">
                                {item.detail}
                              </p>
                            ) : null}

                            {/* Tags */}
                            {item.tags && item.tags.length > 0 ? (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`rounded-md border px-2 py-0.5 text-xs font-medium ${accent.tag}`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
