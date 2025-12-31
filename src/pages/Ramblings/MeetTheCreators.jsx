import { useState, useRef } from "react";
import Hero from "../../components/BlogDetail/Hero";
import NewsletterSubscription from "../../components/BlogDetail/NewsletterSubscription";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function MeetTheCreators() {
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
    title: "Why 2025 Is the Year of Interactive Brand Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    author: "Ruby Turbott",
    publishDate: "12 Sept 2025",
    featuredImage:
      "https://images.prismic.io/silosite/aVUgcHNYClf9otrq_v1765960198_Placeholder_Image_kwdrqm.png?auto=format,compress",
  };

  usePageMeta(
    "Interactive Web Experiences: 2025 Design Trends",
    "Web design is evolving fast. Discover 2025’s shift from static websites to interactive, personalised web experiences that engage and convert users."
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
                    Web design has undergone a major transformation. Traditional
                    static websites are no longer enough to hold user attention
                    or communicate brand identity effectively. In 2025, the rise
                    of interactive web experiences is reshaping how users
                    interact with brands online. These experiences prioritise
                    motion, personalization, and storytelling, creating deeper
                    emotional connections and higher conversion rates.
                  </p>
                </div>
              </div>

              {/* The Authenticity Advantage */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  The Authenticity Advantage
                </h1>
                <p className="text-sm text-black font-dm font-normal mt-2 flex items-center gap-1 leading-6">
                  Static websites were built to display information, but modern
                  users want engagement. With attention spans shrinking and
                  expectations growing, a flat, non responsive website feels
                  outdated. Users now expect fluid movement, responsive layouts,
                  dynamic transitions, and interfaces that feel intuitive and
                  alive.
                </p>
                <p className="text-sm text-black font-dm font-normal mt-2 flex items-center gap-1 leading-6">
                  Slow load times, rigid structure, and lack of interaction
                  directly reduce engagement. Brands must evolve their digital
                  presence to match user behaviour.
                </p>
              </div>

              {/* Rise of Micro Interactions */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Rise of Micro Interactions
                </h1>
                <p className="text-sm text-black mt-2 flex items-center gap-1 font-dm font-normal">
                  Micro interactions are small animated moments that guide users
                  through a site. They create a sense of responsiveness and
                  enhance usability without overwhelming the design.
                </p>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">Examples include:</p>
                  <ul className="list-disc text-sm text-black mt-2 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      Buttons that subtly animate when hovered
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Navigation elements that reveal motion cues
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Scroll triggered animations
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Product cards that tilt or shift as the cursor moves
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Loading screens with fluid motion
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    These small details significantly improve the user
                    experience by creating feedback and emotional reinforcement.
                  </p>
                </div>
              </div>

              {/* AI Driven Personalisation */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  AI Driven Personalisation
                </h1>
                <p className="leading-relaxed font-dm font-normal">
                  AI is reshaping how websites deliver content. Instead of a one
                  size fits all homepage, websites in 2025 adjust layouts and
                  messaging based on user data.
                </p>
                <p className="leading-relaxed font-dm font-normal">
                  AI personalisation enables:{" "}
                </p>
                <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    Dynamic CTAs based on user behaviour
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Tailored product recommendations
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Customised landing pages
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Adaptive content blocks that update in real time
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Behaviour driven copy and colour schemes
                  </li>
                </ul>
                <p className="leading-relaxed font-dm font-normal">
                  This level of personalisation makes every visit feel more
                  relevant, increasing conversion rates and session duration.
                </p>
              </div>

              {/* Motion UI as a Core Brand Asset */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Motion UI as a Core Brand Asset
                </h1>
                <p className="text-black leading-relaxed font-dm font-normal">
                  Motion is no longer decorative. It is strategic. Brands now
                  use intentional motion to communicate personality, guide
                  attention, and emphasise key moments in the user journey.
                </p>
                <p className="text-black leading-relaxed font-dm font-normal">
                  Motion UI examples include:
                </p>
                <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                  <li className="ml-5 font-dm font-normal">
                    Animated hero sections that introduce the brand story
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Transition effects that create flow between sections
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Parallax effects that add depth
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Character or illustration animations
                  </li>
                  <li className="ml-5 font-dm font-normal">
                    Interactive product demos
                  </li>
                </ul>
                <p className="text-black leading-relaxed font-dm font-normal">
                  Strong Motion UI elevates brand identity and makes websites
                  memorable.
                </p>
              </div>

              {/* WebGL and 3D Immersive Environments */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  WebGL and 3D Immersive Environments
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    WebGL and Three js have unlocked powerful 3D experiences
                    inside the browser. In 2025, brands of all sizes can
                    integrate immersive visual storytelling that once required
                    expensive development.
                  </p>
                  <p className="font-dm font-normal">Examples include:</p>
                  <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      Interactive 3D product showcases
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Virtual walkthroughs
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Animated backgrounds with physics and depth
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Interactive scenes triggered by cursor or scroll
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Gamified experiences integrated into the site
                    </li>
                  </ul>
                  <p className="text-black leading-relaxed font-dm font-normal">
                    These experiences stand out, build brand affinity, and
                    increase engagement.
                  </p>
                </div>
              </div>

              {/* Key Takeaways */}
              <div>
                <h2 className="text-3xl font-bold font-epilogue text-black mb-6">
                  Key Takeaways
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    2025 marks a full shift away from static websites and toward
                    dynamic web experiences. Users want interaction, motion, and
                    moments of delight. Brands that embrace micro interactions,
                    personalisation, motion UI, and immersive 3D environments
                    will deliver stronger engagement and set themselves apart in
                    a crowded digital landscape.
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
                    If your website no longer reflects the experience your brand
                    deserves, let’s elevate it with interactive design, motion,
                    and personalised user journeys.
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
