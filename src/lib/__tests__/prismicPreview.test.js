import { test, expect } from "vitest";
import { linkResolver } from "../prismicPreview";

test("preview opens each type at its own address", () => {
  expect(linkResolver({ type: "concept", uid: "harbour-light" })).toBe("/concepts/harbour-light");
  expect(linkResolver({ type: "concepts_page" })).toBe("/concepts");
  expect(linkResolver({ type: "case_study", uid: "x" })).toBe("/case-studies/x");
  expect(linkResolver({ type: "portfolio_page" })).toBe("/case-studies");
});
