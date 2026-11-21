import { describe, expect, it } from "vitest";

import { achievements, projects, profile, testimonials } from "@/content/portfolio";
import { buildMailto, filterProjects, getAdjacent, getRelated, isPlaceholder } from "@/lib/portfolio";

describe("portfolio rules", () => {
  it("treats [BRACKETED] values as unfilled placeholders", () => {
    expect(isPlaceholder("[GITHUB PROFILE]")).toBe(true);
    expect(isPlaceholder("https://github.com/someone")).toBe(false);
  });

  it("filters projects by category and returns all for 'All'", () => {
    expect(filterProjects(projects, "All")).toHaveLength(projects.length);
    const saas = filterProjects(projects, "SaaS Products");
    expect(saas.every((p) => p.category === "SaaS Products")).toBe(true);
  });

  it("wraps previous/next project navigation around the ends", () => {
    const first = projects[0]!;
    const last = projects[projects.length - 1]!;
    expect(getAdjacent(projects, first.slug).prev?.slug).toBe(last.slug);
    expect(getAdjacent(projects, last.slug).next?.slug).toBe(first.slug);
  });

  it("never lists the current project as related", () => {
    const slug = projects[0]!.slug;
    expect(getRelated(projects, slug).some((p) => p.slug === slug)).toBe(false);
  });

  it("sends contact messages to Sanket's email", () => {
    expect(profile.email).toBe("sanketrajbhar515@gmail.com");
    expect(buildMailto(profile.email, { name: "A", email: "a@b.co", projectType: "Website", budget: "", message: "hello" }))
      .toMatch(/^mailto:sanketrajbhar515@gmail\.com\?/);
  });

  it("ships no invented metrics or testimonials", () => {
    expect(achievements).toHaveLength(0);
    expect(testimonials).toHaveLength(0);
  });
});
