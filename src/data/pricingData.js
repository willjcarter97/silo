// Pricing page content. Wording is the client's, verbatim (see "Silo Website: Pricing Page Brief").
// Prices are deliberately NOT shown on the site: they live in the brochure to encourage downloads.

// The brochure is not hosted on the site: ticking "Send me the brochure" flags the enquiry so it can be sent by hand.

export const pricingMeta = {
  title: "Pricing | Brand and Website Packages Perth | Silo",
  description:
    "Fixed-price brand and website packages for Perth practices and small businesses. Download the brochure or get a quote for bespoke work.",
};

export const hero = {
  heading: "Two packages. Or something built just for you.",
  intro:
    "Fixed-price brand and website packages for practices / sole-traders as well as small businesses, plus bespoke projects quoted on an hourly rate.",
  primaryButton: "Get the brochure",
  secondaryButton: "Get a quote",
};

export const packagesIntro = {
  heading: "Two ways in.",
  line: "Both take you from brand to live website, at a fixed price.",
};

export const packages = [
  { key: "refresh", name: "Refresh" },
  { key: "rebrand", name: "Rebrand" },
];

export const tableRows = [
  {
    label: "Best for",
    refresh: "Solo practitioners and sole traders needing a fast, credible refresh",
    rebrand: "Clinics or established businesses wanting a larger rebrand",
  },
  {
    label: "Brand strategy",
    refresh: "Not included",
    rebrand: "One positioning workshop and summary",
  },
  {
    label: "Visual identity",
    refresh: "Logo, colour palette, font pairing, one-page brand reference",
    rebrand: "Full logo suite, palette, typography, condensed brand guidelines",
  },
  {
    label: "Website design",
    refresh: "Adapted from a template of your choice to your brand",
    rebrand: "Custom design, 5 to 7 pages",
  },
  {
    label: "Website build",
    refresh: "Up to 5 pages and contact form",
    rebrand: "Bespoke build to approved design",
  },
  {
    label: "Revisions",
    refresh: "2 rounds",
    rebrand: "2 rounds",
  },
];

export const priceButtonText = "Get the brochure for pricing";
export const smallPrint = "*Copywriting, photography, e-commerce and hosting are not included and can be quoted separately.";
export const tableCta = { text: "Want the full details and pricing?", button: "Get the brochure" };

export const bespoke = {
  label: "something else in mind?",
  heading: "Not every project fits a package.",
  body: [
    "Everything we do is also available on an hourly rate, from a single landing page to a full brand and website project. That includes brand strategy, visual identity, UI/UX and web development, plus marketing consultancy, graphic design, email marketing, video, paid advertising, CRM support and PR.",
    "Tell us what you need and we'll come back with our hourly rate and a clear quote.",
  ],
};

export const interestOptions = ["Refresh package", "Rebrand package", "A bespoke project", "Not sure yet"];

export const formCopy = {
  brochureLabel: "Send me the brochure",
  brochureHint: "Full package details and pricing, sent to your inbox.",
  consentLabel: "I'm happy for Silo to send me occasional updates and offers. You can unsubscribe at any time.",
  submit: "Send",
  submitting: "Sending...",
  error: "Sorry, something went wrong sending that. Please try again, or email hi@silo-creative.com.",
};

export const thankYou = {
  brochure: {
    heading: "Thanks, our brochure will be with you soon!",
    body: "And we'll be in touch within the next 48 hours.",
  },
  standard: {
    heading: "Thanks for getting in touch.",
    body: "We'll get back to you within 48 hours.",
  },
};
