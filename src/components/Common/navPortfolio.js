// Portfolio in the main menu is a dropdown, not a link. Prismic's Navigation document has no nesting, so the
// two sub-links live here and are attached to whichever menu item is Portfolio.
export const PORTFOLIO_CHILDREN = [
  { label: "Case Studies", link: "/case-studies" },
  { label: "Concepts", link: "/concepts" },
];

const isPortfolioItem = (item) =>
  (typeof item.link === "string" && item.link.replace(/\/+$/, "") === "/case-studies") ||
  (item.label || "").trim().toLowerCase() === "portfolio";

/** Replace the first Portfolio item (links to /case-studies, or labelled "Portfolio") with a dropdown. */
export const withPortfolioDropdown = (links) => {
  const index = links.findIndex(isPortfolioItem);
  if (index === -1) return links;
  const copy = [...links];
  copy[index] = { label: links[index].label, children: PORTFOLIO_CHILDREN, isVisible: true };
  return copy;
};

/** True on any case study or concept page, so Portfolio can show as active. */
export const isPortfolioPath = (pathname) => /^\/(case-studies|concepts)(\/|$)/.test(pathname);
