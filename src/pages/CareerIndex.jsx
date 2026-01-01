import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineAccessTime,
  MdOutlineKeyboardArrowRight,
  MdOutlineLocationOn,
} from "react-icons/md";
import { usePageMeta } from "../hooks/usePageMeta";
import ReadyWhenYouAre from "../components/Common/ReadyWhenYouAre";
import { client } from "../prismicio";

const CareerIndex = () => {
  usePageMeta(
    'Careers at Our Creative & Digital Studio',
    'Explore roles in social media management, content strategy, brand identity design, motion graphics, digital design and website development at Silo.'
  )

  const navigate = useNavigate();

  // State for careers fetched from Prismic
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch careers from Prismic
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await client.getAllByType("career", {
          orderings: { field: "my.career.publish_date", direction: "desc" },
        });

        const careersList = response
          .filter((doc) => doc.data.is_active !== false)
          .map((doc) => ({
            uid: doc.uid,
            title: doc.data.title || "",
            department: doc.data.department || "",
            location: doc.data.location || "",
            contractType: doc.data.contract_type || "",
            description: doc.data.short_description || "",
          }));

        setCareers(careersList);
      } catch (error) {
        console.error("Error fetching careers:", error);
        setCareers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  // Show jobs if we have any from Prismic
  const showJobs = careers.length > 0;

  const handleJobClick = (jobUid) => {
    navigate(`/job/${jobUid}`);
  };

  const handleApplyClick = (e, jobUid) => {
    e.stopPropagation(); // Prevent card click when Apply button is clicked
    navigate(`/job/${jobUid}#apply`);
  };

  return (
    <div className="h-auto max-w-[1280px] mt-24 mx-auto px-4 md:px-10 lg:px-10">
      <div className="max-w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 mx-auto mb-0 md:mb-0">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Work at Silo
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-normal text-black leading-relaxed">
                Want to make ideas happen? Join Silo - a team of creators strategists, and storytellers shaping brands that stand out online.
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-6 sm:space-y-4 order-2 lg:order-2">
                <div className="bg-white border border-black p-8 sm:p-10 md:p-12 lg:p-16">
                  <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State - Show when no jobs and not loading */}
            {!isLoading && !showJobs && (
              <div className="space-y-6 sm:space-y-4 order-2 lg:order-2">
                <div className="bg-white border border-black p-8 sm:p-10 md:p-12 lg:p-16">
                  <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 text-center">
                    No roles live right now.
                  </h2>
                  <p className="text-base sm:text-lg text-black text-center mb-6">
                    Drop your CV anyway, we like ambitious people.
                  </p>
                  <p className="text-center">
                    <a
                      href="mailto:hello@thesilocreative.com"
                      className="text-brand font-bold text-base sm:text-lg hover:underline"
                    >
                      hello@thesilocreative.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Job Listings - Shows when jobs exist in Prismic */}
            {showJobs && (
              <div className="space-y-6 sm:space-y-4 order-2 lg:order-2">
                {careers.map((career) => (
                  <div
                    key={career.uid}
                    onClick={() => handleJobClick(career.uid)}
                    className="bg-white border border-black p-4 py-6 sm:p-8 md:p-10 cursor-pointer hover:border-black transition-all duration-200 group"
                  >
                    <div className="flex flex-row sm:flex-row items-start justify-between mb-3 sm:mb-4 gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3
                          className="text-black group-hover:text-brand transition-colors duration-200 text-xl sm:text-2xl font-bold"
                          style={{
                            fontFamily: "Epilogue",
                            lineHeight: "140%",
                          }}
                        >
                          {career.title}
                        </h3>
                        <span
                          className="bg-[#FFDBDB] text-black px-2 py-1 self-start text-sm font-semibold"
                          style={{ fontFamily: "DM Sans" }}
                        >
                          {career.department}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleApplyClick(e, career.uid)}
                        className="inline-flex items-center gap-2 font-normal text-xl leading-[150%] text-[#FF322E] tracking-normal group flex-shrink-0"
                        style={{ fontFamily: "DM Sans" }}
                      >
                        <span>Apply Now</span>
                        <span
                          aria-hidden
                          className="inline-block ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                        >
                          <MdOutlineKeyboardArrowRight className="text-2xl font-black" />
                        </span>
                      </button>
                    </div>

                    <p
                      className="text-black mb-3 sm:mb-4 text-sm sm:text-base"
                      style={{
                        fontFamily: "DM Sans",
                        lineHeight: "150%",
                      }}
                    >
                      {career.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div className="flex items-center gap-2">
                        <MdOutlineLocationOn className="w-6 h-6 text-black font-thin flex-shrink-0" />
                        <span
                          className="text-black text-base sm:text-lg"
                          style={{ fontFamily: "DM Sans" }}
                        >
                          {career.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdOutlineAccessTime className="w-6 h-6 text-black font-thin flex-shrink-0" />
                        <span
                          className="text-black text-base sm:text-lg"
                          style={{ fontFamily: "DM Sans" }}
                        >
                          {career.contractType}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-16" />
      <ReadyWhenYouAre />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
    </div>
  );
};

export default CareerIndex;
