import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight, MdOutlineLocationOn } from "react-icons/md";
import ReadyWhenYouArePrismic from "../components/Common/ReadyWhenYouArePrismic";
import LazySection from "../components/Common/LazySection";
import LazyImage from "../components/Common/LazyImage";
import AccentHeadline from "../components/Common/AccentHeadline";
import SiloTriangle from "../components/Common/SiloTriangle";
import LazyText from "../components/Common/LazyText";
import LazyElement from "../components/Common/LazyElement";
import { usePageMeta } from "../hooks/usePageMeta";
import { pageSeo } from "../data/seo";

// Fallback head copy (used until/unless Prismic has values); single source in src/data/seo.js
const SEO_FALLBACK = pageSeo("/case-studies");
import { client } from "../prismicio";
import { getCaseStudyLocation } from "../data/caseStudyLocations";

// Default values for hero section
const defaults = {
  heading: "You're going to want to see these.",
  description: "Some of our recent case studies that showcase the thinking and creativity that move brands forward.",
  primaryButtonText: "Let's chat",
  primaryButtonLink: "/contact",
  secondaryButtonText: "Our services",
  secondaryButtonLink: "/services",
};

/**
 * Helper to resolve Prismic Link fields to URLs
 */
const resolveLinkUrl = (linkField) => {
  if (!linkField) return null;
  
  if (linkField.link_type === "Web" || linkField.url) {
    return linkField.url;
  }
  
  if (linkField.link_type === "Document" && linkField.uid) {
    const typeRoutes = {
      home_page: "/",
      case_study: `/case-studies/${linkField.uid}`,
      blog_post: `/blog/${linkField.uid}`,
      services_page: "/services",
      contact_page: "/contact",
    };
    return typeRoutes[linkField.type] || `/${linkField.uid}`;
  }
  
  return null;
};

// Helper to extract plain text from Prismic Rich Text
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  return richTextField.map((block) => block.text || "").join(" ");
};

// Case Study Card Component - Desktop
const CaseStudyCardDesktop = ({ caseStudy, isLast }) => {
  const link = `/case-studies/${caseStudy.uid}`;
  
  return (
    <LazyElement
      className={`hidden lg:flex items-center justify-between gap-12 xl:gap-20 py-8 group cursor-pointer`}
      animation="fadeUp"
      renderWhenHidden={true}
      onClick={() => (window.location.href = link)}
    >
      <div className="w-2/5 aspect-[4/3] flex items-center justify-center overflow-hidden">
        <LazyImage
          src={caseStudy.featuredImage}
          alt={caseStudy.title}
          className="max-w-full max-h-full object-contain"
          containerClassName="w-full h-full flex items-center justify-center"
        />
      </div>
      <div className="w-3/5 flex flex-col justify-center items-start gap-3 text-left">
        <LazyText as="h2" className="text-3xl xl:text-4xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }} animation="fadeUp" delay={100}>
          {caseStudy.title}
        </LazyText>
        <LazyText as="p" className="text-lg xl:text-xl text-black" animation="fadeUp" delay={150}>
          {caseStudy.subtitle}
        </LazyText>
        <LazyText as="p" className="text-base xl:text-lg text-black leading-relaxed" animation="fadeUp" delay={200}>
          {caseStudy.description}
        </LazyText>
        <div className="flex flex-wrap gap-2 mt-2">
          {caseStudy.location && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-black px-3 py-1.5 border border-black">
              <MdOutlineLocationOn className="text-base" aria-hidden />
              {caseStudy.location}
            </span>
          )}
          {caseStudy.tags.map((tag, index) => (
            <span key={index} className="text-sm font-semibold text-black px-3 py-1.5 bg-brand/20">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          className="inline-flex items-center gap-2 mt-4 font-bold text-lg text-brand group/link"
        >
          <span>View Project</span>
          <MdOutlineKeyboardArrowRight className="text-xl transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </LazyElement>
  );
};

// Case Study Card Component - Mobile/Tablet
const CaseStudyCardMobile = ({ caseStudy, isLast }) => {
  const link = `/case-studies/${caseStudy.uid}`;
  
  return (
    <LazyElement
      className={`flex flex-col lg:hidden py-6 cursor-pointer`}
      animation="fadeUp"
      renderWhenHidden={true}
      onClick={() => (window.location.href = link)}
    >
      <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-6">
        <LazyImage
          src={caseStudy.featuredImage}
          alt={caseStudy.title}
          className="max-w-full max-h-full object-contain"
          containerClassName="w-full h-full flex items-center justify-center"
        />
      </div>
      <div className="flex flex-col gap-3 text-left">
        <LazyText as="h2" className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Epilogue, sans-serif' }} animation="fadeUp" delay={100}>
          {caseStudy.title}
        </LazyText>
        <LazyText as="p" className="text-base md:text-lg text-black" animation="fadeUp" delay={150}>
          {caseStudy.subtitle}
        </LazyText>
        <LazyText as="p" className="text-sm md:text-base text-black leading-relaxed" animation="fadeUp" delay={200}>
          {caseStudy.description}
        </LazyText>
        <div className="flex flex-wrap gap-2 mt-2">
          {caseStudy.location && (
            <span className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-black px-2.5 py-1 border border-black">
              <MdOutlineLocationOn className="text-sm md:text-base" aria-hidden />
              {caseStudy.location}
            </span>
          )}
          {caseStudy.tags.map((tag, index) => (
            <span key={index} className="text-xs md:text-sm font-semibold text-black px-2.5 py-1 bg-brand/20">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          className="inline-flex items-center gap-2 mt-3 font-bold text-base md:text-lg text-brand"
          onClick={(e) => e.stopPropagation()}
        >
          <span>View Project</span>
          <MdOutlineKeyboardArrowRight className="text-xl" />
        </a>
      </div>
    </LazyElement>
  );
};

const CaseStudies = () => {
  const [pageData, setPageData] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  usePageMeta(
    pageData?.pageTitle || SEO_FALLBACK.title,
    pageData?.metaDescription || SEO_FALLBACK.description
  );

  // Fetch page data from Prismic
  useEffect(() => {
    async function fetchPageData() {
      try {
        const response = await client.getSingle("portfolio_page");
        
        if (response?.data) {
          const data = response.data;
          
          setPageData({
            pageTitle: data.page_title || null,
            metaDescription: data.meta_description || null,
            heading: data.hero_heading || null,
            description: data.hero_description || null,
            primaryButtonText: data.hero_primary_button_text || null,
            primaryButtonLink: resolveLinkUrl(data.hero_primary_button_link) || null,
            secondaryButtonText: data.hero_secondary_button_text || null,
            secondaryButtonLink: resolveLinkUrl(data.hero_secondary_button_link) || null,
            mainImage: data.hero_main_image?.url || null,
            secondaryImage: data.hero_secondary_image?.url || null,
          });
        }
      } catch (error) {
        console.warn("Could not fetch portfolio page from Prismic:", error.message);
      }
    }

    fetchPageData();
  }, []);

  // Fetch case studies from Prismic
  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        setIsLoading(true);
        const response = await client.getAllByType("case_study", {
          orderings: {
            field: "my.case_study.display_order",
            direction: "asc",
          },
        });

        const transformedStudies = response.map((study) => ({
          id: study.id,
          uid: study.uid,
          title: study.data.title || "Untitled",
          subtitle: study.data.subtitle || "",
          description: asText(study.data.description),
          featuredImage: study.data.featured_image?.url || "",
          displayOrder: study.data.display_order || 999,
          showOnHomepage: study.data.show_on_homepage || false,
          location: study.data.location || getCaseStudyLocation(study.uid),
          tags: study.data.tags?.map((t) => t.tag_name).filter(Boolean) || [],
        }));

        setCaseStudies(transformedStudies);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCaseStudies();
  }, []);

  // Use props with fallback to defaults
  const displayHeading = pageData?.heading || defaults.heading;
  const displayDescription = pageData?.description || defaults.description;
  const displayPrimaryButtonText = pageData?.primaryButtonText || defaults.primaryButtonText;
  const displayPrimaryButtonLink = pageData?.primaryButtonLink || defaults.primaryButtonLink;
  const displaySecondaryButtonText = pageData?.secondaryButtonText || defaults.secondaryButtonText;
  const displaySecondaryButtonLink = pageData?.secondaryButtonLink || defaults.secondaryButtonLink;

  return (
    <div className="max-w-[1280px] mx-auto h-auto flex flex-col justify-start items-center mt-20">
      {/* Hero Section (Nic's October design: type-led, no photography; red triangle accent) */}
      <section
        className="w-full px-4 md:px-10 min-[1360px]:px-0 pt-12 sm:pt-16 md:pt-20 lg:pt-28 pb-16 md:pb-20 lg:pb-24"
        aria-label="Portfolio introduction"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,400px)] gap-10 lg:gap-16 items-end">
          <div className="flex flex-col gap-10 lg:gap-20">
            <AccentHeadline
              as="h1"
              accentKey="portfolio"
              text={displayHeading}
              className="font-epilogue font-bold text-black text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.08] tracking-tight max-w-[11ch]"
            />
            <SiloTriangle className="hidden lg:block w-[88px] h-[72px]" />
          </div>
          <div className="flex flex-col gap-6 lg:pb-1">
            <p className="font-epilogue text-black text-base md:text-lg leading-[150%]">{displayDescription}</p>
            <div className="flex flex-row gap-3 sm:gap-4 items-start">
              <a
                href={displayPrimaryButtonLink}
                className="inline-flex items-center justify-center gap-2 bg-[#FF322E] h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-white border-transparent relative overflow-hidden group"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
                  {displayPrimaryButtonText}
                </span>
              </a>

              <a
                href={displaySecondaryButtonLink}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-brand relative overflow-hidden group"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="text-brand w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-3 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
                  {displaySecondaryButtonText}
                </span>
              </a>
            </div>
            <SiloTriangle className="lg:hidden mt-6 w-[56px] h-[46px]" />
          </div>
        </div>
      </section>

      <div className="relative left-1/2 -translate-x-1/2 w-screen mx-auto h-[1px] bg-black" />

      {/* Case Studies List */}
      <LazySection>
        <div
          id="done"
          className="max-w-[1280px] pb-0 px-4 md:px-10 min-[1360px]:px-0 mx-auto"
        >
          <div className="mx-auto pt-10 md:pt-16 lg:pt-20">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
              </div>
            ) : caseStudies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-black text-lg">No case studies found.</p>
              </div>
            ) : (
              caseStudies.map((study, index) => (
                <React.Fragment key={study.id}>
                  <CaseStudyCardDesktop 
                    caseStudy={study} 
                    isLast={index === caseStudies.length - 1} 
                  />
                  <CaseStudyCardMobile 
                    caseStudy={study} 
                    isLast={index === caseStudies.length - 1} 
                  />
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </LazySection>

      
      <LazySection>
        <ReadyWhenYouArePrismic />
      </LazySection>
      
    </div>
  );
};

export default CaseStudies;
