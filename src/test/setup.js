import "@testing-library/jest-dom/vitest";

// jsdom has no matchMedia; GSAP's matchMedia (used by the gallery slice) needs it
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (media) => ({
    matches: false,
    media,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
  });
}

// jsdom has no IntersectionObserver: treat lazy sections as already in view
import { defaultFallbackInView } from "react-intersection-observer";
defaultFallbackInView(true);
