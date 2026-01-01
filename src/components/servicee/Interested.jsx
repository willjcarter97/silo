import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Interested = () => {
  return (
    <section className="w-full bg-white text-black pt-16 md:pt-20 pb-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-0">
        {/* Two column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mx-auto">
          {/* Card 1: Social Strategy & Management */}
          <article className="border-t border-black md:p-8 p-0 py-6 md:pr-8 flex flex-col gap-4">
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
              <img
                src="https://images.prismic.io/silosite/aVUgQXNYClf9otrH_v1765879825_2_jegbj9.png?auto=format,compress"
                alt="Social Strategy & Management"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[28px] md:text-[32px] leading-[130%] tracking-normal text-black">
              Social Strategy & Management
            </h3>
            <p className="text-base leading-[150%] tracking-normal text-black">
              We don't just post, we plan, manage, and grow your brand's
              presence.
            </p>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Strategy and content planning
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Content creation and production
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Channel scheduling and management
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Community engagement and reporting
              </li>
            </ul>
          </article>

          {/* Card 2: Web Design & Development */}
          <article className="border-t border-black md:border-l md:p-8 p-0 py-6 md:pl-8 flex flex-col gap-4">
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
              <img
                src="https://images.prismic.io/silosite/aVUgQ3NYClf9otrJ_v1765879826_3_r08wlm.png?auto=format,compress"
                alt="Web Design & Development"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[28px] md:text-[32px] leading-[130%] tracking-normal text-black">
              Web Design & Development
            </h3>
            <p className="text-base leading-[150%] tracking-normal text-black">
              We shape digital spaces. Real craft, real performance that's
              designed to grow.
            </p>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Strategic UX and site architecture
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Custom web design for modern brands
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Clean, reliable development
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Launch support and ongoing improvements
              </li>
            </ul>
          </article>

          {/* Card 3: Brand Design */}
          <article className="border-t border-black md:p-8 p-0 py-6 md:pr-8 flex flex-col gap-4">
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
              <img
                src="https://images.prismic.io/silosite/aVUgQnNYClf9otrI_v1765879825_Placeholder_Image_zxnykm.png?auto=format,compress"
                alt="Brand Design"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[28px] md:text-[32px] leading-[130%] tracking-normal text-black">
              Brand Design
            </h3>
            <p className="text-base leading-[150%] tracking-normal text-black">
              We design bold branding and expressive motion to shape your visual
              presence.
            </p>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Brand identity and visual systems
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Logo design and typographic styling
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Colour palettes and design guidelines
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Branded templates and presentation materials
              </li>
            </ul>
          </article>

          {/* Card 4: Content Strategy */}
          <article className="border-t border-black md:border-l md:p-8 p-0 py-6 md:pl-8 flex flex-col gap-4">
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
              <img
                src="https://images.prismic.io/silosite/aVUgRHNYClf9otrK_v1765879826_Placeholder_Image1_me1r2y.png?auto=format,compress"
                alt="Content Strategy"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[28px] md:text-[32px] leading-[130%] tracking-normal text-black">
              Content Strategy
            </h3>
            <p className="text-base leading-[150%] tracking-normal text-black">
              We build thoughtful strategies that give content focus, intent and
              results.
            </p>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Audience research and insight development
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Content frameworks and pillar definition
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Messaging, tone of voice and positioning
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Planning, optimisation and performance guidance
              </li>
            </ul>
          </article>

          {/* Card 5: Optional Add-ons - Full width */}
          <article id="optional" className="md:col-span-2 border-t border-black md:p-8 p-0 py-6 flex flex-col gap-4">
            <h3 className="font-epilogue font-bold text-[28px] md:text-[32px] leading-[130%] tracking-normal text-black">
              Optional add-ons
            </h3>
            <p className="text-base leading-[150%] tracking-normal text-black">
              These services support your core campaign and can be added when
              needed.
            </p>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Email Marketing
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Paid Advertising (Meta, Google, TikTok, Bing)
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Influencer Campaign Management (talent sourcing, rate
                negotiation, deliverables)
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                UGC & Influencer Marketing
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-transparent border-[1px] border-brand h-[55px] px-8 py-3 text-xs font-semibold tracking-wide text-brand relative overflow-hidden group w-fit"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="block text-brand w-6 h-6 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-20 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-60">
                  Interested in a chat?
                </span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Interested;
