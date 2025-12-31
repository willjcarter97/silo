import React from "react";
import { useParams, Link } from "react-router-dom";

// Import all existing case study components
import BasementApproved from "./case-studies/BasementApproved";
import TomokaFineAndRare from "./case-studies/TomokaFineAndRare";
import ElectrolytesWithJoly from "./case-studies/ElectrolytesWithJoly";
import AcornPropertyGroup from "./case-studies/AcornPropertyGroup";
import Cluberly from "./case-studies/Cluberly";
import KnightsgatePartners from "./case-studies/KnightsgatePartners";

const PostCaseStudy = () => {
  const { id } = useParams();

  // Map UIDs to their respective components
  // These use the original hardcoded styling and functionality
  switch (id) {
    case "basement-approved":
      return <BasementApproved />;
    case "tomoka-fine-and-rare":
      return <TomokaFineAndRare />;
    case "electrolytes-with-joly":
      return <ElectrolytesWithJoly />;
    case "acorn-property-group":
      return <AcornPropertyGroup />;
    case "cluberly":
      return <Cluberly />;
    case "knightsgate-partners":
      return <KnightsgatePartners />;
    default:
      return (
        <div className="bg-white min-h-screen">
          <div className="mx-auto max-w-[1280px] px-6 md:px-0 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-black mb-4">
                Case Study Not Found
              </h1>
              <p className="text-black mb-8">
                The case study you're looking for doesn't exist.
              </p>
              <Link
                to="/case-studies"
                className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                ← Back to Case Studies
              </Link>
            </div>
          </div>
        </div>
      );
  }
};

export default PostCaseStudy;
