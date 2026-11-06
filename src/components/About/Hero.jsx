import SplitHero from "../Common/SplitHero";

// Default values (mirror of the Prismic `about_page` hero fields). The hero photos were removed in
// Nic's October "no images" design, so hero_main_image / hero_secondary_image are no longer shown.
const defaults = {
  heading: "This is Silo, we're glad you're here.",
  description: "Still a London agency, and now a Perth one too. Silo was built on the belief that great brand presence is more than output. It is intentional, strategic and shaped by design, content and digital experiences that serve a clear purpose.",
  primaryButtonText: "Let's chat",
  primaryButtonLink: "/contact",
  secondaryButtonText: "Our services",
  secondaryButtonLink: "/services",
};

// Older Prismic values / defaults carried inline HTML (<br />, a red <span>). The red accent now comes
// from src/data/headlineAccents.js, so strip any markup and render plain text.
const plainHeading = (heading) => heading.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const Hero = ({
  heading,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}) => (
  <SplitHero
    ariaLabel="About Silo - Company introduction"
    accentKey="about"
    heading={plainHeading(heading || defaults.heading)}
    description={description || defaults.description}
    primary={{ text: primaryButtonText || defaults.primaryButtonText, to: primaryButtonLink || defaults.primaryButtonLink }}
    secondary={{ text: secondaryButtonText || defaults.secondaryButtonText, to: secondaryButtonLink || defaults.secondaryButtonLink }}
  />
);

export default Hero;
