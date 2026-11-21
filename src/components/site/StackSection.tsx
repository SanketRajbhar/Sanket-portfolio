import { skillGroups } from "@/content/portfolio";
import { Container } from "./Container";
import { Ph } from "./Ph";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function StackSection() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="bg-secondary py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="03"
          label="Stack"
          title={<span id="stack-title">Tools I reach for.</span>}
          aside="Grouped by where they sit in a product. No made-up percentages — just what I use to ship."
        />
        <Reveal className="mt-14">
          <ul className="grid grid-cols-1 border-l border-t border-border-strong sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g, i) => (
              <li
                key={g.title}
                className="group relative border-b border-r border-border-strong p-6 transition-colors duration-500 hover:bg-background sm:p-8"
              >
                <div className="flex items-center justify-between text-meta text-muted-foreground">
                  <span>S.{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="size-1.5 rounded-full bg-border-strong transition-colors duration-500 group-hover:bg-accent" />
                </div>
                <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="text-sm">
                      <Ph value={item} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
