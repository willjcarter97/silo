// Post-build SEO step (runs after `vite build`, see package.json).
//
// Why: the site is a single-page app, so every URL used to be served the same index.html with the old
// "Social, Brand & Web" title. Link previews (LinkedIn, Facebook, Slack...) read that raw HTML and do not
// run JavaScript. This writes a real HTML file per page with its own head, so previews and crawlers see
// the right title, description, canonical, share image and structured data without running the app.
//
// What it writes into dist/:
//   index.html                    home page head
//   <path>.html                   every page in PAGES and every Prismic case study / blog post
//                                 (flat files, not <path>/index.html: on Netlify a folder index makes
//                                 /about 301 to /about/, while about.html is served at /about itself and
//                                 /about/ redirects to /about. Source: Netlify support guide "How can I
//                                 alter trailing slash behaviour", reviewed July 2025, read 30 Oct 2026)
//   spa.html                      generic shell for any other route (no canonical); netlify.toml and
//                                 vercel.json fall back to this instead of index.html
//   sitemap.xml                   generated from the same list (case studies and blog posts included)
//
// Data: src/data/seo.js (copy and business facts) + Prismic (page_title / meta fields, documents).
// If Prismic cannot be reached the build fails on purpose: Netlify then keeps the last good deploy live
// rather than publishing pages with missing tags or a sitemap without the case studies.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, PAGES, COLLECTIONS, BLOG_FALLBACK_DESCRIPTION, organizationSchema } from "../src/data/seo.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PRISMIC_API = "https://silosite.cdn.prismic.io/api/v2";
const START = "<!-- SEO:START -->";
const END = "<!-- SEO:END -->";

// ---------- Prismic ----------
async function getJson(url) {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function fetchAllDocuments() {
  const api = await getJson(PRISMIC_API);
  const ref = api.refs.find((r) => r.isMasterRef)?.ref;
  if (!ref) throw new Error("Prismic master ref not found");
  const docs = [];
  for (let page = 1; ; page++) {
    const q = new URLSearchParams({ ref, pageSize: "100", page: String(page) });
    const data = await getJson(`${PRISMIC_API}/documents/search?${q}`);
    docs.push(...data.results);
    if (page >= data.total_pages) break;
  }
  return docs;
}

// Prismic fields can be plain strings or rich text arrays
const text = (v) => (typeof v === "string" ? v : Array.isArray(v) ? v.map((b) => b.text || "").join(" ") : "").trim();

// ---------- HTML ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const abs = (pathOrUrl) => (/^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE.origin}${pathOrUrl}`);
const canonicalUrl = (path) => `${SITE.origin}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

// Prismic image -> 1200x630 crop for sharing
const shareImage = (img) =>
  img?.url ? `${img.url.split("?")[0]}?auto=format,compress&fit=crop&w=1200&h=630` : null;

function headBlock({ path, title, description, image, imageAlt, ogType = "website", noindex = false, schemas = [], canonical = true }) {
  const url = canonicalUrl(path);
  const img = abs(image || SITE.ogImage);
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    canonical ? `<link rel="canonical" href="${esc(url)}" />` : null,
    noindex ? `<meta name="robots" content="noindex" />` : null,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    canonical ? `<meta property="og:url" content="${esc(url)}" />` : null,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt || SITE.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
    ...schemas.map(jsonLd),
  ].filter(Boolean);
  return `${START}\n    ${lines.join("\n    ")}\n    ${END}`;
}

function render(template, block) {
  const s = template.indexOf(START);
  const e = template.indexOf(END);
  if (s === -1 || e === -1) throw new Error("SEO markers missing from dist/index.html (see index.html)");
  return template.slice(0, s) + block + template.slice(e + END.length);
}

async function writePage(path, html) {
  const file = path === "/" ? join(DIST, "index.html") : join(DIST, `${path.replace(/^\//, "")}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html, "utf8");
  return file;
}

// ---------- main ----------
const template = await readFile(join(DIST, "index.html"), "utf8");
let docs;
try {
  docs = await fetchAllDocuments();
} catch (err) {
  console.error(`[seo] Could not load Prismic: ${err.message}`);
  console.error("[seo] Failing the build so the previous deploy stays live.");
  process.exit(1);
}
const singleton = (type) => docs.find((d) => d.type === type)?.data || {};
const org = organizationSchema();
const written = [];
const sitemap = [];

for (const page of PAGES) {
  const data = page.prismic ? singleton(page.prismic) : {};
  const title = text(data[page.titleField]) || page.title;
  const description = text(data[page.descField]) || page.description;
  const schemas = [org];
  if (page.path === "/") {
    schemas.push({ "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE.origin}/#website`, url: `${SITE.origin}/`, name: SITE.name, publisher: { "@id": org["@id"] } });
  }
  const html = render(template, headBlock({ path: page.path, title, description, noindex: page.noindex, schemas }));
  written.push({ path: page.path, file: await writePage(page.path, html), title, noindex: !!page.noindex });
  if (page.sitemap) sitemap.push({ loc: canonicalUrl(page.path), ...page.sitemap });
}

for (const col of COLLECTIONS) {
  for (const doc of docs.filter((d) => d.type === col.type && d.uid)) {
    const d = doc.data || {};
    const path = col.path(doc.uid);
    const title = text(d[col.titleField]) || text(d[col.titleFallbackField]) || SITE.name;
    const description =
      text(d[col.descField]) || (col.descFallbackField && text(d[col.descFallbackField])) ||
      (col.type === "blog_post" ? BLOG_FALLBACK_DESCRIPTION : SITE.description);
    const image = shareImage(d[col.imageField]);
    const schemas = [org];
    if (col.schemaType === "BlogPosting") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: text(d.title) || title,
        description,
        image: image ? [image] : undefined,
        datePublished: doc.first_publication_date,
        dateModified: doc.last_publication_date,
        mainEntityOfPage: canonicalUrl(path),
        author: { "@id": org["@id"] },
        publisher: { "@id": org["@id"] },
      });
    }
    const html = render(template, headBlock({ path, title, description, image, imageAlt: d[col.imageField]?.alt || title, ogType: col.schemaType ? "article" : "website", schemas }));
    written.push({ path, file: await writePage(path, html), title });
    sitemap.push({ loc: canonicalUrl(path), lastmod: (doc.last_publication_date || "").slice(0, 10), ...col.sitemap });
  }
}

// Generic shell for routes that are not pre-rendered (job adverts, unknown URLs that redirect to /404).
// No canonical: the app sets one in the browser for the route it actually renders.
const home = PAGES[0];
await writeFile(
  join(DIST, "spa.html"),
  render(template, headBlock({ path: "/", title: text(singleton("home_page").page_title) || home.title, description: text(singleton("home_page").page_description) || home.description, schemas: [org], canonical: false })),
  "utf8"
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemap.map((u) =>
    `  <url>\n    <loc>${esc(u.loc)}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ""}    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  ),
  "</urlset>",
  "",
].join("\n");
await writeFile(join(DIST, "sitemap.xml"), xml, "utf8");

// ---------- self-check: every file has one title, one description, canonical, og:image ----------
const problems = [];
for (const w of written) {
  const html = await readFile(w.file, "utf8");
  const count = (re) => (html.match(re) || []).length;
  if (count(/<title>/g) !== 1) problems.push(`${w.path}: ${count(/<title>/g)} <title> tags`);
  if (count(/<meta name="description"/g) !== 1) problems.push(`${w.path}: description count`);
  if (count(/rel="canonical"/g) !== 1) problems.push(`${w.path}: canonical count`);
  if (count(/property="og:image"/g) !== 1) problems.push(`${w.path}: og:image count`);
  if (/Social, Brand &amp; Web|Social, Brand & Web/.test(html)) problems.push(`${w.path}: old "Social, Brand & Web" copy still present`);
}
if (problems.length) {
  console.error("[seo] Self-check failed:\n  " + problems.join("\n  "));
  process.exit(1);
}

const cs = written.filter((w) => w.path.startsWith("/case-studies/")).length;
const posts = written.filter((w) => w.path.startsWith("/blog/")).length;
console.log(`[seo] ${written.length} pages written (${cs} case studies, ${posts} blog posts), spa.html, sitemap.xml with ${sitemap.length} URLs`);
