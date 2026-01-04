import React, { useState, useEffect } from 'react'
import { FaChevronRight } from "react-icons/fa"
import Layout417 from '../components/servicee/Layout417.jsx'
import Interested from '../components/servicee/Interested.jsx'
import ReadyWhenYouArePrismic from '../components/Common/ReadyWhenYouArePrismic.jsx'
import LazySection from '../components/Common/LazySection.jsx'
import LazyText from '../components/Common/LazyText.jsx'
import { usePageMeta } from '../hooks/usePageMeta'
import { client } from '../prismicio'

// Default values
const defaults = {
  heading: "What we do",
  description: "Stronger socials. Smarter content. Confident branding. High performing websites.",
  primaryButtonText: "Let's chat",
  primaryButtonLink: "/contact",
  secondaryButtonText: "About us",
  secondaryButtonLink: "/about",
};

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
      about_page: "/about",
      contact_page: "/contact",
    };
    return typeRoutes[linkField.type] || `/${linkField.uid}`;
  }
  
  return null;
};

const Services = () => {
  const [pageData, setPageData] = useState(null);

  usePageMeta(
    pageData?.pageTitle || 'Services | Social, Branding, Web & Content Strategy Agency',
    pageData?.metaDescription || 'Explore services in social media management, content strategy, brand design, UX UI design, website development and motion design for modern brands.'
  )

  // Fetch page data from Prismic
  useEffect(() => {
    async function fetchPageData() {
      try {
        const response = await client.getSingle("services_page");
        
        if (response?.data) {
          const data = response.data;
          
          setPageData({
            pageTitle: data.page_title || null,
            metaDescription: data.meta_description || null,
            heading: data.hero_heading || null,
            description: data.hero_description || null,
            primaryButtonText: data.hero_primary_button_text || null,
            primaryButtonLink: resolveLinkUrl(data.hero_primary_button_link) || null,
            secondaryButtonText: data.hero_secondary_button_text || null,
            secondaryButtonLink: resolveLinkUrl(data.hero_secondary_button_link) || null,
            serviceCards: data.service_cards?.map(card => ({
              icon: card.card_icon?.url || null,
              number: card.card_number || null,
              title: card.card_title || null,
              description: card.card_description || null,
            })) || null,
            // Core Services heading (behind cards)
            coreServicesHeading: data.core_services_heading || null,
            // Interested section data
            // Bullet points are stored as newline-separated text
            interestedSection: {
              cards: data.interested_cards?.map(card => ({
                image: card.card_image?.url || null,
                title: card.card_title || null,
                description: card.card_description || null,
                bulletPoints: card.card_bullets ? card.card_bullets.split('\n').filter(line => line.trim()) : null,
              })) || null,
              addOnsTitle: data.add_ons_title || null,
              addOnsDescription: data.add_ons_description || null,
              addOnsBullets: data.add_ons_bullets ? data.add_ons_bullets.split('\n').filter(line => line.trim()) : null,
              ctaText: data.interested_cta_text || null,
              ctaLink: resolveLinkUrl(data.interested_cta_link) || null,
            },
          });
        }
      } catch (error) {
        console.warn("Could not fetch services page from Prismic:", error.message);
      }
    }

    fetchPageData();
  }, []);

  // Use props with fallback to defaults
  const displayHeading = pageData?.heading || defaults.heading;
  const displayDescription = pageData?.description || defaults.description;
  const displayPrimaryButtonText = pageData?.primaryButtonText || defaults.primaryButtonText;
  const displayPrimaryButtonLink = pageData?.primaryButtonLink || defaults.primaryButtonLink;
  const displaySecondaryButtonText = pageData?.secondaryButtonText || defaults.secondaryButtonText;
  const displaySecondaryButtonLink = pageData?.secondaryButtonLink || defaults.secondaryButtonLink;

  return (
    <div className='w-full h-auto'>
      {/* Hero Section */}
      <div className="pt-24 md:pt-32 mt-20">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col justify-center items-center px-4 md:px-10 lg:px-10 pb-16">
          {/* Heading */}
          <div className="flex flex-col items-center w-full mb-6">
            <LazyText 
              as="h1" 
              className="font-bold text-[clamp(60px,17vw,200px)] leading-[0.9] mb-6 text-center font-epilogue" 
              animation="fadeUp" 
              delay={0}
            >
              {displayHeading}
            </LazyText>

            {/* Description */}
            <LazyText 
              as="p" 
              className="text-black text-base font-normal text-center max-w-2xl px-4 mb-8" 
              animation="fadeUp" 
              delay={100}
            >
              {displayDescription}
            </LazyText>

            {/* Buttons */}
            <div className="flex gap-4 justify-center -mb-10">
              <a
                href={displayPrimaryButtonLink}
                className="inline-flex items-center justify-center gap-2 bg-brand h-12 hero-btn px-8 py-3 text-sm font-bold tracking-wide text-white border-transparent relative overflow-hidden group"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-40">
                  {displayPrimaryButtonText}
                </span>
              </a>

              <a
                href={displaySecondaryButtonLink}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-12 hero-btn px-8 py-3 text-sm font-bold tracking-wide text-brand relative overflow-hidden group"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="text-brand w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-28">
                  {displaySecondaryButtonText}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Layout417 Scroll Cards Section */}
      <Layout417 
        serviceCards={pageData?.serviceCards}
        heading={pageData?.coreServicesHeading}
      />

      {/* Interested / Services Grid */}
      <LazySection rootMargin="200px">
        <Interested interestedData={pageData?.interestedSection} />
      </LazySection>

      {/* Divider */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-16" />

      {/* Ready When You Are CTA */}
      <LazySection rootMargin="200px">
        <ReadyWhenYouArePrismic />
      </LazySection>

      {/* Bottom Divider */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
    </div>
  )
}

export default Services
