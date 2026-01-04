import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { WelcomeLetters } from "./WelcomeLetters";
import { FaPlay } from "react-icons/fa";

export default function VideoAndWelcome({
  showVideo = false,
  videoUrl = "https://player.vimeo.com/video/76979871",
  imageUrl = "https://images.prismic.io/silosite/aVUgonNYClf9otsZ_v1762717240_image_re2b0o.png?auto=format,compress",
  welcomeHeading = "We are the creative agency for brands that want stronger strategy, better design, smarter websites and content that truly connects",
  welcomeDescription = "We create content first, personality driven work that delivers real results and elevates your brand. Our approach unites strategic management, bold design, brand development, seamless websites and authentic creator content into one cohesive, creative and engaging experience across every digital touchpoint.",
  // Mobile has different default content - shorter, punchier version
  mobileHeading = "We're the creative agency for brands that want more than filler posts or cookie–cutter campaigns.",
  mobileDescription = "We create intentional, personality–driven content, from authentic creator videos to scroll–stopping social feeds – designed to connect. Every piece is gin strategy, fuelled by creativity, and built to spark genuine engagement that grows your brand's online community.",
  aboutButtonText = "About us",
  aboutButtonLink = "/about",
  secondaryLinkText = "Let's Talk",
  secondaryLinkUrl = "/contact",
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (!showVideo) return;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const playerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const node = playerRef.current;
      if (!node) return;
      if (!node.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const year = new Date().getFullYear();

  return (
    <div className="pb-0">
      {/* Mobile-only simplified block: visible on small screens only
          Animated letters placed BEFORE the content on mobile as requested. */}

      <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-6 md:mt-10 lg:mt-14 z-20">
        <div className="h-80 lg:h-[80vh] md:h-[60vh] relative z-20">
          <img
            src={imageUrl}
            alt="Showcase"
            className="block w-full h-full object-cover select-none"
            loading="lazy"
          />

          {showVideo ? (
            <>
              {/* semi-transparent black cover */}
              <div className="absolute inset-0 bg-black/60" aria-hidden />

              {/* centered play CTA */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-4 text-start text-white px-4">
                  <button
                    type="button"
                    aria-label="Play showreel"
                    onClick={handleOpen}
                    className="flex items-center justify-center w-12 h-12 md:w-12 md:h-12 rounded-full bg-white text-black shadow-lg hover:bg-brand hover:scale-110"
                  >
                    <FaPlay className="bg-transparent" />
                  </button>

                  <h3 className="text-lg md:text-base font-medium leading-tight">
                    Watch our showreel <br /> 2015–{year}
                  </h3>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {open &&
        createPortal(
          <div
            onClick={handleClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
          >
            <div
              onClick={handleClose}
              className="absolute inset-0 bg-black/60"
            />

            <div
              ref={playerRef}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1100px] mx-4 h-[50vh] md:h-[60vh]"
            >
              {/* Vimeo embed with no border and no border-radius */}
              <iframe
                title="Vimeo player"
                src={`${videoUrl}?autoplay=1&muted=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 0, borderRadius: 0 }}
              />
            </div>
          </div>,
          document.body
        )}

      <div className="hidden md:block relative mx-auto mt-10 md:mt-10 lg:mt-20">
        <div
          id="welcome-parent-div"
          className="relative flex items-end max-w-[1280px] mx-auto justify-between h-[60vh] lg:h-[70vh] xl:h-[80vh] md:h-[60vh] 2xl:h-[90vh] z-10"
        >
          {/* Left text div - aligned at bottom left */}
          <div className="relative z-10 self-end pb-20 max-w-[38%] md:max-w-[35%] flex flex-col justify-end gap-6 md:gap-7">
            <p className="text-base md:text-base lg:text-xl font-semibold md:tracking-tighter tracking-tight text-black">
              {welcomeHeading}
            </p>
            <p className="text-xs md:text-xs lg:text-base font-semibold leading-relaxed text-black/80">
              {welcomeDescription}
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <a
                href={aboutButtonLink}
                className="inline-flex items-center justify-center gap-2 bg-[#FF322E] w-xl h-[48px] px-6 py-3 text-xs font-bold  tracking-wide text-white  border-transparent relative overflow-hidden group"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 translate-x-5 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="block text-white w-4 h-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-7 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-28">
                  {aboutButtonText}
                </span>
              </a>
              <a
                href={secondaryLinkUrl}
                className="inline-flex items-center gap-2 font-dm font-bold text-xl leading-[150%] text-[#FF322E] tracking-normal group"
              >
                <span>{secondaryLinkText}</span>
                <span
                  aria-hidden
                  className="inline-block ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                >
                  <MdOutlineKeyboardArrowRight className="text-2xl font-black" />
                </span>
              </a>
            </div>
          </div>

          {/* Welcome text div - aligned at bottom right, covering full width */}
          <div className="relative z-20 self-end w-[55%] h-full flex justify-start items-end pb-16 pointer-events-none select-none overflow-visible">
            <div className="canvas w-full h-full relative flex items-end">
              <WelcomeLetters />
            </div>
          </div>
        </div>
      </div>

      <div
        id="welcome-parent-div-mobile"
        className="md:hidden h-[38rem] flex justify-center items-center gap-10 px-[4vw]"
      >
        <div className="flex flex-col justify-center items-center gap-0 h-full">
          <div className="pointer-events-none select-none mb-0 md:mb-6 mt-10 h-[35rem] w-[80vw] ml-20">
            <WelcomeLetters />
          </div>

          {/* Mobile play CTA - opens the same Vimeo popout as desktop */}
          <div className="flex justify-center -mt-8">
            {showVideo && (
              <button
                type="button"
                aria-label="Play showreel"
                onClick={handleOpen}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black shadow-lg hover:bg-brand hover:scale-110"
              >
                <FaPlay className="bg-transparent" />
              </button>
            )}
          </div>

          <div className="mx-[3vw] md:px-0 ">
            <p className="text-[18px] font-extrabold tracking-tight text-black">
              {mobileHeading}
            </p>
            <p className="text-[12px] leading-relaxed text-black/80 mt-2">
              {mobileDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <a
                href={aboutButtonLink}
                className="inline-flex items-center justify-center gap-2  bg-[#FF322E] h-[48px] px-6 py-3 text-xs font-bold  tracking-wide text-white border-transparent relative overflow-hidden group"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-2 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-6">
                  {aboutButtonText}
                </span>
              </a>
              <a
                href={secondaryLinkUrl}
                className="inline-flex items-center gap-2 font-dm font-bold text-lg leading-[150%] text-[#FF322E] tracking-normal group"
              >
                <span>{secondaryLinkText}</span>
                <span
                  aria-hidden
                  className="inline-block ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                >
                  <MdOutlineKeyboardArrowRight className="text-xl font-black" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
