// Prismic previews: lets editors see a draft on the live site before publishing it.
// Prismic sends the editor to /preview?token=...&documentId=..., the toolbar script stores the preview
// in the io.prismic.preview cookie, and the Prismic client (src/prismicio.js) reads that cookie on every
// query. Visitors without the cookie never load the toolbar and only ever see published content.
import { repositoryName } from "../prismicio";

export const PREVIEW_COOKIE = "io.prismic.preview";

// Where each Prismic document type lives on the site
export function linkResolver(doc) {
  switch (doc.type) {
    case "blog_post":
      return `/blog/${doc.uid}`;
    case "case_study":
      return `/case-studies/${doc.uid}`;
    case "career":
      return `/job/${doc.uid}`;
    default:
      return "/";
  }
}

export function hasPreviewCookie() {
  return typeof document !== "undefined" && document.cookie.split("; ").some((c) => c.startsWith(`${PREVIEW_COOKIE}=`));
}

// The toolbar shows "Previewing draft" with an exit button, and keeps the preview cookie up to date
export function loadPrismicToolbar() {
  if (typeof document === "undefined" || document.getElementById("prismic-toolbar")) return;
  const script = document.createElement("script");
  script.id = "prismic-toolbar";
  script.async = true;
  script.defer = true;
  script.src = `https://static.cdn.prismic.io/prismic.js?new=true&repo=${repositoryName}`;
  document.body.appendChild(script);
}
