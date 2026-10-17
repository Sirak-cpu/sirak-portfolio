"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, Github, Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function GithubRedirectCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-full h-fit max-w-sm overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102 mt-5 border-border/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className="font-heading text-xl tracking-tight lg:text-2xl font-bold">
          Let&apos;s Build Together
        </h2>
        <p className="mt-2 mb-6 text-sm text-muted-foreground leading-relaxed">
          Open to full-time roles, contracts, and consultancy in AI Automation, n8n agentic systems, and AWS Bedrock RAG.
        </p>

        <div className="w-full space-y-2.5 text-left text-xs text-muted-foreground bg-muted/40 p-3.5 rounded-xl border border-border/50 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-foreground font-medium truncate"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <a
              href={`tel:${siteConfig.phone}`}
              className="hover:text-foreground font-medium"
            >
              {siteConfig.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>Ethiopia (Remote Available)</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 sm:px-8 pb-6 pt-0 flex flex-col gap-2.5">
        <Link
          href={siteConfig.links.github}
          target="_blank"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full flex items-center justify-center gap-2"
          )}
        >
          <Github className="w-4 h-4" />
          <span>Explore GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </Link>
        <a
          href={`mailto:${siteConfig.email}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full flex items-center justify-center gap-2"
          )}
        >
          <Mail className="w-4 h-4" />
          <span>Email Sirak</span>
        </a>
      </CardFooter>
      <div
        className={`h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-all duration-300 ease-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </Card>
  );
}
