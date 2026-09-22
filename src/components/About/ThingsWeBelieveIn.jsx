import { PrismicRichText } from "@prismicio/react";

// Default values (mirror of the Prismic `about_page` beliefs_* fields)
const defaults = {
  heading: "Things we believe in",
  description: null, // Will use JSX fallback
  cards: [
    {
      image: "https://images.prismic.io/silosite/aVUgTnNYClf9otrU_v1765908400_1_pui4ev.png?auto=format,compress",
      title: "We don't chase trends for the sake of it.",
      description: "The best work feels true to the brand, not the trend. Trends move fast and fade faster, so we'd rather build something that still holds up in five years.",
    },
    {
      image: "https://images.prismic.io/silosite/aVUgT3NYClf9otrV_v1765908401_2_vle5af.png?auto=format,compress",
      title: "Nothing gets made without a reason behind it.",
      description: "Strategy first, then the work. If we can't explain why something exists, it doesn't go live.",
    },
    {
      image: "https://images.prismic.io/silosite/aVUgUHNYClf9otrW_v1765908448_3_cmny76.png?auto=format,compress",
      title: "We say what we mean.",
      description: "No jargon, no overcomplicating the brief. If we can't explain a decision simply, we haven't thought it through properly.",
    },
  ],
};

/**
 * @param {boolean} showImages - Render the red image block above each belief instead of the
 *                               numbered "01/" marker. Off by default (imagery stripped back).
 */
const ThingsWeBelieveIn = ({
  heading,
  description,
  cards,
  showImages = false,
}) => {
  // Use props with fallback to defaults
  const displayHeading = heading || defaults.heading;
  const displayCards = cards && cards.length > 0 ? cards : defaults.cards;

  // Default description JSX (with bold spans)
  const defaultDescriptionJSX = (
    <>
      These are the principles that guide everything we create - grounding our work in <span className="font-black">authenticity</span>, driving it with <span className="font-black">creativity</span>, and strengthening it through <span className="font-black">strategy</span>.
    </>
  );

  return (
    <section id="things-we-believe-in" className="flex items-center justify-center py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-0 bg-white overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Text Section */}
        <div className="text-left mb-8 sm:mb-10 md:mb-14 lg:mb-16">
          {/* Heading */}
          <h2
            className="font-bold text-black text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-[48px] leading-tight mb-3 sm:mb-4 text-left"
            style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 700,
              lineHeight: '120%',
            }}
          >
            {displayHeading}
          </h2>

          {/* Below Text */}
          <div
            className="text-black text-sm sm:text-sm md:text-base lg:text-lg leading-relaxed text-left max-w-3xl"
            style={{
              fontWeight: 400,
              lineHeight: '150%',
            }}
          >
            {description ? (
              <PrismicRichText
                field={description}
                components={{
                  paragraph: ({ children }) => <p>{children}</p>,
                  strong: ({ children }) => <span className="font-black">{children}</span>,
                }}
              />
            ) : (
              <p>{defaultDescriptionJSX}</p>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 md:gap-6 lg:gap-6 xl:gap-8">
          {displayCards.map((card, index) => {
            const image = card.image || defaults.cards[index]?.image;
            const number = `${String(index + 1).padStart(2, "0")}/`;

            return (
              <div
                key={index}
                className={`w-full space-y-3 sm:space-y-4 ${index === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:justify-self-center lg:max-w-none' : ''}`}
              >
                {showImages && image ? (
                  // Red card with image (legacy layout)
                  <div className="w-full aspect-[4/3] bg-brand flex items-center justify-center">
                    <img
                      src={image}
                      alt={card.title || defaults.cards[index]?.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  // Numbered marker: 01/ 02/ 03/
                  <div className="border-t border-black pt-5 md:pt-6">
                    <span
                      className="font-epilogue font-bold text-brand text-5xl md:text-6xl leading-none"
                      style={{ fontFamily: 'Epilogue, sans-serif' }}
                    >
                      {number}
                    </span>
                  </div>
                )}

                {/* Text Content */}
                <h3
                  className="font-bold text-black text-xl sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-left"
                  style={{ fontFamily: 'Epilogue, sans-serif' }}
                >
                  {card.title || defaults.cards[index]?.title}
                </h3>

                <p className="text-black text-sm sm:text-sm md:text-base lg:text-sm xl:text-base leading-relaxed text-left">
                  {card.description || defaults.cards[index]?.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThingsWeBelieveIn;
