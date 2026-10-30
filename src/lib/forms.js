import { SITE_FORMS, HUBSPOT_PORTAL_ID, HUBSPOT_SUBMIT_BASE } from "../config/forms";

// Sends a form submission to every channel configured for it in src/config/forms.js.
// Resolves when at least one channel delivered it; throws when none did, so the form can show an
// error and keep the visitor's answers. Channels that are not set up (no HubSpot GUID yet) are skipped.

const trimAll = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v]));

async function toNetlify(form, values) {
  const payload = {
    "form-name": form.netlifyName,
    "bot-field": values["bot-field"] || "",
    subject: form.subject(values), // Netlify uses "subject" for the notification email's subject line
    ...trimAll(form.netlify(values)),
    page: window.location.href,
  };
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload).toString(),
  });
  if (res.ok) return "sent";
  // Local dev server has no Netlify (answers 404/405): log instead of failing
  if (import.meta.env.DEV && (res.status === 404 || res.status === 405)) {
    console.info(`[dev] "${form.netlifyName}" not sent to Netlify (not available locally). Payload:`, payload);
    return "sent";
  }
  throw new Error(`Netlify Forms rejected "${form.netlifyName}" (${res.status})`);
}

async function toHubSpot(form, values) {
  if (!form.hubspotGuid) return "skipped";
  const fields = Object.entries(trimAll(form.hubspot(values)))
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([name, value]) => ({ objectTypeId: "0-1", name, value: String(value) }));
  // Links the submission to the visitor's browsing history when the HubSpot cookie exists
  const hutk = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];
  const res = await fetch(`${HUBSPOT_SUBMIT_BASE}/${HUBSPOT_PORTAL_ID}/${form.hubspotGuid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submittedAt: Date.now(),
      fields,
      context: { ...(hutk ? { hutk } : {}), pageUri: window.location.href, pageName: document.title },
    }),
  });
  if (res.ok) return "sent";
  const detail = await res.text().catch(() => "");
  throw new Error(`HubSpot rejected "${form.netlifyName}" (${res.status}): ${detail.slice(0, 300)}`);
}

export async function deliver(formKey, values) {
  const form = SITE_FORMS[formKey];
  if (!form) throw new Error(`Unknown form "${formKey}" (add it to src/config/forms.js)`);

  const results = await Promise.allSettled([toNetlify(form, values), toHubSpot(form, values)]);
  results.filter((r) => r.status === "rejected").forEach((r) => console.error(r.reason));
  if (results.some((r) => r.status === "fulfilled" && r.value === "sent")) return;
  throw new Error(`"${formKey}" was not delivered by any channel`);
}
