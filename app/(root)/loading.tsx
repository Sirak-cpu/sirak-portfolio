import { Icons } from "@/components/common/icons";

export default function Loading() {
  return (
    <div className="container flex min-h-[calc(100vh-12rem)] items-center justify-center py-20">
      <div className="flex flex-col items-center space-y-4">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading content...
        </p>
      </div>
    </div>
  );
}
