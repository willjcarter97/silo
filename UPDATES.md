# Updates Log

## 2025-12-31

### Fixed: GalleryWithText Images Now Fit Within Frame

**Issue:** Images in the GalleryWithText component on case study pages were being cropped when they weren't perfectly square, cutting off important content.

**Solution:** Changed the default image styling from `object-cover` to `object-contain` in `src/components/poststudy/GalleryWithText.jsx`.

**Details:**
- `object-cover` crops images to fill the container (can cut off edges)
- `object-contain` scales images to fit entirely within the container (no cropping)
- Custom `image.className` can still override this behavior per-image if needed

**File modified:**
- `src/components/poststudy/GalleryWithText.jsx`

**Result:** Non-square images now display fully within their frames without being cropped.

---

### Fixed: Case Study Cards "View All" Button Overlapping with Last Card

**Issue:** On the home page, the "View all" button for case studies was overlapping into the last case study card due to incorrect height/margin settings.

**Solution:** Modified `src/components/Home/ContentAndDone.jsx`:
- **Mobile view**: Changed button margin from `mt-[-5rem]` (negative margin causing overlap) to `mt-12` (proper positive spacing)
- **Mobile view**: Added `pb-8` to the case study cards container for proper bottom padding
- **Tablet view**: Removed conflicting `top-10 md:-top-20 relative` positioning from image containers that was causing layout issues

**File modified:**
- `src/components/Home/ContentAndDone.jsx`

**Result:** The "View all" button now displays with proper spacing below the last case study card on all screen sizes.

---

### Added: Comprehensive Lazy Loading System

**Change:** Added lazy loading for images and text across the entire site for improved performance and user experience.

**New Components Created:**
- `src/components/Common/LazyImage.jsx` - Enhanced image lazy loading with:
  - Intersection Observer-based loading
  - Smooth fade-in animations
  - Skeleton loading state with shimmer effect
  - Error state handling with fallback
  - Configurable threshold and root margin
  
- `src/components/Common/LazyText.jsx` - Text animation on scroll with:
  - Multiple animation types: fadeUp, fadeDown, fadeLeft, fadeRight, fade, scale, blur
  - Configurable delay and duration
  - Support for any HTML element via `as` prop
  - Optional staggered children animation
  
- `src/components/Common/LazyElement.jsx` - Universal lazy loading wrapper with:
  - Multiple animation presets
  - Optional placeholder while loading
  - Can delay rendering or animate hidden content
  - Configurable intersection observer options

**Enhanced Components:**
- `src/components/Common/LazySection.jsx` - Updated with optional fade animation and improved API

**CSS Additions:**
- Added shimmer animation for skeleton loading states
- Added utility classes for lazy fade-in effects (`.lazy-fade-in`, `.lazy-delay-*`)

**Pages/Components Updated:**
- `src/components/Home/Hero.jsx` - Wrapped sections in LazySection and LazyElement
- `src/components/Home/ContentAndDone.jsx` - Added LazyImage, LazyText, LazyElement to all cards and case studies
- `src/components/Home/Section.jsx` - Updated images to use LazyImage
- `src/components/About/Hero.jsx` - Added LazyImage and LazyText to hero content
- `src/components/servicee/Hero.jsx` - Added LazyText and LazySection to hero content
- `src/components/servicee/Interested.jsx` - Added LazyImage and LazyElement to service cards
- `src/components/servicee/OptionalAddOns.jsx` - Added LazyImage and LazyElement to add-on cards
- `src/pages/CaseStudies.jsx` - Added lazy loading to case study cards and hero images
- `src/pages/Ramblings.jsx` - Added lazy loading to blog post cards and featured image

**LazyImage Improvements:**
- Changed default placeholder to transparent (supports PNG transparency)
- Added `showSkeleton` prop - only shows grey skeleton when explicitly enabled
- Images with transparency no longer show grey background

**Benefits:**
- Faster initial page load (images only load when needed)
- Reduced bandwidth usage (especially on mobile)
- Smooth scroll-triggered animations improve perceived performance
- Better Core Web Vitals scores (LCP, CLS)

---

### Updated: Header Navigation Styling & Scroll Behavior

**Changes:**
1. **Smaller Nav Links**: Reduced navigation link text size from `text-xl` to `text-base xl:text-lg` for a more refined appearance
2. **Scroll-Hide Navbar**: Added scroll-direction-based hiding behavior:
   - Navbar hides when scrolling down (after 100px from top)
   - Navbar reappears when scrolling up
   - Navbar always visible near top of page
   - Smooth 300ms transition animation
   - Uses `requestAnimationFrame` for performance

**File modified:**
- `src/components/Common/Header.jsx`

**Technical Details:**
- Uses `useRef` for scroll position tracking without re-renders
- Threshold of 10px prevents jitter on small scroll movements
- Passive scroll event listener for performance
- Transform-based animation (`translate-y-full`) for smooth GPU-accelerated hiding

---

### Connected: Careers Page to Prismic

**Changes:**
1. **Careers Listing Page** (`/careers`):
   - Now fetches career openings from Prismic `career` content type
   - Automatically shows jobs when they exist, shows empty state when none
   - Orders by `publish_date` field (newest first - chronological)
   - Filters out inactive jobs (`is_active === false`)
   - Loading state shown while fetching

2. **Career Detail Page** (`/job/:uid`):
   - Now fetches individual career by UID from Prismic
   - Displays all job details: title, department, location, contract type
   - Hero images support (with placeholder fallback)
   - Dynamic lists: What you'll do, Benefits, Who you are, Who you'll be
   - Loading state and 404 handling

**Files modified:**
- `src/pages/CareerIndex.jsx`
- `src/pages/JobDetail.jsx`
- `src/components/jobdetail/HeroSection.jsx`
- `src/components/jobdetail/JobDetailsSection.jsx`

**Prismic Custom Type:**
- Added `scripts/prismic-career-type.json` - Custom type definition for career openings

**Career Opening Fields in Prismic:**
- `uid` - URL slug (e.g., creator-partnerships-manager)
- `title` - Job title
- `department` - Department label
- `location` - Location (Remote, London, etc.)
- `contract_type` - Contract type (Permanent, Full-time, etc.)
- `short_description` - Brief description for listing
- `publish_date` - Date for chronological ordering (newest first)
- `is_active` - Show/hide toggle
- `hero_image_1`, `hero_image_2` - Hero section images
- `intro_heading`, `intro_description` - Intro section content
- `what_youll_do` - Repeatable group of responsibilities
- `benefits` - Repeatable group of benefits
- `who_you_are` - Repeatable group of requirements
- `who_youll_be` - Repeatable group of role outcomes

---

### Connected: Job Board to Prismic

**Changes:**
1. **Job Board Listing Page** (`/job-board`):
   - Now fetches job listings from Prismic `job_listing` content type
   - Automatically shows jobs when they exist, shows empty state when none
   - Orders by `publish_date` field (newest first - chronological)
   - Filters out inactive jobs (`is_active === false`)
   - Loading state shown while fetching
   - Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop

2. **Job Detail Page** (`/jobs/:uid`):
   - Now fetches individual job by UID from Prismic
   - Displays all job details: client info, images, contact, requirements
   - Loading state and 404 handling

**Files modified:**
- `src/pages/JobBoard.jsx`
- `src/pages/JobBoardDetail.jsx`

**Prismic Custom Type:**
- Added `scripts/prismic-job-listing-type.json` - Custom type definition for job listings

**Job Listing Fields in Prismic:**
- `uid` - URL slug (e.g., smoothie-smash-ugc)
- `title` - Brand/job title
- `category` - Category label
- `card_image` - Image for listing cards
- `primary_image` - Hero image on detail page
- `secondary_image` - Secondary image
- `client_description` - Rich text about the client
- `contact_name`, `contact_title`, `contact_email`, `contact_avatar` - Contact info
- `looking_for` - Repeatable group of requirements
- `not_looking_for` - Repeatable group of anti-requirements
- `publish_date` - Date for chronological ordering (newest first)
- `is_active` - Show/hide toggle

---

### Connected: MindsInTheSilo Team Carousel to Prismic

**Changes:**
1. **Square Images**: Changed team member photos from fixed heights to `aspect-square` for consistent square sizing
2. **Dynamic Card Heights**: All cards now use consistent height based on card width + 180px for text content
3. **Conditional "Join Us" Card Content**: The special card at the end now changes based on team size:
   - **2 or fewer team members**:
     - Title: "It's not the size that matters."
     - Description: "But a few more teammates wouldn't hurt."
     - Button: "View Openings"
   - **3+ team members**:
     - Title: "Think you're the right fit for our team?"
     - Button: "Current Vacancies"
     - Secondary: "Can't see an opening that fits you? Get in touch anyway - we're always on the lookout for our next team-mates!"
4. **Prismic Integration**: Team members are now fetched from Prismic CMS
   - Fetches from `team_member` content type
   - Orders by `display_order` field (ascending)
   - Filters out inactive members (`is_active === false`)
   - Loading state shown while fetching
   - Section hidden if no team members exist

**File modified:**
- `src/components/About/MindsInTheSilo.jsx`

**Prismic Custom Type:**
- Added `scripts/prismic-team-member-type.json` - Custom type definition for Prismic

**Team Member Fields in Prismic:**
- `uid` - URL slug (e.g., ruby-turbett)
- `name` - Full name
- `title` - Job title
- `description` - Bio description
- `photo` - Square photo (800x800 recommended)
- `display_order` - Number for ordering (lower = first)
- `is_active` - Boolean to show/hide

---

### Fixed: Case Study Components Losing Horizontal Margins on Resize

**Issue:** Multiple poststudy components were losing their horizontal padding when resizing between tablet (768px) and desktop (1280px). The padding pattern was `px-3 md:px-0`, which removed all padding at the `md` breakpoint before the `max-w-[1280px]` could constrain the content.

**Solution:** Updated padding to use consistent responsive pattern `px-5 md:px-6 lg:px-0`:
- Mobile: 20px (px-5)
- Tablet: 24px (px-6)
- Desktop (lg+): 0px (max-width takes over)

**Files modified:**
- `src/components/poststudy/TitleWithDescription.jsx`
- `src/components/poststudy/FullScreenImage.jsx`
- `src/components/poststudy/SimpleHeadingText.jsx`
- `src/components/poststudy/FourGallery.jsx`

---

### Fixed: StatsSection Layout Breaking with Longer Text

**Issue:** The StatsSection component was designed for short stat values (like "30%" or "100K") with very large font sizes. When longer text came from Prismic, it broke the layout because:
1. The font size was too large for longer text
2. There was no automatic line-breaking or size reduction

**Solution:** Updated `src/components/poststudy/StatsSection.jsx`:
- Added `renderStatValue()` helper function that:
  - Detects if the value is a string longer than 10 characters or has multiple lines
  - Automatically reduces font size for longer values (`text-3xl md:text-4xl lg:text-5xl` instead of `text-5xl md:text-5xl lg:text-8xl`)
  - Interprets `\n` characters as `<br />` tags for line breaks
  - Passes through JSX elements unchanged (for hardcoded case studies)
- Fixed mobile card min-heights to be more flexible (`min-h-[300px]` and `min-h-[280px]`)
- Added `text-left` to description text for consistent alignment
- Removed empty image placeholder cards on mobile when no image is provided
- Added `leading-tight` for multi-line stat values

**File modified:**
- `src/components/poststudy/StatsSection.jsx`

---

### Fixed: Case Study Detail Pages Missing GSAP Animations and Styled Components

**Issue:** After switching to Prismic slices for case study detail pages, all the GSAP animations and proper styling were lost. The pages became static with simplified inline components instead of using the original styled components.

**Solution:** Rewrote `src/pages/PostCaseStudy.jsx` to use the actual styled components from `src/components/poststudy/`:
- `TitleWithDescription` - With Vimeo player integration, play/pause controls, cover image overlays
- `GalleryWithText` - With GSAP ScrollTrigger animations for sticky scrolling text
- `StatsSection` - With proper 3-column grid layout, card borders, and responsive styling
- `FullScreenImage` - With proper aspect ratio container
- `SimpleHeadingText` - For heading + paragraph sections
- `FourGallery` - For 2x2 image grid with hover effects

**File modified:**
- `src/pages/PostCaseStudy.jsx`

**Details:**
- Removed simplified inline slice components
- Imported actual styled components from `src/components/poststudy/`
- Added helper functions to transform Prismic Rich Text to expected prop formats:
  - `richTextToArray()` - Converts Prismic Rich Text to string array
  - `richTextToContentArray()` - Converts to content objects with subheadings for GalleryWithText
- Slice renderer now properly maps Prismic data to each component's expected props
- Added support for `simple_heading_text` and `four_gallery` slice types

**Result:** Case study detail pages now have all original animations, video player functionality, and styling restored while still fetching content from Prismic.

---

### Fixed: Empty Prismic Client Configuration Causing White Screen

**Issue:** The website was showing a completely white screen because `src/prismicio.js` was empty, causing the Prismic client import to be `undefined`. When components tried to fetch data using `client.getAllByType()`, they crashed with an error.

**Solution:** Restored the Prismic client configuration in `src/prismicio.js`:
- Added `@prismicio/client` import
- Configured client with repository name `silosite`
- Exported the `client` instance for use throughout the app

**File modified:**
- `src/prismicio.js`

---

### Added: Case Studies Connected to Prismic CMS

**Change:** Case Studies listing and detail pages now fetch content from Prismic CMS instead of hardcoded data.

**Files modified:**
- `src/pages/CaseStudies.jsx` - Now fetches all case studies from Prismic, ordered by `display_order`
- `src/components/Home/ContentAndDone.jsx` - Now fetches homepage case studies from Prismic (where `show_on_homepage` is true)
- `src/pages/PostCaseStudy.jsx` - Now renders case study detail pages dynamically from Prismic slices

**Features:**
- **Reorderable**: Change `display_order` field in Prismic to reorder case studies on the listing page
- **Homepage Control**: Toggle `show_on_homepage` boolean to feature case studies on the homepage
- **Dynamic Detail Pages**: Case study content rendered via Prismic slices (Title with Description, Two Column Text, Gallery with Text, Stats Section, Full Screen Image)
- **Hero Support**: Supports both image and video heroes (uploaded or external URL)

**Case Study Custom Type Fields:**
- `uid` - URL slug
- `title` - Case study title
- `subtitle` - Short tagline
- `description` - Description for listing page
- `featured_image` - Main image for cards
- `display_order` - Number for ordering (lower = first)
- `show_on_homepage` - Boolean to show on homepage
- `tags` - Repeatable group of tag names
- `hero_type` - Select: image or video
- `hero_image` - Hero image
- `hero_video` - Uploaded video file
- `hero_video_url` - External video URL
- `body` - Slice zone for content

**URL Format:**
- `/case-studies` - Lists all case studies from Prismic
- `/case-studies/:uid` - Individual case study page (e.g., `/case-studies/basement-approved`)

---

### Changed: Blog Posts Display Order to Chronological

**Change:** Updated the Ramblings (blog listing) page to display posts in chronological order (oldest first) instead of reverse chronological (newest first).

**File modified:**
- `src/pages/Ramblings.jsx`

**Details:**
- Changed Prismic query ordering from `direction: "desc"` to `direction: "asc"`
- Posts now display oldest to newest based on publish_date

---

### Fixed: BasementApproved Case Study Content Errors

**Issue:** Copy-paste errors left content from other case studies in BasementApproved.jsx:
- "Electrolytes With Joly" text in the visual direction section
- E-commerce language ("headless commerce", "inventory management", "peak sales periods")
- E-commerce alt text labels ("Category page", "Product detail", "Shopping cart")

**Solution:** Rewrote affected sections with appropriate BasementApproved content about:
- Music/culture platform features
- Mixcloud API integration
- Automated mixes hub
- Editorial and DJ content

**File modified:**
- `src/pages/case-studies/BasementApproved.jsx`

---

### Security: Removed Exposed API Token

**Change:** Removed hardcoded Prismic API token from codebase for security.

**File modified:**
- `scripts/import-blog-posts.mjs` - Token replaced with environment variable reference

---

### Updated: Favicon Migration (Cloudinary → Prismic)

**Change:** Migrated site favicon from Cloudinary to Prismic.

**File modified:**
- `index.html`

**URL changed:**
- Old: `https://res.cloudinary.com/di9tb45rl/image/upload/v1764232673/favicon-16x16_wmoo6x.png`
- New: `https://images.prismic.io/silosite/aVUrRnNYClf9otud_favicon-16x16_wmoo6x.png?auto=format,compress`

---

### Updated: Video Migration (Cloudinary → Prismic)

**Change:** Migrated video file from Cloudinary to Prismic.

**File modified:**
- `src/pages/case-studies/TomokaFineAndRare.jsx`

**URL changed:**
- Old: `https://res.cloudinary.com/di9tb45rl/video/upload/v1766430730/Website_Video_1_pxleqo.mp4`
- New: `https://silosite.cdn.prismic.io/silosite/aVUpSXNYClf9otuV_Website_Video_1_pxleqo.mp4`

---

### Completed: Image Migration (Cloudinary → Prismic)

**Change:** Migrated all site images from the old developer's Cloudinary account to Prismic's Media Library.

**Summary:**
- 194 Cloudinary URLs replaced with Prismic URLs
- 34 source files updated
- All images now hosted on `images.prismic.io/silosite/`

**Files modified:**
- `src/components/About/` - 6 files (Hero, MindsInTheSilo, Section2, ThingsWeBelieveIn, WhatSiloIs, WhyUGC)
- `src/components/Common/` - 2 files (Footer, Header)
- `src/components/Home/` - 5 files (ContentAndDone, Hero, Section, SiloHoverBanner, VideoAndWelcome)
- `src/components/servicee/` - 2 files (Interested, OptionalAddOns)
- `src/data/` - 4 files (blogDetailsData, blogPostsData, jobsData, servicesData)
- `src/pages/case-studies/` - 6 files (all case study pages)
- `src/pages/` - 3 files (CaseStudies, Contact, Contact2)
- `src/pages/Ramblings/` - 5 files (all blog pages)
- `scripts/` - 1 file (import-blog-posts.mjs)

**Reversibility:**
- Backup files (`.bak`) created for all modified files
- Run `node scripts/restore-from-backup.mjs` to revert to Cloudinary URLs
- URL mapping saved in `scripts/image-url-mapping.json`

**Files added:**
- `scripts/restore-from-backup.mjs` - Restores original files from .bak backups

---

### Added: Image Migration Scripts (Cloudinary → Prismic)

**Change:** Created scripts to migrate all images from the old developer's Cloudinary account to Prismic's Media Library.

**Problem:**
- All site images (~199 URLs across 37 files) are hosted on Cloudinary under the old developer's account (`res.cloudinary.com/di9tb45rl/`)
- Need to migrate ownership to Prismic for long-term control

**Files added:**
- `scripts/migrate-images-to-prismic.mjs` - Downloads all Cloudinary images and prepares for Prismic upload
- `scripts/replace-image-urls.mjs` - Replaces old URLs with new Prismic URLs in source files

**Usage:**
1. Run `node scripts/migrate-images-to-prismic.mjs` to download all images
2. Upload images to Prismic Media Library (https://silosite.prismic.io/media)
3. Update `scripts/image-url-mapping.json` with new Prismic URLs
4. Run `node scripts/replace-image-urls.mjs` to update all source files

**Details:**
- Scripts scan `src/` and `scripts/` directories for Cloudinary URLs
- Images are downloaded to `migrated-images/` folder with clean filenames
- Mapping file tracks old URL → new URL relationships
- Replace script supports `--dry-run` and `--backup` options

---

### Added: Prismic CMS Integration

**Change:** Added Prismic headless CMS integration for content management.

**Configuration:**
- Repository: `silosite` (https://silosite.prismic.io/)
- Client file: `src/prismicio.js`

**Packages installed:**
- `@prismicio/client`
- `@prismicio/react`

**Files added:**
- `src/prismicio.js` - Prismic client configuration

**Details:**
- Created Prismic client with repository name `silosite`
- Ready to create content types (Blog Posts, Services, Jobs, Case Studies) in Prismic dashboard
- Components can now fetch content using `client.getAllByType()` and `client.getByUID()`

---

### Updated: Blog Pages Connected to Prismic

**Change:** Ramblings (blog listing) and BlogDetail pages now fetch content from Prismic CMS.

**Files modified:**
- `src/pages/Ramblings.jsx` - Now fetches blog posts from Prismic
- `src/pages/BlogDetail.jsx` - Now fetches individual posts by UID from Prismic
- `src/routes/route.jsx` - Updated routing to use dynamic `/blog/:uid` pattern

**Details:**
- Blog listing page fetches all `blog_post` documents, ordered by publish date
- Individual blog pages fetch by UID (slug)
- Supports Prismic Slices for flexible content (text blocks, images with captions, quotes)
- Loading states and error handling implemented
- Removed hardcoded individual blog page routes (TheRiseOfAI, BrandIdentityShift, etc.)

**Blog Post URL Format:**
- Old: `/ai-powered-content-creation-2025` (hardcoded routes)
- New: `/blog/ai-powered-content-creation-2025` (dynamic from Prismic UID)

---

### Changed: Git Repository

**Change:** Switched Git remote from developer's repository to owner's repository.

**Previous remote:** `https://github.com/AbdulRehman938/SiloUpdated.git`
**New remote:** `https://github.com/willjcarter97/silo.git`

**Details:**
- Removed previous developer's Git remote
- Added new remote pointing to William Carter's GitHub account
- Pushed all existing code to new repository

---

### Added: Social Media Links to Footer

**Change:** Added functional social media links to the footer component across all pages.

**Links added:**
- Instagram: https://www.instagram.com/thesilocreative/
- TikTok: https://www.tiktok.com/@the.silo.creative
- LinkedIn: https://www.linkedin.com/company/the-silo-creative/

**Files modified:**
- `src/components/Common/Footer.jsx`

**Details:**
- Updated both desktop and mobile footer social links from placeholder `href="#"` to actual URLs
- Added `target="_blank"` and `rel="noopener noreferrer"` attributes for secure external linking
- Added `hover:text-brand` class to desktop social links for consistent hover effect

---

### Fixed: Hero Section Component Overlap on Smaller Screens

**Issue:** On smaller screen sizes, the hero components (SiloHoverBanner, LogoLoop, VideoAndWelcome) were overlapping due to fixed viewport height constraints.

**Solution:** Modified `src/components/Home/Hero.jsx`:
- Changed fixed heights (`h-[50vh]`, `md:h-[60vh]`) to minimum heights (`min-h-fit`, `md:min-h-[60vh]`)
- Added `h-auto` to allow the container to expand based on content
- Added gap spacing (`gap-6 md:gap-8`) between flex children for consistent spacing
- Changed LogoLoop section margin from fixed `mt-6 md:mt-0 lg:mt-0` to `mt-auto` to push it to the bottom while respecting content flow

**Result:** Components now maintain their own space and never overlap regardless of screen size. The SiloHoverBanner, LogoLoop, and VideoAndWelcome sections flow naturally without overlapping.

### Fixed: Services Cards Bottom Padding Inconsistency

**Issue:** The service cards on the Services page sometimes didn't have appropriate bottom padding, causing content to appear cramped at the bottom edge.

**Solution:** Modified `src/components/servicee/Cards.jsx`:
- Changed fixed heights (`h-[200px]`, `h-[250px]`, `h-[340px]`) to minimum heights (`min-h-[200px]`, `min-h-[250px]`, `min-h-[340px]`) allowing cards to expand if needed
- Desktop cards: Changed from `justify-center` to `justify-start` with explicit `pb-12` for consistent bottom padding
- Mobile cards: Changed from `justify-between` to `justify-start` with `gap-4` and `pb-10` for consistent spacing and bottom padding

**Result:** Cards now maintain proper bottom padding regardless of content length and can expand to fit longer content if needed.

### Refined: Mobile Services Cards - Content-Driven Sizing

**Issue:** Mobile cards appeared too large with icons taking too much space. Cards were also forced to the same height via `min-h-[250px]`.

**Solution:** Modified `src/components/servicee/Cards.jsx` mobile card styling:
- Removed `min-h-[250px]` so cards size based on their content
- Reduced icon scale from `scale-[0.55]` to `scale-[0.4]` with fixed container height `h-6`
- Reduced padding from `py-8 pb-10` to `py-5`
- Reduced section gap from `gap-4` to `gap-3`
- Reduced inner text gap from `gap-2` to `gap-1`

**Result:** Mobile cards are now compact, content-driven, and the icon takes appropriate space.

### Fixed: Services Cards Tablet Breakpoint Gap

**Issue:** The cards section broke apart at tablet sizes (640px-767px) because desktop view was showing but card styles only had `md:` breakpoints and above, leaving no sizing defined for the `sm:` range.

**Solution:** Modified `src/components/servicee/Cards.jsx` desktop cards to include full breakpoint coverage:
- Added base and `sm:` breakpoints for card width: `w-[320px] sm:w-[360px] md:w-[420px] lg:w-[580px] 2xl:w-[720px]`
- Added base and `sm:` breakpoints for min-height: `min-h-[180px] sm:min-h-[190px] md:min-h-[200px]...`
- Added responsive padding: `px-6 sm:px-8 md:px-12` and `py-6 sm:py-8 md:py-10`
- Added responsive text sizing for title and description
- Fixed heading text size progression across all breakpoints

**Result:** Cards now display properly across all screen sizes from mobile through desktop without breaking the scroll-lock animation.

### Fixed: Case Study Card Images Breaking at Smaller View Heights

**Issue:** Case study card images on the home page would get cut off at smaller viewport heights because the image containers used fixed heights (`h-72`, `h-60`, `h-80`) that didn't adapt to viewport changes. Logos and important image content were being clipped.

**Solution:** Modified `src/components/Home/ContentAndDone.jsx`:
- Replaced all fixed height classes with `aspect-[4/3]` for responsive, proportional sizing
- Changed image `object-cover` to `object-contain` to ensure logos/images are fully visible without cropping
- Fixed 9 image containers across desktop (lg:flex), tablet (md:flex lg:hidden), and mobile (block md:hidden) breakpoints

**Affected containers:**
- Desktop: 3 containers (previously `h-72`)
- Tablet: 3 containers (previously `h-60`)  
- Mobile: 3 containers (previously `h-80` and `h-60`)

**Result:** Case study images now maintain their aspect ratio and scale proportionally with the page, preventing logos from being cut off at any viewport height.

### Fixed: Case Study Card Images on CaseStudies Page

**Issue:** Same issue as home page - case study card images on the `/case-studies` page were using fixed heights (`h-72`, `h-80`, `h-60`) that caused logos and images to be cut off at smaller viewport heights.

**Solution:** Modified `src/pages/CaseStudies.jsx`:
- Replaced all fixed height classes with `aspect-[4/3]` for responsive, proportional sizing
- Changed image `object-cover` to `object-contain` to ensure full images are visible without cropping
- Fixed 12 image containers across desktop (lg:flex) and mobile/tablet (lg:hidden) breakpoints

**Affected containers:**
- Desktop: 6 containers (Basement Approved, Tomoka, Electrolytes, Acorn, Cluberly, Knightsgate)
- Mobile/Tablet: 6 containers (same projects)

**Result:** Case study images on the Case Studies page now match the home page behavior - maintaining aspect ratio and scaling proportionally without cropping.

### Fixed: Case Study Card Images Floating Right / Breaking Out of Container

**Issue:** After implementing aspect-ratio containers, images were floating to the right and sometimes breaking outside their container boundaries.

**Solution:** Modified both `src/components/Home/ContentAndDone.jsx` and `src/pages/CaseStudies.jsx`:
- Added `flex items-center justify-center` to image containers to center images both horizontally and vertically
- Added `overflow-hidden` to containers to prevent images from breaking outside container boundaries
- Changed image classes from `w-full h-full` to `max-w-full max-h-full` to constrain images within the flex container
- Removed `translate-x-32` transforms from Acorn and Knightsgate containers that were pushing images outside their bounds

**Result:** Images are now properly centered within their containers and cannot break out of container boundaries.

### Fixed: WhoWeLoveWorkingWith Paragraph Using Hardcoded BR Tags

**Issue:** The paragraph in `WhoWeLoveWorkingWith.jsx` used `<br />` tags to force line breaks, which is not responsive and breaks on different screen sizes.

**Solution:** Modified `src/components/About/WhoWeLoveWorkingWith.jsx`:
- Removed hardcoded `<br />` tags
- Added `max-w-xl lg:max-w-2xl` to constrain paragraph width
- Text now wraps naturally based on container width
- Also fixed a typo in className: `text-leftlg:block` → `text-left lg:block`

**Result:** Paragraph now wraps naturally at appropriate widths across all screen sizes.

### Fixed: MindsInTheSilo Carousel Allowing Scroll Past First Card

**Issue:** The "Minds in the Silo" carousel on the About page had edge cases where users could scroll/drag left past the first card. This happened due to conflicting input handlers - both Framer Motion's built-in drag system AND custom touch/mouse handlers were active simultaneously, causing unpredictable behavior.

**Solution:** Modified `src/components/About/MindsInTheSilo.jsx`:
- Removed redundant custom touch handlers (`handleTouchStart`, `handleTouchMove`, `handleTouchEnd`)
- Removed redundant custom mouse handlers (`handleMouseDown`, `handleMouseMove`, `handleMouseUp`, `handleMouseLeave`)
- Framer Motion's `drag="x"` already handles both touch (mobile) and mouse (desktop) input
- Fixed drag constraints to use `maxSlide` calculation: `left: -(cardWidth + gap) * maxSlide` and `right: 0`
- Improved `onDragEnd` logic with proper clamping: `Math.max(0, Math.min(targetSlide, maxSlide))`
- Refactored navigation functions (`goToSlide`, `goToNextSlide`, `goToPrevSlide`) with `useCallback` and centralized clamping logic
- Added proper dependency arrays to keyboard navigation `useEffect`

**Result:** Carousel now properly prevents scrolling past the first or last card, both via buttons and drag/swipe gestures. The `dragElastic: 0.2` still provides a subtle rubber-band effect for visual feedback without allowing full card-width overscroll.

### Fixed: MindsInTheSilo Carousel Cards Inconsistent Heights

**Issue:** The special "Join Us" card (third card) appeared shorter than the team member cards, creating an unbalanced visual appearance.

**Solution:** Modified `src/components/About/MindsInTheSilo.jsx`:
- Added `items-stretch` to the flex container to ensure alignment
- Set consistent min-heights for both card types: `min-h-[38rem] md:min-h-[38rem] lg:min-h-[44rem]`
- Team member cards: Updated from `min-h-[28rem]` to the new responsive values
- Special card: Updated from `min-h-[28rem] md:min-h-[40rem]` to match team member cards exactly

**Result:** All cards now have consistent heights across all breakpoints.

### Fixed: ThingsWeBelieveIn Section Spacing Inconsistency

**Issue:** The "Things we believe in" section had inconsistent horizontal padding compared to adjacent sections (Hero, etc.) and excessive bottom margins on the cards.

**Solution:** Modified `src/components/About/ThingsWeBelieveIn.jsx`:
- Changed section padding from `px-3 sm:px-4 md:px-0` to `px-3 sm:px-2 md:px-6 lg:px-0` to match Hero.jsx
- Changed `pb-6` to `py-6` for balanced vertical padding
- Removed `mt-10` from the inner container
- Removed `px-2 sm:px-0` from all three card containers
- Removed `my-10 md:my-0`, `mb-10 md:mb-0`, and `mb-16 md:mb-0` margins from cards

**Result:** Section now has consistent horizontal padding with Hero and other sections, and cards flow naturally without excessive margins.

### Refined: ThingsWeBelieveIn Mobile/Tablet Layout

**Issue:** The section layout broke at tablet and mobile screen sizes due to overly complex breakpoint-specific styling and constrained card widths.

**Solution:** Simplified `src/components/About/ThingsWeBelieveIn.jsx`:
- Simplified section padding to `px-4 sm:px-6 md:px-8 lg:px-6` for consistent spacing
- Added `max-w-7xl` container for proper content width control
- Removed `<br />` tag from intro paragraph that caused awkward line breaks
- Simplified card image containers to use `aspect-[4/3] bg-brand` instead of multiple fixed heights
- Removed `max-w-sm mx-auto lg:max-w-[25vw]` constraints that were too restrictive
- Cards now use `w-full` and flow naturally within the grid
- Third card uses `md:max-w-md md:justify-self-center lg:max-w-none` for proper tablet centering
- Cleaned up redundant inline styles

**Result:** Cards now display properly at all screen sizes with consistent proportions and spacing.

### Fixed: CaseStudies Hero Section Layout and Spacing

**Issue:** Three issues with the Case Studies hero section:
1. Not enough spacing between the paragraph and buttons
2. Too much space below the button to the divider line on mobile
3. Image appeared below the text on mobile instead of above

**Solution:** Modified `src/pages/CaseStudies.jsx`:
- Changed text content order from `order-1` to `order-2 xl:order-1` so image appears first on mobile
- Changed visual content order from `order-2` to `order-1 xl:order-2` so image appears above text on mobile
- Increased text/button container gap from `gap-3 sm:gap-4` to `gap-5 sm:gap-6`
- Reduced section bottom margin on mobile from `mb-10` to `mb-4 md:mb-10`
- Reduced section bottom padding on mobile from `pb-6` to `pb-4 md:pb-12`
- Changed visual area margin from `mt-10 md:mt-0` to `mb-6 md:mb-0 md:mt-0`

**Result:** Image now appears above text on mobile, better spacing between paragraph and buttons, and reduced whitespace below buttons on mobile.

### Fixed: About Page Sections Horizontal Margins Inconsistency

**Issue:** The MindsInTheSilo and ThingsWeBelieveIn sections on the About page had different horizontal margins compared to other pages like the Services Hero.

**Solution:** Modified both `src/components/About/MindsInTheSilo.jsx` and `src/components/About/ThingsWeBelieveIn.jsx`:
- Changed section padding from various values to `px-4 md:px-10 lg:px-10` to match servicee/Hero.jsx
- Changed inner container from `max-w-full` / `max-w-7xl` to `max-w-[1280px]` to match servicee/Hero.jsx

**Result:** Both sections now have consistent horizontal margins matching the Services page and other pages.

### Fixed: Case Study Pages - Inconsistent Spacing, Padding, and Text Sizing

**Issue:** All case study pages had inconsistent horizontal padding, vertical spacing between sections, and text sizing that didn't follow a proper hierarchy:
- Some sections used `px-3 md:px-0`, others `px-6 md:px-0`
- Vertical padding varied from `py-5 md:py-20` to `py-10 md:py-20` to none at all
- H2 headings used `text-2xl md:text-4xl lg:text-5xl` inconsistently
- Body text varied between `text-base md:text-base` and `text-base md:text-lg`
- Mobile vertical spacing between sections was inconsistent

**Solution:** 

1. **TitleWithDescription component** (`src/components/poststudy/TitleWithDescription.jsx`):
   - Changed padding from `pt-16 md:pt-24 px-3 md:px-0` to `pt-12 md:pt-20 px-4 md:px-6 lg:px-0`

2. **GalleryWithText component** (`src/components/poststudy/GalleryWithText.jsx`):
   - Changed container padding from `py-10 md:py-24 px-3 md:px-0` to `py-12 md:py-20 px-4 md:px-6 lg:px-0`
   - Standardized h2 from `text-3xl md:text-4xl lg:text-5xl` to `text-2xl md:text-3xl lg:text-4xl`
   - Fixed h3 subheading from `text-2xl mt-10 md:text-xl` to `text-lg md:text-xl` with proper margin `mt-8 first:mt-0`
   - Standardized body text to `text-base md:text-lg`

3. **StatsSection component** (`src/components/poststudy/StatsSection.jsx`):
   - Changed padding from `pt-10 md:py-24 px-3 md:px-0` to `py-12 md:py-20 px-4 md:px-6 lg:px-0`
   - Increased title margin from `mb-5` to `mb-8`

4. **All 6 case study pages** - Fixed inline content sections:
   - Standardized padding to `px-4 md:px-6 lg:px-0 py-12 md:py-20`
   - Standardized gap to `gap-6 md:gap-16 lg:gap-20`
   - Standardized h2 to `text-2xl md:text-3xl lg:text-4xl`
   - Standardized body text to `text-base md:text-lg`
   - Standardized column widths to `w-full md:w-1/2` for both heading and content

**Files modified:**
- `src/components/poststudy/TitleWithDescription.jsx`
- `src/components/poststudy/GalleryWithText.jsx`
- `src/components/poststudy/StatsSection.jsx`
- `src/pages/case-studies/Cluberly.jsx`
- `src/pages/case-studies/AcornPropertyGroup.jsx`
- `src/pages/case-studies/BasementApproved.jsx`
- `src/pages/case-studies/ElectrolytesWithJoly.jsx`
- `src/pages/case-studies/KnightsgatePartners.jsx`
- `src/pages/case-studies/TomokaFineAndRare.jsx`

**Result:** All case study pages now have consistent horizontal padding that matches the About Hero section, uniform vertical spacing between sections (py-12 md:py-20), and a proper text sizing hierarchy throughout.

### Refined: Case Study Mobile Spacing Adjustments

**Issue:** After the initial standardization, two issues remained:
1. Content still too tight to edges on mobile (needed more breathing room)
2. List item margins too far apart on mobile

**Solution:**
- Increased mobile horizontal padding from `px-4` (16px) to `px-5` (20px) across all components
- Reduced GalleryWithText subheading margins from `mt-8` to `mt-5` and `mb-3` to `mb-2`
- Reduced list item spacing from `space-y-5` to `space-y-3` in case study pages
- Reduced list left margin from `ml-10` to `ml-6` for better mobile fit

**Files updated:**
- `src/components/poststudy/TitleWithDescription.jsx`
- `src/components/poststudy/GalleryWithText.jsx`
- `src/components/poststudy/StatsSection.jsx`
- All 6 case study pages

**Result:** Mobile layout now has appropriate breathing room from edges while keeping list items at a reasonable spacing.

### Refined: TitleWithDescription Horizontal Spacing on Larger Screens

**Issue:** On larger screens, the description text appeared too wide/shallow next to the title, not leaving enough horizontal gap between them.

**Solution:** Adjusted the default width proportions in `TitleWithDescription.jsx`:
- Title (left): `md:w-[55%]` → `md:w-[58%] lg:w-[60%] xl:w-[62%]`
- Description (right): `md:w-[50%]` → `md:w-[42%] lg:w-[38%] xl:w-[36%]`

**Result:** The title now takes more horizontal space on larger screens, pushing the description to be narrower and wrap more naturally. This creates better visual separation between the two text blocks.

---

### Fixed: Optional Add-ons Section Alignment with Services Grid

**Issue:** The "Optional add-ons" section on the Services page was horizontally misaligned with the service cards grid above it and felt disconnected vertically.

**Solution:** Modified `src/components/servicee/Interested.jsx`:
- Changed outer container padding from `md:py-16 md:pt-0` to `md:py-0 md:pb-16` for smoother vertical flow
- Changed mobile padding from `py-10` to `py-8` for tighter vertical spacing
- Changed inner container from `mx-3` to `md:pl-8` to align with the grid's left padding
- Changed CTA button container from `ml-5 md:ml-0` to `md:ml-8` to match the new alignment

**Result:** Optional add-ons section now sits flush with the services grid above, with consistent horizontal margins and improved vertical connection.

---

### Fixed: Services Cards Animation Smoothness

**Issue:** The service cards on the Services page were not flicking/animating as smoothly as expected during scroll interaction.

**Solution:** Modified `src/components/servicee/Cards.jsx`:
- Added `animate` function from Framer Motion for spring-based smooth transitions
- Created `animateToProgress` callback with optimized spring physics (`stiffness: 300, damping: 30, mass: 0.8`)
- Changed from direct `cardProgress.set()` to animated transitions for smoother card movement
- Added delta accumulation for smoother continuous scrolling
- Normalized scroll delta to cap maximum speed (`Math.min(Math.abs(delta), 150)`)
- Increased step multiplier from `0.002` to `0.004` for more responsive feel
- Changed state management from `useState` to `useRef` for lock state to prevent unnecessary re-renders
- Added animation cancellation on new scroll input to prevent animation conflicts
- Added performance tracking with `performance.now()` for delta timing

**Result:** Cards now animate smoothly with spring physics, responding reliably to scroll input without jitter or missed interactions.

