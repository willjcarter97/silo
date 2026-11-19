import { test, expect } from "vitest";
import { withPortfolioDropdown, isPortfolioPath, PORTFOLIO_CHILDREN } from "../navPortfolio";

const others = [{ label: "About Us", link: "/about", isVisible: true }, { label: "Services", link: "/services", isVisible: true }];

test("turns the /case-studies item into a dropdown with Case Studies and Concepts", () => {
  const out = withPortfolioDropdown([others[0], { label: "Portfolio", link: "/case-studies", isVisible: true }, others[1]]);
  expect(out[1]).toEqual({ label: "Portfolio", children: PORTFOLIO_CHILDREN, isVisible: true });
  expect(out[1].link).toBeUndefined();
  expect(PORTFOLIO_CHILDREN).toEqual([{ label: "Case Studies", link: "/case-studies" }, { label: "Concepts", link: "/concepts" }]);
  expect(out[0]).toBe(others[0]);
  expect(out[2]).toBe(others[1]);
});

test("matches a trailing slash and keeps the editor's label", () => {
  const out = withPortfolioDropdown([{ label: "Our Work", link: "/case-studies/", isVisible: true }]);
  expect(out[0].label).toBe("Our Work");
  expect(out[0].children).toBe(PORTFOLIO_CHILDREN);
});

test("matches a Portfolio label with a different link", () => {
  const out = withPortfolioDropdown([{ label: "PORTFOLIO", link: "https://silo-creative.com/case-studies", isVisible: true }]);
  expect(out[0].children).toBe(PORTFOLIO_CHILDREN);
});

test("only the first match becomes a dropdown; no match leaves links unchanged", () => {
  const out = withPortfolioDropdown([{ label: "Portfolio", link: "/case-studies" }, { label: "Work", link: "/case-studies" }]);
  expect(out[0].children).toBeDefined();
  expect(out[1].children).toBeUndefined();
  expect(withPortfolioDropdown(others)).toEqual(others);
});

test("isPortfolioPath", () => {
  expect(isPortfolioPath("/concepts/harbour-light")).toBe(true);
  expect(isPortfolioPath("/case-studies")).toBe(true);
  expect(isPortfolioPath("/blog")).toBe(false);
  expect(isPortfolioPath("/conceptsx")).toBe(false);
});
