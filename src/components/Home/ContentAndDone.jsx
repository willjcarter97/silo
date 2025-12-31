import React, { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function ContentAndDone() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer = null;
    // store pending timeout ids per element so we can cancel if they leave early
    const pending = new WeakMap();

    const setup = () => {
      // Only enable viewport-reveal on tablet sizes (md >=768 && < lg 1024)
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const els = Array.from(document.querySelectorAll(".hover-placeholder"));

      // cleanup any previous observer/timeouts
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      // if not tablet, ensure placeholders are hidden and clear timeouts
      if (!isTablet) {
        els.forEach((el) => {
          if (pending.has(el)) {
            clearTimeout(pending.get(el));
            pending.delete(el);
          }
          el.classList.remove(
            "opacity-100",
            "scale-100",
            "rotate-0",
            "pointer-events-auto",
            "in-view"
          );
          el.classList.add(
            "opacity-0",
            "scale-90",
            "rotate-6",
            "pointer-events-none"
          );
        });
        return;
      }

      // Tablet: create observer that delays reveal by 1s
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            if (entry.isIntersecting) {
              // if already visible, do nothing
              if (el.classList.contains("in-view")) return;
              // if there's already a pending timer, keep it
              if (pending.has(el)) return;
              const id = window.setTimeout(() => {
                el.classList.add(
                  "opacity-100",
                  "scale-100",
                  "rotate-0",
                  "pointer-events-auto",
                  "in-view"
                );
                el.classList.remove(
                  "opacity-0",
                  "scale-90",
                  "rotate-6",
                  "pointer-events-none"
                );
                pending.delete(el);
              }, 1000);
              pending.set(el, id);
            } else {
              // left viewport: cancel pending reveal (if any) and hide immediately
              if (pending.has(el)) {
                clearTimeout(pending.get(el));
                pending.delete(el);
              }
              el.classList.remove(
                "opacity-100",
                "scale-100",
                "rotate-0",
                "pointer-events-auto",
                "in-view"
              );
              el.classList.add(
                "opacity-0",
                "scale-90",
                "rotate-6",
                "pointer-events-none"
              );
            }
          });
        },
        { threshold: 0 }
      );

      els.forEach((el) => observer.observe(el));
    };

    setup();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      if (observer) observer.disconnect();
      // clear any pending timeouts
      // iterate over elements again (WeakMap doesn't allow iteration) - select elements
      const els = Array.from(document.querySelectorAll(".hover-placeholder"));
      els.forEach((el) => {
        if (pending.has(el)) {
          clearTimeout(pending.get(el));
          pending.delete(el);
        }
      });
    };
  }, []);
  return (
    <div className="pt-0 mx-auto px-0 max-w-[1280px] md:pb-28 ">
      {/* Desktop view (hidden on mobile) */}
      <div className="hidden md:block overflow-visible max-w-[1280px]">
        <div className="flex justify-center relative items-start w-full mx-auto">
          <h2 className="mr-auto text-2xl md:text-5xl xl:w-[30rem] md:mb-10 lg:mb-0 font-bold tracking-tight text-black w-[28rem] 2xl:w-[28rem] lg:w-[22rem]">
            This is simply <br /> what we do
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mx-auto md:my-20">
          {/* Card 1: Social Strategy & Management */}
          <article className="border border-black border-x-0 border-b-0 p-8 pl-0 flex flex-col gap-4 mb-5">
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
              <img
                src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765879825/2_jegbj9.png"
                alt="img1"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[32px] md:text-[28px] lg:text-[32px] leading-[130%] tracking-normal text-black">
              Social Strategy & Management
            </h3>
            <p className="text-[16px] leading-[150%] tracking-normal text-black">
              We don't just post, we plan, manage, and grow your brand's
              presence.
            </p>
          </article>

          {/* Card 2: Web Design & Development */}
          <article className="border border-black p-8 pr-0 border-r-0 border-b-0 flex flex-col gap-4">
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
              <img
                src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765879826/3_r08wlm.png"
                alt="img2"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[32px] md:text-[28px] lg:text-[32px] leading-[130%] tracking-normal text-black">
              Web Design & Development
            </h3>
            <p className="text-[16px] leading-[150%] tracking-normal text-black">
              We shape digital spaces. Real craft, real performance that's
              designed to grow.
            </p>
          </article>

          {/* Card 3: Brand Design */}
          <article className="border border-black p-8 pl-0 border-x-0 border-b-0 flex flex-col gap-4">
            <div className="w-full h-[250px] md:h-[280px] bg-gray-100 overflow-hidden">
              <img
                src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765879825/Placeholder_Image_zxnykm.png"
                alt="img3"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[32px] md:text-[28px] lg:text-[32px] leading-[130%] tracking-normal text-black">
              Brand Design
            </h3>
            <p className="text-[16px] leading-[150%] tracking-normal text-black">
              We design bold branding and expressive motion to shape your visual
              presence.
            </p>
          </article>

          {/* Card 4: Content Strategy */}
          <article className="border border-black p-8 pr-0 border-r-0 border-b-0 flex flex-col gap-4">
            <div className="w-full h-[250px] md:h-[280px] bg-gray-100 overflow-hidden">
              <img
                src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765879826/Placeholder_Image1_me1r2y.png"
                alt="img4"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[32px] md:text-[28px] lg:text-[32px] leading-[130%] tracking-normal text-black">
              Content Strategy
            </h3>
            <p className="text-[16px] leading-[150%] tracking-normal text-black">
              We build thoughtful strategies that give content focus, intent and
              results.
            </p>
          </article>
        </div>
        <div className="w-[100vw] absolute h-[1px] right-0 bg-black my-20 "></div>

        <div id="done" className="w-full min-h-screen pb-10 relative top-40">
          <h2 className="text-7xl font-bold tracking-tight text-black mb-4">
            Stuff we’ve done
          </h2>
          <p className="text-lg text-black mb-10 font-bold mt-10">
            Just some of the brands we’ve worked with
          </p>

          <div className="w-full my-20 border-t-[0px] border-t-black">
            {/* First project */}
            <div
              className="hidden lg:flex items-center justify-around space-x-40 py-6 border-b border-b-black group relative cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/basement-approved")
              }
            >
              <div className="w-1/3 aspect-[4/3] flex items-center justify-center overflow-hidden transform transition-transform duration-600 ease-in-out lg:group-hover:-translate-x-0">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765882727/Untitled_Project_smo9qt.jpg"
                  alt="smoothie"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              {/* Hover image placeholder (absolutely positioned so it doesn't shift layout) */}
              {/* <div className="absolute left-[35%] top-0 -translate-x-full w-1/6 h-full bg-white overflow-hidden p-0 m-0 border-0 box-border opacity-0 scale-90 rotate-6 transition-all duration-600 ease-in-out z-10 pointer-events-none lg:group-hover:opacity-100 lg:group-hover:scale-100 lg:group-hover:-translate-x-32 lg:group-hover:rotate-0 lg:group-hover:pointer-events-auto">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765883977/Rectangle_34_pbf4gh.png"
                  alt="smoothie"
                  className="absolute inset-0 w-full h-full object-cover p-0 m-0 border-0 block" // absolutely fill parent, no gap
                  loading="lazy"
                />
              </div> */}
              <div className="w-[50%] flex flex-col justify-center items-start gap-4 text-left transform transition-transform duration-600 ease-in-out">
                <h3 className="text-4xl font-bold text-black">
                  Basement Approved
                </h3>
                <p className="text-xl text-black">
                  Culture, music and editorial platform
                </p>
                <p className="text-lg text-black">
                  Silo transformed BasementApproved’s digital presence with a
                  new website, Mixcloud integration and a streamlined content
                  system that brings their community, music and cultural
                  storytelling into one cohesive experience.
                </p>
                <div className="flex flex-wrap md:flex-nowrap gap-2 mt-2">
                  <span className="text-base font-normal text-black p-2 bg-brand/20">
                    Web Design
                  </span>
                  <span className="text-base font-normal text-black p-2 bg-brand/20">
                    Web Development
                  </span>
                  <span className="text-base font-normal text-black p-2 bg-brand/20">
                    API Integeration
                  </span>
                </div>
                <a
                  href="/case-studies/basement-approved"
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
              className="block md:flex lg:hidden items-center w-full mx-auto justify-center md:space-x-10 space-y-3 md:space-y-0 border-b border-b-black py-12 group relative mt-0 cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/basement-approved")
              }
            >
              {/* Text content first */}
              <div className="w-full md:w-[80%] flex flex-col justify-center items-start gap-4 text-left">
                <h3 className="text-4xl font-bold text-black">
                  Basement Approved
                </h3>
                <p className="text-xl text-black">
                  Culture, music and editorial platform
                </p>
                <p className="text-lg text-black">
                  Silo transformed BasementApproved’s digital presence with a
                  new website, Mixcloud integration and a streamlined content
                  system that brings their community, music and cultural
                  storytelling into one cohesive experience.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-base font-normal whitespace-nowrap text-black p-2 bg-brand/20">
                    Web Design
                  </span>
                  <div className="w-full md:w-auto">
                    <span className="transform -translate-x-2 translate-y-1 md:translate-x-0 md:translate-y-0 text-base font-normal md:whitespace-nowrap text-black p-2 bg-brand/20">
                      Design System
                    </span>
                  </div>
                  <span className="text-base font-normal whitespace-nowrap text-black p-2 bg-brand/20">
                    Web Development
                  </span>
                  <span className="text-base font-normal whitespace-nowrap text-black p-2 bg-brand/20">
                    API Integeration
                  </span>
                </div>
                <a
                  href="/case-studies/basement-approved"
                  className="inline-flex items-center gap-2 font-dm mt-6 mb-5 font-bold text-xl leading-[150%] text-[#FF322E] tracking-normal group"
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
              {/* Image second */}
              <div className="w-[60%] mx-auto md:w-1/2 md:-top-20 aspect-[4/3] top-10 relative flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765882727/Untitled_Project_smo9qt.jpg"
                  alt="smoothie"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
                {/* Hover image placeholder */}
                {/* <div className="hidden md:block absolute -right-80 top-0 w-[70%] h-full bg-white opacity-0 scale-90 rotate-6 transition-all duration-600 ease-in-out z-10 pointer-events-none md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:rotate-0 md:group-hover:pointer-events-auto overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765883977/Rectangle_34_pbf4gh.png"
                    alt="smoothie"
                    className="w-full h-[calc(100%+32px)] -translate-y-4 object-cover block"
                    loading="lazy"
                  />
                </div> */}
              </div>
            </div>

            {/* Second project */}
            <div
              className="hidden lg:flex items-center justify-around space-x-40 py-6 border-b border-b-black group relative cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/tomoka-fine-and-rare")
              }
            >
              <div className="w-1/3 aspect-[4/3] flex items-center justify-center overflow-hidden transform transition-transform duration-600 ease-in-out lg:group-hover:-translate-x-0">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/Tomoko-e10fd11f_2_jto3ax.png"
                  alt="smoothie"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              {/* Hover image placeholder (absolutely positioned so it doesn't shift layout) */}
              {/* <div className="absolute left-[35%] top-0 -translate-x-full w-1/6 h-full bg-white overflow-hidden p-0 m-0 border-0 box-border opacity-0 scale-90 rotate-6 transition-all duration-600 ease-in-out z-10 pointer-events-none lg:group-hover:opacity-100 lg:group-hover:scale-100 lg:group-hover:-translate-x-32 lg:group-hover:rotate-0 lg:group-hover:pointer-events-auto">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884763/Rectangle_29_il7hhb.png"
                  alt="smoothie"
                  className="absolute inset-0 w-full h-full object-cover p-0 m-0 border-0 block" // absolutely fill parent, no gap
                  loading="lazy"
                />
              </div> */}
              <div className="w-[50%] flex flex-col justify-center items-start gap-4 text-left transform transition-transform duration-600 ease-in-out pt-5">
                <h3 className="text-4xl font-bold text-black">
                  Tomoka Fine & Rare
                </h3>
                <p className="text-xl text-black">
                  Modern whisky investment & retail
                </p>
                <p className="text-lg text-black">
                  A heritage whisky brand modernised without losing its soul.
                  From website build to social, video, PR and CRM, Silo
                  transformed Tomoka into a premium digital powerhouse.
                </p>
                <div className="flex flex-wrap md:flex-nowrap gap-2 mt-2">
                  <span className="text-base font-semibold text-black p-2 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-base font-semibold text-black p-2 bg-brand/20">
                    Website
                  </span>
                  <span className="text-base font-semibold text-black p-2 bg-brand/20">
                    Social
                  </span>
                  <span className="text-base font-semibold text-black p-2 bg-brand/20">
                    Creative
                  </span>
                  <span className="text-base font-semibold text-black p-2 bg-brand/20">
                    CRM
                  </span>
                  <div className="w-full md:w-auto">
                    <span className="transform -translate-x-2 translate-y-1 md:translate-x-0 md:translate-y-0 text-base font-semibold text-black p-2 bg-brand/20 md:inline-block">
                      PPC
                    </span>
                  </div>
                </div>
                <a
                  href="/case-studies/tomoka-fine-and-rare"
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
              className="block md:flex lg:hidden items-center w-full mx-auto justify-center md:space-x-10 space-y-3 md:space-y-0 border-b border-b-black py-12 pt-5 group relative mt-0 cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/tomoka-fine-and-rare")
              }
            >
              {/* Text content first */}
              <div className="w-full md:w-[80%] flex flex-col justify-center items-start gap-4 text-left">
                <h3 className="text-4xl font-bold text-black">
                  Tomoka Fine & Rare
                </h3>
                <p className="text-xl text-black">
                  Modern whisky investment & retail
                </p>
                <p className="text-lg text-black">
                  A heritage whisky brand modernised without losing its soul.
                  From website build to social, video, PR and CRM, Silo
                  transformed Tomoka into a premium digital powerhouse.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-base font-semibold md:whitespace-nowrap text-black p-2 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-base font-semibold md:whitespace-nowrap text-black p-2 bg-brand/20">
                    Typography
                  </span>
                  <span className="text-base font-semibold md:whitespace-nowrap text-black p-2 bg-brand/20">
                    Social Templates
                  </span>
                  <div className="w-full md:w-auto">
                    <span className="transform -translate-x-2 translate-y-1 md:translate-x-0 md:translate-y-0 text-base font-semibold md:whitespace-nowrap text-black p-2 bg-brand/20">
                      Design System
                    </span>
                  </div>
                  <span className="text-base font-semibold md:whitespace-nowrap text-black p-2 bg-brand/20">
                    CRM
                  </span>

                  <span className="text-base font-semibold md:whitespace-nowrap text-black p-2 bg-brand/20 block md:inline-block">
                    PPC
                  </span>
                </div>
                <a
                  href="/case-studies/tomoka-fine-and-rare"
                  className="inline-flex items-center gap-2 font-dm mt-6 mb-5 font-bold text-xl leading-[150%] text-[#FF322E] tracking-normal group"
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
              {/* Image second */}
              <div className="w-full md:w-1/2 aspect-[4/3] top-10 md:-top-20 relative flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/Tomoko-e10fd11f_2_jto3ax.png"
                  alt="smoothie"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
                {/* Hover image placeholder */}
                {/* <div className="hidden md:block absolute -right-80 top-0 w-[70%] h-full bg-white opacity-0 scale-90 rotate-6 transition-all duration-600 ease-in-out z-10 pointer-events-none md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:rotate-0 md:group-hover:pointer-events-auto overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884763/Rectangle_29_il7hhb.png"
                    alt="smoothie"
                    className="w-full h-[calc(100%+32px)] -translate-y-4 object-cover block"
                    loading="lazy"
                  />
                </div> */}
              </div>
            </div>

            {/* Third project */}
            <div
              className="hidden lg:flex items-center justify-around space-x-40 py-6 group relative cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/electrolytes-with-joly")
              }
            >
              <div className="w-1/3 aspect-[4/3] flex items-center justify-center overflow-hidden transform transition-transform duration-600 ease-in-out lg:group-hover:-translate-x-0">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/image_5_ibtcoo.png"
                  alt="smoothie"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              {/* Hover image placeholder (absolutely positioned so it doesn't shift layout) */}
              {/* <div className="absolute left-[35%] top-0 -translate-x-full w-1/6 h-full bg-white overflow-hidden p-0 m-0 border-0 box-border opacity-0 scale-90 rotate-6 transition-all duration-600 ease-in-out z-10 pointer-events-none lg:group-hover:opacity-100 lg:group-hover:scale-100 lg:group-hover:-translate-x-32 lg:group-hover:rotate-0 lg:group-hover:pointer-events-auto">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765885427/Rectangle_33_n4bq46.png"
                  alt="smoothie"
                  className="absolute inset-0 w-full h-full object-cover p-0 m-0 border-0 block" // absolutely fill parent, no gap
                  loading="lazy"
                />
              </div> */}
              <div className="w-[50%] flex flex-col justify-center items-start gap-4 text-left transform transition-transform duration-600 ease-in-out pt-5">
                <h3 className="text-4xl font-bold text-black">
                  Electrolytes with Joly
                </h3>
                <p className="text-xl text-black">
                  A vibrant identity for a new radio show
                </p>
                <p className="text-lg text-black">
                  Silo created an identity reflecting the show’s energetic,
                  atmospheric and slightly cosmic tone, supported by a visual
                  system that works across social media and ongoing episode
                  releases.
                </p>
                <div className="flex flex-wrap md:flex-nowrap gap-2 mt-2">
                  <span className="text-base font-semibold text-black p-2 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-base font-semibold text-black p-2 bg-brand/20">
                    Typography
                  </span>
                  <span className="text-base font-semibold text-black p-2 bg-brand/20">
                    Social Templates
                  </span>
                  <div className="w-full md:w-auto">
                    <span className="transform -translate-x-2 translate-y-1 md:translate-x-0 md:translate-y-0 text-base font-semibold text-black p-2 bg-brand/20 md:inline-block">
                      Design System
                    </span>
                  </div>
                </div>
                <a
                  href="/case-studies/electrolytes-with-joly"
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
              className="block md:flex lg:hidden items-center w-full mx-auto justify-center md:space-x-10 space-y-3 md:space-y-0  py-12 pt-5 group relative mt-0 cursor-pointer"
              onClick={() =>
                (window.location.href = "/case-studies/electrolytes-with-joly")
              }
            >
              {/* Text content first */}
              <div className="w-full md:w-[80%] flex flex-col justify-center items-start gap-4 text-left">
                <h3 className="text-4xl font-bold text-black">
                  Electrolytes with Joly
                </h3>
                <p className="text-xl text-black">
                  A vibrant identity for a new radio show
                </p>
                <p className="text-lg text-black">
                  Silo created an identity reflecting the show’s energetic,
                  atmospheric and slightly cosmic tone, supported by a visual
                  system that works across social media and ongoing episode
                  releases.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-base font-semibold whitespace-nowrap text-black p-2 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-base font-semibold whitespace-nowrap text-black p-2 bg-brand/20">
                    Typography
                  </span>
                  <span className="text-base font-semibold whitespace-nowrap text-black p-2 bg-brand/20">
                    Social Templates
                  </span>
                  <div className="w-full md:w-auto">
                    <span className="transform -translate-x-2 translate-y-1 md:translate-x-0 md:translate-y-0 text-base font-semibold whitespace-nowrap text-black p-2 bg-brand/20 md:inline-block">
                      Design System
                    </span>
                  </div>
                </div>
                <a
                  href="/case-studies/electrolytes-with-joly"
                  className="inline-flex items-center gap-2 font-dm mt-6 mb-5 h font-bold text-xl leading-[150%] text-[#FF322E] tracking-normal group"
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
              {/* Image second */}
              <div className="w-full md:w-1/2 aspect-[4/3] top-10 md:-top-20 relative flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/image_5_ibtcoo.png"
                  alt="smoothie"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
                {/* Hover image placeholder */}
                {/* <div className="hidden md:block absolute -right-80 top-0 w-[70%] h-full bg-white opacity-0 scale-90 rotate-6 transition-all duration-600 ease-in-out z-10 pointer-events-none md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:rotate-0 md:group-hover:pointer-events-auto overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765885427/Rectangle_33_n4bq46.png"
                    alt="smoothie"
                    className="w-full h-[calc(100%+32px)] -translate-y-4 object-cover block"
                    loading="lazy"
                  />
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex justify-center md:mt-10">
            <a
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2  bg-transparent border-[1px] border-brand h-[55px] px-6 py-3 text-xs font-bold  tracking-wide text-brand relative overflow-hidden group"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                <FaChevronRight className="text-brand w-4 h-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
              </div>
              <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-28">
                View all
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile-only view (hidden on desktop) */}
      <div className="block md:hidden mt-[-1rem] px-[4vw]">
        <h2 className="text-4xl font-bold tracking-tight text-black mb-[3rem]">
          This is simply what we do
        </h2>

        {/* Stacked mobile cards */}
        <div className="flex flex-col gap-0">
          {/* Card 1: Social Strategy & Management */}
          <div className="border border-black border-b-0 border-x-0 p-0 py-5">
            <div className="w-full h-[250px] bg-gray-100 mb-4">
              <img
                src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765879825/2_jegbj9.png"
                alt="img1"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-2xl mb-3">
              Social Strategy & Management
            </h3>
            <p className="text-sm text-black leading-relaxed">
              We don't just post, we plan, manage, and grow your brand's
              presence.
            </p>
          </div>

          {/* Card 2: Web Design & Development */}
          <div className="border border-black border-x-0 py-5 border-b-0">
            <div className="w-full h-[250px] bg-gray-100 mb-4">
              <img
                src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765879826/3_r08wlm.png"
                alt="img2"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-2xl mb-3">
              Web Design & Development
            </h3>
            <p className="text-sm text-black leading-relaxed">
              We shape digital spaces. Real craft, real performance that's
              designed to grow.
            </p>
          </div>

          {/* Card 3: Brand Design */}
          <div className="border border-black border-x-0 py-5 border-b-0">
            <div className="w-full h-[250px] bg-gray-100 mb-4">
              <img
                src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765879825/Placeholder_Image_zxnykm.png"
                alt="img3"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-2xl mb-3">
              Brand Design
            </h3>
            <p className="text-sm text-black leading-relaxed">
              We design bold branding and expressive motion to shape your visual
              presence.
            </p>
          </div>

          {/* Card 4: Content Strategy */}
          <div className="border border-black border-x-0 py-5 border-b-0">
            <div className="w-full h-[250px] bg-gray-100 mb-4">
              <img
                src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765879826/Placeholder_Image1_me1r2y.png"
                alt="img4"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-2xl mb-3">
              Content Strategy
            </h3>
            <p className="text-sm text-black leading-relaxed">
              We build thoughtful strategies that give content focus, intent and
              results.
            </p>
          </div>
        </div>

        <div className="w-[100vw] mx-auto relative -left-7 h-[1px] bg-black my-12"></div>

        {/* Mobile Done Section */}
        <div id="done-mobile" className="w-full">
          <h2 className="text-4xl font-bold tracking-tight text-black mb-4 mt-20">
            Stuff we've done
          </h2>
          <p className="text-base text-black mb-16 font-bold">
            Just some of the brands we’ve worked with
          </p>

          <div className="space-y-12 border-t-[1px] border-t-black">
            <div
              className="py-8 cursor-pointer"
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.target.closest("a"))
                  window.location.href = "/case-studies/basement-approved";
              }}
              onClick={(e) => {
                if (e.target.closest && e.target.closest("a")) return;
                window.location.href = "/case-studies/basement-approved";
              }}
            >
              <div className="w-full aspect-[4/3] mb-0 flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765882727/Untitled_Project_smo9qt.jpg  "
                  alt="basement approved"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4 mt-10">
                <h3 className="text-2xl font-bold text-black">
                  Basement Approved
                </h3>
                <p className="text-lg text-black font-bold">
                  Culture, music and editorial platform
                </p>
                <p className="text-base font-medium text-black leading-relaxed">
                  Silo transformed BasementApproved’s digital presence with a
                  new website, Mixcloud integration and a streamlined content
                  system that brings their community, music and cultural
                  storytelling into one cohesive experience.
                </p>
                <div className="flex flex-wrap md:flex-nowrap gap-2">
                  <span className="text-sm font-semibold text-black p-2 bg-brand/20">
                    Web Design
                  </span>
                  <span className="text-sm font-semibold text-black p-2 bg-brand/20">
                    Web Development
                  </span>
                  <span className="text-sm font-semibold text-black p-2 bg-brand/20">
                    API Integration
                  </span>
                </div>
                <a
                  href="/case-studies/basement-approved"
                  className="inline-flex items-center gap-2 font-dm font-bold text-lg text-[#FF322E] group"
                >
                  <span>View Project</span>
                  <span className="transform transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                    <MdOutlineKeyboardArrowRight className="text-xl" />
                  </span>
                </a>
              </div>
            </div>

            <div
              className="relative top-[-2rem] py-8 cursor-pointer"
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.target.closest("a"))
                  window.location.href = "/case-studies/tomoka-fine-and-rare";
              }}
              onClick={(e) => {
                if (e.target.closest && e.target.closest("a")) return;
                window.location.href = "/case-studies/tomoka-fine-and-rare";
              }}
            >
              <div className="w-full aspect-[4/3] mb-0 flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/Tomoko-e10fd11f_2_jto3ax.png"
                  alt="lumin solar"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black">
                  Tomoka Fine & Rare
                </h3>
                <p className="text-lg text-black font-bold">
                  Modern whisky investment & retail
                </p>
                <p className="text-base font-medium text-black leading-relaxed">
                  A heritage whisky brand modernised without losing its soul.
                  From website build to social, video, PR and CRM, Silo
                  transformed Tomoka into a premium digital powerhouse.
                </p>
                <div className="flex flex-wrap md:flex-nowrap gap-2">
                  <span className="text-sm font-semibold text-black p-2 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-sm font-semibold text-black p-2 bg-brand/20">
                    Website
                  </span>
                  <span className="text-sm font-semibold text-black p-2 bg-brand/20">
                    Social
                  </span>
                  <span className="text-sm font-semibold text-black p-2 bg-brand/20">
                    Creative
                  </span>
                  <span className="text-sm font-semibold text-black p-2 bg-brand/20">
                    CRM
                  </span>
                  <div className="w-full md:w-auto">
                    <span className="transform -translate-x-2 translate-y-1 md:translate-x-0 md:translate-y-0 text-sm font-semibold text-black p-2 bg-brand/20">
                      PPC
                    </span>
                  </div>
                </div>
                <a
                  href="/case-studies/tomoka-fine-and-rare"
                  className="inline-flex items-center gap-2 font-dm font-bold text-lg text-[#FF322E] group"
                >
                  <span>View Project</span>
                  <span className="transform transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                    <MdOutlineKeyboardArrowRight className="text-xl" />
                  </span>
                </a>
              </div>
            </div>

            <div
              className="pt-8 relative top-[-8rem] cursor-pointer"
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.target.closest("a"))
                  window.location.href = "/case-studies/electrolytes-with-joly";
              }}
              onClick={(e) => {
                if (e.target.closest && e.target.closest("a")) return;
                window.location.href = "/case-studies/electrolytes-with-joly";
              }}
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765884632/image_5_ibtcoo.png"
                  alt="smart stats"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black">
                  Electrolytes with Joly
                </h3>
                <p className="text-lg text-black font-bold">
                  A vibrant identity for a new radio show
                </p>
                <p className="text-base font-medium text-black leading-relaxed">
                  Silo created an identity reflecting the show’s energetic,
                  atmospheric and slightly cosmic tone, supported by a visual
                  system that works across social media and ongoing episode
                  releases.
                </p>
                <div className="flex flex-wrap md:flex-nowrap gap-2">
                  <span className="text-sm font-bold text-black p-2 bg-brand/20">
                    Branding
                  </span>
                  <span className="text-sm font-bold text-black p-2 bg-brand/20">
                    Typography
                  </span>
                  <span className="text-sm font-bold text-black p-2 whitespace-nowrap bg-brand/20">
                    Social Templates
                  </span>
                  <div className="w-full md:w-auto">
                    <span className="transform -translate-x-2 translate-y-1 md:translate-x-0 md:translate-y-0 text-sm font-bold text-black p-2 whitespace-nowrap bg-brand/20">
                      Design System
                    </span>
                  </div>
                </div>
                <a
                  href="/case-studies/electrolytes-with-joly"
                  className="inline-flex items-center gap-2 font-dm font-bold text-lg text-[#FF322E] group"
                >
                  <span>View Project</span>
                  <span className="transform transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                    <MdOutlineKeyboardArrowRight className="text-xl" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-[-5rem]">
            <a
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2  bg-transparent border-[1px] border-brand h-[55px] px-6 py-3 text-base font-extrabold  tracking-wide text-brand"
            >
              <span>View all</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
