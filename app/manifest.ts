import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rohan Bondre's Portfolio",
    short_name: "Rohan Portfolio",
    description:
      "Portfolio website of Rohan Bondre — Computer Engineering Graduate, Software Developer, AI & Cybersecurity Enthusiast",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#000000",
    icons: [
      {
        // TODO: Replace with your own icon once you have a photo/logo
        src: "https://placehold.co/192x192/1a1a1a/10b981?text=RB",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://placehold.co/512x512/1a1a1a/10b981?text=RB",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
