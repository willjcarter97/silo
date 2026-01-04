import { useState, useEffect } from "react";
import ReadyWhenYouArePrismic from "../components/Common/ReadyWhenYouArePrismic";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { client } from "../prismicio";

// Default values
const defaults = {
  heading: "Silo job board",
  descriptionBold: "A board for brands post briefs and UGC creators pick them up. Simple.",
  description: "It's a live feed of brands looking for UGC: TikToks, Reels, photos, product demos and testimonials - ready for creators to jump on. Real opportunities, real brands, and a roster of vetted creators who know how to make content that connects.",
  primaryButtonText: "Sign up as a Creator",
  primaryButtonLink: "/ugc-contact",
  secondaryButtonText: "Post a requirement Brief",
  secondaryButtonLink: "/contact",
  emptyStateHeading: "Quiet in here, huh?",
  emptyStateDescription: "Our brands are brewing their next big thing. You could be first in line when they drop.",
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
      contact_page: "/contact",
      ugc_contact_page: "/ugc-contact",
    };
    return typeRoutes[linkField.type] || `/${linkField.uid}`;
  }
  
  return null;
};

// JobCard Component - Clickable with hover effects
function JobCard({ job }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/jobs/${job.uid}`);
  };

  return (
    <div
      className="flex flex-col w-full lg:w-[32vw] lg:max-w-[400px] lg:flex-shrink-0 cursor-pointer transition-all duration-300 group mb-8 md:mb-0"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View job details for ${job.title} in ${job.category}`}
    >
      {/* Job Title - At top on mobile */}
      <h3
        className="text-black m-0 mb-3 md:mb-2 order-1 md:order-3 text-2xl md:text-base"
        style={{
          fontFamily: "Epilogue, sans-serif",
          fontWeight: 700,
          lineHeight: "130%",
          letterSpacing: "0%",
        }}
      >
        {job.title}
      </h3>

      {/* Category Label - Below title on mobile, above title on desktop */}
      <div
        className="bg-[#FFDBDB] text-black w-fit mb-4 md:mb-2 md:mt-3 order-2 md:order-2"
        style={{
          padding: "5px 7px",
          fontSize: "18px",
          fontWeight: 800,
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        {job.category}
      </div>

      {/* Job Image - Moved to bottom on mobile */}
      <div className="w-full h-[260px] font-bold overflow-hidden order-3 md:order-1">
        <img
          src={job.image}
          alt={`${job.title} - ${job.category} job opportunity`}
          className="w-full h-full font-bold object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function JobBoard() {
  const [pageData, setPageData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  usePageMeta(
    pageData?.pageTitle || "UGC Agency Job Board for Brand Briefs",
    pageData?.metaDescription || "Discover UGC creator jobs, brand briefs and paid UGC content opportunities. A dedicated job board for UGC creators producing short form content for modern brands."
  );

  // Fetch page data from Prismic
  useEffect(() => {
    async function fetchPageData() {
      try {
        const response = await client.getSingle("job_board_page");
        
        if (response?.data) {
          const data = response.data;
          
          setPageData({
            pageTitle: data.page_title || null,
            metaDescription: data.meta_description || null,
            heading: data.hero_heading || null,
            descriptionBold: data.hero_description_bold || null,
            description: data.hero_description || null,
            primaryButtonText: data.hero_primary_button_text || null,
            primaryButtonLink: resolveLinkUrl(data.hero_primary_button_link) || null,
            secondaryButtonText: data.hero_secondary_button_text || null,
            secondaryButtonLink: resolveLinkUrl(data.hero_secondary_button_link) || null,
            emptyStateHeading: data.empty_state_heading || null,
            emptyStateDescription: data.empty_state_description || null,
          });
        }
      } catch (error) {
        console.warn("Could not fetch job board page from Prismic:", error.message);
      }
    }

    fetchPageData();
  }, []);

  // Fetch jobs from Prismic
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await client.getAllByType("job_listing", {
          orderings: { field: "my.job_listing.publish_date", direction: "desc" },
        });

        const jobsList = response
          .filter((doc) => doc.data.is_active !== false)
          .map((doc) => ({
            uid: doc.uid,
            title: doc.data.title || "",
            category: doc.data.category || "",
            image: doc.data.card_image?.url || "",
          }));

        setJobs(jobsList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Use props with fallback to defaults
  const displayHeading = pageData?.heading || defaults.heading;
  const displayDescriptionBold = pageData?.descriptionBold || defaults.descriptionBold;
  const displayDescription = pageData?.description || defaults.description;
  const displayPrimaryButtonText = pageData?.primaryButtonText || defaults.primaryButtonText;
  const displayPrimaryButtonLink = pageData?.primaryButtonLink || defaults.primaryButtonLink;
  const displaySecondaryButtonText = pageData?.secondaryButtonText || defaults.secondaryButtonText;
  const displaySecondaryButtonLink = pageData?.secondaryButtonLink || defaults.secondaryButtonLink;
  const displayEmptyStateHeading = pageData?.emptyStateHeading || defaults.emptyStateHeading;
  const displayEmptyStateDescription = pageData?.emptyStateDescription || defaults.emptyStateDescription;

  const showJobs = jobs.length > 0;

  return (
    <div className="w-full bg-white md:mt-20 mb-20 max-w-[1280px] mx-auto mt-20">
      {/* Container with 95vw max-width */}
      <div className="max-w-[full] mx-[3vw] md:mx-auto px-0 sm:px-0 md:px-0 py-4 md:py-10 lg:py-14 lg:pt-28 my-6 md:my-20 md:mb-0">
        {/* Hero Section - Adjusted for 95vw */}
        <div className="mb-12 lg:mb-16">
          <div className="w-full lg:w-1/2">
            {/* Main Heading */}
            <h1
              className="mb-5 text-black"
              style={{
                fontFamily: "Epilogue, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 4.5vw, 52px)",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              {displayHeading}
            </h1>

            {/* Description Text */}
            <p
              className="mb-2 text-black"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(15px, 1.8vw, 17px)",
                lineHeight: "150%",
                letterSpacing: "0%",
              }}
            >
              {displayDescriptionBold}
            </p>

            <p
              className="mb-8 text-black"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.8vw, 17px)",
                lineHeight: "150%",
                letterSpacing: "0%",
              }}
            >
              {displayDescription}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Primary Button */}
            <button
              onClick={() => (window.location.href = displayPrimaryButtonLink)}
              className="inline-flex items-center justify-center gap-2 bg-[#FF322E] text-white border-transparent relative overflow-hidden group"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 700,
                fontSize: "30px",
                lineHeight: "150%",
                width: "185px",
                height: "56px",
                padding: "10px 20px",
                whiteSpace: "nowrap",
              }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
              </div>
              <span className="block transition-all duration-300 ease-in-out text-sm group-hover:translate-x-60">
                {displayPrimaryButtonText}
              </span>
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => (window.location.href = displaySecondaryButtonLink)}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-[#FF322E] text-[#FF322E] relative overflow-hidden group"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 700,
                fontSize: "30px",
                lineHeight: "150%",
                width: "200px",
                height: "56px",
                padding: "10px 20px",
                whiteSpace: "nowrap",
              }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                <FaChevronRight className="text-[#FF322E] w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
              </div>
              <span className="block transition-all duration-300 ease-in-out text-sm group-hover:translate-x-80">
                {displaySecondaryButtonText}
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="w-full mb-4 md:mb-16">
            <div className="text-center py-12">
              <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !showJobs && (
          <div className="w-full mb-2 md:mb-16">
            <div className="text-center mb-4 py-4 md:mb-12 md:py-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {displayEmptyStateHeading}
              </h2>
              <p className="text-base md:text-lg text-black">
                {displayEmptyStateDescription}
              </p>
            </div>
          </div>
        )}

        {/* Job Grid */}
        {showJobs && (
          <div className="w-full px-[1vw] md:px-0">
            {/* Mobile: Single column */}
            <div className="grid grid-cols-1 gap-6 sm:hidden justify-items-center">
              {jobs.map((job) => (
                <JobCard key={job.uid} job={job} />
              ))}
            </div>

            {/* Tablet: 2 columns */}
            <div className="hidden sm:grid lg:hidden grid-cols-2 gap-2 justify-items-center">
              {jobs.map((job) => (
                <JobCard key={job.uid} job={job} />
              ))}
            </div>

            {/* Desktop: Flexible grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12">
              {jobs.map((job) => (
                <JobCard key={job.uid} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ready When You Are Section */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mb-16" />
      <ReadyWhenYouArePrismic />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
    </div>
  );
}
