import TextLoop from "../Common/TextLoop";
import { LuTriangleRight } from "react-icons/lu";
import "../../styles/scaling-overrides.css";

// Marquee row data objects — edit these to add/remove/modify each row
const row1 = {
  id: "row1",
  text: "Lifestyle , Culture , Fashion , Beauty , Wellness , Events , Experiences , Entertainment , Travel , Health and fitness , Food and drink , Music , Art and design , Home and interiors , Sports , Personal development , ",
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
  text: "Consumer goods , DTC brands , Media , Hospitality , Property , Real estate , Retail , E-commerce brands , Luxury goods , Homeware , Furniture , Travel and leisure brands , ",
  speed: 40,
  direction: "right",
  className: "text-lg md:text-lg xl:text-2xl font-bold text-black",
  separator: (
    <LuTriangleRight className="text-brand fill-brand mx-4" size={16} />
  ),
};

const row3 = {
  id: "row3",
  text: "Finance , Investment , Professional services , Technology , SaaS , Startups , Creative industries , Fintech , Consulting , Legal services , B2B services , Software companies , Venture capital , Business education and training , ",
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
    <section className="w-screen relative left-1/2 -translate-x-1/2 py-12 md:py-16 lg:py-20 bg-white overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-6 lg:px-8">
        {/* Text Section */}
        <div className="text-left mb-8 md:mb-12 lg:mb-16">
          <h2
            className="font-regular text-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[52px] leading-tight mb-4 md:mb-6"
            style={{
              fontFamily: "Epilogue, sans-serif",
              fontWeight: 700,
              lineHeight: "120%",
            }}
          >
            Who we love working with
          </h2>

          <p
            className="text-black text-sm sm:text-base md:text-lg leading-relaxed max-w-xl lg:max-w-2xl"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 700,
              lineHeight: "150%",
            }}
          >
            We partner with brands and businesses that value strong strategy, great design and a clear digital presence. If you care about building a brand that looks good, works well and communicates with purpose, we are your people.
          </p>
        </div>
      </div>
      {/* Marquee Rows - Full Width */}
      <div className="relative">
        <div className="space-y-6 md:space-y-10">
          <TextLoop {...row1} key={row1.id} separator={row1.separator} />
          <TextLoop {...row2} key={row2.id} separator={row2.separator} />
          <TextLoop {...row3} key={row3.id} separator={row3.separator} />
        </div>

        {/* Left fade overlay */}
        <div
          className="absolute left-0 top-0 h-full w-16 md:w-48 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)`,
          }}
        />

        {/* Right fade overlay */}
        <div
          className="absolute right-0 top-0 h-full w-16 md:w-48 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)`,
          }}
        />
      </div>
    </section>
  );
};

export default WhoWeLoveWorkingWith;
