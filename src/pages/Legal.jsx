import React, { useState, useEffect } from "react";
import { PrismicRichText } from "@prismicio/react";
import ReadyWhenYouArePrismic from "../components/Common/ReadyWhenYouArePrismic";
import { usePageMeta } from "../hooks/usePageMeta";
import { client } from "../prismicio";

// Default values
const defaults = {
  heading: "Legal Information",
  effectiveDate: new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
};

const Legal = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  usePageMeta(
    pageData?.pageTitle || "Legal Information | Silo Creative Agency",
    pageData?.metaDescription || "Access legal information relating to our work in social media strategy, content strategy, branding, digital design, UX UI design and website development services."
  );

  // Fetch page data from Prismic
  useEffect(() => {
    async function fetchPageData() {
      try {
        const response = await client.getSingle("legal_page");
        
        if (response?.data) {
          const data = response.data;
          
          setPageData({
            pageTitle: data.page_title || null,
            metaDescription: data.meta_description || null,
            heading: data.heading || null,
            effectiveDate: data.effective_date || null,
            body: data.body || null,
          });
        }
      } catch (error) {
        console.warn("Could not fetch legal page from Prismic:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPageData();
  }, []);

  const displayHeading = pageData?.heading || defaults.heading;
  const displayEffectiveDate = pageData?.effectiveDate || defaults.effectiveDate;
  const hasBody = pageData?.body && pageData.body.length > 0;

  return (
    <div className="min-h-screen bg-white my-20">
      <div className="max-w-[768px] mx-auto px-4 sm:px-6 md:px-0 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4 sm:mb-6">
            {displayHeading}
          </h1>
          <p className="text-sm sm:text-base text-black">
            Last updated: {displayEffectiveDate}
          </p>
        </div>

        {/* Content from Prismic or fallback */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 mb-20 md:mb-0">
          {hasBody ? (
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-black prose-p:text-black prose-li:text-black prose-strong:text-black">
              <PrismicRichText 
                field={pageData.body}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6 mt-8">
                      {children}
                    </h2>
                  ),
                  heading3: ({ children }) => (
                    <h3 className="text-lg sm:text-xl font-bold text-black mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  paragraph: ({ children }) => (
                    <p className="text-sm sm:text-base text-black leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  listItem: ({ children }) => (
                    <li className="text-sm sm:text-base text-black leading-relaxed ml-6 list-disc">
                      {children}
                    </li>
                  ),
                  oListItem: ({ children }) => (
                    <li className="text-sm sm:text-base text-black leading-relaxed ml-6 list-decimal">
                      {children}
                    </li>
                  ),
                }}
              />
            </div>
          ) : (
            // Default fallback content
            <>
              <section>
                <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
                  <p>
                    Welcome to our Legal Information page. Here you can find
                    important information regarding our services, compliance, and
                    legal obligations covering our work across social media
                    strategy, content strategy, branding, graphic design, website
                    development, and digital content services.
                  </p>
                  <p>
                    Silo Creative Agency is committed to transparency and adherence
                    to all applicable laws and regulations in the execution of our
                    digital and creative services.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
                  1. Company Information
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
                  <p>
                    The Silo Creative Ltd
                    <br />
                    Registered in England and Wales
                    <br />
                    Email: hello@thesilocreative.com
                    <br />
                    Website: www.thesilocreative.com
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
                  2. Intellectual Property
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
                  <p>
                    All content, designs, and strategies produced by The Silo
                    Creative Agency are protected by intellectual property laws.
                    Unauthorized use of our materials is strictly prohibited.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
                  Contact Us
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
                  <p>
                    For any legal enquiries, please contact us at
                    hello@thesilocreative.com.
                  </p>
                  <p className="text-center mt-8 text-black">
                    © {new Date().getFullYear()} The Silo Creative Ltd | Legal
                    Information
                  </p>
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-16" />
      <ReadyWhenYouArePrismic />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
    </div>
  );
};

export default Legal;
