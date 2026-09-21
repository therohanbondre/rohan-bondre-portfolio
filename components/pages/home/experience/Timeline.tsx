"use client";

import { useState } from "react";
import { MapPin, Clock, Calendar } from "lucide-react";

import { type Experience } from "@/lib/objects";
import Card from "@/components/pages/home/experience/Card";

/* ── Date formatter: "2022-05" → "May 2022" ─────────────────────────────── */
function fullDate(ym: string): string {
  const [year, month] = ym.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

type Props = { experiences: Experience[] };

export default function Timeline({ experiences }: Props) {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  const companyName     = exp.company.split(",")[0].trim();
  const locationParts   = exp.company.split(",").slice(1).map((s) => s.trim()).filter(Boolean);
  const city            = locationParts[0] ?? "";
  const stateCountry    = locationParts.slice(1).join(", ");
  const location        = [city, stateCountry].filter(Boolean).join(", ");
  const startLabel      = fullDate(exp.start);
  const endLabel        = exp.end ? fullDate(exp.end) : "Present";

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          MOBILE — vertical stack
          ════════════════════════════════════════════════════════════════ */}
      <div className="mt-8 space-y-4 md:hidden">
        {experiences.map((e, i) => {
          const name  = e.company.split(",")[0].trim();
          const loc   = e.company.split(",").slice(1, 3).map((s) => s.trim()).join(", ");
          const isAct = active === i;
          return (
            <div key={e.id} className="space-y-4">
              {/* Summary selector */}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isAct}
                className={`w-full rounded-2xl border p-4 text-left transition-[border-color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                  isAct
                    ? "border-[var(--accent-border)] bg-[var(--accent-soft)] shadow-[0_0_20px_var(--card-glow)]"
                    : "border-white/5 bg-neutral-900/40 backdrop-blur-xl hover:border-[var(--accent-border)] hover:bg-white/5"
                }`}
              >
                <p className={`text-base font-bold ${isAct ? "text-[var(--primary)]" : "text-white/90"}`}>
                  {name}
                </p>
                <p className="mt-0.5 text-sm text-white/60">{e.positions[0]?.role}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden="true" />{loc}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />{e.tenure}
                  </span>
                </div>
              </button>

              {/* Detail card — only for active */}
              {isAct && <Card experience={e} compact={true} />}
            </div>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP / TABLET — two-column layout
          ════════════════════════════════════════════════════════════════ */}
      <div className="mt-8 hidden gap-6 md:grid md:grid-cols-12">

        {/* ── LEFT: compact summary cards ──────────────────────────── */}
        <div
          role="tablist"
          aria-label="Work experience"
          className="col-span-4 space-y-3"
        >
          {experiences.map((e, i) => {
            const name  = e.company.split(",")[0].trim();
            const loc   = e.company.split(",").slice(1, 3).map((s) => s.trim()).join(", ");
            const isAct = active === i;

            return (
              <button
                key={e.id}
                role="tab"
                type="button"
                aria-selected={isAct}
                aria-controls={`tabpanel-exp-${e.id}`}
                id={`tab-exp-${e.id}`}
                tabIndex={isAct ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(ev) => {
                  if (ev.key === "ArrowDown" || ev.key === "ArrowRight") {
                    ev.preventDefault();
                    setActive((p) => (p + 1) % experiences.length);
                  }
                  if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") {
                    ev.preventDefault();
                    setActive((p) => (p - 1 + experiences.length) % experiences.length);
                  }
                }}
                className={`
                  group relative w-full overflow-hidden rounded-2xl border p-4 text-left
                  transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
                  ${isAct
                    ? "scale-[1.02] border-[var(--accent-border)] bg-[var(--accent-soft)] shadow-[0_0_24px_var(--card-glow)]"
                    : "border-white/5 bg-neutral-900/40 backdrop-blur-xl hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:bg-white/5 hover:shadow-[0_0_16px_var(--card-glow)]"
                  }
                `}
              >
                {/* Hover shimmer */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Active indicator dot */}
                  {isAct && (
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 h-2 w-2 rounded-full"
                      style={{ background: "var(--primary)", boxShadow: "0 0 6px var(--accent-glow)" }}
                    />
                  )}

                  <p className={`pr-5 text-base font-bold leading-snug transition-colors duration-200 ${isAct ? "text-[var(--primary)]" : "text-white/90 group-hover:text-[var(--primary)]"}`}>
                    {name}
                  </p>

                  <p className="mt-1 text-sm font-medium text-white/65">
                    {e.positions[0]?.role}
                  </p>

                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span>{loc}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span>{e.tenure}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--primary)", opacity: 0.70 }}>
                      <Calendar className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span>
                        {fullDate(e.start)}&nbsp;–&nbsp;{e.end ? fullDate(e.end) : "Present"}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── RIGHT: full detail card ───────────────────────────────── */}
        <div
          role="tabpanel"
          id={`tabpanel-exp-${exp.id}`}
          aria-labelledby={`tab-exp-${exp.id}`}
          className="col-span-8"
          key={exp.id}
        >
          {/* Company header */}
          <div className="mb-4 rounded-2xl border border-white/5 bg-neutral-900/40 p-5 backdrop-blur-xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">{companyName}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-white/50">
                  {location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />{location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />{exp.tenure}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
                  {startLabel}&nbsp;–&nbsp;{endLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Detail card */}
          <Card experience={exp} />
        </div>
      </div>
    </>
  );
}
