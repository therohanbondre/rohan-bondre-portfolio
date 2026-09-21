import { JSX, SVGProps } from "react";
import { cacheLife } from "next/cache";

import Link from "next/link";

import { FileUser, Mail } from "lucide-react";

import { Github, Linkedin } from "@/lib/brand-icons";

const navigation = [
  {
    name: "Resume",
    href: "/resume",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <FileUser {...props} />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rohan-bondre1/",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <Linkedin {...props} />
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/therohanbondre",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <Github {...props} />
    ),
  },
  {
    name: "Mail",
    href: "mailto:rohanbondre96@gmail.com",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <Mail {...props} />
    ),
  },
];

export default async function Footer() {
  "use cache";
  cacheLife("max");
  return (
    <footer className="portfolio-footer relative z-20 overflow-hidden border-t border-red-500/30 bg-neutral-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-12 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-6 md:order-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/60 transition-[transform,color] duration-200 hover:-translate-y-1 hover:scale-110 hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none active:scale-[0.97]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="h-6 w-6" />
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 md:order-1 md:mt-0 md:flex-row md:gap-4">
          <p className="text-center text-base leading-5 text-white/50 md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-white/80">Rohan Bondre</span>
          </p>
          <span className="hidden text-white/30 md:inline">•</span>
          <div className="flex gap-4 text-sm text-white/50">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white/80"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
