import type { Project, ProjectCategory } from "@/content/portfolio";

/** True when a value is still an unfilled [PLACEHOLDER] or empty. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /^\s*\[[^\]]*\]\s*$/.test(value);
}

export type CategoryFilter = ProjectCategory | "All";

export function filterProjects(list: Project[], filter: CategoryFilter): Project[] {
  if (filter === "All") return list;
  return list.filter((p) => p.category === filter);
}

/** Categories that actually have projects, in the configured order. */
export function usedCategories(list: Project[], order: ProjectCategory[]): ProjectCategory[] {
  const present = new Set(list.map((p) => p.category));
  return order.filter((c) => present.has(c));
}

export function getProject(list: Project[], slug: string): Project | undefined {
  return list.find((p) => p.slug === slug);
}

/** Previous/next wrap around so every project page has both. */
export function getAdjacent(list: Project[], slug: string) {
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1 || list.length < 2) return { prev: undefined, next: undefined };
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  return { prev, next };
}

/** Same category first, then the rest; never includes the current project. */
export function getRelated(list: Project[], slug: string, count = 2): Project[] {
  const current = getProject(list, slug);
  if (!current) return [];
  const others = list.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, count);
}

export function buildMailto(
  to: string,
  data: { name: string; email: string; projectType: string; budget: string; message: string },
) {
  const subject = `New project enquiry — ${data.projectType}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Project type: ${data.projectType}`,
    data.budget ? `Budget: ${data.budget}` : null,
    "",
    data.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
