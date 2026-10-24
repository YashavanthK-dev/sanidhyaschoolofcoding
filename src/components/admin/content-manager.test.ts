import { describe, expect, it } from "vitest";
import { slugify, textToModules, modulesToText } from "./content-manager";

describe("admin content helpers", () => {
  it("builds a web address from a title", () => {
    expect(slugify("Full-Stack JavaScript & TypeScript")).toBe("full-stack-javascript-typescript");
  });
  it("turns curriculum text into modules and back", () => {
    const m = textToModules("Foundations: Variables, Functions\nBuild: API");
    expect(m).toEqual([
      { title: "Foundations", lessons: ["Variables", "Functions"] },
      { title: "Build", lessons: ["API"] },
    ]);
    expect(modulesToText(m)).toBe("Foundations: Variables, Functions\nBuild: API");
  });
});
