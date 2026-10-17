"use client";

import { motion } from "framer-motion";
import { Norican } from "next/font/google";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import { Icons } from "@/components/common/icons";
import { MobileNav } from "@/components/common/mobile-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { GitHubStarBadge } from "./github-star-badge";
import { ModeToggle } from "./mode-toggle";

interface MainNavProps {
  items?: any[];
  children?: React.ReactNode;
}

const norican = Norican({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

// Animation variants for the navigation items
const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* Left section: Logo & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <motion.button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Menu"
        >
          {showMobileMenu ? <Icons.close className="h-5 w-5" /> : <Icons.menu className="h-5 w-5" />}
          <span className="font-bold text-sm">Menu</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn(norican.className, "text-2xl md:text-3xl")}>
              {siteConfig.authorName}
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Centered navigation links for Desktop */}
      {items?.length ? (
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10 absolute left-1/2 transform -translate-x-1/2">
          {items?.map((item, index) => {
            const isActive = item.href.startsWith(`/${segment}`) || (segment === null && item.href === "/");
            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "relative flex items-center whitespace-nowrap text-sm font-medium transition-colors hover:text-foreground/85 py-1 px-0.5",
                    isActive
                      ? "text-foreground after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      ) : null}

      {/* Right section: Action Buttons */}
      <div className="flex items-center gap-3">
        <GitHubStarBadge />
        <ModeToggle />
      </div>

      {showMobileMenu && items && (
        <MobileNav items={items}>
          <div className="flex flex-col gap-3 mt-4 w-full">
            <GitHubStarBadge className="w-full justify-center" />
            <ModeToggle />
          </div>
        </MobileNav>
      )}
    </div>
  );
}
