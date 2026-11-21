import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Ph, SmartLink } from "./Ph";
import { ProjectVisual } from "./ProjectVisual";

export function TechTags({ tech, className }: { tech: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {tech.map((t) => (
        <li key={t} className="rounded-sm border border-border px-2 py-0.5 text-meta text-[0.7rem] text-muted-foreground">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({
  project,
  index,
  size = "standard",
}: {
  project: Project;
  index: number;
  size?: "feature" | "standard";
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article className="group/card flex h-full flex-col">
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        tabIndex={-1}
        aria-hidden
        className="block"
      >
        <ProjectVisual
          project={project}
          className={cn(size === "feature" ? "aspect-[4/3] lg:aspect-[16/11]" : "aspect-[4/3]")}
        />
      </Link>

      <div className="mt-5 flex items-center gap-3 text-meta text-muted-foreground">
        <span className="text-foreground">P/{num}</span>
        <span aria-hidden className="h-px w-4 bg-border-strong" />
        <span>{project.category}</span>
        <span className="ml-auto">
          <Ph value={project.year} />
        </span>
      </div>

      <h3 className="mt-3 text-display-md">
        <Link
          to="/work/$slug"
          params={{ slug: project.slug }}
          className="transition-colors duration-300 hover:text-accent-ink focus-visible:text-accent-ink"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
        <Ph value={project.summary} />
      </p>

      <TechTags tech={project.tech} className="mt-4" />

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm">
        <Link
          to="/work/$slug"
          params={{ slug: project.slug }}
          className="group inline-flex min-h-11 items-center gap-1.5 font-medium"
          aria-label={`Read the case study for ${project.name}`}
        >
          Case study
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <SmartLink href={project.liveUrl} className="group/btn inline-flex min-h-11 items-center gap-1 text-muted-foreground hover:text-foreground">
          Live demo
        </SmartLink>
        <SmartLink href={project.repoUrl} className="group/btn inline-flex min-h-11 items-center gap-1 text-muted-foreground hover:text-foreground">
          Source
        </SmartLink>
      </div>
    </article>
  );
}
