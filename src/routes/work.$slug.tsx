import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { profile, projects, type Project } from "@/content/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/site/Container";
import { Ph, SmartLink } from "@/components/site/Ph";
import { ProjectCard, TechTags } from "@/components/site/ProjectCard";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { Reveal } from "@/components/site/Reveal";
import { getAdjacent, getProject, getRelated, isPlaceholder } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(projects, params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData }) => {
    const project = loaderData ? getProject(projects, loaderData.slug) : undefined;
    if (!project) {
      return { meta: [{ title: `Project not found — ${profile.name}` }, { name: "robots", content: "noindex" }] };
    }
    const title = `${project.name} — Case study by ${profile.name}`;
    const description = isPlaceholder(project.summary)
      ? `${project.category} case study by ${profile.name}: the problem, the approach and the build.`
      : project.summary;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <p className="text-eyebrow text-muted-foreground">§ 404</p>
      <h1 className="mt-4 text-display-lg">That project isn't here.</h1>
      <Link to="/" hash="work" className={cn(buttonVariants(), "mt-8")}>
        <ArrowLeft aria-hidden /> Back to all work
      </Link>
    </Container>
  );
}

function Block({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section id={id} aria-labelledby={`${id}-h`} className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-border py-10">
        <div className="col-span-12 md:col-span-4">
          <p className="text-meta text-muted-foreground">{n}</p>
          <h2 id={`${id}-h`} className="mt-1 font-display text-2xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>
        <div className="col-span-12 text-lg leading-relaxed text-muted-foreground md:col-span-8">{children}</div>
      </section>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />
          <Ph value={it} />
        </li>
      ))}
    </ul>
  );
}

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const project = getProject(projects, slug) as Project;
  const index = projects.indexOf(project);
  const { prev, next } = getAdjacent(projects, slug);
  const related = getRelated(projects, slug, 2);

  const blocks: { id: string; title: string; render: () => ReactNode; show: boolean }[] = [
    { id: "background", title: "Background", show: true, render: () => <Ph value={project.background} /> },
    { id: "problem", title: "The problem", show: true, render: () => <Ph value={project.problem} /> },
    { id: "goals", title: "Goals & requirements", show: project.goals.length > 0, render: () => <List items={project.goals} /> },
    { id: "solution", title: "The solution", show: true, render: () => <Ph value={project.solution} /> },
    { id: "features", title: "Key features", show: project.features.length > 0, render: () => <List items={project.features} /> },
    { id: "design", title: "Design decisions", show: project.designDecisions.length > 0, render: () => <List items={project.designDecisions} /> },
    { id: "architecture", title: "Architecture", show: !!project.architecture, render: () => <Ph value={project.architecture} /> },
    { id: "tech", title: "Technologies", show: project.tech.length > 0, render: () => <TechTags tech={project.tech} /> },
    { id: "challenges", title: "Challenges", show: project.challenges.length > 0, render: () => <List items={project.challenges} /> },
    { id: "outcomes", title: "Outcomes", show: project.outcomes.length > 0, render: () => <List items={project.outcomes} /> },
  ];
  const shown = blocks.filter((b) => b.show);

  return (
    <article className="pt-24 sm:pt-28">
      <Container>
        <Link to="/" hash="work" className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          All work
        </Link>

        <header className="mt-6 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 flex flex-wrap items-center gap-3 border-t border-foreground pt-4 text-eyebrow text-muted-foreground">
            <span className="text-foreground">P/{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden className="h-px w-6 bg-accent" />
            <span>{project.category}</span>
            <span className="ml-auto">
              <Ph value={project.year} />
            </span>
          </div>
          <h1 className="col-span-12 text-display-xl animate-in fade-in slide-in-from-bottom-4 duration-700 lg:col-span-9">
            {project.name}
          </h1>
          <p className="col-span-12 text-xl leading-relaxed text-muted-foreground lg:col-span-7">
            <Ph value={project.summary} />
          </p>
          <div className="col-span-12 flex flex-wrap items-end gap-3 lg:col-span-5 lg:justify-end">
            <SmartLink href={project.liveUrl} className={buttonVariants({ size: "lg" })}>
              Visit live project
            </SmartLink>
            <SmartLink href={project.repoUrl} className={buttonVariants({ variant: "outline", size: "lg" })}>
              View source
            </SmartLink>
          </div>
        </header>

        <dl className="mt-12 grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
          {[
            ["Role", project.role],
            ["Category", project.category],
            ["Year", project.year],
            ["Stack", project.tech.join(", ")],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-r border-border p-5">
              <dt className="text-eyebrow text-muted-foreground">{k}</dt>
              <dd className="mt-2 text-sm">
                <Ph value={v ?? ""} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="group/card mt-12">
          <ProjectVisual project={project} priority className="aspect-[16/10] lg:aspect-[16/8]" />
        </div>

        {project.gallery.length > 0 ? (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {project.gallery.map((src, i) => (
              <li key={src}>
                <img
                  src={src}
                  alt={`${project.name} — screen ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-md border border-border object-cover"
                />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-20 grid grid-cols-12 gap-x-6">
          <nav aria-label="On this page" className="col-span-12 hidden lg:col-span-3 lg:block">
            <ol className="sticky top-28 space-y-1 text-sm">
              {shown.map((b, i) => (
                <li key={b.id}>
                  <a href={`#${b.id}`} className="flex gap-3 py-1 text-muted-foreground transition-colors hover:text-foreground">
                    <span className="text-meta">{String(i + 1).padStart(2, "0")}</span>
                    {b.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="col-span-12 lg:col-span-9">
            {shown.map((b, i) => (
              <Block key={b.id} id={b.id} n={String(i + 1).padStart(2, "0")} title={b.title}>
                {b.render()}
              </Block>
            ))}
          </div>
        </div>

        {(prev || next) && (
          <nav aria-label="More projects" className="mt-20 grid grid-cols-1 border-y border-foreground sm:grid-cols-2">
            {prev ? (
              <Link
                to="/work/$slug"
                params={{ slug: prev.slug }}
                className="group flex flex-col gap-2 py-8 transition-colors hover:text-accent-ink sm:pr-6"
              >
                <span className="flex items-center gap-2 text-eyebrow text-muted-foreground">
                  <ArrowLeft aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-1" /> Previous
                </span>
                <span className="text-display-md">{prev.name}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link
                to="/work/$slug"
                params={{ slug: next.slug }}
                className="group flex flex-col items-end gap-2 border-t border-border py-8 text-right transition-colors hover:text-accent-ink sm:border-l sm:border-t-0 sm:pl-6"
              >
                <span className="flex items-center gap-2 text-eyebrow text-muted-foreground">
                  Next <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-display-md">{next.name}</span>
              </Link>
            ) : null}
          </nav>
        )}

        {related.length > 0 ? (
          <section aria-labelledby="related-h" className="py-24">
            <h2 id="related-h" className="text-eyebrow text-muted-foreground">Related projects</h2>
            <ul className="mt-8 grid gap-12 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} index={projects.indexOf(p)} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </article>
  );
}
