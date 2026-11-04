import { FaChevronRight } from "react-icons/fa";
import LazyText from "./LazyText";
import AccentHeadline from "./AccentHeadline";
import SiloTriangle from "./SiloTriangle";

// Page hero in the About page layout: big headline + red triangle on the left,
// description and the two buttons on the right (stacked below laptop width so long headlines
// keep their line breaks). Spacing matches About and Case Studies.

const HeroButton = ({ text, href, onClick, filled }) => {
  const colour = filled ? "text-white" : "text-brand";
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 h-[55px] px-6 py-3 text-xs font-bold tracking-wide relative overflow-hidden group ${
        filled ? "bg-[#FF322E] text-white border-transparent" : "bg-transparent border-[1px] border-brand text-brand"
      }`}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
        <FaChevronRight className={`${colour} w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]`} />
      </div>
      <span className="block transition-all whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
        {text}
      </span>
    </a>
  );
};

const SplitHero = ({
  heading,
  accentKey,
  description,
  primary,
  secondary,
  ariaLabel,
  headingWidth = "max-w-[12ch]",
}) => (
  <section
    className="mt-20 w-full max-w-[1280px] mx-auto px-4 md:px-10 min-[1360px]:px-0 pt-12 sm:pt-16 md:pt-20 lg:pt-28 pb-16 md:pb-20 lg:pb-24"
    aria-label={ariaLabel}
  >
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,400px)] gap-10 lg:gap-16 items-end">
      <div className="flex flex-col gap-10 lg:gap-20">
        <LazyText animation="fadeUp" delay={0}>
          <AccentHeadline
            as="h1"
            accentKey={accentKey}
            text={heading}
            className={`font-epilogue font-bold text-black text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.08] tracking-tight ${headingWidth}`}
          />
        </LazyText>
        <SiloTriangle className="hidden lg:block w-[88px] h-[72px]" />
      </div>

      <div className="flex flex-col gap-6 lg:pb-1">
        <p className="font-epilogue text-black text-base md:text-lg leading-[150%]">{description}</p>
        <div className="flex flex-row gap-3 sm:gap-4 items-start">
          {primary && <HeroButton {...primary} filled />}
          {secondary && <HeroButton {...secondary} />}
        </div>
        <SiloTriangle className="lg:hidden mt-6 w-[56px] h-[46px]" />
      </div>
    </div>
  </section>
);

export default SplitHero;
