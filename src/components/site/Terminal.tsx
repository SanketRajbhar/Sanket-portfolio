import { useEffect, useRef, useState, type FormEvent } from "react";

import { profile, projects, skillGroups, socials } from "@/content/portfolio";
import { isPlaceholder } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type Line = { kind: "cmd" | "out" | "dim" | "accent"; text: string };

const COMMANDS = ["whoami", "ls work", "stack", "status", "contact", "help", "clear"] as const;

function run(cmd: string): Line[] {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "whoami":
      return [
        { kind: "accent", text: profile.name },
        { kind: "out", text: profile.title },
        { kind: "dim", text: `${profile.location} · ${profile.timezone}` },
      ];
    case "ls":
    case "ls work":
      return projects.map((p, i) => ({
        kind: "out" as const,
        text: `${String(i + 1).padStart(2, "0")}  ${p.name.padEnd(20)} ${p.category}`,
      }));
    case "stack":
      return skillGroups.map((g) => ({ kind: "out" as const, text: `${g.title.padEnd(18)} ${g.items.join(", ")}` }));
    case "status":
      return [
        {
          kind: profile.isAvailable ? "accent" : "dim",
          text: `${profile.isAvailable ? "●" : "○"} ${profile.availability}`,
        },
      ];
    case "contact":
      return [
        { kind: "out", text: `email   ${profile.email}` },
        ...socials.map((s) => ({
          kind: (isPlaceholder(s.href) ? "dim" : "out") as Line["kind"],
          text: `${s.label.toLowerCase().padEnd(8)}${s.href}`,
        })),
      ];
    case "help":
      return [{ kind: "dim", text: `available: ${COMMANDS.join(" · ")}` }];
    case "":
      return [];
    default:
      return [{ kind: "dim", text: `command not found: ${cmd}. try "help"` }];
  }
}

/** Signature hero visual: a small working terminal driven by the portfolio content. */
export function Terminal({ className }: { className?: string }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [typed, setTyped] = useState("");
  const [input, setInput] = useState("");
  const [booting, setBooting] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence: type "whoami", then print the result.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const first = "whoami";
    if (reduce) {
      setLines([{ kind: "cmd" as const, text: first }, ...run(first)]);
      setBooting(false);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setTyped(first.slice(0, i));
      if (i < first.length) timer = setTimeout(step, 90);
      else
        timer = setTimeout(() => {
          setTyped("");
          setLines([{ kind: "cmd" as const, text: first }, ...run(first)]);
          setBooting(false);
        }, 380);
    };
    timer = setTimeout(step, 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const exec = (cmd: string) => {
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    setLines((prev): Line[] => [...prev, { kind: "cmd" as const, text: cmd }, ...run(cmd)].slice(-60));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    exec(input);
    setInput("");
  };

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border border-ink-border bg-ink text-ink-foreground shadow-lift",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-ink-border px-4 py-3">
        <span aria-hidden className="size-2.5 rounded-full bg-ink-border" />
        <span aria-hidden className="size-2.5 rounded-full bg-ink-border" />
        <span aria-hidden className="size-2.5 rounded-full bg-accent" />
        <span className="ml-3 text-meta text-ink-muted">~/portfolio — zsh</span>
        <span className="ml-auto text-meta text-ink-muted">v1.0</span>
      </div>

      <div
        ref={scrollRef}
        className="bg-blueprint-ink h-64 overflow-y-auto px-4 py-4 font-mono text-[0.8rem] leading-relaxed sm:h-72"
        onClick={() => inputRef.current?.focus()}
      >
        <p className="text-ink-muted">Welcome. Type a command or tap one below.</p>
        <div role="log" aria-live="polite" aria-label="Terminal output">
          {lines.map((l, i) => (
            <p
              key={i}
              className={cn(
                "whitespace-pre-wrap break-words",
                l.kind === "cmd" && "mt-2 text-ink-foreground",
                l.kind === "out" && "text-ink-foreground/85",
                l.kind === "dim" && "text-ink-muted",
                l.kind === "accent" && "text-accent",
              )}
            >
              {l.kind === "cmd" ? (
                <>
                  <span className="text-accent" aria-hidden>
                    →{" "}
                  </span>
                  {l.text}
                </>
              ) : (
                l.text
              )}
            </p>
          ))}
        </div>
        {booting ? (
          <p className="mt-2">
            <span className="text-accent" aria-hidden>
              →{" "}
            </span>
            {typed}
            <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-ink-foreground animate-blink" />
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-2 flex items-center">
            <span className="text-accent" aria-hidden>
              →&nbsp;
            </span>
            <label htmlFor="terminal-input" className="sr-only">
              Terminal command
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-ink-foreground caret-accent outline-none placeholder:text-ink-muted/60 focus-visible:outline-none"
              placeholder="help"
            />
          </form>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-ink-border p-3">
        {COMMANDS.filter((c) => c !== "help").map((c) => (
          <button
            key={c}
            type="button"
            disabled={booting}
            onClick={() => exec(c)}
            className="rounded-sm border border-ink-border px-2.5 py-1.5 font-mono text-[0.72rem] text-ink-muted transition-colors hover:border-accent hover:text-ink-foreground disabled:opacity-40"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
