import type { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";

/**
 * Shows the real screenshot when one is set; otherwise a clearly labelled
 * interface sketch so no fake screenshot is ever implied.
 */
export function ProjectVisual({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-md border border-border bg-secondary", className)}>
      {project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-studio)] group-hover/card:scale-[1.03]"
        />
      ) : (
        <>
          <div
            role="img"
            aria-label={`${project.imageAlt} — placeholder sketch`}
            className="bg-blueprint absolute inset-0 transition-transform duration-700 ease-[var(--ease-studio)] group-hover/card:scale-[1.03]"
          >
            <Sketch kind={project.visual} />
          </div>
          <span className="placeholder-token absolute left-3 top-3 text-[0.7rem]">[PROJECT IMAGE]</span>
        </>
      )}
    </div>
  );
}

const bar = "rounded-[2px] bg-border-strong/70";
const block = "rounded-[3px] border border-border bg-card";

function Sketch({ kind }: { kind: Project["visual"] }) {
  switch (kind) {
    case "dashboard":
      return (
        <div className="absolute inset-[10%] flex gap-3">
          <div className={cn(block, "flex w-1/5 flex-col gap-2 p-2")}>
            <div className="h-2 w-2/3 rounded-[2px] bg-accent" />
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={cn(bar, "h-1.5")} style={{ width: `${80 - i * 8}%` }} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className={cn(block, "flex flex-col gap-1.5 p-2")}>
                  <div className={cn(bar, "h-1.5 w-1/2")} />
                  <div className="h-3 w-2/3 rounded-[2px] bg-foreground/80" />
                </div>
              ))}
            </div>
            <div className={cn(block, "flex flex-1 items-end gap-[4%] p-3")}>
              {[40, 65, 50, 80, 58, 92, 70, 85].map((h, i) => (
                <div
                  key={i}
                  className={cn("flex-1 rounded-t-[2px]", i === 5 ? "bg-accent" : "bg-foreground/15")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    case "website":
      return (
        <div className={cn(block, "absolute inset-[10%] flex flex-col gap-3 p-4")}>
          <div className="flex items-center justify-between">
            <div className="h-2 w-10 rounded-[2px] bg-foreground/80" />
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={cn(bar, "h-1.5 w-6")} />
              ))}
            </div>
          </div>
          <div className="mt-2 flex flex-1 gap-4">
            <div className="flex flex-1 flex-col justify-center gap-2">
              <div className="h-4 w-11/12 rounded-[2px] bg-foreground/85" />
              <div className="h-4 w-3/4 rounded-[2px] bg-foreground/85" />
              <div className={cn(bar, "mt-2 h-1.5 w-2/3")} />
              <div className="mt-2 h-4 w-16 rounded-[2px] bg-accent" />
            </div>
            <div className="w-2/5 rounded-[3px] bg-foreground/10" />
          </div>
        </div>
      );
    case "app":
      return (
        <div className="absolute inset-[10%] flex gap-3">
          <div className={cn(block, "flex w-2/5 flex-col gap-2 p-2")}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn("flex items-center gap-2 rounded-[2px] p-1.5", i === 1 && "bg-accent/15")}
              >
                <div className={cn("size-3 shrink-0 rounded-full", i === 1 ? "bg-accent" : "bg-foreground/20")} />
                <div className="flex flex-1 flex-col gap-1">
                  <div className={cn(bar, "h-1.5 w-3/4")} />
                  <div className={cn(bar, "h-1 w-1/2 opacity-60")} />
                </div>
              </div>
            ))}
          </div>
          <div className={cn(block, "flex flex-1 flex-col gap-2 p-3")}>
            <div className="h-3 w-1/2 rounded-[2px] bg-foreground/80" />
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={cn(bar, "h-1.5")} style={{ width: `${95 - i * 9}%` }} />
            ))}
            <div className="mt-auto flex justify-end">
              <div className="h-4 w-14 rounded-[2px] bg-foreground" />
            </div>
          </div>
        </div>
      );
    case "terminal":
      return (
        <div className="absolute inset-[10%] flex flex-col gap-2 rounded-[3px] bg-ink p-4">
          {[70, 45, 85, 30, 60, 52].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-accent" />
              <div
                className={cn("h-1.5 rounded-[2px]", i === 3 ? "bg-signal/70" : "bg-ink-foreground/30")}
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
      );
    case "commerce":
      return (
        <div className="absolute inset-[10%] grid grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={cn(block, "flex flex-col gap-1.5 p-1.5")}>
              <div className={cn("flex-1 rounded-[2px]", i === 1 ? "bg-accent/30" : "bg-foreground/10")} />
              <div className={cn(bar, "h-1.5 w-3/4")} />
              <div className="h-1.5 w-1/3 rounded-[2px] bg-foreground/70" />
            </div>
          ))}
        </div>
      );
    case "flow":
      return (
        <div className="absolute inset-[12%]">
          <svg viewBox="0 0 200 120" className="h-full w-full text-border-strong" preserveAspectRatio="xMidYMid meet">
            <path d="M40 60 H80 M120 60 H160 M100 40 V20 H160 M100 80 V100 H160" stroke="currentColor" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
            <rect x="10" y="48" width="30" height="24" rx="2" className="fill-card stroke-current" />
            <rect x="80" y="40" width="40" height="40" rx="2" className="fill-accent" />
            {[8, 48, 88].map((y) => (
              <rect key={y} x="160" y={y} width="30" height="24" rx="2" className="fill-card stroke-current" />
            ))}
          </svg>
        </div>
      );
  }
}
