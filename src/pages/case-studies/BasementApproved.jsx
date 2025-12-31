import React, { useRef, useEffect } from "react";
import TitleWithDescription from "../../components/poststudy/TitleWithDescription";
import StatsSection from "../../components/poststudy/StatsSection";
import FullScreenImage from "../../components/poststudy/FullScreenImage";
import GalleryWithText from "../../components/poststudy/GalleryWithText";
import SimpleHeadingText from "../../components/poststudy/SimpleHeadingText";
import FourGallery from "../../components/poststudy/FourGallery";
import Section from "../../components/Home/Section";
import { usePageMeta } from "../../hooks/usePageMeta";

const BasementApproved = () => {
  usePageMeta(
    "BasementApproved Web Development Case Study",
    "See how Silo rebuilt BasementApproved’s website with a modern design system and an automated Mixcloud powered Mixes hub for a community of 340,000+."
  );

  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const caseStudy = {
    titleSection: {
      title:
        "Rebuilding a culture platform for a modern, music driven audience",
      description: [
        "BasementApproved began as a Facebook Group in 2013 and has since grown into a major digital publishing platform covering culture, music, fashion and lifestyle. With a following of over 340,000 across social media, the brand has built a loyal community over more than a decade. As the platform expanded, BasementApproved needed a modern website that could showcase both editorial content and the DJ community that sits at the heart of their culture.",
      ],
    },
    stats: {
      title: "Key highlights include:",
      column1: {
        heading: "Unified Experience",
        value: (
          <>
            One
            <br />
            <span className="text-[0.8em]">Platform</span>
          </>
        ),
        description:
          "A fully rebuilt website that unifies music, culture and editorial content.",
      },
      column2: {
        image: {
          src: "https://images.prismic.io/silosite/aVUgfHNYClf9otrz_v1765974657_1_ppkdip.png?auto=format,compress",
          alt: "Automated mixes hub",
        },
        stat: {
          heading: "Automated mixes hub",
          value: (
            <>
              <span className="text-[0.8em]">Mixcloud</span>
              <br />
              <span className="text-[0.8em]">API</span>
            </>
          ),
          description:
            "Introduction of an automated Mixes hub powered by the Mixcloud API.",
        },
      },
      column3: {
        stat: {
          heading: "Dynamic mix publishing",
          value: (
            <>
              <span className="text-[0.7em]">Auto</span>
              <br />
              <span className="text-[0.7em]">Updating</span>
            </>
          ),
          description:
            "Dynamic mix pages that update automatically as new content is published.",
        },
        image: {
          src: "https://images.prismic.io/silosite/aVUgfXNYClf9otr0_v1765974659_Placeholder_Image_hkr78c.png?auto=format,compress",
          alt: "Dynamic mix publishing",
        },
      },
    },
    fullScreenImage: {
      src: "https://images.prismic.io/silosite/aVUgfXNYClf9otr0_v1765974659_Placeholder_Image_hkr78c.png?auto=format,compress",
      alt: "Performance and UX",
    },
    galleryWithText: {
      heading: "Delivering a modern, scalable digital platform",
      content: [
        {
          subheading:
            "Silo rebuilt the platform from the ground up, delivering a modern, scalable digital experience:",
        },
        {
          subheading: "Website Design and Development",
          text: "We translated the new design system into a fully responsive site, aligning pages, layout and structure with the updated brand identity",
        },
        {
          subheading: "Automated Mixes Hub",
          text: "A new Mixes section was created and powered through Mixcloud integration, automatically pulling mixes, artwork and metadata directly into the site.",
        },
        {
          subheading: "Dynamic Mix Pages",
          text: "Individual mix pages now generate automatically, each featuring artwork, track details and a fully responsive embedded Mixcloud player.",
        },
        {
          subheading: "Performance and UX",
          text: "We implemented secure, sanitised embed handling, lazy loading and fixed ratio wrappers to ensure smooth playback and stable layouts across devices.",
        },
        {
          subheading: "Testing and Launch",
          text: "Extensive testing across mobile, desktop and major browsers ensured performance, consistency and playback reliability before launch",
        },
        {
          text: "The end result is a clean, modern platform that reflects the brands evolution and strengthens the experience for music audiences and editorial readers alike.",
        },
      ],
      images: [
        {
          src: "https://images.prismic.io/silosite/aVUgd3NYClf9otru_v1765966109_Placeholder_Image_mjkpxt.png?auto=format,compress",
          alt: "Mobile product page",
        },
        {
          src: "https://images.prismic.io/silosite/aVUgcXNYClf9otrr_v1765966100_1_vr8zdp.png?auto=format,compress",
          alt: "Checkout flow",
        },
        {
          src: "https://images.prismic.io/silosite/aVUgc3NYClf9otrs_v1765966101_2_jvmbtg.png?auto=format,compress",
          alt: "Product gallery",
        },
      ],
    },
    simpleHeadingText: {
      heading: "Built for performance and automation",
      text: [
        "Behind the refreshed design sits a robust technical foundation. The Mixcloud API integration handles all the heavy lifting, automatically pulling new mixes, artwork and metadata as soon as they're published. No manual uploading required.",
        "Lazy loading, optimised embeds and responsive layouts ensure the platform performs smoothly whether users are browsing articles or streaming hour-long DJ sets. The architecture is built to scale as the community continues to grow.",
      ],
    },
    fourGallery: {
      images: [
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966102/3_ycjv6o.png",
          alt: "Homepage design",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966103/4_ycjv6o.png",
          alt: "Mixes hub",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966104/5_ycjv6o.png",
          alt: "Mix player page",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966105/6_ycjv6o.png",
          alt: "Article layout",
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
          src="https://images.prismic.io/silosite/aVUgdnNYClf9otrt_v1765966107_image_14_jsndeb.png?auto=format,compress"
          alt="img"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <TitleWithDescription
        title={caseStudy.titleSection.title}
        description={caseStudy.titleSection.description}
        minHeightClass="min-h-[300px] md:min-h-[280px]"
        leftWidthClass="md:w-[55%] lg:w-[58%] xl:w-[60%]"
        rightWidthClass="md:w-[42%] lg:w-[38%] xl:w-[36%]"
        mediaType="iframe"
        mediaSrc="https://player.vimeo.com/video/1148605654?badge=0&autopause=0&player_id=0&app_id=58479"
        mediaCover="https://images.prismic.io/silosite/aVUgkXNYClf9otsI_v1766006438_Placeholder_Lightbox_kgs8zx.png?auto=format,compress"
      />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          Understanding the challenge
        </h2>
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            Although the brand had strong recognition and a large social
            audience, the website lagged behind the needs of the community. It
            supported only standard articles, offered no way to display or play
            DJ mixes, and did not reflect the updated visual identity.
            BasementApproved needed a complete redesign and a robust Mixes
            system that could automatically pull content from Mixcloud without
            manual uploading.
          </p>
          <p>
            BasementApproved also needed a smoother user experience, clearer
            structure and a platform that could scale with future content
            formats.
          </p>
        </div>
      </div>

      <GalleryWithText
        heading={caseStudy.galleryWithText.heading}
        content={caseStudy.galleryWithText.content}
        images={caseStudy.galleryWithText.images}
        itemSpacing="mb-12 md:mb-8"
      />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          A cohesive digital home for music and culture
        </h2>
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            The rebuilt platform now serves as a true digital home for the
            BasementApproved community. Editorial content, DJ mixes and cultural
            coverage all live under one roof, presented with a consistent visual
            language that reflects the brand's decade-long evolution. The Mixcloud
            integration means the Mixes hub stays fresh without manual intervention,
            while the responsive design ensures the experience feels native across
            all devices.
          </p>
        </div>
      </div>

      <StatsSection
        title={caseStudy.stats.title}
        column1={caseStudy.stats.column1}
        column2={caseStudy.stats.column2}
        column3={caseStudy.stats.column3}
      />
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          Strengthening the platform for a growing community
        </h2>
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            A significantly improved user experience with better structure and
            navigation.Stronger alignment between the website and
            BasementApproved’s long established social presence.
          </p>
          <p>
            A digital platform that now reflects the scale and influence of a
            brand with over 340,000 followers.
          </p>
        </div>
      </div>

      <Section />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
};

export default BasementApproved;
