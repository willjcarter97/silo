import { PrismicRichText } from "@prismicio/react";

// Rich text components for proper formatting
const richTextComponents = {
  paragraph: ({ children }) => (
    <p className="text-base md:text-lg text-black leading-relaxed">{children}</p>
  ),
  heading2: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-bold text-black mb-4">{children}</h3>
  ),
  heading3: ({ children }) => (
    <h3 className="text-lg md:text-xl font-bold text-black mb-3">{children}</h3>
  ),
  list: ({ children }) => (
    <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
  ),
  oList: ({ children }) => (
    <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
  ),
  listItem: ({ children }) => (
    <li className="text-base md:text-lg text-black leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  hyperlink: ({ children, node }) => (
    <a href={node.data.url} className="text-brand underline hover:no-underline" target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

const SimpleHeadingText = ({ heading, text, richText }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto py-11 md:py-24 px-5 md:px-6 lg:px-0">
      <div className="max-w-4xl">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-8">
          {heading || "Medium length section heading goes here"}
        </h2>
        <div className="flex flex-col gap-4">
          {/* Priority 1: Use PrismicRichText for proper formatting */}
          {richText && Array.isArray(richText) && richText.length > 0 ? (
            <PrismicRichText field={richText} components={richTextComponents} />
          ) : Array.isArray(text) ? (
            text.map((para, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-black leading-relaxed"
              >
                {para}
              </p>
            ))
          ) : (
            <p className="text-base md:text-lg text-black leading-relaxed">
              {text ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleHeadingText;
