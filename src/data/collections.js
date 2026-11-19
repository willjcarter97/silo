// The two portfolio sections. Case studies (client work) and concepts (self-initiated projects) share the
// same page layouts but are separate Prismic types with their own addresses, intro documents and wording.
import { getCaseStudyLocation } from "./caseStudyLocations";

export const CASE_STUDIES = {
  type: "case_study",
  basePath: "/case-studies",
  pageSingleton: "portfolio_page",
  seoPath: "/case-studies",
  label: "Case Studies",
  singular: "Case Study",
  emptyText: "No case studies found.",
  heroAriaLabel: "Portfolio introduction",
  // Used until/unless the Portfolio Page document in Prismic has values
  heroDefaults: {
    heading: "You're going to want to see these.",
    description: "Some of our recent case studies that showcase the thinking and creativity that move brands forward.",
    primaryButtonText: "Let's chat",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Our services",
    secondaryButtonLink: "/services",
  },
  cta: { secondaryButtonText: "See more work", secondaryButtonLink: "/case-studies" },
  locationFallback: getCaseStudyLocation,
};

export const CONCEPTS = {
  type: "concept",
  basePath: "/concepts",
  pageSingleton: "concepts_page",
  seoPath: "/concepts",
  label: "Concepts",
  singular: "Concept",
  emptyText: "No concepts yet.",
  heroAriaLabel: "Concepts introduction",
  // Used until/unless the Concepts Page document in Prismic has values
  heroDefaults: {
    heading: "Concepts",
    description: "Self-initiated projects that show how we'd approach a brand or website before a client asks.",
    primaryButtonText: "Let's chat",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Case studies",
    secondaryButtonLink: "/case-studies",
  },
  cta: { secondaryButtonText: "See more concepts", secondaryButtonLink: "/concepts" },
  // Concepts have a Location field in Prismic; there is no fallback list for them
  locationFallback: () => null,
};
