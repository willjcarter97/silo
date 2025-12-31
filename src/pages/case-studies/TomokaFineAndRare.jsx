import React, { useRef, useEffect } from "react";
import TitleWithDescription from "../../components/poststudy/TitleWithDescription";
import StatsSection from "../../components/poststudy/StatsSection";
import FullScreenImage from "../../components/poststudy/FullScreenImage";
import GalleryWithText from "../../components/poststudy/GalleryWithText";
import SimpleHeadingText from "../../components/poststudy/SimpleHeadingText";
import FourGallery from "../../components/poststudy/FourGallery";
import Section from "../../components/Home/Section";
import { usePageMeta } from "../../hooks/usePageMeta";

const TomokaFineAndRare = () => {
  usePageMeta(
    "Tomoka Fine and Rare Digital Transformation Case Study",
    "Discover how Silo transformed Tomoka Fine and Rare with a premium website, social strategy, video, PR and CRM improvements for a modern, luxury digital presence."
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
      title: "Modernising a heritage whisky brand without losing its soul.",
      description: [
        "From website design and build to video editing, social management, design and PR - we transformed Tomoka’s digital presence into something as premium as their product.",
      ],
    },
    stats: {
      title: "Key highlights include:",
      column1: {
        heading: "Increase in reach on Instagram",
        value: "60%",
        description:
          "A notable uplift, with individual months seeing rises of 60%+ after we introduced a revised content strategy.",
      },
      column2: {
        image: {
          src: "https://images.prismic.io/silosite/aVUggnNYClf9otr5_v1765993902_5_t3nbsb.png?auto=format,compress",
          alt: "Social media engagement metrics",
        },
        stat: {
          heading: "Improved engagement across platforms",
          value: "30%",
          description:
            "Consistent month on month improvement in comments, saves and video interactions.",
        },
      },
      column3: {
        stat: {
          heading: "Growth in total audience",
          value: "30%",
          description:
            "Total following increased to 4,614, driven by stronger content performance and frequent touchpoints.",
        },
        image: {
          src: "https://images.prismic.io/silosite/aVUgg3NYClf9otr6_v1765993910_6_g2tlvw.png?auto=format,compress",
          alt: "Brand awareness graph",
        },
      },
    },
    fullScreenImage: {
      src: "https://images.prismic.io/silosite/aVUggXNYClf9otr4_v1765993472_4_utt15m.png?auto=format,compress",
      alt: "Brand refresh campaign showcase",
    },
    galleryWithText: {
      heading: "Modernising without losing authenticity",
      text: [
        "Tomoka’s digital ecosystem was fragmented: an outdated website, inconsistent social presence, and marketing materials that didn’t match the brand’s craftsmanship.",
        "Across design, development, content and operations, Silo built a unified, premium identity, including a new ecommerce-enabled website, elevated video storytelling, cohesive social presence, refined investment documents, automated email flows and a fully optimised CRM.",
        "Each deliverable was crafted to protect the brand’s heritage while enabling modern scalability.",
      ],
      images: [
        {
          src: "https://images.prismic.io/silosite/aVUgSXNYClf9otrP_v1765884632_Tomoko-e10fd11f_2_jto3ax.png?auto=format,compress",
          alt: "Logo variations",
          className: "w-auto h-[30rem] -translate-y-20 object-contain",
        },
        {
          src: "https://images.prismic.io/silosite/aVUggHNYClf9otr3_v1765993472_2_lsyq8s.png?auto=format,compress",
          alt: "Brand guidelines",
        },
        {
          src: "https://images.prismic.io/silosite/aVUgf3NYClf9otr2_v1765993466_3_tw2zun.png?auto=format,compress",
          alt: "Marketing materials",
        },
      ],
    },
    galleryWithText2: {
      heading: "A premium digital identity worthy of a heritage brand",
      text: [
        "Tomoka now benefits from a refined, modern digital presence with stronger client engagement, improved CRM workflows, increased visibility across major media titles and significantly elevated content performance, including over 30,000 combined video views across key assets.",
        "The brand is now positioned as a leader in the luxury spirits and investment space both online and off.",
      ],
      images: [
        {
          src: "https://images.prismic.io/silosite/aVUghHNYClf9otr7_v1765993948_7_uzdbwv.png?auto=format,compress",
          alt: "Gallery 2 image 1",
        },
        {
          src: "https://images.prismic.io/silosite/aVUghXNYClf9otr8_v1765994099_8_hik3c9.png?auto=format,compress",
          alt: "Gallery 2 image 2",
        },
      ],
    },
    simpleHeadingText: {
      heading: "More than just a pretty face",
      text: [
        "The rebrand wasn't just about aesthetics. We conducted extensive market research, competitor analysis, and stakeholder interviews to ensure the new brand positioning resonated with their target audience.",
        "The messaging framework we developed gave TechStart a clear, compelling voice that differentiates them in a crowded market. Every piece of content now reinforces their position as innovative problem-solvers who put customers first.",
      ],
    },
    fourGallery: {
      images: [
        { src: null, alt: "Brand launch event" },
        { src: null, alt: "Social media campaign" },
        { src: null, alt: "Website redesign" },
        { src: null, alt: "Print collateral" },
      ],
    },
  };

  return (
    <div className="w-full h-auto bg-white mb-5 md:mb-20">
      {/* Inline Hero Section */}
      <div className="relative w-full h-[50vh] md:h-auto md:aspect-video overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/di9tb45rl/video/upload/v1766430730/Website_Video_1_pxleqo.mp4"
          loop
          muted
          autoPlay
          playsInline
        />
      </div>

      <TitleWithDescription
        title={caseStudy.titleSection.title}
        description={caseStudy.titleSection.description}
        minHeightClass="min-h-[300px] md:min-h-[200px]"
        leftWidthClass="md:w-[55%] lg:w-[58%] xl:w-[60%]"
        rightWidthClass="md:w-[42%] lg:w-[38%] xl:w-[36%]"
        mediaType="image"
        mediaSrc="https://images.prismic.io/silosite/aVUgfnNYClf9otr1_v1765993464_1_fy5lxs.png?auto=format,compress"
        /*
        mediaType="video"
        mediaSrc="https://player.vimeo.com/video/76979871?autoplay=1&muted=1&background=0&controls=0"
        */
      />

      <GalleryWithText
        heading={caseStudy.galleryWithText.heading}
        text={caseStudy.galleryWithText.text}
        images={caseStudy.galleryWithText.images}
      />
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          Full-service digital and creative transformation
        </h2>
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <ul className="list-disc space-y-3">
            <li>
              <span className="font-bold">Website Design & Build:</span> A
              premium, modern site with e-commerce functionality, showcasing
              heritage, collections and investment expertise.
            </li>
            <li>
              <span className="font-bold">Video Production & Editing:</span>{" "}
              High-quality feature content and storytelling optimised for
              multiple platforms.
            </li>
            <li>
              <span className="font-bold">Social Media Management:</span>{" "}
              Strategy, creation and community building to grow engagement and
              awareness
            </li>
            <li>
              <span className="font-bold">Email Marketing:</span> Campaigns and
              automated flows to nurture collectors and leads.
            </li>
            <li>
              <span className="font-bold">Graphic & Document Design:</span>{" "}
              Polished investment brochures and branded materials.
            </li>
            <li>
              <span className="font-bold">HubSpot CRM:</span> Complete setup,
              optimisation and ongoing support.
            </li>
            <li>
              <span className="font-bold">PPC (via partner agency):</span> Paid
              media aligned to brand messaging and powered by Silo creative.
            </li>
            <li>
              <span className="font-bold">PR Consultancy: </span> Press coverage
              in The Times, City AM, Scan Magazine, Business Reporter and The
              Independent.
            </li>
          </ul>
        </div>
      </div>

      <FullScreenImage
        src={caseStudy.fullScreenImage.src}
        alt={caseStudy.fullScreenImage.alt}
      />

      <StatsSection
        title={caseStudy.stats.title}
        column1={caseStudy.stats.column1}
        column2={caseStudy.stats.column2}
        column3={caseStudy.stats.column3}
      />

      <GalleryWithText
        heading={caseStudy.galleryWithText2.heading}
        text={caseStudy.galleryWithText2.text}
        images={caseStudy.galleryWithText2.images}
      />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
          If your heritage brand needs a modern digital presence
        </h2>
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
          <p>
            Silo helps legacy brands elevate every touchpoint without
            sacrificing identity. Reach out to begin your digital
            transformation.
          </p>
        </div>
      </div>

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

export default TomokaFineAndRare;
