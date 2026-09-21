"use client";

import { useEffect, useRef } from "react";

/**
 * CursorOrbital
 * ──────────────────────────────────────────────────────────────────────────
 * Futuristic mouse-following overlay:
 *   • Soft ambient radial glow   (fast lerp)
 *   • 3 elliptical orbital rings  (CSS-spun, centred on trailing position)
 *   • 2 trailing particles        (two different lerp speeds)
 *
 * All colours from CSS vars --cursor-primary / --cursor-secondary.
 * Intentionally subtle so it complements the dense particle background
 * rather than competing with it.
 *
 * Disabled on touch-only devices and when prefers-reduced-motion is set.
 */
export default function CursorOrbital() {
  const glowRef  = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const dot1Ref  = useRef<HTMLDivElement>(null);
  const dot2Ref  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const refs = [glowRef, ring1Ref, ring2Ref, ring3Ref, dot1Ref, dot2Ref];
    if (refs.some((r) => !r.current)) return;
    const [glow, ring1, ring2, ring3, dot1, dot2] = refs.map((r) => r.current!);

    let mx = -400, my = -400;
    let gX = -400, gY = -400;           // glow  — fast
    let rX = -400, rY = -400;           // rings — medium
    let d1X = -400, d1Y = -400;         // dot1  — fast
    let d2X = -400, d2Y = -400;         // dot2  — slow
    let rafId = 0;
    let visible = false;

    const all = [glow, ring1, ring2, ring3, dot1, dot2];
    function show() { all.forEach((el) => { el.style.opacity = "1"; }); }
    function hide() { all.forEach((el) => { el.style.opacity = "0"; }); }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

    function onMove(e: MouseEvent) {
      mx = e.clientX; my = e.clientY;
      if (!visible) {
        gX = mx; gY = my; rX = mx; rY = my; d1X = mx; d1Y = my; d2X = mx; d2Y = my;
        visible = true;
        show();
      }
    }
    function onLeave() { visible = false; hide(); }

    function tick() {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;

      gX  = lerp(gX,  mx, 0.22);   gY  = lerp(gY,  my, 0.22);
      rX  = lerp(rX,  mx, 0.12);   rY  = lerp(rY,  my, 0.12);
      d1X = lerp(d1X, mx, 0.24);   d1Y = lerp(d1Y, my, 0.24);
      d2X = lerp(d2X, mx, 0.07);   d2Y = lerp(d2Y, my, 0.07);

      glow.style.transform  = `translate(${gX}px, ${gY}px)`;
      ring1.style.transform = `translate(${rX}px, ${rY}px)`;
      ring2.style.transform = `translate(${rX}px, ${rY}px)`;
      ring3.style.transform = `translate(${rX}px, ${rY}px)`;
      dot1.style.transform  = `translate(${d1X}px, ${d1Y}px)`;
      dot2.style.transform  = `translate(${d2X}px, ${d2Y}px)`;
    }

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const base: React.CSSProperties = {
    position:      "fixed",
    top:           0,
    left:          0,
    pointerEvents: "none",
    opacity:       0,
    willChange:    "transform",
    transition:    "opacity 350ms ease",
    transform:     "translate(-400px, -400px)",
  };

  return (
    <>
      {/* Ambient glow — kept subtle to avoid fighting the particle field */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          ...base,
          width:        "200px",
          height:       "200px",
          marginTop:    "-100px",
          marginLeft:   "-100px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, var(--cursor-primary) 0%, transparent 70%)",
          zIndex:       9985,
          mixBlendMode: "screen",
          filter:       "blur(28px)",
          // Opacity will be set to 0.4 when JS shows it (not 1)
        }}
      />

      {/* Ring 1 — tight ellipse, primary, fast spin */}
      <div
        ref={ring1Ref}
        aria-hidden="true"
        style={{
          ...base,
          width:        "24px",
          height:       "15px",
          marginTop:    "-7.5px",
          marginLeft:   "-12px",
          borderRadius: "50%",
          border:       "1px solid var(--cursor-primary)",
          zIndex:       9990,
          mixBlendMode: "screen",
          filter:       "blur(0.3px)",
          animation:    "spin-ring 2.2s linear infinite",
          boxShadow:    "0 0 4px 1px var(--cursor-primary)",
        }}
      />

      {/* Ring 2 — medium ellipse, secondary, reverse spin */}
      <div
        ref={ring2Ref}
        aria-hidden="true"
        style={{
          ...base,
          width:        "40px",
          height:       "25px",
          marginTop:    "-12.5px",
          marginLeft:   "-20px",
          borderRadius: "50%",
          border:       "0.8px solid var(--cursor-secondary)",
          zIndex:       9989,
          mixBlendMode: "screen",
          filter:       "blur(0.5px)",
          animation:    "spin-ring 3.4s linear infinite reverse",
          boxShadow:    "0 0 3px 0px var(--cursor-secondary)",
        }}
      />

      {/* Ring 3 — outer ellipse, primary faint, slow spin */}
      <div
        ref={ring3Ref}
        aria-hidden="true"
        style={{
          ...base,
          width:        "58px",
          height:       "36px",
          marginTop:    "-18px",
          marginLeft:   "-29px",
          borderRadius: "50%",
          border:       "0.5px solid var(--cursor-primary)",
          zIndex:       9988,
          mixBlendMode: "screen",
          filter:       "blur(0.8px)",
          animation:    "spin-ring 5.5s linear infinite",
        }}
      />

      {/* Dot 1 — primary, slightly faster than rings */}
      <div
        ref={dot1Ref}
        aria-hidden="true"
        style={{
          ...base,
          width:           "6px",
          height:          "6px",
          marginTop:       "-3px",
          marginLeft:      "-3px",
          borderRadius:    "50%",
          backgroundColor: "var(--cursor-primary)",
          zIndex:          9999,
          mixBlendMode:    "screen",
          filter:          "blur(0.4px)",
          boxShadow:       "0 0 6px 1px var(--cursor-primary)",
        }}
      />

      {/* Dot 2 — secondary, slow trail */}
      <div
        ref={dot2Ref}
        aria-hidden="true"
        style={{
          ...base,
          width:           "3.5px",
          height:          "3.5px",
          marginTop:       "-1.75px",
          marginLeft:      "-1.75px",
          borderRadius:    "50%",
          backgroundColor: "var(--cursor-secondary)",
          zIndex:          9998,
          mixBlendMode:    "screen",
          filter:          "blur(0.2px)",
          boxShadow:       "0 0 4px 1px var(--cursor-secondary)",
        }}
      />
    </>
  );
}
