import { useState, useRef, useEffect } from "react";
import Player from "./vimeo-player";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { PrismicRichText } from "@prismicio/react";

// Rich text components for proper formatting
const richTextComponents = {
  paragraph: ({ children }) => (
    <p className="text-base md:text-base text-black leading-relaxed">{children}</p>
  ),
  heading2: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-bold text-black mb-3">{children}</h3>
  ),
  heading3: ({ children }) => (
    <h3 className="text-lg md:text-xl font-bold text-black mb-2">{children}</h3>
  ),
  list: ({ children }) => (
    <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
  ),
  oList: ({ children }) => (
    <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
  ),
  listItem: ({ children }) => (
    <li className="text-base md:text-base text-black leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  hyperlink: ({ children, node }) => (
    <a href={node.data.url} className="text-brand underline hover:no-underline" target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

const TitleWithDescription = ({
  title,
  description,
  richDescription, // Prismic rich text field for formatted description
  mediaType = "video", // "video" or "image" or "iframe"
  mediaSrc = "https://player.vimeo.com/video/76979871?autoplay=1&muted=1&background=0&controls=0",
  mediaCover = null,
  mediaScaleY = 1,
  minHeightClass = null,
  // allow per-page control of left (title) and right (description) widths
  leftWidthClass = null,
  rightWidthClass = null,
}) => {
  const vimeoIframeRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [animating, setAnimating] = useState(false);
  const animTimeoutRef = useRef(null);
  const [mouseIdle, setMouseIdle] = useState(false);
  const idleTimeoutRef = useRef(null);

  useEffect(() => {
    // initialize Vimeo Player for embedded iframe; do NOT autoplay — start paused by default
    if (mediaType !== "video" && mediaType !== "iframe") return;

    let mounted = true;

    const setupPlayer = () => {
      if (!vimeoIframeRef.current || playerRef.current) return;
      playerRef.current = new Player(vimeoIframeRef.current);
      // set up volume/mute safely
      playerRef.current.setVolume(1).catch(() => {});
      playerRef.current.setMuted(true).catch(() => {});

      // start paused by default
      if (mounted) setIsPlaying(false);

      const handlePlay = () => mounted && setIsPlaying(true);
      const handlePause = () => mounted && setIsPlaying(false);

      playerRef.current.on("play", handlePlay);
      playerRef.current.on("pause", handlePause);

      playerRef.current._silo_handlers = { handlePlay, handlePause };
    };

    const iframe = vimeoIframeRef.current;
    if (iframe) {
      setupPlayer();
      iframe.addEventListener("load", setupPlayer);
    }

    return () => {
      mounted = false;
      if (iframe) iframe.removeEventListener("load", setupPlayer);
      if (playerRef.current) {
        const handlers = playerRef.current._silo_handlers || {};
        try {
          if (handlers.handlePlay)
            playerRef.current.off("play", handlers.handlePlay);
          if (handlers.handlePause)
            playerRef.current.off("pause", handlers.handlePause);
        } catch (e) {}
        try {
          playerRef.current.unload();
        } catch (e) {}
        playerRef.current = null;
      }
    };
  }, [mediaType, mediaSrc]);

  const handleVimeoClick = () => {
    if (!playerRef.current) return;
    playerRef.current.getPaused().then((paused) => {
      if (paused) {
        playerRef.current.play();
        // animate button on resume
        setAnimating(true);
        if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
        animTimeoutRef.current = setTimeout(() => setAnimating(false), 400);
      } else {
        playerRef.current.pause();
      }
    });
  };

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div className="w-full max-w-[1280px] mx-auto pt-11 md:pt-24 px-5 md:px-6 lg:px-0">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 lg:gap-16">
          <div
            className={`${
              leftWidthClass || "md:w-[55%] lg:w-[58%] xl:w-[60%]"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-epilogue font-bold text-black">
              {title || "This job was pretty bloody cool."}
            </h1>
          </div>

          <div
            className={`${
              rightWidthClass || "md:w-[42%] lg:w-[38%] xl:w-[36%]"
            } flex flex-col gap-4`}
          >
            {/* Priority 1: Use PrismicRichText for proper formatting */}
            {richDescription && Array.isArray(richDescription) && richDescription.length > 0 ? (
              <PrismicRichText field={richDescription} components={richTextComponents} />
            ) : Array.isArray(description) ? (
              description.map((para, index) => (
                <p
                  key={index}
                  className="text-base md:text-base text-black leading-relaxed"
                >
                  {para}
                </p>
              ))
            ) : (
              <p className="text-base md:text-base text-black leading-relaxed">
                {description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."}
              </p>
            )}
          </div>
        </div>

        {mediaType !== "none" && (
          <div
            className="relative w-full h-[30vh] md:h-auto md:aspect-video overflow-hidden mt-20"
            onMouseEnter={() => {
              setHovered(true);
              setMouseIdle(false);
              if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
              idleTimeoutRef.current = setTimeout(
                () => setMouseIdle(true),
                1000
              );
            }}
            onMouseMove={() => {
              // reset idle timer on movement
              setMouseIdle(false);
              if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
              idleTimeoutRef.current = setTimeout(
                () => setMouseIdle(true),
                1000
              );
            }}
            onMouseLeave={() => {
              setHovered(false);
              setMouseIdle(false);
              if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current);
                idleTimeoutRef.current = null;
              }
            }}
            onClick={mediaType === "video" ? handleVimeoClick : undefined}
          >
            {mediaType === "video" ? (
              <>
                <iframe
                  ref={vimeoIframeRef}
                  id="vimeo-player"
                  src={mediaSrc}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Vimeo Video"
                  className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto z-0"
                  style={{
                    border: 0,
                    borderRadius: 0,
                    transform: `translate(-50%,-50%) scaleY(${mediaScaleY})`,
                  }}
                />

                {/* Show cover image over the video when paused */}
                {!isPlaying && mediaCover && (
                  <img
                    src={mediaCover}
                    alt={title || "video cover"}
                    className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto object-cover z-10 transform-gpu transition-transform duration-500"
                    style={{ transform: `translate(-50%,-50%) scale(1.03)` }}
                    loading="lazy"
                  />
                )}

                <div className="absolute inset-0 w-full h-full bg-black bg-opacity-30 pointer-events-none z-15" />
              </>
            ) : mediaType === "iframe" ? (
              <>
                <iframe
                  ref={vimeoIframeRef}
                  src={mediaSrc}
                  title={title || "Case study video"}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto"
                  style={{
                    transform: `translate(-50%,-50%) scaleY(${mediaScaleY})`,
                  }}
                />

                {/* Show cover image over the video when paused */}
                {!isPlaying && mediaCover && (
                  <img
                    src={mediaCover}
                    alt={title || "video cover"}
                    className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto object-cover z-10 transform-gpu transition-transform duration-500"
                    style={{ transform: `translate(-50%,-50%) scale(1.03)` }}
                    loading="lazy"
                  />
                )}

                {/* Overlay + centered play/pause button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/** dark overlay shown only when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 z-15" />
                  )}

                  {/* Button: visible when paused, or when hovered while playing and not idle for 1s */}
                  {(!isPlaying || (hovered && !mouseIdle)) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVimeoClick();
                      }}
                      className={`relative z-20 pointer-events-auto rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 ${
                        animating ? "scale-110" : "scale-100"
                      }`}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <FaCirclePause className="w-12 h-12 bg-black rounded-full text-white" />
                      ) : (
                        // Pause icon when paused
                        // Play icon while playing (per spec) — will hide when not hovered
                        <FaCirclePlay className="w-12 h-12 bg-black rounded-full text-white" />
                      )}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <img
                src={mediaSrc}
                alt={title || "Case study media"}
                className="absolute left-1/2 top-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 object-cover"
                loading="lazy"
              />
            )}
          </div>
        )}
      </div>

      {/* Modal removed, video is now in-page. Play/pause toggles on empty area click. */}
    </>
  );
};

export default TitleWithDescription;
