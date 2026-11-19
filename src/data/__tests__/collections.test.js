import { test, expect } from "vitest";
import { CASE_STUDIES, CONCEPTS } from "../collections";

test("collections are separate", () => {
  expect(CASE_STUDIES.type).toBe("case_study");
  expect(CONCEPTS.type).toBe("concept");
  expect(CASE_STUDIES.basePath).toBe("/case-studies");
  expect(CONCEPTS.basePath).toBe("/concepts");
  expect(CASE_STUDIES.pageSingleton).toBe("portfolio_page");
  expect(CONCEPTS.pageSingleton).toBe("concepts_page");
  expect(CONCEPTS.cta).toEqual({ secondaryButtonText: "See more concepts", secondaryButtonLink: "/concepts" });
  expect(CASE_STUDIES.cta).toEqual({ secondaryButtonText: "See more work", secondaryButtonLink: "/case-studies" });
  expect(CONCEPTS.locationFallback("basement-approved")).toBeNull();
  expect(CASE_STUDIES.locationFallback("basement-approved")).toBe("London, UK");
  expect(CONCEPTS.heroDefaults.heading).toBe("Concepts");
  expect(CONCEPTS.heroDefaults.secondaryButtonText).toBe(CASE_STUDIES.heroDefaults.secondaryButtonText);
  expect(CONCEPTS.heroDefaults.secondaryButtonLink).toBe("/services");
});
