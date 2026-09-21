// ─── Theme definitions ────────────────────────────────────────────────────────

export type ThemeId = "obsidian" | "forest" | "cyber";

export type ThemeDef = {
  id: ThemeId;
  name: string;
  colorScheme: "dark";
  /** Gradient stops for the circular picker button [from, to] */
  gradient: [string, string];
  /** Glow color for the selected ring */
  ring: string;
};

export const THEMES: ThemeDef[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    colorScheme: "dark",
    gradient: ["#22D3EE", "#14B8A6"],
    ring: "#22D3EE",
  },
  {
    id: "forest",
    name: "Forest",
    colorScheme: "dark",
    gradient: ["#34D399", "#14B8A6"],
    ring: "#34D399",
  },
  {
    id: "cyber",
    name: "Cyber",
    colorScheme: "dark",
    gradient: ["#A78BFA", "#D946EF"],
    ring: "#A78BFA",
  },
];

export const DEFAULT_THEME: ThemeId = "obsidian";
const STORAGE_KEY = "portfolio-theme";

/** Legacy / removed theme IDs → migrate to obsidian */
const LEGACY_IDS = ["pearl", "light", "midnight"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LEGACY_IDS.includes(stored)) {
      localStorage.setItem(STORAGE_KEY, DEFAULT_THEME);
      return DEFAULT_THEME;
    }
    if (stored && THEMES.some((t) => t.id === stored)) return stored as ThemeId;
  } catch { /* blocked */ }
  return DEFAULT_THEME;
}

export function applyTheme(id: ThemeId) {
  const html = document.documentElement;
  html.setAttribute("data-theme", id);
  html.style.colorScheme = "dark";
  try { localStorage.setItem(STORAGE_KEY, id); } catch { /* blocked */ }
}

/** Inline script — restores theme before first paint, migrates legacy ids. */
export const THEME_INIT_SCRIPT = `(function(){
  var V=['obsidian','forest','cyber'];
  var L=['pearl','light','midnight'];
  var D='obsidian';
  try{
    var s=localStorage.getItem('portfolio-theme');
    if(s&&L.indexOf(s)>-1){localStorage.setItem('portfolio-theme',D);s=D;}
    var id=(s&&V.indexOf(s)>-1)?s:D;
    document.documentElement.setAttribute('data-theme',id);
    document.documentElement.style.colorScheme='dark';
  }catch(e){
    document.documentElement.setAttribute('data-theme',D);
    document.documentElement.style.colorScheme='dark';
  }
})();`;
