// Default values (mirror of the Prismic `about_page` what_silo_* fields)
const defaults = {
  heading: "In a noisy digital world, we don't just create to keep up. We go deeper.",
  paragraph1: "Before Silo existed in Perth, our team spent a decade building brand strategy, identity and digital experiences for everyone from fast moving startups to established consumer names in London. It's where we learned what serious brand work actually requires: clarity under pressure, design that earns trust, and strategy that holds up when investors, press and customers are all watching at once.",
  paragraph2: "We're now bringing all of that to the other side of the world, while continuing to build for the clients who got us here in London. Same standard, same way of working, just a growing list of cities. We're strategists, designers and builders under one roof, working from brand strategy through to visual identity, UI/UX and web development, so every brand we touch is built with intent from the first conversation.",
  paragraph3: "",
};
// Nic's October design has a small "London to Perth" label over the copy column. It is left out on
// purpose: no eyebrow labels above blocks in Silo designs (Will, 27 Oct 2026). The copy says it already.

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
}) => {
  // Use props with fallback to defaults. Paragraphs 2 and 3 are optional; the copy currently
  // uses two paragraphs, so an empty slot simply doesn't render.
  const displayHeading = heading || defaults.heading;
  const displayParagraph1 = paragraph1 || defaults.paragraph1;
  const displayParagraph2 = paragraph2 || defaults.paragraph2;
  const displayParagraph3 = paragraph3 || defaults.paragraph3;
  const paragraphs = [displayParagraph1, displayParagraph2, displayParagraph3].filter(Boolean);

  return (
    <section className="flex items-center justify-center py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-10 min-[1360px]:px-0 bg-white overflow-x-hidden w-full">
      <div className="max-w-full mx-auto w-full flex flex-col gap-0">
        <div className="flex flex-col md:grid md:grid-cols-2 items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 mx-auto">
          {/* Left Side - Heading */}
          <div className="w-full px-2 sm:px-0 mt-2 md:mt-0">
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

          {/* Right Side - Text Content: paragraphs separated by a rule */}
          <div className="text-black w-full px-2 sm:px-0">
            {paragraphs.map((text, i) => (
              <div key={i}>
                {i > 0 && <hr className="border-0 h-px bg-black/40 my-6 md:my-8" />}
                <p className={paragraphClass} style={paragraphStyle}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatSiloIs;
