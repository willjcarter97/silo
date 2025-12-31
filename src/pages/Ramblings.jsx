import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePageMeta } from "../hooks/usePageMeta";
import { client } from "../prismicio";
import * as prismic from "@prismicio/client";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronRight } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);

// Helper to extract plain text from Prismic Rich Text
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  return richTextField.map((block) => block.text || "").join(" ");
};

export default function Ramblings() {
  usePageMeta(
    "Insights on Social, Branding & Web Design",
    "Read expert insights on social media strategy, content strategy, branding, web design, UX UI design, digital content trends and creative direction for modern brands."
  );

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("View all");
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarWrapperRef = useRef(null);

  // Fetch blog posts from Prismic
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await client.getAllByType("blog_post", {
          orderings: [{ field: "my.blog_post.publish_date", direction: "desc" }],
        });
        
        // Transform Prismic data to match expected format
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

  // Determine if we should show content
  const showContent = !isLoading && blogPosts.length > 0;

  // Generate category list
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(blogPosts.map((post) => post.category)),
    ];
    return ["View all", ...uniqueCategories];
  }, [blogPosts]);

  // Filter posts based on selected category
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

    // Only enable scroll animation for screens >= 768px (md and up)
    if (window.innerWidth < 768) {
      gsap.set(sidebarRef.current, { y: 0 });
      return;
    }

    const sidebar = sidebarRef.current;
    const container = containerRef.current;

    // reset sidebar position
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

        // Move sidebar according to scroll
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

  return (
    <div className="min-h-screen md:mt-20 lg:mt-28 mx-3 md:mx-0">
      <div className="mx-auto max-w-[1280px] px-4 md:px-0 md:py-12 mb-20">
        {/* Header Section */}
        <div className="mb-24 md:w-[50vw] mt-32 md:mt-0 ">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4 font-['Epilogue'] leading-tight">
            Our Ramblings
          </h1>
          <p className="text-black text-lg font-normal">
            From UGC tips to the latest in social and design trends, The Silo
            Blog dives into what's shaping the digital marketing and
            content-first world right now.
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

        {/* Empty State - Show when no posts */}
        {!isLoading && !error && blogPosts.length === 0 && (
          <div className="flex flex-col lg:flex-row gap-12 relative mt-2">
            {/* Sidebar */}
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

            {/* Empty State Message */}
            <div className="flex-1">
              <div className="border-[1px] border-black p-6 md:p-24 flex flex-col items-center justify-center min-h-[250px] md:min-h-[400px]">
                <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-4">
                  This page is as empty as your brand without UGC.
                </h2>
                <p className="text-black text-base md:text-lg text-center">
                  Don't worry, we're going to be fixing both.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Full Blog Content */}
        {showContent && (
          <>
            {/* Sidebar + Posts Wrapper */}
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
                        <div className="md:p-8 md:px-0 py-8 px-0 order-1 md:order-2">
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

                        <div className="w-full h-[60vh] overflow-hidden group order-2 md:order-1">
                          {filteredPosts[0].image ? (
                            <img
                              src={filteredPosts[0].image}
                              alt={filteredPosts[0].title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
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
                        {filteredPosts.slice(1).map((post) => (
                          <div
                            key={post.id}
                            className="bg-white overflow-hidden cursor-pointer flex flex-col"
                            onClick={() => navigate(post.link)}
                          >
                            <div className="md:p-6 md:px-0 py-6 px-0 order-1 md:order-2">
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

                            <div className="aspect-[16/9] overflow-hidden group order-2 md:order-1">
                              {post.image ? (
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="w-full h-full object-cover md:object-cover transition-transform duration-300 group-hover:scale-110"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400">No image</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* No posts in category message */}
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

        {/* Newsletter Section */}
        <div className="md:mt-40 mt-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 md:gap-12 lg:gap-16">
            <div className="lg:flex-1 lg:max-w-lg">
              <h2 className="text-black text-3xl font-bold mb-4 font-['Epilogue'] leading-tight">
                Sign up to our newsletter
              </h2>

              <p className="text-black text-base leading-relaxed">
                We don't spam. We send sharp insights, new briefs, and content
                you'll actually want to open.
              </p>
            </div>

            <div className="lg:flex-shrink-0 max-w-xl w-full">
              <div className="md:flex md:gap-3 flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-[#FF322E] focus:border-transparent text-base w-full"
                />
                <Link
                  to="#"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF322E] h-[48px] px-8 py-4 text-xs font-medium tracking-wide text-white border-transparent relative overflow-hidden group"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all whitespace-nowrap duration-300 ease-in-out text-base group-hover:translate-x-40">
                    Sign me up!
                  </span>
                </Link>
              </div>

              <p className="text-black text-sm mt-3 leading-relaxed">
                By clicking Sign Up you're agreeing to our{" "}
                <a
                  href="/terms"
                  className="hover:text-brand hover:text-base text-sm ease-in-out duration-200 cursor-pointer"
                >
                  Terms and Conditions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-5" />
    </div>
  );
}
