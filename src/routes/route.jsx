import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Layout from "../Layout.jsx";
import Services from "../pages/Services.jsx";
import JobBoard from "../pages/JobBoard.jsx";
import Ramblings from "../pages/Ramblings.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Contact2 from "../pages/Contact2.jsx";
import Terms from "../pages/Terms.jsx";
import Privacy from "../pages/Privacy.jsx";
import Cookies from "../pages/Cookies.jsx";
import Legal from "../pages/Legal.jsx";
import NotFound from "../pages/NotFound.jsx";
import CareerIndex from "../pages/CareerIndex.jsx";
import JobDetail from "../pages/JobDetail.jsx";
import JobBoardDetail from "../pages/JobBoardDetail.jsx";
import BlogDetail from "../pages/BlogDetail.jsx";
import CaseStudies from "../pages/CaseStudies.jsx";
import PostCaseStudy from "../pages/PostCaseStudy.jsx";

function RoutesTree() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="job-board" element={<JobBoard />} />
        <Route path="blog" element={<Ramblings />} />
        <Route path="blog/:uid" element={<BlogDetail />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="case-studies/:id" element={<PostCaseStudy />} />
        <Route path="ugc-contact" element={<Contact />} />
        <Route path="contact" element={<Contact2 />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="legal" element={<Legal />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="careers" element={<CareerIndex />} />
        <Route path="job/:id" element={<JobDetail />} />
        <Route path="jobs/:jobId" element={<JobBoardDetail />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export function AppRoutes() {
  return <RoutesTree />;
}

export default function Router() {
  return (
    <BrowserRouter>
      <RoutesTree />
    </BrowserRouter>
  );
}
