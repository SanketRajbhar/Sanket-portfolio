import { achievements, journey, testimonials } from "@/content/portfolio";
import { Container } from "./Container";
import { Ph } from "./Ph";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function JourneySection() {
  if (journey.length === 0) return null;
  return (
    <section id="journey" aria-labelledby="journey-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeader index="06" label="Journey" title={<span id="journey-title">Where I've been building.</span>} />
        <ol className="mt-14 border-t border-foreground">
          {journey.map((j, i) => (
            <li key={i}>
              <Reveal delay={i * 70}>
                <div className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-border py-7">
                  <p className="col-span-12 text-meta text-muted-foreground lg:col-span-3">
                    <Ph value={j.period} />
                  </p>
                  <div className="col-span-12 lg:col-span-4">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      <Ph value={j.title} />
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      <Ph value={j.org} />
                    </p>
                  </div>
                  <p className="col-span-12 leading-relaxed text-muted-foreground lg:col-span-3">
                    <Ph value={j.summary} />
                  </p>
                  <ul className="col-span-12 flex flex-wrap gap-1.5 text-xs lg:col-span-2 lg:justify-end">
                    {j.tech.map((t) => (
                      <li key={t}>
                        <Ph value={t} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Renders only when verified numbers are supplied in the content file. */
export function AchievementsSection() {
  if (achievements.length === 0) return null;
  return (
    <section aria-label="Milestones" className="border-y border-border py-16">
      <Container>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {achievements.map((a) => (
            <div key={a.label}>
              <dd className="text-display-lg">{a.value}</dd>
              <dt className="mt-2 text-eyebrow text-muted-foreground">{a.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/** Renders only when real testimonials are supplied in the content file. */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeader index="06b" label="Kind words" title={<span id="testimonials-title">What collaborators say.</span>} />
        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="border-t border-foreground pt-6">
                <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight">
                  <span className="text-accent">“</span>
                  {t.quote}
                  <span className="text-accent">”</span>
                </blockquote>
                <figcaption className="mt-6 text-meta text-muted-foreground">
                  {t.name} — {t.role}, {t.company}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
