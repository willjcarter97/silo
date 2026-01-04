import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePageMeta } from "../hooks/usePageMeta";
import { client } from "../prismicio";
import LazyImage from "../components/Common/LazyImage";
import LazyElement from "../components/Common/LazyElement";
import JobBoardNewsletterPrismic from "../components/Common/JobBoardNewsletterPrismic";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Default values
const defaults = {
  heading: "Our Ramblings",
  description: "From UGC tips to the latest in social and design trends, Silo's Blog dives into what's shaping the digital marketing and content-first world right now.",
  emptyStateHeading: "This page is as empty as your brand without UGC.",
  emptyStateDescription: "Don't worry, we're going to be fixing both.",
};

// Helper to extract plain text from Prismic Rich Text
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  return richTextField.map((block) => block.text || "").join(" ");
};

export default function Ramblings() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("View all");
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarWrapperRef = useRef(null);

  usePageMeta(
    pageData?.pageTitle || "Insights on Social, Branding & Web Design",
    pageData?.metaDescription || "Read expert insights on social media strategy, content strategy, branding, web design, UX UI design, digital content trends and creative direction for modern brands."
  );

  // Fetch page data from Prismic
  useEffect(() => {
    async function fetchPageData() {
      try {
        const response = await client.getSingle("ramblings_page");
        
        if (response?.data) {
          const data = response.data;
          
          setPageData({
            pageTitle: data.page_title || null,
            metaDescription: data.meta_description || null,
            heading: data.hero_heading || null,
            description: data.hero_description || null,
            emptyStateHeading: data.empty_state_heading || null,
            emptyStateDescription: data.empty_state_description || null,
          });
        }
      } catch (error) {
        console.warn("Could not fetch ramblings page from Prismic:", error.message);
      }
    }

    fetchPageData();
  }, []);

  // Fetch blog posts from Prismic
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await client.getAllByType("blog_post", {
          orderings: [{ field: "my.blog_post.publish_date", direction: "asc" }],
        });

        const transformedPosts = response.map((post) => ({
          id: post.id,
          uid: post.uid,
          title: asText(post.data.title),
          description: asText(post.data.excerpt),
          image: post.data.featured_image?.url || "",
          category: post.data.category || "Insights",
          readTime: post.data.read_time || "5 min read",
          author: post.data.author || "Ruby Turbett",
          publishDate: post.data.publish_date,
          link: `/blog/${post.uid}`,
        }));

        setBlogPosts(transformedPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const showContent = !isLoading && blogPosts.length > 0;

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(blogPosts.map((post) => post.category)),
    ];
    return ["View all", ...uniqueCategories];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "View all") return blogPosts;
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [blogPosts, selectedCategory]);

  // GSAP Sidebar Scroll Animation
  useEffect(() => {
    if (
      !sidebarRef.current ||
      !sidebarWrapperRef.current ||
      !containerRef.current ||
      !showContent
    )
      return;

    if (window.innerWidth < 768) {
      gsap.set(sidebarRef.current, { y: 0 });
      return;
    }

    const sidebar = sidebarRef.current;
    const container = containerRef.current;

    gsap.set(sidebar, { y: 0 });

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 220px",
      end: () =>
        container.offsetHeight - sidebar.offsetHeight <= 0
          ? "+=0"
          : `+=${container.offsetHeight - sidebar.offsetHeight}`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const maxY = container.offsetHeight - sidebar.offsetHeight;

        gsap.to(sidebar, {
          y: progress * maxY,
          ease: "none",
          duration: 0,
        });
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.refresh();
    };
  }, [showContent]);

  // Use props with fallback to defaults
  const displayHeading = pageData?.heading || defaults.heading;
  const displayDescription = pageData?.description || defaults.description;
  const displayEmptyStateHeading = pageData?.emptyStateHeading || defaults.emptyStateHeading;
  const displayEmptyStateDescription = pageData?.emptyStateDescription || defaults.emptyStateDescription;

  return (
    <div className="min-h-screen md:mt-20 lg:mt-28 mx-3 md:mx-0">
      <div className="mx-auto max-w-[1280px] px-4 md:px-0 md:py-12 mb-20">
        {/* Header Section */}
        <div className="mb-24 md:w-[50vw] mt-32 md:mt-0 ">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4 font-['Epilogue'] leading-tight">
            {displayHeading}
          </h1>
          <p className="text-black text-lg font-normal">
            {displayDescription}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col lg:flex-row gap-12 relative mt-2">
            <div className="lg:w-48 flex-shrink-0">
              <div className="relative pb-4 bg-white">
                <h3 className="text-lg font-bold text-black mb-6">
                  Blog categories
                </h3>
                <div className="space-y-4">
                  <div className="h-10 bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="border-[1px] border-black p-6 md:p-24 flex flex-col items-center justify-center min-h-[250px] md:min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                <p className="text-black text-lg mt-4">Loading posts...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col lg:flex-row gap-12 relative mt-2">
            <div className="flex-1">
              <div className="border-[1px] border-red-500 p-6 md:p-24 flex flex-col items-center justify-center min-h-[250px] md:min-h-[400px]">
                <h2 className="text-2xl md:text-3xl font-bold text-red-500 text-center mb-4">
                  {error}
                </h2>
                <p className="text-black text-base md:text-lg text-center">
                  Please try again later.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && blogPosts.length === 0 && (
          <div className="flex flex-col lg:flex-row gap-12 relative mt-2">
            <div className="lg:w-48 flex-shrink-0">
              <div className="relative pb-4 bg-white">
                <h3 className="text-lg font-bold text-black mb-6">
                  Blog categories
                </h3>
                <div className="space-y-4">
                  <button className="block w-full text-left text-sm border-[1px] border-black bg-transparent px-4 py-3 text-black font-bold">
                    View all
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="border-[1px] border-black p-6 md:p-24 flex flex-col items-center justify-center min-h-[250px] md:min-h-[400px]">
                <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-4">
                  {displayEmptyStateHeading}
                </h2>
                <p className="text-black text-base md:text-lg text-center">
                  {displayEmptyStateDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Full Blog Content */}
        {showContent && (
          <>
            <div
              ref={containerRef}
              className="flex flex-col lg:flex-row gap-12 relative mt-2"
            >
              {/* Sidebar */}
              <div
                ref={sidebarWrapperRef}
                className="lg:w-48 flex-shrink-0 relative"
              >
                <div
                  ref={sidebarRef}
                  className="relative pb-4 w-full bg-white z-40 shadow-none"
                >
                  <h3 className="text-lg font-bold text-black mb-6">
                    Blog categories
                  </h3>

                  <div className="space-y-4">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`block w-full text-left text-sm transition-all duration-300 ease-in-out ${
                          selectedCategory === category
                            ? "border-[1px] border-black bg-transparent px-4 py-3 text-black font-bold transform scale-105"
                            : "text-black hover:text-black hover:bg-white hover:translate-x-2 hover:font-bold px-2 py-1"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {filteredPosts.length > 0 && (
                  <>
                    {/* Featured Post */}
                    <div className="mb-12">
                      <div
                        className="bg-white overflow-hidden cursor-pointer flex flex-col"
                        onClick={() => navigate(filteredPosts[0].link)}
                      >
                        <div className="md:p-8 md:px-0 py-8 px-0 order-2">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm bg-[#FFDBDB] text-black font-semibold px-3 py-1">
                              {filteredPosts[0].category}
                            </span>

                            <span className="text-sm text-black">
                              {filteredPosts[0].readTime}
                            </span>
                          </div>
                          <h2 className="text-4xl font-bold text-black mb-4 hover:text-brand transition-colors">
                            {filteredPosts[0].title}
                          </h2>
                          <p className="text-black mb-6 text-base">
                            {filteredPosts[0].description}
                          </p>
                          <Link
                            to={filteredPosts[0].link}
                            className="inline-flex items-center gap-2 font-dm font-semibold text-xl leading-[150%] text-[#FF322E] tracking-normal group"
                          >
                            <span>Read more</span>
                            <span
                              aria-hidden
                              className="inline-block ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                            >
                              <MdOutlineKeyboardArrowRight className="text-2xl font-black text-brand" />
                            </span>
                          </Link>
                        </div>

                        <div className="w-full h-[60vh] overflow-hidden group order-1">
                          {filteredPosts[0].image ? (
                            <LazyImage
                              src={filteredPosts[0].image}
                              alt={filteredPosts[0].title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              containerClassName="w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Grid Posts */}
                    {filteredPosts.length > 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredPosts.slice(1).map((post, index) => (
                          <LazyElement
                            key={post.id}
                            className="bg-white overflow-hidden cursor-pointer flex flex-col"
                            animation="fadeUp"
                            delay={index * 100}
                            renderWhenHidden={true}
                            onClick={() => navigate(post.link)}
                          >
                            <div className="md:p-6 md:px-0 py-6 px-0 order-2">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-sm bg-[#FFDBDB] text-black font-semibold px-3 py-1">
                                  {post.category}
                                </span>

                                <span className="text-sm text-black">
                                  {post.readTime}
                                </span>
                              </div>

                              <h3 className="text-2xl font-bold text-black mb-3 hover:text-brand transition-colors">
                                {post.title}
                              </h3>

                              <p className="text-black mb-4">
                                {post.description}
                              </p>

                              <Link
                                to={post.link}
                                className="inline-flex items-center gap-2 font-dm font-semibold text-xl leading-[150%] text-[#FF322E] tracking-normal group"
                              >
                                <span>Read more</span>
                                <span
                                  aria-hidden
                                  className="inline-block ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                                >
                                  <MdOutlineKeyboardArrowRight className="text-2xl font-black text-back" />
                                </span>
                              </Link>
                            </div>

                            <div className="aspect-[16/9] overflow-hidden group order-1">
                              {post.image ? (
                                <LazyImage
                                  src={post.image}
                                  alt={post.title}
                                  className="w-full h-full object-cover md:object-cover transition-transform duration-300 group-hover:scale-110"
                                  containerClassName="w-full h-full"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400">No image</span>
                                </div>
                              )}
                            </div>
                          </LazyElement>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-black text-lg">
                      No posts found in this category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Newsletter Section - Uses same Prismic singleton as Job Board */}
        <JobBoardNewsletterPrismic className="md:mt-40 mt-10" />
      </div>

      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-5" />
    </div>
  );
}
