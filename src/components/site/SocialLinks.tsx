import { socials } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { SmartLink } from "./Ph";

export function SocialLinks({ className, tone = "paper" }: { className?: string; tone?: "paper" | "ink" }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      {socials.map((s) => (
        <li key={s.label}>
          <SmartLink
            href={s.href}
            className={cn(
              "group/btn inline-flex min-h-11 items-center gap-1 text-meta uppercase tracking-[0.12em] transition-colors",
              tone === "ink" ? "text-ink-foreground hover:text-accent" : "text-foreground hover:text-accent-ink",
            )}
            placeholderClassName="decoration-dashed underline underline-offset-4"
          >
            {s.label}
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
