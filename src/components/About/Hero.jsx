import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import LazyImage from "../Common/LazyImage";
import LazyText from "../Common/LazyText";

// Default values
const defaults = {
  heading: 'This is <br /> <span class="text-[#FF322E]">Silo, </span>we\'re<br /> glad you\'re <br /> here.',
  description: "Silo was built on the belief that great brand presence is more than output - it is intentional, strategic and shaped by design, content and digital experiences that serve a clear purpose.",
  primaryButtonText: "Let's chat",
  primaryButtonLink: "/contact",
  secondaryButtonText: "Our services",
  secondaryButtonLink: "/services",
  mainImage: "https://images.prismic.io/silosite/aVUgTXNYClf9otrT_v1765904058_1_re8aok.png?auto=format,compress",
  secondaryImage: "https://images.prismic.io/silosite/aVUgTHNYClf9otrS_v1765904057_Placeholder_Image_ouj13b.png?auto=format,compress",
};

/**
 * Helper to style "Silo" word in red within the heading
 */
const styleHeading = (heading) => {
  if (!heading) return defaults.heading;
  
  // If it already has HTML tags (like from defaults), return as-is
  if (heading.includes('<span') || heading.includes('<br')) {
    return heading;
  }
  
  // Replace "Silo" with a red-styled span
  return heading.replace(
    /\bSilo\b/gi, 
    '<span class="text-[#FF322E]">Silo</span>'
  );
};

const Hero = ({
  heading,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  mainImage,
  secondaryImage,
}) => {
  const [videoStyle, setVideoStyle] = useState({
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 40,
  });
  const [isDesktop, setIsDesktop] = useState(false);
  const mdPlaceholderRef = useRef(null);
  const xlPlaceholderRef = useRef(null);

  // Use props with fallback to defaults, and ensure "Silo" is styled red
  const displayHeading = styleHeading(heading || defaults.heading);
  const displayDescription = description || defaults.description;
  const displayPrimaryButtonText = primaryButtonText || defaults.primaryButtonText;
  const displayPrimaryButtonLink = primaryButtonLink || defaults.primaryButtonLink;
  const displaySecondaryButtonText = secondaryButtonText || defaults.secondaryButtonText;
  const displaySecondaryButtonLink = secondaryButtonLink || defaults.secondaryButtonLink;
  const displayMainImage = mainImage || defaults.mainImage;
  const displaySecondaryImage = secondaryImage || defaults.secondaryImage;

  // Handle scroll for sticky video
  useEffect(() => {
    const handleScroll = () => {
      const isDesktopView = window.innerWidth >= 768;
      setIsDesktop(isDesktopView);

      if (!isDesktopView) return;

      const footer = document.querySelector("footer");
      if (!footer) return;

      const placeholder =
        mdPlaceholderRef.current && mdPlaceholderRef.current.offsetParent
          ? mdPlaceholderRef.current
          : xlPlaceholderRef.current;

      let rightPos = 24;
      if (placeholder) {
        const rect = placeholder.getBoundingClientRect();
        rightPos = window.innerWidth - rect.right;
        if (rightPos < 24) rightPos = 24;
      }

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const bottomGap = 100;

      if (footerRect.top < viewportHeight) {
        const newBottom = viewportHeight - footerRect.top + bottomGap;
        setVideoStyle({
          position: "fixed",
          bottom: `${newBottom}px`,
          right: `${rightPos}px`,
          zIndex: 40,
        });
      } else {
        setVideoStyle({
          position: "fixed",
          bottom: "24px",
          right: `${rightPos}px`,
          zIndex: 40,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* First Section - Hero */}
      <section
        className="my-12 mt-20 md:my-16 md:mt-24 lg:my-20 flex items-center w-full justify-start px-3 sm:px-2 md:px-6 lg:px-0 overflow-hidden md:h-[calc(100vh-50px)]"
        aria-label="About Silo - Company introduction"
      >
        <div className="flex flex-col justify-between xl:grid xl:grid-cols-[1fr_1.5fr] gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 max-w-full mx-auto w-full items-center">
          {/* Text Content Area */}
          <div
            className="flex flex-col h-full justify-start xl:justify-between space-y-3 sm:space-y-4 md:space-y-5 order-1 xl:order-1 xl:pr-6 w-full items-start px-3 sm:px-0"
            role="main"
          >
            {/* Main Heading */}
            <LazyText
              as="h1"
              className="font-bold text-black text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-[56px] leading-6 text-left mt-4 sm:mt-0"
              animation="fadeUp"
              delay={0}
              style={{
                fontFamily: "Epilogue, sans-serif",
                fontWeight: 700,
                lineHeight: "110%",
                letterSpacing: "0%",
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: displayHeading }} />
            </LazyText>

            {/* Text and Buttons Container */}
            <div className="flex flex-col gap-2 sm:gap-3 items-start w-full">
              {/* Brand Statement */}
              <LazyText animation="fadeUp" delay={100}>
                <p
                  className="text-black text-base md:text-base lg:text-lg xl:text-[16px] leading-relaxed text-left w-full xl:max-w-lg font-epilogue"
                  style={{
                    fontWeight: 400,
                    fontFamily: "Epilogue, sans-serif",
                    lineHeight: "150%",
                    letterSpacing: "0%",
                  }}
                >
                  {displayDescription}
                </p>
              </LazyText>

              {/* Buttons */}
              <div className="flex flex-row gap-3 sm:gap-4 items-start w-full sm:w-auto xl:mx-0">
                <Link
                  to={displayPrimaryButtonLink}
                  className="inline-flex items-center justify-center gap-2 bg-[#FF322E] h-[48px] px-5 py-2 text-xs font-bold tracking-wide text-white border-transparent relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all font-normal whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
                    {displayPrimaryButtonText}
                  </span>
                </Link>

                <Link
                  to={displaySecondaryButtonLink}
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-[48px] px-5 py-2 text-xs font-bold tracking-wide text-brand relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="text-brand w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all whitespace-nowrap font-normal duration-300 ease-in-out text-base group-hover:translate-x-40">
                    {displaySecondaryButtonText}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Visual Content Area */}
          <div className="order-2 xl:order-2 w-full mt-10 md:mt-0">
            {/* Mobile Layout */}
            <div className="flex flex-col md:hidden gap-0">
              <div className="w-full">
                <LazyImage
                  src={displayMainImage}
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[500px] sm:max-h-[350px]"
                  containerClassName="w-full"
                />
              </div>
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                <div className="hidden sm:flex justify-center">
                  <LazyImage
                    src={displaySecondaryImage}
                    alt="The Silo brand representation"
                    className="w-32 h-auto object-cover"
                    containerClassName="w-32"
                  />
                </div>
              </div>
            </div>

            {/* MD Layout */}
            <div className="hidden md:flex xl:hidden gap-6">
              <div className="flex-1">
                <LazyImage
                  src={displayMainImage}
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[500px] lg:max-h-[550px]"
                  containerClassName="w-full"
                />
              </div>
              <div className="flex flex-col gap-4 justify-between items-end">
                <div>
                  <LazyImage
                    src={displaySecondaryImage}
                    alt="The Silo brand representation"
                    className="w-48 lg:w-56 h-auto object-cover max-h-[300px] lg:max-h-[350px]"
                    containerClassName="w-48 lg:w-56"
                  />
                </div>
                <div ref={mdPlaceholderRef} className="w-[150px] h-[200px]" />
              </div>
            </div>

            {/* XL Layout */}
            <div className="hidden xl:flex gap-6">
              <div className="flex-1 max-w-[438px]">
                <LazyImage
                  src={displayMainImage}
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[550px] 2xl:max-h-none"
                  containerClassName="w-full"
                />
              </div>
              <div className="flex flex-col justify-between items-end">
                <div className="mb-4">
                  <LazyImage
                    src={displaySecondaryImage}
                    alt="The Silo brand representation"
                    className="w-64 2xl:w-[328px] h-auto object-cover xl:min-h-[200px] 2xl:max-h-none"
                    containerClassName="w-64 2xl:w-[328px]"
                  />
                </div>
                <div ref={xlPlaceholderRef} className="w-[150px] h-[200px]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
