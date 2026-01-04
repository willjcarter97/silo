import React from "react";
import { FaChevronRight } from "react-icons/fa";

// Default service cards data
const defaultCards = [
  {
    image: "https://images.prismic.io/silosite/aVUgQXNYClf9otrH_v1765879825_2_jegbj9.png?auto=format,compress",
    title: "Social Strategy & Management",
    description: "We don't just post, we plan, manage, and grow your brand's presence.",
    bulletPoints: [
      "Strategy and content planning",
      "Content creation and production",
      "Channel scheduling and management",
      "Community engagement and reporting",
    ],
  },
  {
    image: "https://images.prismic.io/silosite/aVUgQ3NYClf9otrJ_v1765879826_3_r08wlm.png?auto=format,compress",
    title: "Web Design & Development",
    description: "We shape digital spaces. Real craft, real performance that's designed to grow.",
    bulletPoints: [
      "Strategic UX and site architecture",
      "Custom web design for modern brands",
      "Clean, reliable development",
      "Launch support and ongoing improvements",
    ],
  },
  {
    image: "https://images.prismic.io/silosite/aVUgQnNYClf9otrI_v1765879825_Placeholder_Image_zxnykm.png?auto=format,compress",
    title: "Brand Design",
    description: "We design bold branding and expressive motion to shape your visual presence.",
    bulletPoints: [
      "Brand identity and visual systems",
      "Logo design and typographic styling",
      "Colour palettes and design guidelines",
      "Branded templates and presentation materials",
    ],
  },
  {
    image: "https://images.prismic.io/silosite/aVUgRHNYClf9otrK_v1765879826_Placeholder_Image1_me1r2y.png?auto=format,compress",
    title: "Content Strategy",
    description: "We build thoughtful strategies that give content focus, intent and results.",
    bulletPoints: [
      "Audience research and insight development",
      "Content frameworks and pillar definition",
      "Messaging, tone of voice and positioning",
      "Planning, optimisation and performance guidance",
    ],
  },
];

const defaultAddOns = {
  title: "Optional add-ons",
  description: "These services support your core campaign and can be added when needed.",
  bulletPoints: [
    "Email Marketing",
    "Paid Advertising (Meta, Google, TikTok, Bing)",
    "Influencer Campaign Management (talent sourcing, rate negotiation, deliverables)",
    "UGC & Influencer Marketing",
  ],
  ctaText: "Interested in a chat?",
  ctaLink: "/contact",
};

const Interested = ({ interestedData }) => {
  // Use Prismic data if available, otherwise use defaults
  const cards = interestedData?.cards?.length > 0 
    ? interestedData.cards.map((card, index) => ({
        image: card.image || defaultCards[index]?.image,
        title: card.title || defaultCards[index]?.title,
        description: card.description || defaultCards[index]?.description,
        bulletPoints: card.bulletPoints || defaultCards[index]?.bulletPoints,
      }))
    : defaultCards;

  const addOns = {
    title: interestedData?.addOnsTitle || defaultAddOns.title,
    description: interestedData?.addOnsDescription || defaultAddOns.description,
    bulletPoints: interestedData?.addOnsBullets?.length > 0 
      ? interestedData.addOnsBullets 
      : defaultAddOns.bulletPoints,
    ctaText: interestedData?.ctaText || defaultAddOns.ctaText,
    ctaLink: interestedData?.ctaLink || defaultAddOns.ctaLink,
  };

  // Render bullet point with red triangle
  const BulletPoint = ({ text }) => (
    <li className="flex items-start">
      <span
        className="inline-block w-3 h-3 mt-1 mr-3 bg-[#FF322E] rotate-[270deg] flex-shrink-0"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      ></span>
      {text}
    </li>
  );

  // Render a service card
  const ServiceCard = ({ card, isLeftColumn }) => (
    <article className={`border-t border-black ${isLeftColumn ? 'md:p-8 md:pr-8' : 'md:border-l md:p-8 md:pl-8'} p-0 py-6 flex flex-col gap-4`}>
      <div className="w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-epilogue font-bold text-[28px] md:text-[32px] leading-[130%] tracking-normal text-black">
        {card.title}
      </h3>
      <p className="text-base leading-[150%] tracking-normal text-black">
        {card.description}
      </p>
      <ul className="space-y-3 text-sm text-black">
        {card.bulletPoints?.map((point, idx) => (
          <BulletPoint key={idx} text={point} />
        ))}
      </ul>
    </article>
  );

  return (
    <section className="w-full bg-white text-black pt-16 md:pt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-0">
        {/* Two column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mx-auto">
          {/* Card 1 */}
          {cards[0] && <ServiceCard card={cards[0]} isLeftColumn={true} />}
          
          {/* Card 2 */}
          {cards[1] && <ServiceCard card={cards[1]} isLeftColumn={false} />}
          
          {/* Card 3 */}
          {cards[2] && <ServiceCard card={cards[2]} isLeftColumn={true} />}
          
          {/* Card 4 */}
          {cards[3] && <ServiceCard card={cards[3]} isLeftColumn={false} />}

          {/* Card 5: Optional Add-ons - Full width */}
          <article id="optional" className="md:col-span-2 border-t border-black md:pt-8 md:px-8 p-0 pt-6 flex flex-col gap-4">
            <h3 className="font-epilogue font-bold text-[28px] md:text-[32px] leading-[130%] tracking-normal text-black">
              {addOns.title}
            </h3>
            <p className="text-base leading-[150%] tracking-normal text-black">
              {addOns.description}
            </p>
            <ul className="space-y-3 text-sm text-black">
              {addOns.bulletPoints.map((point, idx) => (
                <BulletPoint key={idx} text={point} />
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-4">
              <a
                href={addOns.ctaLink}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-transparent border-[1px] border-brand h-[55px] px-8 py-3 text-xs font-semibold tracking-wide text-brand relative overflow-hidden group w-fit"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="block text-brand w-6 h-6 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-20 group-hover:scale-[140%]" />
                </div>
                <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-60">
                  {addOns.ctaText}
                </span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Interested;
