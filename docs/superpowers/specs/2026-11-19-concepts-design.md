# Concepts: a portfolio section next to Case Studies

## Why
Silo is adding concept projects (unbuilt, self-initiated websites such as Harbourlight Psychology) to the
portfolio. They are not client work, so they must not be presented as case studies, but they should look
like them. JB's words: case studies and concepts "just happen to share the same layout style".

## Goals
- Portfolio in the main menu becomes a dropdown with two links: **Case Studies** (`/case-studies`) and
  **Concepts** (`/concepts`).
- `/concepts` lists concepts in the same card style as `/case-studies`.
- `/concepts/<uid>` (e.g. `/concepts/harbour-light`) renders a concept with the case study page layout.
- Concepts are a separate Prismic type, `concept`, created as a copy of `case_study` (same fields and
  slices).
- The `/concepts` intro (heading, text, buttons, page title, meta description) is editable in Prismic via a
  new single type, `concepts_page`, created as a copy of `portfolio_page`.
- The Title With Description slice gets a new field, **Note** (`note`, Key Text), in both `case_study` and
  `concept`. It renders under the description in DM Sans 14px, black at 60% opacity, 32px below the
  description (Figma `SILO-Portfolio` node 1:377). Empty note: nothing renders.

## Separation rules (JB: "make sure /case-studies treats /concepts as different")
- `/case-studies` and its cards only ever show `case_study` documents; `/concepts` only `concept`.
- `/case-studies/<uid>` only loads a `case_study`; `/concepts/<uid>` only loads a `concept`. A concept UID
  under `/case-studies/` (or the reverse) shows the existing "not found" state, never the other type.
- Concepts do not appear in the footer's case study list or the homepage case study feature.
- Links back from a single page go to its own listing ("Back to Case Studies" / "Back to Concepts").

## Non-goals
- No separate visual design for concepts. Any later concept-only styling is a new request.
- No homepage or footer section for concepts.
- No migration script: JB re-enters Harbourlight as a Concept in Prismic and removes the Case Study draft.
- Menu dropdown items are not editable in Prismic (the Navigation type has no nesting).

## Approaches considered
1. **Shared pages, parameterised by type (picked by JB).** `CaseStudies` and `PostCaseStudy` take a config
   (Prismic type, base path, intro singleton, labels) and are mounted twice in the router. One layout to
   maintain; new slices work on both automatically. Risk: a style change for one applies to both unless
   it checks the type.
2. Copy the pages into `Concepts` / `PostConcept`. Free to diverge, but every slice and fix is done twice and
   concepts would quietly fall behind.

## Design
- **Config.** One config object per collection, e.g. `{ type: "case_study", basePath: "/case-studies",
  pageSingleton: "portfolio_page", listLabel: "Case Studies" }` and the concept equivalent. The router passes
  it to the shared listing and single page components.
- **Listing ordering/fields.** Same as case studies: ordered by `display_order`, cards use `title`,
  `subtitle`, card/hero image and location as `/case-studies` does.
- **Location (JB).** `concept` gets a `location` field (Key Text, label "Location", e.g. "Mount Hawthorn,
  Perth") shown on concept cards where case study cards show theirs. `case_study` has no such field today
  (its locations come from `src/data/caseStudyLocations.js`); that stays as it is and is case-study only.
  Empty location on a concept: the card shows no location.
- **Listing intro fallback.** If `concepts_page` is missing or empty, `/concepts` shows built-in fallback copy
  (heading "Concepts", one line of text) so the page never renders blank. *(Claude's call.)*
- **Single page CTA (JB).** Concepts use the same end-of-page CTA band as case studies, but its secondary
  button reads **"See more concepts"** and links to `/concepts`. Case study pages keep "See more work" →
  `/case-studies`. The heading and primary button stay the same on both. *(Claude's call: the Harbourlight
  Figma's "Want a website like this?" heading is a possible follow-up.)*
- **Menu.** Desktop: Portfolio shows a small dropdown on hover and on click/keyboard focus, with Case Studies
  and Concepts; Portfolio itself is not a link. Mobile: both appear as indented links under Portfolio in the
  existing panel. Portfolio shows as active on any `/case-studies` or `/concepts` page. The dropdown attaches
  to whichever nav item links to `/case-studies` (the Navigation document's Portfolio item), so editors can
  still rename or reorder it. *(Claude's calls.)*
- **Links from Prismic.** Every place that turns a Prismic document link into a URL maps `concept` to
  `/concepts/<uid>` and `concepts_page` to `/concepts`, including the preview `linkResolver`, so Prismic
  Preview opens concepts at the right address.
- **Search and sharing.** `/concepts` and every published concept get their own pre-rendered HTML (title,
  description, image) and sitemap entries, like case studies (`src/data/seo.js` `PAGES` + `COLLECTIONS`).
- **Prismic setup (JB, in the dashboard).** Claude supplies step-by-step instructions: create `concept`
  (repeatable) by pasting Case Study's JSON and adding the `location` field; create `concepts_page` (single) by pasting Portfolio Page's JSON;
  add the `note` field block to Title With Description in both types; create and publish the Concepts Page
  document. The site must not break while these don't exist yet (empty listing plus fallback intro).

## Constraints
- React 19 + Vite + React Router 6 + Tailwind 4; Prismic via `@prismicio/client` (no Slice Machine).
- Existing `/case-studies` pages must look and behave exactly as today.
- Netlify CSP and pre-render script must keep working (`npm run build`).

## Left to the builder
- How the config is passed (props vs route context) and where it lives.
- Whether to centralise the duplicated Prismic link-to-URL maps or add `concept` to each.
- Dropdown markup and animation, within the existing header's look.
