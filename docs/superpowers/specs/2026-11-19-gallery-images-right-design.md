# Case study slice: gallery with text, images on the right

## Why
The Harbourlight case study design (Figma `SILO-Portfolio`, node 1:363, section "Interactive map within a
simple contact page") has a heading and text on the left and a stack of images on the right. The existing
`gallery_with_text` slice always puts images on the left, squares them off and splits the page 50/50, so it
can't build this section.

## Goals
- A new Prismic slice, "Gallery with text (images right)", that matches the design: text left (about 40%),
  images right (about 60%), images keep their own shape, stacked with a small gap.
- Editors fill it in the same way as the existing gallery slice: a heading, a rich text block, and any number
  of images.

## Non-goals
- No change to how the existing `gallery_with_text` slice looks: it is used on live case studies.
- No other Harbourlight gaps (hero logo/label, CTA wording, grey note text).

## Approaches considered
1. **New slice (picked by JB).** Matches the design and leaves live case studies untouched. Trade-off: two
   similar slices in Prismic's list.
2. "Images on left/right" switch on the existing slice. One slice to manage, but the new layout would keep
   square images and a 50/50 split unless the old look changed too, which would change live pages.

## Design
- Slice ID `gallery_with_text_right`, with the same fields as `gallery_with_text`: `heading` (Key Text),
  `text_content` (Rich Text, including bold, headings and lists), repeatable `gallery_image` (Image).
- Desktop (1024px and up): text column left, images column right, sized like the Figma (432px / 768px of
  1280px, 80px gap). Images at full column width and natural height, 32px apart.
- The text follows the visitor while they scroll past the images, as it does in the existing slice.
  *(Claude's call: keeps the two slices consistent.)*
- Mobile: text first, then the images, full width. *(Claude's call: same order as the existing slice.)*
- Same spacing above and below as the existing gallery slice. *(Claude's call.)*
- The slice is added to the Case Study type in the Prismic dashboard (the project doesn't use Slice
  Machine). Claude supplies the JSON to paste in.

## Left to the builder
- Whether to share code with `GalleryWithText` or write a separate component, as long as the existing slice
  looks exactly as it does today.
