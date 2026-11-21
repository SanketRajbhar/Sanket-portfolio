import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Ph } from "./Ph";

export function Availability({ className, tone = "paper" }: { className?: string; tone?: "paper" | "ink" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-meta",
        tone === "ink" ? "border-ink-border text-ink-foreground" : "border-border-strong text-foreground",
        className,
      )}
    >
      {profile.isAvailable ? (
        <span aria-hidden className="size-2 rounded-full bg-signal animate-pulse-dot" />
      ) : (
        <span aria-hidden className="size-2 rounded-full bg-muted-foreground" />
      )}
      <span className="sr-only">Status: </span>
      <Ph value={profile.availability} />
    </span>
  );
}
