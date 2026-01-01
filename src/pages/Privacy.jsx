import React from "react";
import ReadyWhenYouAre from "../components/Common/ReadyWhenYouAre";
import { usePageMeta } from "../hooks/usePageMeta";

const Privacy = () => {
  usePageMeta(
    "Privacy Policy | Silo Creative Agency",
    "Learn how Silo handles data across social media services, content strategy projects, brand design, website development and digital workflows."
  );

  return (
    <div className="min-h-screen bg-white my-20">
      <div className="max-w-[768px] mx-auto px-4 sm:px-6 md:px-0 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4 sm:mb-6">
            Legal & Website changes
          </h1>
          <p className="text-sm sm:text-base text-black">
            Effective date: April 3, 2023
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 mb-20 md:mb-0">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              1. About These Terms
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
                Cookies Policy, which are available on our Website. By using
                this Website or placing an order with us, you agree to be bound
                by these Terms. If you do not agree, you must stop using the
                Website immediately.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              2. About Us
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
                <br />
                Website: www.thesilocreative.com
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              3. Agreement
            </h2>
            <p className="text-sm sm:text-base text-black leading-relaxed">
              These Terms form a legally binding Agreement between the Client
              and The Silo. Details of the Services and applicable fees will be
              set out in the signed Order Form.
            </p>
          </section>

          {/* Section 4 */}
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
                <br />
                Website: www.thesilocreative.com
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              4. Service Provision
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                The Client must provide all required brand assets, access
                credentials, and information for The Silo to perform its
                Services. The Silo may use trusted third-party partners for
                campaign delivery or technical work. All such partners are bound
                by confidentiality and data protection agreements.
              </p>
              <p>
                We reserve the right to modify or update our Services at any
                time, with notice provided if changes affect your current
                project or campaign.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              5. Service Delivery
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                We deliver Services through regular updates, reports, and
                creative proofs depending on the project type:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Social Media & Campaigns:</strong> content calendars,
                  analytics, and reports.
                </li>
                <li>
                  <strong>Design & Web:</strong> project drafts, mock-ups, and
                  revisions.
                </li>
                <li>
                  <strong>UGC & Influencer:</strong> creator briefs, performance
                  reporting, and post-campaign insights.
                </li>
              </ul>
              <p>
                While The Silo will use reasonable skill and care, we do not
                guarantee specific results such as follower growth, engagement
                rates, or revenue increases.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              6. Fees and Payment
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                All fees are outlined in your Order Form and payable in the
                agreed currency at the time of signing. We accept payments in
                GBP (£) and other currencies where specified and agreed in
                writing.
              </p>
              <p>
                Payment may be made via bank transfer or another approved
                method. All invoices are due within 14 days of issue, unless
                otherwise agreed.
              </p>
              <p>
                Setup fees, where applicable, are invoiced prior to
                commencement. Retainer or ongoing project fees are billed
                monthly in advance unless otherwise stated.
              </p>
              <p>
                Fees are non-refundable once Services have commenced, except in
                cases of proven breach or termination by The Silo. Currency
                exchange rates and transfer fees (if applicable) are the
                responsibility of the Client.
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-black mt-6 mb-3">
                Late Payment
              </h3>
              <p>
                If payment is not received within the agreed timeframe, The Silo
                reserves the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pause or suspend Services until payment is received;</li>
                <li>
                  Charge a late payment fee of 5% per month on any outstanding
                  balance; and
                </li>
                <li>
                  Recover reasonable costs incurred in pursuing overdue
                  invoices.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              7. Confidentiality
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                The Silo treats all client information as strictly confidential.
                Information shared with us will only be used to deliver the
                agreed Services and will not be disclosed to third parties
                without written consent, except as required by law or where
                necessary to fulfil the Services.
              </p>
              <p>
                This obligation continues after the completion or termination of
                the Agreement.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              8. Intellectual Property
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                All creative concepts, strategies, designs, and materials
                produced by The Silo remain our intellectual property until full
                payment is received.
              </p>
              <p>
                Upon full payment, ownership of final deliverables transfers to
                the Client. The Silo retains the right to display completed work
                in our portfolio or promotional materials.
              </p>
              <p>
                Client-provided assets remain the Client's property, but The
                Silo is granted a licence to use them solely for the purpose of
                project delivery. Internal working files, templates, and
                frameworks remain the property of The Silo Creative Ltd.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              9. Limitation of Liability
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                The Silo will provide Services with reasonable skill and care
                but cannot guarantee specific performance outcomes.
              </p>
              <p>
                To the fullest extent permitted by law, The Silo shall not be
                liable for indirect or consequential losses, including loss of
                profits, data, or business.
              </p>
              <p>
                Our total liability shall not exceed the total amount paid by
                the Client within six (6) months preceding the event giving rise
                to the claim.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              10. Data Protection and Privacy
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                The Silo complies with the UK GDPR and the Data Protection Act
                2018. We collect and process only the data necessary to provide
                our Services securely and effectively.
              </p>
              <p>
                Clients can request access to, correction of, or deletion of
                their data by contacting hello@thesilocreative.com. Our full
                Privacy Policy is available on our Website.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              11. Termination
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                Either party may terminate this Agreement in accordance with the
                notice period set out in the Order Form.
              </p>
              <p>The Silo may terminate or suspend Services immediately if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fees remain unpaid after the due date;</li>
                <li>The Client breaches these Terms;</li>
                <li>
                  The Client misuses confidential data or harms The Silo's
                  reputation.
                </li>
              </ul>
              <p>
                Upon termination, access to shared systems and project materials
                will be revoked.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              12. Copyright Statement
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                All content on this website — including design, layout, text,
                graphics, and software — is protected by copyright and remains
                the property of The Silo Creative Ltd.
              </p>
              <p>
                Reproduction, redistribution, republication, downloading, or
                sale of any part of this website in any form without written
                consent is strictly prohibited.
              </p>
              <p>
                No content may be copied or reused for commercial purposes.
                Using our materials without permission constitutes a breach of
                these Terms.
              </p>
              <p>
                If you link to our website, you must do so fairly and not in a
                way that implies affiliation, endorsement, or ownership. Framing
                this website without permission is prohibited.
              </p>
              <p>
                Caching of this site is permitted only in the normal course of
                business as outlined in the Electronic Commerce (EC Directive)
                Regulations 2002.
              </p>
              <p>
                For copyright or usage enquiries, please contact
                hello@thesilocreative.com.
              </p>
              <p className="text-center mt-6 text-black">
                © {new Date().getFullYear()} The Silo Creative Ltd | Copyright
                Statement
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              13. Website Acceptable Use Policy
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <h3 className="text-lg sm:text-xl font-bold text-black mt-6 mb-3">
                Permitted Use
              </h3>
              <p>
                You may use our website for lawful purposes only. You are
                permitted to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browse and view the website;</li>
                <li>
                  Download or print materials for personal, non-commercial use;
                </li>
                <li>
                  Share links to our content, provided credit is given and no
                  endorsement is implied.
                </li>
              </ul>

              <h3 className="text-lg sm:text-xl font-bold text-black mt-6 mb-3">
                Prohibited Use
              </h3>
              <p>You must not use our website in any way that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Breaches any applicable law or regulation;</li>
                <li>
                  Is unlawful, fraudulent, or infringes intellectual property
                  rights;
                </li>
                <li>Attempts unauthorised access to our website or systems;</li>
                <li>Uploads or transmits malware or harmful code;</li>
                <li>
                  Reproduces or reuses content for commercial purposes without
                  consent;
                </li>
                <li>Harasses, defames, or abuses others;</li>
                <li>
                  Interferes with the website's normal operation or security.
                </li>
              </ul>
              <p>
                The Silo reserves the right to restrict or terminate access for
                users who breach these terms.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-black mt-6 mb-3">
                User-Generated Content
              </h3>
              <p>
                If you submit content (such as testimonials or creative
                submissions), you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Grant The Silo a non-exclusive, royalty-free licence to use
                  that content for marketing or display purposes;
                </li>
                <li>
                  Confirm that your content does not infringe third-party rights
                  or contain offensive material.
                </li>
              </ul>

              <h3 className="text-lg sm:text-xl font-bold text-black mt-6 mb-3">
                Links to Other Websites
              </h3>
              <p>
                External links on our website are provided for convenience only.
                The Silo is not responsible for their content, accuracy, or
                security. Linking to our website is permitted only in a fair and
                legal manner that does not damage our reputation.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              14. Governing Law and Jurisdiction
            </h2>
            <p className="text-sm sm:text-base text-black leading-relaxed">
              These Terms are governed by and construed in accordance with the
              laws of England and Wales. Both The Silo and the Client agree to
              submit to the exclusive jurisdiction of the courts of England and
              Wales.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              15. Contact
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
              <p>
                Support and client queries are available via email
                Monday–Friday, 9am–5pm (GMT).
              </p>
              <p className="text-center mt-8 text-black">
                © {new Date().getFullYear()} The Silo Creative Ltd | Legal &
                Website Terms
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Ready When You Are Section */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-16" />
      <ReadyWhenYouAre />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
    </div>
  );
};

export default Privacy;
