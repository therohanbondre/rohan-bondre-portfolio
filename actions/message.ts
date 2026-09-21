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

export async function AddMessage(prev: unknown, formData: FormData) {
  try {
    // ── 1. Verify Cloudflare Turnstile captcha ──────────────────────────
    // Skip captcha in development so you can test the form locally
    if (env.ENV !== "development") {
      const turnstileResponse = formData.get("cf-turnstile-response");
      if (!turnstileResponse) {
        return { status: 400, message: ["Captcha verification failed. Please try again."] };
      }

      const verifyResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${env.TURNSTILE_SECRET_KEY}&response=${turnstileResponse}`,
        },
      );

      const verifyData = await verifyResponse.json();
      if (!verifyData.success) {
        return { status: 400, message: ["Invalid captcha response. Please refresh and try again."] };
      }
    }

    // ── 2. Validate form fields ─────────────────────────────────────────
    const data = await validate(formData);

    // ── 3. Send email — await directly so SMTP errors surface ──────────
    try {
      await mail.send(data);
    } catch (smtpError) {
      // SMTP failed (wrong password, network, etc.)
      // Log server-side but return a clear user-facing message
      console.error("[Contact Form] SMTP error:", smtpError);
      return {
        status: 500,
        message: [
          "Email delivery failed. Please contact me directly at rohanbondre96@gmail.com",
        ],
      } satisfies { status: number; message: string[] };
    }

    return {
      status: 200,
      message: ["Message sent! I'll get back to you soon."],
    } satisfies { status: number; message: string[] };

  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }
    throw e;
  }
}
