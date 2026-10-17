import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  youtubeLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate?: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "wanderbot-rag",
    companyName: "Wanderbot-RAG — AWS Bedrock RAG System",
    type: "Personal",
    category: ["AI / ML", "Backend", "Full Stack"],
    shortDescription:
      "Retrieval-augmented Q&A pipeline built on real AWS infrastructure — S3 document storage, S3 Vectors index, and Bedrock Knowledge Base backed by Titan Text Embeddings V2.",
    githubLink: "https://github.com/Sirak-cpu/Customer-support-chatbot",
    techStack: [
      "AWS Bedrock",
      "Amazon S3",
      "RAG / Vector Search",
      "Python",
      "Prompt Engineering",
    ],
    startDate: new Date("2026-08-24T12:00:00Z"),
    endDate: new Date("2026-09-15T12:00:00Z"),
    companyLogoImg: "/logo.png",
    pagesInfoArr: [
      {
        title: "AWS S3 & Vector Knowledge Base",
        description:
          "Automated document ingestion pipeline that indexes multi-format documents from Amazon S3 into S3 Vectors and connects them to AWS Bedrock Knowledge Bases.",
        imgArr: ["/logo.png"],
      },
      {
        title: "Contextual Query Interface",
        description:
          "Prototyped locally before deployment to AWS production, delivering low-latency, source-grounded answers with minimal hallucination.",
        imgArr: ["/logo.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Wanderbot-RAG is an enterprise-grade retrieval-augmented generation (RAG) system built directly on production AWS infrastructure to query multi-format documentation with high precision and verifiable grounding.",
        "The architecture integrates Amazon S3 for document storage, S3 Vectors for fast similarity indexing, and AWS Bedrock Knowledge Bases powered by Amazon Titan Text Embeddings V2.",
        "The pipeline was first prototyped and benchmarked in local development environments before deploying to cloud infrastructure, optimizing embedding dimensions, chunking boundaries, and IAM least-privilege security policies.",
      ],
      bullets: [
        "Deployed a production RAG knowledge base on AWS Bedrock using S3 Vectors and Titan Text Embeddings V2.",
        "Designed end-to-end ingestion pipelines with automated document chunking, vector indexing, and real-time query routing.",
        "Achieved low-latency, context-grounded retrieval with strict prompt guardrails to eliminate hallucinated responses.",
        "Configured cloud security with fine-grained AWS IAM permissions and Bedrock Agent Runtime integrations.",
      ],
    },
  },
  {
    id: "equipflow",
    companyName: "EquipFlow — Multi-Agent-Built SaaS Platform",
    type: "Personal",
    category: ["Full Stack", "AI Agents", "Web Dev"],
    shortDescription:
      "Multi-tenant Next.js equipment-tracking SaaS application built using a custom multi-agent development workflow with a 9-table schema, RBAC, and dedicated security audit agents.",
    websiteLink: "https://equipflow-one.vercel.app",
    techStack: [
      "Next.js",
      "React",
      "Typescript",
      "Multi-Agent Systems",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    startDate: new Date("2026-10-03T12:00:00Z"),
    endDate: new Date("2026-10-14T12:00:00Z"),
    companyLogoImg: "/projects/equipflow/img3.jpg",
    pagesInfoArr: [
      {
        title: "Clinical Command Center & Department Organization",
        description:
          "Organize equipment inventory by clinical unit, ward, and operational facility with multi-department visibility.",
        imgArr: ["/projects/equipflow/img1.jpg"],
      },
      {
        title: "Relational Schema & Equipment Lifecycle Tracking",
        description:
          "Manage clinical devices, categories, serial numbers, custodianship, and lifecycle states (Purchased to Maintenance & In Service) with tenant security guardrails.",
        imgArr: ["/projects/equipflow/img2.jpg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "EquipFlow is a full-featured, multi-tenant equipment lifecycle tracking application built using a structured multi-agent software engineering workflow.",
        "Six specialized AI agents (Architecture, Database, Backend, Frontend, Security, and Testing) were coordinated by a master orchestrator across four build phases: Foundation, Core Data Model, Operational, and Visibility.",
        "The application features a 9-table relational database schema with full equipment lifecycle tracking, granular role-based access control (RBAC), and automated tenant isolation auditing to ensure zero cross-tenant data leakage.",
      ],
      bullets: [
        "Engineered a multi-tenant Next.js application with a 9-table relational data model and lifecycle state management.",
        "Orchestrated a 6-agent AI development workflow spanning system architecture, schema design, API implementation, UI/UX, and testing.",
        "Enforced strict multi-tenant isolation verified by an automated AI security audit agent inspecting all database queries and route handlers.",
        "Built interactive dashboards for equipment status monitoring, maintenance logs, and operational asset visibility.",
      ],
    },
  },
  {
    id: "patient-intake-automation",
    companyName: "Patient Intake Automation Agent (Healthcare, n8n)",
    type: "Personal",
    category: ["Healthcare AI", "Workflow Automation", "AI Agents"],
    shortDescription:
      "Concept and workflow design for an n8n-based agent automating patient intake, clinical triage routing, and referral documentation using public health domain expertise.",
    youtubeLink: "https://youtu.be/5gk7_H6J5BI?si=as7Gu2o58ww4OSxy",
    techStack: [
      "n8n",
      "AI Agents",
      "Python",
      "Workflow Automation",
      "Health Systems",
    ],
    startDate: new Date("2026-08-20T12:00:00Z"),
    endDate: new Date("2026-09-02T12:00:00Z"),
    companyLogoImg: "/logo.png",
    pagesInfoArr: [
      {
        title: "Clinical Intake & Triage Pipeline",
        description:
          "Automates intake data validation, triage prioritization, and electronic referral routing across healthcare facilities.",
        imgArr: ["/logo.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "The Patient Intake Automation Agent is an n8n-based healthcare automation system designed to streamline patient intake, clinical triage prioritization, and referral documentation.",
        "Directly applies 10+ years of public health and clinical management leadership in Ethiopia to eliminate the administrative bottlenecks and paperwork delays that slow down patient care.",
        "Processes patient intake records, evaluates severity scores, and routes formatted referral documentation to target clinics and receiving providers.",
      ],
      bullets: [
        "Designed an n8n automation workflow for patient intake data collection, verification, and triage scoring.",
        "Automated referral document generation and routing, modeling real-world clinical intake-to-referral pathways.",
        "Integrated webhook triggers and API endpoints for bi-directional synchronization with health information systems.",
        "Built human-in-the-loop review steps for urgent or ambiguous triage cases.",
      ],
    },
  },
  {
    id: "ai-file-processing-rag",
    companyName: "AI-Powered File Processing & RAG Pipeline",
    type: "Personal",
    category: ["AI / ML", "Full Stack", "Backend"],
    shortDescription:
      "Automated document-processing pipeline using Gemini API for structured extraction from binary data, coupled with a Supabase/pgvector RAG pipeline.",
    youtubeLink: "https://youtu.be/Q6aklDn2k7c?si=V3QfUGvstgFohvpv",
    techStack: [
      "Google Gemini API",
      "Supabase",
      "PostgreSQL",
      "RAG / Vector Search",
      "Python",
    ],
    startDate: new Date("2026-08-30T12:00:00Z"),
    endDate: new Date("2026-09-18T12:00:00Z"),
    companyLogoImg: "/logo.png",
    pagesInfoArr: [
      {
        title: "PDF File Ingestion",
        description:
          "Extracts structured schema-validated data from PDF documents via Google Gemini API.",
        imgArr: ["/logo.png"],
      },
      {
        title: "Vector Search & pgvector Storage",
        description:
          "Stores embeddings in Supabase pgvector with resolved embedding-dimension compatibility.",
        imgArr: ["/logo.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "An automated file-processing and retrieval-augmented generation pipeline built to handle unstructured PDF documents.",
        "Utilizes the Google Gemini API for PDF document reasoning and schema-enforced JSON extraction from binary data.",
        "Integrates with a Supabase/pgvector database for semantic search, overcoming embedding-dimension compatibility challenges across different embedding models.",
      ],
      bullets: [
        "Engineered PDF file ingestion pipelines extracting structured data with Google Gemini multimodal capabilities.",
        "Configured Supabase pgvector database with optimized vector indexing for low-latency similarity queries.",
        "Resolved embedding-dimension compatibility across multiple embedding models to maintain high retrieval precision.",
      ],
    },
  },
];

export const featuredProjects = Projects.slice(0, 4);
