import { Metadata } from "next";
import Link from "next/link";

import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${pagesConfig.resume.metadata.title} | Sirak Embibel`,
  description: pagesConfig.resume.metadata.description,
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
};

const technicalSkillsCategories = [
  {
    title: "Automation & Agents",
    skills: [
      "n8n (21+ production workflows)",
      "Multi-agent orchestration",
      "Workflow design",
      "Webhook & API integrations",
    ],
  },
  {
    title: "Cloud & AI Infrastructure",
    skills: [
      "AWS Bedrock (Titan Embeddings V2, Knowledge Bases)",
      "Amazon S3 & S3 Vectors",
      "AWS IAM",
      "Bedrock Agent Runtime",
    ],
  },
  {
    title: "AI & LLM Engineering",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "Vector search & embeddings",
      "Google Gemini API",
      "Prompt & tool design",
      "Supabase / pgvector",
    ],
  },
  {
    title: "Programming & Frameworks",
    skills: [
      "Python",
      "JavaScript / TypeScript",
      "Next.js / React",
      "HTML 5 & CSS 3 / Tailwind CSS",
    ],
  },
  {
    title: "Data & Reporting",
    skills: [
      "HIS",
      "Health information systems",
      "MS Excel",
      "M&E dashboards",
      "Data quality assurance",
    ],
  },
  {
    title: "Certifications & In Progress",
    skills: [
      "AWS Agentic AI Nanodegree (Scholarship recipient, through Nov 2026)",
      "Applied AI Engineering (Autonomous agent deployment & productionizing)",
    ],
  },
];

const achievementsList = [
  "Raised immunization coverage from 75% to 92% within three years at primary healthcare level.",
  "Delivered humanitarian health and nutrition programs at over 90% implementation performance against donor targets.",
  "Deployed a production RAG knowledge base on AWS Bedrock (S3 Vectors + Titan Embeddings V2), independently designed, tested locally, and shipped to real cloud infrastructure.",
  "Built a library of 21+ reusable n8n automation workflows spanning multi-agent research, document processing, and RAG retrieval.",
];

export default function ResumePage() {
  return (
    <ClientPageWrapper>
      <div className="container max-w-4xl mx-auto py-10 px-4 space-y-10">
        {/* Header Section */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border">
          <div>
            <AnimatedText
              as="h1"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              Sirak Embibel
            </AnimatedText>
            <AnimatedText
              as="h2"
              delay={0.1}
              className="font-heading text-lg sm:text-xl text-primary font-medium mt-1"
            >
              AI Automation Specialist | n8n & AWS Agentic AI Engineer | Applied AI Engineer
            </AnimatedText>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Icons.contact className="w-4 h-4" /> 0910835614
              </span>
              <span>•</span>
              <a
                href="mailto:sirakbayet@gmail.com"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Icons.gmail className="w-4 h-4" /> sirakbayet@gmail.com
              </a>
              <span>•</span>
              <span>Ethiopia (Open to remote / international contract work)</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              <Icons.contact className="w-4 h-4 mr-1.5" /> Get in Touch
            </Link>
            <Link
              href="/projects"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <Icons.chevronRight className="w-4 h-4 mr-1.5" /> View Projects
            </Link>
          </div>
        </AnimatedSection>

        {/* Professional Summary */}
        <AnimatedSection delay={0.2} className="space-y-3">
          <h3 className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Icons.user className="w-5 h-5 text-primary" /> Professional Summary
          </h3>
          <Card className="bg-card border-border">
            <CardContent className="p-5 text-muted-foreground leading-relaxed text-sm sm:text-base">
              AI Automation Specialist transitioning from a 10+ year career in public health program management into applied AI engineering. Builds production automation and multi-agent AI systems using n8n, AWS Bedrock, and RAG architectures, with a specialization in healthcare workflows. Combines hands-on experience designing referral systems, patient data pipelines, and reporting structures across Ethiopia&apos;s health system with technical skills in agentic workflow design, vector search, cloud AI infrastructure, and full-stack development. Brings a rare combination most automation engineers lack: firsthand understanding of clinical and public-health operations, stakeholder coordination, and the real bottlenecks worth automating.
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Technical Skills */}
        <AnimatedSection delay={0.3} className="space-y-4">
          <h3 className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Icons.settings className="w-5 h-5 text-primary" /> Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalSkillsCategories.map((category, idx) => (
              <Card key={idx} className="bg-card border-border">
                <CardHeader className="p-4 pb-2">
                  <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">
                    {category.title}
                  </h4>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-1.5">
                    {category.skills.map((skill, sIdx) => (
                      <li
                        key={sIdx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Featured Projects */}
        <AnimatedSection delay={0.4} className="space-y-4">
          <h3 className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Icons.brain className="w-5 h-5 text-primary" /> Featured AI & Automation Projects
          </h3>
          <div className="space-y-4">
            {Projects.map((project) => (
              <Card key={project.id} className="bg-card border-border">
                <CardContent className="p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-heading text-lg font-bold text-foreground">
                      {project.companyName}
                    </h4>
                    <div className="flex items-center gap-3">
                      {project.websiteLink && (
                        <Link
                          href={project.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium"
                        >
                          <Icons.externalLink className="w-3.5 h-3.5" /> Live Demo
                        </Link>
                      )}
                      {project.githubLink && (
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium"
                        >
                          <Icons.gitHub className="w-3.5 h-3.5" /> GitHub
                        </Link>
                      )}
                      {project.youtubeLink && (
                        <Link
                          href={project.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 font-medium"
                        >
                          <Icons.youtube className="w-3.5 h-3.5" /> Video Demo
                        </Link>
                      )}
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                      >
                        Case Study <Icons.externalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Professional Experience */}
        <AnimatedSection delay={0.5} className="space-y-4">
          <h3 className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Icons.work className="w-5 h-5 text-primary" /> Professional Experience
          </h3>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <Card key={exp.id} className="bg-card border-border">
                <CardContent className="p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-foreground">
                        {exp.position}
                      </h4>
                      <p className="text-sm font-medium text-muted-foreground">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
                      {new Date(exp.startDate).getFullYear()} –{" "}
                      {typeof exp.endDate === "string"
                        ? exp.endDate
                        : new Date(exp.endDate).getFullYear()}
                    </span>
                  </div>
                  <ul className="space-y-2 pt-1">
                    {exp.description.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Education & Achievements */}
        <AnimatedSection delay={0.6} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-heading text-xl font-bold flex items-center gap-2">
              <Icons.page className="w-5 h-5 text-primary" /> Education & Training
            </h3>
            <Card className="bg-card border-border h-full">
              <CardContent className="p-5 space-y-4">
                <div>
                  <h4 className="font-heading text-base font-bold text-foreground">
                    Master of Science (MSc), Public Health
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Yekatit 12 Hospital Medical College • Jan 2024
                  </p>
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-foreground">
                    Bachelor of Science (BSc), Public Health
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Jimma University • May 2009
                  </p>
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-foreground">
                    AWS Agentic AI Nanodegree
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Competitive scholarship recipient • In progress through Nov 2026
                  </p>
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-foreground">
                    Applied AI Engineering (Self-Study)
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Project-based progression from AI fundamentals to deploying autonomous agent systems
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading text-xl font-bold flex items-center gap-2">
              <Icons.star className="w-5 h-5 text-primary" /> Key Achievements
            </h3>
            <Card className="bg-card border-border h-full">
              <CardContent className="p-5 space-y-3">
                <ul className="space-y-2.5">
                  {achievementsList.map((ach, aIdx) => (
                    <li
                      key={aIdx}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <Icons.check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Languages & Footer CTA */}
        <AnimatedSection delay={0.7} className="space-y-4 pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Languages:
              </span>
              <p className="text-sm font-medium text-foreground mt-0.5">
                English (Fluent) • Amharic (Native) • Afan Oromo (Native)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="default" asChild>
                <Link href="/contact">
                  <Icons.contact className="w-4 h-4 mr-2" /> Discuss a Project
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </ClientPageWrapper>
  );
}
