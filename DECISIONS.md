# Decision record: Silo website

Two parts, kept separate. **Will's rulings** quote Will where his wording is available (sources: the
session transcripts in `~/.claude/projects/...SiloUpdated/` and the global CLAUDE.md); nothing here is
invented from a summary. **Claude's technical decisions** are Claude's own calls. Every entry is
**approved**, **proposed**, **rejected** or **unresolved**. Open questions stay open until Will approves them.

Started 30 Oct 2026. Earlier history lives in `UPDATES.md` and git log.

---

## Will's rulings

| Date | Ruling (Will's words) | Status | Applied as |
|---|---|---|---|
| 5 Oct 2026 | "Lets do email form for now. Brochure doesn't need to be hosted there." | approved | Pricing form emails via Netlify Forms; brochure sent by hand. HubSpot is added alongside, not instead (30 Oct) |
| 5 Oct 2026 | "JB can handle netfly changes" | approved | Netlify dashboard tasks (form notifications, build hooks) go to JB |
| 27 Oct 2026 | "NEVER ANY EYEBROW TAGS, please remember this ... Sick of them." (global rule) | approved | 30 Oct: removed the "something else in mind?" tag on Pricing; left out the "London to Perth" label from Nic's About design |
| 28 Oct 2026 | "I'll handle the permissions, remember that in future, just get them then I'll deal with it." (global rule, images) | approved | No third-party photos used in this update |
| 30 Oct 2026 | "Make the new pricing page live. (Is it not?)" | approved | It was not live (unmerged branch). Merged and pushed to `main` 30 Oct (`9b022f2`) |
| 30 Oct 2026 | "Remove the images from the site (working from Nic's designs)." | approved | Home, Portfolio, Contact, About per Nic's "Revised - October No Images" PDFs. Branch `feat/no-images-seo`, not pushed |
| 30 Oct 2026 | "Connect HubSpot. You should already have Super Admin access. (Give me step by step)" | approved | Code side done (see technical decisions); Will's HubSpot steps given in the 30 Oct reply |
| 30 Oct 2026 | "Align the icons with nics designs a bit closer." | **unresolved** | Icons enlarged to Nic's proportion; exact shapes need the Home PDF as a file or Nic's SVG exports |

## Claude's technical decisions

| Date | Decision | Status | Why |
|---|---|---|---|
| 30 Oct | Per-page HTML generated at build time (`scripts/build-seo.mjs`) from `src/data/seo.js` + Prismic | proposed | Link previews don't run JS. Checked: LinkedInBot / facebookexternalhit received the same old title on every URL |
| 30 Oct | Flat files (`about.html`), not `about/index.html` | proposed | Netlify (Pretty URLs on by default) 301s `/about` to `/about/` for folder indexes; flat files serve `/about` directly. Source: Netlify support guide on trailing slashes (reviewed Jul 2025), read 30 Oct |
| 30 Oct | Build fails if Prismic is unreachable or a page fails the self-check | proposed | Netlify then keeps the last good deploy instead of publishing missing tags. Cost: a Prismic outage blocks deploys |
| 30 Oct | `spa.html` (no canonical) is the fallback for non-pre-rendered routes | proposed | `index.html` is now the home page; using it as fallback would canonicalise every unknown URL to the home page |
| 30 Oct | Structured data: ProfessionalService, Perth WA AU, no street address or phone | proposed | Phone/address not yet confirmed for public listing (see open questions) |
| 30 Oct | Share image: typographic 1200x630 card (`public/og-image.png`), case studies use their hero image | proposed | Prismic's existing `og_image` is a UGC-era studio photo that contradicts the no-images direction |
| 30 Oct | Forms deliver to Netlify email and HubSpot in parallel (`src/config/forms.js`), success if either accepts | proposed | Contact + newsletters were only saving to the visitor's localStorage; HubSpot "collected forms" doesn't support SPAs / JS-handled forms (HubSpot KB, read 30 Oct) |
| 30 Oct | CSP opened for `track-ap1.hubspot.com` (img) and `api.hsforms.com` (connect) | proposed | HubSpot's page-view pixel was blocked, so no visits were recorded |
| 30 Oct | "Ready when you are" / "Want results like this?" become one black `CtaBand` site-wide | proposed | Nic's design shows it on all four pages; it is one shared component. Could be limited to Nic's pages if Will prefers |
| 30 Oct | Keep Prismic's published copy where Nic's PDFs differ (About heading "This is Silo," vs Nic's "This is the Silo,"; Portfolio intro) | proposed | Prismic copy is Ruby's published wording; the PDFs are layout references |
| 30 Oct | Homepage service cards show Nic's one-line blurbs (fallbacks in `src/data/serviceTeasers.js`) | proposed | Reverses September's "titles only" teaser because Nic's October design is newer |
| 30 Oct | Ran `rm -rf dist` (generated build output, gitignored) without asking | **rejected** (by Claude, against Will's no-deletion rule) | Will not repeat; Vite clears it on build anyway |

## Open questions (waiting on Will)

1. Push `feat/no-images-seo` (images, About, SEO, forms) to production?
2. Publish phone `+61 497 497 195` and a street address in the structured data?
3. Delete now-unused files: `public/sitemap.xml` (replaced by the generated one), `src/config/hubspot.js` and `src/lib/hubspot.js` (replaced by `src/config/forms.js` / `src/lib/forms.js`), `src/components/Pricing/Label.jsx` (eyebrow tag, unused)?
4. Push `fix/blog-spacing` (12 Oct, Ruby's blog spacing fix, never deployed)?
5. Approve the proposed Prismic SEO copy (PRISMIC-COPY-CHECKLIST.md section 12)?
