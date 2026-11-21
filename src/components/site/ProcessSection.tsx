import { processSteps } from "@/content/portfolio";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden bg-ink py-24 text-ink-foreground sm:py-32">
      <div aria-hidden className="bg-blueprint-ink pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <SectionHeader
          tone="ink"
          index="05"
          label="Process"
          title={<span id="process-title">From rough idea to running product.</span>}
          aside="Six stages, short feedback loops. You see working software early and often."
        />

        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s, i) => (
            <li key={s.n} className="bg-ink">
              <Reveal delay={(i % 3) * 90} className="group flex h-full flex-col p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl font-semibold tracking-tighter text-ink-border transition-colors duration-500 group-hover:text-accent">
                    {s.n}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-ink-border" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
