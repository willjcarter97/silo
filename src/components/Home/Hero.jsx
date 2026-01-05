import { useState, useEffect } from "react";
import { client } from "../../prismicio";
import { SiloHoverBanner } from "./SiloHoverBanner";
import LogoLoop from "../Common/LogoLoop";
import VideoAndWelcome from "./VideoAndWelcome";
import ContentAndDone from "./ContentAndDone";
import ReadyWhenYouArePrismic from "../Common/ReadyWhenYouArePrismic";
import LazySection from "../Common/LazySection";
import LazyElement from "../Common/LazyElement";
import "../../styles/scaling-overrides.css";

// Default logos used if Prismic data is not available
const DEFAULT_LOGOS = [
  {
    src: "https://images.prismic.io/silosite/aVUgP3NYClf9otrF_v1765878090_Vector_1_g3nkgs.png?auto=format,compress",
    alt: "logo1",
    style: { width: "50px", height: "auto" },
  },
  {
    src: "https://images.prismic.io/silosite/aVUgPnNYClf9otrE_v1765878090_image_7_irnf5t.png?auto=format,compress",
    alt: "logo2",
    style: { height: "30px" },
  },
  {
    src: "https://images.prismic.io/silosite/aVUgQHNYClf9otrG_v1765878091_Layer_o43ajs.png?auto=format,compress",
    alt: "logo3",
  },
  {
    src: "https://images.prismic.io/silosite/aVUgRnNYClf9otrM_v1765882727_Untitled_Project_smo9qt.jpg?auto=format,compress",
    alt: "logo4",
    style: { width: "80px", height: "auto" },
  },
  {
    src: "https://images.prismic.io/silosite/aVUgSXNYClf9otrP_v1765884632_Tomoko-e10fd11f_2_jto3ax.png?auto=format,compress",
    alt: "logo5",
    style: { width: "90px", height: "auto" },
  },
  {
    src: "https://images.prismic.io/silosite/aVUgSHNYClf9otrO_v1765884632_image_5_ibtcoo.png?auto=format,compress",
    alt: "logo6",
    style: { width: "100px", height: "auto" },
  },
];

// Default values for home page content
const DEFAULT_HOME_DATA = {
  heroSvgImage: "https://silosite.cdn.prismic.io/silosite/aVUgoXNYClf9otsY_v1762717235_hero_hyl0xu.svg",
  heroTagline: "Used by companies who know what works.",
  clientLogos: DEFAULT_LOGOS,
  showVideo: false,
  videoUrl: "https://player.vimeo.com/video/76979871",
  heroImage: "https://images.prismic.io/silosite/aVUgonNYClf9otsZ_v1762717240_image_re2b0o.png?auto=format,compress",
  welcomeHeading: "We are the creative agency for brands that want stronger strategy, better design, smarter websites and content that truly connects",
  welcomeDescription: "We create content first, personality driven work that delivers real results and elevates your brand. Our approach unites strategic management, bold design, brand development, seamless websites and authentic creator content into one cohesive, creative and engaging experience across every digital touchpoint.",
  aboutButtonText: "About us",
  aboutButtonLink: "/about",
  secondaryLinkText: "Let's Talk",
  secondaryLinkUrl: "/contact",
  servicesHeading: "This is simply what we do",
  serviceCards: [],
  caseStudiesHeading: "Stuff we've done",
  caseStudiesSubheading: "Just some of the brands we've worked with",
  viewAllButtonText: "View all",
  viewAllButtonLink: "/case-studies",
};

/**
 * Helper to resolve Prismic Link fields to URLs
 */
const resolveLinkUrl = (linkField, fallback = null) => {
  if (!linkField) return fallback;
  
  // Web links
  if (linkField.link_type === "Web" || linkField.url) {
    return linkField.url;
  }
  
  // Document links (internal)
  if (linkField.link_type === "Document" && linkField.uid) {
    const typeRoutes = {
      home_page: "/",
      case_study: `/case-studies/${linkField.uid}`,
      blog_post: `/blog/${linkField.uid}`,
    };
    return typeRoutes[linkField.type] || `/${linkField.uid}`;
  }
  
  return fallback;
};

/**
 * Helper to extract plain text from Prismic Rich Text
 */
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  if (Array.isArray(richTextField)) {
    return richTextField.map((block) => block.text || "").join(" ");
  }
  return "";
};

export default function Hero() {
  const [homeData, setHomeData] = useState(DEFAULT_HOME_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHomePageData() {
      try {
        const response = await client.getSingle("home_page");
        
        if (response?.data) {
          const data = response.data;
          
          // Transform client logos from Prismic format
          const clientLogos = data.client_logos?.length > 0
            ? data.client_logos.map((logo, index) => ({
                src: logo.logo_image?.url || DEFAULT_LOGOS[index]?.src || "",
                alt: logo.logo_alt || `logo${index + 1}`,
                style: logo.logo_width ? { width: `${logo.logo_width}px`, height: "auto" } : undefined,
              }))
            : DEFAULT_LOGOS;

          // Transform service cards from Prismic format
          const serviceCards = data.service_cards?.length > 0
            ? data.service_cards.map((card) => ({
                image: card.service_image?.url || "",
                imageAlt: card.service_image?.alt || card.service_title || "",
                title: card.service_title || "",
                description: card.service_description || "",
                link: resolveLinkUrl(card.service_link),
              }))
            : [];

          setHomeData({
            heroSvgImage: data.hero_svg_image?.url || DEFAULT_HOME_DATA.heroSvgImage,
            heroTagline: data.hero_tagline || DEFAULT_HOME_DATA.heroTagline,
            clientLogos,
            showVideo: data.show_video || false,
            videoUrl: data.video_url || DEFAULT_HOME_DATA.videoUrl,
            heroImage: data.hero_image?.url || DEFAULT_HOME_DATA.heroImage,
            welcomeHeading: data.welcome_heading || DEFAULT_HOME_DATA.welcomeHeading,
            welcomeDescription: asText(data.welcome_description) || DEFAULT_HOME_DATA.welcomeDescription,
            aboutButtonText: data.about_button_text || DEFAULT_HOME_DATA.aboutButtonText,
            aboutButtonLink: resolveLinkUrl(data.about_button_link, DEFAULT_HOME_DATA.aboutButtonLink),
            secondaryLinkText: data.secondary_link_text || DEFAULT_HOME_DATA.secondaryLinkText,
            secondaryLinkUrl: resolveLinkUrl(data.secondary_link_url, DEFAULT_HOME_DATA.secondaryLinkUrl),
            servicesHeading: data.services_heading || DEFAULT_HOME_DATA.servicesHeading,
            serviceCards,
            caseStudiesHeading: data.case_studies_heading || DEFAULT_HOME_DATA.caseStudiesHeading,
            caseStudiesSubheading: data.case_studies_subheading || DEFAULT_HOME_DATA.caseStudiesSubheading,
            viewAllButtonText: data.view_all_button_text || DEFAULT_HOME_DATA.viewAllButtonText,
            viewAllButtonLink: resolveLinkUrl(data.view_all_button_link, DEFAULT_HOME_DATA.viewAllButtonLink),
          });
        }
      } catch (error) {
        console.warn("Could not fetch home page data from Prismic:", error.message);
        // Keep default data
      } finally {
        setIsLoading(false);
      }
    }

    fetchHomePageData();
  }, []);

  return (
    <>
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Full screen hero section - using min-h to prevent overlap on smaller screens */}
        <div className="w-full 2xl:min-h-[calc(100vh-80px)] xl:min-h-[calc(100vh-80px)] lg:h-auto md:min-h-[60vh] min-h-fit h-auto flex flex-col justify-between gap-6 md:gap-8">
          <SiloHoverBanner
            svgSrc={homeData.heroSvgImage}
            intensity={40}
            className="home-hero-text-float flex-shrink-0 mt-8 md:mt-12 lg:mt-16"
          />

          <LazySection rootMargin="0px">
            <div 
              className="relative left-1/2 -translate-x-1/2 w-screen bg-transparent flex-shrink-0 mt-auto"
            >
              <div className="w-full home-hero-text-h">
                <div className="text-black text-base font-medium text-center max-w-2xl mx-auto px-4 py-3 md:py-4">
                  {homeData.heroTagline}
                </div>
              </div>
              <div className="pb-6 mt-3 home-hero-text-p">
                <LogoLoop
                  logos={homeData.clientLogos}
                  gap={80}
                  speed={100}
                  stripCoverage={4}
                  shuffleCopies={false}
                  logoHeight={48}
                />
              </div>
            </div>
          </LazySection>
        </div>

        <LazyElement animation="fadeUp" delay={200}>
          <VideoAndWelcome
            showVideo={homeData.showVideo}
            videoUrl={homeData.videoUrl}
            imageUrl={homeData.heroImage}
            welcomeHeading={homeData.welcomeHeading}
            welcomeDescription={homeData.welcomeDescription}
            aboutButtonText={homeData.aboutButtonText}
            aboutButtonLink={homeData.aboutButtonLink}
            secondaryLinkText={homeData.secondaryLinkText}
            secondaryLinkUrl={homeData.secondaryLinkUrl}
          />
        </LazyElement>
      </div>
      {/* Section Divider - consistent spacing: my-16 (64px mobile), md:my-24 (96px desktop) */}
      <div className="w-[100vw] h-[1px] bg-black my-16 md:my-24 relative left-1/2 -translate-x-1/2" />
      <div className="w-full max-w-[1280px] mx-auto">
        <LazySection rootMargin="200px">
          <ContentAndDone
            servicesHeading={homeData.servicesHeading}
            serviceCards={homeData.serviceCards}
            caseStudiesHeading={homeData.caseStudiesHeading}
            caseStudiesSubheading={homeData.caseStudiesSubheading}
            viewAllButtonText={homeData.viewAllButtonText}
            viewAllButtonLink={homeData.viewAllButtonLink}
          />
        </LazySection>
      </div>
      {/* Section Divider */}
      <div className="w-[100vw] h-[1px] bg-black my-16 md:my-24 relative left-1/2 -translate-x-1/2" />
      <div className="w-full max-w-[1280px] mx-auto">
        <LazySection rootMargin="200px">
          <ReadyWhenYouArePrismic />
        </LazySection>
      </div>
      {/* Section Divider */}
      <div className="w-[100vw] h-[1px] bg-black my-16 md:my-24 relative left-1/2 -translate-x-1/2" />
    </>
  );
}
