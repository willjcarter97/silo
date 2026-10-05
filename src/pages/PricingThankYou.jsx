import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import Label from "../components/Pricing/Label";
import { thankYou } from "../data/pricingData";

// A separate page (rather than a message on /pricing) so enquiries can be tracked as conversions.
// Not for search engines: noindex, and left out of the sitemap.
const PricingThankYou = () => {
  const [params] = useSearchParams();
  const brochure = params.get("brochure") === "1";
  const copy = brochure ? thankYou.brochure : thankYou.standard;

  usePageMeta("Thank you | Silo", "Thanks for getting in touch with Silo.");

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    // Conversion event for Google Analytics
    window.gtag?.("event", "pricing_enquiry_thank_you", { brochure_requested: brochure });
    return () => meta.remove();
  }, [brochure]);

  return (
    <div className="w-full pt-24 md:pt-32 mt-20 pb-16 md:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <Label>enquiry sent</Label>
        <h1 className="mt-6 max-w-4xl font-epilogue font-bold text-[clamp(36px,6.4vw,92px)] leading-[1] tracking-tight">{copy.heading}</h1>
        <p className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed">{copy.body}</p>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-brand h-12 px-8 text-base font-bold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Back to the homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingThankYou;
