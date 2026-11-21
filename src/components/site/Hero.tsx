import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";

import { profile, projectCategories } from "@/content/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Availability } from "./Availability";
import { Container } from "./Container";
import { Ph, SmartLink } from "./Ph";
import { SocialLinks } from "./SocialLinks";
import { Terminal } from "./Terminal";

export function Hero() {
  const lines = profile.headline;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32">
      <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Container className="relative">
        <div className="flex flex-wrap items-center gap-3 border-t border-foreground pt-4 text-eyebrow text-muted-foreground animate-in fade-in duration-700">
          <span className="text-foreground">§ 00</span>
          <span aria-hidden className="h-px w-6 bg-accent" />
          <span>{profile.introLabel}</span>
          <span aria-hidden className="ml-auto hidden md:inline">
            <Ph value={profile.location} /> — <Ph value={profile.timezone} />
          </span>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-14">
          <div className="col-span-12 lg:col-span-7">
            <Availability className="animate-in fade-in slide-in-from-bottom-2 duration-700" />
            <h1 id="hero-title" className="mt-8 text-display-xl text-foreground">
              <span className="sr-only">{profile.name} — </span>
              {lines.map((line, i) => {
                const isEmph = (line as string).endsWith(profile.headlineEmphasis);
                const pre = isEmph ? line.slice(0, line.length - profile.headlineEmphasis.length) : line;
                return (
                  <span
                    key={i}
                    className="block overflow-hidden pb-[0.06em] animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-1000 ease-[var(--ease-studio)]"
                    style={{ animationDelay: `${150 + i * 110}ms` }}
                  >
                    {pre}
                    {isEmph ? (
                      <span className="relative whitespace-nowrap text-accent">
                        {profile.headlineEmphasis}
                        <svg
                          aria-hidden
                          viewBox="0 0 300 14"
                          preserveAspectRatio="none"
                          className="absolute -bottom-[0.06em] left-0 h-[0.12em] w-[92%] text-accent"
                        >
                          <path d="M2 10 C 80 2, 180 2, 298 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                      </span>
                    ) : null}
                  </span>
                );
              })}
            </h1>

            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground animate-in fade-in fill-mode-both duration-1000"
              style={{ animationDelay: "550ms" }}
            >
              I'm <span className="text-foreground">{profile.name}</span>. <Ph value={profile.intro} />
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700"
              style={{ animationDelay: "700ms" }}
            >
              <Link to="/" hash="work" className={buttonVariants({ size: "lg" })}>
                Explore my work
                <ArrowDown aria-hidden className="transition-transform duration-300 group-hover/btn:translate-y-0.5" />
              </Link>
              <Link to="/" hash="contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Let's work together
                <ArrowUpRight aria-hidden className="transition-transform duration-300 group-hover/btn:rotate-45" />
              </Link>
              <SmartLink
                href={profile.resumeUrl}
                showIcon={false}
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "px-4")}
              >
                <FileText aria-hidden />
                Résumé
              </SmartLink>
            </div>
          </div>

          <div
            className="crosshair col-span-12 self-end lg:col-span-5 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-1000"
            style={{ animationDelay: "400ms" }}
          >
            <Terminal />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-meta text-muted-foreground md:hidden">
            <Ph value={profile.location} />
          </div>
          <SocialLinks />
          <span className="hidden text-eyebrow text-muted-foreground sm:inline">Scroll ↓ to index</span>
        </div>
      </Container>

      <div className="overflow-hidden border-y border-foreground bg-foreground py-3 text-background" aria-hidden>
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...projectCategories, ...projectCategories].map((c, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-xl font-medium tracking-tight">
              {c}
              <span className="text-accent">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
