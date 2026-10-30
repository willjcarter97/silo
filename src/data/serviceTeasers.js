// Homepage "This is simply what we do" cards (Nic's October designs: icon, title, one-line blurb, no photo).
//
// Keyed by the service title as it appears in Prismic (home_page.service_cards[].service_title), compared
// case- and punctuation-insensitively. A Prismic service_description always wins; the blurb here is the
// fallback while that field is empty. To add a service: add a row here (and an icon in ServiceIcon.jsx,
// or reuse an existing one).
export const SERVICE_TEASERS = [
  {
    title: "Brand Strategy",
    icon: "strategy",
    blurb: "Positioning, messaging and brand architecture that gives every decision after it somewhere solid to stand on.",
  },
  {
    title: "Visual Identity",
    icon: "identity",
    blurb: "Design bold branding and expressive detail to shape how your brand looks, feels and gets remembered.",
  },
  {
    title: "UI/UX Design",
    icon: "uiux",
    blurb: "From structure to flow, we design how your site works, how it moves and how it feels.",
  },
  {
    title: "Custom Web Development",
    icon: "web",
    blurb: "A strong design deserves a strong build. We create sites that perform and stand the test of time.",
  },
];

const key = (s = "") => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export const findServiceTeaser = (title) => SERVICE_TEASERS.find((t) => key(t.title) === key(title));
