import { useState, useRef } from "react";
import Hero from "../../components/BlogDetail/Hero";
import NewsletterSubscription from "../../components/BlogDetail/NewsletterSubscription";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function SocialAlgorithmChanges() {
  const contentContainerRef = useRef(null);
  const [subscriptionState, setSubscriptionState] = useState({
    email: "",
    isSubmitting: false,
    message: "",
    messageType: "",
  });

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setSubscriptionState({
        email: "",
        isSubmitting: false,
        message: "Please enter a valid email address.",
        messageType: "error",
      });
      return;
    }

    setSubscriptionState((prev) => ({
      ...prev,
      isSubmitting: true,
      message: "",
      messageType: "",
    }));

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Newsletter subscription:", email);

      setSubscriptionState({
        email: "",
        isSubmitting: false,
        message: "Successfully subscribed to newsletter!",
        messageType: "success",
      });
    } catch (error) {
      setSubscriptionState({
        email: "",
        isSubmitting: false,
        message: "Failed to subscribe. Please try again.",
        messageType: "error",
      });
    }
  };

  // Hardcoded content structure
  const blogPost = {
    id: 1,
    image:
      "https://images.prismic.io/silosite/aVUgbXNYClf9otrl_v1765960191_1_rr3wzk.png?auto=format,compress",
    category: "UGC",
    readTime: "5 min read",
    title:
      "Meta, TikTok and YouTube: The Biggest Social Algorithm Changes of 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    author: "Ruby Turbett",
    publishDate: "12 Sept 2025",
    featuredImage:
      "https://images.prismic.io/silosite/aVUgbnNYClf9otrn_v1765960193_3_prz7yp.png?auto=format,compress",
  };

  usePageMeta(
    "2025 Social Media Algorithm Updates Explained",
    "Stay ahead of the biggest TikTok, Meta and YouTube algorithm changes in 2025. Understand what’s new and how to adapt your social strategy."
  );

  return (
    <div className="bg-white mt-20 min-h-[20vh]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-0 py-4">
        <Hero blogPost={blogPost} />
        <div ref={contentContainerRef}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Left Content Column (2/3 width) */}
            <div className="lg:col-span-2 space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Introduction
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Every major social platform has made significant algorithm
                    updates in 2025, fundamentally reshaping how content is
                    ranked and discovered. For brands, these changes affect
                    reach, engagement, ad performance, and content strategy.
                    Understanding these shifts is critical for staying
                    competitive in an increasingly AI driven recommendation
                    landscape.
                  </p>
                </div>
              </div>

              {/* TikTok */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Why Minimalism Is Losing Impact
                </h1>
                <p className="text-sm text-black font-dm font-normal mt-2 flex items-center gap-1 leading-6">
                  TikTok has evolved beyond an entertainment platform and it is
                  now a top search engine for Gen Z and Gen Alpha. The algorithm
                  now places far greater emphasis on search intent and keyword
                  relevance. This means that:
                </p>
                <ul className="list-disc text-sm text-black mt-2 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    Captions should include clear, searchable language
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Hooks should mirror the phrasing users search for
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    TikTok wants deeper educational and tutorial style content
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    TikTok wants more vertical videos
                  </li>
                </ul>
                <p className="text-sm text-black mt-5 flex items-center gap-1 font-dm font-normal">
                  Longer videos between 30 and 90 seconds are also favoured,
                  especially when they deliver value. TikTok Series continues to
                  grow, rewarding creators and brands who produce episodic
                  content. Localised recommendations have improved too, meaning
                  region specific content can perform exceptionally well.
                </p>
                <p className="text-sm text-black mt-2 flex items-center gap-1 font-dm font-normal">
                  Brands must now optimise TikTok content the same way they
                  optimise blog posts: with intentional keywords, structured
                  topics, and clear narrative value.
                </p>
              </div>

              {/* Meta and Instagram */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Meta and Instagram: AI Recommendation Rules Everything
                </h1>
                <p className="text-sm text-black mt-2 flex items-center gap-1 font-dm font-normal">
                  Meta’s 2025 algorithm is driven by AI led recommendations
                  rather than follower feeds. This means a brand’s content is
                  shown less to their own followers and more to interest based
                  audiences selected by the algorithm.
                </p>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">Key changes include:</p>
                  <ul className="list-disc text-sm text-black mt-2 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      Reach is now determined by viewer retention rather than
                      aesthetic quality
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Reels continue to outperform static images
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Comments and saves impact distribution far more than likes
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Threads activity influences Instagram discovery
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Notes helps build direct engagement signals
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    Instagram heavily rewards experimental content, meaning
                    brands must push higher output volume and faster iteration
                    cycles to achieve consistent reach.
                  </p>
                </div>
              </div>

              {/* YouTube */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  YouTube: Long Form Is Back, Powered by Shorts Discovery
                </h1>
                <p className="leading-relaxed font-dm font-normal">
                  YouTube has entered a new phase in 2025 where long form and
                  Shorts work hand in hand. Shorts are now a major discovery
                  tool, sending traffic directly into long form videos and
                  improving channel growth.
                </p>
                <p className="leading-relaxed font-dm font-normal">
                  Key algorithm updates:{" "}
                </p>
                <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    Longer videos between 7 and 12 minutes are being pushed
                    toward new viewers
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Watch time is still the top ranking signal, but pacing and
                    structure matter more
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    High quality captions improve retention and accessibility
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Educational and how to content is performing extremely well
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Community posts influence visibility across the platform
                  </li>
                </ul>
                <p className="leading-relaxed font-dm font-normal">
                  For brands, this means diversifying content formats and
                  ensuring every long form video is paired with several Shorts
                  that act as teasers.
                </p>
              </div>

              {/* Paid Social */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Paid Social: Creatives Matter More Than Targeting
                </h1>
                <p className="text-black leading-relaxed font-dm font-normal">
                  With targeting restrictions increasing and privacy rules
                  tightening, paid social algorithms now rely heavily on
                  creative quality and variation. Meta and TikTok favour ad
                  accounts that produce:
                </p>
                <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    High volume creative testing
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Frequent refreshes to avoid creative fatigue
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Clear mobile first framing
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Story oriented structures rather than traditional ads
                  </li>
                </ul>
                <p className="text-black leading-relaxed font-dm font-normal">
                  AI assisted creative tools inside ad managers provide guidance
                  on which ads are likely to perform best.
                </p>
              </div>

              {/* Key Takeaways */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  Key Takeaways
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    The 2025 algorithms demand agility, volume, and value driven
                    content. Brands who adopt search optimised TikTok
                    strategies, motion led Instagram content, and hybrid YouTube
                    systems will outperform those relying on outdated
                    approaches. Staying ahead means adapting quickly to each
                    platform’s evolving behaviour.
                  </p>
                </div>
              </div>

              {/* What’s next? */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  What’s next?
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Need help adapting your content strategy to the latest
                    algorithm changes? We build agile, data driven social
                    systems designed to grow with the platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content Column (1/3 width) - Contains Newsletter */}
            <div className="lg:col-span-1 relative">
              <div className="lg:sticky lg:top-32 h-fit">
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
      </div>
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
}
