// Single source for search and sharing metadata.
//
// Read in two places:
//   1. scripts/build-seo.mjs (after `vite build`): writes a real HTML file per page (dist/<path>.html) with its own <title>,
//      description, canonical, Open Graph / Twitter tags and structured data, and generates sitemap.xml.
//      LinkedIn, Facebook and other link previews do not run JavaScript, so this is what they see.
//   2. src/hooks/usePageMeta.js and the pages: the same fallbacks are used when the app updates the
//      head in the browser, so the two never disagree.
//
// Order of precedence for a page's title/description: the Prismic field named here, then the fallback
// written here. To add a page: add a row to PAGES (and a route in src/routes/route.jsx). Prismic case
// studies and blog posts are picked up automatically through COLLECTIONS.
//
// Plain JS only (no JSX/imports): this file is also loaded by Node at build time.

export const SITE = {
  origin: "https://silo-creative.com",
  name: "Silo",
  legalName: "The Silo Creative Limited",
  locale: "en_AU",
  // 1200x630, in /public. Used for every page without its own image.
  ogImage: "/og-image.png",
  ogImageAlt: "Silo. Brand strategy, identity and web design studio, London to Perth.",
  logo: "/silo-logo.png",
  email: "hi@silo-creative.com",
  // Leave null until confirmed for public listing: structured data omits empty fields.
  telephone: null,
  // Perth is the base for local search. Street address not published (add streetAddress/postalCode
  // here if Silo wants one listed; it must match the Google Business Profile exactly).
  address: { addressLocality: "Perth", addressRegion: "WA", addressCountry: "AU" },
  areaServed: [
    { "@type": "City", name: "Perth" },
    { "@type": "State", name: "Western Australia" },
    { "@type": "Country", name: "Australia" },
    { "@type": "City", name: "London" },
  ],
  sameAs: [
    "https://www.instagram.com/thesilocreative/",
    "https://www.tiktok.com/@the.silo.creative",
    "https://www.linkedin.com/company/the-silo-creative/",
  ],
  services: ["Brand strategy", "Visual identity", "UI/UX design", "Custom web development"],
  description:
    "Brand strategy, visual identity, UI/UX design and custom web development for Australian brands. A decade of London agency experience, now in Perth.",
};

// path: route; prismic: singleton type holding the SEO fields; titleField/descField: field names in it.
// title/description: fallback (and the only source where there is no Prismic document).
// sitemap: false to leave a page out; noindex: true also adds <meta name="robots" content="noindex">.
export const PAGES = [
  {
    path: "/",
    prismic: "home_page", titleField: "page_title", descField: "page_description",
    title: "Branding & Web Design Agency Perth | Silo",
    description: SITE.description,
    sitemap: { priority: "1.0", changefreq: "weekly" },
  },
  {
    path: "/about",
    prismic: "about_page", titleField: "page_title", descField: "meta_description",
    title: "About Silo | Brand & Web Studio, London to Perth.",
    description: "Strategists, designers and builders under one roof. A decade of London agency work, now taking on new brands across Perth and Australia.",
    sitemap: { priority: "0.8", changefreq: "monthly" },
  },
  {
    path: "/services",
    prismic: "services_page", titleField: "page_title", descField: "meta_description",
    title: "Brand Strategy, Identity & Web Design Perth",
    description: "Brand strategy, visual identity, UI/UX design and custom web development from strategy to build. For brands across UK and Australia.",
    sitemap: { priority: "0.9", changefreq: "monthly" },
  },
  {
    path: "/pricing",
    title: "Pricing | Brand and Website Packages Perth | Silo",
    description: "Fixed-price brand and website packages for Perth practices and small businesses. Request the brochure or get a quote for bespoke work.",
    sitemap: { priority: "0.9", changefreq: "monthly" },
  },
  {
    path: "/case-studies",
    prismic: "portfolio_page", titleField: "page_title", descField: "meta_description",
    title: "Creative Agency Case Studies & Client Work",
    description: "Brand identity, UI/UX and website projects for fintech, culture, investment and founder-led brands. See the thinking and the build behind each one.",
    sitemap: { priority: "0.9", changefreq: "weekly" },
  },
  {
    path: "/blog",
    prismic: "ramblings_page", titleField: "page_title", descField: "meta_description",
    title: "Insights on Branding, Design & Web | Silo",
    description: "Thoughts on brand strategy, visual identity, UI/UX and web development, and what's shaping the industry right now. From the Silo team in Perth and London.",
    sitemap: { priority: "0.8", changefreq: "weekly" },
  },
  {
    path: "/contact",
    prismic: "contact_page", titleField: "page_title", descField: "meta_description",
    title: "Contact Silo | Brand & Web Design Studio, Perth",
    description: "Tell us about your brand, website or rebrand. Brand strategy, visual identity, UI/UX design and web development from Perth and London.",
    sitemap: { priority: "0.8", changefreq: "monthly" },
  },
  {
    path: "/careers",
    prismic: "careers_page", titleField: "page_title", descField: "meta_description",
    title: "Careers at Silo | Brand & Web Studio",
    description: "Join a small team of strategists, designers and developers working across Perth, Western Australia and London, UK.",
    sitemap: { priority: "0.6", changefreq: "weekly" },
  },
  {
    path: "/terms",
    prismic: "terms_page", titleField: "page_title", descField: "meta_description",
    title: "Terms of Service | Silo",
    description: "The terms that apply to Silo's brand strategy, visual identity, UI/UX design and web development services.",
    sitemap: { priority: "0.3", changefreq: "yearly" },
  },
  {
    path: "/privacy",
    prismic: "privacy_page", titleField: "page_title", descField: "meta_description",
    title: "Privacy Policy | Silo",
    description: "How Silo collects, uses and protects personal data when you visit our website or work with us.",
    sitemap: { priority: "0.3", changefreq: "yearly" },
  },
  {
    path: "/legal",
    prismic: "legal_page", titleField: "page_title", descField: "meta_description",
    title: "Legal Information | Silo",
    description: "Legal information for Silo, a brand strategy, identity and web design studio working across Perth and London.",
    sitemap: { priority: "0.3", changefreq: "yearly" },
  },
  {
    path: "/cookies",
    title: "Cookies Policy | Silo",
    description: "How the Silo website uses cookies and similar technologies, and how to manage your preferences.",
    sitemap: { priority: "0.3", changefreq: "yearly" },
  },
  { path: "/thank-you", title: "Thank you | Silo", description: "Thanks for getting in touch. We'll be in contact soon.", sitemap: false, noindex: true },
  { path: "/pricing/thank-you", title: "Thank you | Silo", description: "Thanks for getting in touch with Silo.", sitemap: false, noindex: true },
  { path: "/404", title: "Page not found | Silo", description: "This page doesn't exist. Explore Silo's brand strategy, identity and web design work.", sitemap: false, noindex: true },
];

// Prismic repeatable types that get a page each. imageField: preferred share image for that page.
export const COLLECTIONS = [
  {
    type: "case_study",
    path: (uid) => `/case-studies/${uid}`,
    titleField: "meta_title", titleFallbackField: "title",
    descField: "meta_description", descFallbackField: "subtitle",
    imageField: "hero_image",
    schemaType: null,
    sitemap: { priority: "0.7", changefreq: "monthly" },
  },
  {
    type: "blog_post",
    path: (uid) => `/blog/${uid}`,
    titleField: "meta_title", titleFallbackField: "title",
    descField: "meta_description", descFallbackField: null,
    imageField: "featured_image",
    schemaType: "BlogPosting",
    sitemap: { priority: "0.6", changefreq: "monthly" },
  },
];

export const BLOG_FALLBACK_DESCRIPTION =
  "Insights on brand strategy, identity, UI/UX and web development from the Silo team in Perth and London.";

export const pageSeo = (path) => PAGES.find((p) => p.path === path) || PAGES[0];

// Structured data for the business. Same @id on every page so search engines treat it as one entity.
export const organizationSchema = () => {
  const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== undefined && v !== ""));
  return clean({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.origin}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.origin}/`,
    description: SITE.description,
    logo: `${SITE.origin}${SITE.logo}`,
    image: `${SITE.origin}${SITE.ogImage}`,
    email: SITE.email,
    telephone: SITE.telephone,
    address: { "@type": "PostalAddress", ...SITE.address },
    areaServed: SITE.areaServed,
    sameAs: SITE.sameAs,
    knowsAbout: SITE.services,
    makesOffer: SITE.services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  });
};
