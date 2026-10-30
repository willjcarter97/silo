import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { usePageMeta } from "../hooks/usePageMeta";
import { pageSeo } from "../data/seo";

// Fallback head copy (used until/unless Prismic has values); single source in src/data/seo.js
const SEO_FALLBACK = pageSeo("/404");

const NotFound = () => {
  usePageMeta(
    SEO_FALLBACK.title,
    SEO_FALLBACK.description
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-0 mt-20">
      <div className="text-center max-w-[768px] mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-5xl md:text-7xl font-epilogue lg:text-8xl xl:text-9xl font-bold text-black leading-tight mb-8 sm:mb-12 md:mb-16">
          Well, this is awkward.
        </h1>

        {/* Description */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <p className="text-base sm:text-lg md:text-xl text-black font-normal leading-relaxed max-w-2xl mx-auto">
            The page you're looking for doesn't exist, or maybe it never did.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-black font-normal leading-relaxed max-w-2xl mx-auto mt-2">
            Either way, no content here.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2  bg-[#FF322E] h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-white border-transparent relative overflow-hidden group w-full sm:w-auto"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
              <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
            </div>
            <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-40">
              Back to Home
            </span>
          </Link>

          <Link
            to="/case-studies"
            className="inline-flex items-center justify-center gap-2  bg-transparent border-[1px] border-brand h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-brand relative overflow-hidden group w-full sm:w-auto"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
              <FaChevronRight className="text-brand w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
            </div>
            <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-40">
              See our Work
            </span>
          </Link>
        </div>
      </div>
      <div className="absolute left-0 right-0 w-full h-[1px] bg-black mt-20 bottom-0" />
    </div>
  );
};

export default NotFound;
