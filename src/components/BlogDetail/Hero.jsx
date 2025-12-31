import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLink, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Hero({ blogPost, className = "" }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Social sharing functions
  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      blogPost?.title || "Check out this blog post"
    );
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link. Please try again.");
    }
  };

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-[40%_58%] gap-0 md:gap-0 lg:gap-[2%] lg:mt-24 lg:mb-40 ${className}`}
    >
      {/* Left Column - Content */}
      <div className="order-1 h-auto lg:order-1">
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-base text-black">
            <Link to="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <span className="text-black">›</span>
            <span>{blogPost.category || "Category"}</span>
          </div>
        </nav>
        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-black lg:mb-12 mb-5 leading-tight w-[80%]">
          {blogPost.title || "Blog title heading will go here"}
        </h1>

        {/* Author Metadata */}
        <div className="lg:mb-10 mb-5">
          <p className="text-sm text-black">
            By{" "}
            <span className="font-semibold">
              {blogPost.author || "Ruby Turbett"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm text-black mt-1">
            <time dateTime={blogPost.publishDate}>
              {blogPost.publishDate || "12 Sept 2025"}
            </time>
            <span>•</span>
            <span>{blogPost.readTime || "5 min read"}</span>
          </div>
        </div>

        {/* Social Share Section */}
        <div className="lg:mb-5 mb-5">
          <h2 className="text-base font-semibold text-black mb-3">
            Share this post
          </h2>
          <div className="flex items-center gap-3">
            {/* Copy Link Button */}
            <button
              onClick={copyToClipboard}
              className="p-2 text-black hover:text-brand focus:outline-none transition-colors"
              aria-label="Copy link to clipboard"
              title="Copy link"
            >
              <FaLink className="w-5 h-5" />
            </button>

            {/* LinkedIn Button */}
            <button
              onClick={shareOnLinkedIn}
              className="p-2 text-black hover:text-brand focus:outline-none transition-colors"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </button>

            {/* Twitter/X Button */}
            <button
              onClick={shareOnTwitter}
              className="p-2 text-black hover:text-brand focus:outline-none transition-colors"
              aria-label="Share on Twitter"
            >
              <FaXTwitter className="w-5 h-5" />
            </button>

            {/* Facebook Button */}
            <button
              onClick={shareOnFacebook}
              className="p-2 text-black hover:text-brand focus:outline-none transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebookF className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Featured Image */}
      <div className="order-2 lg:order-2 h-[50vh] lg:h-auto lg:relative">
        <div className="bg-white aspect-auto overflow-hidden flex items-center justify-center relative min-h-[35vh] h-full lg:absolute lg:inset-0 lg:min-h-0">
          {!imageError && blogPost.featuredImage ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#DBDBDB] animate-pulse">
                  <svg
                    className="w-20 h-20 text-[#BABABA]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>
              )}
              <img
                src={blogPost.featuredImage}
                alt={`Featured image for ${blogPost.title}`}
                className={`w-full h-full object-cover transition-opacity duration-300 block ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#DBDBDB]">
              <svg
                className="w-20 h-20 text-[#BABABA]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
