import CtaBand from "./CtaBand";

/**
 * WantResultsLikeThis - CTA at the end of each case study, shown as the black CtaBand.
 *
 * @param {string} heading - Main heading text (default: "Want results like this?")
 * @param {string} description - Description text below heading
 * @param {string} primaryButtonText - Text for primary button (default: "Let's talk")
 * @param {string} primaryButtonLink - Link for primary button (default: "/contact")
 * @param {string} secondaryButtonText - Text for secondary button (default: "See more work")
 * @param {string} secondaryButtonLink - Link for secondary button (default: "/case-studies")
 * @param {string} className - Additional classes for the section wrapper
 *
 * imageSrc / imageAlt are still accepted (the Prismic singleton has an image field) but are no
 * longer shown: the October designs remove imagery from CTA sections.
 */
const WantResultsLikeThis = ({
  heading = "Want results like this?",
  description = "Reach out and we'll walk you through how we can help on your next project.",
  primaryButtonText = "Let's talk",
  primaryButtonLink = "/contact",
  secondaryButtonText = "See more work",
  secondaryButtonLink = "/case-studies",
  className = "",
}) => (
  <CtaBand
    heading={heading}
    description={description}
    actions={[
      { text: primaryButtonText, href: primaryButtonLink, variant: "primary" },
      { text: secondaryButtonText, href: secondaryButtonLink, variant: "secondary" },
    ]}
    className={className}
  />
);

export default WantResultsLikeThis;
