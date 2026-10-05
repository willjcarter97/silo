// PARKED - not currently used. The pricing form emails enquiries via Netlify Forms (src/lib/enquiry.js).
// Kept for when enquiries should go to HubSpot as contacts: import submitPricingEnquiry from src/lib/hubspot.js
// in EnquiryForm.jsx, add https://api.hsforms.com to connect-src in netlify.toml, and fill in the GUID below.
//
// HubSpot connection for the pricing enquiry form.
//
// The site already loads the HubSpot tracking script for this account (portal 442547962, see index.html),
// so visitors are tracked and the contact record is linked to their browsing history.
//
// To receive the enquiries as contacts, create a form in HubSpot (Marketing > Forms > Create form >
// "Embedded form") with these fields, then paste the form's GUID below (or set VITE_HUBSPOT_PRICING_FORM_GUID).
// The "internal name" of each field must match exactly:
//
//   firstname            (standard)  - the first word of "Name"
//   lastname             (standard)  - the rest of "Name"
//   email                (standard)
//   phone                (standard)
//   company              (standard)  - "Business name"
//   silo_interest        (custom, dropdown)  options: Refresh package | Rebrand package | A bespoke project | Not sure yet
//   message              (standard)  - "Tell us about your project"
//   brochure_requested   (custom, single checkbox)  "true" when "Send me the brochure" is ticked
//   marketing_consent    (custom, single checkbox)  "true" when the updates/offers box is ticked
//
// HubSpot silently ignores any submitted field that is not on the form, so all nine must be added to it.
export const HUBSPOT_PORTAL_ID = "442547962";
export const HUBSPOT_PRICING_FORM_GUID = import.meta.env.VITE_HUBSPOT_PRICING_FORM_GUID || "";

// Global endpoint (HubSpot Forms API v3). Connect-src for this host is allowed in netlify.toml.
export const HUBSPOT_SUBMIT_BASE = "https://api.hsforms.com/submissions/v3/integration/submit";
