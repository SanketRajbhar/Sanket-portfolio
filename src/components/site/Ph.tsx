import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { isPlaceholder } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

/** Renders text; unfilled [PLACEHOLDERS] get a visible highlight so they're easy to spot. */
export function Ph({ value, className }: { value: string; className?: string }) {
  if (isPlaceholder(value)) {
    return <span className={cn("placeholder-token", className)}>{value}</span>;
  }
  return <span className={className}>{value}</span>;
}

/**
 * External link that refuses to render a fake URL: placeholder hrefs show a
 * labelled, non-clickable chip instead of a broken link.
 */
export function SmartLink({
  href,
  children,
  className,
  placeholderClassName,
  showIcon = true,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  placeholderClassName?: string;
  showIcon?: boolean;
  ariaLabel?: string;
}) {
  if (isPlaceholder(href)) {
    return (
      <span
        className={cn(className, "cursor-not-allowed opacity-70", placeholderClassName)}
        title={`Link not set yet: ${href}`}
        aria-disabled="true"
      >
        {children}
        <span className="sr-only"> (link not added yet)</span>
      </span>
    );
  }
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
      {showIcon && !isMail ? (
        <ArrowUpRight
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      ) : null}
      {!isMail ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
