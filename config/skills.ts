import { Icons } from "@/components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "n8n Automation",
    description:
      "Design and deploy 21+ production workflows, multi-agent orchestration, webhooks, and API integrations.",
    rating: 5,
    icon: Icons.n8n,
  },
  {
    name: "AWS Bedrock",
    description:
      "Enterprise AI infrastructure with Titan Text Embeddings V2, Bedrock Knowledge Bases, and Bedrock Agent Runtime.",
    rating: 4,
    icon: Icons.amazonaws,
  },
  {
    name: "RAG & Vector Search",
    description:
      "End-to-end Retrieval-Augmented Generation architectures, chunking strategies, embeddings, and context retrieval.",
    rating: 5,
    icon: Icons.brain,
  },
  {
    name: "Python",
    description:
      "Develop autonomous AI agents, data pipelines, API integrations, and vector search tooling.",
    rating: 4,
    icon: Icons.python,
  },
  {
    name: "Multi-Agent Systems",
    description:
      "Coordinate specialized multi-agent teams for autonomous research, code building, security auditing, and triage.",
    rating: 5,
    icon: Icons.bot,
  },
  {
    name: "Google Gemini API",
    description:
      "Multimodal document processing, structured schema extraction from binary files, and tool-augmented agent design.",
    rating: 4,
    icon: Icons.gemini,
  },
  {
    name: "Next.js & React",
    description:
      "Build modern full-stack web applications, responsive user interfaces, and multi-tenant SaaS dashboards.",
    rating: 4,
    icon: Icons.nextjs,
  },
  {
    name: "Supabase & pgvector",
    description:
      "Relational schema design, role-based access control (RBAC), and pgvector similarity search indexing.",
    rating: 4,
    icon: Icons.supabase,
  },
  {
    name: "TypeScript",
    description:
      "Type-safe full-stack application development, API design, and automation scripting.",
    rating: 4,
    icon: Icons.typescript,
  },
  {
    name: "HIS & Health Systems",
    description:
      "Health information systems, indicator tracking, M&E dashboards, and auditable data quality assurance.",
    rating: 5,
    icon: Icons.spreadsheet,
  },
  {
    name: "Amazon S3 & S3 Vectors",
    description:
      "Scalable document storage, S3 vector indexing, IAM permissions, and automated cloud ingestion.",
    rating: 4,
    icon: Icons.amazons3,
  },
  {
    name: "Tailwind CSS",
    description:
      "Craft modern, responsive, and accessible user interfaces with utility-first CSS styling.",
    rating: 4,
    icon: Icons.tailwindcss,
  },
];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);
