import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Hero from '../components/BlogDetail/Hero';
import NewsletterSubscription from '../components/BlogDetail/NewsletterSubscription';
import { usePageMeta } from '../hooks/usePageMeta';
import { client } from '../prismicio';
import { PrismicRichText } from '@prismicio/react';

// Helper to extract plain text from Prismic Rich Text
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  return richTextField.map((block) => block.text || "").join(" ");
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

// Custom components for PrismicRichText to match original styling
const richTextComponents = {
  heading1: ({ children }) => (
    <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 mt-12 first:mt-0">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 mt-8">{children}</h3>
  ),
  heading4: ({ children }) => (
    <h4 className="text-xl md:text-2xl font-bold text-black mb-4 mt-6">{children}</h4>
  ),
  heading5: ({ children }) => (
    <h5 className="text-lg md:text-xl font-bold text-black mb-3 mt-4">{children}</h5>
  ),
  heading6: ({ children }) => (
    <h6 className="text-base md:text-lg font-bold text-black mb-3 mt-4">{children}</h6>
  ),
  paragraph: ({ children }) => (
    <p className="text-black leading-relaxed mb-4">{children}</p>
  ),
  preformatted: ({ children }) => (
    <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm mb-4">{children}</pre>
  ),
  strong: ({ children }) => (
    <strong className="font-bold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  listItem: ({ children }) => (
    <li className="text-black leading-relaxed ml-6 mb-2 list-disc">{children}</li>
  ),
  oListItem: ({ children }) => (
    <li className="text-black leading-relaxed ml-6 mb-2 list-decimal">{children}</li>
  ),
  list: ({ children }) => (
    <ul className="mb-4 space-y-1">{children}</ul>
  ),
  oList: ({ children }) => (
    <ol className="mb-4 space-y-1">{children}</ol>
  ),
  hyperlink: ({ children, node }) => (
    <a 
      href={node.data.url} 
      target={node.data.target || "_blank"} 
      rel="noopener noreferrer"
      className="text-[#FF322E] hover:underline"
    >
      {children}
    </a>
  ),
  image: ({ node }) => (
    <div className="my-6">
      <img 
        src={node.url} 
        alt={node.alt || ""} 
        className="w-full h-auto"
        loading="lazy"
      />
      {node.alt && (
        <p className="text-sm text-gray-600 mt-2">{node.alt}</p>
      )}
    </div>
  ),
};

export default function BlogDetail() {
  const { uid } = useParams();
  const contentContainerRef = useRef(null);
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptionState, setSubscriptionState] = useState({
    email: '',
    isSubmitting: false,
    message: '',
    messageType: ''
  });

  // Fetch blog post from Prismic
  useEffect(() => {
    async function fetchPost() {
      try {
        setIsLoading(true);
        const post = await client.getByUID("blog_post", uid);
        
        // Transform Prismic data
        const transformedPost = {
          id: post.id,
          uid: post.uid,
          title: asText(post.data.title),
          description: asText(post.data.excerpt),
          featuredImage: post.data.featured_image?.url || "",
          category: post.data.category || "Insights",
          readTime: post.data.read_time || "5 min read",
          author: post.data.author || "Ruby Turbett",
          publishDate: formatDate(post.data.publish_date),
          metaTitle: post.data.meta_title || "",
          metaDescription: post.data.meta_description || "",
          // Keep raw slices for rendering
          slices: post.data.body || [],
        };
        
        setBlogPost(transformedPost);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Blog post not found");
      } finally {
        setIsLoading(false);
      }
    }

    if (uid) {
      fetchPost();
    }
  }, [uid]);

  // Set page meta
  usePageMeta(
    blogPost ? (blogPost.metaTitle || `${blogPost.title} | Silo Creative Ramblings`) : 'Blog Post | Silo Creative',
    blogPost ? (blogPost.metaDescription || blogPost.description || 'Read the latest insights and ideas from Silo Creative on UGC, content strategy, and digital marketing.') : 'Read the latest insights and ideas from Silo Creative.'
  );

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setSubscriptionState({
        email: '',
        isSubmitting: false,
        message: 'Please enter a valid email address.',
        messageType: 'error'
      });
      return;
    }

    setSubscriptionState(prev => ({
      ...prev,
      isSubmitting: true,
      message: '',
      messageType: ''
    }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', email);
      
      setSubscriptionState({
        email: '',
        isSubmitting: false,
        message: 'Successfully subscribed to newsletter!',
        messageType: 'success'
      });
    } catch (error) {
      setSubscriptionState({
        email: '',
        isSubmitting: false,
        message: 'Failed to subscribe. Please try again.',
        messageType: 'error'
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-[1280px] px-4 md:px-0 py-12 mt-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              <p className="text-black text-lg mt-4">Loading post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error/Not found state
  if (error || !blogPost) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 mt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">Blog Post Not Found</h1>
            <p className="text-black mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              ← Back to Ramblings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render a slice based on its type
  const renderSlice = (slice, index) => {
    switch (slice.slice_type) {
      case 'text_block':
        return (
          <div key={index} className="mt-8 first:mt-0">
            {slice.items?.map((item, itemIndex) => (
              <div key={itemIndex} className="text-black leading-relaxed">
                <PrismicRichText field={item.content} components={richTextComponents} />
              </div>
            ))}
          </div>
        );
      
      case 'image_with_caption_':
        return (
          <div key={index} className="mt-12">
            {slice.items?.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-8">
                {item.image?.url && (
                  <div className="bg-white aspect-video overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image.url}
                      alt={item.image.alt || "Blog image"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                {item.caption && (
                  <p className="text-sm text-black mt-2 flex items-center gap-1">
                    <span className="mx-1" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0,0 0,16 16,16" fill="black" stroke="black" strokeWidth="1" />
                      </svg>
                    </span> 
                    {item.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        );
      
      case 'quote':
        return (
          <div key={index} className="mt-12 border border-black p-8">
            {slice.primary?.quote_text && (
              <blockquote className="text-lg md:text-xl text-black leading-relaxed mb-4">
                "<PrismicRichText field={slice.primary.quote_text} components={{
                  paragraph: ({ children }) => <span>{children}</span>,
                }} />"
              </blockquote>
            )}
            {slice.primary?.quote_author && (
              <p className="text-sm text-black flex items-center gap-1">
                <span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="0,0 0,16 16,16" fill="black" stroke="black" strokeWidth="1" />
                  </svg>
                </span> 
                {slice.primary.quote_author}
              </p>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white mt-20 min-h-[20vh]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-0 py-4">
        {/* Hero Section */}
        <Hero blogPost={blogPost} />

        {/* Content Container */}
        <div ref={contentContainerRef}>
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Left Column - Content (2/3 width) */}
            <div className="lg:col-span-2">
              {/* Render all slices */}
              {blogPost.slices.length > 0 ? (
                <div className="space-y-0">
                  {blogPost.slices.map((slice, index) => renderSlice(slice, index))}
                </div>
              ) : (
                <div className="text-black leading-relaxed">
                  <p>No content available for this post.</p>
                </div>
              )}
            </div>

            {/* Right Column - Newsletter Subscription (1/3 width) */}
            <div className="lg:col-span-1">
              <NewsletterSubscription 
                onSubmit={handleNewsletterSubmit}
                isSubmitting={subscriptionState.isSubmitting}
                message={subscriptionState.message}
                messageType={subscriptionState.messageType}
                containerRef={contentContainerRef}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
}
