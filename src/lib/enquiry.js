// Pricing enquiry: delivered by the shared form delivery (src/lib/forms.js) using the "pricing" row in
// src/config/forms.js. Netlify Forms emails it (Will, 5 Oct 2026: "Lets do email form for now"); HubSpot
// also receives it once the pricing form GUID is filled in.
import { SITE_FORMS } from "../config/forms";
import { deliver } from "./forms";

export const FORM_NAME = SITE_FORMS.pricing.netlifyName;

export const submitPricingEnquiry = (values) => deliver("pricing", values);
