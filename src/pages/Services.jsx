import React from 'react'
import { FaChevronRight } from "react-icons/fa"
import Layout417 from '../components/servicee/Layout417.jsx'
import Interested from '../components/servicee/Interested.jsx'
import ReadyWhenYouAre from '../components/Common/ReadyWhenYouAre.jsx'
import LazySection from '../components/Common/LazySection.jsx'
import LazyText from '../components/Common/LazyText.jsx'
import { usePageMeta } from '../hooks/usePageMeta'

const Services = () => {
  usePageMeta(
    'Services | Social, Branding, Web & Content Strategy Agency',
    'Explore services in social media management, content strategy, brand design, UX UI design, website development and motion design for modern brands.'
  )

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
              What we do
            </LazyText>

            {/* Description */}
            <LazyText 
              as="p" 
              className="text-black text-base font-normal text-center max-w-2xl px-4 mb-8" 
              animation="fadeUp" 
              delay={100}
            >
              Stronger socials. Smarter content. Confident branding. High
              performing websites.
            </LazyText>

            {/* Buttons */}
            <div className="flex gap-4 justify-center -mb-10">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand h-12 hero-btn px-8 py-3 text-sm font-bold tracking-wide text-white border-transparent relative overflow-hidden group"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-40">
                  Let's chat
                </span>
              </a>

              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-12 hero-btn px-8 py-3 text-sm font-bold tracking-wide text-brand relative overflow-hidden group"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="text-brand w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-28">
                  About us
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Layout417 Scroll Cards Section */}
      <Layout417 />

      {/* Interested / Services Grid */}
      <LazySection rootMargin="200px">
        <Interested />
      </LazySection>

      {/* Divider */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-16" />

      {/* Ready When You Are CTA */}
      <LazySection rootMargin="200px">
        <ReadyWhenYouAre />
      </LazySection>

      {/* Bottom Divider */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-16" />
    </div>
  )
}

export default Services

