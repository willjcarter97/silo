import { useState, useRef } from "react";
import Hero from "../../components/BlogDetail/Hero";
import NewsletterSubscription from "../../components/BlogDetail/NewsletterSubscription";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function TheRiseOfAI() {
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
    title: "The Rise of AI-Powered Content Creation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    author: "Ruby Turbott",
    publishDate: "12 Sept 2025",
    featuredImage:
      "https://images.prismic.io/silosite/aVUgbXNYClf9otrl_v1765960191_1_rr3wzk.png?auto=format,compress",
  };

  usePageMeta(
    "AI-Powered Content Creation: 2025 Guide for Brands",
    "Discover how AI tools are transforming content creation in 2025. Learn how brands scale production, boost quality, and streamline social media workflows."
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
                    Content demand has grown exponentially over the past five
                    years. With more platforms, more formats, and more
                    competition, brands are under pressure to publish high
                    quality content at a pace that was unthinkable a decade ago.
                    In 2025, AI has become the most transformative solution for
                    meeting this demand. It is not a shortcut or a gimmick. AI
                    powered content creation is now a core part of how modern
                    marketing teams plan, produce, and scale social media
                    output.
                  </p>
                  <p className="font-dm font-normal">
                    AI tools are reshaping everything from ideation and
                    scripting to editing, design, and performance analysis.
                    Brands of every size are adopting AI not to replace creative
                    teams, but to empower them to work faster, smarter, and with
                    greater consistency. AI has become the new creative partner
                    that never sleeps.
                  </p>
                </div>
              </div>

              {/* Why AI Has Become Essential */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Why AI Has Become Essential in Content Production
                </h1>
                <p className="text-sm text-black font-dm font-normal mt-2 flex items-center gap-1 leading-6">
                  The volume of content needed to stay competitive online is
                  overwhelming. A single campaign might require long form video,
                  Reels, TikToks, carousels, static assets, blogs, landing page
                  content, and paid ad variations. Without AI, these demands
                  create bottlenecks, burnout, and creative fatigue.
                </p>
                <p className="text-lg font-dm font-normal text-black mt-2 flex items-center gap-1">
                  AI has become essential because it:
                </p>
                <ul className="list-disc text-sm text-black mt-2 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    Generates concepts at speed
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Removes repetitive manual tasks
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Automates editing steps
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Maintains brand voice consistency
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Provides data driven content recommendations
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Supports faster experimentation and testing
                  </li>
                </ul>
                <p className="text-sm text-black mt-2 flex items-center gap-1 font-dm font-normal">
                  By cutting production time and boosting efficiency, AI makes
                  it possible for brands to maintain a high content output
                  without compromising quality.
                </p>
              </div>

              {/* The AI Tools Dominating 2025 */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  The AI Tools Dominating 2025
                </h1>
              </div>

              {/* AI Video Tools */}
              <div>
                <h2 className="text-3xl md:text-3xl font-bold font-epilogue text-black mb-6">
                  AI Video Tools
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    AI video generation has seen major breakthroughs. Tools like
                    Sora, Runway Gen 3, and Pika allow brands to create
                    cinematic style video assets without costly shoots. They
                    support text to video creation, motion design, scene
                    expansion, and automated editing
                  </p>
                  <p className="font-dm font-normal">
                    AI driven editors like Opus Clip and Wisecut repurpose long
                    form videos into short clips optimised for Reels and TikTok,
                    removing filler words, adding subtitles, and highlighting
                    key moments automatically.
                  </p>
                </div>
              </div>

              {/* Visual and Design AI */}
              <div>
                <h2 className="text-3xl md:text-3xl font-bold font-epilogue text-black mb-6">
                  Visual and Design AI
                </h2>
                <p className="leading-relaxed font-dm font-normal">
                  Midjourney 7 and Ideogram enable teams to generate creative
                  concepts, moodboards, color palettes, and mockups in minutes.
                  This dramatically speeds up early stage creative alignment and
                  allows teams to explore more ideas before committing to a
                  direction.
                </p>
              </div>

              {/* AI Writing and Scripting Tools */}
              <div>
                <h2 className="text-3xl md:text-3xl font-bold font-epilogue text-black mb-6">
                  AI Writing and Scripting Tools
                </h2>
                <p className="leading-relaxed font-dm font-normal">
                  ChatGPT and Gemini are now fixtures in content teams. They
                  help write:{" "}
                </p>
                <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    Social media captions
                  </li>
                  <li className="ml-5 font-dm font-normal">Creative scripts</li>
                  <li className="ml-5 font-dm font-normal">Blog drafts</li>
                  <li className="ml-5 font-dm font-normal">Ad variations</li>
                  <li className="ml-5 font-dm font-normal">
                    Brand voice frameworks
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Content repurposing
                  </li>
                </ul>
                <p className="leading-relaxed font-dm font-normal">
                  Writers still shape and refine the final output, but AI
                  accelerates the early stages
                </p>
              </div>

              {/* AI Scheduling and Analytics Tools */}
              <div>
                <h2 className="text-3xl md:text-3xl font-bold font-epilogue text-black mb-6">
                  AI Scheduling and Analytics Tools
                </h2>
                <p className="text-black leading-relaxed font-dm font-normal">
                  Platforms like Metricool AI, Later AI, and Hootsuite
                  Intelligence analyse posting patterns and audience behaviour,
                  offering insights on when to post, what to post, and how to
                  optimise future content.
                </p>
              </div>

              {/* How Brands Are Integrating AI */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  How Brands Are Integrating AI Into Real Workflows
                </h1>
                <p className="text-black leading-relaxed font-dm font-normal">
                  AI is now a natural part of the entire content lifecycle.
                </p>
              </div>

              {/* 1. Ideation */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  1. Ideation
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Teams begin with AI assisted brainstorming. They use AI to
                    generate hooks, visual directions, campaign themes, and
                    creative prompts that kickstart production.
                  </p>
                </div>
              </div>

              {/* 2. Pre Production */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  2. Pre Production
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Shot lists, storyboards, scripts, and design references are
                    created with AI support, allowing teams to align faster and
                    move into production with clarity.
                  </p>
                </div>
              </div>

              {/* 3. Production and Editing */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  3. Production and Editing
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    AI enhances footage, cleans audio, adjusts lighting,
                    generates B roll, and creates multiple edits of the same
                    asset for different platforms.
                  </p>
                </div>
              </div>

              {/* 4. Distribution */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  4. Distribution
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    AI writes captions, selects hashtags, resizes assets, and
                    schedules posts automatically.
                  </p>
                </div>
              </div>

              {/* 5. Performance Analysis */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  5. Performance Analysis
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    AI identifies what performs well, what needs improvement,
                    and which content types should be scaled next
                  </p>
                  <p className="text-black leading-relaxed font-dm font-normal mt-4">
                    The result is a streamlined end to end workflow that reduces
                    bottlenecks and unlocks higher output.
                  </p>
                </div>
              </div>

              {/* Where AI Works Best */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Where AI Works Best and Where Humans Still Lead
                </h1>
                <p className="text-black leading-relaxed font-dm font-normal">
                  AI is exceptional at speed, automation, and pattern
                  recognition. But creativity still requires human emotion,
                  taste, and judgment.
                </p>
              </div>

              {/* AI excels at */}
              <div>
                <h2 className="text-xl font-bold font-epilogue text-black mb-6">
                  AI excels at:
                </h2>
                <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    Repetitive editing tasks
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Content variations
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Structural writing
                  </li>
                  <li className="ml-5 font-dm font-normal">Visual concepts</li>
                  <li className="ml-5 font-dm font-normal">Data analysis</li>
                </ul>
              </div>

              {/* Humans excels at */}
              <div>
                <h2 className="text-xl font-bold font-epilogue text-black mb-6">
                  Humans excels at:
                </h2>
                <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">Storytelling</li>
                  <li className="ml-5 font-dm font-normal">Brand identity</li>
                  <li className="ml-5 font-dm font-normal">Emotional tone</li>
                  <li className="ml-5 font-dm font-normal">
                    Creative intuition
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Final quality control
                  </li>
                </ul>
                <p className="text-black leading-relaxed font-dm font-normal mt-4">
                  The most successful brands use AI to empower creatives, not
                  replace them
                </p>
              </div>

              {/* Risks and Limitations */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Risks and Limitations
                </h1>
                <p className="text-black leading-relaxed font-dm font-normal">
                  AI must be used responsibly. Over reliance can dilute brand
                  identity, create generic outputs, or introduce inaccuracies.
                  Human oversight is crucial.
                </p>
              </div>

              {/* Challenges include */}
              <div>
                <h2 className="text-xl font-bold font-epilogue text-black mb-6">
                  Challenges include:
                </h2>
                <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    Ensuring accuracy
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Maintaining originality
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Avoiding creative sameness
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Protecting brand safety
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Preventing over automation
                  </li>
                </ul>
                <p className="text-black leading-relaxed font-dm font-normal mt-4">
                  Brands must strike a balance between AI efficiency and human
                  creativity.
                </p>
              </div>

              {/* Key Takeaways */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Key Takeaways
                </h1>
                <p className="text-black leading-relaxed font-dm font-normal">
                  AI powered content creation has become an essential part of
                  modern social media production. It speeds up workflows,
                  enhances creativity, and helps brands scale effortlessly. In
                  2025, the brands that thrive will be those that embrace AI as
                  a collaborative tool, combining human imagination with
                  intelligent automation.
                </p>
              </div>

              {/* What’s next? */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  What’s next?
                </h1>
                <p className="text-black leading-relaxed font-dm font-normal">
                  Ready to integrate AI into your content workflow? We can help
                  you build smarter, faster, AI supported systems that scale
                  your social output without sacrificing creativity.
                </p>
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
