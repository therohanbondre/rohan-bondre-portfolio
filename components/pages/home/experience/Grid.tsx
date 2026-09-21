import { GetExperiences } from "@/data/experiences";

import Timeline from "@/components/pages/home/experience/Timeline";
import { Suspense } from "react";

function TimelineSkeleton() {
  return (
    <div
      aria-label="Loading work experience"
      aria-live="polite"
      className="mt-8 space-y-4 md:grid md:grid-cols-12 md:gap-8 md:space-y-0"
    >
      {/* Sidebar skeleton */}
      <div className="md:col-span-4 space-y-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border border-white/5 bg-neutral-900/40"
          />
        ))}
      </div>
      {/* Card skeleton */}
      <div className="md:col-span-8">
        <div className="h-64 animate-pulse rounded-2xl border border-white/5 bg-neutral-900/40" />
      </div>
    </div>
  );
}

export default async function Grid() {
  const { experiences } = await GetExperiences();

  return (
    <div className="py-8 sm:py-16" id="experience">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Work Experience
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Here&apos;s my professional journey so far.
          </p>
        </div>
        <Suspense fallback={<TimelineSkeleton />}>
          <Timeline experiences={experiences} />
        </Suspense>
      </div>
    </div>
  );
}
