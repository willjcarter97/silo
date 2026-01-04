import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ReadyWhenYouArePrismic from "../components/Common/ReadyWhenYouArePrismic";
import LazySection from "../components/Common/LazySection";
import LazyImage from "../components/Common/LazyImage";
import LazyText from "../components/Common/LazyText";
import LazyElement from "../components/Common/LazyElement";
import { usePageMeta } from "../hooks/usePageMeta";
import { client } from "../prismicio";

// Default values for hero section
const defaults = {
  heading: "You're going to want to see these.",
  description: "Every project tells a story of strategy shaped, content crafted, identities defined and digital experiences built. These case studies capture the thinking and creativity that turn ideas into work that truly moves brands forward.",
  primaryButtonText: "Let's chat",
  primaryButtonLink: "/contact",
  secondaryButtonText: "Our services",
  secondaryButtonLink: "/services",
  mainImage: "https://images.prismic.io/silosite/aVUgXnNYClf9otrc_v1765923582_Placeholder_Image_rr5dup.png?auto=format,compress",
  secondaryImage: "https://images.prismic.io/silosite/aVUgHHNYClf9otrA_v1762717296_studies2_a4olwb.png?auto=format,compress",
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
      className={`hidden lg:flex items-center justify-between gap-12 xl:gap-20 py-8 ${!isLast ? 'border-b border-black' : ''} group cursor-pointer`}
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
      className={`flex flex-col lg:hidden py-6 ${!isLast ? 'border-b border-black' : ''} cursor-pointer`}
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
    pageData?.pageTitle || "Creative Agency Case Studies & Client Work",
    pageData?.metaDescription || "See how Silo Creative has helped brands achieve incredible results with UGC and content creation. Explore our portfolio of successful campaigns."
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
  const displayMainImage = pageData?.mainImage || defaults.mainImage;
  const displaySecondaryImage = pageData?.secondaryImage || defaults.secondaryImage;

  return (
    <div className="max-w-[1280px] mx-auto h-auto flex flex-col justify-start items-center mt-16 xl:mt-12 lg:mt-40 md:mt-40">
      {/* Hero Section */}
      <section
        className="mt-10 mb-4 md:mb-10 flex items-start w-full justify-start pb-4 md:pb-12 lg:pb-16 overflow-hidden"
        aria-label="About Silo - Company introduction"
      >
        <div className="flex flex-col justify-between xl:grid xl:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 max-w-full mx-auto w-full items-start md:items-center mt-0 xl:mt-16 lg:mt-0 md:mt-0">
          {/* Text Content Area */}
          <div
            className="flex flex-col h-full justify-start xl:justify-between space-y-4 sm:space-y-6 md:space-y-8 order-2 xl:order-1 xl:pr-6 items-start w-full md:w-[90%] md:-ml-16 xl:ml-0 px-3 md:px-0"
            role="main"
          >
            <h1
              className="font-bold text-black text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[56px] leading-3 text-left mt-6 sm:mt-0"
              style={{
                opacity: 1,
                fontFamily: "Epilogue, sans-serif",
                fontWeight: 700,
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              {displayHeading}
            </h1>
            <div className="flex flex-col gap-5 sm:gap-6 items-start w-full">
              <p
                className="text-black text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] leading-relaxed text-left max-w-full xl:max-w-lg font-epilogue"
                style={{
                  opacity: 1,
                  fontWeight: 400,
                  fontFamily: "Epilogue, sans-serif",
                  lineHeight: "150%",
                  letterSpacing: "0%",
                }}
              >
                {displayDescription}
              </p>
              <div className="flex flex-row gap-3 sm:gap-4 items-start w-full sm:w-auto xl:mx-0">
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
            </div>
          </div>

          {/* Visual Content Area */}
          <LazyElement className="order-1 xl:order-2 w-full mb-6 md:mb-0 md:mt-0" animation="fadeLeft" delay={100} renderWhenHidden={true}>
            <div className="flex flex-col md:hidden gap-4">
              <div className="w-full">
                <LazyImage
                  src={displayMainImage}
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[350px]"
                  containerClassName="w-full"
                />
              </div>
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                <div className="hidden sm:flex justify-center">
                  <LazyImage
                    src={displaySecondaryImage}
                    alt="The Silo brand representation"
                    className="w-32 h-auto object-cover max-h-[120px]"
                    containerClassName="w-32"
                  />
                </div>
              </div>
            </div>

            <div className="hidden md:flex xl:hidden gap-6">
              <div className="flex-1">
                <LazyImage
                  src={displayMainImage}
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[500px] lg:max-h-[550px]"
                  containerClassName="w-full"
                />
              </div>
              <div className="flex flex-col gap-4 justify-between items-end">
                <div>
                  <LazyImage
                    src={displaySecondaryImage}
                    alt="The Silo brand representation"
                    className="w-48 lg:w-56 h-auto object-cover max-h-[300px] lg:max-h-[350px]"
                    containerClassName="w-48 lg:w-56"
                  />
                </div>
              </div>
            </div>

            <div className="hidden xl:flex gap-6">
              <div className="flex-1 max-w-[460px]">
                <LazyImage
                  src={displayMainImage}
                  alt="Silo team member showcasing brand identity"
                  className="w-full h-auto object-cover max-h-[550px] 2xl:max-h-none"
                  containerClassName="w-full"
                />
              </div>
              <div className="flex flex-col justify-between items-end">
                <div className="mb-4">
                  <LazyImage
                    src={displaySecondaryImage}
                    alt="The Silo brand representation"
                    className="w-64 2xl:w-[328px] h-auto object-cover xl:min-h-[200px] 2xl:max-h-none"
                    containerClassName="w-64 2xl:w-[328px]"
                  />
                </div>
              </div>
            </div>
          </LazyElement>
        </div>
      </section>

      <div className="relative left-1/2 -translate-x-1/2 w-screen mx-auto h-[1px] bg-black" />

      {/* Case Studies List */}
      <LazySection>
        <div
          id="done"
          className="max-w-[1280px] pb-0 px-4 md:px-6 lg:px-0 mx-auto"
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

      <div className="w-screen mx-auto h-[1px] bg-black my-16 relative left-1/2 -translate-x-1/2" />
      
      <LazySection>
        <ReadyWhenYouArePrismic />
      </LazySection>
      
      <div className="relative left-1/2 -translate-x-1/2 w-screen mx-auto h-[1px] bg-black mt-16" />
    </div>
  );
};

export default CaseStudies;
