"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("portfolio-theme");
  if (stored === "light" || stored === "dark") return stored;
  // Fall back to OS preference
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  if (theme === "light") {
    html.classList.add("light");
  } else {
    html.classList.remove("light");
  }
  localStorage.setItem("portfolio-theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Read stored/OS preference once mounted (avoids SSR mismatch)
  useEffect(() => {
    const initial = getStoredTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);

    // Enable smooth transitions only after first mount (prevents flash)
    const id = requestAnimationFrame(() => {
      document.documentElement.classList.add("theme-ready");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  // Render a static placeholder before hydration so there's no layout shift
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-9 w-9 rounded-lg border border-white/10 bg-white/5"
      />
    );
  }

  return (
    <div className="group/toggle relative">
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        className="
          relative flex h-9 w-9 items-center justify-center rounded-lg
          border border-[var(--toggle-border)] bg-[var(--toggle-bg)]
          text-[var(--toggle-icon)]
          transition-[background-color,border-color,color,transform] duration-200
          hover:border-[var(--toggle-hover-border)]
          hover:bg-[var(--toggle-hover-bg)]
          hover:text-[var(--toggle-hover-icon)]
          hover:scale-110
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60
          active:scale-95
        "
      >
        {/* Sun icon — shown in dark mode (click → go light) */}
        <Sun
          aria-hidden="true"
          className={`
            absolute h-[18px] w-[18px]
            transition-[opacity,transform] duration-300 ease-in-out
            ${isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"}
          `}
        />

        {/* Moon icon — shown in light mode (click → go dark) */}
        <Moon
          aria-hidden="true"
          className={`
            absolute h-[18px] w-[18px]
            transition-[opacity,transform] duration-300 ease-in-out
            ${isDark
              ? "rotate-90 scale-50 opacity-0"
              : "rotate-0 scale-100 opacity-100"}
          `}
        />
      </button>

      {/* Tooltip */}
      <span
        role="tooltip"
        className="
          pointer-events-none absolute -bottom-9 left-1/2 z-50
          w-max -translate-x-1/2
          rounded-md px-2 py-1 text-xs font-semibold
          bg-[var(--tooltip-bg)] text-[var(--tooltip-text)]
          ring-1 ring-[var(--tooltip-ring)]
          shadow-lg backdrop-blur-md
          opacity-0 transition-opacity duration-150
          group-hover/toggle:opacity-100
          group-focus-within/toggle:opacity-100
        "
      >
        {label}
      </span>
    </div>
  );
}
