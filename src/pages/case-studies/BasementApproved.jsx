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
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765974657/1_ppkdip.png",
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
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765974659/Placeholder_Image_hkr78c.png",
          alt: "Dynamic mix publishing",
        },
      },
    },
    fullScreenImage: {
      src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765974659/Placeholder_Image_hkr78c.png",
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
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966109/Placeholder_Image_mjkpxt.png",
          alt: "Mobile product page",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966100/1_vr8zdp.png",
          alt: "Checkout flow",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966101/2_jvmbtg.png",
          alt: "Product gallery",
        },
      ],
    },
    simpleHeadingText: {
      heading: "A platform built for scale and speed",
      text: [
        "Behind the beautiful interface lies a robust technical foundation. We implemented a headless commerce architecture, allowing for blazing-fast page loads and seamless integration with their existing inventory management system.",
        "The platform now handles 10x the traffic during peak sales periods without breaking a sweat. Real-time inventory updates, personalized product recommendations, and a sophisticated search algorithm all work together to create an experience that keeps customers coming back.",
      ],
    },
    fourGallery: {
      images: [
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966102/3_ycjv6o.png",
          alt: "Homepage hero",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966103/4_ycjv6o.png",
          alt: "Category page",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966104/5_ycjv6o.png",
          alt: "Product detail",
        },
        {
          src: "https://res.cloudinary.com/di9tb45rl/image/upload/v1765966105/6_ycjv6o.png",
          alt: "Shopping cart",
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
          src="https://res.cloudinary.com/di9tb45rl/image/upload/v1765966107/image_14_jsndeb.png"
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
        mediaCover="https://res.cloudinary.com/di9tb45rl/image/upload/v1766006438/Placeholder_Lightbox_kgs8zx.png"
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
