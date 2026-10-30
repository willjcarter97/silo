// Words set in brand red inside page headlines (Nic's October designs).
// One row per page. The phrase is matched case-insensitively against the live heading (which may come
// from Prismic); if an editor rewrites the heading and the phrase is no longer in it, the heading simply
// renders in black. To accent another headline: add a row and render it with <AccentHeadline accentKey=...>.
export const HEADLINE_ACCENTS = {
  portfolio: "these",
  contact: "next move",
};
