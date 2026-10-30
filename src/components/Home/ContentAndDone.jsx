import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight, MdOutlineLocationOn } from "react-icons/md";
import { client } from "../../prismicio";
import { getCaseStudyLocation } from "../../data/caseStudyLocations";
import LazyImage from "../Common/LazyImage";
import LazyText from "../Common/LazyText";
import LazyElement from "../Common/LazyElement";
import ServiceIcon from "./ServiceIcon";
import { SERVICE_TEASERS, findServiceTeaser } from "../../data/serviceTeasers";

// Helper to extract plain text from Prismic Rich Text
const asText = (richTextField) => {
  if (!richTextField) return "";
  if (typeof richTextField === "string") return richTextField;
  return richTextField.map((block) => block.text || "").join(" ");
};

// Default service cards (used when Prismic data is not available). Copy and icons live in
// src/data/serviceTeasers.js. The October designs show no photography here, so Prismic's
// service_image is no longer rendered.
const DEFAULT_SERVICE_CARDS = SERVICE_TEASERS.map((t) => ({ title: t.title, description: "", link: "/services" }));

// Desktop Case Study Card for Homepage
const HomepageCaseStudyDesktop = ({ caseStudy, isLast }) => {
  const link = `/case-studies/${caseStudy.uid}`;
  
  return (
    <div
      className={`hidden lg:flex items-center justify-around space-x-40 py-6 group relative cursor-pointer`}
      onClick={() => (window.location.href = link)}
    >
      <div className="w-1/3 aspect-[4/3] flex items-center justify-center overflow-hidden transform transition-transform duration-600 ease-in-out lg:group-hover:-translate-x-0">
        <LazyImage
          src={caseStudy.featuredImage}
          alt={caseStudy.title}
          className="max-w-full max-h-[280px] object-contain"
          containerClassName="w-full h-full flex items-center justify-center"
          animationDuration={600}
        />
      </div>
      <div className="w-[50%] flex flex-col justify-center items-start gap-4 text-left transform transition-transform duration-600 ease-in-out">
        <LazyText as="h3" className="text-4xl font-bold text-black" animation="fadeUp" delay={100}>
          {caseStudy.title}
        </LazyText>
        <LazyText as="p" className="text-xl text-black" animation="fadeUp" delay={150}>
          {caseStudy.subtitle}
        </LazyText>
        <LazyText as="p" className="text-lg text-black" animation="fadeUp" delay={200}>
          {caseStudy.description}
        </LazyText>
        <div className="flex flex-wrap md:flex-nowrap gap-2 mt-2">
          {caseStudy.location && (
            <span className="inline-flex items-center gap-1 text-base font-semibold text-black p-2 border border-black">
              <MdOutlineLocationOn className="text-lg" aria-hidden />
              {caseStudy.location}
            </span>
          )}
          {caseStudy.tags.map((tag, index) => (
            <span key={index} className="text-base font-semibold text-black p-2 bg-brand/20">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          className="inline-flex items-center gap-2 font-dm mt-6 mb-5 font-bold text-xl leading-[150%] text-[#FF322E] tracking-normal group"
        >
          <span>View Project</span>
          <span
            aria-hidden
            className="inline-block ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
          >
            <MdOutlineKeyboardArrowRight className="text-2xl font-black" />
          </span>
        </a>
      </div>
    </div>
  );
};

// Tablet Case Study Card for Homepage
const HomepageCaseStudyTablet = ({ caseStudy, isLast }) => {
  const link = `/case-studies/${caseStudy.uid}`;
  
  return (
    <div
      className={`block md:flex lg:hidden items-center w-full mx-auto justify-center md:space-x-10 space-y-3 md:space-y-0 py-12 pt-5 group relative mt-0 cursor-pointer`}
      onClick={() => (window.location.href = link)}
    >
      <div className="w-full md:w-[80%] flex flex-col justify-center items-start gap-4 text-left">
        <LazyText as="h3" className="text-4xl font-bold text-black" animation="fadeUp" delay={100}>
          {caseStudy.title}
        </LazyText>
        <LazyText as="p" className="text-xl text-black" animation="fadeUp" delay={150}>
          {caseStudy.subtitle}
        </LazyText>
        <LazyText as="p" className="text-lg text-black" animation="fadeUp" delay={200}>
          {caseStudy.description}
        </LazyText>
        <div className="flex flex-wrap gap-2 mt-2">
          {caseStudy.location && (
            <span className="inline-flex items-center gap-1 text-base font-semibold md:whitespace-nowrap text-black p-2 border border-black">
              <MdOutlineLocationOn className="text-lg" aria-hidden />
              {caseStudy.location}
            </span>
          )}
          {caseStudy.tags.map((tag, index) => (
            <span key={index} className="text-base font-semibold md:whitespace-nowrap text-black p-2 bg-brand/20">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          className="inline-flex items-center gap-2 font-dm mt-6 mb-5 font-bold text-xl leading-[150%] text-[#FF322E] tracking-normal group"
          onClick={(e) => e.stopPropagation()}
        >
          <span>View Project</span>
          <span
            aria-hidden
            className="inline-block ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
          >
            <MdOutlineKeyboardArrowRight className="text-2xl font-black" />
          </span>
        </a>
      </div>
      <div className="w-full md:w-1/2 aspect-[4/3] flex items-center justify-center overflow-hidden">
        <LazyImage
          src={caseStudy.featuredImage}
          alt={caseStudy.title}
          className="max-w-full max-h-[220px] md:max-h-[280px] object-contain"
          containerClassName="w-full h-full flex items-center justify-center"
          animationDuration={600}
        />
      </div>
    </div>
  );
};

// Mobile Case Study Card for Homepage
const HomepageCaseStudyMobile = ({ caseStudy }) => {
  const link = `/case-studies/${caseStudy.uid}`;
  
  return (
    <div
      className="py-8 cursor-pointer"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.target.closest("a"))
          window.location.href = link;
      }}
      onClick={(e) => {
        if (e.target.closest && e.target.closest("a")) return;
        window.location.href = link;
      }}
    >
      <div className="w-full aspect-[4/3] mb-0 flex items-center justify-center overflow-hidden">
        <LazyImage
          src={caseStudy.featuredImage}
          alt={caseStudy.title}
          className="max-w-full max-h-[220px] object-contain"
          containerClassName="w-full h-full flex items-center justify-center"
          animationDuration={600}
        />
      </div>
      <div className="space-y-4 mt-10">
        <LazyText as="h3" className="text-2xl font-bold text-black" animation="fadeUp" delay={100}>
          {caseStudy.title}
        </LazyText>
        <LazyText as="p" className="text-lg text-black font-bold" animation="fadeUp" delay={150}>
          {caseStudy.subtitle}
        </LazyText>
        <LazyText as="p" className="text-base font-medium text-black leading-relaxed" animation="fadeUp" delay={200}>
          {caseStudy.description}
        </LazyText>
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          {caseStudy.location && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-black p-2 border border-black">
              <MdOutlineLocationOn className="text-base" aria-hidden />
              {caseStudy.location}
            </span>
          )}
          {caseStudy.tags.map((tag, index) => (
            <span key={index} className="text-sm font-semibold text-black p-2 bg-brand/20">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          className="inline-flex items-center gap-2 font-dm font-bold text-lg text-[#FF322E] group"
        >
          <span>View Project</span>
          <span className="transform transition-transform duration-300 ease-in-out group-hover:translate-x-2">
            <MdOutlineKeyboardArrowRight className="text-xl" />
          </span>
        </a>
      </div>
    </div>
  );
};

// Service card (Nic's October design): bordered box with a small geometric icon, the title with its last
// word on its own line from tablet up ("Custom Web / Development"), and a one-line blurb at the foot.
const ServiceCard = ({ card }) => {
  const teaser = findServiceTeaser(card.title);
  const blurb = card.description || teaser?.blurb || "";
  const words = (card.title || "").trim().split(/\s+/);
  const last = words.length > 1 ? words.pop() : null;
  const Tag = card.link ? "a" : "div";

  return (
    <Tag
      {...(card.link ? { href: card.link } : {})}
      className="group h-full flex flex-col border border-black p-6 lg:p-7 md:min-h-[19rem] transition-colors duration-300 hover:border-brand focus-visible:border-brand"
    >
      <ServiceIcon name={teaser?.icon} className="w-12 h-12 lg:w-14 lg:h-14 shrink-0" />
      <h3 className="mt-6 font-epilogue font-bold text-2xl lg:text-[26px] leading-[1.2] text-black transition-colors duration-300 group-hover:text-brand">
        {words.join(" ")}
        {last && (
          <>
            {" "}
            <br className="hidden md:block" />
            {last}
          </>
        )}
      </h3>
      {blurb && <p className="mt-4 md:mt-auto md:pt-8 text-sm leading-relaxed text-black">{blurb}</p>}
    </Tag>
  );
};

export default function ContentAndDone({
  servicesHeading = "This is simply what we do",
  serviceCards = [],
  caseStudiesHeading = "Stuff we've done",
  caseStudiesSubheading = "Just some of the brands we've worked with",
  viewAllButtonText = "View all",
  viewAllButtonLink = "/case-studies",
}) {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use provided service cards or fall back to defaults
  const displayServiceCards = serviceCards.length > 0 ? serviceCards : DEFAULT_SERVICE_CARDS;

  // Fetch case studies from Prismic (only those marked for homepage)
  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        setIsLoading(true);
        const response = await client.getAllByType("case_study", {
          orderings: {
            field: "my.case_study.display_order",
            direction: "asc",
          },
        });

        // Filter to only show homepage case studies and limit to first 3
        const homepageStudies = response
          .filter((study) => study.data.show_on_homepage === true)
          .slice(0, 3)
          .map((study) => ({
            id: study.id,
            uid: study.uid,
            title: study.data.title || "Untitled",
            subtitle: study.data.subtitle || "",
            description: asText(study.data.description),
            featuredImage: study.data.featured_image?.url || "",
            location: study.data.location || getCaseStudyLocation(study.uid),
            tags: study.data.tags?.map((t) => t.tag_name).filter(Boolean) || [],
          }));

        setCaseStudies(homepageStudies);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCaseStudies();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer = null;
    const pending = new WeakMap();

    const setup = () => {
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const els = Array.from(document.querySelectorAll(".hover-placeholder"));

      if (observer) {
        observer.disconnect();
        observer = null;
      }

      if (!isTablet) {
        els.forEach((el) => {
          if (pending.has(el)) {
            clearTimeout(pending.get(el));
            pending.delete(el);
          }
          el.classList.remove(
            "opacity-100",
            "scale-100",
            "rotate-0",
            "pointer-events-auto",
            "in-view"
          );
          el.classList.add(
            "opacity-0",
            "scale-90",
            "rotate-6",
            "pointer-events-none"
          );
        });
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            if (entry.isIntersecting) {
              if (el.classList.contains("in-view")) return;
              if (pending.has(el)) return;
              const id = window.setTimeout(() => {
                el.classList.add(
                  "opacity-100",
                  "scale-100",
                  "rotate-0",
                  "pointer-events-auto",
                  "in-view"
                );
                el.classList.remove(
                  "opacity-0",
                  "scale-90",
                  "rotate-6",
                  "pointer-events-none"
                );
                pending.delete(el);
              }, 1000);
              pending.set(el, id);
            } else {
              if (pending.has(el)) {
                clearTimeout(pending.get(el));
                pending.delete(el);
              }
              el.classList.remove(
                "opacity-100",
                "scale-100",
                "rotate-0",
                "pointer-events-auto",
                "in-view"
              );
              el.classList.add(
                "opacity-0",
                "scale-90",
                "rotate-6",
                "pointer-events-none"
              );
            }
          });
        },
        { threshold: 0 }
      );

      els.forEach((el) => observer.observe(el));
    };

    setup();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      if (observer) observer.disconnect();
      const els = Array.from(document.querySelectorAll(".hover-placeholder"));
      els.forEach((el) => {
        if (pending.has(el)) {
          clearTimeout(pending.get(el));
          pending.delete(el);
        }
      });
    };
  }, []);

  return (
    <div className="mx-auto px-0 max-w-[1280px]">
      {/* Desktop view (hidden on mobile) */}
      <div className="hidden md:block overflow-visible max-w-[1280px]">
        <div className="flex items-center justify-between gap-8 w-full mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-black">
            {servicesHeading}
          </h2>
          <a
            href="/services"
            className="shrink-0 inline-flex items-center justify-center bg-brand h-[48px] px-6 text-base font-bold text-white relative overflow-hidden group"
          >
            <span aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
              <FaChevronRight className="text-white w-4 h-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-[140%]" />
            </span>
            <span className="block transition-all duration-300 ease-in-out group-hover:translate-x-40">Our Services</span>
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-16 mb-4">
          {displayServiceCards.slice(0, 4).map((card, index) => (
            <LazyElement key={index} as="article" className="h-full" animation="fadeUp" delay={index * 100}>
              <ServiceCard card={card} />
            </LazyElement>
          ))}
        </div>
        {/* Internal Section Divider - consistent spacing */}
        <div className="w-[100vw] h-[1px] bg-black my-16 md:my-24 relative left-1/2 -translate-x-1/2"></div>

        <div id="done" className="w-full min-h-screen pb-10">
          <h2 className="text-7xl font-bold tracking-tight text-black mb-4">
            {caseStudiesHeading}
          </h2>
          <p className="text-lg text-black mb-10 font-bold mt-10">
            {caseStudiesSubheading}
          </p>

          <div className="w-full my-20 border-t-[0px] border-t-black">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
              </div>
            ) : (
              caseStudies.map((study, index) => (
                <React.Fragment key={study.id}>
                  <HomepageCaseStudyDesktop 
                    caseStudy={study} 
                    isLast={index === caseStudies.length - 1} 
                  />
                  <HomepageCaseStudyTablet 
                    caseStudy={study} 
                    isLast={index === caseStudies.length - 1} 
                  />
                </React.Fragment>
              ))
            )}
          </div>

          <div className="flex justify-center md:mt-10">
            <a
              href={viewAllButtonLink}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-[55px] px-6 py-3 text-xs font-bold tracking-wide text-brand relative overflow-hidden group"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                <FaChevronRight className="text-brand w-4 h-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
              </div>
              <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-28">
                {viewAllButtonText}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile-only view (hidden on desktop) */}
      <div className="block md:hidden mt-[-1rem] px-[4vw]">
        <h2 className="text-4xl font-bold tracking-tight text-black">
          {servicesHeading}
        </h2>
        <a
          href="/services"
          className="mt-6 inline-flex items-center justify-center bg-brand h-[48px] px-6 text-base font-bold text-white"
        >
          Our Services
        </a>

        {/* Stacked mobile cards */}
        <div className="flex flex-col gap-4 mt-10">
          {displayServiceCards.slice(0, 4).map((card, index) => (
            <LazyElement key={index} as="article" animation="fadeUp" delay={index * 100}>
              <ServiceCard card={card} />
            </LazyElement>
          ))}
        </div>

        {/* Internal Section Divider - mobile */}
        <div className="w-[100vw] h-[1px] bg-black my-16 relative left-1/2 -translate-x-1/2"></div>

        {/* Mobile Done Section */}
        <div id="done-mobile" className="w-full">
          <h2 className="text-4xl font-bold tracking-tight text-black mb-4">
            {caseStudiesHeading}
          </h2>
          <p className="text-base text-black mb-16 font-bold">
            {caseStudiesSubheading}
          </p>

          <div className="space-y-12 border-t-[1px] border-t-black pb-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
              </div>
            ) : (
              caseStudies.map((study) => (
                <HomepageCaseStudyMobile key={study.id} caseStudy={study} />
              ))
            )}
          </div>

          <div className="flex justify-center mt-12">
            <a
              href={viewAllButtonLink}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-[55px] px-6 py-3 text-base font-extrabold tracking-wide text-brand"
            >
              <span>{viewAllButtonText}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
