import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import LazyText from "../Common/LazyText";
import AccentHeadline from "../Common/AccentHeadline";
import SiloTriangle from "../Common/SiloTriangle";

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

const buttonInner = (text, colour) => (
  <>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
      <FaChevronRight className={`${colour} w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]`} />
    </div>
    <span className="block transition-all whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
      {text}
    </span>
  </>
);

const Hero = ({
  heading,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}) => {
  const displayHeading = plainHeading(heading || defaults.heading);

  return (
    <section
      className="mt-20 w-full px-4 md:px-6 lg:px-0 pt-12 sm:pt-16 md:pt-20 lg:pt-28 pb-16 md:pb-20 lg:pb-24"
      aria-label="About Silo - Company introduction"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,400px)] gap-10 md:gap-16 items-end">
        <div className="flex flex-col gap-10 md:gap-20">
          <LazyText animation="fadeUp" delay={0}>
            <AccentHeadline
              as="h1"
              accentKey="about"
              text={displayHeading}
              className="font-epilogue font-bold text-black text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.08] tracking-tight max-w-[12ch]"
            />
          </LazyText>
          <SiloTriangle className="hidden md:block w-[88px] h-[72px]" />
        </div>

        <div className="flex flex-col gap-6 md:pb-1">
          <p className="font-epilogue text-black text-base md:text-lg leading-[150%]">
            {description || defaults.description}
          </p>
          <div className="flex flex-row gap-3 sm:gap-4 items-start">
            <Link
              to={primaryButtonLink || defaults.primaryButtonLink}
              className="inline-flex items-center justify-center gap-2 bg-[#FF322E] h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-white border-transparent relative overflow-hidden group"
            >
              {buttonInner(primaryButtonText || defaults.primaryButtonText, "text-white")}
            </Link>
            <Link
              to={secondaryButtonLink || defaults.secondaryButtonLink}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-brand relative overflow-hidden group"
            >
              {buttonInner(secondaryButtonText || defaults.secondaryButtonText, "text-brand")}
            </Link>
          </div>
          <SiloTriangle className="md:hidden mt-6 w-[56px] h-[46px]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
