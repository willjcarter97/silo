import React, { useState, useEffect } from 'react'
import ServicesLedger from '../components/servicee/ServicesLedger.jsx'
import ReadyWhenYouArePrismic from '../components/Common/ReadyWhenYouArePrismic.jsx'
import LazySection from '../components/Common/LazySection.jsx'
import SplitHero from '../components/Common/SplitHero.jsx'
import { usePageMeta } from '../hooks/usePageMeta'
import { pageSeo } from "../data/seo";

// Fallback head copy (used until/unless Prismic has values); single source in src/data/seo.js
const SEO_FALLBACK = pageSeo("/services");
import { client } from '../prismicio'
import { coreServices, otherServices } from '../data/servicesData.jsx'

// Default values (mirror of the Prismic `services_page` singleton)
const defaults = {
  heading: "How we help brands stand out online",
  description: "Brands built with intent, not guesswork",
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

// Bullet lists are stored in Prismic as newline-separated text
const splitLines = (text) =>
  typeof text === "string" && text.trim()
    ? text.split('\n').map((line) => line.trim()).filter(Boolean)
    : null;

const Services = () => {
  const [pageData, setPageData] = useState(null);

  usePageMeta(
    pageData?.pageTitle || SEO_FALLBACK.title,
    pageData?.metaDescription || SEO_FALLBACK.description
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
            // Core services section label (was the heading behind the old card stack)
            coreServicesHeading: data.core_services_heading || null,
            // Tier 1 - core services (interested_cards), merged with code fallbacks per row
            services: data.interested_cards?.length > 0
              ? data.interested_cards.map((card, index) => ({
                  number: String(index + 1).padStart(2, '0'),
                  title: card.card_title || coreServices[index]?.title,
                  description: card.card_description || coreServices[index]?.description,
                  bullets: splitLines(card.card_bullets) || coreServices[index]?.bullets,
                  image: card.card_image?.url || null,
                }))
              : null,
            // Tier 2 - other ways we can help (add_ons_*)
            other: {
              title: data.add_ons_title || otherServices.title,
              description: data.add_ons_description || otherServices.description,
              bullets: splitLines(data.add_ons_bullets) || otherServices.bullets,
              ctaText: data.interested_cta_text || otherServices.ctaText,
              ctaLink: resolveLinkUrl(data.interested_cta_link) || otherServices.ctaLink,
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
      <SplitHero
        ariaLabel="Services introduction"
        headingWidth="max-w-[12ch] text-balance"
        heading={displayHeading}
        description={displayDescription}
        primary={{ text: displayPrimaryButtonText, href: displayPrimaryButtonLink }}
        secondary={{ text: displaySecondaryButtonText, href: displaySecondaryButtonLink }}
      />

      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black" />

      {/* Core services ledger + other ways we can help */}
      <LazySection rootMargin="200px">
        <ServicesLedger
          eyebrow={pageData?.coreServicesHeading || undefined}
          services={pageData?.services || coreServices}
          other={pageData?.other || otherServices}
        />
      </LazySection>


      {/* Ready When You Are CTA */}
      <LazySection rootMargin="200px">
        <ReadyWhenYouArePrismic />
      </LazySection>

    </div>
  )
}

export default Services
