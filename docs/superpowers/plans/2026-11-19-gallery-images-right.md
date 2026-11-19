# Gallery With Text (Images Right) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A new case study slice, `gallery_with_text_right`: heading and rich text on the left, a stack of natural-shape images on the right, matching the Harbourlight Figma section.

**Architecture:** The text-follows-scroll logic moves out of `GalleryWithText` into a shared hook so both slices use it, with the existing slice's behaviour unchanged. A new `GalleryWithTextRight` component renders the new layout, and `PostCaseStudy` maps the new slice type to it. The slice model itself lives in the Prismic dashboard, so the repo ships its JSON for pasting.

**Tech Stack:** React 19, Tailwind 4, GSAP ScrollTrigger, @prismicio/react, Vitest + Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-11-19-gallery-images-right-design.md`

## Global Constraints

- The existing `gallery_with_text` slice must look and behave exactly as today.
- Slice ID `gallery_with_text_right`; fields `heading` (Key Text), `text_content` (Rich Text), repeatable `gallery_image` (Image).
- Desktop (≥1024px): text left / images right at 432:768 of 1280px, 80px column gap; images full column width, natural height, 32px apart.
- Mobile: text first, then images, full width.
- Section padding the same as `GalleryWithText` (`py-8 md:py-20 px-5 md:px-10 min-[1360px]:px-0`, inner `max-w-[1280px] mx-auto`).
- Commits have no Claude co-author line.

## Review Focus

1. **No heading filled in:** render no heading at all (the old slice shows "Mobile-first design that converts" placeholder copy; the new one must not). Test in Task 2.
2. **Image rows left empty in Prismic** (`gallery_image` is `{}`): skip them, no grey placeholder boxes. Test in Task 2.
3. **Text taller than the image stack:** the text must not be clipped or overlap the next section (the hook already bails when `maxTranslate <= 0`; the text column must not be absolutely positioned out of flow on its own). Test in Task 2 (text column is in normal flow when there are no images).
4. **No `window.matchMedia` in tests / older browsers:** GSAP's `matchMedia` needs it; the test setup stubs it so both gallery components can render. Covered by Task 1.
5. **Image without alt text:** use `""` so screen readers skip it rather than reading a file name. Test in Task 2.

---

### Task 1: Shared text-follows-scroll hook

**Files:**
- Create: `src/hooks/useStickyText.js`
- Modify: `src/components/poststudy/GalleryWithText.jsx` (replace the `useEffect` at lines 47–113 with a hook call; export `richTextComponents` as a named export `galleryRichTextComponents`)
- Modify: `src/test/setup.js` (stub `window.matchMedia`)
- Test: `src/components/poststudy/__tests__/GalleryWithText.test.jsx`

**Interfaces:**
- Produces: `useStickyText(wrapperRef: RefObject<HTMLElement>, textRef: RefObject<HTMLElement>): void`, the default export of `src/hooks/useStickyText.js`. Body moved verbatim from `GalleryWithText` (registers ScrollTrigger, desktop-only via `gsap.matchMedia("(min-width: 1024px)")`, reverts on unmount).
- Produces: `export const galleryRichTextComponents` from `GalleryWithText.jsx`.

- [ ] **Step 1: Write the test** `renders heading, rich text and images as before`: render `<GalleryWithText heading="H" richText={[{type:"paragraph",text:"Body",spans:[]}]} images={[{src:"a.jpg",alt:"A"}]} />`; expect `getByRole("heading",{name:"H"})`, `getByText("Body")`, `getByAltText("A")` with class `object-contain`.
- [ ] **Step 2: Run** `npx vitest run src/components/poststudy/__tests__/GalleryWithText.test.jsx`. Expected: FAIL with `matchMedia is not a function` (jsdom has none).
- [ ] **Step 3: Add the stub** to `src/test/setup.js`: `window.matchMedia` returning `{ matches: false, media, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){} }` when it's missing.
- [ ] **Step 4: Run** the test. Expected: PASS (proves the current component renders before the refactor).
- [ ] **Step 5: Move the effect** into `useStickyText` and call `useStickyText(wrapperRef, textRef)` in `GalleryWithText`; export `galleryRichTextComponents`. No other changes to the component.
- [ ] **Step 6: Run** `npx vitest run` and `npm run build:app`. Expected: all tests PASS, build succeeds.
- [ ] **Step 7: Commit** `git add src/hooks/useStickyText.js src/components/poststudy/GalleryWithText.jsx src/test/setup.js src/components/poststudy/__tests__/GalleryWithText.test.jsx && git commit -m "Case studies: share the gallery text scroll behaviour"`

### Task 2: `GalleryWithTextRight` component and slice mapping

**Files:**
- Create: `src/components/poststudy/GalleryWithTextRight.jsx`
- Modify: `src/pages/PostCaseStudy.jsx` (import; new `case "gallery_with_text_right"` after `gallery_with_text` around line 147)
- Test: `src/components/poststudy/__tests__/GalleryWithTextRight.test.jsx`

**Interfaces:**
- Consumes: `useStickyText`, `galleryRichTextComponents` (Task 1).
- Produces: `GalleryWithTextRight({ heading?: string, richText?: PrismicRichTextField, images: { src?: string, alt?: string }[] })`, default export.
- Slice mapping: `heading={slice.primary?.heading}`, `richText={slice.primary?.text_content}`, `images={slice.items?.map(i => ({ src: i.gallery_image?.url, alt: i.gallery_image?.alt }))}`.

- [ ] **Step 1: Write the tests**
  - `text comes before images`: heading `"Interactive map"`, one image; `compareDocumentPosition` shows the heading precedes the `img`.
  - `images keep their own shape`: each `img` has classes `w-full h-auto` and no ancestor with `aspect-square`.
  - `layout matches the design`: the row element has `lg:grid-cols-[432fr_768fr]` and `lg:gap-20`; the image column has `gap-8`.
  - `no heading → no heading element`: `queryByRole("heading")` is null and `"Mobile-first design that converts"` is absent.
  - `empty image rows are skipped`: images `[{src:"a.jpg"},{},{src:undefined}]` → exactly 1 `img`, no placeholder SVG.
  - `missing alt is empty`: `{src:"a.jpg"}` → `img` has `alt=""`.
  - `text column stays in normal flow with no images`: images `[]` → text wrapper doesn't have class `absolute` without `lg:`.
- [ ] **Step 2: Run** `npx vitest run src/components/poststudy/__tests__/GalleryWithTextRight.test.jsx`. Expected: FAIL, module not found.
- [ ] **Step 3: Implement** the component. Structure: section padding per Global Constraints → `div` with `flex flex-col gap-8 lg:grid lg:grid-cols-[432fr_768fr] lg:gap-20` → text wrapper (`ref=wrapperRef`, `relative`) with inner `ref=textRef` div (`relative w-full`) holding the `h2` (same classes as `GalleryWithText`'s) and `PrismicRichText` with `galleryRichTextComponents` → image column `flex flex-col gap-8` with `img.w-full.h-auto` `loading="lazy"`. Call `useStickyText(wrapperRef, textRef)`.
- [ ] **Step 4: Add the slice case** to `renderSlice` in `PostCaseStudy.jsx` using the mapping above.
- [ ] **Step 5: Run** `npx vitest run`, `npx eslint src/components/poststudy/GalleryWithTextRight.jsx src/hooks/useStickyText.js`, `npm run build:app`. Expected: all PASS, no new lint errors, build succeeds.
- [ ] **Step 6: Check in the browser** at `http://localhost:5174/case-studies/basement-approved` that the existing gallery section looks unchanged.
- [ ] **Step 7: Commit** `git add src/components/poststudy/GalleryWithTextRight.jsx src/components/poststudy/__tests__/GalleryWithTextRight.test.jsx src/pages/PostCaseStudy.jsx && git commit -m "Case studies: gallery with text slice, images on the right"`

### Task 3: Prismic slice settings and docs

**Files:**
- Create: `docs/prismic/gallery_with_text_right.json`
- Modify: `README.md` (Prismic CMS Integration section: a line on the new slice and how to add it)

- [ ] **Step 1: Write the JSON** for the Case Study type's `body` slice zone, key `gallery_with_text_right`: `type: "Slice"`, `fieldset: "Gallery with text (images right)"`, `description: "Heading and text on the left, images on the right"`, `display: "list"`, `non-repeat`: `heading` (`Text`, label "Heading"), `text_content` (`StructuredText`, `multi: "paragraph,strong,em,hyperlink,heading3,list-item,o-list-item"`, label "Text content"); `repeat`: `gallery_image` (`Image`, label "Gallery image").
- [ ] **Step 2: Validate** `node -e "JSON.parse(require('fs').readFileSync('docs/prismic/gallery_with_text_right.json','utf8'))"`. Expected: no output, exit 0.
- [ ] **Step 3: README**: under Prismic, add "Case study slices" listing `gallery_with_text_right` and the paste steps (Custom Types → Case Study → JSON editor → add the block inside `body.config.choices` → Save).
- [ ] **Step 4: Commit** `git add docs/prismic/gallery_with_text_right.json README.md docs/superpowers && git commit -m "Docs: Prismic settings for the images-right gallery slice"`
