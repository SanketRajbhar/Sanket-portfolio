import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import { z } from "zod";

import { budgetRanges, profile, projectTypes } from "@/content/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { buildMailto, isPlaceholder } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { Availability } from "./Availability";
import { Container } from "./Container";
import { Ph } from "./Ph";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

const schema = z.object({
  name: z.string().trim().min(1, "Please tell me your name.").max(100, "That name is a little long."),
  email: z.string().trim().email("That email doesn't look right.").max(255),
  projectType: z.string().min(1, "Pick the closest project type."),
  budget: z.string().max(100),
  message: z
    .string()
    .trim()
    .min(20, "A few more details help — at least 20 characters.")
    .max(2000, "Please keep it under 2000 characters."),
});

type Fields = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const empty: Fields = { name: "", email: "", projectType: "", budget: "", message: "" };

const fieldClass =
  "w-full rounded-sm border border-ink-border bg-ink-surface px-4 py-3 text-ink-foreground placeholder:text-ink-muted/70 transition-colors duration-300 hover:border-ink-muted focus-visible:border-accent focus-visible:outline-none aria-[invalid=true]:border-destructive";

export function ContactSection() {
  const uid = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const emailReady = !isPlaceholder(profile.email);

  const set = (k: keyof Fields) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot: real people never fill the hidden "company" field.
    if ((form.elements.namedItem("company") as HTMLInputElement | null)?.value) return;

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Fields;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (!emailReady) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      window.location.href = buildMailto(profile.email, parsed.data);
      setStatus("sent");
    }, 400);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 text-sm text-destructive-foreground">
        <span aria-hidden className="mr-1 text-accent">✕</span>
        {errors[k]}
      </p>
    ) : null;

  const a11y = (k: keyof Fields) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink py-24 text-ink-foreground sm:py-32">
      <div aria-hidden className="bg-blueprint-ink pointer-events-none absolute inset-0 opacity-50" />
      <Container className="relative">
        <div className="flex items-center gap-3 border-t border-ink-border pt-4 text-eyebrow text-ink-muted">
          <span className="text-ink-foreground">§ 07</span>
          <span aria-hidden className="h-px w-6 bg-accent" />
          <span>Contact</span>
          <span aria-hidden className="ml-auto hidden sm:inline">[x:07 · y:00]</span>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14">
          <Reveal className="col-span-12 lg:col-span-6">
            <h2 id="contact-title" className="text-display-xl">
              Got something
              <br />
              worth <span className="text-accent">building?</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-muted">
              Tell me what you're working on — a rough idea is fine. I'll reply with honest thoughts on scope,
              approach and whether I'm the right fit.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-eyebrow text-ink-muted">Email</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {emailReady ? (
                    <a
                      href={`mailto:${profile.email}`}
                      className="break-all font-display text-2xl font-medium tracking-tight link-underline sm:text-3xl"
                    >
                      {profile.email}
                    </a>
                  ) : (
                    <Ph value={profile.email} className="text-xl" />
                  )}
                  {emailReady ? (
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex size-10 items-center justify-center rounded-sm border border-ink-border text-ink-muted transition-colors hover:border-ink-foreground hover:text-ink-foreground"
                      aria-label={copied ? "Email copied" : "Copy email address"}
                    >
                      {copied ? <Check className="size-4 text-signal" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                    </button>
                  ) : null}
                </div>
              </div>
              <Availability tone="ink" />
              <SocialLinks tone="ink" />
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-6" delay={120}>
            {status === "sent" ? (
              <div role="status" className="rounded-md border border-ink-border bg-ink-surface p-8 sm:p-10">
                <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check aria-hidden />
                </span>
                <h3 className="mt-6 text-display-md">Your email is ready to send.</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  Your email app should have opened with the message filled in — just hit send. If nothing opened,
                  write to <span className="text-ink-foreground">{profile.email}</span> directly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValues(empty);
                    setStatus("idle");
                  }}
                  className={cn(buttonVariants({ variant: "ink-outline" }), "mt-8")}
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="rounded-md border border-ink-border bg-ink/60 p-6 backdrop-blur-sm sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-name`} className="text-eyebrow text-ink-muted">Name</label>
                    <input
                      {...a11y("name")}
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => set("name")(e.target.value)}
                      className={cn(fieldClass, "mt-2")}
                    />
                    {err("name")}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-email`} className="text-eyebrow text-ink-muted">Email</label>
                    <input
                      {...a11y("email")}
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => set("email")(e.target.value)}
                      className={cn(fieldClass, "mt-2")}
                    />
                    {err("email")}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-projectType`} className="text-eyebrow text-ink-muted">Project type</label>
                    <select
                      {...a11y("projectType")}
                      value={values.projectType}
                      onChange={(e) => set("projectType")(e.target.value)}
                      className={cn(fieldClass, "mt-2 appearance-none")}
                    >
                      <option value="">Choose one…</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {err("projectType")}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-budget`} className="text-eyebrow text-ink-muted">
                      Budget <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <select
                      {...a11y("budget")}
                      value={values.budget}
                      onChange={(e) => set("budget")(e.target.value)}
                      className={cn(fieldClass, "mt-2 appearance-none")}
                    >
                      <option value="">Prefer not to say</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-message`} className="text-eyebrow text-ink-muted">Message</label>
                    <textarea
                      {...a11y("message")}
                      rows={5}
                      value={values.message}
                      onChange={(e) => set("message")(e.target.value)}
                      placeholder="What are you building, who is it for, and when do you need it?"
                      className={cn(fieldClass, "mt-2 resize-y")}
                    />
                    {err("message")}
                  </div>
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Company
                      <input name="company" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                </div>

                {status === "error" ? (
                  <p role="alert" className="mt-5 rounded-sm border border-destructive/60 p-3 text-sm text-ink-foreground">
                    The contact email isn't set up yet, so this message can't be delivered.
                  </p>
                ) : null}

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <p className="max-w-xs text-xs leading-relaxed text-ink-muted">
                    Sending opens your email app with this message ready to go. Nothing is stored on this site.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={buttonVariants({ variant: "accent", size: "lg" })}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 aria-hidden className="animate-spin" />
                        Opening email…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight aria-hidden className="transition-transform duration-300 group-hover/btn:rotate-45" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
