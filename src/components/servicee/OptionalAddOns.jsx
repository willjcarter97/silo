import React from "react";
import { FaChevronRight } from "react-icons/fa";
import LazyImage from "../Common/LazyImage";
import LazyElement from "../Common/LazyElement";

const OptionalAddOns = () => {
  return (
    <section className="w-full bg-white text-black md:pb-16 pb-0">
      <div className="max-w-[1280px] mx-auto px-4 md:px-0">
        {/* Three column layout on md+, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 */}
          <LazyElement className="md:p-8 p-0 py-5 pl-0 border-b border-black md:border-r flex flex-col gap-4" animation="fadeUp" delay={0}>
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
              <LazyImage
                src="https://images.prismic.io/silosite/aVUgCHNYClf9otq4_v1762717268_option-service1_oiwmo4.png?auto=format,compress"
                alt="Email Marketing"
                className="w-full h-full object-cover object-top"
                containerClassName="w-full h-full"
                showSkeleton={true}
                placeholderColor="#f3f4f6"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[32px] md:text-[28px] lg:text-[32px] leading-[130%] tracking-normal text-black">
              Email Marketing
            </h3>
            <p className="text-[16px] leading-[150%] tracking-normal text-black">
              We don't just send emails — we craft conversations that convert.
            </p>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Targeted campaigns built from audience insights
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Engaging copy and design that drives clicks
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Automated workflows to nurture leads and boost retention
              </li>
            </ul>
          </LazyElement>

          {/* Column 2 */}
          <LazyElement className="md:p-8 p-0 py-5 pr-0 border-b border-black md:border-r border-l-0 flex flex-col gap-4" animation="fadeUp" delay={100}>
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
              <LazyImage
                src="https://images.prismic.io/silosite/aVUgNnNYClf9otrC_v1762770096_option-service2_k1qegk.png?auto=format,compress"
                alt="Paid Advertising"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
                showSkeleton={true}
                placeholderColor="#f3f4f6"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[32px] md:text-[28px] lg:text-[32px] leading-[130%] tracking-normal text-black">
              Paid Advertising (Meta, Google, Tik Tok, Bing etc)
            </h3>
            <p className="text-[16px] leading-[150%] tracking-normal text-black">
              We turn ad spend into measurable growth through data-driven
              strategy and creative precision.
            </p>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Platform-specific campaigns optimized for ROI
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Eye-catching creatives that stop the scroll
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Continuous testing, tracking, and performance scaling
              </li>
            </ul>
          </LazyElement>

          {/* Column 3 */}
          <LazyElement className="md:col-span-2 lg:col-span-1 md:p-8 p-0 py-5 border-b border-black flex flex-col gap-4" animation="fadeUp" delay={200}>
            <div className="w-full h-[250px] md:h-[280px] bg-gray-100 overflow-hidden">
              <LazyImage
                src="https://images.prismic.io/silosite/aVUgC3NYClf9otq6_v1762717273_option-service3_j0um8a.png?auto=format,compress"
                alt="Influencer Campaign Management"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
                showSkeleton={true}
                placeholderColor="#f3f4f6"
              />
            </div>
            <h3 className="font-epilogue font-bold text-[32px] md:text-[28px] lg:text-[32px] leading-[130%] tracking-normal text-black">
              Influencer Campaign Management
            </h3>
            <p className="text-[16px] leading-[150%] tracking-normal text-black">
              We connect brands with the right voices — from discovery to
              delivery, every detail handled.
            </p>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Talent sourcing that aligns with your brand identity
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                Transparent rate negotiation and partnership management
              </li>
              <li className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></span>
                End-to-end coordination of briefs, timelines, and deliverables
              </li>
            </ul>
          </LazyElement>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-transparent border-[1px] border-brand h-[55px] px-8 py-3 text-xs font-semibold  tracking-wide text-brand relative overflow-hidden group"
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
              <FaChevronRight className="block text-brand w-6 h-6 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-24 group-hover:scale-[140%]" />
            </div>
            <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-60">
              Interested in chat?
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OptionalAddOns;
