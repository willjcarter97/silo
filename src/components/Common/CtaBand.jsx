import { FaChevronRight } from "react-icons/fa";

/**
 * CtaBand - full-width black call-to-action band (Nic's October "no images" designs).
 * Replaces the old bordered box with an image. It breaks out of the page container to the
 * full viewport width and sits directly on top of the footer, so pages should not wrap it in
 * divider lines.
 *
 * actions: [{ text, href, variant: "primary" | "secondary" }] - empty/missing entries are skipped.
 */
const CtaBand = ({ heading, description, actions = [], className = "" }) => {
  const visible = actions.filter((a) => a && a.text && a.href);

  return (
    <section
      className={`relative left-1/2 -translate-x-1/2 w-screen bg-black text-white mt-16 md:mt-24 ${className}`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
        <h2 className="font-epilogue font-bold text-4xl md:text-5xl tracking-tight">{heading}</h2>
        {description && (
          <p className="mt-6 text-base md:text-lg leading-relaxed text-white/90 max-w-[34rem]">{description}</p>
        )}
        {visible.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {visible.map((action) => (
              <a
                key={action.href + action.text}
                href={action.href}
                className={`inline-flex items-center justify-center h-[55px] px-6 font-bold text-base relative overflow-hidden group ${
                  action.variant === "secondary"
                    ? "border border-white text-white hover:bg-white hover:text-black transition-colors"
                    : "bg-brand text-white"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom"
                >
                  <FaChevronRight className="w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-[140%]" />
                </span>
                <span className="block transition-all duration-300 ease-in-out group-hover:translate-x-40">
                  {action.text}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CtaBand;
