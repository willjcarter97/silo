import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicRichText } from "@prismicio/react";

gsap.registerPlugin(ScrollTrigger);

// Rich text components for proper formatting
const richTextComponents = {
  paragraph: ({ children }) => (
    <p className="text-base md:text-lg font-dm text-black leading-relaxed mb-4 last:mb-0">{children}</p>
  ),
  heading2: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-dm font-semibold text-black mb-2 mt-6 first:mt-0">{children}</h3>
  ),
  heading3: ({ children }) => (
    <h3 className="text-lg md:text-xl font-dm font-semibold text-black mb-2 mt-5 first:mt-0">{children}</h3>
  ),
  list: ({ children }) => (
    <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
  ),
  oList: ({ children }) => (
    <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
  ),
  listItem: ({ children }) => (
    <li className="text-base md:text-lg font-dm text-black leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  hyperlink: ({ children, node }) => (
    <a href={node.data.url} className="text-brand underline hover:no-underline" target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

const GalleryWithText = ({ heading, text, content, richText, images, itemSpacing }) => {
  const defaultImages = [
    { src: null, alt: "Gallery image 1" },
    { src: null, alt: "Gallery image 2" },
    { src: null, alt: "Gallery image 3" },
  ];
  const displayImages = images || defaultImages;

  const containerRef = useRef(null);
  const textRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !textRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const textEl = textRef.current;
      const wrapperEl = wrapperRef.current;
      let lastScrollY = window.scrollY;

      // Reset position
      gsap.set(textEl, { y: 0 });

      ScrollTrigger.create({
        trigger: wrapperEl,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const scrollY = window.scrollY;
          const delta = scrollY - lastScrollY;
          lastScrollY = scrollY;

          if (Math.abs(delta) < 0.1) return;

          const textRect = textEl.getBoundingClientRect();
          const currentY = gsap.getProperty(textEl, "y");
          const maxTranslate = wrapperEl.offsetHeight - textEl.offsetHeight;

          if (maxTranslate <= 0) return;

          let newY = currentY;
          const viewHeight = window.innerHeight;

          const isShort = textEl.offsetHeight < viewHeight;

          if (delta > 0) {
            // Scrolling DOWN
            if (isShort) {
              // If text is short, prioritize sticking to TOP
              if (textRect.top <= 120) {
                newY += delta;
              }
            } else {
              // If text is tall, stick to BOTTOM
              if (textRect.bottom <= viewHeight - 60) {
                newY += delta;
              }
            }
          } else {
            // Scrolling UP
            // If top of text is visible (or below top of view), pin it (move up with scroll -> decrease y relative to content, so add negative delta)
            if (textRect.top >= 120) {
              newY += delta;
            }
          }

          // Clamp
          newY = Math.min(Math.max(newY, 0), maxTranslate);
          gsap.set(textEl, { y: newY });
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white py-8 md:py-20 px-5 md:px-6 lg:px-0 relative"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">
        {/* Left Images */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 order-2 lg:order-1">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="w-full aspect-square bg-white overflow-hidden"
            >
              {image.src ? (
                <img
                  src={image.src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  className={image.className || "w-full h-full object-contain"}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#DBDBDB]">
                  <svg
                    className="w-20 h-20 text-[#BABABA]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Text */}
        <div
          ref={wrapperRef}
          className="w-full lg:w-1/2 order-1 lg:order-2 relative"
          style={{ minHeight: "320px" }}
        >
          <div ref={textRef} className="relative lg:absolute w-full top-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
              {heading || "Mobile-first design that converts"}
            </h2>
            {/* Priority 1: Use PrismicRichText for proper formatting */}
            {richText && Array.isArray(richText) && richText.length > 0 ? (
              <div className={itemSpacing || "space-y-4"}>
                <PrismicRichText field={richText} components={richTextComponents} />
              </div>
            ) : content ? (
              content.map((item, index) => (
                <div
                  key={index}
                  className={`${itemSpacing || "mb-8"} last:mb-0`}
                >
                  {item.subheading && (
                    <h3 className="text-lg md:text-xl font-dm font-semibold text-black mb-2 mt-5 first:mt-0">
                      {item.subheading}
                    </h3>
                  )}
                  <p className="text-base md:text-lg font-dm text-black leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))
            ) : Array.isArray(text) ? (
              text.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg text-black leading-relaxed mb-6 last:mb-0"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-base md:text-lg text-black leading-relaxed">
                {text ||
                  "With 68% of traffic from mobile, every interaction was optimized for touch. The checkout was reduced to three taps, with desktop equally refined."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryWithText;
