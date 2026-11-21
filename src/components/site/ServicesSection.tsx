import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/content/portfolio";
import { Container } from "./Container";
import { Ph } from "./Ph";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="04"
          label="Services"
          title={<span id="services-title">What you can hire me for.</span>}
          aside="From a single landing page to a full product. Each engagement starts with the problem, not the tech."
        />

        <ul className="mt-14 border-t border-foreground">
          {services.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={(i % 3) * 60}>
                <div className="group grid grid-cols-12 gap-x-6 gap-y-3 border-b border-border py-8 transition-colors duration-500 hover:bg-secondary/60 sm:px-2">
                  <span className="col-span-2 text-meta text-muted-foreground sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="col-span-10 font-display text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent-ink sm:col-span-11 lg:col-span-4">
                    {s.title}
                  </h3>
                  <div className="col-span-12 sm:col-span-11 sm:col-start-2 lg:col-span-4 lg:col-start-auto">
                    <p className="leading-relaxed text-foreground">{s.description}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="text-eyebrow text-accent-ink">Solves → </span>
                      {s.problem}
                    </p>
                  </div>
                  <ul className="col-span-12 flex flex-wrap content-start gap-1.5 sm:col-span-11 sm:col-start-2 lg:col-span-3 lg:col-start-auto lg:justify-end">
                    {s.deliverables.map((d) => (
                      <li key={d} className="text-xs">
                        <Ph value={d} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10 flex justify-end">
          <Link to="/" hash="contact" className="group inline-flex items-center gap-2 font-display text-xl font-medium link-underline">
            Not sure which fits? Let's talk it through
            <ArrowUpRight aria-hidden className="size-5 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
