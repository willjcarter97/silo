import React from "react";
import { FaChevronRight } from "react-icons/fa";
import LazyElement from "../Common/LazyElement";
import LazyImage from "../Common/LazyImage";
import { coreServices, otherServices } from "../../data/servicesData.jsx";

/**
 * ServicesLedger - the Services page "Core services" section.
 *
 * A numbered, full-width list (01-04) with the site's 1px black row dividers: number, title
 * and blurb on the left, the bullet list on the right. Replaces the previous pinned
 * card-stack + liquid "CORE SERVICES" heading and the duplicate image grid that followed it.
 *
 * @param {string}  eyebrow    - Small section label (default: "Core services")
 * @param {Array}   services   - [{ number, title, description, bullets, image? }]
 * @param {Object}  other      - { title, description, bullets, ctaText, ctaLink } (Tier 2)
 * @param {boolean} showImages - Render a service image above each title when one is supplied
 */

// Red triangle bullet used across the site
const BulletPoint = ({ text }) => (
  <li className="flex items-start">
    <span
      className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
      style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
    ></span>
    {text}
  </li>
);

const ServicesLedger = ({
  eyebrow = "Core services",
  services = coreServices,
  other = otherServices,
  showImages = false,
}) => {
  return (
    <section className="w-full bg-white text-black pt-16 md:pt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-0">
        {/* Section label */}
        <h2 className="font-dm text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black mb-6 md:mb-8">
          {eyebrow}
        </h2>

        {/* Numbered ledger */}
        <ol className="border-b border-black">
          {services.map((service, index) => {
            const number = service.number || String(index + 1).padStart(2, "0");
            return (
              <LazyElement
                key={service.title || index}
                as="li"
                className="group border-t border-black py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4"
                animation="fadeUp"
                delay={index * 100}
                renderWhenHidden={true}
              >
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="font-epilogue font-bold text-brand text-xl md:text-2xl leading-none">
                    {number}
                  </span>
                </div>

                {/* Title + blurb */}
                <div className="md:col-span-6 flex flex-col gap-3 md:gap-4">
                  {showImages && service.image && (
                    <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
                      <LazyImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                  )}
                  <h3 className="font-epilogue font-bold text-[28px] md:text-[32px] leading-[130%] tracking-normal text-black transition-colors duration-300 group-hover:text-brand">
                    {service.title}
                  </h3>
                  <p className="text-base leading-[150%] tracking-normal text-black md:max-w-xl">
                    {service.description}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="md:col-span-5 md:pl-4 lg:pl-8 md:pt-2 space-y-3 text-base text-black">
                  {service.bullets?.map((point, idx) => (
                    <BulletPoint key={idx} text={point} />
                  ))}
                </ul>
              </LazyElement>
            );
          })}
        </ol>

        {/* Tier 2 - other ways we can help */}
        {other && (
          <LazyElement
            as="div"
            className="pt-10 md:pt-14 flex flex-col gap-4"
            animation="fadeUp"
            delay={100}
            renderWhenHidden={true}
          >
            <h3 className="font-epilogue font-bold text-[28px] md:text-[32px] leading-[130%] tracking-normal text-black">
              {other.title}
            </h3>
            <p className="text-base leading-[150%] tracking-normal text-black">
              {other.description}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-base text-black md:max-w-3xl">
              {other.bullets?.map((point, idx) => (
                <BulletPoint key={idx} text={point} />
              ))}
            </ul>

            {/* CTA */}
            {other.ctaText && (
              <div className="mt-4">
                <a
                  href={other.ctaLink || "/contact"}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-transparent border-[1px] border-brand h-[55px] px-8 py-3 text-xs font-semibold tracking-wide text-brand relative overflow-hidden group w-fit"
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="block text-brand w-6 h-6 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-20 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-60">
                    {other.ctaText}
                  </span>
                </a>
              </div>
            )}
          </LazyElement>
        )}
      </div>
    </section>
  );
};

export default ServicesLedger;
