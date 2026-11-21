import { about, profile } from "@/content/portfolio";
import { Container } from "./Container";
import { Ph } from "./Ph";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeader index="02" label="About" title={<span id="about-title">The person behind the commits.</span>} />

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              {about.photo ? (
                <img
                  src={about.photo}
                  alt={`Portrait of ${profile.name}`}
                  loading="lazy"
                  className="mb-8 aspect-[4/5] w-full max-w-sm rounded-md object-cover grayscale"
                />
              ) : null}
              <p className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                Hi, I'm {profile.name.split(" ")[0]}. <Ph value={about.intro} />
              </p>
              <p className="mt-6 text-meta text-muted-foreground">
                <Ph value={profile.title} /> · <Ph value={profile.location} />
              </p>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p>
                    <Ph value={p} />
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <dl className="mt-12 divide-y divide-border border-y border-border">
                {about.notes.map((n) => (
                  <div key={n.label} className="grid grid-cols-3 gap-4 py-4">
                    <dt className="text-eyebrow text-muted-foreground">{n.label}</dt>
                    <dd className="col-span-2 text-foreground">
                      <Ph value={n.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
