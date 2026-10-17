import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
    // featuredDescription: string;
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to my portfolio website.",
    metadata: {
      title: "Home",
      description: "Sirak Embibel's AI automation & engineering portfolio website.",
    },
  },
  skills: {
    title: "Skills",
    description: "Core competencies across agentic AI, workflow automation, cloud infrastructure, and data systems.",
    metadata: {
      title: "Skills",
      description:
        "Sirak Embibel's technical skills in n8n, AWS Bedrock, RAG, Python, Next.js, and health data systems.",
    },
  },
  projects: {
    title: "Projects",
    description: "Featured AI automation agents, AWS Bedrock RAG pipelines, and multi-agent systems.",
    metadata: {
      title: "Projects",
      description: "Sirak Embibel's featured projects in AI automation, RAG, and agentic workflows.",
    },
  },
  contact: {
    title: "Contact",
    description: "Let's connect and explore AI engineering collaborations or contract opportunities.",
    metadata: {
      title: "Contact",
      description: "Contact Sirak Embibel for AI engineering and automation projects.",
    },
  },
  resume: {
    title: "Resume",
    description: "Sirak Embibel's professional CV and resume.",
    metadata: {
      title: "Resume",
      description: "Sirak Embibel's resume and credentials.",
    },
  },
  experience: {
    title: "Experience",
    description: "10+ years of healthcare program coordination and clinical operations transitioning into applied AI engineering.",
    metadata: {
      title: "Experience",
      description:
        "Sirak Embibel's professional leadership journey and experience timeline.",
    },
  },
};
