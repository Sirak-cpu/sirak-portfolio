import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t border-border/40 py-8 mt-12 bg-background/50", className)}>
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          © {new Date().getFullYear()} Sirak Embibel. AI Automation & Applied AI Engineer.
        </p>
        <div className="flex items-center justify-center gap-2">
          {SocialLinks.map((item, ind) => (
            <CustomTooltip icon={item.icon} text={item.username} key={ind}>
              <Link
                href={item.link}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  }),
                  "h-9 w-9 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
              </Link>
            </CustomTooltip>
          ))}
        </div>
      </div>
    </footer>
  );
}
