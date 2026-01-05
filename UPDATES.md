# Updates Log

## January 5, 2026

### Performance: CLS and Preconnect Fixes

Fixed major layout shift issues and added missing preconnect hints to improve mobile PageSpeed scores.

**Issues Fixed:**

| Issue | Fix | Impact |
|-------|-----|--------|
| **CLS 0.493 from Footer** | Added `minHeight: 500px` to footer to reserve space during async Prismic load | High |
| **Missing HubSpot preconnects** | Added preconnect hints for HubSpot tracking domains | Medium |
| **Font CLS** | Added `@font-face` fallbacks with `size-adjust` to prevent text reflow when web fonts load | Medium |

**Files Updated:**
- `index.html` - Added 5 HubSpot preconnects (`track-ap1.hubspot.com`, `forms-ap1.hscollectedforms.net`, `js-ap1.hscollectedforms.net`, `js-ap1.hs-scripts.com`, `js-ap1.hs-analytics.net`)
- `src/index.css` - Added `DM Sans Fallback` and `Epilogue Fallback` font-face declarations with size-adjust
- `tailwind.config.js` - Updated font stacks to include fallback fonts
- `src/components/Common/Footer.jsx` - Added `minHeight: 500px` to prevent CLS

---

### Added: robots.txt and sitemap.xml for SEO

Added standard SEO files to help search engines crawl and index the site.

**New Files:**
- `public/robots.txt` - Allows all crawlers, points to sitemap, blocks `/thank-you`
- `public/sitemap.xml` - Lists all static pages with priorities and change frequencies

**Note:** The sitemap includes static routes only. Dynamic content (blog posts, case studies) from Prismic would require a build-time sitemap generator for full coverage.

**Domain:** Update `https://www.thesilocreative.com` in both files once the domain is confirmed.

---

### Performance Optimization: PageSpeed Improvements

Implemented multiple performance optimizations to improve Core Web Vitals scores.

**Fixes Applied:**

| Issue | Fix | Impact |
|-------|-----|--------|
| **LCP (7.4s → faster)** | Removed `loading="lazy"` from hero image, added `fetchpriority="high"` | High |
| **CLS (0.713 → lower)** | Added `minHeight` to LogoLoop container to reserve space | High |
| **CLS** | Added explicit `width` and `height` to footer logos | Medium |
| **CLS** | Added default dimensions to LogoLoop images | Medium |
| **Render Blocking** | Removed duplicate Google Fonts @import (already loaded via link tag) | Medium |
| **Resource Discovery** | Added preconnect hints for Prismic CDN | Medium |
| **Image Size** | Added `&w=1200` to hero image URL for proper sizing | Medium |

**Files Updated:**
- `index.html` - Added preconnect hints for `images.prismic.io` and `silosite.cdn.prismic.io`
- `src/index.css` - Removed redundant Google Fonts @import
- `src/components/Home/VideoAndWelcome.jsx` - Hero image: `loading="eager"`, `fetchpriority="high"`, sized URL
- `src/components/Home/Hero.jsx` - Added `minHeight` to LogoLoop container
- `src/components/Common/LogoLoop.jsx` - Added default width/height to prevent CLS
- `src/components/Common/Footer.jsx` - Added explicit dimensions to logo images

---

### Added: Dual Hosting Setup (Netlify Production + Vercel Staging)

Configured the site for dual-environment hosting with Netlify as production and Vercel as staging.

**New Files:**
- `netlify.toml` - Netlify configuration with SPA routing, security headers, and asset caching

**Configuration:**

| Environment | Platform | Branch | VITE_ENV | Prismic Content |
|-------------|----------|--------|----------|-----------------|
| Production | Netlify | `main` | `production` | Published only |
| Staging | Vercel | `main` | `staging` | Draft + Published |

**netlify.toml Features:**
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing: All routes redirect to `/index.html` with 200 status
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Asset caching: 1-year cache for static assets and images

**Files Updated:**
- `vercel.json` - Added `VITE_ENV=staging` environment variable
- `src/prismicio.js` - Added environment detection for production vs staging

**Live URLs:**
- Production: (pending domain connection)
- Staging: https://super-liger-09b2af.netlify.app/

---

## January 4, 2026

### Fixed: Footer Newsletter Subscribe Redirecting to Thank You Page

Fixed an issue where the newsletter subscribe form in the footer was submitting data to HubSpot but not redirecting to the Thank You page afterwards.

**Root Cause:**
The form had `onSubmit={(e) => e.preventDefault()}` which prevented any action after HubSpot captured the form data, including navigation to the Thank You page.

**Fix:**
- Added controlled state for the newsletter email inputs (both desktop and mobile forms)
- Created a `handleNewsletterSubmit` function that:
  - Validates the email
  - Stores the current page path in sessionStorage for the Thank You page return navigation
  - Redirects to `/thank-you` after a brief delay (to allow HubSpot to capture the form data)
- Added `name="email"` attribute to the email inputs for proper HubSpot field mapping

**File Updated:**
- `src/components/Common/Footer.jsx`

---

### Fixed: Home Page Services Section Mobile Bottom Border

Fixed a visual issue where the 4th service card (Content Strategy) on the Home page was displaying a bottom border on mobile when it shouldn't.

**Root Cause:**
The border logic `${index < displayServiceCards.length - 1 ? 'border-b-0' : ''}` was checking against the full array length, but since we slice to 4 cards, the last visible card (index 3) was sometimes getting a border when the full array had more than 4 cards.

**Fix:**
Simplified the border logic by always applying `border-b-0` to all mobile service cards, since the section divider below provides the visual separation.

**File Updated:**
- `src/components/Home/ContentAndDone.jsx`

---

### Fixed: Minds at Silo Carousel Drag on Mobile

Fixed an issue where dragging the team member carousel on mobile wasn't working properly.

**Root Cause:**
The `touchAction: "pan-y pinch-zoom"` CSS was applied to the wrong element (the container div) and prevented horizontal drag gestures from being recognized by Framer Motion.

**Fix:**
Moved the `touchAction` style to the actual draggable `motion.div` element and changed it to `"pan-y"` which allows vertical scrolling while enabling horizontal drag gestures for the carousel.

**File Updated:**
- `src/components/About/MindsInTheSilo.jsx`

---

### Fixed: Home Page Hover Logo Not Working on First Load (SPA Navigation)

Fixed an issue where the Pixi.js liquid hover effect on the home page hero wouldn't initialize on soft page load or SPA navigation, but worked correctly after a hard refresh (Ctrl+F5).

**Root Cause:**

The browser was caching a failed fetch response for the SVG image. When using Pixi's `Assets.load()` or even a standard `Image` object to load the SVG, the browser would return the cached failed response on SPA navigation instead of making a fresh network request. This only affected soft navigation because hard refresh bypasses the browser cache.

**Key Finding:**

Through runtime debugging, we discovered that image load requests were failing immediately (~50ms) with "Failed to fetch" errors on SPA navigation - too fast for a network timeout, indicating the browser was rejecting the request based on cached state.

**Fixes Applied:**

**useSiloHoverPixi.js:**
- Replaced Pixi's `Assets.load()` with a custom `loadImageDirectly()` function using a standard `Image` object
- Added cache-busting parameter (`?t=timestamp`) to force fresh image load on every navigation
- This ensures the browser always makes a new network request for the SVG
- Added `isInitializingRef` to prevent concurrent initialization attempts
- Maintained the local `cancelled` flag pattern for proper cleanup

**SiloHoverBanner.jsx:**
- State-based client detection with `isClient` and `isMobile` states
- Shows static image during SSR/initial render to prevent layout shift
- Resize event listener for responsive behavior
- Passes `isMobile: !isClient || isMobile` to prevent premature Pixi initialization

**Files Updated:**
- `src/hooks/useSiloHoverPixi.js` - Cache-busting image loader, concurrent init prevention
- `src/components/Home/SiloHoverBanner.jsx` - State-based client detection

---

### Production Codebase Cleanup

Performed comprehensive cleanup to prepare the codebase for final production deployment. Removed ~70 files including backup files, migration scripts, unused pages, and development artifacts.

**Files Removed:**

| Category | Count | Description |
|----------|-------|-------------|
| Backup files (.bak) | 35 | All backup files across components, pages, and data |
| Scripts folder | 22 | Migration scripts and Prismic type definitions |
| Migration guide | 1 | PRISMIC_MIGRATION_GUIDE.txt |
| Ramblings pages | 5 | Individual blog pages (now using Prismic via BlogDetail.jsx) |
| Case study pages | 6 | Individual case study pages (now using Prismic via PostCaseStudy.jsx) |
| Unused components | 6 | working-home-hero/, Section2.jsx, Section.jsx, OptionalAddOns.jsx |
| Unused data files | 4 | blogDetailsData.js, blogPostsData.js, jobDetailData.js, jobsData.js |
| DemoVideo folder | 1 | Local video file (code uses Cloudinary URLs) |

**Folders Removed:**
- `scripts/` - Migration tools and Prismic type JSON definitions
- `src/pages/Ramblings/` - Individual blog post pages
- `src/pages/case-studies/` - Individual case study pages
- `src/components/About/working-home-hero/` - Test/development components
- `src/DemoVideo/` - Local demo video

**Files Kept:**
- `src/data/servicesData.jsx` - Still used by Layout417.jsx and Cards.jsx
- All active pages, components, and configuration files
- README.md and UPDATES.md

---

### Implemented: Full Prismic CMS Integration for All Pages

Completed comprehensive Prismic integration across the entire site, making all page content editable through the CMS.

**Pages Updated to Fetch from Prismic:**

| Page | Prismic Type | Content Managed |
|------|--------------|-----------------|
| Header | `navigation` | Logo, nav links, CTA button |
| Footer | `footer` | Links, social media, newsletter CTA |
| About | `about_page` | Hero, What Silo Is, Things We Believe In, Who We Love Working With |
| Case Studies | `portfolio_page` | Hero heading and description |
| Services | `services_page` | Hero section, service cards |
| Job Board | `job_board_page` | Hero section with CTAs |
| Careers | `careers_page` | Hero section, empty state |
| Ramblings (Blog) | `ramblings_page` | Hero section, newsletter, empty state |
| Contact (Brand) | `contact_page` | Hero section, secondary CTA |
| UGC Contact | `ugc_contact_page` | Hero section, secondary CTA |
| Terms | `terms_page` | Heading, date, rich text content |
| Privacy | `privacy_page` | Heading, date, rich text content |
| Legal | `legal_page` | Heading, date, rich text content |

**Key Implementation Details:**

1. **Navigation (Header.jsx):**
   - Fetches logo, nav links, and CTA from `navigation` singleton
   - Supports internal page links and external URLs via Prismic Link resolver
   - Falls back to hardcoded defaults if Prismic unavailable

2. **Footer (Footer.jsx):**
   - Fetches all footer columns from `footer` singleton
   - Supports dynamic social media links with icons
   - Newsletter CTA heading/description configurable

3. **About Page Components:**
   - `Hero.jsx` - Accepts props for heading, description, image
   - `WhatSiloIs.jsx` - Accepts props for heading, description, image
   - `ThingsWeBelieveIn.jsx` - Accepts beliefs array prop
   - `WhoWeLoveWorkingWith.jsx` - Accepts industry rows prop

4. **Services Page:**
   - Removed `servicesData.jsx` dependency
   - `Layout417.jsx` now accepts `featureSections` prop for service cards
   - All service card content managed in Prismic

5. **Legal Pages (Terms, Privacy, Legal):**
   - Use `PrismicRichText` component for rich text rendering
   - Support headings, paragraphs, lists, bold/italic, links
   - Custom styled components for consistent typography

**Files Updated:**
- `src/components/Common/Header.jsx`
- `src/components/Common/Footer.jsx`
- `src/pages/About.jsx`
- `src/components/About/Hero.jsx`
- `src/components/About/WhatSiloIs.jsx`
- `src/components/About/ThingsWeBelieveIn.jsx`
- `src/components/About/WhoWeLoveWorkingWith.jsx`
- `src/pages/CaseStudies.jsx`
- `src/pages/Services.jsx`
- `src/components/servicee/Layout417.jsx`
- `src/pages/JobBoard.jsx`
- `src/pages/CareerIndex.jsx`
- `src/pages/Ramblings.jsx`
- `src/pages/Contact.jsx` (UGC Contact)
- `src/pages/Contact2.jsx` (Brand Contact)
- `src/pages/Terms.jsx`
- `src/pages/Privacy.jsx`
- `src/pages/Legal.jsx`

**Prismic Custom Type Definitions Created:**
- `scripts/prismic-about-page-type.json`
- `scripts/prismic-portfolio-page-type.json`
- `scripts/prismic-services-page-type.json`
- `scripts/prismic-job-board-page-type.json`
- `scripts/prismic-careers-page-type.json`
- `scripts/prismic-ramblings-page-type.json`
- `scripts/prismic-contact-page-type.json`
- `scripts/prismic-ugc-contact-page-type.json`
- `scripts/prismic-terms-page-type.json`
- `scripts/prismic-privacy-page-type.json`
- `scripts/prismic-legal-page-type.json`

---

### Added: Job Board Newsletter CTA Prismic Integration

Created a new Prismic singleton for the newsletter subscription CTA on Job Board detail pages.

**New Prismic Custom Type:** `job_board_newsletter`
- Heading and description text
- Email placeholder text
- Button text
- Terms text and link
- Success message

**New Files:**
- `src/components/Common/JobBoardNewsletterPrismic.jsx` - Prismic-powered newsletter CTA component

**Files Updated:**
- `src/pages/JobBoardDetail.jsx` - Now uses `JobBoardNewsletterPrismic` instead of inline form

**Editable Fields:**
| Field | Default |
|-------|---------|
| `heading` | "Get these straight to your inbox" |
| `description` | "We add UGC jobs weekly, but our creator roster gets first dibs..." |
| `email_placeholder` | "Enter your email" |
| `button_text` | "Send me work" |
| `terms_text` | "By clicking Sign Up you're confirming that you agree with our" |
| `terms_link_text` | "Terms and Conditions" |
| `terms_link` | Link to terms page |
| `success_message` | "Successfully subscribed to newsletter!" |

---

### Fixed: Home Page Prismic Integration Issues

Fixed several issues with the Prismic integration for the Home page:

**Issues Fixed:**
1. **VideoAndWelcome not using props** - Component was reverted to old version that ignored props from Hero.jsx
2. **CTA sections not updating** - ReadyWhenYouArePrismic and WantResultsLikeThisPrismic were passing `undefined` values which override component defaults instead of falling back
3. **Mobile text too small** - Restored original mobile text styling (text-[18px] heading, text-[12px] description) with separate mobile content props
4. **Services section styling broken** - ServiceCard component was wrapping content in an extra div that broke the parent's flex layout

**Files Updated:**
- `src/components/Home/VideoAndWelcome.jsx` - Now accepts props, maintains separate mobile content with original styling
- `src/components/Common/ReadyWhenYouArePrismic.jsx` - Only spreads values that exist in Prismic (no undefined)
- `src/components/Common/WantResultsLikeThisPrismic.jsx` - Only spreads values that exist in Prismic (no undefined)
- `src/components/Home/ContentAndDone.jsx` - ServiceCard returns fragment instead of wrapper div

---

### Implemented: Full Prismic CMS Integration for Home Page and CTA Sections

Integrated the Home page and reusable CTA sections with Prismic CMS for full content management.

**New Prismic-Powered Components:**

| Component | Prismic Type | Description |
|-----------|--------------|-------------|
| `ReadyWhenYouArePrismic` | `ready_when_you_are` | Fetches CTA content from singleton |
| `WantResultsLikeThisPrismic` | `want_results_like_this` | Fetches case study CTA content |
| `Hero` (Home) | `home_page` | Fetches all home page content |

**New Files Added:**
- `src/components/Common/ReadyWhenYouArePrismic.jsx` - Prismic wrapper for Ready When You Are CTA
- `src/components/Common/WantResultsLikeThisPrismic.jsx` - Prismic wrapper for Want Results Like This CTA

**Files Updated:**
- `src/components/Home/Hero.jsx` - Now fetches from `home_page` singleton and passes data to child components
- `src/components/Home/ContentAndDone.jsx` - Now accepts props for services/case studies headings and service cards
- `src/pages/Home.jsx` - Fetches SEO data from Prismic

**Home Page Prismic Fields:**
- **SEO**: Page title, meta description, OG image
- **Hero Section**: SVG banner, tagline, client logos (repeatable)
- **Video & Welcome**: Video toggle, Vimeo URL, hero image, welcome text, CTA buttons
- **Services Section**: Heading, service cards (repeatable with image, title, description, link)
- **Case Studies Section**: Heading, subheading, View All button text/link

**CTA Section Prismic Fields:**
- Heading, description, image
- Primary button (text + link)
- Secondary button (text + link)

**Features:**
- Falls back to default values if Prismic data unavailable
- Supports Prismic Link field resolution (internal documents + external URLs)
- No loading flash - components render immediately with defaults, then update with Prismic data

---

### Updated: VideoAndWelcome Component for Prismic Integration

Refactored the `VideoAndWelcome` component to accept props for all editable content, preparing it for Prismic CMS integration.

**Changes:**
- Removed internal CMS fetch logic (was fetching from placeholder URL)
- Converted to prop-based component with sensible defaults
- Unified mobile/desktop content - now uses same heading and description for both breakpoints
- All content is now configurable via props

**Props Available:**
| Prop | Type | Default |
|------|------|---------|
| `showVideo` | boolean | `false` |
| `videoUrl` | string | Vimeo embed URL |
| `imageUrl` | string | Prismic image URL |
| `welcomeHeading` | string | "We are the creative agency..." |
| `welcomeDescription` | string | "We create content first..." |
| `aboutButtonText` | string | "About us" |
| `aboutButtonLink` | string | "/about" |
| `secondaryLinkText` | string | "Let's Talk" |
| `secondaryLinkUrl` | string | "/contact" |

**File Updated:**
- `src/components/Home/VideoAndWelcome.jsx`

---

### Added: Prismic Navigation Custom Type

Created a Prismic custom type for managing the site navigation bar through the CMS.

**New File:**
- `scripts/prismic-navigation-type.json` - Navigation custom type definition

**Features:**
- **Singleton type**: Only one navigation instance for the site
- **Editable nav links**: Add, remove, reorder, and hide navigation links
- **Flexible destinations**: Links can point to internal pages or external URLs
- **CTA button control**: Customize the header's call-to-action button text and destination
- **Logo management**: Upload/change the site logo through Prismic

**Custom Type Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `logo` | Image | Site logo |
| `nav_links` | Group | Repeatable navigation links |
| `nav_links.label` | Text | Link display text |
| `nav_links.link` | Link | Destination URL/page |
| `nav_links.is_visible` | Boolean | Show/hide toggle |
| `cta_text` | Text | Button text |
| `cta_link` | Link | Button destination |
| `cta_visible` | Boolean | Show/hide CTA button |

**To Install:**
1. Go to Prismic dashboard → Custom Types
2. Create new "Single" type
3. Copy JSON from `scripts/prismic-navigation-type.json` into the JSON editor
4. Save and publish

---

### Fixed: SiloHoverBanner Hero Effect Not Initializing (Comprehensive Fix)

Fixed persistent issue where the hero hover effect (Pixi.js liquid animation) would intermittently fail to load, especially on soft navigation. Previously only worked reliably on hard refresh.

**Root Causes Identified:**

1. **React StrictMode double-mounting**: In development, StrictMode mounts, unmounts, and remounts components. The async Pixi initialization would start, get interrupted by cleanup, then fail on remount due to stale state.

2. **Closure issues with setTimeout cleanup**: The cleanup function used `setTimeout` with a closure over the `app` variable, which could be null when setTimeout finally executed.

3. **ResizeObserver memory leak**: A new ResizeObserver was created but never disconnected in cleanup, causing stale references.

4. **Pixi Assets cache staleness**: `Assets.load()` caches textures. After app destruction and recreation, cached textures could reference destroyed WebGL contexts.

**Comprehensive Fixes Applied:**

1. **Added persistent refs** (`appRef`, `resizeObserverRef`, `isInitializingRef`, `mountedRef`) that survive across StrictMode cycles
2. **Double-init prevention**: Checks `isInitializingRef.current` and `appRef.current` before starting initialization
3. **Mounted checks after each async operation**: Verifies component is still mounted after `app.init()` and `Assets.load()`
4. **Pixi cache clearing**: Removes cached assets before loading to prevent stale texture issues
5. **Synchronous cleanup**: Removed `setTimeout` wrapper - destruction happens immediately in cleanup
6. **ResizeObserver cleanup**: Properly disconnects the observer in cleanup function
7. **Added console logging**: For debugging initialization flow

**Files Updated:**
- `src/hooks/useSiloHoverPixi.js` - Complete rewrite with ref-based state management

---

## January 3, 2026

### Fixed: Services Card Section Mobile Height (Layout417)

Reduced the mobile "Core Services" scroll animation section to take up less space while keeping the card animation.

**Root Cause:**
The Services page uses `Layout417.jsx` (not `Cards.jsx`), which had `h-screen` (100vh) for all screen sizes.

**Changes to Layout417.jsx:**
| Property | Previous | New (Mobile) |
|----------|----------|--------------|
| Container height | `h-screen` | `h-[50vh] sm:h-screen` |
| Scroll distance | `+=1000` | `+=350` (mobile only) |
| Pin start | `top top` | `center center` (mobile only) |
| Scrub speed | `0.3` | `0.2` (mobile only) |

**Implementation:**
- Added GSAP `matchMedia()` to apply different ScrollTrigger settings for mobile vs desktop
- Mobile (max-width: 639px): 50vh height, 350px scroll, faster scrub
- Desktop (min-width: 640px): Full screen height, 1000px scroll (unchanged)

**File Updated:**
- `src/components/servicee/Layout417.jsx`

---

### Updated: WhoWeLoveWorkingWith Marquee Row Content

Updated the three marquee rows in the "Who we love working with" section on the About page with new industry categories.

**New Row Content:**

| Row | Industries |
|-----|------------|
| Row 1 | Lifestyle, Culture, Fashion, Beauty, Wellness, Events, Experiences, Entertainment, Travel, Health and fitness, Food and drink, Music, Art and design, Home and interiors, Sports, Personal development |
| Row 2 | Consumer goods, DTC brands, Media, Hospitality, Property, Real estate, Retail, E-commerce brands, Luxury goods, Homeware, Furniture, Travel and leisure brands |
| Row 3 | Finance, Investment, Professional services, Technology, SaaS, Startups, Creative industries, Fintech, Consulting, Legal services, B2B services, Software companies, Venture capital, Business education and training |

**File Updated:**
- `src/components/About/WhoWeLoveWorkingWith.jsx`

---

### Fixed: HubSpot Form Names Showing CSS Classes

Fixed an issue where forms submitted to HubSpot were showing up with CSS class names (like ".space-y-4, .sm:space-y-6") instead of descriptive form names.

**Root Cause:**
- HubSpot's tracking script auto-captures non-HubSpot forms
- Without explicit `id` and `name` attributes, HubSpot falls back to using CSS class names as identifiers

**Fix Applied:**
Added proper `id` and `name` attributes to all forms for clear identification in HubSpot:

| Form | ID | Name |
|------|----|----- |
| UGC Creator Contact | `ugc-creator-contact-form` | UGC Creator Contact Form |
| Brand Contact | `brand-contact-form` | Brand Contact Form |
| Footer Newsletter (Desktop) | `footer-newsletter-form` | Footer Newsletter Subscription |
| Footer Newsletter (Mobile) | `footer-newsletter-form-mobile` | Footer Newsletter Subscription Mobile |
| Ramblings Newsletter | `ramblings-newsletter-form` | Ramblings Page Newsletter Subscription |
| Blog Newsletter | `blog-newsletter-form` | Blog Newsletter Subscription |
| Job Application | `job-application-form` | Job Application Form |

**Files Updated:**
- `src/pages/Contact.jsx` - Added id/name to UGC creator form
- `src/pages/Contact2.jsx` - Added id/name to brand contact form
- `src/components/Common/Footer.jsx` - Added id/name to both newsletter forms
- `src/pages/Ramblings.jsx` - Added id/name to newsletter form
- `src/components/BlogDetail/NewsletterSubscription.jsx` - Added id/name to newsletter form
- `src/components/jobdetail/ApplicationFormSection.jsx` - Added id/name to job application form

---

### Fixed: Contact Pages Mobile Layout - Image Above Form

Restructured the Contact pages so that on mobile devices, the image appears above the form (between the title/description and form), rather than after the form.

**Layout Change:**
- **Mobile**: Title → Description → Image → Form
- **Desktop**: Left column (Title + Description + Form) | Right column (Image)

**Implementation:**
- Added a mobile-only image (`lg:hidden`) inside the left content area, positioned between the description and form
- Changed the desktop image container to `hidden lg:block` to only show on larger screens
- Mobile image uses 19:9 landscape aspect ratio (`aspect-[19/9]`) with `object-cover`
- Avoids duplicate DOM images by showing/hiding based on breakpoint

**Files Updated:**
- `src/pages/Contact.jsx` - Added mobile image, hid desktop image on mobile
- `src/pages/Contact2.jsx` - Added mobile image, hid desktop image on mobile

---

### Updated: Footer "Mission and Values" Link Target

Changed the "Mission and Values" link in the footer to navigate to the "Things we believe in" section on the About page instead of the hero section.

**Changes:**
- Added `id="things-we-believe-in"` to the ThingsWeBelieveIn component section
- Updated footer anchor links from `/about#hero` to `/about#things-we-believe-in`
- Updated both desktop and mobile footer link handlers

**Files Updated:**
- `src/components/About/ThingsWeBelieveIn.jsx` - Added section ID
- `src/components/Common/Footer.jsx` - Updated link href and click handler (2 instances)

---

### Standardized: About Page Section Spacing

Implemented consistent spacing system across the entire About page, fixing mobile spacing inconsistencies.

**Spacing System Applied:**

| Breakpoint | Section Padding | Divider Margins |
|------------|-----------------|-----------------|
| Mobile | `py-12` (48px) | `my-12` (48px) |
| Tablet (md) | `md:py-16` (64px) | `md:my-16` (64px) |
| Desktop (lg+) | `lg:py-20` (80px) | `lg:my-20` (80px) |

**Issues Fixed:**
- Hero had excessive mobile margin (`my-20 mt-24` = 176px top)
- WhatSiloIs had confusing `py-6 sm:py-0` padding logic
- ThingsWeBelieveIn had unnecessary `min-h-screen` forcing huge gaps
- MindsInTheSilo had smallest padding (`py-6` = 24px mobile)
- Divider margins were inconsistent (`my-10`, `mt-10 mb-20`, `mt-16`)
- Removed duplicate wrapper div with id on ThingsWeBelieveIn

**Component Changes:**
- `About.jsx` - Standardized all dividers to `my-12 md:my-16 lg:my-20`, removed `min-h-screen` wrappers
- `Hero.jsx` - Changed from `my-20 mt-24` to `my-12 mt-20 md:my-16 md:mt-24 lg:my-20`
- `WhatSiloIs.jsx` - Simplified from complex padding to `py-12 md:py-16 lg:py-20`
- `ThingsWeBelieveIn.jsx` - Removed `min-h-screen`, standardized to `py-12 md:py-16 lg:py-20`
- `MindsInTheSilo.jsx` - Removed `min-h-screen`, increased mobile padding to `py-12 md:py-16 lg:py-20`
- `WhoWeLoveWorkingWith.jsx` - Added `overflow-x-hidden` for consistency

**Files Updated:**
- `src/pages/About.jsx`
- `src/components/About/Hero.jsx`
- `src/components/About/WhatSiloIs.jsx`
- `src/components/About/ThingsWeBelieveIn.jsx`
- `src/components/About/MindsInTheSilo.jsx`
- `src/components/About/WhoWeLoveWorkingWith.jsx`

---

### Fixed: Job Board Container Excessive Mobile Padding/Margin

Reduced excessive padding and margin on the Job Board page containers for mobile devices.

**Issue:**
- Outer container: `mt-20 mb-20` (80px each) on mobile
- Inner container: `py-10` (40px) + `my-20` (80px) on mobile
- Combined 240px+ of vertical spacing created too much empty space

**Fix Applied:**
- Outer container: `mt-20` → `mt-10`, `mb-20` → `mb-10 md:mb-20`
- Inner container: `py-10` → `py-2 md:py-10`, `my-20` → `my-0 md:my-20`

**File Updated:**
- `src/pages/JobBoard.jsx`

---

### Fixed: SiloHoverBanner Hero Section Intermittent Loading Issue

Fixed an issue where the hero hover effect (Pixi.js liquid animation) would sometimes fail to initialize on soft navigation, but worked on hard refresh.

**Root Cause:**
The previous implementation used `useState` with an async `useEffect` for mobile detection, combined with CSS show/hide (both DOM elements always mounted). This introduced a race condition:
1. `isMobile` initialized as `null`, `isReady` as `false`
2. Pixi hook returned early because `!isReady`
3. After `useEffect` ran, `isReady` became `true` triggering a re-run
4. But timing issues with DOM dimensions caused intermittent failures

**Fix Applied:**
Reverted to the original working pattern that uses **synchronous mobile detection** and **conditional rendering**:
- Mobile detection now happens synchronously at render time: `typeof window !== 'undefined' && window.innerWidth < 768`
- Uses conditional rendering (`{!isMobile ? <canvas> : <img>}`) instead of CSS hiding
- Removed `isReady` state - no longer needed
- Only one DOM element exists at a time, ensuring proper dimensions for Pixi

**Technical Details:**
- Conditional rendering ensures `hostRef` only exists when the canvas is needed
- Pixi initializes immediately with correct values (no state dependency delays)
- Eliminates race condition between state updates and Pixi initialization

**Files Updated:**
- `src/components/Home/SiloHoverBanner.jsx` - Reverted to synchronous detection + conditional rendering
- `src/hooks/useSiloHoverPixi.js` - Removed `isReady` parameter from hook signature and dependency array

---

## January 2, 2026

### Changed: Home Hero Subtitle Styling

Updated the subtitle styling on the Home page Hero section to match the Services page subtitle styling.

**Changes:**
- Changed from `font-bold text-2xl xl:text-xl` to `text-base font-medium`
- Added `max-w-2xl mx-auto px-4` for consistent width constraint, centering, and padding
- Maintained center alignment

**File Updated:**
- `src/components/Home/Hero.jsx`

---

### Fixed: Interested Section Bottom Padding

Removed redundant bottom padding from the Interested section on the Services page to standardize spacing with the site's divider system.

**Issue:**
- Section had `pb-16` (64px) bottom padding
- Divider below had `my-16` (64px) margin
- Combined = 128px gap, which was too large

**Fix:**
- Removed `pb-16` from section - divider's margin now controls the spacing

**File Updated:**
- `src/components/servicee/Interested.jsx`

---

## January 1, 2026

### Git Push: Major Update Deployed

**Commit:** `b53ea88`  
**Branch:** `main`  
**Remote:** `https://github.com/willjcarter97/silo.git`  
**Time:** January 1, 2026

**Summary:** Pushed 53 files with 1690 insertions and 1263 deletions.

**New Files Added:**
- `src/components/Common/ReadyWhenYouAre.jsx` - Reusable CTA component
- `src/components/Common/WantResultsLikeThis.jsx` - Case study CTA component
- `src/components/servicee/Layout417.jsx` - Relume scroll card stack component
- `src/pages/ThankYou.jsx` - Animated thank you page with redirect

**Key Changes Included:**
- ServicesV2 promoted to main Services page with scroll-based card stack
- Contact forms redirect to animated Thank You page
- Fixed Core Services trackpad scroll performance
- Fixed SiloHoverBanner race condition
- Fixed WhoWeLoveWorkingWith layout issues
- Unified section spacing system across site
- Reduced mobile padding for Prismic case studies
- Rich text formatting support for case study content
- Reusable CTA components deployed across all pages

---

### Changed: ServicesV2 Now Main Services Page

Promoted the ServicesV2 page (using Relume Layout417 component with Framer Motion) to be the main `/services` route.

**Changes:**
- **Archived**: `src/pages/Services.jsx` → `src/pages/Services.jsx.bak`
- **Renamed**: `src/pages/ServicesV2.jsx` → `src/pages/Services.jsx`
- **Removed**: `/services-v2` route (no longer needed)
- **Updated**: Page meta title from "Services V2 | ..." to "Services | ..."

**Current Services Page Features:**
- Scroll-driven card stack animation using Framer Motion
- Cards rotate and translate off-screen as user scrolls
- Large background heading ("CORE SERVICES") behind cards
- Sticky container keeps cards centered during scroll
- Includes Interested section and ReadyWhenYouAre CTA

**Files Updated:**
- `src/routes/route.jsx` - Removed ServicesV2 import and route
- `src/pages/Services.jsx` - Renamed from ServicesV2, updated component name and meta

---

### Fixed: WhoWeLoveWorkingWith Section Full-Width Layout Issues

Fixed layout issues in the "Who we love working with" section on the About page where the section was pushed to the right on some screens, the third marquee row was squished far right on larger displays, and the section had internal scrolling with excessive unused space.

**Root Causes:**
1. `w-[100vw]` without proper centering can cause offset issues
2. `flex items-start justify-center` was conflicting with the layout
3. Forced `min-h-[45vh]` / `md:min-h-[60vh]` creating excessive height
4. Marquee container using `absolute` positioning took it out of document flow
5. Conflicting margins/padding (`pt-32`, `mt-20`, `-mt-32`) causing spacing issues

**Fixes Applied:**
- Changed to `w-screen relative left-1/2 -translate-x-1/2` for proper full-width breakout
- Removed forced min-heights - section height now determined by content
- Changed marquee container from `absolute` to normal flow
- Simplified padding to consistent `py-12 md:py-16 lg:py-20`
- Added `max-w-[1280px] mx-auto` to text container for alignment
- Simplified gradient overlays with cleaner positioning

**File Updated:**
- `src/components/About/WhoWeLoveWorkingWith.jsx`

---

### Added: Animated Thank You Page with Auto-Redirect

Created a new thank you page that contact forms redirect to after successful submission.

**New Route:**
- `/thank-you` - Animated confirmation page

**Features:**
- **Staggered letter animations**: "Thank you" letters animate in one by one with rotation and translate effects
- **Clean minimal design**: Large typography with Epilogue font, no background clutter
- **Auto-redirect to previous page**: Returns user to the page they submitted the form from (stored in sessionStorage)
- **Wild exit transition**: When redirecting, includes:
  - Letters fly upward and scatter with staggered timing
  - Page zooms in and rotates slightly
  - Radial burst effect with brand color
  - Brand-colored curtain sweeps up
  - Content blurs before transition

**Contact Form Changes:**
- **Contact.jsx** (`/ugc-contact`): Now redirects to `/thank-you` instead of reloading page
- **Contact2.jsx** (`/contact`): Now redirects to `/thank-you` instead of reloading page
- Removed toast success notifications (thank you page replaces them)
- Reduced submission delay from 1000ms to 500ms for faster feedback

**Files Added:**
- `src/pages/ThankYou.jsx` - Animated thank you page component

**Files Updated:**
- `src/routes/route.jsx` - Added `/thank-you` route
- `src/pages/Contact.jsx` - Changed form submission to navigate to thank you page
- `src/pages/Contact2.jsx` - Changed form submission to navigate to thank you page
- `src/components/BlogDetail/NewsletterSubscription.jsx` - Changed form submission to navigate to thank you page
- `src/pages/Ramblings.jsx` - Connected newsletter form at bottom of blog index to redirect to thank you page

---

### Reduced: Mobile Section Padding for Prismic Case Studies (30% reduction)

Reduced vertical padding between sections on mobile for Case Study posts uploaded via Prismic CMS.

**Padding Changes:**

| Component | Previous Mobile | New Mobile | Desktop (unchanged) |
|-----------|-----------------|------------|---------------------|
| TitleWithDescription | `pt-16` (64px) | `pt-11` (~44px) | `md:pt-24` |
| StatsSection | `py-12` (48px) | `py-8` (32px) | `md:py-20` |
| GalleryWithText | `py-12` (48px) | `py-8` (32px) | `md:py-20` |
| SimpleHeadingText | `py-16` (64px) | `py-11` (~44px) | `md:py-24` |
| FourGallery | `py-8` (32px) | `py-5` (20px) | `md:py-12` |
| TwoColumnTextSlice | `py-12` (48px) | `py-8` (32px) | `md:py-20` |

**Files Updated:**
- `src/components/poststudy/TitleWithDescription.jsx`
- `src/components/poststudy/StatsSection.jsx`
- `src/components/poststudy/GalleryWithText.jsx`
- `src/components/poststudy/SimpleHeadingText.jsx`
- `src/components/poststudy/FourGallery.jsx`
- `src/pages/PostCaseStudy.jsx` (TwoColumnTextSlice inline component)

---

### Fixed: Hero Description Indentation on Mobile (Case Studies & About)

Fixed an issue where the description paragraph in hero sections was indented more than the heading on mobile devices.

**Root Cause:**
- Multiple elements (h1, wrapper div, paragraph) each had their own `px-2` padding
- This caused double/triple-indentation for nested elements

**Fix:**
- Applied single `px-3 sm:px-0` (0.75rem) padding to the text content wrapper div only
- Removed all `px-2` padding from h1, inner wrapper divs, and paragraph elements
- This ensures consistent 0.75rem padding from edge for all text content on mobile

**Files Updated:**
- `src/pages/CaseStudies.jsx` - Fixed mobile text alignment
- `src/components/About/Hero.jsx` - Fixed mobile text alignment, increased mobile text size to `text-base`, set width to `w-full` on mobile

---

### Refactored: Services Page Interested Component

Combined `Interested.jsx` and `OptionalAddOns.jsx` into a single unified component with consistent styling and spacing.

**Changes:**
- **Optional Add-ons spans full width**: The "Optional add-ons" section uses `md:col-span-2` to span both columns, creating a visual hierarchy:
  ```
  [Card 1][Card 2]
  [Card 3][Card 4]
  [  Optional Add-ons  ]
  ```
- **Consistent typography**: All headings use `text-[28px] md:text-[32px]` with `font-epilogue font-bold`
- **Consistent paragraph styling**: All descriptions use `text-base leading-[150%]`
- **Consistent list styling**: All bullet lists use `space-y-3 text-sm` with the same red triangle markers
- **Unified card padding**: All cards use `md:p-8 p-0 py-6` with consistent border styling
- **CTA in Optional Add-ons**: The "Interested in a chat?" button is now inside the full-width Optional add-ons card
- **Image height consistency**: All card images now use `h-[250px] md:h-[300px]` for uniform appearance
- **Simplified border logic**: Using `border-t` and `md:border-l` for cleaner grid lines

**File Updated:**
- `src/components/servicee/Interested.jsx` - Complete restructure

**Note:** `OptionalAddOns.jsx` remains in the codebase but is no longer needed for the main Services page flow.

---

### Added: Alternative Services Page (ServicesV2) with Relume Layout417 Component

Created an alternative version of the Services page using the Relume Layout417 scroll-based card stack component for A/B comparison.

**New Files:**
- `src/components/servicee/Layout417.jsx` - Adapted Relume Layout417 component with project styling
- `src/pages/ServicesV2.jsx` - Alternative Services page using the new component

**New Route:**
- `/services-v2` - Access the alternative Services page

**Layout417 Features:**
- Scroll-driven card stack animation using Framer Motion
- Cards rotate and translate off-screen as user scrolls
- Large background heading ("CORE SERVICES") behind cards
- Sticky container keeps cards centered during scroll
- Uses existing `servicesData.jsx` for service content
- Adapted to project styling (brand color, Epilogue font, card borders)

**ServicesV2 Page Structure:**
- Hero section with "What we do" heading and CTA buttons
- Layout417 scroll cards section (replaces the original Cards component)
- Interested section with service details
- ReadyWhenYouAre CTA section

**Comparison:**
- Original `/services` - Uses GSAP ScrollTrigger with pinned card stack
- New `/services-v2` - Uses Framer Motion with scroll-based transforms

**Technical Details:**
- Hybrid approach: GSAP ScrollTrigger for pinning + Framer Motion for animations
- Uses `pin: true` with GSAP for reliable screen locking
- Scroll distance of 2000px to animate through all 4 cards
- Motion value bridge: GSAP updates Framer Motion's `useMotionValue` for reactive animations
- Pixel-based translations for predictable card movement
- Opacity fade as cards fly away

---

### Fixed: Case Study Rich Text Formatting

Fixed an issue where rich text content from Prismic was not rendering with proper formatting (bold, italic, links, etc.) in case study sections.

**Root Cause:**
- Helper functions (`richTextToArray`, `richTextToContentArray`) were extracting plain text from Prismic Rich Text fields, stripping all formatting
- Components rendered this as plain `<p>` tags without any formatting

**Solution:**
- Added `PrismicRichText` component support to all affected case study components
- Components now accept a `richText` prop (or `richDescription`) containing the raw Prismic field
- When rich text is provided, it's rendered with `PrismicRichText` with custom styling components
- Backwards compatibility maintained: components still accept plain text arrays as fallback

**Components Updated:**
- `src/components/poststudy/GalleryWithText.jsx` - Added `richText` prop and `PrismicRichText` rendering
- `src/components/poststudy/SimpleHeadingText.jsx` - Added `richText` prop and `PrismicRichText` rendering
- `src/components/poststudy/TitleWithDescription.jsx` - Added `richDescription` prop and `PrismicRichText` rendering

**Rich Text Formatting Supported:**
- Paragraphs, headings (H2, H3)
- Bold and italic text
- Ordered and unordered lists
- Hyperlinks (styled with brand color and underline)

**Page Updated:**
- `src/pages/PostCaseStudy.jsx` - Now passes raw Prismic rich text fields to components

---

### Fixed: Core Services Card Section Trackpad Scroll Performance

Fixed an issue where scrolling through the Core Services card stack on desktop was extremely slow and glitchy when using a trackpad.

**Root Cause:**
- Desktop used custom wheel event hijacking with `e.preventDefault()`
- Spring animations were constantly stopped and restarted on each wheel event
- Trackpads fire many small events very quickly, causing constant animation interruption
- This approach fundamentally doesn't work well with trackpad input

**Solution:**
- Replaced wheel event hijacking with GSAP ScrollTrigger (same approach as mobile)
- Desktop now uses native scroll with section pinning
- Smooth scrub animation tied to actual scroll position
- Works perfectly with trackpads, mice, and touch input

**Technical Changes:**
- Removed: `isLockedRef`, `isAnimatingRef`, `unlockTimeoutRef`, `lastWheelTime`, `accumulatedDelta`, `animationRef` refs
- Removed: `animateToProgress` callback and wheel event handler
- Added: Desktop ScrollTrigger with `start: "center center"`, `end: "+=1000"`, `scrub: 0.8`

**File Updated:**
- `src/components/servicee/Cards.jsx` - Complete rewrite of desktop scroll handling

---

### Added: Reusable CTA Section Components

Created two standardized, reusable CTA section components to replace duplicated code across the site.

**New Components:**
- `src/components/Common/ReadyWhenYouAre.jsx` - General CTA for Home, About, Services, Job Board
- `src/components/Common/WantResultsLikeThis.jsx` - CTA for case study pages

**Features:**
- Fully responsive (desktop, tablet, mobile layouts)
- Configurable via props (heading, description, image, button text/links)
- Consistent design and spacing across all pages
- Uses LazyImage for optimized loading

**WantResultsLikeThis Defaults:**
- Heading: "Want results like this?"
- Description: "Reach out and we'll walk you through how we can help on your next project."
- Image: Prismic placeholder image

**Pages Updated:**
- **Home** (`src/components/Home/Hero.jsx`) - Now uses `ReadyWhenYouAre`
- **About** (`src/pages/About.jsx`) - Now uses `ReadyWhenYouAre`
- **Services** (`src/components/servicee/Hero.jsx`) - Now uses `ReadyWhenYouAre` with proper top divider spacing
- **Job Board** (`src/pages/JobBoard.jsx`) - Removed "Get these straight to your inbox" newsletter section, now uses `ReadyWhenYouAre`
- **Case Studies (Portfolio)** (`src/pages/CaseStudies.jsx`) - Now uses `ReadyWhenYouAre` with proper bottom spacing
- **Careers** (`src/pages/CareerIndex.jsx`) - Now uses `ReadyWhenYouAre` with proper spacing
- **Terms** (`src/pages/Terms.jsx`) - Now uses `ReadyWhenYouAre` with proper spacing
- **Privacy** (`src/pages/Privacy.jsx`) - Now uses `ReadyWhenYouAre` with proper spacing
- **Cookies** (`src/pages/Cookies.jsx`) - Now uses `ReadyWhenYouAre` with proper spacing
- **Legal** (`src/pages/Legal.jsx`) - Now uses `ReadyWhenYouAre` with proper spacing
- **PostCaseStudy** (`src/pages/PostCaseStudy.jsx`) - Now uses `WantResultsLikeThis`
- **All Case Study Pages** (`src/pages/case-studies/*.jsx`) - Now use `WantResultsLikeThis`

**Deprecated:**
- `src/components/Home/Section.jsx` - Still exists for backwards compatibility, but use `ReadyWhenYouAre` for new implementations
- `src/components/About/Section2.jsx` - No longer in active use

---

### Fixed: SiloHoverBanner Hover Effect Race Condition & Draggable Image

Fixed intermittent issues where the hover logo effect wouldn't work on initial page load (requiring a hard refresh) and could be dragged as an image.

**Root Causes:**
1. Race condition: `isMobile` state initialized as `false`, causing Pixi to start before mobile detection completed
2. Missing drag prevention: Fallback images and canvas were draggable by default
3. Pixi hook ran before client-side state was confirmed

**Fixes Applied:**
- Added `isReady` state to ensure Pixi only initializes after mobile detection completes
- Changed `isMobile` initial state to `null` to represent "unknown" state
- Added `draggable="false"` to all fallback images
- Added `user-select: none` CSS to prevent drag behavior on canvas and images
- Applied `pointer-events: none` to mobile static image

**Files Updated:**
- `src/components/Home/SiloHoverBanner.jsx` - Added ready state, drag prevention styles
- `src/hooks/useSiloHoverPixi.js` - Added `isReady` check, canvas drag prevention, fallback image protection

---

### Implemented: Consistent Section Spacing System
Established a unified spacing system for section dividers across the site.

**Spacing Rules:**
- **Section dividers**: `my-16 md:my-24` (64px mobile, 96px desktop)
- **Divider positioning**: `relative left-1/2 -translate-x-1/2` for full-width within constrained containers
- **Section containers**: No internal vertical padding (dividers control the rhythm)

**Files Updated:**
- `Hero.jsx` - Normalized all 3 divider lines to consistent `my-16 md:my-24` spacing
- `ContentAndDone.jsx` - Fixed container padding, internal divider, removed arbitrary `pt-10` and `relative top-40`
- `Section.jsx` - Removed inconsistent `pb-12 md:pb-24` and `mt-20`
- `tailwind.config.js` - Added `section` (4rem) and `section-lg` (6rem) spacing tokens

**Previous fix included:**
- Fixed full-width divider line positioning from `absolute right-0` to `relative left-1/2 -translate-x-1/2`
