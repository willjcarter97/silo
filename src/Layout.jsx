import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Common/Header.jsx";
import Footer from "./components/Common/Footer.jsx";
import "./styles/scaling-overrides.css";

export default function Layout() {
  const location = useLocation();
  const isCaseStudyPost = location.pathname.startsWith("/case-studies/");

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <Header />
      {/* reserve space for fixed header so page content isn't hidden */}
      <main className={`flex-1 w-full service-top'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
