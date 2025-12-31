import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaChevronRight, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  // Handle anchor link navigation
  const handleAnchorClick = (e, path, anchor) => {
    e.preventDefault();
    navigate(path);
    // Wait for navigation to complete, then scroll to anchor
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
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
                    src="https://res.cloudinary.com/di9tb45rl/image/upload/v1762717230/footerlogo_tllimb.png"
                    alt="Silo logo"
                    className="h-8"
                    loading="lazy"
                  />
                </Link>
                <p className="text-base font-semibold mb-5 -mt-2">
                  Join our newsletter to stay up to date.
                </p>
                <form
                  className="flex w-full max-w-md items-stretch gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    aria-label="Email address"
                    placeholder="Enter your email"
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
                      Subscribe
                    </span>
                  </button>
                </form>
                <p className="mt-3 text-sm text-black font-bold max-w-md">
                  By subscribing you agree to with our{" "}
                  <Link
                    to="/legal"
                    className="underline cursor-pointer ease-in-out duration-200"
                  >
                    Legal & Website Terms
                  </Link>{" "}
                  and provide consent to receive updates from our company.
                </p>
              </div>
              {/* Middle: About */}
              <div className="md:col-span-3 md:ml-12 lg:ml-20">
                <h4 className="text-lg font-semibold mb-4">About us</h4>
                <ul className="space-y-3">
                  <li>
                    <NavLink
                      to="/services"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Services
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      About the Silo
                    </NavLink>
                  </li>
                  <li>
                    <a
                      href="/about#hero"
                      onClick={(e) => handleAnchorClick(e, "/about", "hero")}
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Mission and Values
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about#minds-in-the-silo"
                      onClick={(e) =>
                        handleAnchorClick(e, "/about", "minds-in-the-silo")
                      }
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Meet the Team
                    </a>
                  </li>
                  <li>
                    <NavLink
                      to="/careers"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Careers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/job-board"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Job Board
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/blog"
                      className="text-sm ease-in-out duration-200 cursor-pointer"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Ramblings
                    </NavLink>
                  </li>
                </ul>
              </div>
              {/* Right: Case Studies */}
              <div className="md:col-span-2 md:-ml-6 lg:-ml-8">
                <h4 className="text-lg font-semibold mb-4">
                  {" "}
                  <Link to="/case-studies" aria-label="Case Studies">
                    Case Studies
                  </Link>
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/case-studies/basement-approved"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Basement Approved
                    </a>
                  </li>
                  <li>
                    <a
                      href="/case-studies/tomoka-fine-and-rare"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Tomoka Fine & Rare
                    </a>
                  </li>
                  <li>
                    <a
                      href="/case-studies/electrolytes-with-joly"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Electrolytes with Joly
                    </a>
                  </li>
                  <li>
                    <a
                      href="/case-studies/acorn-property-group"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Acorn Property Group
                    </a>
                  </li>
                  <li>
                    <a
                      href="/case-studies/cluberly"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Cluberly
                    </a>
                  </li>
                  <li>
                    <a
                      href="/case-studies/knightsgate-partners"
                      className="text-sm ease-in-out duration-200 cursor-pointer hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      Knightsgate
                    </a>
                  </li>
                </ul>
              </div>
              {/* Socials */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://www.instagram.com/thesilocreative/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm ease-in-out duration-200 cursor-pointer flex items-center gap-2 hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      <img
                        src="https://res.cloudinary.com/di9tb45rl/image/upload/v1762717241/Instagram_ec8sza.png"
                        alt="Instagram"
                        className="w-4 h-4"
                        loading="lazy"
                      />
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@the.silo.creative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm ease-in-out duration-200 cursor-pointer flex items-center gap-2 hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      <SiTiktok className="w-4 h-4 text-black font-bold" />
                      TikTok
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/the-silo-creative/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm ease-in-out duration-200 cursor-pointer flex items-center gap-2 hover:text-brand"
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        lineHeight: "150%",
                      }}
                    >
                      <img
                        src="https://res.cloudinary.com/di9tb45rl/image/upload/v1762717248/Linkedin_joc2nv.png"
                        alt="LinkedIn"
                        className="w-4 h-4"
                        loading="lazy"
                      />
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Divider */}
          <hr className="mt-10 md:mt-12 border-black" />
          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 pt-6">
            <p className="text-base text-black font-bold">
              © {year} The Silo Creative Limited. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-base">
              <Link
                to="/legal"
                className="font-bold text-black underline text-sm ease-in-out duration-200 cursor-pointer"
              >
                Legal & Website Terms
              </Link>
              <Link
                to="/terms"
                className="font-bold text-black underline text-sm ease-in-out duration-200 cursor-pointer"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="font-bold text-black underline text-sm ease-in-out duration-200 cursor-pointer"
              >
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
        {/* Modern mobile-only footer layout */}
        <div className="block md:hidden px-2 py-8 w-full bg-white">
          {/* Top: Brand and copyright */}
          <div className="mb-4">
            <Link to="/" className="font-extrabold text-xl mb-3 inline-block">
              <img
                src="https://res.cloudinary.com/di9tb45rl/image/upload/v1762717230/footerlogo_tllimb.png"
                alt="Silo logo"
                className="h-8"
                loading="lazy"
              />
            </Link>
            <div className="text-sm font-bold">
              © {year} The Silo Creative Limited
            </div>
            <div className="text-sm text-neutral-500 mb-2">
              All rights reserved
            </div>
            {/* Social icons row */}
            <div className="flex gap-3 mb-2 mt-4">
              <a href="https://www.instagram.com/thesilocreative/" target="_blank" rel="noopener noreferrer" className="bg-transparent p-2">
                <span className="sr-only">Instagram</span>
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1762717241/Instagram_ec8sza.png"
                  alt="Instagram"
                  className="w-4 h-4"
                  loading="lazy"
                />
              </a>
              <a href="https://www.tiktok.com/@the.silo.creative" target="_blank" rel="noopener noreferrer" className="bg-transparent p-2">
                <span className="sr-only">TikTok</span>
                <SiTiktok className="w-4 h-4 text-black font-bold" />
              </a>
              <a href="https://www.linkedin.com/company/the-silo-creative/" target="_blank" rel="noopener noreferrer" className="bg-transparent p-2">
                <span className="sr-only">LinkedIn</span>
                <img
                  src="https://res.cloudinary.com/di9tb45rl/image/upload/v1762717248/Linkedin_joc2nv.png"
                  alt="LinkedIn"
                  className="w-4 h-4"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
          {/* Two columns: About us and Case Studies */}
          <div className="flex w-full mb-4 gap-8">
            <div className="flex-1">
              <div className="font-bold mb-1">About us</div>
              <ul className="space-y-1">
                <li>
                  <NavLink to="/services" className="text-sm">
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="text-sm">
                    About the Silo
                  </NavLink>
                </li>
                <li>
                  <a
                    href="/about#hero"
                    onClick={(e) => handleAnchorClick(e, "/about", "hero")}
                    className="text-sm"
                  >
                    Mission and Values
                  </a>
                </li>
                <li>
                  <a
                    href="/about#minds-in-the-silo"
                    onClick={(e) =>
                      handleAnchorClick(e, "/about", "minds-in-the-silo")
                    }
                    className="text-sm"
                  >
                    Meet the Team
                  </a>
                </li>
                <li>
                  <NavLink to="/careers" className="text-sm">
                    Careers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/job-board" className="text-sm">
                    Job Board
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog" className="text-sm">
                    Ramblings
                  </NavLink>
                </li>
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
                <li>
                  <a
                    href="/case-studies/basement-approved"
                    className="text-sm hover:text-brand"
                  >
                    Basement Approved
                  </a>
                </li>
                <li>
                  <a
                    href="/case-studies/tomoka-fine-and-rare"
                    className="text-sm hover:text-brand"
                  >
                    Tomoka Fine & Rare
                  </a>
                </li>
                <li>
                  <a
                    href="/case-studies/electrolytes-with-joly"
                    className="text-sm hover:text-brand"
                  >
                    Electrolytes with Joly
                  </a>
                </li>
                <li>
                  <a
                    href="/case-studies/acorn-property-group"
                    className="text-sm hover:text-brand"
                  >
                    Acorn Property Group
                  </a>
                </li>
                <li>
                  <a
                    href="/case-studies/cluberly"
                    className="text-sm hover:text-brand"
                  >
                    Cluberly
                  </a>
                </li>
                <li>
                  <a
                    href="/case-studies/knightsgate-partners"
                    className="text-sm hover:text-brand"
                  >
                    Knightsgate
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-6 pt-4 flex justify-around items-center w-full">
            <div className="flex flex-wrap items-center gap-4 text-xs mx-auto justify-center">
              <Link
                to="/legal"
                className="ease-in-out font-bold text-black duration-200 cursor-pointer"
              >
                Legal & Website Terms
              </Link>
              <Link
                to="/terms"
                className="ease-in-out font-bold text-black duration-200 cursor-pointer"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="ease-in-out font-bold text-black duration-200 cursor-pointer"
              >
                Cookies Policy
              </Link>
            </div>
          </div>
          {/* Newsletter */}
          <div className="mt-6">
            <div className="font-bold mb-2">
              Join our newsletter to stay up to date.
            </div>

            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="border border-black overflow-hidden">
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 text-sm placeholder-black/60 font-bold focus:outline-none bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-3 w-full inline-flex items-center justify-center  border-[1px] border-brand h-[42px] px-4 py-2.5 text-sm font-bold tracking-wide text-brand"
                aria-label="SUBSCRIBE"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs font-bold text-black mt-3">
              By subscribing you agree to with our Legal & Website Terms and
              provide consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
