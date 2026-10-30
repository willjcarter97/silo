import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/scaling-overrides.css";
import { usePageMeta } from "../hooks/usePageMeta";
import AccentHeadline from "../components/Common/AccentHeadline";
import SiloTriangle from "../components/Common/SiloTriangle";
import { client } from "../prismicio";

// Default values (mirror of the Prismic `contact_page` singleton)
const defaults = {
  mainHeading: "Ready to make your next move?",
  mainDescription: "From strategy to design to digital, we are here to make it happen.",
};

const Contact = () => {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);

  usePageMeta(
    pageData?.pageTitle || "Contact Us | Social, Branding & Web Agency",
    pageData?.metaDescription || "Get in touch to discuss social media strategy, content strategy, brand design or website design and development. Let's build your digital presence."
  );

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch page data from Prismic
  useEffect(() => {
    async function fetchPageData() {
      try {
        const response = await client.getSingle("contact_page");

        if (response?.data) {
          const data = response.data;

          setPageData({
            pageTitle: data.page_title || null,
            metaDescription: data.meta_description || null,
            mainHeading: data.main_heading || null,
            mainDescription: data.main_description || null,
            mainImage: data.main_image?.url || null,
          });
        }
      } catch (error) {
        console.warn("Could not fetch contact page from Prismic:", error.message);
      }
    }

    fetchPageData();
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]*$/, "Phone number is not valid")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .max(500, "Message must be less than 500 characters")
      .required("Message is required"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log("Form submitted:", values);

      const existingData = JSON.parse(
        localStorage.getItem("contact2FormData") || "[]"
      );

      const newSubmission = {
        ...values,
        submittedAt: new Date().toISOString(),
      };

      const updatedData = [...existingData, newSubmission];
      localStorage.setItem("contact2FormData", JSON.stringify(updatedData));

      console.log("All contact2 form submissions:", updatedData);

      setTimeout(() => {
        resetForm();
        setSubmitting(false);
        sessionStorage.setItem("thankYouReturnPath", "/");
        navigate("/thank-you");
      }, 500);
    },
  });

  // Use props with fallback to defaults
  const displayMainHeading = pageData?.mainHeading || defaults.mainHeading;
  const displayMainDescription = pageData?.mainDescription || defaults.mainDescription;

  return (
    <div className="min-h-screen max-w-[1280px] mt-20 mx-auto px-4 md:px-0 bg-white">
      {/* Main Form - the only enquiry form on the site */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-0 sm:px-6 md:px-0">
        <div className="w-full mx-auto pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* Left Content */}
            <div className="order-1 flex flex-col justify-between gap-10 lg:self-stretch lg:pb-1 lg:pr-10">
              <div>
                <AccentHeadline
                  as="h1"
                  accentKey="contact"
                  text={displayMainHeading}
                  className="font-epilogue font-bold text-black text-4xl md:text-5xl xl:text-6xl leading-[1.1] tracking-tight max-w-[14ch]"
                />
                <p className="text-black mt-6 text-base sm:text-lg">
                  {displayMainDescription}
                </p>
              </div>
              {/* top-7 matches the Submit button's offset so the two bottoms line up */}
              <SiloTriangle className="hidden lg:block relative top-7 w-[72px] h-[60px]" />
            </div>

            {/* Form column (Nic's October design: the form takes the place of the photo) */}
            <div className="order-2">
                {/* Contact Form - id/name are used by HubSpot collected forms; do not rename */}
                <form
                  id="brand-contact-form"
                  name="Brand Contact Form"
                  onSubmit={formik.handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base ${
                        formik.touched.name && formik.errors.name
                          ? "border-red-500"
                          : "border-black"
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : "border-black"
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base ${
                        formik.touched.phone && formik.errors.phone
                          ? "border-red-500"
                          : "border-black"
                      }`}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Type your message..."
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm sm:text-base sm:rows-6 ${
                        formik.touched.message && formik.errors.message
                          ? "border-red-500"
                          : "border-black"
                      }`}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-start sm:items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formik.values.terms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`h-4 w-4 text-red-500 focus:ring-red-500 border-black mt-0.5 sm:mt-0 flex-shrink-0 ${
                          formik.touched.terms && formik.errors.terms
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 text-sm text-black leading-relaxed"
                      >
                        I accept the{" "}
                        <Link
                          to="/terms"
                          className="hover:text-brand text-sm ease-in-out duration-200 cursor-pointer underline"
                        >
                          Terms
                        </Link>
                      </label>
                    </div>
                    {formik.touched.terms && formik.errors.terms && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.terms}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="inline-flex items-center justify-center gap-2 bg-[#FF322E] w-xl h-[48px] px-6 py-3 text-xs font-bold tracking-wide text-white border-transparent relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed top-7"
                  >
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 translate-x-5 svg-wrapper group-hover:animate-bounce-custom">
                      <FaChevronRight className="block text-white w-4 h-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-4 group-hover:scale-[140%]" />
                    </div>
                    <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-28">
                      {formik.isSubmitting ? "Submitting..." : "Submit"}
                    </span>
                  </button>
                </form>
            </div>
          </div>
        </div>
      </section>
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
};

export default Contact;
