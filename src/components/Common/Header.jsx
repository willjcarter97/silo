import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { client } from "../../prismicio";
import "../../styles/scaling-overrides.css";

// Default navigation data (fallback if Prismic fails)
const defaultNavData = {
  logo: "https://silosite.cdn.prismic.io/silosite/aVUgoXNYClf9otsY_v1762717235_hero_hyl0xu.svg",
  navLinks: [
    { label: "About Us", link: "/about", isVisible: true },
    { label: "Portfolio", link: "/case-studies", isVisible: true },
    { label: "Services", link: "/services", isVisible: true },
    { label: "Job Board", link: "/job-board", isVisible: true },
    { label: "Ramblings", link: "/blog", isVisible: true },
  ],
  ctaText: "Lets Talk",
  ctaLink: "/contact",
  ctaVisible: true,
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
    // Map document types to routes
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

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [navData, setNavData] = useState(defaultNavData);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
  const handleHeaderClick = (e) => {
    // only toggle when clicking the header background (not interactive children)
    // and only on mobile/tablet (below lg breakpoint)
    if (
      e.currentTarget === e.target &&
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      toggle();
    }
  };

  // Fetch navigation data from Prismic
  useEffect(() => {
    async function fetchNavigation() {
      try {
        const response = await client.getSingle("navigation");
        
        if (response?.data) {
          const data = response.data;
          
          // Transform Prismic data to our format
          const transformedNavLinks = data.nav_links
            ?.filter(item => item.is_visible !== false)
            ?.map(item => {
              const resolvedLink = resolveLinkUrl(item.link);
              return {
                label: item.label || "",
                link: resolvedLink || "#",
                isVisible: item.is_visible !== false,
              };
            })
            ?.filter(item => item.link !== "#") || []; // Filter out broken links
          
          const transformedData = {
            logo: data.logo?.url || defaultNavData.logo,
            // Use Prismic nav links only if we got valid ones, otherwise keep defaults
            navLinks: transformedNavLinks.length > 0 ? transformedNavLinks : defaultNavData.navLinks,
            ctaText: data.cta_text || defaultNavData.ctaText,
            ctaLink: resolveLinkUrl(data.cta_link) || defaultNavData.ctaLink,
            ctaVisible: data.cta_visible !== false,
          };
          
          setNavData(transformedData);
        }
      } catch (error) {
        console.warn("Could not fetch navigation from Prismic:", error.message);
        // Keep using default data
      }
    }

    fetchNavigation();
  }, []);

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Always show header when near top of page
          if (currentScrollY < 100) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current + 10) {
            // Scrolling down - hide (with threshold to prevent jitter)
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current - 10) {
            // Scrolling up - show
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a path is active (handles nested routes)
  const isPathActive = (linkPath) => {
    if (linkPath === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(linkPath);
  };

  return (
    <header
      onClick={handleHeaderClick}
      className={`fixed top-0 left-0 w-full right-0 z-50 bg-transparent mt-3 md:mt-5 transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-[calc(100%+1.5rem)]"
      }`}
    >
      <div className="mx-3 lg:mx-auto">
        <div className="max-w-[1376px] border-[1px] border-black bg-white mx-auto py-3 px-3 md:px-6 lg:px-10 flex justify-between items-center decoration-black">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center" aria-label="Home">
            <img
              src={navData.logo}
              alt="Silo"
              className="h-5 header2 w-auto md:h-9"
              loading="lazy"
            />
          </Link>

          {/* Right: CTA */}
          <div className="flex items-center justify-center gap-6">
            {/* Center: Nav */}
            <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-4 2xl:gap-6 text-base xl:text-lg font-medium text-black relative">
              {navData.navLinks.map((navItem, index) => (
                <NavLink
                  key={index}
                  to={navItem.link}
                  className={({ isActive }) =>
                    `px-2 xl:px-2.5 2xl:px-1 py-2 xl:py-2.5 2xl:py-3 font-medium whitespace-nowrap transition-colors ${
                      isActive ? "text-brand" : "text-black"
                    }`
                  }
                >
                  {navItem.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              aria-label="Open menu"
              aria-expanded={open}
              className="lg:hidden inline-flex h-7 w-14 items-center justify-center border border-transparent"
              onClick={toggle}
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col items-center justify-center gap-1">
                <span
                  className={`block h-0.5 w-7 bg-black transition-transform duration-300 ${
                    open ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-7 bg-black transition-opacity duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-7 bg-black transition-transform duration-300 ${
                    open ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </span>
            </button>

            {/* CTA visible on large screens only; on tablet/mobile it's inside the hamburger panel below */}
            {navData.ctaVisible && (
              <Link
                to={navData.ctaLink}
                className="hidden lg:inline-flex relative text-sm xl:text-base 2xl:text-lg whitespace-nowrap bg-brand text-white py-2 xl:py-2.5 2xl:py-3 px-4 xl:px-5 2xl:px-6 items-center border-none overflow-hidden header-btn transition-all duration-200 cursor-pointer group no-underline"
              >
                <div className="absolute svg-wrapper group-hover:animate-bounce-custom">
                  <FaChevronRight className="block opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-7" />
                </div>
                <span className="block transition-all font-bold duration-300 ease-in-out group-hover:translate-x-28">
                  {navData.ctaText}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Panel for tablet/mobile: overlay + curtain dropdown */}
      {createPortal(
        <div
          className={`lg:hidden fixed inset-0 z-40 ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* backdrop (below the curtain and below the header) */}
          <div
            onClick={close}
            className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${
              open
                ? "opacity-100 pointer-events-auto z-30"
                : "opacity-0 pointer-events-none"
            }`}
          />

          {/* curtain panel: extends from header with smooth curtain animation */}
          <aside
            className={`absolute left-0 right-0 top-16 md:top-20 overflow-hidden transition-all duration-200 ease-out z-40 ${
              open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ transformOrigin: "top" }}
            aria-hidden={!open}
          >
            <div className="mx-3 lg:mx-auto">
              <div className="max-w-[1280px] border-[1px] border-black border-t-0 mx-auto bg-white shadow-lg">
                <nav className="px-6 py-8 flex-1 flex flex-col gap-6 text-center">
                  {navData.navLinks.map((navItem, index) => (
                    <NavLink
                      key={index}
                      to={navItem.link}
                      onClick={close}
                      className={({ isActive }) =>
                        `text-xl font-medium tracking-tight transition-all duration-150 ${
                          open
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        } ${
                          isActive
                            ? "text-brand border-b-[1px] border-brand pb-1"
                            : "text-black"
                        }`
                      }
                      style={{ transitionDelay: open ? `${80 + index * 80}ms` : "0ms" }}
                    >
                      {navItem.label}
                    </NavLink>
                  ))}
                </nav>

                {navData.ctaVisible && (
                  <div
                    className={`px-6 pb-8 transition-all duration-150 ${
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: open ? `${80 + navData.navLinks.length * 80}ms` : "0ms" }}
                  >
                    <Link
                      to={navData.ctaLink}
                      onClick={close}
                      className="w-full inline-flex items-center justify-center gap-3 bg-brand text-white px-6 py-3 font-bold shadow-lg hover:opacity-95 transition no-underline"
                    >
                      {navData.ctaText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </header>
  );
}
