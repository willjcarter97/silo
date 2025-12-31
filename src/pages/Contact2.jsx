import { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "../styles/scaling-overrides.css";
import { usePageMeta } from "../hooks/usePageMeta";

const Contact = () => {
  usePageMeta(
    "Contact Us | Social, Branding & Web Agency",
    "Get in touch to discuss social media strategy, content strategy, brand design or website design and development. Let’s build your digital presence."
  );

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
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
      // Handle form submission here
      console.log("Form submitted:", values);

      // Get existing data from localStorage
      const existingData = JSON.parse(
        localStorage.getItem("contact2FormData") || "[]"
      );

      // Add new submission with timestamp
      const newSubmission = {
        ...values,
        submittedAt: new Date().toISOString(),
      };

      // Add to array and store in localStorage
      const updatedData = [...existingData, newSubmission];
      localStorage.setItem("contact2FormData", JSON.stringify(updatedData));

      // Log all stored data
      console.log("All contact2 form submissions:", updatedData);

      // Simulate API call
      setTimeout(() => {
        toast.success("Form submitted successfully!");
        resetForm();
        setSubmitting(false);

        // Reload page after successful submit
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }, 1000);
    },
  });
  return (
    <div className="min-h-screen max-w-[1280px] mt-20 mx-auto px-4 md:px-0 bg-white">
      {/* First Section - Want to work with brands that get it? */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-0 sm:px-6 md:px-0">
        <div className="w-full mx-auto min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-1">
              <div>
                <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight">
                  Ready to make your next move?
                </h1>
                <p className="text-black mt-3 sm:mt-4 text-base sm:text-lg">
                  From strategy to design to digital, we are here to make it happen.
                </p>
              </div>

              {/* Contact Form */}
              <form
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
                  className="inline-flex items-center justify-center gap-2 bg-[#FF322E] w-xl h-[48px] px-6 py-3 text-xs font-bold  tracking-wide text-white  border-transparent relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed top-7"
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

            {/* Right Image */}
            <div className="order-2 lg:order-2 mt-8 lg:mt-0">
              <img
                src="https://images.prismic.io/silosite/aVUga3NYClf9otrj_v1765956955_3_xthd8y.png?auto=format,compress"
                alt="Person relaxing on chair"
                className="w-full h-64 sm:h-80 md:h-[75vh] lg:h-[80vh] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Brand looking to hire creators? */}
      <section className="contact pb-8 sm:pb-12 md:pb-12 lg:pb-16 px-0 md:mt-0 sm:px-6 md:px-0">
        <div className="max-w-full mx-auto mt-20 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-0 lg:items-stretch border-[1px] border-black">
            {/* Left Content with Border */}
            <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-bold text-black leading-tight">
                    Looking to join as a creator instead?
                  </h2>
                  <p className="text-black mt-3 sm:mt-4 text-base sm:text-lg">
                    Get briefs from brands that value authenticity, creativity,
                    and strategy.
                  </p>
                </div>

                <Link
                  to="/ugc-contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF322E] w-xl h-[48px] px-6 py-3 text-xs font-bold tracking-wide text-white  border-transparent relative overflow-hidden group"
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 translate-x-5 svg-wrapper group-hover:animate-bounce-custom">
                    <FaChevronRight className="block text-white w-4 h-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-8 group-hover:scale-[140%]" />
                  </div>
                  <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-48">
                    Join the Silo
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Image - Full Height */}
            <div className="relative order-1 lg:order-2 h-64 sm:h-80 md:h-96 lg:h-auto">
              <img
                src="https://images.prismic.io/silosite/aVUgbHNYClf9otrk_v1765956956_Placeholder_Image_wotmns.png?auto=format,compress"
                alt="Person in spotlight"
                className="w-full h-full md:h-[370px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
};

export default Contact;
