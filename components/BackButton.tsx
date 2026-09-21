"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back to previous page"
      className="inline-flex w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-900 px-6 py-3 text-sm font-bold whitespace-nowrap text-white shadow-lg transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none active:scale-[0.97]"
    >
      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
      Go Back
    </button>
  );
}
