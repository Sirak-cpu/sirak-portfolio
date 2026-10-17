"use client";

import { useState } from "react";
import Link from "next/link";

import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { Icons } from "@/components/common/icons";
import ProjectCard from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { ProjectInterface } from "@/config/projects";

interface FeaturedProjectsGridProps {
  projects: ProjectInterface[];
  initialCount?: number;
}

export function FeaturedProjectsGrid({
  projects,
  initialCount = 3,
}: FeaturedProjectsGridProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, initialCount);
  const hasMore = projects.length > initialCount;

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-stretch">
        {visibleProjects.map((project, index) => (
          <AnimatedSection
            key={project.id}
            delay={0.1 * ((index % initialCount) + 1)}
            direction="up"
            className="h-full w-full min-w-0"
          >
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>

      {hasMore && (
        <AnimatedText
          delay={0.4}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          {!showAll ? (
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setShowAll(true)}
            >
              View All <Icons.chevronDown className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setShowAll(false)}
              >
                Show Less <Icons.chevronUp className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/projects">
                <Button variant="ghost" className="rounded-xl">
                  Projects Catalog <Icons.chevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </AnimatedText>
      )}
    </div>
  );
}
