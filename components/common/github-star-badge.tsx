"use client";

import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/common/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type GitHubStarBadgeProps = {
  className?: string;
};

export function GitHubStarBadge({ className }: GitHubStarBadgeProps) {
  return (
    <Link
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${siteConfig.authorName} on GitHub`}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border border-border bg-background/60 px-3 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-accent hover:text-foreground",
        className
      )}
    >
      <Icons.gitHub className="h-3.5 w-3.5" />
      <span className="font-medium">GitHub</span>
      <span className="hidden sm:inline text-muted-foreground/60">·</span>
      <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground">
        @{siteConfig.username}
      </span>
    </Link>
  );
}
