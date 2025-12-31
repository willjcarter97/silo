import { useState, useRef } from "react";
import Hero from "../../components/BlogDetail/Hero";
import NewsletterSubscription from "../../components/BlogDetail/NewsletterSubscription";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function UGCvsTraditionalAds() {
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
      "Why UGC Is Outperforming Traditional Ads in 2025 and How Brands Are Adapting",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    author: "Ruby Turbott",
    publishDate: "12 Sept 2025",
    featuredImage:
      "https://images.prismic.io/silosite/aVUgm3NYClf9otsS_v1766219441_Placeholder_Image_voracu.png?auto=format,compress",
  };

  usePageMeta(
    "Why UGC Beats Traditional Ads in 2025",
    "UGC is outperforming traditional ads across every platform in 2025. See why consumers trust creators more and how brands scale UGC for results."
  );

  return (
    <div className="bg-white mt-20 min-h-[20vh]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-0 py-4">
        <Hero
          blogPost={blogPost}
          className="lg:!mt-10 lg:!mb-20 [&_.order-2]:md:h-[35vh] [&_.order-2]:lg:h-auto"
        />
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
                    User generated content has reshaped the digital advertising
                    landscape. In 2025, UGC is outperforming traditional brand
                    ads across every major platform — Meta, TikTok, YouTube
                    Shorts, and even Google Performance Max. Consumers trust
                    real people more than polished campaigns, and platforms are
                    rewarding authentic content in their algorithms.
                  </p>
                  <p className="font-dm font-normal">
                    UGC has become the highest performing, most cost efficient
                    creative format for brands. But understanding why it works
                    and how to scale it effectively is essential for long term
                    success.
                  </p>
                </div>
              </div>

              {/* The Authenticity Advantage */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  The Authenticity Advantage
                </h1>
                <p className="text-sm text-black font-dm font-normal mt-2 flex items-center gap-1 leading-6">
                  Audiences have grown desensitised to highly produced ads. They
                  feel overly polished and sales driven. UGC, on the other hand,
                  feels like a recommendation from a friend. It is relatable,
                  unfiltered, and rooted in real experiences.
                </p>
                <p className="text-sm text-black font-dm font-normal mt-2 flex items-center gap-1 leading-6">
                  People trust people, not brands. This shift has driven
                  enormous performance gains for UGC ads in 2025.
                </p>
                <div className="space-y-4 text-black leading-relaxed mt-4">
                  <p className="font-dm font-normal">
                    Users respond strongly to:
                  </p>
                  <ul className="list-disc text-sm text-black mt-2 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      Everyday creators
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Unscripted or lightly scripted delivery
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Honest reactions and real product usage
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Short, conversational storytelling
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    This authenticity translates directly into lower costs and
                    better results.
                  </p>
                </div>
              </div>

              {/* The Performance Benefits of UGC Ads */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  The Performance Benefits of UGC Ads
                </h1>
                <p className="leading-relaxed font-dm font-normal">
                  In 2025, UGC consistently outperforms traditional ads in key
                  metrics:{" "}
                </p>
                <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    <span className="font-bold">
                      Higher click through rates
                    </span>{" "}
                    due to relatable framing
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    <span className="font-bold">
                      Lower cost per acquisition
                    </span>{" "}
                    driven by stronger relevance
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    <span className="font-bold">Lower CPMs</span> on platforms
                    favouring raw content
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    <span className="font-bold">Stronger conversion rates</span>{" "}
                    thanks to increased trust
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    <span className="font-bold">
                      Faster content testing cycles
                    </span>{" "}
                    because UGC is inexpensive and quick to produce
                  </li>
                </ul>
                <p className="leading-relaxed font-dm font-normal">
                  Performance creatives now dominate paid advertising
                  strategies.
                </p>
              </div>

              {/* UGC vs Influencer vs Paid Creator Content */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  UGC vs Influencer vs Paid Creator Content
                </h1>
                <p className="text-black leading-relaxed font-dm font-normal">
                  UGC is not a single category. Understanding the differences
                  helps brands build a balanced content ecosystem.
                </p>
              </div>

              {/* Organic UGC */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  Organic UGC
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Unpaid customer content that brands can repost or repurpose.
                    Great for social proof and brand credibility.
                  </p>
                </div>
              </div>

              {/* Paid UGC */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  Paid UGC
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Creators produce content specifically for the brand, but not
                    as influencers. This is the most scalable and affordable
                    option for ads.
                  </p>
                </div>
              </div>

              {/* Influencer Content */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  Influencer Content
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Creators use their personal brand to promote products.
                    Useful for visibility, PR, and awareness.
                  </p>
                  <p className="font-dm font-normal">
                    In 2025, most brands rely on a combination of all three.
                  </p>
                </div>
              </div>

              {/* How Brands Build Scalable UGC Pipelines */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  How Brands Build Scalable UGC Pipelines
                </h1>
                <p className="font-dm font-normal mb-4">
                  Successful brands do not create UGC occasionally — they build
                  systems.
                </p>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    A scalable UGC pipeline includes:
                  </p>
                  <ul className="text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      1. Monthly creator sourcing
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      2. Clear briefs and shot lists
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      3. Multiple hooks and angles for each product
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      4. Editing support for ad ready versions
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      5. A B testing across platforms
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      6. Creative refreshes every 2 to 4 weeks
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    This system produces consistent performance and avoids
                    creative fatigue.
                  </p>
                </div>
              </div>

              {/* How Agencies Manage UGC Production */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  How Agencies Manage UGC Production
                </h1>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Agencies like Silo Creative provide end to end UGC
                    management so brands do not need to handle creator
                    logistics.
                  </p>
                  <p className="font-dm font-normal">This includes:</p>
                  <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      Sourcing and vetting creators
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Negotiating usage rights
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Building scripts and shot lists
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Directing creators
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Editing raw footage into ad variations
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Testing creative performance
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Scaling the top performing ads
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    This full service approach allows brands to effortlessly
                    scale UGC output.
                  </p>
                </div>
              </div>

              {/* AI and UGC: The Hybrid Future */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  AI and UGC: The Hybrid Future
                </h1>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    AI is accelerating UGC production even further:
                  </p>
                  <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      AI voiceovers replace reshoots
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      AI script assistants create stronger hooks
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      AI editors enhance pacing and colour
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      AI avatars generate evergreen content
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      AI tools create variations for testing
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    Creators still feature on screen, but AI amplifies their
                    output and reduces production friction.
                  </p>
                </div>
              </div>

              {/* Why UGC Is Here to Stay */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Why UGC Is Here to Stay
                </h1>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    UGC works because it aligns with how people consume media
                    today. It is authentic, fast, relatable, and effective.
                    Platforms are built for it. Algorithms reward it. Consumers
                    trust it.
                  </p>
                  <p className="font-dm font-normal">
                    Traditional ads still have value, but UGC is now the
                    backbone of digital performance.
                  </p>
                </div>
              </div>

              {/* Key Takeaways */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Key Takeaways
                </h1>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    In 2025, UGC is not just outperforming traditional ads, it
                    is redefining the structure of modern advertising. Brands
                    that build strong UGC systems, leverage creators, and use AI
                    to scale production will dominate the digital landscape in
                    the years ahead.
                  </p>
                </div>
              </div>

              {/* What’s next? */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  What’s next?
                </h1>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Want to launch or scale UGC for your brand? We source
                    creators, manage production, and deliver high performing UGC
                    ads that convert.
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
