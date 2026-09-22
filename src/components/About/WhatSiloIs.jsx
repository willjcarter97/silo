// Default values (mirror of the Prismic `about_page` what_silo_* fields)
const defaults = {
  heading: "In a noisy digital world, we don't just create to keep up. We go deeper.",
  paragraph1: "Before Silo existed in Perth, our team spent a decade building brand strategy, identity and digital experiences for everyone from fast moving startups to established consumer names in London. It's where we learned what serious brand work actually requires: clarity under pressure, design that earns trust, and strategy that holds up when investors, press and customers are all watching at once.",
  paragraph2: "We're now bringing all of that to the other side of the world, while continuing to build for the clients who got us here in London. Same standard, same way of working, just a growing list of cities. We're strategists, designers and builders under one roof, working from brand strategy through to visual identity, UI/UX and web development, so every brand we touch is built with intent from the first conversation.",
  paragraph3: "",
  image: "https://images.prismic.io/silosite/aVUgonNYClf9otsZ_v1762717240_image_re2b0o.png?auto=format,compress",
};

const paragraphClass = "text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[18px] leading-relaxed text-left";
const paragraphStyle = {
  fontWeight: 400,
  lineHeight: '150%',
  letterSpacing: '0%',
  color: '#000',
  opacity: 1,
};

const WhatSiloIs = ({
  heading,
  paragraph1,
  paragraph2,
  paragraph3,
  image,
}) => {
  // Use props with fallback to defaults. Paragraphs 2 and 3 are optional; the copy currently
  // uses two paragraphs, so an empty slot simply doesn't render.
  const displayHeading = heading || defaults.heading;
  const displayParagraph1 = paragraph1 || defaults.paragraph1;
  const displayParagraph2 = paragraph2 || defaults.paragraph2;
  const displayParagraph3 = paragraph3 || defaults.paragraph3;
  const displayImage = image || defaults.image;

  return (
    <section className="flex items-center justify-center py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-0 bg-white overflow-x-hidden w-full">
      <div className="max-w-full mx-auto w-full flex flex-col gap-0">
        <div className="flex flex-col md:grid md:grid-cols-2 mb-10 items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 sm:mb-8 mx-auto">
          {/* Left Side - Heading */}
          <div className="w-full px-2 sm:px-0 mt-10 md:mt-0">
            <h2
              className="font-bold max-w-[36rem] text-black text-2xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[48px] leading-tight text-left"
              style={{
                opacity: 1,
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: '0%'
              }}
            >
              {displayHeading}
            </h2>
          </div>

          {/* Right Side - Text Content */}
          <div className="text-black space-y-3 sm:space-y-4 md:space-y-6 w-full px-2 sm:px-0">
            <p className={paragraphClass} style={paragraphStyle}>
              {displayParagraph1}
            </p>

            {displayParagraph2 && (
              <p className={paragraphClass} style={paragraphStyle}>
                {displayParagraph2}
              </p>
            )}

            {displayParagraph3 && (
              <p className={paragraphClass} style={paragraphStyle}>
                {displayParagraph3}
              </p>
            )}
          </div>
        </div>

        {/* Full Width Image Below */}
        <div className="mt-6 sm:mt-8 md:mt-16 px-2 sm:px-0 w-full mx-auto">
          <div className="w-full h-60 sm:h-60 md:h-72 lg:h-80 xl:h-96 2xl:h-[30rem] overflow-hidden">
            <img
              src={displayImage}
              alt="Silo creative process illustration"
              className="w-full h-full object-cover"
              loading="lazy"
              style={{
                opacity: 1
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatSiloIs;
