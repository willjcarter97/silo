import React, { useState, useEffect } from "react";
import { PrismicRichText } from "@prismicio/react";
import ReadyWhenYouArePrismic from "../components/Common/ReadyWhenYouArePrismic";
import { usePageMeta } from "../hooks/usePageMeta";
import { client } from "../prismicio";

// Default values
const defaults = {
  heading: "Terms & Conditions",
  effectiveDate: "April 3, 2023",
};

const Terms = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  usePageMeta(
    pageData?.pageTitle || "Terms of Service | Creative Agency UK",
    pageData?.metaDescription || "Read our terms of service covering work across social media strategy, content strategy, branding, graphic design, website development and digital content services."
  );

  // Fetch page data from Prismic
  useEffect(() => {
    async function fetchPageData() {
      try {
        const response = await client.getSingle("terms_page");
        
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
        console.warn("Could not fetch terms page from Prismic:", error.message);
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
            Effective date: {displayEffectiveDate}
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
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
                  1. About These Terms and Conditions
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
                  <p>
                    This Website (www.thesilocreative.com) is the property of The
                    Silo Creative Ltd, a company registered in England and Wales.
                    These Terms and Conditions ("Terms") outline the legal terms on
                    which we provide our creative and marketing services
                    ("Services") through our Website ("Website") to you ("You", or
                    the "Client").
                  </p>
                  <p>
                    These Terms should be read together with our Privacy Policy and
                    Cookies Policy, which are incorporated into these Terms and
                    available on our Website. Details of the specific Services
                    supplied to you are outlined in your Order Form, which forms
                    part of this Agreement.
                  </p>
                  <p>
                    By placing an order with us, you agree to be bound by these
                    Terms. If you do not agree, you should not use our Website or
                    Services.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
                  2. Agreement
                </h2>
                <p className="text-sm sm:text-base text-black leading-relaxed">
                  These Terms form a legally binding Agreement between you ("the
                  Client") and The Silo Creative Ltd ("The Silo"). Details of the
                  Services and fees will be specified in the Order Form agreed by
                  both parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
                  3. About Us
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
                  <p>The Silo Creative Ltd is a creative agency specialising in:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Social Media Strategy & Management</li>
                    <li>UGC & Influencer Campaigns</li>
                    <li>Brand & Graphic Design</li>
                    <li>Website Design & Development</li>
                  </ul>
                  <p>
                    Registered in England and Wales
                    <br />
                    Email: hello@thesilocreative.com
                  </p>
                  <p>
                    If you have any questions regarding these Terms, please contact
                    us at hello@thesilocreative.com.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
                  4. Contact
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
                  <p className="text-center mt-8 text-black">
                    © {new Date().getFullYear()} The Silo Creative Ltd | All Rights
                    Reserved
                  </p>
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      {/* Ready When You Are Section */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-16" />
      <ReadyWhenYouArePrismic />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
    </div>
  );
};

export default Terms;
