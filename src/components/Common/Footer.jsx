import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { client } from "../../prismicio";

// Default footer data (fallback if Prismic fails)
const defaultFooterData = {
  logo: "https://images.prismic.io/silosite/aVUgn3NYClf9otsW_v1762717230_footerlogo_tllimb.png?auto=format,compress",
  newsletterHeading: "Join our newsletter to stay up to date.",
  newsletterPlaceholder: "Enter your email",
  newsletterButtonText: "Subscribe",
  newsletterTermsText: "By subscribing you agree to with our",
  newsletterTermsLinkText: "Legal & Website Terms",
  newsletterTermsLink: "/legal",
  copyrightText: "The Silo Creative Limited",
  aboutLinks: [
    { label: "Services", link: "/services", isAnchor: false },
    { label: "About the Silo", link: "/about", isAnchor: false },
    { label: "Mission and Values", link: "/about", anchor: "things-we-believe-in", isAnchor: true },
    { label: "Meet the Team", link: "/about", anchor: "minds-in-the-silo", isAnchor: true },
    { label: "Careers", link: "/careers", isAnchor: false },
    { label: "Job Board", link: "/job-board", isAnchor: false },
    { label: "Ramblings", link: "/blog", isAnchor: false },
  ],
  socialLinks: [
    { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/thesilocreative/", icon: "instagram" },
    { platform: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@the.silo.creative", icon: "tiktok" },
    { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/the-silo-creative/", icon: "linkedin" },
  ],
  legalLinks: [
    { label: "Legal & Website Terms", link: "/legal" },
    { label: "Terms & Conditions", link: "/terms" },
    { label: "Cookies Policy", link: "/privacy" },
  ],
};

/**
 * Helper to resolve Prismic Link fields to URLs
 */
const resolveLinkUrl = (linkField) => {
  if (!linkField) return null;
  
  // If it's just a plain string (direct URL), return it
  if (typeof linkField === "string") {
    return linkField;
  }
  
  // Web links
  if (linkField.link_type === "Web" && linkField.url) {
    return linkField.url;
  }
  
  // Media links (images, files)
  if (linkField.link_type === "Media" && linkField.url) {
    return linkField.url;
  }
  
  // Document links (internal)
  if (linkField.link_type === "Document") {
    const typeRoutes = {
      home_page: "/",
      about_page: "/about",
      case_study: `/case-studies/${linkField.uid}`,
      blog_post: `/blog/${linkField.uid}`,
      services_page: "/services",
      job_board_page: "/job-board",
      careers_page: "/careers",
      contact_page: "/contact",
      ugc_contact_page: "/ugc-contact",
      terms_page: "/terms",
      privacy_page: "/privacy",
      legal_page: "/legal",
      ramblings_page: "/blog",
      portfolio_page: "/case-studies",
    };
    return typeRoutes[linkField.type] || (linkField.uid ? `/${linkField.uid}` : null);
  }
  
  // Fallback: try to use url property directly
  if (linkField.url) {
    return linkField.url;
  }
  
  return null;
};

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const [footerData, setFooterData] = useState(defaultFooterData);
  const [caseStudies, setCaseStudies] = useState([]);

  // Fetch footer data from Prismic
  useEffect(() => {
    async function fetchFooterData() {
      try {
        const response = await client.getSingle("footer");
        
        if (response?.data) {
          const data = response.data;
          
          const transformedData = {
            ...defaultFooterData,
            logo: data.logo?.url || defaultFooterData.logo,
            newsletterHeading: data.newsletter_heading || defaultFooterData.newsletterHeading,
            newsletterPlaceholder: data.newsletter_placeholder || defaultFooterData.newsletterPlaceholder,
            newsletterButtonText: data.newsletter_button_text || defaultFooterData.newsletterButtonText,
            newsletterTermsText: data.newsletter_terms_text || defaultFooterData.newsletterTermsText,
            newsletterTermsLinkText: data.newsletter_terms_link_text || defaultFooterData.newsletterTermsLinkText,
            newsletterTermsLink: resolveLinkUrl(data.newsletter_terms_link) || defaultFooterData.newsletterTermsLink,
            copyrightText: data.copyright_text || defaultFooterData.copyrightText,
          };

          // Handle about links if they exist in Prismic (with proper fallback)
          if (data.about_links && Array.isArray(data.about_links) && data.about_links.length > 0) {
            const parsedAboutLinks = data.about_links
              .filter(item => item.is_visible !== false)
              .map(item => ({
                label: item.label || "",
                link: resolveLinkUrl(item.link) || "#",
                anchor: item.anchor || null,
                isAnchor: !!item.anchor,
              }))
              .filter(item => item.label && item.link !== "#");
            
            if (parsedAboutLinks.length > 0) {
              transformedData.aboutLinks = parsedAboutLinks;
            }
          }

          // Handle social links if they exist in Prismic (with proper fallback)
          if (data.social_links && Array.isArray(data.social_links) && data.social_links.length > 0) {
            const parsedSocialLinks = data.social_links
              .filter(item => item.is_visible !== false)
              .map(item => ({
                platform: item.platform || "link",
                label: item.label || "",
                url: item.url?.url || resolveLinkUrl(item.url) || "#",
                icon: item.icon || item.platform || "link",
              }))
              .filter(item => item.label && item.url !== "#");
            
            if (parsedSocialLinks.length > 0) {
              transformedData.socialLinks = parsedSocialLinks;
            }
          }

          // Handle legal links if they exist in Prismic (with proper fallback)
          if (data.legal_links && Array.isArray(data.legal_links) && data.legal_links.length > 0) {
            const parsedLegalLinks = data.legal_links
              .filter(item => item.is_visible !== false)
              .map(item => ({
                label: item.label || "",
                link: resolveLinkUrl(item.link) || "#",
              }))
              .filter(item => item.label && item.link !== "#");
            
            if (parsedLegalLinks.length > 0) {
              transformedData.legalLinks = parsedLegalLinks;
            }
          }
          
          setFooterData(transformedData);
        }
      } catch (error) {
        console.warn("Could not fetch footer from Prismic:", error.message);
      }
    }

    // Fetch case studies for the footer column
    async function fetchCaseStudies() {
      try {
        const response = await client.getAllByType("case_study", {
          orderings: { field: "my.case_study.display_order", direction: "asc" },
          pageSize: 6,
        });

        const studies = response.map((study) => ({
          uid: study.uid,
          title: study.data.title || "Untitled",
        }));

        setCaseStudies(studies);
      } catch (error) {
        console.warn("Could not fetch case studies for footer:", error.message);
      }
    }

    fetchFooterData();
    fetchCaseStudies();
  }, []);

  // Handle anchor link navigation
  const handleAnchorClick = (e, path, anchor) => {
    e.preventDefault();
    navigate(path);
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Render social icon based on platform
  const renderSocialIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case "instagram":
        return (
          <img
            src="https://images.prismic.io/silosite/aVUgo3NYClf9otsa_v1762717241_Instagram_ec8sza.png?auto=format,compress"
            alt="Instagram"
            className="w-4 h-4"
            loading="lazy"
          />
        );
      case "tiktok":
        return <SiTiktok className="w-4 h-4 text-black font-bold" />;
      case "linkedin":
        return (
          <img
            src="https://images.prismic.io/silosite/aVUf83NYClf9otq0_v1762717248_Linkedin_joc2nv.png?auto=format,compress"
            alt="LinkedIn"
            className="w-4 h-4"
            loading="lazy"
          />
        );
      default:
        return null;
    }
  };

  // Render about link (handles both regular and anchor links)
  const renderAboutLink = (item, index, isMobile = false) => {
    const className = isMobile 
      ? "text-sm"
      : "text-sm ease-in-out duration-200 cursor-pointer hover:text-brand";
    const style = isMobile ? {} : {
      fontFamily: "DM Sans",
      fontWeight: 700,
      lineHeight: "150%",
    };

    if (item.isAnchor && item.anchor) {
      return (
        <a
          href={`${item.link}#${item.anchor}`}
          onClick={(e) => handleAnchorClick(e, item.link, item.anchor)}
          className={className}
          style={style}
        >
          {item.label}
        </a>
      );
    }

    return (
      <NavLink to={item.link} className={className} style={style}>
        {item.label}
      </NavLink>
    );
  };

  return (
    <footer className="w-full bg-white text-black max-w-[1280px] mx-auto">
      <div className="mx-3 md:mx-auto">
        {/* Top grid: logo/newsletter + link columns */}
        <div className="hidden md:block w-full py-10 md:py-14 lg:px-0">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
              {/* Left: Brand + Newsletter */}
              <div className="md:col-span-5">
                <Link to="/" className="flex items-center gap-2 mb-6">
                  <img
                    src={footerData.logo}
                    alt="Silo logo"
                    className="h-8"
                    loading="lazy"
                  />
                </Link>
                <p className="text-base font-semibold mb-5 -mt-2">
                  {footerData.newsletterHeading}
                </p>
                <form
                  id="footer-newsletter-form"
                  name="Footer Newsletter Subscription"
                  className="flex w-full max-w-md items-stretch gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    aria-label="Email address"
                    placeholder={footerData.newsletterPlaceholder}
                    className="w-full border border-black px-4 py-2.5 text-sm font-bold placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    required
                  />
                  <button
                    type="submit"
                    className="shrink-0 inline-flex items-center justify-center gap-2 bg-transparent border-[1px] border-brand h-[42px] px-4 py-2.5 text-xs font-bold tracking-wide text-brand relative overflow-hidden group"
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                      <FaChevronRight className="text-brand w-4 h-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                    </div>
                    <span className="block transition-all duration-300 ease-in-out text-sm group-hover:translate-x-40">
                      {footerData.newsletterButtonText}
                    </span>
                  </button>
                </form>
                <p className="mt-3 text-sm text-black font-bold max-w-md">
                  {footerData.newsletterTermsText}{" "}
                  <Link
                    to={footerData.newsletterTermsLink}
                    className="underline cursor-pointer ease-in-out duration-200"
                  >
                    {footerData.newsletterTermsLinkText}
                  </Link>{" "}
                  and provide consent to receive updates from our company.
                </p>
              </div>
              {/* Middle: About */}
              <div className="md:col-span-3 md:ml-12 lg:ml-20">
                <h4 className="text-lg font-semibold mb-4">About us</h4>
                <ul className="space-y-3">
                  {footerData.aboutLinks.map((item, index) => (
                    <li key={index}>{renderAboutLink(item, index)}</li>
                  ))}
                </ul>
              </div>
              {/* Right: Case Studies */}
              <div className="md:col-span-2 md:-ml-6 lg:-ml-8">
                <h4 className="text-lg font-semibold mb-4">
                  <Link to="/case-studies" aria-label="Case Studies">
                    Case Studies
                  </Link>
                </h4>
                <ul className="space-y-3">
                  {caseStudies.length > 0 ? (
                    caseStudies.map((study) => (
                      <li key={study.uid}>
                        <a
                          href={`/case-studies/${study.uid}`}
                          className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                          style={{
                            fontFamily: "DM Sans",
                            fontWeight: 700,
                            lineHeight: "150%",
                          }}
                        >
                          {study.title}
                        </a>
                      </li>
                    ))
                  ) : (
                    // Fallback to hardcoded if no case studies loaded
                    <>
                      <li>
                        <a href="/case-studies/basement-approved" className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand" style={{ fontFamily: "DM Sans", fontWeight: 700, lineHeight: "150%" }}>Basement Approved</a>
                      </li>
                      <li>
                        <a href="/case-studies/tomoka-fine-and-rare" className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand" style={{ fontFamily: "DM Sans", fontWeight: 700, lineHeight: "150%" }}>Tomoka Fine & Rare</a>
                      </li>
                      <li>
                        <a href="/case-studies/electrolytes-with-joly" className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand" style={{ fontFamily: "DM Sans", fontWeight: 700, lineHeight: "150%" }}>Electrolytes with Joly</a>
                      </li>
                      <li>
                        <a href="/case-studies/acorn-property-group" className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand" style={{ fontFamily: "DM Sans", fontWeight: 700, lineHeight: "150%" }}>Acorn Property Group</a>
                      </li>
                      <li>
                        <a href="/case-studies/cluberly" className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand" style={{ fontFamily: "DM Sans", fontWeight: 700, lineHeight: "150%" }}>Cluberly</a>
                      </li>
                      <li>
                        <a href="/case-studies/knightsgate-partners" className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand" style={{ fontFamily: "DM Sans", fontWeight: 700, lineHeight: "150%" }}>Knightsgate</a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              {/* Socials */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <ul className="space-y-3">
                  {footerData.socialLinks.map((social, index) => (
                    <li key={index}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm ease-in-out duration-200 cursor-pointer flex items-center gap-2 hover:text-brand"
                        style={{
                          fontFamily: "DM Sans",
                          fontWeight: 700,
                          lineHeight: "150%",
                        }}
                      >
                        {renderSocialIcon(social.platform)}
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Divider */}
          <hr className="mt-10 md:mt-12 border-black" />
          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 pt-6">
            <p className="text-base text-black font-bold">
              © {year} {footerData.copyrightText}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-base">
              {footerData.legalLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="font-bold text-black underline text-sm ease-in-out duration-200 cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Modern mobile-only footer layout */}
        <div className="block md:hidden px-2 py-8 w-full bg-white">
          {/* Top: Brand and copyright */}
          <div className="mb-4">
            <Link to="/" className="font-extrabold text-xl mb-3 inline-block">
              <img
                src={footerData.logo}
                alt="Silo logo"
                className="h-8"
                loading="lazy"
              />
            </Link>
            <div className="text-sm font-bold">
              © {year} {footerData.copyrightText}
            </div>
            <div className="text-sm text-neutral-500 mb-2">
              All rights reserved
            </div>
            {/* Social icons row */}
            <div className="flex gap-3 mb-2 mt-4">
              {footerData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent p-2"
                >
                  <span className="sr-only">{social.label}</span>
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Two columns: About us and Case Studies */}
          <div className="flex w-full mb-4 gap-8">
            <div className="flex-1">
              <div className="font-bold mb-1">About us</div>
              <ul className="space-y-1">
                {footerData.aboutLinks.map((item, index) => (
                  <li key={index}>{renderAboutLink(item, index, true)}</li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <Link
                to="/case-studies"
                className="font-bold mb-1 block text-sm"
                aria-label="Case Studies"
              >
                Case Studies
              </Link>
              <ul className="space-y-1">
                {caseStudies.length > 0 ? (
                  caseStudies.map((study) => (
                    <li key={study.uid}>
                      <a
                        href={`/case-studies/${study.uid}`}
                        className="text-sm hover:text-brand"
                      >
                        {study.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li><a href="/case-studies/basement-approved" className="text-sm hover:text-brand">Basement Approved</a></li>
                    <li><a href="/case-studies/tomoka-fine-and-rare" className="text-sm hover:text-brand">Tomoka Fine & Rare</a></li>
                    <li><a href="/case-studies/electrolytes-with-joly" className="text-sm hover:text-brand">Electrolytes with Joly</a></li>
                    <li><a href="/case-studies/acorn-property-group" className="text-sm hover:text-brand">Acorn Property Group</a></li>
                    <li><a href="/case-studies/cluberly" className="text-sm hover:text-brand">Cluberly</a></li>
                    <li><a href="/case-studies/knightsgate-partners" className="text-sm hover:text-brand">Knightsgate</a></li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-6 pt-4 flex justify-around items-center w-full">
            <div className="flex flex-wrap items-center gap-4 text-xs mx-auto justify-center">
              {footerData.legalLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="ease-in-out font-bold text-black duration-200 cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-6">
            <div className="font-bold mb-2">
              {footerData.newsletterHeading}
            </div>

            <form id="footer-newsletter-form-mobile" name="Footer Newsletter Subscription Mobile" className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="border border-black overflow-hidden">
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder={footerData.newsletterPlaceholder}
                  className="w-full px-3 py-3 text-sm placeholder-black/60 font-bold focus:outline-none bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-3 w-full inline-flex items-center justify-center border-[1px] border-brand h-[42px] px-4 py-2.5 text-sm font-bold tracking-wide text-brand"
                aria-label="SUBSCRIBE"
              >
                {footerData.newsletterButtonText}
              </button>
            </form>
            <p className="text-xs font-bold text-black mt-3">
              {footerData.newsletterTermsText} {footerData.newsletterTermsLinkText} and
              provide consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
