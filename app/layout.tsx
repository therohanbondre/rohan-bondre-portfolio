import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Script from "next/script";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { env } from "@/lib/env";

import CursorOrbital from "@/components/CursorOrbital";
import InteractiveBackground from "@/components/InteractiveBackground";
import { THEME_INIT_SCRIPT } from "@/lib/themes";

import "./globals.css";

const font = localFont({
  src: "../public/fonts/SF-Pro.ttf",
});

export const metadata: Metadata = {
  keywords: [
    "Portfolio",
    "Home",
    "Projects",
    "About Me",
    "Rohan",
    "Rohan Bondre",
    "Rohan Anil Bondre",
    "Developer",
    "Software Developer",
    "Software Engineer",
    "Computer Engineering",
    "Quality Automation",
    "Test Automation",
    "Selenium",
    "Full Stack",
    "Web Development",
    "Web Developer",
    "Programming",
    "Engineering",
    "Pune",
    "Maharashtra",
    "India",
    "SPPU",
    "Savitribai Phule Pune University",
    "Indira College of Engineering",
    "Valuedx",
    "Bluestock Fintech",
    "AI",
    "Cybersecurity",
    "Networking",
    "Java",
    "Python",
    "JavaScript",
  ],
  authors: [
    {
      name: "Rohan Bondre",
      url: "https://rohan-bondre-profile.vercel.app",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scrollbar-thin scrollbar-thumb-neutral-900 scrollbar-track-neutral-950 overflow-y-scroll ${font.className}`}
    >
      <head>
        {/* ── No-flash theme restore — runs before any paint ── */}
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        {env.G_TAG ? <GoogleTagManager gtmId={env.G_TAG} /> : null}
        {env.G_TAG ? <GoogleAnalytics gaId={env.G_TAG} /> : null}
        {env.CLARITY_KEY ? (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${env.CLARITY_KEY}");
          `}
          </Script>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://rohan-bondre-profile.vercel.app/#person",
                  name: "Rohan Bondre",
                  url: "https://rohan-bondre-profile.vercel.app",
                  sameAs: [
                    "https://www.linkedin.com/in/rohan-bondre1/",
                    "https://github.com/therohanbondre",
                  ],
                  jobTitle: "Software Developer",
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Indira College of Engineering and Management, Pune",
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Pune",
                    addressRegion: "Maharashtra",
                    addressCountry: "IN",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://rohan-bondre-profile.vercel.app/#website",
                  name: "Rohan Bondre's Portfolio",
                  description:
                    "Computer Engineering Graduate | Software Developer | AI & Cybersecurity Enthusiast",
                  inLanguage: "en",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-100 -translate-y-full rounded-br-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-neutral-950 transition-transform duration-200 focus:translate-y-0"
        >
          Skip to content
        </a>
        <InteractiveBackground />
        <CursorOrbital />
        {children}
        <Suspense>
          <SpeedInsights />
        </Suspense>
        <Suspense>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
