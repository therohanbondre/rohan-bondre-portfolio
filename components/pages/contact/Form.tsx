"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";

import {
  initialFormState,
  mergeForm,
  useForm,
  useTransform,
} from "@tanstack/react-form-nextjs";
import { toast } from "sonner";
import { Mail, Loader2, Send, Phone, MapPin } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

import { messageFormOptions, MessageSchema } from "@/lib/objects";
import { AddMessage } from "@/actions/message";
import { Github, Linkedin } from "@/lib/brand-icons";

/* ── Shared input class helper ───────────────────────────────────────────── */
function inputClass(hasError: boolean) {
  return [
    "block w-full rounded-xl border-0 px-4 py-3 shadow-xs outline-hidden",
    "transition-[background-color,border-color,box-shadow] duration-200",
    "focus-visible:outline-none sm:text-sm sm:leading-6",
    "bg-neutral-950/50 text-white",
    hasError
      ? "bg-red-950/20 ring-2 ring-red-500 focus-visible:ring-2 focus-visible:ring-red-500"
      : "ring-1 ring-white/10 ring-inset focus:bg-white/5 focus-visible:ring-2 focus-visible:ring-emerald-500/50",
  ].join(" ");
}

export default function Form() {
  const resetRef = useRef<() => void>(null);

  const [state, action, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const res = await AddMessage(prevState, formData);
      if (res && typeof res === "object" && "status" in res) {
        if (res.status !== 200) {
          res.message.forEach((msg: string) =>
            toast.error(msg, { duration: 5000 }),
          );
        } else {
          toast.success(res.message[0], { duration: 4000 });
          resetRef.current?.();
        }
      }
      return res;
    },
    initialFormState,
  );

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    ...messageFormOptions,
    onSubmitInvalid: ({ formApi }) => {
      formApi.state.errors.forEach((error) => {
        let msg: unknown;
        if (typeof error === "string") {
          msg = error;
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error
        ) {
          msg = (error as Record<string, unknown>).message;
        }
        if (typeof msg === "string") toast.error(msg, { duration: 3000 });
      });
    },
    transform: useTransform(
      (baseForm) => {
        if (state && typeof state === "object" && !("status" in state)) {
          return mergeForm(baseForm, state as Parameters<typeof mergeForm>[1]);
        }
        return baseForm;
      },
      [state],
    ),
  });

  useEffect(() => {
    resetRef.current = reset;
  }, [reset]);

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-4 rounded-2xl border border-white/5 bg-neutral-900/40 p-2 shadow-2xl backdrop-blur-xl sm:gap-8 sm:p-4 lg:grid-cols-2">

      {/* ── Left panel — contact info ─────────────────────────────────── */}
      <div className="relative flex flex-col justify-center rounded-2xl border border-white/5 bg-neutral-950/40 p-5 sm:p-12">
        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Get in touch
          </h1>
          <p className="mt-4 text-base leading-7 text-balance text-white/70">
            I&apos;d love to hear from you. Whether you have a question,
            feedback, or just want to connect, feel free to reach out through
            any of the options below or use the form.
          </p>

          <dl className="mt-8 space-y-3 text-base leading-7">

            {/* Email — mailto link */}
            <div className="group/link relative flex items-center rounded-xl border border-white/5 bg-white/5 p-3 transition-[transform,border-color] duration-300 hover:scale-[1.02] hover:border-emerald-500/30">
              <a
                href="mailto:rohanbondre96@gmail.com"
                className="absolute inset-0 z-10 rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                aria-label="Send email to rohanbondre96@gmail.com"
              >
                <span className="sr-only">Email rohanbondre96@gmail.com</span>
              </a>
              <dt className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/5 bg-neutral-900 transition-colors duration-200 group-hover/link:border-emerald-500/50 sm:h-12 sm:w-12">
                <Mail className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" aria-hidden="true" />
              </dt>
              <dd className="ml-4 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-0.5">Email</p>
                <div className="truncate text-sm font-medium text-white transition-colors group-hover/link:text-emerald-300 sm:text-base">
                  rohanbondre96@gmail.com
                </div>
              </dd>
            </div>

            {/* GitHub */}
            <div className="group/link relative flex items-center rounded-xl border border-white/5 bg-white/5 p-3 transition-[transform,border-color] duration-300 hover:scale-[1.02] hover:border-blue-500/30">
              <Link
                href="https://github.com/therohanbondre"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <span className="sr-only">Visit GitHub profile (opens in new tab)</span>
              </Link>
              <dt className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/5 bg-neutral-900 transition-colors duration-200 group-hover/link:border-blue-500/50 sm:h-12 sm:w-12">
                <Github className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" aria-hidden="true" />
              </dt>
              <dd className="ml-4 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-0.5">GitHub</p>
                <div className="truncate text-sm font-medium text-white transition-colors group-hover/link:text-blue-300 sm:text-base">
                  therohanbondre
                </div>
              </dd>
            </div>

            {/* LinkedIn */}
            <div className="group/link relative flex items-center rounded-xl border border-white/5 bg-white/5 p-3 transition-[transform,border-color] duration-300 hover:scale-[1.02] hover:border-sky-500/30">
              <Link
                href="https://www.linkedin.com/in/rohan-bondre1/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
              >
                <span className="sr-only">Visit LinkedIn profile (opens in new tab)</span>
              </Link>
              <dt className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/5 bg-neutral-900 transition-colors duration-200 group-hover/link:border-sky-500/50 sm:h-12 sm:w-12">
                <Linkedin className="h-5 w-5 text-sky-400 sm:h-6 sm:w-6" aria-hidden="true" />
              </dt>
              <dd className="ml-4 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-0.5">LinkedIn</p>
                <div className="truncate text-sm font-medium text-white transition-colors group-hover/link:text-sky-300 sm:text-base">
                  rohan-bondre1
                </div>
              </dd>
            </div>

            {/* Phone */}
            <div className="group/link relative flex items-center rounded-xl border border-white/5 bg-white/5 p-3 transition-[transform,border-color] duration-300 hover:scale-[1.02] hover:border-emerald-500/30">
              <a
                href="tel:+919373597537"
                className="absolute inset-0 z-10 rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                aria-label="Call +91 9373597537"
              >
                <span className="sr-only">Call +91 9373597537</span>
              </a>
              <dt className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/5 bg-neutral-900 transition-colors duration-200 group-hover/link:border-emerald-500/50 sm:h-12 sm:w-12">
                <Phone className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" aria-hidden="true" />
              </dt>
              <dd className="ml-4 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-0.5">Phone</p>
                <div className="truncate text-sm font-medium text-white transition-colors group-hover/link:text-emerald-300 sm:text-base">
                  +91 9373597537
                </div>
              </dd>
            </div>

            {/* Location */}
            <div className="relative flex items-center rounded-xl border border-white/5 bg-white/5 p-3">
              <dt className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/5 bg-neutral-900 sm:h-12 sm:w-12">
                <MapPin className="h-5 w-5 text-white/40 sm:h-6 sm:w-6" aria-hidden="true" />
              </dt>
              <dd className="ml-4 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-0.5">Location</p>
                <div className="truncate text-sm font-medium text-white/60 sm:text-base">
                  Pune, Maharashtra, India
                </div>
              </dd>
            </div>

          </dl>
        </div>
      </div>

      {/* ── Right panel — contact form ────────────────────────────────── */}
      <form
        action={action as never}
        onSubmit={() => handleSubmit()}
        className="flex flex-col justify-center p-5 sm:p-8 lg:p-10"
        noValidate
      >
        <div className="mx-auto w-full max-w-xl lg:max-w-none">
          <h2 className="mb-6 text-xl font-bold text-white">Send a message</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">

            {/* Name */}
            <Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  const res = MessageSchema.shape.name.safeParse(value);
                  return !res.success ? res.error.issues[0].message : undefined;
                },
              }}
            >
              {(field) => {
                const hasError = field.state.meta.errors.length > 0;
                return (
                  <div className="sm:col-span-1">
                    <label htmlFor={field.name} className="block text-sm font-semibold leading-6 text-white/75">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        aria-required="true"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${field.name}-error` : undefined}
                        className={inputClass(hasError)}
                      />
                      {hasError && (
                        <p id={`${field.name}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
                          {field.state.meta.errors[0] as string}
                        </p>
                      )}
                    </div>
                  </div>
                );
              }}
            </Field>

            {/* Email */}
            <Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const res = MessageSchema.shape.email.safeParse(value);
                  return !res.success ? res.error.issues[0].message : undefined;
                },
              }}
            >
              {(field) => {
                const hasError = field.state.meta.errors.length > 0;
                return (
                  <div className="sm:col-span-1">
                    <label htmlFor={field.name} className="block text-sm font-semibold leading-6 text-white/75">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="you@example.com"
                        aria-required="true"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${field.name}-error` : undefined}
                        className={inputClass(hasError)}
                      />
                      {hasError && (
                        <p id={`${field.name}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
                          {field.state.meta.errors[0] as string}
                        </p>
                      )}
                    </div>
                  </div>
                );
              }}
            </Field>

            {/* Subject */}
            <Field
              name="subject"
              validators={{
                onChange: ({ value }) => {
                  const res = MessageSchema.shape.subject.safeParse(value);
                  return !res.success ? res.error.issues[0].message : undefined;
                },
              }}
            >
              {(field) => {
                const hasError = field.state.meta.errors.length > 0;
                return (
                  <div className="sm:col-span-2">
                    <label htmlFor={field.name} className="block text-sm font-semibold leading-6 text-white/75">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="text"
                        placeholder="What's this about?"
                        aria-required="true"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${field.name}-error` : undefined}
                        className={inputClass(hasError)}
                      />
                      {hasError && (
                        <p id={`${field.name}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
                          {field.state.meta.errors[0] as string}
                        </p>
                      )}
                    </div>
                  </div>
                );
              }}
            </Field>

            {/* Message */}
            <Field
              name="message"
              validators={{
                onChange: ({ value }) => {
                  const res = MessageSchema.shape.message.safeParse(value);
                  return !res.success ? res.error.issues[0].message : undefined;
                },
              }}
            >
              {(field) => {
                const hasError = field.state.meta.errors.length > 0;
                return (
                  <div className="sm:col-span-2">
                    <label htmlFor={field.name} className="block text-sm font-semibold leading-6 text-white/75">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        rows={5}
                        placeholder="Write your message…"
                        aria-required="true"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${field.name}-error` : undefined}
                        className={`${inputClass(hasError)} resize-none`}
                      />
                      {hasError && (
                        <p id={`${field.name}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
                          {field.state.meta.errors[0] as string}
                        </p>
                      )}
                    </div>
                  </div>
                );
              }}
            </Field>

          </div>

          {/* Turnstile captcha + submit */}
          <div className="mt-6 flex flex-col items-end gap-5">
            <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-hidden">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ size: "flexible", theme: "dark" }}
              />
            </div>

            <Subscribe
              selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => {
                const loading = isSubmitting || isPending;
                return (
                  <button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className={[
                      "flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold",
                      "transition-[transform,box-shadow,border-color,background-color] duration-200",
                      "focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none",
                      loading || !canSubmit
                        ? "cursor-not-allowed border border-white/5 bg-neutral-900 text-white/40"
                        : "border border-white/10 bg-neutral-900 text-white shadow-lg hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] active:scale-[0.97]",
                    ].join(" ")}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                );
              }}
            </Subscribe>
          </div>

          {/* Fallback hint */}
          <p className="mt-4 text-xs text-white/30">
            Or email me directly at{" "}
            <a
              href="mailto:rohanbondre96@gmail.com"
              className="text-emerald-400/70 underline-offset-2 hover:text-emerald-400 hover:underline transition-colors"
            >
              rohanbondre96@gmail.com
            </a>
          </p>

        </div>
      </form>
    </div>
  );
}
