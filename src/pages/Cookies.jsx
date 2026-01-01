import React from 'react'
import ReadyWhenYouAre from '../components/Common/ReadyWhenYouAre'
import { usePageMeta } from '../hooks/usePageMeta'

const Cookies = () => {
  usePageMeta(
    'Cookies Policy | Silo Creative',
    'Understand how Silo Creative uses cookies and similar technologies on our website. View our detailed cookies policy.'
  )

  return (
    <div className="min-h-screen bg-white my-20">
      <div className="max-w-[768px] mx-auto px-4 sm:px-6 md:px-0 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4 sm:mb-6">
            Cookies Policy
          </h1>
          <p className="text-sm sm:text-base text-black">
           Effective date: April 3, 2023
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12 text-sm sm:text-base text-black leading-relaxed">
          <p>
            This Cookies Policy explains how The Silo Creative Ltd ("we", "us", or "our") uses cookies and similar technologies on our website www.thesilocreative.com.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 mb-20 md:mb-0">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              1. What Are Cookies?
            </h2>
            <p className="text-sm sm:text-base text-black leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve your experience, and provide insights into how the site is used.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              2. How We Use Cookies
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                We use cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ensure our website functions correctly;</li>
                <li>Improve performance and user experience;</li>
                <li>Understand how visitors use our website;</li>
                <li>Support marketing and analytics (e.g. Google Analytics, Meta Pixel).</li>
              </ul>
              <p>
                We never use cookies to collect personally identifiable information without your consent.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              3. Types of Cookies We Use
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                <strong>Essential Cookies:</strong> These are required for the website to work properly (e.g. security, navigation).
              </p>
              <p>
                <strong>Performance Cookies:</strong> These help us understand how visitors interact with our site so we can improve it.
              </p>
              <p>
                <strong>Marketing Cookies:</strong> These allow us to deliver relevant content and measure campaign performance.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              4. Managing Cookies
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                When you first visit our website, you'll see a cookie consent banner. You can choose to accept or reject non-essential cookies.
              </p>
              <p>
                You can also manage or delete cookies through your browser settings at any time. For guidance, visit www.aboutcookies.org or www.allaboutcookies.org.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              5. Updates to This Policy
            </h2>
            <p className="text-sm sm:text-base text-black leading-relaxed">
              We may update this Cookies Policy from time to time to reflect changes in law or our website functionality. The updated version will always be available on this page.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
              6. Contact Us
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-black leading-relaxed">
              <p>
                If you have any questions about how we use cookies, please contact us at:
              </p>
              <p>
                📧 hello@thesilocreative.com<br />
                🌐 www.thesilocreative.com
              </p>
              <p className="text-center mt-8 text-black">
                © {new Date().getFullYear()} The Silo Creative Ltd | Cookies Policy
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
  )
}

export default Cookies