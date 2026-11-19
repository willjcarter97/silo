import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, test, expect } from "vitest";
import Header from "../Header";

vi.mock("../../../prismicio", () => ({
  client: { getSingle: vi.fn(() => Promise.reject(new Error("offline"))) },
}));

const renderAt = (path = "/") => render(<MemoryRouter initialEntries={[path]}><Header /></MemoryRouter>);
const desktopNav = () => screen.getAllByRole("navigation")[0];

test("Portfolio is a button, not a link", () => {
  renderAt();
  const nav = desktopNav();
  const button = within(nav).getByRole("button", { name: "Portfolio" });
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(within(nav).queryByRole("link", { name: "Portfolio" })).toBeNull();
});

test("clicking Portfolio shows Case Studies and Concepts", () => {
  renderAt();
  const nav = desktopNav();
  fireEvent.click(within(nav).getByRole("button", { name: "Portfolio" }));
  expect(within(nav).getByRole("button", { name: "Portfolio" })).toHaveAttribute("aria-expanded", "true");
  expect(within(nav).getByRole("link", { name: "Case Studies" })).toHaveAttribute("href", "/case-studies");
  expect(within(nav).getByRole("link", { name: "Concepts" })).toHaveAttribute("href", "/concepts");
});

test("Escape closes the dropdown", () => {
  renderAt();
  const nav = desktopNav();
  const button = within(nav).getByRole("button", { name: "Portfolio" });
  fireEvent.click(button);
  fireEvent.keyDown(document, { key: "Escape" });
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(within(nav).queryByRole("link", { name: "Concepts" })).toBeNull();
});

test("Portfolio is highlighted on concept pages", () => {
  renderAt("/concepts/harbour-light");
  expect(within(desktopNav()).getByRole("button", { name: "Portfolio" })).toHaveClass("text-brand");
});

test("mobile menu lists Case Studies and Concepts under Portfolio", () => {
  renderAt();
  const mobileNav = screen.getAllByRole("navigation", { hidden: true }).at(-1);
  expect(within(mobileNav).getByText("Portfolio").closest("a")).toBeNull();
  expect(within(mobileNav).getByRole("link", { name: "Concepts", hidden: true })).toHaveAttribute("href", "/concepts");
  expect(within(mobileNav).getByRole("link", { name: "Case Studies", hidden: true })).toHaveAttribute("href", "/case-studies");
});

test("with a mouse, clicking after hovering keeps the menu open", () => {
  renderAt();
  const button = within(desktopNav()).getByRole("button", { name: "Portfolio" });
  fireEvent.mouseEnter(button.parentElement);
  fireEvent.pointerDown(button, { pointerType: "mouse" });
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
});

test("on touch, tapping again closes the menu", () => {
  renderAt();
  const button = within(desktopNav()).getByRole("button", { name: "Portfolio" });
  fireEvent.pointerDown(button, { pointerType: "touch" });
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
  fireEvent.pointerDown(button, { pointerType: "touch" });
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "false");
});
