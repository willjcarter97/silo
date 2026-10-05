// Pricing enquiry delivery: Netlify Forms (emails the enquiry via a notification set up in the Netlify dashboard).
//
// How it works: public/__forms.html declares the form so Netlify registers it at deploy time. The React form
// then POSTs the same field names to "/" and Netlify captures the submission. This only delivers on Netlify
// (production and deploy previews). On Vercel staging, or locally, there is nothing listening, so:
//   - locally (npm run dev) the POST is logged to the console and treated as sent, so the flow can be clicked through
//   - on Vercel the visitor sees the normal "something went wrong" message
//
// To send enquiries to HubSpot instead, see src/lib/hubspot.js and src/config/hubspot.js (parked, not used).
export const FORM_NAME = "pricing-enquiry";

export async function submitPricingEnquiry(values) {
  const name = values.name.trim();
  const payload = {
    "form-name": FORM_NAME,
    "bot-field": values["bot-field"] || "",
    // Netlify uses a field called "subject" as the notification email's subject line
    subject: `Pricing enquiry: ${values.interest}${values.brochure ? " (brochure requested)" : ""} - ${name}`,
    name,
    email: values.email.trim(),
    phone: values.phone?.trim() || "",
    business: values.business?.trim() || "",
    interest: values.interest,
    message: values.message?.trim() || "",
    brochure: values.brochure ? "Yes" : "No",
    consent: values.consent ? "Yes" : "No",
    page: window.location.href,
  };

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload).toString(),
  });

  if (response.ok) return;

  // Local dev server has no form handler (it answers 404/405): log instead of failing
  if (import.meta.env.DEV && (response.status === 404 || response.status === 405)) {
    console.info("[dev] Pricing enquiry not sent (no Netlify locally). Payload:", payload);
    return;
  }
  throw new Error(`Form submission failed (${response.status})`);
}
