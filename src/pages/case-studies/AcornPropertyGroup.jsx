import React, { useRef, useEffect } from "react";
import TitleWithDescription from "../../components/poststudy/TitleWithDescription";
import StatsSection from "../../components/poststudy/StatsSection";
import FullScreenImage from "../../components/poststudy/FullScreenImage";
import GalleryWithText from "../../components/poststudy/GalleryWithText";
import SimpleHeadingText from "../../components/poststudy/SimpleHeadingText";
import FourGallery from "../../components/poststudy/FourGallery";
import WantResultsLikeThis from "../../components/Common/WantResultsLikeThis";
import { usePageMeta } from "../../hooks/usePageMeta";

const AcornPropertyGroup = () => {
  usePageMeta(
    "Acorn Property Group Social Growth Case Study",
    "How Silo strengthened Acorn’s digital presence through strategy, content, community management and influencer campaigns, driving sustained multi platform growth."
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
        "Building a connected digital presence for a thoughtful and distinctive housebuilder",
      description: [
        "Acorn Property Group is a leading independent housebuilder with more than 30 years of experience creating distinctive homes across the South West. Their ethos of thoughtful, sustainable design sets them apart, and they wanted their digital presence to reflect the same craftsmanship and care.",
      ],
    },
    stats: {
      title: "Key highlights include:",
      column1: {
        heading: "Increase in reach on Instagram",
        value: "66%",
        description:
          "Individual months saw uplift of 66%+ following our revised content strategy.",
      },
      column2: {
        image: {
          src: "https://images.prismic.io/silosite/aVUgi3NYClf9otsC_v1765999915_3_ql2bkh.png?auto=format,compress",
          alt: "Traffic growth analytics",
        },
        stat: {
          heading: "Increase in engagement on Instagram",
          value: "51%",
          description:
            "Engagement increased by more than 51% during periods of increased reel output and influencer activity.",
        },
      },
      column3: {
        stat: {
          heading: "Increase in LinkedIn impressions",
          value: "105%",
          description:
            " Certain months saw impressions rising by more than 105% during key periods of activity.",
          // per-page stat card height for column3
          heightClass: "min-h-[20rem] md:min-h-[36rem] lg:min-h-[22rem]",
        },
        image: {
          src: "https://images.prismic.io/silosite/aVUgjHNYClf9otsD_v1766000003_4_frrh5j.png?auto=format,compress",
          alt: "Lead generation metrics",
          // per-page image height for column3
          heightClass: "h-[20rem] md:h-[36rem] lg:h-[19rem]",
        },
      },
    },
    fullScreenImage: {
      src: null,
      alt: "Content marketing campaign showcase",
    },
    galleryWithText: {
      heading: "The solution: a full spectrum social partnership",
      text: [
        <>
          Silo partnered with Acorn to elevate their social presence and
          streamline digital communication.{" "}
          <span className="font-bold">Our work includes:</span>
          <ul className="list-disc ml-6 py-4 space-y-3 font-semibold">
            <li>
              Quarterly social strategy setting clear performance goals and
              priorities
            </li>
            <li>
              Full social media management including Instagram, LinkedIn,
              Facebook and X
            </li>
            <li>
              Community management to strengthen relationships and improve
              responsiveness
            </li>
            <li>
              Influencer campaigns including The Devon Good Life, The Devon
              Fairy and collaborations with The Outdoor Guide
            </li>
            <li>
              Video production and editing in partnership with Acorn’s in house
              team
            </li>
            <li>Graphic design supporting brand cohesion and campaign needs</li>
          </ul>
          Every output is designed to showcase Acorn’s values, locations and
          developments with clarity and warmth
        </>,
      ],
      images: [
        {
          src: "https://images.prismic.io/silosite/aVUgiXNYClf9otsA_v1765999906_1_jdzdnt.png?auto=format,compress",
          alt: "Blog article layout",
        },
        {
          src: "https://images.prismic.io/silosite/aVUginNYClf9otsB_v1765999914_2_gft8ro.png?auto=format,compress",
          alt: "Lead magnet design",
        },
      ],
    },
    galleryWithText2: {
      heading: "Performance that reflects a stronger, clearer digital presence",
      text: [
        <>
          <div className="flex flex-col">
            <span className="font-semibold">
              Acorn Property Group has achieved consistent, meaningful growth
              across Instagram and LinkedIn since partnering with Silo. Across
              followers, reach, impressions, engagements and overall visibility,
              performance has improved year on year on both platforms.
            </span>
            <br />
            <span className="font-semibold">
              Combined follower growth across Instagram and LinkedIn has
              increased by <span className="font-bold">6,295 followers,</span>{" "}
              alongside additional audience growth across Facebook and X as
              those channels have also been developed
            </span>
            <br />
            <span className="font-bold">Key highlights include:</span>
            <ul className="list-disc ml-6 py-4 space-y-3 font-semibold">
              <li>
                A notable increase in reach on Instagram, with individual months
                seeing uplift of <span className="font-bold">60%+</span>{" "}
                following our revised content strategy.
              </li>
              <li>
                A significant jump in engagement on Instagram, with improvements
                exceeding <span className="font-bold">50%</span> during periods
                of increased reel output and influencer activity.
              </li>
              <li>
                Strong performance from influencer led content on Instagram,
                with reels achieving{" "}
                <span className="font-bold">17,000–25,000+ views</span> and
                generating high interaction rates.
              </li>
              <li>
                Marked improvements on LinkedIn, with certain months showing
                engagement rate increases of{" "}
                <span className="font-bold">100%+</span>, and impressions rising
                by more than <span className="font-bold">100%</span> during key
                periods of activity.
              </li>
              <li>
                Establishment as a thought leader in the property and
                development sector through consistent, value led posting.
              </li>
            </ul>
            Continued organic follower growth on both Instagram and LinkedIn,
            driven by consistent content quality, strategic posting schedules
            and quarterly goal setting.
          </div>
        </>,
      ],
      images: [
        {
          src: "https://images.prismic.io/silosite/aVUgjXNYClf9otsE_v1766000014_5_dgtzhu.png?auto=format,compress",
          alt: "Blog article layout",
        },
        {
          src: "https://images.prismic.io/silosite/aVUgjnNYClf9otsF_v1766000121_6_g5xb2h.png?auto=format,compress",
          alt: "Lead magnet design",
        },
        {
          src: "https://images.prismic.io/silosite/aVUgj3NYClf9otsG_v1766000770_7_ns0enq.png?auto=format,compress",
          alt: "Lead magnet design",
        },
      ],
    },
    simpleHeadingText: {
      heading: "A data-driven approach to content creation",
      text: [
        "Every piece of content was informed by keyword research, competitor analysis, and customer interviews. We identified content gaps in their industry and created comprehensive resources that now rank on page one for dozens of high-value keywords.",
        "The content strategy included blog posts, whitepapers, webinars, and email nurture sequences. We tracked every metric, continuously optimized based on performance data, and doubled down on what worked. The result is a sustainable lead generation engine that keeps delivering.",
      ],
    },
    fourGallery: {
      images: [
        { src: null, alt: "Content calendar" },
        { src: null, alt: "SEO performance" },
        { src: null, alt: "Lead magnet library" },
        { src: null, alt: "Email campaign results" },
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
          src="https://images.prismic.io/silosite/aVUge3NYClf9otry_v1765966918_Placeholder_Lightbox_uxp28m.png?auto=format,compress"
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
        mediaType="image"
        mediaSrc="https://images.prismic.io/silosite/aVUgiHNYClf9otr__v1765999896_0_lzwkcq.png?auto=format,compress"
      />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          The challenge: translating a respected offline reputation into a
          coherent digital identity
        </h2>
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            Despite a strong offline reputation, Acorn’s digital channels were
            not reflecting the strength of the brand. Their content was
            inconsistent, community engagement was underdeveloped and their
            influencer activity had untapped potential. Acorn needed a cohesive
            social strategy, higher quality content output and a clearer digital
            identity.
          </p>
        </div>
      </div>

      <GalleryWithText
        heading={caseStudy.galleryWithText.heading}
        text={caseStudy.galleryWithText.text}
        images={caseStudy.galleryWithText.images}
      />

      <StatsSection
        title={caseStudy.stats.title}
        column1={caseStudy.stats.column1}
        column2={caseStudy.stats.column2}
        column3={caseStudy.stats.column3}
      />
      {/* <FullScreenImage
        src={caseStudy.fullScreenImage.src}
        alt={caseStudy.fullScreenImage.alt}
      /> */}
      <GalleryWithText
        heading={caseStudy.galleryWithText2.heading}
        text={caseStudy.galleryWithText2.text}
        images={caseStudy.galleryWithText2.images}
      />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          The outcome: a confident and growing multi platform presence
        </h2>
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            Acorn’s digital identity now mirrors the craftsmanship and care that
            define their developments. Their presence is clearer, stronger and
            more engaging — supported by ongoing optimisation, strategic content
            planning and a partnership built to support long term growth.
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

export default AcornPropertyGroup;
