import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { createPortal } from "react-dom";
import LazyImage from "../Common/LazyImage";
import LazyText from "../Common/LazyText";

const VideoContent = ({ onClick, onClose }) => (
  <div className="flex items-center justify-end pointer-events-auto">
    {/* Vertical Text Outside */}
    <div className="flex flex-col items-center mr-2 max-w-[12px]">
      <span className="text-black font-bold text-xs tracking-wide rotate-[-90deg] whitespace-nowrap">
        Cut through the noise
      </span>
    </div>
    {/* Video Section */}
    <div className="relative flex items-center justify-center w-[140px] sm:w-[180px] md:w-[150px] h-[200px]">
      <img
        src="https://images.prismic.io/silosite/aVUgPXNYClf9otrD_v1763796208_image_7_hpf0du.png?auto=format,compress"
        alt="Video thumbnail"
        className="w-full h-full object-cover shadow-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      {/* Play Button Overlay */}
      <button
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg flex items-center justify-center w-14 h-14 border-2 border-white hover:scale-105 transition"
        onClick={onClick}
        aria-label="Play video"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="16" fill="white" />
          <polygon points="13,10 24,16 13,22" fill="#000" />
        </svg>
      </button>
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition"
        onClick={onClose}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="4"
            y1="4"
            x2="14"
            y2="14"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="4"
            x2="4"
            y2="14"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  </div>
);

const Hero = () => {
  const [showVideoSection, setShowVideoSection] = useState(true);
  const [showVimeoModal, setShowVimeoModal] = useState(false);
  const [videoStyle, setVideoStyle] = useState({
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 40,
  });
  const [isDesktop, setIsDesktop] = useState(false);
  const mdPlaceholderRef = useRef(null);
  const xlPlaceholderRef = useRef(null);

  // Handle scroll for sticky video
  useEffect(() => {
    const handleScroll = () => {
      // Check if we are in desktop mode (md breakpoint is 768px)
      const isDesktopView = window.innerWidth >= 768;
      setIsDesktop(isDesktopView);

      if (!isDesktopView) return;

      const footer = document.querySelector("footer");
      if (!footer) return;

      // Determine active placeholder
      const placeholder =
        mdPlaceholderRef.current && mdPlaceholderRef.current.offsetParent
          ? mdPlaceholderRef.current
          : xlPlaceholderRef.current;

      let rightPos = 24; // Default
      if (placeholder) {
        const rect = placeholder.getBoundingClientRect();
        rightPos = window.innerWidth - rect.right;
        // Ensure it doesn't go negative or too small
        if (rightPos < 24) rightPos = 24;
      }

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const bottomGap = 100; // Increased to stop earlier before footer

      if (footerRect.top < viewportHeight) {
        // Footer is visible, stick to footer
        const newBottom = viewportHeight - footerRect.top + bottomGap;
        setVideoStyle({
          position: "fixed",
          bottom: `${newBottom}px`,
          right: `${rightPos}px`,
          zIndex: 40,
        });
      } else {
        // Footer not visible, stick to bottom of screen
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
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* First Section - Hero */}
      <section
        className="my-20 mt-24 flex items-center w-full justify-start px-3 sm:px-2 md:px-6 lg:px-0 overflow-hidden md:h-[calc(100vh-50px)]"
        aria-label="About Silo - Company introduction"
      >
        <div className="flex flex-col justify-between xl:grid xl:grid-cols-[1fr_1.5fr] gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 max-w-full mx-auto w-full items-center">
          {/* Text Content Area */}
          <div
            className="flex flex-col h-full justify-start xl:justify-between space-y-3 sm:space-y-4 md:space-y-5 order-1 xl:order-1 xl:pr-6 w-full items-start"
            role="main"
          >
            {/* Main Heading - Zoom & Small Laptop Optimized */}
            <LazyText
              as="h1"
              className="font-bold text-black text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-[56px] leading-6 text-left px-2 sm:px-0 md:px-0 mt-4 sm:mt-0"
              animation="fadeUp"
              delay={0}
              style={{
                fontFamily: "Epilogue, sans-serif",
                fontWeight: 700,
                lineHeight: "110%",
                letterSpacing: "0%",
              }}
            >
              This is <br /> <span className="text-[#FF322E]">Silo, </span>we're
              <br /> glad you're <br /> here.
            </LazyText>

            {/* Text and Buttons Container */}
            <div className="flex flex-col gap-2 sm:gap-3 items-start w-full px-2 sm:px-0">
              {/* Brand Statement - Zoom & Small Laptop Optimized */}
              <LazyText animation="fadeUp" delay={100}>
                <p
                  className="text-black text-sm sm:text-base md:text-base lg:text-lg xl:text-[16px] leading-relaxed text-left max-w-full xl:max-w-lg px-2 md:px-0 font-epilogue"
                  style={{
                    fontWeight: 400,
                    fontFamily: "Epilogue, sans-serif",
                    lineHeight: "150%",
                    letterSpacing: "0%",
                  }}
                >
                  Silo was built on the belief that great brand presence is more than output - it is intentional, strategic and shaped by design, content and digital experiences that serve a clear purpose.
                </p>
              </LazyText>

              {/* Buttons - Zoom & Small Laptop Optimized */}
              <div className="flex flex-row gap-3 sm:gap-4 items-start w-full sm:w-auto xl:mx-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF322E] h-[48px] px-5 py-2 text-xs font-bold tracking-wide text-white border-transparent relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all font-normal whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
                    Let's chat
                  </span>
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-[48px] px-5 py-2 text-xs font-bold tracking-wide text-brand relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="text-brand w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all whitespace-nowrap font-normal duration-300 ease-in-out text-base group-hover:translate-x-40">
                    Our services
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Visual Content Area - Responsive Layout (copied from CaseStudies) */}
          <div className="order-2 xl:order-2 w-full mt-10 md:mt-0">
            {/* Mobile Layout: Large image first, small image + video section below */}
            <div className="flex flex-col md:hidden gap-0">
              {/* Large Image */}
              <div className="w-full">
                <LazyImage
                  src="https://images.prismic.io/silosite/aVUgTXNYClf9otrT_v1765904058_1_re8aok.png?auto=format,compress"
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[500px] sm:max-h-[350px]"
                  containerClassName="w-full"
                />
              </div>
              {/* Small Image */}
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                <div className="hidden sm:flex justify-center">
                  <LazyImage
                    src="https://images.prismic.io/silosite/aVUgTHNYClf9otrS_v1765904057_Placeholder_Image_ouj13b.png?auto=format,compress"
                    alt="The Silo brand representation"
                    className="w-32 h-auto object-cover"
                    containerClassName="w-32"
                  />
                </div>
              </div>
            </div>

            {/* MD Layout: Large image left, small image + video section right */}
            <div className="hidden md:flex xl:hidden gap-6">
              {/* Large Image */}
              <div className="flex-1">
                <LazyImage
                  src="https://images.prismic.io/silosite/aVUgTXNYClf9otrT_v1765904058_1_re8aok.png?auto=format,compress"
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[500px] lg:max-h-[550px]"
                  containerClassName="w-full"
                />
              </div>
              {/* Right Column: Small image + video section */}
              <div className="flex flex-col gap-4 justify-between items-end">
                {/* Small Image */}
                <div>
                  <LazyImage
                    src="https://images.prismic.io/silosite/aVUgTHNYClf9otrS_v1765904057_Placeholder_Image_ouj13b.png?auto=format,compress"
                    alt="The Silo brand representation"
                    className="w-48 lg:w-56 h-auto object-cover max-h-[300px] lg:max-h-[350px]"
                    containerClassName="w-48 lg:w-56"
                  />
                </div>
                {/* Video Section Placeholder */}
                <div ref={mdPlaceholderRef} className="w-[150px] h-[200px]" />
              </div>
            </div>

            {/* XL Layout: Large image left, small image + video section right */}
            <div className="hidden xl:flex gap-6">
              {/* Large Image */}
              <div className="flex-1 max-w-[438px]">
                <LazyImage
                  src="https://images.prismic.io/silosite/aVUgTXNYClf9otrT_v1765904058_1_re8aok.png?auto=format,compress"
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[550px] 2xl:max-h-none"
                  containerClassName="w-full"
                />
              </div>
              {/* Right Column: Small image + video section */}
              <div className="flex flex-col justify-between items-end">
                {/* Small Image */}
                <div className="mb-4">
                  <LazyImage
                    src="https://images.prismic.io/silosite/aVUgTHNYClf9otrS_v1765904057_Placeholder_Image_ouj13b.png?auto=format,compress"
                    alt="The Silo brand representation"
                    className="w-64 2xl:w-[328px] h-auto object-cover xl:min-h-[200px] 2xl:max-h-none"
                    containerClassName="w-64 2xl:w-[328px]"
                  />
                </div>
                {/* Video Section Placeholder */}
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
