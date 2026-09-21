"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form-nextjs";

import { env } from "@/lib/env";
import { mail } from "@/lib/mail";

import { MessageSchema, messageFormOptions } from "@/lib/objects";

const validate = createServerValidate({
  ...messageFormOptions,
  onServerValidate: ({ value }) => {
    const result = MessageSchema.safeParse(value);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      return fieldErrors;
    }
  },
});

export async function AddMessage(
  prev: unknown,
  formData: FormData,
): Promise<{ status: number; message: string[] } | ReturnType<typeof validate>> {
  try {
    // ── 1. Turnstile captcha (skipped in development) ───────────────────
    if (env.ENV !== "development") {
      const token = formData.get("cf-turnstile-response");
      if (!token || typeof token !== "string" || token.trim() === "") {
        return {
          status: 400,
          message: ["Captcha verification failed. Please refresh and try again."],
        };
      }

      let verifyOk = false;
      try {
        const verifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret:   env.TURNSTILE_SECRET_KEY,
              response: token,
            }).toString(),
          },
        );
        if (verifyRes.ok) {
          const data = await verifyRes.json() as { success: boolean };
          verifyOk = data.success === true;
        }
      } catch {
        // Cloudflare unreachable — fail closed
        return {
          status: 503,
          message: [
            "Captcha service unavailable. Please try again in a moment.",
          ],
        };
      }

      if (!verifyOk) {
        return {
          status: 400,
          message: ["Invalid captcha. Please reload the page and try again."],
        };
      }
    }

    // ── 2. Validate form fields ─────────────────────────────────────────
    const data = await validate(formData);

    // ── 3. Send email ───────────────────────────────────────────────────
    try {
      await mail.send(data);
    } catch (smtpErr) {
      console.error("[Contact] SMTP error:", smtpErr);
      return {
        status: 500,
        message: [
          "Email delivery failed. Please contact me directly at rohanbondre96@gmail.com",
        ],
      };
    }

    return {
      status: 200,
      message: ["Message sent! I'll get back to you soon."],
    };
  } catch (e) {
    // TanStack form validation errors — must re-throw so the library handles them
    if (e instanceof ServerValidateError) throw e;

    // Any other unexpected error — return a safe message instead of crashing
    console.error("[Contact] Unexpected error:", e);
    return {
      status: 500,
      message: [
        "Something went wrong. Please contact me directly at rohanbondre96@gmail.com",
      ],
    };
  }
}
