import { useMemo, useState } from "react";

import { projectCategories, projects } from "@/content/portfolio";
import { filterProjects, usedCategories, type CategoryFilter } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

// Editorial rhythm: alternating wide/narrow columns with a staggered offset.
const layout = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-32",
  "lg:col-span-5",
  "lg:col-span-7 lg:mt-20",
];

export function WorkSection() {
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const categories = useMemo(() => usedCategories(projects, projectCategories), []);
  const visible = filterProjects(projects, filter);
  const showFilters = categories.length > 2 && projects.length > 3;

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="01"
          label="Selected work"
          title={<span id="work-title">Things I've built.</span>}
          aside="A cross-section of websites, applications and tools — each with a short case study on the problem, the approach and the build."
        />

        {showFilters ? (
          <Reveal className="mt-12">
            <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
              {(["All", ...categories] as CategoryFilter[]).map((c) => {
                const count = filterProjects(projects, c).length;
                const active = filter === c;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(c)}
                    className={cn(
                      "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300",
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border-strong text-muted-foreground hover:border-foreground hover:text-foreground",
                    )}
                  >
                    {c}
                    <span className={cn("text-meta text-[0.65rem]", active ? "text-accent" : "")}>
                      {String(count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} project{visible.length === 1 ? "" : "s"}
          {filter === "All" ? "" : ` in ${filter}`}
        </p>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
          {visible.map((p, i) => (
            <li key={p.slug} className={cn("col-span-1", filter === "All" ? layout[i % layout.length] : "lg:col-span-6")}>
              <Reveal delay={(i % 2) * 90} className="h-full">
                <ProjectCard
                  project={p}
                  index={projects.indexOf(p)}
                  size={filter === "All" && i % 4 === 0 ? "feature" : "standard"}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
