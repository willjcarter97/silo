import CtaBand from "./CtaBand";

/**
 * ReadyWhenYouAre - site-wide "Ready when you are." call to action, shown as the black CtaBand.
 *
 * @param {string} heading - Main heading text (default: "Ready when you are.")
 * @param {string} description - Description text below heading
 * @param {string} primaryButtonText - Button text (default: "Let's Talk")
 * @param {string} primaryButtonLink - Button link (default: "/contact")
 * @param {string} className - Additional classes for the section wrapper
 *
 * imageSrc / imageAlt are still accepted (the Prismic singleton has an image field) but are no
 * longer shown: the October designs remove imagery from this section.
 */
const ReadyWhenYouAre = ({
  heading = "Ready when you are.",
  description = "Whether you're ready to refine your brand, design or digital world, everything starts right here.",
  primaryButtonText = "Let's Talk",
  primaryButtonLink = "/contact",
  className = "",
}) => (
  <CtaBand
    heading={heading}
    description={description}
    actions={[{ text: primaryButtonText, href: primaryButtonLink, variant: "primary" }]}
    className={className}
  />
);

export default ReadyWhenYouAre;
