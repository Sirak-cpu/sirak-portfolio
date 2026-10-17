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
      "Built and maintained recurring reporting systems (work plans, budget follow-ups, indicator tracking) for multiple stakeholders — direct precedent for designing structured, auditable data pipelines.",
      "Coordinated across government offices, NGOs, and community structures to keep multi-party service delivery on track.",
    ],
    achievements: [
      "Delivered humanitarian health and nutrition programs at over 90% implementation performance against donor targets.",
      "Built and maintained recurring reporting systems (work plans, budget follow-ups, indicator tracking) for multiple stakeholders.",
      "Coordinated across government offices, NGOs, and community structures to keep multi-party service delivery on track.",
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
      "Led mobile teams delivering integrated healthcare across multiple districts, managing patient consultation, referral linkage, and reporting.",
      "Owned data quality assurance and compilation for service delivery and project indicators, building a practitioner's eye for where manual reporting breaks down.",
      "Coordinated emergency health and nutrition response for displaced populations across shifting, resource-constrained environments.",
    ],
    achievements: [
      "Led mobile teams delivering integrated healthcare across multiple districts, managing patient consultation, referral linkage, and reporting — the exact workflow shape later modeled as an automation pipeline.",
      "Owned data quality assurance and compilation for service delivery and project indicators, identifying automation opportunities.",
      "Coordinated emergency health and nutrition response for displaced populations across shifting, resource-constrained environments.",
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
      "Led clinical and support teams delivering emergency, maternal, mental health, and referral services for a population exceeding 45,000 refugees.",
      "Managed follow-up, referral linkage, and reporting for chronic disease patients (diabetes, hypertension) — long-running case-management workflows.",
      "Coordinated collection, quality assurance, and submission of health reports to zonal authorities and humanitarian partners.",
    ],
    achievements: [
      "Led clinical and support teams delivering emergency, maternal, mental health, and referral services for a population exceeding 45,000 refugees.",
      "Managed follow-up, referral linkage, and reporting for chronic disease patients (diabetes, hypertension) — structurally similar to patient-journey automations.",
      "Coordinated collection, quality assurance, and submission of health reports to zonal authorities and humanitarian partners across multiple organizations.",
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
      "Directed primary healthcare service delivery, supervision, and reporting for a full catchment unit, including immunization, maternal health, and disease-prevention programs.",
      "Improved immunization coverage from 75% to 92% over three years through structured supportive supervision and data-driven follow-up.",
      "Supervised clinical staff, supply chains, and outreach health posts across the district.",
    ],
    achievements: [
      "Raised immunization coverage from 75% to 92% within three years at primary healthcare level.",
      "Directed primary healthcare service delivery, supervision, and reporting for a full catchment unit, including immunization, maternal health, and disease-prevention programs.",
      "Improved immunization coverage through structured supportive supervision and data-driven follow-up — an early example of using data and process discipline to drive measurable outcomes.",
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
