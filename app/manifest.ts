import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sirak Embibel | AI Automation Specialist & Applied AI Engineer",
    short_name: "Sirak Embibel",
    description:
      "Sirak Embibel - AI Automation Specialist and Applied AI Engineer building production multi-agent workflows, AWS Bedrock RAG systems, and healthcare automation pipelines.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: [
      "portfolio",
      "ai",
      "software engineering",
      "machine learning",
      "developer",
      "web development",

      
    ],
    lang: "en",
    dir: "ltr",
    scope: "/",
  };
}
