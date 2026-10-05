import { HUBSPOT_PORTAL_ID, HUBSPOT_PRICING_FORM_GUID, HUBSPOT_SUBMIT_BASE } from "../config/hubspot";

/**
 * Sends a pricing enquiry to HubSpot as a form submission (creates/updates the contact).
 * Throws on any failure so the caller can show an error and keep the visitor's answers.
 */
export async function submitPricingEnquiry(values) {
  if (!HUBSPOT_PRICING_FORM_GUID) {
    throw new Error("HubSpot form is not configured (set HUBSPOT_PRICING_FORM_GUID in src/config/hubspot.js)");
  }

  const [firstname, ...rest] = values.name.trim().split(/\s+/);
  const fields = [
    ["firstname", firstname],
    ["lastname", rest.join(" ")],
    ["email", values.email.trim()],
    ["phone", values.phone?.trim()],
    ["company", values.business?.trim()],
    ["silo_interest", values.interest],
    ["message", values.message?.trim()],
    ["brochure_requested", values.brochure ? "true" : "false"],
    ["marketing_consent", values.consent ? "true" : "false"],
  ]
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([name, value]) => ({ objectTypeId: "0-1", name, value: String(value) }));

  // Links the submission to the visitor's HubSpot tracking history when the tracking cookie exists
  const hutk = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];

  const response = await fetch(`${HUBSPOT_SUBMIT_BASE}/${HUBSPOT_PORTAL_ID}/${HUBSPOT_PRICING_FORM_GUID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submittedAt: Date.now(),
      fields,
      context: {
        ...(hutk ? { hutk } : {}),
        pageUri: window.location.href,
        pageName: document.title,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`HubSpot rejected the submission (${response.status}): ${detail.slice(0, 300)}`);
  }
}
