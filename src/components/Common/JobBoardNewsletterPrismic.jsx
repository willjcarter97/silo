import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { client } from "../../prismicio";

/**
 * Helper to resolve Prismic Link fields to URLs
 */
const resolveLinkUrl = (linkField, fallback = "/terms") => {
  if (!linkField) return fallback;
  
  if (linkField.link_type === "Web" || linkField.url) {
    return linkField.url;
  }
  
  if (linkField.link_type === "Document" && linkField.uid) {
    return `/${linkField.uid}`;
  }
  
  return fallback;
};

/**
 * JobBoardNewsletterPrismic - Newsletter CTA for job board pages
 * Fetches content from Prismic singleton, falls back to defaults
 */
const JobBoardNewsletterPrismic = ({ className = "" }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState({
    heading: "Get these straight to your inbox",
    description: "We add UGC jobs weekly, but our creator roster gets first dibs. Sign up to get briefs before they hit the board.",
    emailPlaceholder: "Enter your email",
    buttonText: "Send me work",
    termsText: "By clicking Sign Up you're confirming that you agree with our",
    termsLinkText: "Terms and Conditions",
    termsLink: "/terms",
    successMessage: "Successfully subscribed to newsletter!",
  });

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await client.getSingle("job_board_newsletter_cta");
        
        if (response?.data) {
          const data = response.data;
          setContent({
            heading: data.heading || content.heading,
            description: data.description || content.description,
            emailPlaceholder: data.email_placeholder || content.emailPlaceholder,
            buttonText: data.button_text || content.buttonText,
            termsText: data.terms_text || content.termsText,
            termsLinkText: data.terms_link_text || content.termsLinkText,
            termsLink: resolveLinkUrl(data.terms_link, content.termsLink),
            successMessage: data.success_message || content.successMessage,
          });
        }
      } catch (error) {
        // Keep defaults if Prismic fetch fails
        console.warn("Could not fetch Job Board Newsletter CTA from Prismic:", error.message);
      }
    }

    fetchContent();
  }, []);

  return (
    <div className={className || "mt-40"}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 md:gap-12 lg:gap-16">
        
        {/* Left Content */}
        <div className="lg:flex-1 lg:max-w-lg">
          <h2 className="text-black text-3xl font-bold mb-4 font-['Epilogue'] leading-tight">
            {content.heading}
          </h2>
          
          <p className="text-black text-base leading-relaxed">
            {content.description}
          </p>
        </div>
        
        {/* Right Form */}
        <div className="lg:flex-shrink-0 max-w-xl w-full">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email address").required("Email is required"),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                console.log("Newsletter form submitted:", [values]);
                
                // Store in localStorage
                const existingEmails = JSON.parse(localStorage.getItem("newsletterEmails") || "[]");
                existingEmails.push({
                  ...values,
                  submittedAt: new Date().toISOString(),
                });
                localStorage.setItem("newsletterEmails", JSON.stringify(existingEmails));
                
                // Save current path for return redirect
                sessionStorage.setItem("thankYouReturnPath", window.location.pathname);
                
                // Reset form and redirect to thank you page
                resetForm();
                setSubmitting(false);
                navigate("/thank-you");
              } catch (error) {
                console.error("Error:", error);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form id="job-board-newsletter-form" name="Job Board Newsletter Form">
                <div className="flex gap-3">
                  <div className="w-full">
                    <Field
                      type="email"
                      name="email"
                      placeholder={content.emailPlaceholder}
                      className="px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-[#FF322E] focus:border-transparent text-base w-full"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FF322E] whitespace-nowrap text-white px-6 py-3 font-semibold hover:bg-red-600 transition-colors text-base disabled:opacity-50 self-start"
                  >
                    {content.buttonText}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          
          <p className="text-black text-sm mt-3 leading-relaxed">
            {content.termsText}{" "}
            <a href={content.termsLink} className="hover:text-brand hover:text-base text-sm ease-in-out duration-200 cursor-pointer">
              {content.termsLinkText}
            </a>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default JobBoardNewsletterPrismic;

