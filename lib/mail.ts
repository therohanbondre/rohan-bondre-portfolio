import nodemailer, { type Transporter } from "nodemailer";

import { env } from "@/lib/env";

import { type Message } from "./objects";

class Mail {
  #transporter: Transporter | null = null;

  // Lazy initialisation — transporter is only created on first send(),
  // not at module load time. This prevents SMTP connection errors from
  // crashing the RSC module graph during server startup.
  #getTransporter(): Transporter {
    if (!this.#transporter) {
      this.#transporter = nodemailer.createTransport({
        host: env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: env.MAIL_USER,
          pass: env.MAIL_PASS,
        },
      });
    }
    return this.#transporter;
  }

  async send(data: Message) {
    await this.#getTransporter().sendMail({
      from:    `"${data.name}" <${env.MAIL_FROM}>`,
      to:      env.MAIL_TO,
      replyTo: data.email,
      subject: data.subject
        ? `[Portfolio] ${data.subject} — from ${data.name}`
        : `[Portfolio] New message from ${data.name} (${data.email})`,
      text: `From: ${data.name} <${data.email}>\nSubject: ${data.subject ?? "(none)"}\n\n${data.message}`,
      html: `<p><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p>
<p><strong>Subject:</strong> ${data.subject ?? "(none)"}</p>
<hr/>
<p style="white-space:pre-wrap">${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
    });
  }
}

const globalForMail = globalThis as unknown as { mail: Mail | undefined };
export const mail = globalForMail.mail ?? new Mail();

if (env.ENV === "development") {
  globalForMail.mail = mail;
}
