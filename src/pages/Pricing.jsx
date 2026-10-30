import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { usePageMeta } from "../hooks/usePageMeta";
import PackagesTable from "../components/Pricing/PackagesTable";
import EnquiryForm from "../components/Pricing/EnquiryForm";
import { hero, packagesIntro, bespoke } from "../data/pricingData";
import { pageSeo } from "../data/seo";

// Same filled / outlined button pair used across the site, with the sliding-chevron hover
const HeroButton = ({ href, onClick, children, variant }) => {
  const filled = variant === "filled";
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 h-12 px-8 py-3 text-sm font-bold tracking-wide relative overflow-hidden group ${
        filled ? "bg-brand text-white border-transparent" : "bg-transparent border border-brand text-brand"
      }`}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
        <FaChevronRight className={`${filled ? "text-white" : "text-brand"} w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]`} />
      </div>
      <span className="block transition-all duration-300 ease-in-out text-base whitespace-nowrap group-hover:translate-x-40">{children}</span>
    </a>
  );
};

const Pricing = () => {
  const seo = pageSeo("/pricing");
  usePageMeta(seo.title, seo.description);

  const [wantBrochure, setWantBrochure] = useState(false);
  const formSectionRef = useRef(null);

  // Both "Get the brochure" and "Get a quote" jump to the same form; the brochure ones also pre-tick the box
  const goToForm = useCallback(({ brochure = false } = {}) => {
    if (brochure) setWantBrochure(true);
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", brochure ? "#brochure" : "#quote");
  }, []);

  // Deep links: /pricing#brochure (pre-ticked) and /pricing#quote
  useEffect(() => {
    const hash = window.location.hash;
    if (hash !== "#brochure" && hash !== "#quote") return;
    if (hash === "#brochure") setWantBrochure(true);
    const t = setTimeout(() => formSectionRef.current?.scrollIntoView({ block: "start" }), 400);
    return () => clearTimeout(t);
  }, []);

  const link = (brochure) => (e) => {
    e.preventDefault();
    goToForm({ brochure });
  };

  return (
    <div className="w-full">
      {/* 1. Hero */}
      <section className="pt-24 md:pt-32 mt-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 pb-14 md:pb-20 text-center">
          <h1 className="mx-auto max-w-5xl font-epilogue font-bold text-[clamp(40px,7.4vw,108px)] leading-[1.04] tracking-tight">
            {hero.heading}
          </h1>
          <p className="mt-6 md:mt-8 mx-auto max-w-2xl text-base md:text-xl leading-relaxed">{hero.intro}</p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <HeroButton href="#brochure" onClick={link(true)} variant="filled">{hero.primaryButton}</HeroButton>
            <HeroButton href="#quote" onClick={link(false)} variant="outline">{hero.secondaryButton}</HeroButton>
          </div>
        </div>
      </section>

      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black" />

      {/* 2. Our packages */}
      <section aria-labelledby="packages-heading">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-14 md:py-20">
          <h2 id="packages-heading" className="text-center font-epilogue font-bold text-4xl md:text-6xl leading-[1.05]">{packagesIntro.heading}</h2>
          <p className="mt-4 mb-10 md:mb-14 mx-auto max-w-2xl text-center text-base md:text-lg">{packagesIntro.line}</p>
          <PackagesTable onGetBrochure={() => goToForm({ brochure: true })} />
        </div>
      </section>

      {/* 3. Bespoke work + contact form: the section that draws the eye */}
      <section id="enquire" ref={formSectionRef} className="bg-black text-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            {/* No tag above the heading: no eyebrow labels in Silo designs (Will, 27 Oct 2026) */}
            <h2 className="font-epilogue font-bold text-4xl md:text-6xl leading-[1.05]">{bespoke.heading}</h2>
            <div className="mt-8 space-y-5 text-base md:text-lg leading-relaxed text-white/90">
              {bespoke.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white text-black p-6 sm:p-8 md:p-10">
              <EnquiryForm wantBrochure={wantBrochure} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
