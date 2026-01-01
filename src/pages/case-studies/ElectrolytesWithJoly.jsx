import React, { useRef, useEffect } from "react";
import TitleWithDescription from "../../components/poststudy/TitleWithDescription";
import StatsSection from "../../components/poststudy/StatsSection";
import FullScreenImage from "../../components/poststudy/FullScreenImage";
import GalleryWithText from "../../components/poststudy/GalleryWithText";
import SimpleHeadingText from "../../components/poststudy/SimpleHeadingText";
import FourGallery from "../../components/poststudy/FourGallery";
import WantResultsLikeThis from "../../components/Common/WantResultsLikeThis";
import { usePageMeta } from "../../hooks/usePageMeta";

const ElectrolytesWithJoly = () => {
  usePageMeta(
    "Electrolytes With Joly | Branding & Visual Identity",
    "A fluid, expressive brand identity for Electrolytes With Joly. Silo created a distinctive logotype and artwork system built for social and ongoing releases."
  );

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const caseStudy = {
    titleSection: {
      title:
        "Shaping a visual identity that captures energy, movement and personality",
      description: [
        "Electrolytes With Joly is a new radio show that needed a distinctive identity built around flow, movement and a sense of electric energy. The aim was to create a recognisable look that felt vibrant and expressive while remaining practical for regular use across social channels.",
        "The project began with a wide spectrum of inspiration, including fluid lettering, cosmic textures and expressive serif styles. The opportunity was to refine these ideas into a direction that felt confident, energetic and aligned with the tone of the show. The identity needed to balance movement and refinement while working seamlessly with photography for future episode artwork.",
      ],
    },
    stats: {
      title: "Launch metrics that exceeded goals",
      column1: {
        heading: "Downloads in 60 Days",
        value: "100K",
        description:
          "Organic and paid user acquisition through App Store optimization and targeted campaigns.",
      },
      column2: {
        image: { src: null, alt: "App usage analytics" },
        stat: {
          heading: "30-Day Retention Rate",
          value: "72%",
          description:
            "Industry-leading retention through gamification and personalized content.",
        },
      },
      column3: {
        stat: {
          heading: "Daily Active Users",
          value: "68K",
          description:
            "Consistent daily engagement with an average session time of 24 minutes.",
        },
        image: { src: null, alt: "User engagement chart" },
      },
    },
    fullScreenImage: {
      src: null,
      alt: "FitLife mobile app showcase",
    },
    galleryWithText: {
      heading: "From concept to identity",
      text: [
        "Silo created a distinctive logotype and visual system designed to reflect the movement, confidence and atmosphere of Electrolytes With Joly. The logotype explores fluid serif forms in both standalone and oval framed variations, each developed to feel expressive, refined and adaptable across different formats.",
        "A supporting colour and texture approach using glow, grain and vibrant tones adds depth and energy without overpowering the content. To ensure the identity works for ongoing episodes, we designed artwork templates for both feed and story formats. These layouts integrate naturally with photography, giving the show a consistent and recognisable presence across social channels.",
        "Together, the logotype, colour approach and templates create a cohesive identity that captures the tone of the show and provides a strong foundation for future episodes and continued development.",
      ],

      images: [
        {
          src: "https://images.prismic.io/silosite/aVUghnNYClf9otr9_v1765998153_1_vmu3xv.png?auto=format,compress",
          alt: "Workout tracking screen",
        },
        {
          src: "https://images.prismic.io/silosite/aVUgh3NYClf9otr-_v1765998155_2_xwc2m7.png?auto=format,compress",
          alt: "Social challenges",
        },
        {
          src: "https://images.prismic.io/silosite/aVUgnXNYClf9otsU_v1767181103_Electrolytes_with_jolly_-_tracklist_dcb4lz.png?auto=format,compress",
          alt: "Achievement system",
        },
      ],
    },
    simpleHeadingText: {
      heading: "Technology that keeps users coming back",
      text: [
        "The app uses machine learning to personalize workout recommendations based on user behavior, fitness level, and goals. Push notifications are intelligently timed to maximize engagement without being annoying.",
        "We built a robust backend that handles real-time leaderboards, social features, and workout tracking for hundreds of thousands of users. The app syncs seamlessly with popular fitness wearables and integrates with Apple Health and Google Fit.",
      ],
    },
    fourGallery: {
      images: [
        { src: null, alt: "Onboarding flow" },
        { src: null, alt: "Workout library" },
        { src: null, alt: "Progress tracking" },
        { src: null, alt: "Social features" },
      ],
    },
  };

  return (
    <div className="w-full h-auto bg-white mb-5 md:mb-20">
      {/* Inline Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[100vh] md:aspect-video overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover hidden"
          src="https://res.cloudinary.com/di9tb45rl/video/upload/v1762717692/Demo-video_himxf7.mp4"
          loop
          muted
          autoPlay
          playsInline
        />
        <img
          src="https://images.prismic.io/silosite/aVUgeHNYClf9otrv_v1765966122_Placeholder_Lightbox_ldgfrj.png?auto=format,compress"
          alt="img"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <TitleWithDescription
        title={caseStudy.titleSection.title}
        description={caseStudy.titleSection.description}
        minHeightClass="min-h-[300px] md:min-h-[400px]"
        leftWidthClass="md:w-[55%] lg:w-[58%] xl:w-[60%]"
        rightWidthClass="md:w-[42%] lg:w-[38%] xl:w-[36%]"
        mediaType="none"
      />
      {/* <StatsSection
        title={caseStudy.stats.title}
        column1={caseStudy.stats.column1}
        column2={caseStudy.stats.column2}
        column3={caseStudy.stats.column3}
      /> */}
      {/* <FullScreenImage
        src={caseStudy.fullScreenImage.src}
        alt={caseStudy.fullScreenImage.alt}
      /> */}
      <GalleryWithText
        heading={caseStudy.galleryWithText.heading}
        text={caseStudy.galleryWithText.text}
        images={caseStudy.galleryWithText.images}
      />
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          Clear and confident visual direction for the show's future
        </h2>
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            The new identity gives Electrolytes With Joly a visual direction
            that feels intentional and fully aligned with the tone of the show.
            It brings consistency to how episodes are presented, strengthens the
            overall brand presence and provides assets that are simple to use as
            the show grows. The system supports both one off releases and long
            term content, giving the brand room to evolve while maintaining a
            strong sense of character.
          </p>
        </div>
      </div>

      {/* <SimpleHeadingText
        heading={caseStudy.simpleHeadingText.heading}
        text={caseStudy.simpleHeadingText.text}
      />
      <FourGallery images={caseStudy.fourGallery.images} /> */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-16" />
      <WantResultsLikeThis />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
    </div>
  );
};

export default ElectrolytesWithJoly;
