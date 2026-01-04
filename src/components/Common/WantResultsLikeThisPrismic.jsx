import React, { useState, useEffect } from "react";
import { client } from "../../prismicio";
import WantResultsLikeThis from "./WantResultsLikeThis";

/**
 * Helper to resolve Prismic Link fields to URLs
 */
const resolveLinkUrl = (linkField) => {
  if (!linkField) return null;
  
  // Web links
  if (linkField.link_type === "Web" || linkField.url) {
    return linkField.url;
  }
  
  // Document links (internal)
  if (linkField.link_type === "Document" && linkField.uid) {
    // Map document types to routes
    const typeRoutes = {
      home_page: "/",
      case_study: `/case-studies/${linkField.uid}`,
      blog_post: `/blog/${linkField.uid}`,
    };
    return typeRoutes[linkField.type] || `/${linkField.uid}`;
  }
  
  return null;
};

/**
 * WantResultsLikeThisPrismic - Fetches CTA content from Prismic singleton
 * Falls back to default values if Prismic data is not available
 */
const WantResultsLikeThisPrismic = ({ className = "" }) => {
  const [ctaData, setCtaData] = useState({});

  useEffect(() => {
    async function fetchCtaData() {
      try {
        const response = await client.getSingle("want_results_like_this_cta");
        
        if (response?.data) {
          const data = response.data;
          // Only set values that actually exist in Prismic - don't set undefined
          const prismicData = {};
          
          if (data.heading) prismicData.heading = data.heading;
          if (data.description) prismicData.description = data.description;
          if (data.image?.url) {
            prismicData.imageSrc = data.image.url;
            if (data.image.alt) prismicData.imageAlt = data.image.alt;
          }
          if (data.primary_button_text) prismicData.primaryButtonText = data.primary_button_text;
          if (data.primary_button_link) {
            const url = resolveLinkUrl(data.primary_button_link);
            if (url) prismicData.primaryButtonLink = url;
          }
          if (data.secondary_button_text) prismicData.secondaryButtonText = data.secondary_button_text;
          if (data.secondary_button_link) {
            const url = resolveLinkUrl(data.secondary_button_link);
            if (url) prismicData.secondaryButtonLink = url;
          }
          
          setCtaData(prismicData);
        }
      } catch (error) {
        // Silently fail - component will use defaults
        console.warn("Could not fetch Want Results Like This CTA from Prismic:", error.message);
      }
    }

    fetchCtaData();
  }, []);

  // Spread only the Prismic values that exist - component defaults handle the rest
  return (
    <WantResultsLikeThis
      {...ctaData}
      className={className}
    />
  );
};

export default WantResultsLikeThisPrismic;
