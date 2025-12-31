import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../prismicio";
import { usePageMeta } from "../hooks/usePageMeta";

// Import existing case study components (for hardcoded fallbacks)
import BasementApproved from "./case-studies/BasementApproved";
import TomokaFineAndRare from "./case-studies/TomokaFineAndRare";
import ElectrolytesWithJoly from "./case-studies/ElectrolytesWithJoly";
import AcornPropertyGroup from "./case-studies/AcornPropertyGroup";
import Cluberly from "./case-studies/Cluberly";
import KnightsgatePartners from "./case-studies/KnightsgatePartners";

// Import the actual styled components from poststudy
import TitleWithDescription from "../components/poststudy/TitleWithDescription";
import StatsSection from "../components/poststudy/StatsSection";
import GalleryWithText from "../components/poststudy/GalleryWithText";
import FullScreenImage from "../components/poststudy/FullScreenImage";
import Section from "../components/Home/Section";

// Map of UIDs to their hardcoded components
const HARDCODED_CASE_STUDIES = {
  "basement-approved": BasementApproved,
  "tomoka-fine-and-rare": TomokaFineAndRare,
  "electrolytes-with-joly": ElectrolytesWithJoly,
  "acorn-property-group": AcornPropertyGroup,
  "cluberly": Cluberly,
  "knightsgate-partners": KnightsgatePartners,
};

// Helper to extract plain text from Prismic Rich Text
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  return richTextField.map((block) => block.text || "").join(" ");
};

// Helper to convert Prismic Rich Text to array of strings (for components that expect string arrays)
const richTextToArray = (richTextField) => {
  if (!richTextField) return [];
  if (typeof richTextField === "string") return [richTextField];
  return richTextField
    .filter((block) => block.type === "paragraph" && block.text)
    .map((block) => block.text);
};

// Slice renderer - uses the REAL styled components
const renderSlice = (slice, index) => {
  switch (slice.slice_type) {
    case "title_with_description":
      return (
        <TitleWithDescription
          key={index}
          title={slice.primary?.section_title}
          description={richTextToArray(slice.primary?.section_description)}
          mediaType={slice.primary?.media_type || "none"}
          mediaSrc={
            slice.primary?.media_type === "image"
              ? slice.primary?.media_image?.url
              : slice.primary?.media_video_url
          }
          mediaCover={slice.primary?.media_cover_image?.url}
        />
      );

    case "two_column_text":
      // Two column text section (heading left, content right)
      return (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20"
        >
          <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
            {slice.primary?.heading}
          </h2>
          <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
            {richTextToArray(slice.primary?.content).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      );

    case "gallery_with_text":
      return (
        <GalleryWithText
          key={index}
          heading={slice.primary?.heading}
          text={richTextToArray(slice.primary?.text_content)}
          images={
            slice.items?.map((item) => ({
              src: item.gallery_image?.url,
              alt: item.gallery_image?.alt || "Gallery image",
            })) || []
          }
        />
      );

    case "stats_section":
      return (
        <StatsSection
          key={index}
          title={slice.primary?.stats_title}
          column1={{
            heading: slice.primary?.stat1_heading,
            value: slice.primary?.stat1_value,
            description: slice.primary?.stat1_description,
          }}
          column2={{
            image: {
              src: slice.primary?.stat2_image?.url,
              alt: slice.primary?.stat2_image?.alt || "Stats image",
            },
            stat: {
              heading: slice.primary?.stat2_heading,
              value: slice.primary?.stat2_value,
              description: slice.primary?.stat2_description,
            },
          }}
          column3={{
            stat: {
              heading: slice.primary?.stat3_heading,
              value: slice.primary?.stat3_value,
              description: slice.primary?.stat3_description,
            },
            image: {
              src: slice.primary?.stat3_image?.url,
              alt: slice.primary?.stat3_image?.alt || "Stats image",
            },
          }}
        />
      );

    case "full_screen_image":
      return (
        <FullScreenImage
          key={index}
          src={slice.primary?.image?.url}
          alt={slice.primary?.alt_text || "Full screen image"}
        />
      );

    default:
      console.log("Unknown slice type:", slice.slice_type);
      return null;
  }
};

// Dynamic Prismic Case Study Component
const PrismicCaseStudy = ({ caseStudy }) => {
  const videoRef = useRef(null);
  const data = caseStudy.data;
  const heroType = data.hero_type || "image";
  const heroImage = data.hero_image?.url;
  const heroVideo = data.hero_video?.url;
  const heroVideoUrl = data.hero_video_url;
  const slices = data.body || [];

  // Auto-play video if present
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="w-full h-auto bg-white mb-5 md:mb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-auto md:aspect-video overflow-hidden">
        {heroType === "video" && (heroVideo || heroVideoUrl) ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={heroVideo || heroVideoUrl}
            loop
            muted
            autoPlay
            playsInline
          />
        ) : heroImage ? (
          <img
            src={heroImage}
            alt={data.title || "Case study hero"}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No hero image</span>
          </div>
        )}
      </div>

      {/* Render all slices using the proper styled components */}
      {slices.map((slice, index) => renderSlice(slice, index))}

      {/* CTA Section */}
      <Section />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
};

const PostCaseStudy = () => {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useHardcoded, setUseHardcoded] = useState(false);

  // Check if this is a hardcoded case study
  const HardcodedComponent = HARDCODED_CASE_STUDIES[id];

  // Fetch case study from Prismic
  useEffect(() => {
    async function fetchCaseStudy() {
      // If we have a hardcoded component, use that instead
      if (HardcodedComponent) {
        setUseHardcoded(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const study = await client.getByUID("case_study", id);
        setCaseStudy(study);
        setError(null);
      } catch (err) {
        console.error("Error fetching case study:", err);
        setError("Case study not found");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchCaseStudy();
    }
  }, [id, HardcodedComponent]);

  // Set page meta for Prismic case studies
  usePageMeta(
    caseStudy?.data?.meta_title || caseStudy?.data?.title || "Case Study",
    caseStudy?.data?.meta_description ||
      asText(caseStudy?.data?.description) ||
      "View our case study"
  );

  // If loading
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  // If this is a hardcoded case study, render it directly
  if (useHardcoded && HardcodedComponent) {
    return <HardcodedComponent />;
  }

  // If error or not found
  if (error || !caseStudy) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-[1280px] px-6 md:px-0 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">
              Case Study Not Found
            </h1>
            <p className="text-black mb-8">
              The case study you're looking for doesn't exist.
            </p>
            <Link
              to="/case-studies"
              className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              ← Back to Case Studies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Prismic case study with the proper styled components
  return <PrismicCaseStudy caseStudy={caseStudy} />;
};

export default PostCaseStudy;
