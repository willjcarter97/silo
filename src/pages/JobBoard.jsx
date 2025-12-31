import { useState, useEffect } from "react";
import Section from "../components/Home/Section.jsx";
import { FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { client } from "../prismicio";

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
  usePageMeta(
    "UGC Agency Job Board for Brand Briefs",
    "Discover UGC creator jobs, brand briefs and paid UGC content opportunities. A dedicated job board for UGC creators producing short form content for modern brands."
  );

  // State for jobs fetched from Prismic
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Show jobs if we have any from Prismic
  const showJobs = jobs.length > 0;

  return (
    <div className="w-full bg-white md:mt-20 mb-20 max-w-[1280px] mx-auto mt-20">
      {/* Container with 95vw max-width */}
      <div className="max-w-[full] mx-[3vw] md:mx-auto px-0 sm:px-0 md:px-0 py-10 lg:py-14 lg:pt-28 my-20 md:mb-0">
        {/* Hero Section - Adjusted for 95vw */}
        <div className="mb-12 lg:mb-16">
          <div className="w-full lg:w-1/2">
            {/* Main Heading - Exact typography from screenshot */}
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
              Silo job board
            </h1>

            {/* Description Text - Exact match to screenshot */}
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
              A board for brands post briefs and UGC creators pick them up.
              Simple.
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
              It’s a live feed of brands looking for UGC: TikToks, Reels,
              photos, product demos and testimonials - ready for creators to
              jump on. Real opportunities, real brands, and a roster of vetted
              creators who know how to make content that connects.
            </p>
          </div>

          {/* Action Buttons - Exact match to screenshot */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Primary Button - Exact screenshot styling */}
            <button
              onClick={() => (window.location.href = "/ugc-contact")}
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
                Sign up as a Creator
              </span>
            </button>

            {/* Secondary Button - Exact screenshot styling */}
            <button
              onClick={() => (window.location.href = "/contact")}
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
                Post a requirement Brief
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

        {/* Empty State - Show when no jobs and not loading */}
        {!isLoading && !showJobs && (
          <div className="w-full mb-4 md:mb-16">
            {/* Empty State Message */}
            <div className="text-center mb-6 py-6 md:mb-12 md:py-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Quiet in here, huh?
              </h2>
              <p className="text-base md:text-lg text-black">
                Our brands are brewing their next big thing. You could be first
                in line when they drop.
              </p>
            </div>

            {/* Newsletter Signup Section */}
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-8">
              {/* Left side - Text content */}
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  Get these straight to your inbox
                </h3>
                <p className="text-base text-black mb-6 md:mb-0">
                  We add UGC jobs weekly, but our creator roster gets first
                  dibs. Sign up to get briefs before they hit the board.
                </p>
              </div>

              {/* Right side - Form */}
              <div className="flex flex-col items-start flex-shrink-0">
                <form className="flex flex-row gap-3 items-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 sm:flex-none sm:w-[350px] border border-black px-4 py-3 text-sm font-normal placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                  <Link
                    to="/ugc-contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#FF322E] h-[48px] px-8 py-4 text-xs font-medium tracking-wide text-white border-transparent relative overflow-hidden group"
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                      <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                    </div>
                    <span className="block transition-all whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
                      Send me Work
                    </span>
                  </Link>
                </form>

                <p className="text-xs text-black mt-3">
                  By clicking Sign Up you're confirming that you agree with our{" "}
                  <Link to="/terms" className="underline hover:text-brand">
                    Terms and Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Job Grid - Shows when jobs exist in Prismic */}
        {showJobs && (
          <div className="w-full px-[1vw] md:px-0">
            {/* Mobile: Single column (< 640px) */}
            <div className="grid grid-cols-1 gap-6 sm:hidden justify-items-center">
              {jobs.map((job) => (
                <JobCard key={job.uid} job={job} />
              ))}
            </div>

            {/* Tablet: 2 columns (640px - 1024px) */}
            <div className="hidden sm:grid lg:hidden grid-cols-2 gap-2 justify-items-center">
              {jobs.map((job) => (
                <JobCard key={job.uid} job={job} />
              ))}
            </div>

            {/* Desktop: Flexible grid (1024px+) */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12">
              {jobs.map((job) => (
                <JobCard key={job.uid} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section Component */}
      <Section />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
}
