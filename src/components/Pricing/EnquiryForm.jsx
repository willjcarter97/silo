import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaChevronRight } from "react-icons/fa";
import { interestOptions, formCopy } from "../../data/pricingData";
import { submitPricingEnquiry } from "../../lib/enquiry";

const schema = Yup.object({
  name: Yup.string().trim().min(2, "Please enter your name").max(80, "Please keep this under 80 characters").required("Please enter your name"),
  email: Yup.string().trim().email("Please enter a valid email address").required("Please enter your email"),
  phone: Yup.string().trim().matches(/^[0-9+\-\s()]*$/, "That phone number doesn't look right").max(25, "That phone number is too long"),
  business: Yup.string().trim().max(100, "Please keep this under 100 characters"),
  interest: Yup.string().oneOf(interestOptions, "Please choose one").required("Please choose one"),
  message: Yup.string().trim().max(1500, "Please keep this under 1,500 characters"),
});

const inputClass = (invalid) =>
  `w-full px-4 py-3 border rounded-none bg-white text-base text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
    invalid ? "border-red-500" : "border-black"
  }`;

const Optional = () => <span className="font-normal text-black/50"> (optional)</span>;

/**
 * Pricing enquiry form. Submits to HubSpot, then goes to /pricing/thank-you
 * (?brochure=1 when the brochure box was ticked, so the thank-you page can offer the instant download).
 */
const EnquiryForm = ({ wantBrochure }) => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", business: "", interest: "", message: "", brochure: false, consent: false, "bot-field": "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError("");
      // Hidden "website" field is a bot trap: real visitors never see or fill it
      if (values["bot-field"]) {
        navigate("/pricing/thank-you");
        return;
      }
      try {
        await submitPricingEnquiry(values);
        window.gtag?.("event", "generate_lead", { event_category: "pricing", event_label: values.interest, brochure: values.brochure });
        navigate(`/pricing/thank-you${values.brochure ? "?brochure=1" : ""}`);
      } catch (err) {
        console.error("Pricing enquiry failed:", err);
        setSubmitError(formCopy.error);
        setSubmitting(false);
      }
    },
  });

  // The "Get the brochure" buttons elsewhere on the page pre-tick the brochure box
  useEffect(() => {
    if (wantBrochure) formik.setFieldValue("brochure", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantBrochure]);

  const err = (field) => formik.touched[field] && formik.errors[field];

  return (
    <form id="pricing-enquiry-form" name="Pricing Enquiry Form" onSubmit={formik.handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="pe-name" className="block text-sm font-bold mb-2">Name</label>
          <input id="pe-name" name="name" type="text" autoComplete="name" aria-invalid={!!err("name")} className={inputClass(err("name"))}
            value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {err("name") && <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="pe-email" className="block text-sm font-bold mb-2">Email</label>
          <input id="pe-email" name="email" type="email" autoComplete="email" aria-invalid={!!err("email")} className={inputClass(err("email"))}
            value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {err("email") && <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="pe-phone" className="block text-sm font-bold mb-2">Phone<Optional /></label>
          <input id="pe-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!err("phone")} className={inputClass(err("phone"))}
            value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {err("phone") && <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="pe-business" className="block text-sm font-bold mb-2">Business name<Optional /></label>
          <input id="pe-business" name="business" type="text" autoComplete="organization" className={inputClass(err("business"))}
            value={formik.values.business} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {err("business") && <p className="mt-1 text-sm text-red-500">{formik.errors.business}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="pe-interest" className="block text-sm font-bold mb-2">I'm interested in</label>
        <select id="pe-interest" name="interest" aria-invalid={!!err("interest")} className={inputClass(err("interest"))}
          value={formik.values.interest} onChange={formik.handleChange} onBlur={formik.handleBlur}>
          <option value="" disabled>Please choose…</option>
          {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {err("interest") && <p className="mt-1 text-sm text-red-500">{formik.errors.interest}</p>}
      </div>

      <div>
        <label htmlFor="pe-message" className="block text-sm font-bold mb-2">Tell us about your project<Optional /></label>
        <textarea id="pe-message" name="message" rows={4} className={`${inputClass(err("message"))} resize-none`}
          value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {err("message") && <p className="mt-1 text-sm text-red-500">{formik.errors.message}</p>}
      </div>

      {/* Brochure tick box: deliberately stands out */}
      <label htmlFor="pe-brochure" className={`flex items-start gap-4 border-2 border-brand p-4 sm:p-5 cursor-pointer transition-colors duration-200 ${formik.values.brochure ? "bg-[#FFE5E5]" : "bg-[#FFF3F3] hover:bg-[#FFE5E5]"}`}>
        <input id="pe-brochure" name="brochure" type="checkbox" checked={formik.values.brochure} onChange={formik.handleChange}
          className="mt-1 h-6 w-6 shrink-0 accent-[#FF322E] cursor-pointer" />
        <span>
          <span className="block font-epilogue font-bold text-lg sm:text-xl">{formCopy.brochureLabel}</span>
          <span className="block text-sm sm:text-base text-black/80 mt-0.5">{formCopy.brochureHint}</span>
        </span>
      </label>

      {/* Consent: optional, unticked by default */}
      <label htmlFor="pe-consent" className="flex items-start gap-3 cursor-pointer">
        <input id="pe-consent" name="consent" type="checkbox" checked={formik.values.consent} onChange={formik.handleChange}
          className="mt-1 h-5 w-5 shrink-0 accent-[#FF322E] cursor-pointer" />
        <span className="text-sm text-black/80 leading-relaxed">{formCopy.consentLabel}</span>
      </label>

      {/* Bot trap (Netlify's honeypot field) */}
      <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden"
        value={formik.values["bot-field"]} onChange={formik.handleChange} />

      {submitError && <p role="alert" className="text-sm text-red-600 font-bold">{submitError}</p>}

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-brand h-[52px] px-10 text-base font-bold text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
          <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
        </div>
        <span className="block transition-all duration-300 ease-in-out group-hover:translate-x-24">
          {formik.isSubmitting ? formCopy.submitting : formCopy.submit}
        </span>
      </button>
    </form>
  );
};

export default EnquiryForm;
