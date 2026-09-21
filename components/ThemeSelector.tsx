"use client";

import { useEffect, useState } from "react";
import { THEMES, type ThemeId, getStoredTheme, applyTheme } from "@/lib/themes";

export default function ThemeSelector() {
  const [current, setCurrent] = useState<ThemeId>("obsidian");
  const [mounted,  setMounted] = useState(false);

  useEffect(() => {
    const id = getStoredTheme();
    setCurrent(id);
    applyTheme(id);
    setMounted(true);
    const raf = requestAnimationFrame(() => {
      document.documentElement.classList.add("theme-ready");
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  function select(id: ThemeId) {
    setCurrent(id);
    applyTheme(id);
  }

  // SSR placeholder — matches final layout dimensions to prevent shift
  if (!mounted) {
    return (
      <div aria-hidden="true" className="flex items-center gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 44, height: 44 }} />
        ))}
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Select colour theme"
      className="flex items-center gap-0.5"
    >
      {THEMES.map((theme) => {
        const isActive = theme.id === current;
        const [from, to] = theme.gradient;

        return (
          <div key={theme.id} className="flex flex-col items-center gap-1">
            {/*
              Outer button = 44px touch target (transparent).
              Inner visual circle = 14px (desktop) — centered inside.
            */}
            <button
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`${theme.name} theme`}
              onClick={() => select(theme.id)}
              className="group relative flex items-center justify-center rounded-full
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              style={{
                width:  44,
                height: 44,
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                "--tw-ring-color":        from,
                "--tw-ring-offset-color": "var(--bg-page)",
              } as React.CSSProperties}
            >
              {/* Active outer ring — static, no spin */}
              {isActive && (
                <span
                  aria-hidden="true"
                  style={{
                    position:  "absolute",
                    inset:     "10px",         // ring sits just outside the 14px circle
                    borderRadius: "50%",
                    border:    `1.5px solid ${from}`,
                    boxShadow: `0 0 6px 1px ${from}55`,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Visual circle — 14px */}
              <span
                aria-hidden="true"
                style={{
                  display:      "block",
                  width:        isActive ? 15 : 13,
                  height:       isActive ? 15 : 13,
                  borderRadius: "50%",
                  background:   `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
                  boxShadow:    isActive
                    ? `0 0 8px 2px ${from}66`
                    : `0 0 4px 1px ${from}33`,
                  opacity:      isActive ? 1 : 0.55,
                  transition:   "width 200ms ease, height 200ms ease, opacity 200ms ease, box-shadow 200ms ease",
                  // Hover is handled by the parent button via CSS group-hover
                }}
                className="group-hover:!opacity-80 group-hover:!shadow-md"
              />
            </button>

            {/* Label — very small, faint unless active */}
            <span
              style={{
                fontSize:      "9px",
                fontWeight:    600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color:         isActive ? from : "var(--text-faint)",
                transition:    "color 200ms ease",
                userSelect:    "none",
                lineHeight:    1,
                marginTop:     "-4px",
              }}
            >
              {theme.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
