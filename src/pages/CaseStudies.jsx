import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Section2 from "../components/About/Section2";
import Section from "../components/Home/Section";
import LazyImage from "../components/Common/LazyImage";
import LazySection from "../components/Common/LazySection";
import { usePageMeta } from "../hooks/usePageMeta";

const CaseStudies = () => {
  usePageMeta(
    "Creative Agency Case Studies & Client Work",
    "See how Silo Creative has helped brands achieve incredible results with UGC and content creation. Explore our portfolio of successful campaigns."
  );

  const [showVideoSection, setShowVideoSection] = useState(true);
  const [showVimeoModal, setShowVimeoModal] = useState(false);
  // Vimeo video URL from Hero.jsx
  const vimeoUrl = "https://player.vimeo.com/video/76979871";
  return (
    <div className="max-w-[1280px] mx-auto h-auto flex flex-col justify-start items-center mt-16 xl:mt-12 lg:mt-40 md:mt-40">
      <section
        className="mt-10 mb-4 md:mb-10 flex items-start w-full justify-start px-1 md:px-0 pb-4 md:pb-12 lg:pb-16 overflow-hidden"
        aria-label="About Silo - Company introduction"
      >
        <div className="flex flex-col justify-between xl:grid xl:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 max-w-full mx-auto w-full items-start md:items-center mt-0 xl:mt-16 lg:mt-0 md:mt-0">
          {/* Text Content Area */}
          <div
            className="flex flex-col h-full justify-start xl:justify-between space-y-4 sm:space-y-6 md:space-y-8 order-2 xl:order-1 xl:pr-6 items-start w-[90%] md:-ml-16 xl:ml-0"
            role="main"
          >
            {/* Main Heading - Zoom & Small Laptop Optimized */}
            <h1
              className="font-bold text-black text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[56px] leading-3 text-left px-2 sm:px-0 mt-6 sm:mt-0"
              style={{
                opacity: 1,
                fontFamily: "Epilogue, sans-serif",
                fontWeight: 700,
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              You're going to want to see these.
            </h1>
            {/* Text and Buttons Container */}
            <div className="flex flex-col gap-5 sm:gap-6 items-start w-full px-2 sm:px-0">
              {/* Brand Statement - Zoom & Small Laptop Optimized */}
              <p
                className="text-black text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] leading-relaxed text-left max-w-full xl:max-w-lg px-2 sm:px-0 font-epilogue"
                style={{
                  opacity: 1,
                  fontWeight: 400,
                  fontFamily: "Epilogue, sans-serif",
                  lineHeight: "150%",
                  letterSpacing: "0%",
                }}
              >
                Every project tells a story of strategy shaped, content crafted,
                identities defined and digital experiences built. These case
                studies capture the thinking and creativity that turn ideas into
                work that truly moves brands forward.
              </p>
              {/* Buttons - Zoom & Small Laptop Optimized */}
              <div className="flex flex-row gap-3 sm:gap-4 items-start w-full sm:w-auto xl:mx-0">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF322E] h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-white border-transparent relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
                    Let's chat
                  </span>
                </a>

                <a
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-brand relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="text-brand w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
                    Our services
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Visual Content Area - Responsive Layout */}
          <div className="order-1 xl:order-2 w-full mb-6 md:mb-0 md:mt-0">
            {/* Mobile Layout: Large image first, small image + video section below */}
            <div className="flex flex-col md:hidden gap-4">
              {/* Large Image */}
              <div className="w-full">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765923582/Placeholder_Image_rr5dup.png"
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[350px]"
                  loading="lazy"
                />
              </div>
              {/* Small Image + Video Section in same row */}
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                {/* Small Image */}
                <div className="hidden sm:flex justify-center">
                  <img
                    src="https://res.cloudinary.com/di9tb45rl/image/upload/v1762717296/studies2_a4olwb.png"
                    alt="The Silo brand representation"
                    className="w-32 h-auto object-cover max-h-[120px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* MD Layout: Large image left, small image + video section right */}
            <div className="hidden md:flex xl:hidden gap-6">
              {/* Large Image */}
              <div className="flex-1">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765923582/Placeholder_Image_rr5dup.png"
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[500px] lg:max-h-[550px]"
                  loading="lazy"
                />
              </div>
              {/* Right Column: Small image + video section */}
              <div className="flex flex-col gap-4 justify-between items-end">
                {/* Small Image */}
                <div>
                  <img
                    src="https://res.cloudinary.com/di9tb45rl/image/upload/v1762717296/studies2_a4olwb.png"
                    alt="The Silo brand representation"
                    className="w-48 lg:w-56 h-auto object-cover max-h-[300px] lg:max-h-[350px]"
                    loading="lazy"
                  />
                </div>
                {/* Video Section - Bottom of small image (conditionally rendered) */}
                {showVideoSection && (
                  <div className="flex items-center w-full justify-end">
                    {/* Vertical Text Outside */}
                    <div className="flex flex-col items-center mr-2 max-w-[12px]">
                      <span className="text-black font-bold text-xs tracking-wide rotate-[-90deg] whitespace-nowrap">
                        Cut through the noise
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* XL Layout: Large image left, small image + video section right */}
            <div className="hidden xl:flex gap-6">
              {/* Large Image */}
              <div className="flex-1 max-w-[460px]">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765923582/Placeholder_Image_rr5dup.png"
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[550px] 2xl:max-h-none"
                  loading="lazy"
                />
              </div>
              {/* Right Column: Small image + video section */}
              <div className="flex flex-col justify-between items-end">
                {/* Small Image */}
                <div className="mb-4">
                  <img
                    src="https://res.cloudinary.com/di9tb45rl/image/upload/v1762717296/studies2_a4olwb.png"
                    alt="The Silo brand representation"
                    className="w-64 2xl:w-[328px] h-auto object-cover xl:min-h-[200px] 2xl:max-h-none"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative left-1/2 -translate-x-1/2 w-screen mx-auto h-[1px] bg-black" />
      <LazySection>
        <div
          id="done"
          className="max-w-[1280px] pb-0 px-4 md:px-6 lg:px-0 mx-auto"
        >
          <div className="mx-auto pt-10 md:pt-16 lg:pt-20">
            {/* Desktop Layout */}
            <div
              className="hidden lg:flex items-center justify-between gap-12 xl:gap-20 py-8 border-b border-black group cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/basement-approved")
              }
            >
              <div className="w-2/5 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765882727/Untitled_Project_smo9qt.jpg"
                  alt="Basement Approved"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-start gap-3 text-left">
                <h2 className="text-3xl xl:text-4xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Basement Approved
                </h2>
                <p className="text-lg xl:text-xl text-black">
                  Culture, music and editorial platform
                </p>
                <p className="text-base xl:text-lg text-black leading-relaxed">
                  Silo transformed BasementApproved's digital presence with a
                  new website, Mixcloud integration and a streamlined content
                  system that brings their community, music and cultural
                  storytelling into one cohesive experience.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Web Design
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Web Development
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    API Integration
                  </span>
                </div>
                <a
                  href="/case-studies/basement-approved"
                  className="inline-flex items-center gap-2 mt-4 font-bold text-lg text-brand group/link"
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div
              className="flex flex-col lg:hidden py-6 border-b border-black cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/basement-approved")
              }
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-6">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765882727/Untitled_Project_smo9qt.jpg"
                  alt="Basement Approved"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-3 text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Basement Approved
                </h2>
                <p className="text-base md:text-lg text-black">
                  Culture, music and editorial platform
                </p>
                <p className="text-sm md:text-base text-black leading-relaxed">
                  Silo transformed BasementApproved's digital presence with a
                  new website, Mixcloud integration and a streamlined content
                  system that brings their community, music and cultural
                  storytelling into one cohesive experience.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Web Design
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Web Development
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    API Integration
                  </span>
                </div>
                <a
                  href="/case-studies/basement-approved"
                  className="inline-flex items-center gap-2 mt-3 font-bold text-base md:text-lg text-brand"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl" />
                </a>
              </div>
            </div>

            {/* Second project - Tomoka */}
            <div
              className="hidden lg:flex items-center justify-between gap-12 xl:gap-20 py-8 border-b border-black group cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/tomoka-fine-and-rare")
              }
            >
              <div className="w-2/5 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/Tomoko-e10fd11f_2_jto3ax.png"
                  alt="Tomoka Fine & Rare"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-start gap-3 text-left">
                <h2 className="text-3xl xl:text-4xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Tomoka Fine & Rare
                </h2>
                <p className="text-lg xl:text-xl text-black">
                  Modern whisky investment & retail
                </p>
                <p className="text-base xl:text-lg text-black leading-relaxed">
                  A heritage whisky brand modernised without losing its soul.
                  From website build to social, video, PR and CRM, Silo
                  transformed Tomoka into a premium digital powerhouse.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Website
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Social
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Creative
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    CRM
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    PPC
                  </span>
                </div>
                <a
                  href="/case-studies/tomoka-fine-and-rare"
                  className="inline-flex items-center gap-2 mt-4 font-bold text-lg text-brand group/link"
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Mobile/Tablet Layout - Tomoka */}
            <div
              className="flex flex-col lg:hidden py-6 border-b border-black cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/tomoka-fine-and-rare")
              }
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-6">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/Tomoko-e10fd11f_2_jto3ax.png"
                  alt="Tomoka Fine & Rare"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-3 text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Tomoka Fine & Rare
                </h2>
                <p className="text-base md:text-lg text-black">
                  Modern whisky investment & retail
                </p>
                <p className="text-sm md:text-base text-black leading-relaxed">
                  A heritage whisky brand modernised without losing its soul.
                  From website build to social, video, PR and CRM, Silo
                  transformed Tomoka into a premium digital powerhouse.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Website
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Social
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Creative
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    CRM
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    PPC
                  </span>
                </div>
                <a
                  href="/case-studies/tomoka-fine-and-rare"
                  className="inline-flex items-center gap-2 mt-3 font-bold text-base md:text-lg text-brand"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl" />
                </a>
              </div>
            </div>

            {/* Third project - Electrolytes */}
            <div
              className="hidden lg:flex items-center justify-between gap-12 xl:gap-20 py-8 border-b border-black group cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/electrolytes-with-joly")
              }
            >
              <div className="w-2/5 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/image_5_ibtcoo.png"
                  alt="Electrolytes with Joly"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-start gap-3 text-left">
                <h2 className="text-3xl xl:text-4xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Electrolytes with Joly
                </h2>
                <p className="text-lg xl:text-xl text-black">
                  A vibrant identity for a new radio show
                </p>
                <p className="text-base xl:text-lg text-black leading-relaxed">
                  Silo created an identity reflecting the show's energetic,
                  atmospheric and slightly cosmic tone, supported by a visual
                  system that works across social media and ongoing episode
                  releases.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Typography
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Social Templates
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Design System
                  </span>
                </div>
                <a
                  href="/case-studies/electrolytes-with-joly"
                  className="inline-flex items-center gap-2 mt-4 font-bold text-lg text-brand group/link"
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Mobile/Tablet Layout - Electrolytes */}
            <div
              className="flex flex-col lg:hidden py-6 border-b border-black cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/electrolytes-with-joly")
              }
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-6">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/image_5_ibtcoo.png"
                  alt="Electrolytes with Joly"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-3 text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Electrolytes with Joly
                </h2>
                <p className="text-base md:text-lg text-black">
                  A vibrant identity for a new radio show
                </p>
                <p className="text-sm md:text-base text-black leading-relaxed">
                  Silo created an identity reflecting the show's energetic,
                  atmospheric and slightly cosmic tone, supported by a visual
                  system that works across social media and ongoing episode
                  releases.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Typography
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Social Templates
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Design System
                  </span>
                </div>
                <a
                  href="/case-studies/electrolytes-with-joly"
                  className="inline-flex items-center gap-2 mt-3 font-bold text-base md:text-lg text-brand"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto">
            {/* Fourth project - Acorn */}
            <div
              className="hidden lg:flex items-center justify-between gap-12 xl:gap-20 py-8 border-b border-black group cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/acorn-property-group")
              }
            >
              <div className="w-2/5 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765951283/28cf00a299ba07f7be18bd388b5bf801_1_fxiv5y.png"
                  alt="Acorn Property Group"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-start gap-3 text-left">
                <h2 className="text-3xl xl:text-4xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Acorn Property Group
                </h2>
                <p className="text-lg xl:text-xl text-black">
                  Leading sustainable home creators
                </p>
                <p className="text-base xl:text-lg text-black leading-relaxed">
                  Building a connected growing digital presence for one of the
                  South West's leading housebuilders. Silo has strengthened
                  Acorn's digital voice and delivered sustained multi platform
                  growth.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Social Media
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Strategy
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Influencer
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Content
                  </span>
                </div>
                <a
                  href="/case-studies/acorn-property-group"
                  className="inline-flex items-center gap-2 mt-4 font-bold text-lg text-brand group/link"
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Mobile/Tablet Layout - Acorn */}
            <div
              className="flex flex-col lg:hidden py-6 border-b border-black cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/acorn-property-group")
              }
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-6">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765951283/28cf00a299ba07f7be18bd388b5bf801_1_fxiv5y.png"
                  alt="Acorn Property Group"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-3 text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Acorn Property Group
                </h2>
                <p className="text-base md:text-lg text-black">
                  Leading sustainable home creators
                </p>
                <p className="text-sm md:text-base text-black leading-relaxed">
                  Building a connected growing digital presence for one of the
                  South West's leading housebuilders. Silo has strengthened
                  Acorn's digital voice and delivered sustained multi platform
                  growth.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Social Media
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Strategy
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Influencer
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Content
                  </span>
                </div>
                <a
                  href="/case-studies/acorn-property-group"
                  className="inline-flex items-center gap-2 mt-3 font-bold text-base md:text-lg text-brand"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl" />
                </a>
              </div>
            </div>

            {/* Fifth project - Cluberly */}
            <div
              className="hidden lg:flex items-center justify-between gap-12 xl:gap-20 py-8 border-b border-black group cursor-pointer"
              onClick={() => (window.location.href = "/case-studies/cluberly")}
            >
              <div className="w-2/5 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765951282/1_xifbbg.png"
                  alt="Cluberly"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-start gap-3 text-left">
                <h2 className="text-3xl xl:text-4xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Cluberly
                </h2>
                <p className="text-lg xl:text-xl text-black">
                  Savings and investment app built for sports fans, schools and
                  charities.
                </p>
                <p className="text-base xl:text-lg text-black leading-relaxed">
                  We created an animated explainer and a real footage brand
                  video, along with multi platform edits and branded documents,
                  to simplify and amplify Cluberly's mission.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Fintech
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Video
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
                    Storytelling
                  </span>
                </div>
                <a
                  href="/case-studies/cluberly"
                  className="inline-flex items-center gap-2 mt-4 font-bold text-lg text-brand group/link"
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Mobile/Tablet Layout - Cluberly */}
            <div
              className="flex flex-col lg:hidden py-6 border-b border-black cursor-pointer"
              onClick={() => (window.location.href = "/case-studies/cluberly")}
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-6">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765951282/1_xifbbg.png"
                  alt="Cluberly"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-3 text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Cluberly
                </h2>
                <p className="text-base md:text-lg text-black">
                  Savings and investment app built for sports fans, schools and
                  charities.
                </p>
                <p className="text-sm md:text-base text-black leading-relaxed">
                  We created an animated explainer and a real footage brand
                  video, along with multi platform edits and branded documents,
                  to simplify and amplify Cluberly's mission.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Fintech
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Video
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
                    Storytelling
                  </span>
                </div>
                <a
                  href="/case-studies/cluberly"
                  className="inline-flex items-center gap-2 mt-3 font-bold text-base md:text-lg text-brand"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Project</span>
                  <MdOutlineKeyboardArrowRight className="text-xl" />
                </a>
              </div>
            </div>

            {/* Sixth project */}
            <div
              className="hidden lg:flex items-center justify-around space-x-40 py-6 group relative cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/knightsgate-partners")
              }
            >
              <div className="w-1/3 aspect-[4/3] flex items-center justify-center overflow-hidden transform transition-transform duration-600 ease-in-out">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1766427917/image_15_uceyvk.png"
                  alt="smoothie"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              {/* Hover image placeholder (absolutely positioned so it doesn't shift layout) */}
              {/* <div className="absolute left-[35%] top-0 -translate-x-full w-1/6 h-full bg-white overflow-hidden p-0 m-0 border-0 box-border opacity-0 scale-90 rotate-6 transition-all duration-600 ease-in-out z-10 pointer-events-none lg:group-hover:opacity-100 lg:group-hover:scale-100 lg:group-hover:-translate-x-32 lg:group-hover:rotate-0 lg:group-hover:pointer-events-auto">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765951490/Rectangle_30_fmlti2.png"
                  alt="smoothie"
                  className="absolute inset-0 w-full h-full object-cover p-0 m-0 border-0 block" // absolutely fill parent, no gap
                  loading="lazy"
                />
              </div> */}
              <div className="w-[50%] flex flex-col justify-center items-start gap-4 text-left transform transition-transform duration-600 ease-in-out pt-5">
                <h3 className="text-4xl font-bold text-black">
                  Knightsgate Partners
                </h3>
                <p className="text-xl text-black">
                  Advisory and funding for growing businesses
                </p>
                <p className="text-lg text-black">
                  We partnered with Knightsgate to elevate their brand digital
                  presence and investor communications through a full website
                  redesign and fresh creative suite.
                </p>
                <div className="flex space-x-2 mt-2">
                  <span className="text-base font-bold text-black p-2 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-base font-bold text-black p-2 bg-brand/20">
                    Digital
                  </span>
                  <span className="text-base font-bold text-black p-2 bg-brand/20">
                    Communications
                  </span>
                  <span className="text-base font-bold text-black p-2 bg-brand/20">
                    Creative
                  </span>
                </div>
                <a
                  href="/case-studies/knightsgate-partners"
                  className="inline-flex items-center gap-2 font-dm mt-6 mb-5 font-bold text-xl leading-[150%] text-[#FF322E] tracking-normal group"
                >
                  <span>View Project</span>
                  <span
                    aria-hidden
                    className="inline-block ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                  >
                    <MdOutlineKeyboardArrowRight className="text-2xl font-black" />
                  </span>
                </a>
              </div>
            </div>

            <div
              className="flex flex-col md:flex-row-reverse lg:hidden items-center w-full mx-auto justify-center md:space-x-10 py-8 pb-0 pt-5 group relative mt-10 cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/knightsgate-partners")
              }
            >
              <div className="w-full md:w-1/2 aspect-[4/3] relative md:-top-20 flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1766427917/image_15_uceyvk.png"
                  alt="knightsgate"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-[80%] flex flex-col justify-center items-start space-y-4 mt-10 md:mt-0 text-left">
                <h3 className="text-2xl md:text-4xl font-bold text-black">
                  Knightsgate Partners
                </h3>
                <p className="text-lg font-bold md:text-xl md:font-normal text-black">
                  Advisory and funding for growing businesses
                </p>
                <p className="text-base font-medium md:text-lg md:font-normal text-black leading-relaxed">
                  We partnered with Knightsgate to elevate their brand digital
                  presence and investor communications through a full website
                  redesign and fresh creative suite.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-semibold md:text-base md:font-normal text-black p-2 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-sm font-semibold md:text-base md:font-normal text-black p-2 bg-brand/20">
                    Digital
                  </span>
                  <span className="text-sm font-semibold md:text-base md:font-normal text-black p-2 bg-brand/20">
                    Communications
                  </span>
                  <span className="text-sm font-semibold md:text-base md:font-normal text-black p-2 bg-brand/20">
                    Creative
                  </span>
                  <span className="text-sm font-semibold md:text-base md:font-normal text-black p-2 bg-brand/20">
                    Content
                  </span>
                </div>
                <a
                  href="/case-studies/knightsgate-partners"
                  className="inline-flex items-center gap-2 font-dm font-bold text-lg md:text-xl text-[#FF322E] group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Project</span>
                  <span
                    aria-hidden
                    className="inline-block ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                  >
                    <MdOutlineKeyboardArrowRight className="text-2xl font-black" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </LazySection>
      <div className="w-screen mx-auto h-[1px] bg-black md:my-28 my-20 mb-10 relative left-1/2 -translate-x-1/2" />
      <LazySection>
        <Section />
      </LazySection>
      <div className="relative left-1/2 -translate-x-1/2 w-screen mx-auto h-[1px] bg-black" />
    </div>
  );
};

export default CaseStudies;
