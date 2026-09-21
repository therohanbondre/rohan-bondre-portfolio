import { GraduationCap, ExternalLink } from "lucide-react";
import Link from "next/link";

type SubjectGroup = {
  label: string;
  items: string[];
};

type EducationEntry = {
  degree: string;
  field?: string;
  institution: string;
  institutionUrl: string;
  university?: string;
  board?: string;
  duration: string;
  result: string;
  resultLabel: string;
  description: string;
  subjects: SubjectGroup[];
  activities?: string[];
};

const educationData: EducationEntry[] = [
  {
    degree: "Bachelor of Engineering",
    field: "Computer Engineering",
    institution: "Indira College of Engineering and Management, Pune",
    institutionUrl: "https://indiraicem.ac.in/",
    university: "Savitribai Phule Pune University (SPPU)",
    duration: "2022 – 2026",
    result: "9.13 / 10",
    resultLabel: "CGPA",
    description:
      "Semester-based program combining theory, lab practicals, electives, and projects. Strengthened my understanding of software development, algorithms, system design, and computing fundamentals while building discipline, teamwork, and problem-solving skills.",
    subjects: [
      {
        label: "Key Subjects",
        items: [
          "Data Structures & Algorithms",
          "Software Engineering",
          "DBMS",
          "Operating Systems",
          "Computer Networks",
          "Software Testing",
          "OOP",
          "Data Science",
        ],
      },
    ],
    activities: [
      "Placement Coordinator",
      "Entrepreneurship Cell",
      "Technical Club",
      "Public Speaking",
      "Quiz Competitions",
      "College Fest Management",
      "Social Service (NSS)",
    ],
  },
  {
    degree: "Diploma",
    field: "Information Technology",
    institution: "Pimpri Chinchwad Polytechnic, Pune",
    institutionUrl: "https://www.pcpolytechnic.com/",
    board: "Maharashtra State Board of Technical Education (MSBTE)",
    duration: "2020 – 2023",
    result: "85.13%",
    resultLabel: "Percentage",
    description:
      "Built a strong foundation in programming, networking, database systems, and software development through theory, lab practicals, mini projects, and team assignments. Developed problem-solving, communication, and collaborative skills through competitions and technical events.",
    subjects: [
      {
        label: "Key Subjects",
        items: [
          "Data Structures & Algorithms",
          "OOP",
          "DBMS",
          "Software Engineering",
          "Web Technology",
          "Computer Networks",
          "Operating Systems",
        ],
      },
    ],
    activities: [
      "Coding Competitions",
      "Inter-College Technical Events",
      "Project Exhibitions",
      "Technical Workshops",
      "Industrial Visits",
      "Seminar Presentations",
    ],
  },
  {
    degree: "S.S.C.",
    institution: "Sakharwadi Vidyalaya, Sakharwadi, Phaltan",
    institutionUrl: "https://www.mahahsscboard.in/",
    board: "Maharashtra State Board of Secondary and Higher Secondary Education",
    duration: "Jun 2020",
    result: "85.20%",
    resultLabel: "Percentage",
    description:
      "Laid the foundation for academic and personal growth. Participated in the District-Level Marathi Elocution Competition, served as a National Scout Cadet, and developed interests in Marathi, Sanskrit, History, and Geography alongside core academics.",
    subjects: [],
    activities: [
      "District-Level Marathi Elocution",
      "National Scout Cadet",
      "Cultural Programs",
      "Marathi & Sanskrit Studies",
    ],
  },
];

export default function Education() {
  return (
    <div className="py-8 sm:py-16" id="education">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Education
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            My academic background and qualifications.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {educationData.map((entry) => (
            <div
              key={entry.institution}
              className="group relative flex flex-col rounded-2xl border border-white/5 bg-neutral-900/40 p-6 shadow-lg backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start gap-4">
                {/* Icon */}
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-200 group-hover:border-emerald-500/40">
                  <GraduationCap className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                </div>

                {/* Header */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      {/* Degree */}
                      <h3 className="text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-400">
                        {entry.degree}{" "}
                        {entry.field ? (
                          <span className="text-white/80">in {entry.field}</span>
                        ) : null}
                      </h3>

                      {/* Institution with link */}
                      <Link
                        href={entry.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 inline-flex items-center gap-1 text-sm text-emerald-400/80 transition-colors duration-200 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        {entry.institution}
                        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                      </Link>

                      {/* University / Board */}
                      {entry.university ? (
                        <p className="text-xs text-white/40">{entry.university}</p>
                      ) : null}
                      {entry.board ? (
                        <p className="text-xs text-white/40">{entry.board}</p>
                      ) : null}
                    </div>

                    {/* Result badge */}
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold text-emerald-400">
                        {entry.result}
                      </p>
                      <p className="text-xs text-white/40">{entry.resultLabel}</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="mt-3 border-t border-white/10 pt-3">
                    <span className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70">
                      {entry.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="relative z-10 mt-5 border-t border-white/5 pt-5">
                <p className="text-sm leading-relaxed text-white/60">
                  {entry.description}
                </p>
              </div>

              {/* Key Subjects */}
              {entry.subjects.map((group) => (
                <div key={group.label} className="relative z-10 mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-block rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-white/70 transition-colors duration-200 hover:border-emerald-500/30 hover:text-white/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Activities (Diploma only) */}
              {entry.activities && entry.activities.length > 0 ? (
                <div className="relative z-10 mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
                    Activities &amp; Societies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.activities.map((activity) => (
                      <span
                        key={activity}
                        className="inline-block rounded-md border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 text-xs font-medium text-white/60 transition-colors duration-200 hover:border-blue-500/40 hover:text-white/80"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
