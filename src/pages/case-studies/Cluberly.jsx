import React, { useRef, useEffect } from "react";
import TitleWithDescription from "../../components/poststudy/TitleWithDescription";
import StatsSection from "../../components/poststudy/StatsSection";
import FullScreenImage from "../../components/poststudy/FullScreenImage";
import GalleryWithText from "../../components/poststudy/GalleryWithText";
import SimpleHeadingText from "../../components/poststudy/SimpleHeadingText";
import FourGallery from "../../components/poststudy/FourGallery";
import WantResultsLikeThis from "../../components/Common/WantResultsLikeThis";
import { usePageMeta } from "../../hooks/usePageMeta";

const Cluberly = () => {
  usePageMeta(
    "Cluberly Fintech Storytelling Case Study",
    "How Silo helped Cluberly simplify a purpose driven fintech product through animated and real footage videos, creating clear communication tools for every audience."
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
        "Explaining a purpose driven fintech through story, clarity and motion",
      description: [
        "Cluberly is a savings and investment app with a unique purpose. Users save and invest as normal, and 50% of the platform fee is donated to a cause they choose, from sports clubs to schools and charities. The idea is powerful, but explaining how it works in a simple, engaging way was a challenge.",
      ],
    },
    stats: {
      title: "Key highlights include:",
      column1: {
        heading: "Clearer communication tools",
        value: "1 suite",
        description:
          "A cohesive range of communication tools that convey the product’s value, purpose and simplicity.",
      },
      column2: {
        image: {
          src: "https://images.prismic.io/silosite/aVUglHNYClf9otsL_v1766007837_2_pvdc8h.png?auto=format,compress",
          alt: "Social media engagement dashboard",
        },
        stat: {
          heading: "Improved engagement",
          value: (
            <>
              <span className="text-[0.8em]">Across</span>
              <br />
              <span className="text-[0.8em]">Channels</span>
            </>
          ),
          description:
            "These assets have improved engagement across marketing, investor pitches and partnership conversations.",
        },
      },
      column3: {
        stat: {
          heading: "Stronger audience connection",
          value: (
            <>
              <span className="text-[0.8em]">Brand</span>
              <br />
              <span className="text-[0.8em]">wide</span>
            </>
          ),
          description:
            "Helping the brand build stronger connections with users, partners and investors.",
        },
        image: {
          src: "https://images.prismic.io/silosite/aVUglXNYClf9otsM_v1766007841_3_ovm3rr.png?auto=format,compress",
          alt: "Sales performance graph",
        },
      },
    },
    fullScreenImage: {
      src: null,
      alt: "UGC creator campaign showcase",
    },
    galleryWithText: {
      heading: "Bringing the story to life",
      content: [
        {
          subheading: "Animated Explainer Video",
          text: "A warm and accessible animation that explains the product and its social impact in a concise, easy to understand format.",
        },
        {
          subheading: "Real Footage Brand Video",
          text: "A dynamic film using real video from its Ambassadors including Rugby legend Mike Tindall, and photography to show lifestyle, purpose and community impact.",
        },
        {
          subheading: "Multi Platform Edits",
          text: "Shorter vertical and square versions optimised for social media, advertising and landing page use.",
        },
        {
          subheading: "Document and Presentation Design",
          text: "Clean and professional materials to support investor pitches, partnership conversations and onboarding.",
        },
        {
          text: "Together, these assets strengthened Cluberly’s message, increased clarity and created a cohesive narrative that is easy for anyone to understand.",
        },
      ],
      images: [
        {
          src: "https://images.prismic.io/silosite/aVUgknNYClf9otsJ_v1766007831_0_ggi2ae.png?auto=format,compress",
          alt: "Creator content compilation",
        },
        {
          src: "https://images.prismic.io/silosite/aVUgk3NYClf9otsK_v1766007833_1_n7einu.png?auto=format,compress",
          alt: "Behind the scenes",
        },
      ],
    },
    simpleHeadingText: {
      heading: "Building a sustainable creator ecosystem",
      text: [
        "This wasn't a one-off campaign. We built a creator program that continues to generate fresh, authentic content month after month. We developed creator briefs that balance brand guidelines with creative freedom, established fair compensation structures, and created a community where creators feel valued.",
        "The content library we built is now being repurposed across all of BeautyBrand's marketing channels—from paid social ads to email campaigns to website product pages. The authentic testimonials and real-world product demonstrations have become their most valuable marketing assets.",
      ],
    },
    fourGallery: {
      images: [
        { src: null, alt: "Creator partnership kickoff" },
        { src: null, alt: "Content creation process" },
        { src: null, alt: "Top performing videos" },
        { src: null, alt: "Community celebration" },
      ],
    },
  };

  return (
    <div className="w-full h-auto bg-white mb-5 md:mb-20">
      {/* Inline Hero Section */}
      <div className="relative w-full h-[50vh] md:h-auto md:aspect-video overflow-hidden">
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
          src="https://images.prismic.io/silosite/aVUgenNYClf9otrx_v1765966838_Placeholder_Lightbox_r1xyms.png?auto=format,compress"
          alt="img"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <TitleWithDescription
        title={caseStudy.titleSection.title}
        description={caseStudy.titleSection.description}
        minHeightClass="min-h-[300px] md:min-h-[250px]"
        leftWidthClass="md:w-[55%] lg:w-[58%] xl:w-[60%]"
        rightWidthClass="md:w-[42%] lg:w-[38%] xl:w-[36%]"
        mediaType="iframe"
        mediaSrc="https://player.vimeo.com/video/1148605076?badge=0&autopause=0&player_id=0&app_id=58479"
        mediaCover="https://images.prismic.io/silosite/aVUgkHNYClf9otsH_v1766006435_1_eghyei.png?auto=format,compress"
      />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          Understanding the challenge
        </h2>
        <div className="flex flex-col w-full md:w-[70%] gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            Cluberly’s product model was strong but not immediately easy to
            understand. Potential users needed clarity on how the app worked,
            partners needed a clearer value proposition, and investors required
            polished materials that conveyed purpose and potential
          </p>
          <p>
            The brand needed a concise storytelling approach that communicated
            the message quickly and memorably.
          </p>
        </div>
      </div>

      <GalleryWithText
        heading={caseStudy.galleryWithText.heading}
        content={caseStudy.galleryWithText.content}
        images={caseStudy.galleryWithText.images}
      />

      <StatsSection
        title={caseStudy.stats.title}
        column1={caseStudy.stats.column1}
        column2={caseStudy.stats.column2}
        column3={caseStudy.stats.column3}
      />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          Strengthening clarity for every audience
        </h2>
        <div className="flex flex-col w-full md:w-[70%] gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            Cluberly now has a clear and cohesive range of communication tools
            that convey the product’s value, purpose and simplicity. These
            assets have improved engagement across marketing, investor pitches
            and partnership conversations, helping the brand build stronger
            connections with audiences.
          </p>
        </div>
      </div>

      {/* <FullScreenImage
        src={caseStudy.fullScreenImage.src}
        alt={caseStudy.fullScreenImage.alt}
      /> */}

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

export default Cluberly;
