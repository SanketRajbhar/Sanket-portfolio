import { Link } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";

import { navItems, profile } from "@/content/portfolio";
import { Container } from "./Container";
import { Ph, SmartLink } from "./Ph";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-background">
      <Container className="py-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <p className="text-eyebrow text-muted-foreground">§ end of file</p>
            <p className="mt-4 max-w-md font-display text-2xl font-medium leading-snug tracking-tight">
              <Ph value={profile.tagline} />
            </p>
          </div>
          <nav aria-label="Footer" className="col-span-6 lg:col-span-3">
            <p className="text-eyebrow text-muted-foreground">Index</p>
            <ul className="mt-4 space-y-1">
              {navItems.map((n) => (
                <li key={n.id}>
                  <Link to="/" hash={n.id} className="inline-flex min-h-9 items-center gap-2 link-underline">
                    <span className="text-meta text-muted-foreground">{n.index}</span>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <SmartLink href={profile.resumeUrl} className="group/btn inline-flex min-h-9 items-center gap-1">
                  Résumé
                </SmartLink>
              </li>
            </ul>
          </nav>
          <div className="col-span-6 lg:col-span-3">
            <p className="text-eyebrow text-muted-foreground">Elsewhere</p>
            <SocialLinks className="mt-4 flex-col items-start gap-y-0" />
          </div>
        </div>
      </Container>

      <div className="overflow-hidden border-t border-border">
        <Container>
          <p
            aria-hidden
            className="select-none whitespace-nowrap py-6 font-display font-semibold leading-none tracking-[-0.04em] text-foreground [font-size:clamp(3.5rem,13.5vw,13rem)] [font-variation-settings:'wdth'_85]"
          >
            {profile.name}
            <span className="text-accent">.</span>
          </p>
        </Container>
      </div>

      <Container className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-meta text-muted-foreground">
        <p>
          © {year} {profile.name}. Designed & built by hand.
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex min-h-11 items-center gap-2 transition-colors hover:text-foreground"
        >
          Back to top
          <ArrowUp aria-hidden className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </Container>
    </footer>
  );
}
