import { SiloHoverBanner } from "./SiloHoverBanner";
import LogoLoop from "../Common/LogoLoop";
import VideoAndWelcome from "./VideoAndWelcome";
import ContentAndDone from "./ContentAndDone";
import Section from "./Section";
import LazySection from "../Common/LazySection";
import LazyElement from "../Common/LazyElement";
import "../../styles/scaling-overrides.css";

const DEFAULT_LOGOS = [
  {
    src: "https://images.prismic.io/silosite/aVUgP3NYClf9otrF_v1765878090_Vector_1_g3nkgs.png?auto=format,compress",
    alt: "logo1",
      style: { width: "50px", height: "auto" },
  },
  {
    src: "https://images.prismic.io/silosite/aVUgPnNYClf9otrE_v1765878090_image_7_irnf5t.png?auto=format,compress",
    alt: "logo2",
    style: { height: "30px"},
  },
  {
    src: "https://images.prismic.io/silosite/aVUgQHNYClf9otrG_v1765878091_Layer_o43ajs.png?auto=format,compress",
    alt: "logo3",
  },
  {
    src: "https://images.prismic.io/silosite/aVUgRnNYClf9otrM_v1765882727_Untitled_Project_smo9qt.jpg?auto=format,compress",
    alt: "logo4",
    style: { width: "80px", height: "auto" },
  },
  {
    src: "https://images.prismic.io/silosite/aVUgSXNYClf9otrP_v1765884632_Tomoko-e10fd11f_2_jto3ax.png?auto=format,compress",
    alt: "logo5",
    style: { width: "90px", height: "auto" },
  },
  {
    src: "https://images.prismic.io/silosite/aVUgSHNYClf9otrO_v1765884632_image_5_ibtcoo.png?auto=format,compress",
    alt: "logo6",
    style: { width: "100px", height: "auto" },
  },
];

export default function Hero() {
  return (
    <>
      <div className="w-full max-w-[1280px] mx-auto">
      {/* Full screen hero section - using min-h to prevent overlap on smaller screens */}
      <div className="w-full 2xl:min-h-[calc(100vh-80px)] xl:min-h-[calc(100vh-80px)] lg:h-auto md:min-h-[60vh] min-h-fit h-auto flex flex-col justify-between gap-6 md:gap-8">
        <SiloHoverBanner
          svgSrc="https://silosite.cdn.prismic.io/silosite/aVUgoXNYClf9otsY_v1762717235_hero_hyl0xu.svg"
          intensity={40}
          className="home-hero-text-float flex-shrink-0 mt-8 md:mt-12 lg:mt-16"
        />

        <div className="relative left-1/2 -translate-x-1/2 w-screen bg-transparent flex-shrink-0 mt-auto">
          <div className="w-full home-hero-text-h">
            <div className="py-3 md:py-4 text-center font-bold text-2xl xl:text-xl text-black">
              Used by companies who know what works.
            </div>
          </div>
          <div className="pb-6 mt-3 home-hero-text-p">
            <LogoLoop
              logos={DEFAULT_LOGOS}
              gap={80}
              speed={100}
              stripCoverage={4}
              shuffleCopies={false}
              logoHeight={48}
            />
          </div>
        </div>
      </div>

        <LazyElement animation="fadeUp" delay={200}>
        <VideoAndWelcome />
      </LazyElement>
      </div>
      <div className="w-[100vw] h-[1px] bg-black md:my-28 my-20 relative left-1/2 -translate-x-1/2" />
      <div className="w-full max-w-[1280px] mx-auto">
        <LazySection rootMargin="200px">
          <ContentAndDone />
        </LazySection>
      </div>
      <div className="w-[100vw] h-[1px] bg-black md:my-28 my-20 relative left-1/2 -translate-x-1/2" />
      <div className="w-full max-w-[1280px] mx-auto">
        <LazySection rootMargin="200px">
          <Section />
        </LazySection>
      </div>
      <div className="w-[100vw] h-[1px] bg-black mt-10 relative left-1/2 -translate-x-1/2" />
    </>
  );
}
