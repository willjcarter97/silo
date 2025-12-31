import React, { useRef, useEffect } from "react";
import TitleWithDescription from "../../components/poststudy/TitleWithDescription";
import StatsSection from "../../components/poststudy/StatsSection";
import FullScreenImage from "../../components/poststudy/FullScreenImage";
import GalleryWithText from "../../components/poststudy/GalleryWithText";
import SimpleHeadingText from "../../components/poststudy/SimpleHeadingText";
import FourGallery from "../../components/poststudy/FourGallery";
import Section from "../../components/Home/Section";
import { usePageMeta } from "../../hooks/usePageMeta";

const KnightsgatePartners = () => {
  usePageMeta(
    "Modernising Knightsgate’s Brand Case Study",
    "How Silo transformed Knightsgate’s brand, with logo, website and investor communication documentation with cohesive design, strategic content and high impact digital execution."
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
      title: "Transforming Knightsgate’s brand and investor communications",
      description: [
        "Silo delivered a complete creative uplift across web brand and investor facing materials to help Knightsgate and its portfolio companies present their value with authority.",
      ],
    },
    titleSection2: {
      title: "Creative support that scales with demand",
      description: [
        "Across advisory investment and portfolio support Knightsgate required fast ongoing creative delivery and Silo provided exactly that. From websites to pitch decks email campaigns to webinars every asset was designed to enhance clarity and strengthen trust. The result is a flexible creative partnership that empowers Knightsgate and its clients to communicate value with greater authority.",
      ],
    },
    stats: {
      title: "Key highlights include:",
      column1: {
        heading: "Increase in investor engagement",
        value: "45%",
        description:
          "More structured communication and polished materials improved investor interactions.",
      },
      column2: {
        image: {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1766007854/6_nrfwcx.png",
          alt: "Social media analytics dashboard",
        },
        stat: {
          heading: "Improvement in brand consistency",
          value: "100%",
          description:
            "Unified design across Knightsgate and client brands strengthened credibility.",
        },
      },
      column3: {
        stat: {
          heading: "Increase in digital performance",
          value: "35%",
          description:
            "A modern high clarity website improved overall user experience and first impression value.",
        },
        image: {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1766007858/Placeholder_Image_qbtabg.png",
          alt: "Revenue attribution chart",
        },
      },
    },
    fullScreenImage: {
      src: null,
      alt: "Social media strategy showcase",
    },
    galleryWithText: {
      heading: "Elevating credibility across every touchpoint",
      text: [
        "Knightsgate Partners supports startups and scaling businesses with advisory and funding. But their previous brand design system and digital presence no longer reflected the calibre of their expertise. Client brands also struggled with investor ready materials making it difficult to communicate opportunities clearly and confidently.",
        "Silo rebuilt Knightsgate’s presence from the ground up a new website premium branded materials investor ready documentation polished webinars and consistent email communication. The result is a unified creative ecosystem that strengthens confidence among investors clients and partners",
      ],
      images: [
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1766007845/4_ab9ovu.png",
          alt: "Instagram feed design",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1766007850/5_oa8nyq.png",
          alt: "LinkedIn thought leadership",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1766007863/Screenshot_2025-12-18_023949_y4iwph.png",
          alt: "TikTok viral content",
        },
      ],
    },
    simpleHeadingText: {
      heading: "Strategy backed by data, powered by creativity",
      text: [
        "Every decision was informed by analytics. We A/B tested content formats, posting times, captions, and hashtag strategies. We monitored competitor activity, tracked trending topics, and jumped on relevant conversations at the perfect moment. The result was a feed that felt spontaneous but was actually meticulously planned.",
        "We didn't just post and ghost. We built a community by responding to every comment, engaging with followers' content, and creating opportunities for user-generated content. The social channels became a two-way conversation that strengthened customer relationships and turned followers into brand advocates.",
      ],
    },
    fourGallery: {
      images: [
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1766007845/4_ab9ovu.png",
          alt: "Instagram feed design",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1766007850/5_oa8nyq.png",
          alt: "LinkedIn thought leadership",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1766007863/Screenshot_2025-12-18_023949_y4iwph.png",
          alt: "TikTok viral content",
        },
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
          src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765966835/Placeholder_Lightbox_2_r3duh2.png"
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
        mediaType="none"
      />
      <GalleryWithText
        heading={caseStudy.galleryWithText.heading}
        text={caseStudy.galleryWithText.text}
        images={caseStudy.galleryWithText.images}
      />
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          A strategic creative overhaul
        </h2>
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            We redesigned Knightsgate’s website to deliver a sharp modern and
            authoritative digital presence. Alongside this Silo produced branded
            assets across Knightsgate and its clients including Flowery Itasca
            and Favela ensuring every brand presented itself with
            professionalism.
          </p>
          <p>
            Pitch decks investor reports and key documentation were rebuilt for
            clarity and impact. Investor webinars were launched and managed end
            to end supported by email marketing that kept Knightsgate’s network
            engaged with consistent high quality communication.
          </p>
        </div>
      </div>
      <StatsSection
        title={caseStudy.stats.title}
        column1={caseStudy.stats.column1}
        column2={caseStudy.stats.column2}
        column3={caseStudy.stats.column3}
      />
      <TitleWithDescription
        title={caseStudy.titleSection2.title}
        description={caseStudy.titleSection2.description}
        minHeightClass="min-h-[300px] md:min-h-[400px]"
        leftWidthClass="md:w-[55%] lg:w-[58%] xl:w-[60%]"
        rightWidthClass="md:w-[42%] lg:w-[38%] xl:w-[36%]"
        mediaType="none"
      />
      {/* <FullScreenImage
        src={caseStudy.fullScreenImage.src}
        alt={caseStudy.fullScreenImage.alt}
      /> */}
      {/* <SimpleHeadingText
        heading={caseStudy.simpleHeadingText.heading}
        text={caseStudy.simpleHeadingText.text}
      />
      <FourGallery images={caseStudy.fourGallery.images} /> */}
      <Section />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
};

export default KnightsgatePartners;
