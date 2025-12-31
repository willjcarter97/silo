import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../prismicio";
import { PrismicRichText } from "@prismicio/react";
import { usePageMeta } from "../hooks/usePageMeta";
import Section from "../components/Home/Section";

// Helper to extract plain text from Prismic Rich Text
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  return richTextField.map((block) => block.text || "").join(" ");
};

// Rich text components for styling
const richTextComponents = {
  paragraph: ({ children }) => (
    <p className="text-base md:text-lg text-black leading-relaxed mb-4">{children}</p>
  ),
  heading2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-bold text-black mb-4">{children}</h3>
  ),
  list: ({ children }) => (
    <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
  ),
  oList: ({ children }) => (
    <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
  ),
  listItem: ({ children }) => (
    <li className="text-base md:text-lg text-black leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
};

// Title with Description Slice Component
const TitleWithDescriptionSlice = ({ slice }) => {
  const [showVideo, setShowVideo] = useState(false);
  const mediaType = slice.primary?.media_type || "none";
  const mediaImage = slice.primary?.media_image?.url;
  const mediaVideoUrl = slice.primary?.media_video_url;
  const mediaCover = slice.primary?.media_cover_image?.url;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
      <div className="w-full md:w-[55%] lg:w-[58%] xl:w-[60%]">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue mb-6">
          {slice.primary?.section_title}
        </h2>
        <div className="text-left font-epilogue text-base md:text-lg">
          <PrismicRichText 
            field={slice.primary?.section_description} 
            components={richTextComponents} 
          />
        </div>
      </div>
      
      {mediaType !== "none" && (
        <div className="w-full md:w-[42%] lg:w-[38%] xl:w-[36%]">
          {mediaType === "image" && mediaImage && (
            <img 
              src={mediaImage} 
              alt="" 
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          )}
          {mediaType === "iframe" && mediaVideoUrl && (
            <div className="relative aspect-video cursor-pointer" onClick={() => setShowVideo(true)}>
              {!showVideo && mediaCover && (
                <img 
                  src={mediaCover} 
                  alt="Video cover" 
                  className="w-full h-full object-cover"
                />
              )}
              {showVideo && (
                <iframe
                  src={mediaVideoUrl}
                  className="w-full h-full absolute inset-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Two Column Text Slice Component
const TwoColumnTextSlice = ({ slice }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 lg:gap-20 w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
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
};

// Gallery with Text Slice Component
const GalleryWithTextSlice = ({ slice }) => {
  const images = slice.items || [];
  
  return (
    <div className="w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="w-full lg:w-1/2">
          <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold text-left font-epilogue mb-6">
            {slice.primary?.heading}
          </h2>
          <div className="text-left font-epilogue text-base md:text-lg">
            <PrismicRichText 
              field={slice.primary?.text_content} 
              components={richTextComponents} 
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {images.map((item, index) => (
            item.gallery_image?.url && (
              <img
                key={index}
                src={item.gallery_image.url}
                alt={item.gallery_image.alt || "Gallery image"}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

// Stats Section Slice Component
const StatsSectionSlice = ({ slice }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-0 py-12 md:py-20">
      <h3 className="text-xl font-bold text-black mb-8">
        {slice.primary?.stats_title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stat 1 */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-black font-semibold">{slice.primary?.stat1_heading}</p>
          <p className="text-6xl md:text-7xl font-bold text-black">{slice.primary?.stat1_value}</p>
          <p className="text-base text-black">{slice.primary?.stat1_description}</p>
        </div>
        
        {/* Stat 2 */}
        <div className="flex flex-col gap-4">
          {slice.primary?.stat2_image?.url && (
            <img 
              src={slice.primary.stat2_image.url} 
              alt="" 
              className="w-full h-48 object-cover mb-4"
              loading="lazy"
            />
          )}
          <p className="text-sm text-black font-semibold">{slice.primary?.stat2_heading}</p>
          <p className="text-6xl md:text-7xl font-bold text-black">{slice.primary?.stat2_value}</p>
          <p className="text-base text-black">{slice.primary?.stat2_description}</p>
        </div>
        
        {/* Stat 3 */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-black font-semibold">{slice.primary?.stat3_heading}</p>
          <p className="text-6xl md:text-7xl font-bold text-black">{slice.primary?.stat3_value}</p>
          <p className="text-base text-black">{slice.primary?.stat3_description}</p>
          {slice.primary?.stat3_image?.url && (
            <img 
              src={slice.primary.stat3_image.url} 
              alt="" 
              className="w-full h-48 object-cover mt-4"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Full Screen Image Slice Component
const FullScreenImageSlice = ({ slice }) => {
  if (!slice.primary?.image?.url) return null;
  
  return (
    <div className="w-full">
      <img
        src={slice.primary.image.url}
        alt={slice.primary.alt_text || "Full screen image"}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  );
};

// Slice renderer
const renderSlice = (slice, index) => {
  switch (slice.slice_type) {
    case "title_with_description":
      return <TitleWithDescriptionSlice key={index} slice={slice} />;
    case "two_column_text":
      return <TwoColumnTextSlice key={index} slice={slice} />;
    case "gallery_with_text":
      return <GalleryWithTextSlice key={index} slice={slice} />;
    case "stats_section":
      return <StatsSectionSlice key={index} slice={slice} />;
    case "full_screen_image":
      return <FullScreenImageSlice key={index} slice={slice} />;
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

      {/* Render all slices */}
      {slices.map((slice, index) => renderSlice(slice, index))}

      {/* CTA Section */}
      <Section />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
};

export default PostCaseStudy;
