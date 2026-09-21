"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type WarpLevel  = "subtle" | "balanced" | "intense";
type AnimMode   = "magnetic" | "liquid" | "particle";

// ─── Warp config ──────────────────────────────────────────────────────────────

const WARP: Record<WarpLevel, { radius: number; push: number; sizeBoost: number }> = {
  subtle:   { radius: 160, push: 18,  sizeBoost: 1.5 },
  balanced: { radius: 220, push: 30,  sizeBoost: 2.2 },
  intense:  { radius: 280, push: 50,  sizeBoost: 3.0 },
};

// ─── Trail entry ──────────────────────────────────────────────────────────────

interface TrailPoint { x: number; y: number; age: number }

// ─── Component ────────────────────────────────────────────────────────────────

export default function InteractiveBackground() {
  // UI state — these drive the settings panel
  const [open,    setOpen]    = useState(false);
  const [warp,    setWarp]    = useState<WarpLevel>("balanced");
  const [density, setDensity] = useState(60);
  const [mode,    setMode]    = useState<AnimMode>("particle");

  // Refs that the canvas loop reads without React re-renders
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const mouseRef    = useRef({ x: -9999, y: -9999, active: false });
  const rafRef      = useRef(0);
  const warpRef     = useRef<WarpLevel>("balanced");
  const densityRef  = useRef(60);
  const modeRef     = useRef<AnimMode>("particle");
  const trailRef    = useRef<TrailPoint[]>([]);

  // Keep refs in sync on state changes
  useEffect(() => { warpRef.current    = warp;    }, [warp]);
  useEffect(() => { densityRef.current = density; }, [density]);
  useEffect(() => { modeRef.current    = mode;    }, [mode]);

  // ── Canvas engine ────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced    = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasMouse   = window.matchMedia("(pointer: fine)").matches;
    const isMobile   = !hasMouse;

    // ── Device pixel ratio — cap at 2 for performance ──────────────────
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Resize ──────────────────────────────────────────────────────────
    function resize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Mouse tracking ───────────────────────────────────────────────────
    function onMove(e: MouseEvent) {
      const prev = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      // Add trail point on significant movement
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      if (!reduced && (dx * dx + dy * dy) > 16) {
        trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
        if (trailRef.current.length > 18) trailRef.current.shift();
      }
    }
    function onLeave() {
      mouseRef.current.active = false;
      trailRef.current = [];
    }
    if (!isMobile && !reduced) {
      document.addEventListener("mousemove",  onMove,  { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }

    // ── CSS var reader ───────────────────────────────────────────────────
    const cssCache: Record<string, string> = {};
    let cacheFrame = 0;
    function cssVar(name: string): string {
      if (cssCache[name] && cacheFrame < 60) return cssCache[name];
      const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      cssCache[name] = val || "rgba(34,211,238,0.25)";
      if (Object.keys(cssCache).length === 2) cacheFrame = 0; // reset after reading both vars
      return cssCache[name];
    }

    // ── Draw frame ───────────────────────────────────────────────────────
    function draw() {
      if (!canvas || !ctx) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      const d   = densityRef.current;
      const cfg = WARP[warpRef.current];
      const mx  = mouseRef.current.x;
      const my  = mouseRef.current.y;
      const act = mouseRef.current.active && !reduced && !isMobile;

      // Spacing: density 20 → spacing ~72px, density 100 → spacing ~18px
      // Formula: spacing = 100 - (d - 20) * 0.65
      const spacing = Math.max(18, Math.round(100 - (d - 20) * 0.65));
      const cols = Math.ceil(W / spacing) + 1;
      const rows = Math.ceil(H / spacing) + 1;

      const colBase = cssVar("--canvas-dot");
      const colNear = cssVar("--canvas-dot-near");

      // Parse colours once per frame for trail
      const primaryRaw = getComputedStyle(document.documentElement)
        .getPropertyValue("--cursor-primary").trim() || "#22d3ee";

      // ── Trail rendering ──────────────────────────────────────────────
      if (!reduced && !isMobile && trailRef.current.length > 0) {
        const trail = trailRef.current;
        for (let t = 0; t < trail.length; t++) {
          trail[t].age++;
          const maxAge = 22;
          if (trail[t].age > maxAge) continue;
          const progress = trail[t].age / maxAge;
          const alpha    = (1 - progress) * 0.45;
          const r        = (1 - progress) * 3 + 0.5;
          ctx.beginPath();
          ctx.arc(trail[t].x, trail[t].y, r, 0, Math.PI * 2);
          ctx.fillStyle = primaryRaw;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        // Prune old trail points
        trailRef.current = trail.filter((p) => p.age <= 22);
      }

      // ── Dot grid ────────────────────────────────────────────────────
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;

          let ox = 0;
          let oy = 0;
          let bright = 0; // 0 = normal, 0–1 = how near

          if (act) {
            const dxm = bx - mx;
            const dym = by - my;
            const dist = Math.sqrt(dxm * dxm + dym * dym);

            if (dist < cfg.radius && dist > 0.5) {
              // Smooth falloff — quadratic ease so inner zone reacts strongly
              const t     = 1 - dist / cfg.radius;
              const force = t * t * cfg.push;
              ox      = -(dxm / dist) * force;
              oy      = -(dym / dist) * force;
              bright  = t;  // 0 at edge, 1 at center
            }
          }

          const nx = bx + ox;
          const ny = by + oy;

          // Radius: base 1.2px, up to sizeBoost * base near cursor
          const dotR = reduced ? 1.0 : 1.2 + bright * cfg.sizeBoost;

          ctx.beginPath();
          ctx.arc(nx, ny, dotR, 0, Math.PI * 2);

          if (bright > 0.05) {
            ctx.fillStyle = colNear;
            ctx.globalAlpha = 0.35 + bright * 0.65;
          } else {
            ctx.fillStyle = colBase;
            ctx.globalAlpha = 1;
          }
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      cacheFrame++;
    }

    // ── RAF loop ─────────────────────────────────────────────────────────
    function loop() {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",    resize);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Settings panel UI ─────────────────────────────────────────────────────

  const warpLevels: WarpLevel[] = ["subtle", "balanced", "intense"];
  const animModes: AnimMode[]   = ["magnetic", "liquid", "particle"];

  const btnStyle = (active: boolean): React.CSSProperties => ({
    flex:          1,
    padding:       "0.28rem 0",
    borderRadius:  "0.45rem",
    border:        active ? "1px solid var(--accent-border)" : "1px solid var(--border-subtle)",
    background:    active ? "var(--accent-soft)" : "transparent",
    color:         active ? "var(--primary)" : "var(--text-muted)",
    fontSize:      "10px",
    fontWeight:    600,
    cursor:        "pointer",
    textTransform: "capitalize" as const,
    transition:    "all 180ms ease",
    letterSpacing: "0.03em",
  });

  const labelStyle: React.CSSProperties = {
    fontSize:      "10px",
    fontWeight:    600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color:         "var(--text-muted)",
    marginBottom:  "0.45rem",
    display:       "block",
  };

  return (
    <>
      {/* ── Canvas ─────────────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        0,
          pointerEvents: "none",
          display:       "block",
        }}
      />

      {/* ── Settings widget ────────────────────────────────────────────── */}
      <div
        style={{
          position:      "fixed",
          bottom:        "1.25rem",
          right:         "1.25rem",
          zIndex:        200,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "flex-end",
          gap:           "0.4rem",
        }}
      >
        {/* Panel */}
        {open && (
          <div
            role="dialog"
            aria-label="Background animation settings"
            style={{
              background:     "var(--bg-surface)",
              border:         "1px solid var(--border-medium)",
              borderRadius:   "0.875rem",
              padding:        "0.9rem 1.1rem",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow:      "0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
              minWidth:       "228px",
              animation:      "fade-in-up 0.18s ease-out both",
            }}
          >
            {/* Animation mode */}
            <span style={labelStyle}>Animation Mode</span>
            <div style={{ display: "flex", gap: "0.3rem", marginBottom: "0.9rem" }}>
              {animModes.map((m) => (
                <button key={m} type="button" onClick={() => setMode(m)}
                  aria-pressed={mode === m} style={btnStyle(mode === m)}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            {/* Theme circles */}
            <span style={labelStyle}>Theme</span>
            <div style={{ display: "flex", gap: "0", marginBottom: "0.9rem" }}>
              {/* Import ThemeSelector inline so panel circles stay small */}
              <ThemeCircles />
            </div>

            {/* Warp intensity */}
            <span style={labelStyle}>Warp Intensity</span>
            <div style={{ display: "flex", gap: "0.3rem", marginBottom: "0.9rem" }}>
              {warpLevels.map((lvl) => (
                <button key={lvl} type="button" onClick={() => setWarp(lvl)}
                  aria-pressed={warp === lvl} style={btnStyle(warp === lvl)}>
                  {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                </button>
              ))}
            </div>

            {/* Element density */}
            <span style={{ ...labelStyle, marginBottom: "0.3rem" }}>
              Element Density — <span style={{ color: "var(--primary)" }}>{density}</span>
            </span>
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              aria-label="Background dot density"
              style={{
                width:       "100%",
                accentColor: "var(--primary)",
                cursor:      "pointer",
                height:      "3px",
              }}
            />
          </div>
        )}

        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close settings" : "Open background settings"}
          aria-expanded={open}
          title="Background settings"
          style={{
            width:          "36px",
            height:         "36px",
            borderRadius:   "50%",
            border:         `1px solid ${open ? "var(--accent-border)" : "var(--border-subtle)"}`,
            background:     open ? "var(--accent-soft)" : "var(--bg-elevated)",
            color:          open ? "var(--primary)" : "var(--text-muted)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "pointer",
            backdropFilter: "blur(12px)",
            boxShadow:      open
              ? `0 0 10px var(--btn-glow), 0 2px 8px rgba(0,0,0,0.35)`
              : "0 2px 8px rgba(0,0,0,0.30)",
            transition:     "all 180ms ease",
            fontSize:       "15px",
          }}
        >
          ⊹
        </button>
      </div>
    </>
  );
}

// ── Inline mini theme circles for the settings panel ──────────────────────────
// Separate tiny component so it reads from THEMES without prop-drilling.

import { THEMES, type ThemeId, getStoredTheme, applyTheme } from "@/lib/themes";

function ThemeCircles() {
  const [current, setCurrent] = useState<ThemeId>("obsidian");

  useEffect(() => {
    setCurrent(getStoredTheme());
    // Re-read when html data-theme changes (external selection via Navbar)
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") as ThemeId | null;
      if (t) setCurrent(t);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  function select(id: ThemeId) {
    setCurrent(id);
    applyTheme(id);
  }

  return (
    <div role="radiogroup" aria-label="Select theme" style={{ display: "flex", gap: "0" }}>
      {THEMES.map((theme) => {
        const isActive = theme.id === current;
        const [from, to] = theme.gradient;
        return (
          <div key={theme.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <button
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`${theme.name} theme`}
              onClick={() => select(theme.id)}
              style={{
                width: 44, height: 44,
                background: "transparent", border: "none", padding: 0, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}
            >
              {isActive && (
                <span style={{
                  position: "absolute", inset: "10px", borderRadius: "50%",
                  border: `1.5px solid ${from}`,
                  boxShadow: `0 0 5px 1px ${from}55`,
                  pointerEvents: "none",
                }} />
              )}
              <span style={{
                display: "block",
                width:  isActive ? 15 : 13,
                height: isActive ? 15 : 13,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
                boxShadow: isActive ? `0 0 7px 2px ${from}66` : `0 0 3px 1px ${from}33`,
                opacity:  isActive ? 1 : 0.55,
                transition: "all 200ms ease",
              }} />
            </button>
            <span style={{
              fontSize: "9px", fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: isActive ? from : "var(--text-faint)",
              userSelect: "none", lineHeight: 1, marginTop: -3,
            }}>
              {theme.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
