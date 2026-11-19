import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import GalleryWithText from "../GalleryWithText";

test("wide images keep their own shape, with no square box around them", () => {
  const { container } = render(
    <GalleryWithText heading="H" images={[{ src: "wide.png", alt: "Wide" }, { src: "square.png", alt: "Square" }]} />
  );
  for (const img of screen.getAllByRole("img")) {
    expect(img).toHaveClass("w-full", "h-auto");
    expect(img).not.toHaveClass("object-contain");
  }
  expect(container.querySelector(".aspect-square img")).toBeNull();
});
