import { useEffect } from "react";
import Hero from "../components/About/Hero";
import WhatSiloIs from "../components/About/WhatSiloIs";
import WhyUGC from "../components/About/WhyUGC";
import WhoWeLoveWorkingWith from "../components/About/WhoWeLoveWorkingWith";
import ThingsWeBelieveIn from "../components/About/ThingsWeBelieveIn";
import MindsInTheSilo from "../components/About/MindsInTheSilo";
import ReadyWhenYouAre from "../components/Common/ReadyWhenYouAre";
import LazySection from "../components/Common/LazySection";
import { usePageMeta } from "../hooks/usePageMeta";

const About = () => {
  usePageMeta(
    "Boutique Creative Studio for Modern Brands",
    "A boutique creative agency blending social media strategy, content strategy, branding, digital design and website development to build meaningful brand experiences."
  );

  // Handle scroll to anchor or top when component mounts
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for content to load, then scroll to anchor
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="bg-white overflow-x-hidden flex flex-col mx-auto">
      <div id="hero" className="min-h-screen mx-auto max-w-[1280px]">
        <Hero />
      </div>

      <div className="h-[1px] bg-black w-[100vw]"></div>
      <div className=" min-h-screen mx-auto w-full max-w-[1280px]">
        <LazySection>
          <WhatSiloIs />
        </LazySection>
        <LazySection>
          <div id="why-ugc" className="hidden">
            <WhyUGC />
          </div>
        </LazySection>
        <LazySection>
          <WhoWeLoveWorkingWith />
        </LazySection>
        <LazySection>
          <div id="things-we-believe-in">
            <ThingsWeBelieveIn />
          </div>
        </LazySection>
        <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-10" />
        <LazySection>
          <div id="minds-in-the-silo">
            <MindsInTheSilo />
          </div>
        </LazySection>
        <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10 mb-20" />
        <LazySection>
          <ReadyWhenYouAre />
        </LazySection>
        <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
      </div>
    </div>
  );
};

export default About;
