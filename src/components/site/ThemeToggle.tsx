import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";

function currentTheme(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function apply(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode etc. — theme still applies for this visit.
  }
}

/** Light/dark switch. The initial theme is set by an inline script in __root before paint. */
export function ThemeToggle({ className }: { className?: string }) {
  // null until mounted so server and client first renders match.
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  const toggle = () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    apply(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "grid size-9 place-items-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun aria-hidden className="size-4" />
      ) : (
        <Moon aria-hidden={theme !== null} className={cn("size-4", theme === null && "opacity-0")} />
      )}
    </button>
  );
}
