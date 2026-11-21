import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Signature section header: § index, mono label, coordinate meta, display title. */
export function SectionHeader({
  index,
  label,
  title,
  aside,
  tone = "paper",
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  tone?: "paper" | "ink";
  className?: string;
}) {
  const ink = tone === "ink";
  return (
    <Reveal className={cn("grid grid-cols-12 gap-x-6 gap-y-6", className)}>
      <div
        className={cn(
          "col-span-12 flex items-center gap-3 border-t pt-4 text-eyebrow",
          ink ? "border-ink-border text-ink-muted" : "border-foreground text-muted-foreground",
        )}
      >
        <span className={ink ? "text-ink-foreground" : "text-foreground"}>§ {index}</span>
        <span aria-hidden className="h-px w-6 bg-accent" />
        <span>{label}</span>
        <span aria-hidden className="ml-auto hidden sm:inline">
          [x:{index} · y:00]
        </span>
      </div>
      <h2
        className={cn(
          "col-span-12 text-display-lg lg:col-span-8",
          ink ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {aside ? (
        <div
          className={cn(
            "col-span-12 self-end text-base leading-relaxed lg:col-span-4",
            ink ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {aside}
        </div>
      ) : null}
    </Reveal>
  );
}
