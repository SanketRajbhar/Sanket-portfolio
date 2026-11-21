import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { navItems, profile } from "@/content/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "./Container";
import { SmartLink } from "./Ph";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = navItems.map((n) => n.id);

export function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const active = useActiveSection(sectionIds, onHome);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center gap-6">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label={`${profile.name} — home`}
          onClick={() => onHome && window.scrollTo({ top: 0 })}
        >
          <span className="grid size-9 place-items-center rounded-sm bg-primary font-display text-sm font-bold tracking-tight text-primary-foreground transition-colors duration-300 group-hover:bg-accent">
            {profile.initials}
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[0.95rem] font-semibold tracking-tight">{profile.name}</span>
            <span className="mt-1 text-eyebrow text-muted-foreground">Full-stack dev</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    to="/"
                    hash={item.id}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative flex items-baseline gap-1.5 rounded-sm px-3 py-2 text-sm transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className={cn("text-meta text-[0.65rem]", isActive ? "text-accent-ink" : "")}>
                      {item.index}
                    </span>
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px origin-left bg-foreground transition-transform duration-500 ease-[var(--ease-studio)]",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
            <li>
              <SmartLink
                href={profile.resumeUrl}
                className="group/btn flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Résumé
              </SmartLink>
            </li>
          </ul>
        </nav>

        <Link
          to="/"
          hash="contact"
          className={cn(buttonVariants({ size: "sm" }), "hidden h-9 px-4 md:inline-flex")}
        >
          Start a project
          <ArrowUpRight aria-hidden className="transition-transform duration-300 group-hover/btn:rotate-45" />
        </Link>

        <ThemeToggle className="ml-auto md:ml-0" />

        <button
          type="button"
          className="grid size-11 place-items-center rounded-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6" aria-hidden>
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-6 bg-foreground transition-transform duration-500 ease-[var(--ease-studio)]",
                open && "translate-y-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px w-6 bg-foreground transition-transform duration-500 ease-[var(--ease-studio)]",
                open && "-translate-y-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background md:hidden"
      >
        <Container className="flex h-full flex-col py-8">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <li
                  key={item.id}
                  className="border-b border-border animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Link
                    to="/"
                    hash={item.id}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="text-meta text-accent-ink">{item.index}</span>
                    <span className="text-display-md">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Link to="/" hash="contact" onClick={() => setOpen(false)} className={buttonVariants({ size: "lg" })}>
              Start a project
            </Link>
            <SmartLink href={profile.resumeUrl} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Résumé
            </SmartLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
