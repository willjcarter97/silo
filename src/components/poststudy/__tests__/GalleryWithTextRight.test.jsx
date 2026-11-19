import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import GalleryWithTextRight from "../GalleryWithTextRight";

const body = [{ type: "paragraph", text: "Body copy", spans: [] }];

test("text comes before images", () => {
  render(<GalleryWithTextRight heading="Interactive map" richText={body} images={[{ src: "a.jpg", alt: "A" }]} />);
  const heading = screen.getByRole("heading", { name: "Interactive map" });
  const img = screen.getByAltText("A");
  expect(heading.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByText("Body copy")).toBeInTheDocument();
});

test("images keep their own shape", () => {
  const { container } = render(<GalleryWithTextRight heading="H" images={[{ src: "a.jpg", alt: "A" }, { src: "b.jpg", alt: "B" }]} />);
  for (const img of screen.getAllByRole("img")) {
    expect(img).toHaveClass("w-full", "h-auto");
  }
  expect(container.querySelector(".aspect-square")).toBeNull();
});

test("layout matches the design", () => {
  const { container } = render(<GalleryWithTextRight heading="H" images={[{ src: "a.jpg", alt: "A" }]} />);
  const row = container.querySelector(".lg\\:grid-cols-\\[432fr_768fr\\]");
  expect(row).not.toBeNull();
  expect(row).toHaveClass("lg:gap-20");
  expect(screen.getByAltText("A").parentElement).toHaveClass("gap-8");
});

test("no heading means no heading element and no placeholder copy", () => {
  render(<GalleryWithTextRight richText={body} images={[]} />);
  expect(screen.queryByRole("heading")).toBeNull();
  expect(screen.queryByText(/Mobile-first design that converts/)).toBeNull();
});

test("empty image rows are skipped", () => {
  const { container } = render(<GalleryWithTextRight heading="H" images={[{ src: "a.jpg", alt: "A" }, {}, { src: undefined }]} />);
  expect(screen.getAllByRole("img")).toHaveLength(1);
  expect(container.querySelector("svg")).toBeNull();
});

test("missing alt text is empty", () => {
  const { container } = render(<GalleryWithTextRight heading="H" images={[{ src: "a.jpg" }]} />);
  expect(container.querySelector("img")).toHaveAttribute("alt", "");
});

test("text column stays in normal flow", () => {
  render(<GalleryWithTextRight heading="H" richText={body} images={[]} />);
  let el = screen.getByRole("heading");
  while (el && el.tagName !== "SECTION") {
    expect(el.classList.contains("absolute")).toBe(false);
    el = el.parentElement;
  }
});
