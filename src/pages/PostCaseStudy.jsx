import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../prismicio";
import { PrismicRichText } from "@prismicio/react";
import { usePageMeta } from "../hooks/usePageMeta";

// Import the actual existing components
import TitleWithDescription from "../components/poststudy/TitleWithDescription";
import StatsSection from "../components/poststudy/StatsSection";
import FullScreenImage from "../components/poststudy/FullScreenImage";
import GalleryWithText from "../components/poststudy/GalleryWithText";
import SimpleHeadingText from "../components/poststudy/SimpleHeadingText";
import FourGallery from "../components/poststudy/FourGallery";
import Section from "../components/Home/Section";

// Helper to extract plain text from Prismic Rich Text
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  return richTextField.map((block) => block.text || "").join(" ");
};

// Rich text components for two-column sections
const richTextComponents = {
  paragraph: ({ children }) => (
    <p className="text-base md:text-lg text-black leading-relaxed mb-4 last:mb-0">{children}</p>
  ),
  list: ({ children }) => (
    <ul className="list-disc ml-6 mb-4 space-y-3">{children}</ul>
  ),
  oList: ({ children }) => (
    <ol className="list-decimal ml-6 mb-4 space-y-3">{children}</ol>
  ),
  listItem: ({ children }) => (
    <li className="text-base md:text-lg text-black leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => <span className="font-bold">{children}</span>,
  em: ({ children }) => <em className="italic">{children}</em>,
};

// Slice renderer - uses the ACTUAL existing components
const renderSlice = (slice, index) => {
  switch (slice.slice_type) {
    case "title_with_description": {
      // Transform Prismic data to match TitleWithDescription props
      const title = slice.primary?.section_title || "";
      const description = slice.primary?.section_description 
        ? slice.primary.section_description.map(block => block.text).filter(Boolean)
        : [];
      const mediaType = slice.primary?.media_type || "none";
      const mediaSrc = mediaType === "image" 
        ? slice.primary?.media_image?.url 
        : slice.primary?.media_video_url || "";
      const mediaCover = slice.primary?.media_cover_image?.url || null;
      
      return (
        <TitleWithDescription
          key={index}
          title={title}
          description={description}
          mediaType={mediaType}
          mediaSrc={mediaSrc}
          mediaCover={mediaCover}
          minHeightClass="min-h-[300px] md:min-h-[250px]"
          leftWidthClass="md:w-[55%] lg:w-[58%] xl:w-[60%]"
          rightWidthClass="md:w-[42%] lg:w-[38%] xl:w-[36%]"
        />
      );
    }

    case "two_column_text": {
      // Inline two-column text section (heading left, content right)
      return (
        <div key={index} className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
          <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue w-full md:w-1/2">
            {slice.primary?.heading}
          </h2>
          <div className="flex flex-col w-full md:w-1/2 gap-6 justify-between items-start text-left font-epilogue text-base md:text-lg">
            <PrismicRichText 
              field={slice.primary?.content} 
              components={richTextComponents} 
            />
          </div>
        </div>
      );
    }

    case "gallery_with_text": {
      // Transform Prismic data to match GalleryWithText props
      const heading = slice.primary?.heading || "";
      const textContent = slice.primary?.text_content 
        ? slice.primary.text_content.map(block => block.text).filter(Boolean)
        : [];
      const images = (slice.items || [])
        .filter(item => item.gallery_image?.url)
        .map(item => ({
          src: item.gallery_image.url,
          alt: item.gallery_image.alt || "Gallery image",
        }));
      
      return (
        <GalleryWithText
          key={index}
          heading={heading}
          text={textContent}
          images={images}
        />
      );
    }

    case "stats_section": {
      // Transform Prismic data to match StatsSection props
      const statsData = {
        title: slice.primary?.stats_title || "",
        column1: {
          heading: slice.primary?.stat1_heading || "",
          value: slice.primary?.stat1_value || "",
          description: slice.primary?.stat1_description || "",
        },
        column2: {
          image: {
            src: slice.primary?.stat2_image?.url || null,
            alt: slice.primary?.stat2_image?.alt || "Stats image",
          },
          stat: {
            heading: slice.primary?.stat2_heading || "",
            value: slice.primary?.stat2_value || "",
            description: slice.primary?.stat2_description || "",
          },
        },
        column3: {
          stat: {
            heading: slice.primary?.stat3_heading || "",
            value: slice.primary?.stat3_value || "",
            description: slice.primary?.stat3_description || "",
          },
          image: {
            src: slice.primary?.stat3_image?.url || null,
            alt: slice.primary?.stat3_image?.alt || "Stats image",
          },
        },
      };
      
      return (
        <StatsSection
          key={index}
          title={statsData.title}
          column1={statsData.column1}
          column2={statsData.column2}
          column3={statsData.column3}
        />
      );
    }

    case "full_screen_image": {
      if (!slice.primary?.image?.url) return null;
      return (
        <FullScreenImage
          key={index}
          src={slice.primary.image.url}
          alt={slice.primary.alt_text || "Full screen image"}
        />
      );
    }

    case "simple_heading_text": {
      const heading = slice.primary?.heading || "";
      const textContent = slice.primary?.text_content 
        ? slice.primary.text_content.map(block => block.text).filter(Boolean)
        : [];
      return (
        <SimpleHeadingText
          key={index}
          heading={heading}
          text={textContent}
        />
      );
    }

    case "four_gallery": {
      const images = (slice.items || [])
        .map(item => ({
          src: item.image?.url || null,
          alt: item.image?.alt || "Gallery image",
        }));
      return (
        <FourGallery
          key={index}
          images={images}
        />
      );
    }

    default:
      console.log("Unknown slice type:", slice.slice_type);
      return null;
  }
};

const PostCaseStudy = () => {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // Fetch case study from Prismic
  useEffect(() => {
    async function fetchCaseStudy() {
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
  }, [id]);

  // Auto-play video if present
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [caseStudy]);

  // Set page meta
  usePageMeta(
    caseStudy?.data?.meta_title || caseStudy?.data?.title || "Case Study",
    caseStudy?.data?.meta_description || asText(caseStudy?.data?.description) || "View our case study"
  );

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

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

  const data = caseStudy.data;
  const heroType = data.hero_type || "image";
  const heroImage = data.hero_image?.url;
  const heroVideo = data.hero_video?.url;
  const heroVideoUrl = data.hero_video_url;
  const slices = data.body || [];

  return (
    <div className="w-full h-auto bg-white mb-5 md:mb-20">
      {/* Hero Section - matches original case study hero structure */}
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

      {/* Render all slices using the ACTUAL existing components */}
      {slices.map((slice, index) => renderSlice(slice, index))}

      {/* CTA Section - same as original */}
      <Section />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
};

export default PostCaseStudy;
