"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("App error boundary caught:", error);
  }, [error]);

  return (
    <div className="container flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-4">
        <div className="rounded-full bg-destructive/10 p-4 text-destructive">
          <Icons.warning className="h-10 w-10" />
        </div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred while loading this page. You can try refreshing
          the component or navigating back to the homepage.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()} variant="default">
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
