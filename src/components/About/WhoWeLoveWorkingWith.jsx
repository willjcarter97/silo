import TextLoop from "../Common/TextLoop";
import { LuTriangleRight } from "react-icons/lu";
import "../../styles/scaling-overrides.css";

// Marquee row data objects — edit these to add/remove/modify each row
const row1 = {
  id: "row1",
  text: "E-commerce & DTC , Beauty & Skincare , Wellness & Supplements , Food & Beverage , Lifestyle & Home , Travel & Hospitality , ",
  speed: 40,
  direction: "left",
  className: "text-lg md:text-lg xl:text-2xl font-bold text-black",
  separator: (
    <LuTriangleRight
      className="text-brand fill-brand mx-4 rotate-90"
      size={16}
    />
  ),
};

const row2 = {
  id: "row2",
  text: "Hotels & Resorts , Airbnbs , Adventure & Experiences , Home Décor , Furniture , Kitchenware , Premium & Emerging Brands , ",
  speed: 40,
  direction: "right",
  className: "text-lg md:text-lg xl:text-2xl font-bold text-black",
  separator: (
    <LuTriangleRight className="text-brand fill-brand mx-4" size={16} />
  ),
};

const row3 = {
  id: "row3",
  text: "Social-led Rebrands , Creator-led Campaigns , Retention & Community , Direct-to-Consumer Growth , Premium Collaborations , ",
  speed: 40,
  direction: "left",
  className: "text-lg md:text-lg xl:text-2xl font-bold text-black",
  separator: (
    <LuTriangleRight
      className="text-brand fill-brand mx-4 rotate-90"
      size={16}
    />
  ),
};

const WhoWeLoveWorkingWith = () => {
  return (
    <section className="main-div md:min-h-[60vh] min-h-[45vh] w-[100vw] flex items-start justify-center pt-32 md:pt-0 pb-0 mb-0 md:mb-0 sm:pb-8 md:pb-12 lg:pb-16 px-3 sm:px-4 md:px-0 bg-white overflow-x-hidden mt-20">
      <div className="max-w-full mr-auto w-full h-auto">
        {/* Text Section - Zoom & Small Laptop Optimized */}
        <div className="text-left mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2 sm:px-0 w-full -mt-32 md:mt-0">
          {/* Heading - Zoom & Small Laptop Optimized */}
          <h2
            className="font-bold text-black text-left sm:text-left md:text-left md:absolute md:left-1/2 md:-translate-x-1/2 md:-mt-12 lg:text-left lg:static lg:left-auto lg:translate-x-0 lg:mt-0 text-2xl sm:text-xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-[52px] leading-tight mb-3 md:mb-10 sm:mb-4"
            style={{
              fontFamily: "Epilogue, sans-serif",
              fontWeight: 700,
              lineHeight: "120%",
              letterSpacing: "0%",
            }}
          >
            Who we love working with
          </h2>

          {/* Below Text - Zoom & Small Laptop Optimized */}
          <p
            className="text-black lg:block xl:block text-left lg:text-left xl:text-left text-xs sm:text-sm md:text-base lg:text-lg xl:text-base leading-relaxed md:mt-10 max-w-xl lg:max-w-2xl"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 700,
              lineHeight: "150%",
              letterSpacing: "0%",
            }}
          >
            We partner with brands and businesses that value strong strategy, great design and a clear digital presence. If you care about building a brand that looks good, works well and communicates with purpose, we are your people.
          </p>
        </div>
      </div>
      {/* Cards Grid - Full Width */}
      <div className="absolute left-0 w-screen md:mt-60 mt-10">
        <div className="relative w-full md:space-y-16 space-y-8">
          <TextLoop {...row1} key={row1.id} separator={row1.separator} />
          <TextLoop {...row2} key={row2.id} separator={row2.separator} />
          <TextLoop {...row3} key={row3.id} separator={row3.separator} />

          {/* Left overlay: narrow, only as tall as these rows (h-full on wrapper) */}
          <div
            className="absolute left-0 h-full w-12 md:w-64 pointer-events-none z-10"
            style={{
              top: "-70px",
              height: "calc(100% + 32px)",
              background: `
      linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.9) 15%,
        rgba(250, 250, 250, 0.55) 35%,
        rgba(245, 245, 245, 0.2) 55%,
        rgba(255, 255, 255, 0) 100%
      )
    `,
            }}
          />

          {/* Right overlay to mirror the left one */}
          <div
            className="absolute right-0 h-full w-12 md:w-64 pointer-events-none z-10"
            style={{
              top: "-70px",
              height: "calc(100% + 32px)",
              background: `
      linear-gradient(
        to left,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.9) 15%,
        rgba(250, 250, 250, 0.55) 35%,
        rgba(245, 245, 245, 0.2) 55%,
        rgba(255, 255, 255, 0) 100%
      )
    `,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeLoveWorkingWith;
