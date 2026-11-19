import { PrismicRichText } from "@prismicio/react";

// Same text styles as GalleryWithText, so both gallery slices read alike
const richTextComponents = {
  paragraph: ({ children }) => (
    <p className="text-base md:text-lg font-dm text-black leading-relaxed mb-4 last:mb-0">{children}</p>
  ),
  heading2: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-dm font-semibold text-black mb-2 mt-6 first:mt-0">{children}</h3>
  ),
  heading3: ({ children }) => (
    <h3 className="text-lg md:text-xl font-dm font-semibold text-black mb-2 mt-5 first:mt-0">{children}</h3>
  ),
  list: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
  oList: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
  listItem: ({ children }) => (
    <li className="text-base md:text-lg font-dm text-black leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  hyperlink: ({ children, node }) => (
    <a href={node.data.url} className="text-brand underline hover:no-underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};

/**
 * Case study slice `gallery_with_text_right`: heading and text on the left, images on the right.
 * Desktop columns follow the Figma (432px text / 768px images of 1280px). On mobile the text comes first.
 * The text stays in view while the images scroll past it.
 */
const GalleryWithTextRight = ({ heading, richText, images = [] }) => {
  const shownImages = images.filter((image) => image?.src);

  return (
    <section className="w-full bg-white py-8 md:py-20 px-5 md:px-10 min-[1360px]:px-0">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 lg:grid lg:grid-cols-[432fr_768fr] lg:gap-20 lg:items-start">
        <div className="lg:sticky lg:top-32">
          {heading && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">{heading}</h2>
          )}
          {Array.isArray(richText) && richText.length > 0 && (
            <div className="space-y-4">
              <PrismicRichText field={richText} components={richTextComponents} />
            </div>
          )}
        </div>

        {shownImages.length > 0 && (
          <div className="flex flex-col gap-8">
            {shownImages.map((image, index) => (
              <img key={index} src={image.src} alt={image.alt || ""} className="w-full h-auto" loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryWithTextRight;
