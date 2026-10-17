import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Icons } from "@/components/common/icons";
import ProjectDescription from "@/components/projects/project-description";
import { buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn, formatDateFromObj } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export function generateStaticParams() {
  return Projects.map((project) => ({
    projectId: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = Projects.find((val) => val.id === projectId);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.companyName} | Projects`,
    description: project.shortDescription,
    alternates: {
      canonical: `${siteConfig.url}/projects/${projectId}`,
    },
    openGraph: {
      title: `${project.companyName} | Sirak Embibel`,
      description: project.shortDescription,
      type: "article",
      url: `${siteConfig.url}/projects/${projectId}`,
      images: [
        {
          url: project.companyLogoImg.startsWith("http")
            ? project.companyLogoImg
            : `${siteConfig.url}${project.companyLogoImg}`,
          width: 1280,
          height: 720,
          alt: project.companyName,
        },
      ],
    },
  };
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default async function Project({ params }: ProjectPageProps) {
  const { projectId } = await params;
  let project = Projects.find((val) => val.id === projectId);
  if (!project) {
    redirect("/projects");
  }

  return (
    <article className="container relative max-w-4xl px-4 sm:px-6 md:px-8 py-6 lg:py-10">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        All Projects
      </Link>
      <div>
        <time
          dateTime={project.startDate.toISOString()}
          className="block text-sm text-muted-foreground"
        >
          {formatDateFromObj(project.startDate)}
        </time>
        <h1 className="flex items-center justify-between mt-2 font-heading text-4xl leading-tight lg:text-5xl">
          {project.companyName}
          <div className="flex items-center">
            {project.youtubeLink && (
              <CustomTooltip text="Watch video walkthrough on YouTube.">
                <Link
                  href={project.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.youtube className="w-6 ml-4 text-muted-foreground hover:text-red-500 transition-colors" />
                </Link>
              </CustomTooltip>
            )}
            {project.githubLink && (
              <CustomTooltip text="Link to the source code.">
                <Link href={project.githubLink} target="_blank">
                  <Icons.gitHub className="w-6 ml-4 text-muted-foreground hover:text-foreground" />
                </Link>
              </CustomTooltip>
            )}
            {project.websiteLink && (
              <CustomTooltip text="Please note that some project links may be temporarily unavailable.">
                <Link href={project.websiteLink} target="_blank">
                  <Icons.externalLink className="w-6 ml-4 text-muted-foreground hover:text-foreground " />
                </Link>
              </CustomTooltip>
            )}
          </div>
        </h1>
        <ChipContainer textArr={project.category} />
        <div className="mt-4 flex space-x-4">
          <Link
            href={siteConfig.links.github}
            className="flex items-center space-x-2 text-sm"
          >
          
            <Image
              src={profileImg}
              alt={"Sirak"}            
              width={42}
              height={42}
              className="rounded-full bg-background"
            />
         

            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{"Sirak Embibel"}</p>
              <p className="text-[12px] text-muted-foreground">
                @{siteConfig.username}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="my-8 w-full overflow-hidden rounded-lg border bg-muted shadow-sm">
        <Image
          src={project.companyLogoImg}
          alt={project.companyName}
          width={1280}
          height={720}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="w-full h-auto transition-colors"
          priority
        />
      </div>

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Tech Stack
        </h2>
        <ChipContainer textArr={project.techStack} />
      </div>

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Description
        </h2>
        <ProjectDescription
          paragraphs={project.descriptionDetails.paragraphs}
          bullets={project.descriptionDetails.bullets}
        />
      </div>

      {project.youtubeLink && getYouTubeId(project.youtubeLink) && (
        <div className="mb-10">
          <h2 className="font-heading text-3xl leading-tight lg:text-3xl mb-4 flex items-center gap-2">
            <Icons.youtube className="w-8 h-8 text-red-500 flex-shrink-0" />
            <span>Video Walkthrough</span>
          </h2>
          <div className="relative w-full aspect-video overflow-hidden rounded-lg border bg-muted shadow-sm">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(project.youtubeLink)}`}
              title={`${project.companyName} Video Walkthrough`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          <div className="mt-2 text-right">
            <Link
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-red-500 transition-colors inline-flex items-center gap-1 font-medium"
            >
              Watch on YouTube <Icons.externalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-5">
          Page Info
        </h2>
        {project.pagesInfoArr.map((page) => (
          <div key={page.title}>
            <h3 className="flex items-center font-heading text-xl leading-tight lg:text-xl mt-3">
              <Icons.star className="h-5 w-5 mr-2" /> {page.title}
            </h3>
            <div>
              <p>{page.description}</p>
              {page.imgArr.map((img) => (
                <div key={img} className="my-6 w-full overflow-hidden rounded-lg border bg-muted shadow-sm">
                  <Image
                    src={img}
                    alt={page.title || img}
                    width={1280}
                    height={720}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    className="w-full h-auto transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>
    </article>
  );
}
