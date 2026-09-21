import { z } from "zod";

// ─── REQUIRED for contact form email delivery ─────────────────────────────────
// MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_FROM, MAIL_TO
//
// ─── REQUIRED for Cloudflare Turnstile captcha ────────────────────────────────
// NEXT_PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY
//
// ─── OPTIONAL analytics (app still starts without them) ──────────────────────
// CLARITY_KEY, G_TAG
//
// ─── REMOVED (no longer used — data is now static) ───────────────────────────
// MANAGER_BACKEND_URL, API_KEY
// ─────────────────────────────────────────────────────────────────────────────

const envSchema = z.object({
  // Email — required for contact form
  MAIL_HOST: z.string().min(1, "MAIL_HOST is required"),
  MAIL_USER: z.string().min(1, "MAIL_USER is required"),
  MAIL_PASS: z.string().min(1, "MAIL_PASS is required"),
  MAIL_FROM: z.string().min(1, "MAIL_FROM is required"),
  MAIL_TO: z.string().min(1, "MAIL_TO is required"),

  // Architecture page — optional (page shows an error if missing, app still loads)
  ARCHITECTURE_URL: z.string().optional(),

  // Captcha — required for contact form submission
  TURNSTILE_SECRET_KEY: z.string().min(1, "TURNSTILE_SECRET_KEY is required"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_TURNSTILE_SITE_KEY is required"),

  // Analytics — optional
  CLARITY_KEY: z.string().optional(),
  G_TAG: z.string().optional(),

  ENV: z.enum(["development", "production"]).default("development").optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  parsedEnv.error.issues.forEach((issue) => {
    console.error(`  - Fix ${String(issue.path[0])}`);
  });
  process.exit(1);
}

export const env = parsedEnv.data;
