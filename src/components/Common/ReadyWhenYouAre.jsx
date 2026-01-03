import React from "react";
import { FaChevronRight } from "react-icons/fa";
import LazyImage from "./LazyImage";

/**
 * ReadyWhenYouAre - Reusable CTA section component
 * 
 * @param {string} heading - Main heading text (default: "Ready when you are.")
 * @param {string} description - Description text below heading
 * @param {string} imageSrc - URL for the image
 * @param {string} imageAlt - Alt text for the image
 * @param {string} primaryButtonText - Text for primary button (default: "For Brands")
 * @param {string} primaryButtonLink - Link for primary button (default: "/contact")
 * @param {string} secondaryButtonText - Text for secondary button (default: "For Creators")
 * @param {string} secondaryButtonLink - Link for secondary button (default: "/ugc-contact")
 * @param {string} className - Additional classes for the section wrapper
 */
const ReadyWhenYouAre = ({
  heading = "Ready when you are.",
  description = "Whether you're ready to refine your brand, design or digital world, everything starts right here.",
  imageSrc = "https://images.prismic.io/silosite/aVUgRXNYClf9otrL_v1765880016_Placeholder_Image_crecm6.png?auto=format,compress",
  imageAlt = "Ready when you are section image",
  primaryButtonText = "For Brands",
  primaryButtonLink = "/contact",
  secondaryButtonText = "For Creators",
  secondaryButtonLink = "/ugc-contact",
  className = "",
}) => {
  return (
    <section className={`mx-auto w-full max-w-[1280px] ${className}`}>
      {/* Desktop view: lg+ screens */}
      <div className="hidden lg:block">
        <div className="border border-black overflow-hidden w-full mx-auto">
          <div className="flex flex-row items-stretch">
            {/* Left column - content */}
            <div className="w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-black mb-6">
                {heading}
              </h2>
              <p className="text-sm md:text-lg text-black font-normal mb-8 max-w-2xl">
                {description}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={primaryButtonLink}
                  className="inline-flex items-center justify-center gap-2 bg-[#FF322E] h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-white border-transparent relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-40">
                    {primaryButtonText}
                  </span>
                </a>

                <a
                  href={secondaryButtonLink}
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-brand h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-brand relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="text-brand w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-40">
                    {secondaryButtonText}
                  </span>
                </a>
              </div>
            </div>

            {/* Right column - image */}
            <div className="w-1/2 bg-white min-h-[280px]">
              <LazyImage
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet view: md screens */}
      <div className="hidden md:block lg:hidden">
        <div className="border border-black pb-6 overflow-hidden">
          <div className="flex flex-col items-stretch">
            {/* Top: image */}
            <div className="w-full bg-white h-64">
              <LazyImage
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>

            {/* Bottom: content */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-3">
                {heading}
              </h2>
              <p className="text-sm md:text-base text-black mb-4">
                {description}
              </p>

              <div className="flex gap-3">
                <a
                  href={primaryButtonLink}
                  className="inline-flex items-center justify-center bg-[#FF322E] text-white font-bold px-4 py-2"
                >
                  {primaryButtonText}
                </a>
                <a
                  href={secondaryButtonLink}
                  className="inline-flex items-center font-bold justify-center border border-[#FF322E] text-[#FF322E] px-4 py-2"
                >
                  {secondaryButtonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view: < md screens */}
      <div className="block md:hidden px-[4vw]">
        <div className="border border-black pt-3 overflow-hidden">
          <div className="flex flex-col items-stretch">
            {/* Top: content */}
            <div className="px-3 py-3 pb-10">
              <h2 className="text-3xl font-extrabold text-black mb-3">
                {heading}
              </h2>
              <p className="text-sm text-black mb-4">
                {description}
              </p>

              <div className="flex gap-3">
                <a
                  href={primaryButtonLink}
                  className="inline-flex items-center font-bold justify-center bg-[#FF322E] text-white px-4 py-2"
                >
                  {primaryButtonText}
                </a>
                <a
                  href={secondaryButtonLink}
                  className="inline-flex items-center font-bold justify-center border border-[#FF322E] text-[#FF322E] px-4 py-2"
                >
                  {secondaryButtonText}
                </a>
              </div>
            </div>

            {/* Bottom: image */}
            <div className="w-full bg-white h-60">
              <LazyImage
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyWhenYouAre;




