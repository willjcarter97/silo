import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Section = () => {
  return (
    <section className="mx-auto w-full max-w-[1280px] pb-12 md:pb-24">
      {/* Default view: hidden on mobile, visible on lg+ (md has its own layout) */}
      <div className="hidden md:hidden lg:block">
        <div className="border-[1px] border-gray-600  overflow-hidden w-full mx-auto">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Left column - content */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-black mb-6">
                Ready when you are.
              </h1>
              <p className="text-sm md:text-lg text-black font-normal mb-8 max-w-2xl">
               Whether you’re ready to refine your brand, design or digital world, everything starts right here.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2  bg-[#FF322E] h-[55px] px-6 py-3 text-xs font-bold  tracking-wide text-white border-transparent relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight   className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-40">
                    For Brands
                  </span>
                </a>

                <a
                  href="/ugc-contact"
                  className="inline-flex items-center justify-center gap-2  bg-transparent border-[1px] border-brand h-[55px] px-6 py-3 text-xs font-bold  tracking-wide text-brand relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight   className="text-brand w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-40">
                    For Creators
                  </span>
                </a>
              </div>
            </div>

            {/* Right column - empty space for image */}
            <div className="w-full md:w-1/2 bg-white-50 md:min-h-[280px]">
              <img
                src="https://images.prismic.io/silosite/aVUgRXNYClf9otrL_v1765880016_Placeholder_Image_crecm6.png?auto=format,compress"
                alt="section"
                className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      {/* MD-only view: show this block only on md screens (>=md and <lg).
          Here the right image-placeholder appears on top and the content below. */}
      <div className="hidden md:block lg:hidden">
        <div className="border border-black pb-6  overflow-hidden">
          <div className="flex flex-col items-stretch">
            {/* Top: right image placeholder (appears on top for md view) */}
            <div className="w-full bg-white-50 h-52 md:h-full lg:h-full">
              <img
                src="https://images.prismic.io/silosite/aVUgRXNYClf9otrL_v1765880016_Placeholder_Image_crecm6.png?auto=format,compress"
                alt="section"
                className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* Bottom: content */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-3">
                Ready when you are.
              </h2>
              <p className="text-sm md:text-base text-black mb-4">
                Whether you’re a brand looking for scroll-stopping content or a
                creator ready to join our roster, this is where it starts.
              </p>

              <div className="flex gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#FF322E] text-white px-4 py-2 "
                >
                  For Brands
                </a>
                <a
                  href="/ugc-contact"
                  className="inline-flex items-center font-bold justify-center border border-[#FF322E] text-[#FF322E] px-4 py-2 "
                >
                  For Creators
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only view: show only on mobile (<md). Content on top, image on bottom. */}
      <div className="block md:hidden mt-20 px-[4vw]">
        <div className="border border-black pt-3  overflow-hidden">
          <div className="flex flex-col items-stretch">
            {/* Top: content */}
            <div className="px-3 py-3 pb-10">
              <h2 className="text-3xl font-extrabold text-black mb-3">
                Ready when you are.
              </h2>
              <p className="text-sm text-black mb-4">
                Whether you’re ready to refine your brand, design or digital world, everything starts right here.
              </p>

              <div className="flex gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center font-bold justify-center bg-[#FF322E] text-white px-4 py-2 "
                >
                  For Brands
                </a>
                <a
                  href="/ugc-contact"
                  className="inline-flex items-center font-bold justify-center border border-[#FF322E] text-[#FF322E] px-4 py-2 "
                >
                  For Creators
                </a>
              </div>
            </div>

            {/* Bottom: image placeholder */}
            <div className="w-full bg-white-50 h-60">
              <img
                src="https://images.prismic.io/silosite/aVUgRXNYClf9otrL_v1765880016_Placeholder_Image_crecm6.png?auto=format,compress"
                alt="section"
                className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
