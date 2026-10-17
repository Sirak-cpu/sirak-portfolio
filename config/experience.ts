import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "mcmdo-project-coordinator",
    position: "Project Coordinator — Humanitarian Health & Nutrition",
    company: "Mothers and Children Multi-sectoral Development Organization (MCMDO)",
    location: "East Bale, Ethiopia",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2024-04-01"),
    description: [
      "Owned end-to-end coordination of donor-funded health and nutrition programs — planning, implementation, supervision, and reporting — across health facilities and drought-affected communities.",
      "Designed and maintained recurring operational workflows (work plans, budget follow-ups, indicator tracking) for multi-agency stakeholder reviews.",
      "Coordinated cross-functional teams spanning regional health bureaus, international NGOs, and frontline community health posts.",
    ],
    achievements: [
      "Delivered humanitarian health and nutrition programs at over 90% implementation performance against donor targets.",
      "Engineered structured indicator tracking frameworks that reduced reporting turnaround times for donor audits.",
      "Standardized multi-facility data reporting across 15+ remote intervention sites into unified, verifiable summary packages.",
    ],
    skills: [
      "Data Pipelines",
      "Indicator Tracking",
      "Program Coordination",
      "HIS",
      "Public Health",
    ],
    companyUrl: "https://mcmdo.org",
    logo: "/logo.png",
  },
  {
    id: "mcmdo-mobile-health-leader",
    position: "Mobile Health & Nutrition Team Leader / Primary Healthcare Coordinator",
    company: "Mothers and Children Multi-sectoral Development Organization (MCMDO)",
    location: "West Guji, West Shewa & Konso, Ethiopia",
    startDate: new Date("2018-08-01"),
    endDate: new Date("2023-06-01"),
    description: [
      "Led mobile healthcare teams delivering integrated clinical consultations, triage prioritization, and secondary referral linkage.",
      "Supervised data quality assurance and periodic compilation of service delivery indicators across district health facilities.",
      "Directed emergency health and nutrition operations for displaced populations across remote, resource-constrained environments.",
    ],
    achievements: [
      "Modeled end-to-end patient consultation and triage pathways that served as the operational blueprint for automated clinical intake workflows.",
      "Instituted systematic data quality verification protocols that eliminated reporting discrepancies across multiple district registries.",
      "Coordinated rapid-response clinical deployments providing emergency medical relief to over 20,000 crisis-affected individuals.",
    ],
    skills: [
      "Workflow Automation",
      "Data Quality Assurance",
      "Health Systems",
      "Emergency Response",
      "M&E",
    ],
    companyUrl: "https://mcmdo.org",
    logo: "/logo.png",
  },
  {
    id: "rrs-clinical-team-leader",
    position: "Clinical Team Leader",
    company: "Refugee and Returnee Service (RRS)",
    location: "Dollo Ado, Somali Region, Ethiopia",
    startDate: new Date("2013-04-01"),
    endDate: new Date("2018-07-01"),
    description: [
      "Led clinical and support teams delivering emergency, maternal, mental health, and referral services for a refugee population exceeding 45,000.",
      "Managed longitudinal patient tracking, referral handoffs, and documentation for chronic non-communicable disease cohorts.",
      "Directed epidemiological data aggregation, validation, and regular submission to UNHCR, regional health authorities, and humanitarian partners.",
    ],
    achievements: [
      "Maintained unbroken clinical and referral support operations for a population exceeding 45,000 refugees across extended humanitarian response cycles.",
      "Established chronic disease cohort tracking protocols that decreased patient loss-to-follow-up by 35%.",
      "Consolidated multi-clinic weekly disease surveillance data into timely, zero-defect epidemiological briefings for international health clusters.",
    ],
    skills: [
      "Case Management",
      "Reporting Systems",
      "Cross-Team Coordination",
      "Health Systems",
      "Public Health",
    ],
    logo: "/logo.png",
  },
  {
    id: "moh-phc-director",
    position: "Primary Healthcare Unit Director",
    company: "Ministry of Health (MOH Ethiopia)",
    location: "Alamata, Tigray, Ethiopia",
    startDate: new Date("2009-08-01"),
    endDate: new Date("2013-10-01"),
    description: [
      "Directed primary healthcare service delivery, supervision, and reporting for a full catchment unit covering clinical care, maternal health, and disease-prevention programs.",
      "Supervised clinical officers, supply chain logistics, and satellite health posts throughout the administrative catchment area.",
      "Managed routine health information system records, supportive supervision visits, and local facility performance assessments.",
    ],
    achievements: [
      "Raised catchment immunization coverage from 75% to 92% within three years through structured data-driven community outreach and supportive supervision.",
      "Implemented pharmaceutical inventory control systems that eliminated critical medication stockouts across all satellite health posts.",
      "Recognized by regional health authorities for outstanding performance in on-time health information reporting and clinical quality benchmarks.",
    ],
    skills: [
      "Process Optimization",
      "Public Health",
      "Data-Driven Supervision",
      "Quality Improvement",
    ],
    logo: "/logo.png",
  },
];
