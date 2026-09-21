import { NextResponse } from "next/server";

// Static fallback quotes shown on the 404 page.
// The original backend (MANAGER_BACKEND_URL) has been removed —
// data is now fully static, so we serve one of these directly.
const QUOTES: [string, string][] = [
  ["404 — Page Not Found", "The page you're looking for doesn't exist."],
  ["Lost in the void.", "Even the best engineers take a wrong turn sometimes."],
  ["Nothing to see here.", "Let's get you back on track."],
];

export async function GET() {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  return NextResponse.json({ quote });
}
