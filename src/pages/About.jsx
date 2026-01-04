import { useEffect, useState } from "react";
import Hero from "../components/About/Hero";
import WhatSiloIs from "../components/About/WhatSiloIs";
import WhyUGC from "../components/About/WhyUGC";
import WhoWeLoveWorkingWith from "../components/About/WhoWeLoveWorkingWith";
import ThingsWeBelieveIn from "../components/About/ThingsWeBelieveIn";
import MindsInTheSilo from "../components/About/MindsInTheSilo";
import ReadyWhenYouArePrismic from "../components/Common/ReadyWhenYouArePrismic";
import LazySection from "../components/Common/LazySection";
import { usePageMeta } from "../hooks/usePageMeta";
import { client } from "../prismicio";

/**
 * Helper to resolve Prismic Link fields to URLs
 */
const resolveLinkUrl = (linkField) => {
  if (!linkField) return null;
  
  if (linkField.link_type === "Web" || linkField.url) {
    return linkField.url;
  }
  
  if (linkField.link_type === "Document" && linkField.uid) {
    const typeRoutes = {
      home_page: "/",
      case_study: `/case-studies/${linkField.uid}`,
      blog_post: `/blog/${linkField.uid}`,
      services_page: "/services",
      contact_page: "/contact",
    };
    return typeRoutes[linkField.type] || `/${linkField.uid}`;
  }
  
  return null;
};

/**
 * Helper to extract plain text from Prismic Rich Text
 */
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  return richTextField.map((block) => block.text || "").join(" ");
};

const About = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Default page meta
  usePageMeta(
    pageData?.pageTitle || "Boutique Creative Studio for Modern Brands",
    pageData?.metaDescription || "A boutique creative agency blending social media strategy, content strategy, branding, digital design and website development to build meaningful brand experiences."
  );

  // Fetch about page data from Prismic
  useEffect(() => {
    async function fetchAboutPage() {
      try {
        const response = await client.getSingle("about_page");
        
        if (response?.data) {
          const data = response.data;
          
          setPageData({
            // SEO
            pageTitle: data.page_title || null,
            metaDescription: data.meta_description || null,
            
            // Hero Section
            hero: {
              heading: asText(data.hero_heading) || null,
              description: data.hero_description || null,
              primaryButtonText: data.hero_primary_button_text || null,
              primaryButtonLink: resolveLinkUrl(data.hero_primary_button_link) || null,
              secondaryButtonText: data.hero_secondary_button_text || null,
              secondaryButtonLink: resolveLinkUrl(data.hero_secondary_button_link) || null,
              mainImage: data.hero_main_image?.url || null,
              secondaryImage: data.hero_secondary_image?.url || null,
            },
            
            // What Silo Is Section
            whatSilo: {
              heading: data.what_silo_heading || null,
              paragraph1: data.what_silo_paragraph_1 || null,
              paragraph2: data.what_silo_paragraph_2 || null,
              paragraph3: data.what_silo_paragraph_3 || null,
              image: data.what_silo_image?.url || null,
            },
            
            // Who We Work With Section
            whoWeWork: {
              heading: data.who_we_work_heading || null,
              description: data.who_we_work_description || null,
              marqueeRow1: data.marquee_row_1 || null,
              marqueeRow2: data.marquee_row_2 || null,
              marqueeRow3: data.marquee_row_3 || null,
            },
            
            // Things We Believe Section
            beliefs: {
              heading: data.beliefs_heading || null,
              description: data.beliefs_description || null,
              cards: data.belief_cards?.map(card => ({
                image: card.card_image?.url || null,
                title: card.card_title || null,
                description: card.card_description || null,
              })) || null,
            },
          });
        }
      } catch (error) {
        console.warn("Could not fetch about page from Prismic:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAboutPage();
  }, []);

  // Handle scroll to anchor or top when component mounts
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for content to load, then scroll to anchor
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="bg-white overflow-x-hidden flex flex-col mx-auto">
      <div id="hero" className="mx-auto max-w-[1280px]">
        <Hero {...(pageData?.hero || {})} />
      </div>

      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black" />
      <div className="mx-auto w-full max-w-[1280px]">
        <LazySection>
          <WhatSiloIs {...(pageData?.whatSilo || {})} />
        </LazySection>
        <LazySection>
          <div id="why-ugc" className="hidden">
            <WhyUGC />
          </div>
        </LazySection>
        <LazySection>
          <WhoWeLoveWorkingWith {...(pageData?.whoWeWork || {})} />
        </LazySection>
        <LazySection>
          <ThingsWeBelieveIn {...(pageData?.beliefs || {})} />
        </LazySection>
        <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-12 md:my-16 lg:my-20" />
        <LazySection>
          <div id="minds-in-the-silo">
            <MindsInTheSilo />
          </div>
        </LazySection>
        <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-12 md:my-16 lg:my-20" />
        <ReadyWhenYouArePrismic />
        <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-12 md:mt-16 lg:mt-20" />
      </div>
    </div>
  );
};

export default About;
