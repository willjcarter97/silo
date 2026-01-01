import React from "react";
import ReadyWhenYouAre from "../components/Common/ReadyWhenYouAre";
import { usePageMeta } from "../hooks/usePageMeta";

const Terms = () => {
  usePageMeta(
    "Terms of Service | Creative Agency UK",
    "Read our terms of service covering work across social media strategy, content strategy, branding, graphic design, website development and digital content services."
  );

  return (
    <div className="min-h-screen bg-white my-20">
      <div className="max-w-[768px] mx-auto px-4 sm:px-6 md:px-0 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4 sm:mb-6">
            Terms & Conditions
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

          {/* Section 2 */}
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

          {/* Section 3 */}
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

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              4. Terminology
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>In these Terms:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>"Agreement"</strong> – refers to these Terms, your
                  Order Form, and your acceptance of our Privacy and Cookies
                  Policies.
                </li>
                <li>
                  <strong>"Campaign"</strong> – a social media, influencer, UGC,
                  or creative campaign carried out by The Silo on behalf of the
                  Client.
                </li>
                <li>
                  <strong>"Commencement Date"</strong> – the date on which
                  Services supplied by The Silo to the Client will begin, as
                  stated on the Order Form.
                </li>
                <li>
                  <strong>"Fees"</strong> – the total amount to be paid by the
                  Client for Services, as agreed in writing and detailed in the
                  Order Form.
                </li>
                <li>
                  <strong>"Order Form"</strong> – the written schedule of
                  Services to be provided by The Silo and the associated Fees.
                </li>
                <li>
                  <strong>"Services"</strong> – includes social media
                  management, content creation, influencer and UGC campaigns,
                  design projects, and website design and development.
                </li>
                <li>
                  <strong>"Set-up Fee"</strong> – any one-off fee agreed in
                  advance for onboarding, strategy, or design setup.
                </li>
                <li>
                  <strong>"Management Fees"</strong> – ongoing monthly or
                  project-based fees applicable for delivery and management of
                  Services.
                </li>
                <li>
                  <strong>"We", "Us", "Our"</strong> – refers to The Silo
                  Creative Ltd.
                </li>
                <li>
                  <strong>"You", "Client", "Your"</strong> – refers to any
                  person or organisation using The Silo's Services.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              5. Service Provision
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                You must have a valid agreement with The Silo to access our
                Services.
              </p>
              <p>
                The Client agrees to provide all necessary brand assets, access
                credentials, and information required for The Silo to perform
                its Services. This may include access to social media accounts,
                website platforms, or brand materials.
              </p>
              <p>
                You authorise us to use your approved logos, trademarks, and
                imagery for the purpose of delivering the agreed Services.
              </p>
              <p>
                The Silo may use trusted third-party partners to assist with
                specific project elements (for example, creator management or
                technical web support). All such partners are bound by
                confidentiality and data protection agreements.
              </p>
              <p>
                We reserve the right to modify or update our Services at any
                time, with notice provided if changes affect your current
                project or campaign.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              6. Service Delivery
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                Service delivery will be evidenced through reports, progress
                updates, or creative proofs, depending on the project type.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Social Media & Campaigns:</strong> performance
                  insights, content calendars, analytics, and engagement
                  reporting.
                </li>
                <li>
                  <strong>Design & Web Projects:</strong> design proofs, drafts,
                  and revisions as outlined in the project timeline.
                </li>
                <li>
                  <strong>UGC & Influencer Campaigns:</strong> creator briefs,
                  content submissions, and post-campaign performance reports.
                </li>
              </ul>
              <p>
                The Silo will use its expertise and best efforts to achieve
                strong results; however, we cannot guarantee specific outcomes
                such as audience growth, engagement increases, or revenue
                impact.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              7. Term of Agreement
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                The term of your Agreement will be defined in your Order Form.
                Services commence from the Commencement Date, once all required
                materials and payments are received.
              </p>
              <p>
                For ongoing retainers, a minimum of 30 days' written notice is
                required to terminate this Agreement. For project-based work,
                the Agreement ends upon project completion unless extended by
                mutual agreement.
              </p>
              <p>
                Extensions or renewals of Services must be agreed in writing and
                may include updated terms or fees.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              8. Fees and Payment
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                All fees are outlined in your Order Form and payable in the
                agreed currency at the time of signing. The Silo accepts
                payments in GBP (£) and other currencies where specified and
                agreed in writing.
              </p>
              <p>
                Payment may be made via bank transfer or another approved
                method. All invoices are due within 14 days of issue, unless
                otherwise stated in the Order Form.
              </p>
              <p>
                Setup fees, where applicable, are invoiced prior to
                commencement, and management or project-based fees are billed
                monthly in advance unless otherwise agreed.
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
                  Charge a late payment fee of 5% per month on outstanding
                  balances; and
                </li>
                <li>
                  Recover reasonable costs incurred in pursuing overdue
                  invoices, including administrative or legal fees.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              9. Confidentiality
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                The Silo treats all client information as strictly confidential.
                Any data, materials, or project details shared will only be used
                for delivering the agreed Services.
              </p>
              <p>
                We will not share or disclose your information without prior
                written consent, except where required by law or necessary to
                perform Services (for example, with subcontractors bound by
                confidentiality).
              </p>
              <p>
                Both parties agree to protect all confidential information from
                unauthorised disclosure. These obligations remain in effect both
                during and after termination of the Agreement.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              10. Intellectual Property
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                All creative concepts, strategies, designs, and materials
                produced by The Silo remain the intellectual property of The
                Silo until full payment has been received.
              </p>
              <p>
                Upon full payment, ownership of final deliverables (e.g.,
                approved design files, copy, or creative assets) transfers to
                the Client. The Silo retains the right to use completed work for
                portfolio, marketing, and promotional purposes.
              </p>
              <p>
                Client-provided assets such as logos, imagery, or brand
                materials remain the Client's property. The Client grants The
                Silo a non-exclusive licence to use such materials solely for
                project delivery.
              </p>
              <p>
                Internal working files, templates, and proprietary frameworks
                remain the property of The Silo Creative Ltd.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              11. Limitation of Liability
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                The Silo will provide Services with reasonable skill and care
                but cannot guarantee specific performance results.
              </p>
              <p>
                To the fullest extent permitted by law, The Silo shall not be
                liable for indirect or consequential losses including, but not
                limited to, loss of profits, data, or business opportunities.
              </p>
              <p>
                The Silo's total liability for any claim shall not exceed the
                total amount paid by the Client in the six (6) months preceding
                the event giving rise to the claim.
              </p>
              <p>
                The Client is responsible for ensuring that all materials and
                approvals provided are accurate, lawful, and compliant with
                relevant regulations.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              12. Data Protection and Privacy
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                The Silo complies with the UK GDPR and Data Protection Act 2018.
                We collect and process only the data necessary to provide our
                Services securely and effectively.
              </p>
              <p>
                Personal or business data shared with us will be handled in
                accordance with our Privacy Policy, available on our Website.
              </p>
              <p>
                You may request access to, correction of, or deletion of your
                data at any time by emailing hello@thesilocreative.com.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              13. Termination
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                Either party may terminate this Agreement in accordance with the
                notice period set out in Section 7.
              </p>
              <p>The Silo may terminate or suspend Services immediately if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fees remain unpaid after the due date;</li>
                <li>The Client commits a material breach of these Terms;</li>
                <li>
                  The Client misuses confidential data or harms The Silo's
                  reputation.
                </li>
              </ul>
              <p>
                Upon termination, access to shared systems and project materials
                will be revoked. The Silo reserves the right to retain
                anonymised project data for performance and record-keeping
                purposes.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              14. Governing Law and Jurisdiction
            </h2>
            <p className="text-sm sm:text-base text-black leading-relaxed">
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of England and Wales. Both The Silo and
              the Client agree to the exclusive jurisdiction of the courts of
              England and Wales.
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
                © {new Date().getFullYear()} The Silo Creative Ltd | All Rights
                Reserved
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

export default Terms;
