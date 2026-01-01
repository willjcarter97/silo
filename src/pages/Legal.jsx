import React from "react";
import ReadyWhenYouAre from "../components/Common/ReadyWhenYouAre";
import { usePageMeta } from "../hooks/usePageMeta";

const Legal = () => {
  usePageMeta(
    "Legal Information | Silo Creative Agency",
    "Access legal information relating to our work in social media strategy, content strategy, branding, digital design, UX UI design and website development services."
  );

  return (
    <div className="min-h-screen bg-white my-20">
      <div className="max-w-[768px] mx-auto px-4 sm:px-6 md:px-0 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4 sm:mb-6">
            Legal Information
          </h1>
          <p className="text-sm sm:text-base text-black">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 mb-20 md:mb-0">
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

          {/* Section 1 */}
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

          {/* Section 2 */}
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

          {/* Contact */}
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
        </div>
      </div>

      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-16" />
      <ReadyWhenYouAre />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
    </div>
  );
};

export default Legal;
