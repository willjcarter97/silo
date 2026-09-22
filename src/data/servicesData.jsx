// Services page content (code fallbacks).
// Live copy comes from the Prismic `services_page` singleton (interested_cards / add_ons_*);
// these values render when Prismic is unavailable and must be kept in sync with it.

// Tier 1 - core services, in sequence: strategy -> identity -> design -> build
export const coreServices = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "We start with clarity, not guesswork. Positioning, messaging and brand architecture that gives every decision after it somewhere solid to stand on.",
    bullets: [
      "Brand positioning and messaging",
      "Market and audience insight",
      "Brand architecture and naming",
      "Go-to-market strategy support",
    ],
  },
  {
    number: "02",
    title: "Visual Identity",
    description:
      "We design bold branding and expressive detail to shape how your brand looks, feels and gets remembered. From a single mark to a full identity system, logo, colour, typography, templates, every element is built to work together, not just sit next to each other.",
    bullets: [
      "Brand identity and visual systems",
      "Logo design and typographic styling",
      "Colour palettes and design guidelines",
      "Branded templates and presentation materials",
    ],
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "We design structure and flow to shape how a site works, moves and feels to use. From the first wireframe to full interface, layout, flow, interaction, every screen is built to work together, not just look finished.",
    bullets: [
      "Strategic UX and site architecture",
      "Wireframing and user flows",
      "Custom interface design for modern brands",
      "Design systems built to scale",
    ],
  },
  {
    number: "04",
    title: "Custom Web Development",
    description:
      "We build the sites that bring a design to life, built to perform, load fast and hold up under real use. From the first line of code to launch day, front end, back end, integrations, every piece is built to last, not just launch.",
    bullets: [
      "Platform-agnostic, hand-built development",
      "Clean, reliable code",
      "Launch support",
      "Ongoing improvements and maintenance",
    ],
  },
];

// Tier 2 - kept low-key rather than headline marketed
export const otherServices = {
  title: "Other ways we can help",
  description: "A few other things we can do when a project calls for it.",
  bullets: [
    "Marketing Consultancy",
    "Graphic Design",
    "Email Marketing",
    "Video production and editing",
    "Paid Advertising (Meta, Google, TikTok, Bing)",
    "CRM Support",
    "PR Services",
  ],
  ctaText: "Interested in a chat?",
  ctaLink: "/contact",
};

// TEMPORARY compatibility export for Layout417.jsx (the pinned card stack). Removed with
// Layout417 in the services-page redesign.
export const servicesData = coreServices.map((s) => ({
  icon: null,
  number: s.number,
  title: s.title,
  desc: s.description,
}));
