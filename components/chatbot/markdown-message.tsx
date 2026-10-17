import React from "react";
import Link from "next/link";

interface MarkdownMessageProps {
  content: string;
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content }) => {
  // Parse paragraphs and formatting
  const lines = content.split("\n");

  const renderFormattedText = (text: string) => {
    // Match markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(renderBoldAndCode(text.substring(lastIndex, matchIndex)));
      }

      const linkText = match[1];
      const linkHref = match[2];
      const isInternal = linkHref.startsWith("/");

      if (isInternal) {
        parts.push(
          <Link
            key={matchIndex}
            href={linkHref}
            className="text-primary font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {linkText}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={matchIndex}
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {linkText}
          </a>
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(renderBoldAndCode(text.substring(lastIndex)));
    }

    return parts.length > 0 ? parts : renderBoldAndCode(text);
  };

  const renderBoldAndCode = (text: string) => {
    // Regex for bold **text**, inline `code`, and italic *text*
    const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

    return tokens.map((token, idx) => {
      if (token.startsWith("**") && token.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-foreground">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (token.startsWith("`") && token.endsWith("`")) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs font-mono border border-border/50"
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
        return (
          <em key={idx} className="italic text-muted-foreground">
            {token.slice(1, -1)}
          </em>
        );
      }
      return token;
    });
  };

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={lIdx} className="h-1.5" />;
        }

        // Bullet point
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="flex-1">{renderFormattedText(trimmed.slice(2))}</div>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-2">
              <span className="font-semibold text-xs text-primary mt-0.5 min-w-[16px]">
                {numMatch[1]}.
              </span>
              <div className="flex-1">{renderFormattedText(numMatch[2])}</div>
            </div>
          );
        }

        // Header ###
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={lIdx} className="font-bold text-foreground text-sm pt-2">
              {renderFormattedText(trimmed.slice(4))}
            </h4>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={lIdx} className="font-bold text-foreground text-base pt-2">
              {renderFormattedText(trimmed.slice(3))}
            </h3>
          );
        }

        return <p key={lIdx}>{renderFormattedText(line)}</p>;
      })}
    </div>
  );
};
