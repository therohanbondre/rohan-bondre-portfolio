import { MetadataRoute } from "next";

// TODO: Replace with your actual deployed domain once you have one.
const BASE_URL = "https://github.com/therohanbondre";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
