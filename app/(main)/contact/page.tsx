import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";

const Form = dynamic(() => import("@/components/pages/contact/Form"));

export const metadata: Metadata = {
  title: "Contact | Rohan Bondre",
  description: "Get in touch with Rohan Bondre",
  metadataBase: new URL("https://rohan-bondre-profile.vercel.app"),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Rohan Bondre",
    description: "Get in touch with Rohan Bondre",
    siteName: "Rohan Bondre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Rohan Bondre",
    description: "Get in touch with Rohan Bondre",
  },
};

export default function Contact() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 pb-12">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Form />
      </div>
      <Toaster richColors expand position="top-right" />
    </div>
  );
}
