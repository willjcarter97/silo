import { useState, useRef } from "react";
import Hero from "../../components/BlogDetail/Hero";
import NewsletterSubscription from "../../components/BlogDetail/NewsletterSubscription";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function BrandIdentityShift() {
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
      "https://images.prismic.io/silosite/aVUgbnNYClf9otrm_v1765960191_2_gtiyqf.png?auto=format,compress",
    category: "UGC",
    readTime: "5 min read",
    title:
      "The 2025 Brand Identity Shift: Minimalism Out, Motion Led Design In",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    author: "Ruby Turbott",
    publishDate: "12 Sept 2025",
    featuredImage:
      "https://images.prismic.io/silosite/aVUgbnNYClf9otrm_v1765960191_2_gtiyqf.png?auto=format,compress",
  };

  usePageMeta(
    "2025 Brand Identity Trends: Motion Led Design",
    "Explore 2025’s biggest branding shift from minimalism to motion led design. Learn how dynamic identities help brands stand out across digital channels."
  );

  return (
    <div className="bg-white mt-20 min-h-[20vh]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-0 py-4">
        <Hero blogPost={blogPost} />
        <div ref={contentContainerRef}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Left Content Column (2/3 width) - Contains Intro AND Body */}
            <div className="lg:col-span-2 space-y-12">
              {/* Introduction Section */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Introduction
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Brand identity has entered a dramatic new phase. The
                    minimalist, flat, ultra clean branding that dominated the
                    2010s has reached saturation. With digital platforms now
                    prioritising movement, immersive content, and dynamic
                    experiences, brands must evolve to remain distinctive. In
                    2025, motion led design, expressive visual systems, deep
                    textures, and adaptive logos are setting the new standard.
                    Brands are no longer designing for static placements. They
                    are designing for a world made of motion.
                  </p>
                </div>
              </div>

              {/* Why Minimalism Is Losing Impact */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  Why Minimalism Is Losing Impact
                </h1>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Minimalism succeeded because it brought clarity and
                    scalability across platforms. But as more brands adopted the
                    same stripped back look, the visual landscape became
                    repetitive. Countless companies ended up with nearly
                    identical sans serif logos, neutral palettes, and flat
                    shapes.
                  </p>
                  <p className="font-dm font-normal">
                    In a fast paced digital environment dominated by short form
                    video, this sameness is hurting brand recognition. Modern
                    audiences scroll at speed and content is consumed in motion
                    first contexts, meaning static, minimal identities simply do
                    not stop the scroll anymore. Brands need to be expressive,
                    visually reactive, and memorable at a glan
                  </p>
                </div>
              </div>

              {/* The Rise of Motion First Branding */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  The Rise of Motion First Branding
                </h1>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Motion led branding is no longer a niche approach. It is
                    becoming the foundation of modern brand identity systems.
                    Instead of designing a logo and later creating animations,
                    brands are now designing with movement from the outset
                  </p>
                  <p className="font-dm font-normal">
                    Motion first branding includes:
                  </p>
                  <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      Logos that transform or react to sound
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Typography that flexes, stretches, and animates
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Graphic assets that shift based on user interaction
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Fluid color changes and pattern behaviours
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Identity guidelines that specify motion rules
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    This makes each brand feel alive and creates instant
                    recognition across social media. Platforms like TikTok,
                    Instagram Reels, and YouTube Shorts amplify brands that
                    move. As a result, dynamic design has become a performance
                    advantage.
                  </p>
                </div>
              </div>

              {/* 3D and CGI Aesthetics Become Mainstream */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-epilogue text-black mb-6">
                  3D and CGI Aesthetics Become Mainstream
                </h1>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    3D design was once reserved for large budget brands, but
                    tools like Blender, Unreal Engine, and Cinema 4D have made
                    advanced visuals accessible. In 2025, 3D elements will
                    appear in brand worlds across industries - from tech and
                    ecommerce to beauty and lifestyle.
                  </p>
                  <p className="font-dm font-normal">
                    Brands use 3D to introduce texture, depth, and emotional
                    impact. A 3D rendered product rotating on screen tells a
                    richer story than a flat image. CGI patterns and animated
                    compositions are being used in backgrounds, transitions, and
                    social ads. This adds visual excitement that stands out in
                    crowded feeds.
                  </p>
                </div>
              </div>

              {/* Kinetic Logos and Adaptive Systems */}
              <div>
                <h2 className="text-3xl md:text-3xl font-bold font-epilogue text-black mb-6">
                  Kinetic Logos and Adaptive Systems
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Kinetic logos are now a central part of brand systems. They
                    are designed with multiple states, allowing them to shift
                    shapes, adjust layouts, or evolve depending on the platform.
                  </p>
                  <p className="font-dm font-normal">For example: </p>
                  <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      A logo may expand for widescreen formats and compress for
                      mobile
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Colour variations may animate in video contexts
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Shapes may pulse to music or animate with scroll
                      interactions
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    These adaptive identities give brands flexibility while
                    maintaining coherence.
                  </p>
                </div>
              </div>

              {/* Colour Trends for 2025 */}
              <div>
                <h2 className="text-3xl md:text-3xl font-bold font-epilogue text-black mb-6">
                  Colour Trends for 2025
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Colour plays a major role in this new era of expressive
                    design. In 2025, the dominant colour themes include:
                  </p>
                  <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      <span className="font-bold">Holographic gradients</span>{" "}
                      that evoke futuristic energy
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      <span className="font-bold">
                        Chrome and metallic effects
                      </span>{" "}
                      used in motion transitions
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      <span className="font-bold">
                        Neon and digital futurism palettes
                      </span>{" "}
                      for memorable contrast
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      <span className="font-bold">
                        Soft glows and blurred light effects
                      </span>{" "}
                      to add modern depth
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      <span className="font-bold">Bold duotones</span> that
                      enhance movement
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    These colour styles work particularly well in dynamic
                    environments, helping brands feel contemporary and premium.
                  </p>
                </div>
              </div>

              {/* Brand Design Built for Short Form Video */}
              <div>
                <h2 className="text-3xl md:text-3xl font-bold font-epilogue text-black mb-6">
                  Brand Design Built for Short Form Video
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="font-dm font-normal">
                    Because social platforms reward content that moves, brand
                    identities must be optimised for video performance. This
                    means logos, type systems, and graphics must animate
                    smoothly, compress well, and feel vibrant in fast paced
                    timelines.
                  </p>
                  <p className="font-dm font-normal">Brands now build:</p>
                  <ul className="list-disc text-sm text-black my-5 font-dm flex flex-col items-start gap-1 space-y-5">
                    <li className="ml-5 font-dm font-normal">
                      Animated logo reveals
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Moving type transitions
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Scroll based behaviours
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Short animated brand stings
                    </li>
                    <li className="ml-5 font-dm font-normal">
                      Motion graphic templates for social teams
                    </li>
                  </ul>
                  <p className="font-dm font-normal">
                    The result is a brand system that enhances content rather
                    than hindering it.
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
                    The future of brand identity is expressive, dynamic, and
                    built for movement. Minimalism has given way to bold, motion
                    led systems that thrive in digital environments. In 2025,
                    brands who embrace motion will stand out. Those who stay
                    static risk fading into the background.
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
                    If your brand identity is starting to feel flat or outdated,
                    let’s create a modern, motion led design system that stands
                    out across every platform.
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
