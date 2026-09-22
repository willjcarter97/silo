# Prismic copy checklist — "London to Perth" update

Written for: whoever is editing the Silo Prismic repository (`silosite`) to publish the client's
September 2026 copy. Every item is a field in the Prismic dashboard. The code on branch
`feat/client-copy-update` already contains matching fallbacks; nothing here needs a developer.

**Important:** publishing in Prismic is live immediately on silo-creative.com. Publish these edits in
the same sitting as the code deploy so the new layouts and the new copy land together.

Copy below is verbatim from the client document. Tick as you go.

---

## 1. `home_page` (singleton)

- [ ] `hero_tagline` → `In good company.`
- [ ] `welcome_heading` → `London to Perth. And we're just getting started.`
- [ ] `welcome_description` → `A decade of agency experience in London, and now growing in Australia too. We work with everyone from London's oldest whisky investment company to fintech founders and independent housebuilders, bringing the same strategic rigour and design standard to every brand, wherever you're building from.`
- [ ] `service_cards` — four rows, in this order. Set each `service_title`, **clear** each `service_description` (leave empty), and point `service_link` at the Services page. Keep the existing images for now (client will revisit imagery).
  - [ ] Row 1: `Brand Strategy`
  - [ ] Row 2: `Visual Identity`
  - [ ] Row 3: `UI/UX Design`
  - [ ] Row 4: `Custom Web Development`
- Unchanged: `services_heading`, `case_studies_heading`, `case_studies_subheading`, buttons.

## 2. `about_page` (singleton)

- [ ] `hero_description` → `Still a London agency, and now a Perth one too. Silo was built on the belief that great brand presence is more than output. It is intentional, strategic and shaped by design, content and digital experiences that serve a clear purpose.`
- [ ] `what_silo_heading` → already reads `In a noisy digital world, we don't just create to keep up. We go deeper.` — no change needed.
- [ ] `what_silo_paragraph_1` → `Before Silo existed in Perth, our team spent a decade building brand strategy, identity and digital experiences for everyone from fast moving startups to established consumer names in London. It's where we learned what serious brand work actually requires: clarity under pressure, design that earns trust, and strategy that holds up when investors, press and customers are all watching at once.`
- [ ] `what_silo_paragraph_2` → `We're now bringing all of that to the other side of the world, while continuing to build for the clients who got us here in London. Same standard, same way of working, just a growing list of cities. We're strategists, designers and builders under one roof, working from brand strategy through to visual identity, UI/UX and web development, so every brand we touch is built with intent from the first conversation.`
- [ ] `what_silo_paragraph_3` → **clear** (leave empty; the site hides an empty third paragraph)
- [ ] `who_we_work_description` → unchanged (already matches the document)
- [ ] *(Optional)* add a Key Text field `who_we_work_tagline` to the About Page custom type and set it to `Now actively taking on new brands across Australia.` — the site already shows this line from a code default, so this is only needed if you want to edit it later.
- [ ] `belief_cards` — three rows, in this order (images are no longer shown; leave them as they are):
  - [ ] Row 1 title `We don't chase trends for the sake of it.` / description `The best work feels true to the brand, not the trend. Trends move fast and fade faster, so we'd rather build something that still holds up in five years.`
  - [ ] Row 2 title `Nothing gets made without a reason behind it.` / description `Strategy first, then the work. If we can't explain why something exists, it doesn't go live.`
  - [ ] Row 3 title `We say what we mean.` / description `No jargon, no overcomplicating the brief. If we can't explain a decision simply, we haven't thought it through properly.`
- Unchanged: `beliefs_heading`, `beliefs_description` (client supplied no new intro line), `marquee_row_1/2/3` (client to send edits).

## 3. `team_member` documents

- [ ] `ruby-turbett` → `title`: `Founder` (unchanged); `description` → `Ruby built her first agency in London, working across finance and consumer brands, before moving to Perth and bringing that same standard with her. She leads with sharp thinking and builds strong client relationships, with a decade of marketing experience behind her. Outside work, she's at pilates, boxing or planning her next city break.`
- [ ] `will-carter` → already matches the document (`Creative Digital Designer` + bio). No change.

## 4. `services_page` (singleton)

- [ ] `hero_description` → `Brands built with intent, not guesswork`
- [ ] `core_services_heading` → optional; currently `CORE SERVICES`, shown as the small section label. `Core services` reads better in the new layout but either works.
- [ ] `interested_cards` — four rows, in this order. `card_bullets` is one bullet per line.
  - [ ] Row 1 — title `Brand Strategy`; description `We start with clarity, not guesswork. Positioning, messaging and brand architecture that gives every decision after it somewhere solid to stand on.`; bullets:
    ```
    Brand positioning and messaging
    Market and audience insight
    Brand architecture and naming
    Go-to-market strategy support
    ```
  - [ ] Row 2 — title `Visual Identity`; description `We design bold branding and expressive detail to shape how your brand looks, feels and gets remembered. From a single mark to a full identity system, logo, colour, typography, templates, every element is built to work together, not just sit next to each other.`; bullets:
    ```
    Brand identity and visual systems
    Logo design and typographic styling
    Colour palettes and design guidelines
    Branded templates and presentation materials
    ```
  - [ ] Row 3 — title `UI/UX Design`; description `We design structure and flow to shape how a site works, moves and feels to use. From the first wireframe to full interface, layout, flow, interaction, every screen is built to work together, not just look finished.`; bullets:
    ```
    Strategic UX and site architecture
    Wireframing and user flows
    Custom interface design for modern brands
    Design systems built to scale
    ```
  - [ ] Row 4 — title `Custom Web Development`; description `We build the sites that bring a design to life, built to perform, load fast and hold up under real use. From the first line of code to launch day, front end, back end, integrations, every piece is built to last, not just launch.`; bullets:
    ```
    Platform-agnostic, hand-built development
    Clean, reliable code
    Launch support
    Ongoing improvements and maintenance
    ```
- [ ] `add_ons_title` → `Other ways we can help`
- [ ] `add_ons_description` → `A few other things we can do when a project calls for it.`
- [ ] `add_ons_bullets` →
  ```
  Marketing Consultancy
  Graphic Design
  Email Marketing
  Video production and editing
  Paid Advertising (Meta, Google, TikTok, Bing)
  CRM Support
  PR Services
  ```
- `service_cards` (the old card-stack rows) are no longer displayed; leave or delete.

## 5. `ready_when_you_are_cta` (singleton)

- [ ] `primary_button_text` → `Let's Talk`
- [ ] `primary_button_link` → the Contact page document
- `secondary_button_*` are no longer displayed; leave or clear.

## 6. `navigation` (singleton)

- [ ] `nav_links` → delete the `Job Board` row. (The site already hides it, but removing it keeps Prismic tidy.)

## 7. `careers_page` (singleton)

- [ ] `hero_heading` → `Careers at Silo`
- [ ] `hero_description` → `We're always on the lookout for talented designers, developers and marketers.`
- [ ] `empty_state_heading` → `Nothing open right now.`
- [ ] `empty_state_description` → `Check back soon or send a speculative application.`
- [ ] `empty_state_email` → already `hi@silo-creative.com`

## 8. `ramblings_page` (singleton)

- [ ] `hero_description` → `Thoughts on branding, design and digital, and what's shaping the industry right now.`

## 9. `contact_page` (singleton)

- Unchanged: `main_heading` / `main_description` already match. `secondary_*` fields are no longer displayed.

## 10. `case_study` documents — card headlines (`subtitle` field)

- [ ] `basement-approved` → `Rebuilding a culture platform for a modern, music driven audience`
- [ ] `tomoka-fine-and-rare` → `Modernising a heritage whisky brand without losing its soul`
- [ ] `electrolytes-with-joly` → `Shaping a visual identity that captures energy, movement and personality`
- [ ] `acorn-property-group` → `Building a connected digital presence for a thoughtful and distinctive housebuilder`
- [ ] `cluberly` → `Explaining a purpose driven fintech through story, clarity and motion`
- [ ] `knightsgate-partners` → `Transforming Knightsgate's brand and investor communications`
- [ ] *(Optional but recommended)* add a Key Text field `location` to the Case Study custom type and set every document to `London, UK`. Until then the site shows "London, UK" from a code map.
- [ ] Body copy (The problem / What we built / What we delivered) per the client document — edit the existing slices on each document. Layouts are intentionally untouched.

## 11. New case study: Flowery

- [ ] Create a `case_study` document, UID `flowery`, title `Flowery`, `subtitle` `Building the investor and digital presence behind a fast-growing UK florist`, `location` `London, UK` (if the field exists), `display_order` after Electrolytes, images from the client's Drive folder, body slices per the document.
- [ ] Once published, ask the developer to add Flowery to the footer's hardcoded fallback list (only shown if Prismic is unreachable).

## Still needed from the client

- Replacement copy for the newsletter block on Ramblings (currently UGC wording) — or confirm removal.
- SEO page titles / meta descriptions for Home, About, Services, Portfolio, Careers, Ramblings, Contact (all still mention social media / UGC).
- Edited industry list for the About page marquee rows.
