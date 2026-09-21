import { Metadata } from "next";

import Grid from "@/components/pages/projects/Grid";

export const metadata: Metadata = {
  title: "Projects | Rohan Bondre",
  description: "Projects by Rohan Bondre",
  metadataBase: new URL("https://rohan-bondre-profile.vercel.app"),
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Rohan Bondre",
    description: "View my projects.",
    siteName: "Rohan Bondre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Rohan Bondre",
    description: "View my projects.",
  },
};

import { GetProjects } from "@/data/projects";
import { ViewTransition } from "react";

export default async function Projects() {
  const { projects } = await GetProjects({ Featured: false });

  return (
    <div className="relative min-h-screen">
      <ViewTransition name="project-grid" default="none" share="auto">
        <Grid
          Heading="Projects"
          Description="Here's a list of projects I have worked/working on."
          projects={projects}
        />
      </ViewTransition>
    </div>
  );
}
