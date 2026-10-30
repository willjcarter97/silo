// Every form on the site, and where its submissions go. One row per form; src/lib/forms.js reads this.
//
// Delivery channels (a submission counts as delivered when at least one channel accepts it):
//   netlify  - Netlify Forms. Emails the submission via a notification set in the Netlify dashboard
//              (Site configuration > Forms > Form notifications). The form must also be declared in
//              public/__forms.html with the same name and field names, or Netlify ignores it.
//   hubspot  - HubSpot Forms API: creates/updates the contact in HubSpot (portal below). Switched on per
//              form by filling in its form GUID (HubSpot > Marketing > Forms > the form > Get embed code >
//              data-form-id), or the matching VITE_ env variable in Netlify. Empty GUID = skipped.
//              The HubSpot form must contain every property listed in `hubspot` below.
//
// To add a form: add a row here, a <form> in public/__forms.html, and call deliver("<key>", values).

const env = import.meta.env;

export const HUBSPOT_PORTAL_ID = "442547962"; // Silo's HubSpot (Asia-Pacific data centre), as in index.html
export const HUBSPOT_SUBMIT_BASE = "https://api.hsforms.com/submissions/v3/integration/submit";

const splitName = (name = "") => {
  const [first, ...rest] = name.trim().split(/\s+/);
  return { firstname: first || "", lastname: rest.join(" ") };
};
const yes = (v) => (v ? "true" : "false");

export const SITE_FORMS = {
  // Contact page (the main enquiry form)
  contact: {
    netlifyName: "contact",
    hubspotGuid: env.VITE_HUBSPOT_CONTACT_FORM_GUID || "",
    subject: (v) => `Website enquiry - ${v.name.trim()}`,
    netlify: (v) => ({ name: v.name, email: v.email, phone: v.phone, message: v.message }),
    hubspot: (v) => ({ ...splitName(v.name), email: v.email, phone: v.phone, message: v.message }),
  },

  // Pricing page enquiry (brochure / quote)
  pricing: {
    netlifyName: "pricing-enquiry",
    hubspotGuid: env.VITE_HUBSPOT_PRICING_FORM_GUID || "",
    subject: (v) => `Pricing enquiry: ${v.interest}${v.brochure ? " (brochure requested)" : ""} - ${v.name.trim()}`,
    netlify: (v) => ({
      name: v.name, email: v.email, phone: v.phone || "", business: v.business || "", interest: v.interest,
      message: v.message || "", brochure: v.brochure ? "Yes" : "No", consent: v.consent ? "Yes" : "No",
    }),
    hubspot: (v) => ({
      ...splitName(v.name), email: v.email, phone: v.phone, company: v.business, silo_interest: v.interest,
      message: v.message, brochure_requested: yes(v.brochure), marketing_consent: yes(v.consent),
    }),
  },

  // Newsletter sign-ups (footer, blog posts, Ramblings page)
  newsletter: {
    netlifyName: "newsletter",
    hubspotGuid: env.VITE_HUBSPOT_NEWSLETTER_FORM_GUID || "",
    subject: (v) => `Newsletter sign-up - ${v.email.trim()}`,
    netlify: (v) => ({ email: v.email, source: v.source || "" }),
    hubspot: (v) => ({ email: v.email }),
  },
};
