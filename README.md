# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Lazy Loading Components

The site uses a comprehensive lazy loading system for optimal performance. Components are located in `src/components/Common/`.

### LazyImage
Enhanced image component with:
- Intersection Observer-based lazy loading
- Smooth fade-in animation
- Skeleton loading state with shimmer effect
- Error state handling
- Configurable threshold and root margin

```jsx
import LazyImage from '../components/Common/LazyImage';

<LazyImage
  src="https://example.com/image.jpg"
  alt="Description"
  className="w-full h-full object-cover"
  containerClassName="w-full aspect-[4/3]"
  animationDuration={600}
/>
```

### LazyText
Animated text component for scroll-triggered reveals:
- Multiple animation types: fadeUp, fadeDown, fadeLeft, fadeRight, fade, scale, blur
- Configurable delay and duration
- Support for any HTML element via `as` prop

```jsx
import LazyText from '../components/Common/LazyText';

<LazyText as="h2" animation="fadeUp" delay={100}>
  Your heading here
</LazyText>
```

### LazyElement
Universal wrapper for lazy loading any content:
- Multiple animation presets
- Optional placeholder while loading
- Can delay rendering or animate hidden content

```jsx
import LazyElement from '../components/Common/LazyElement';

<LazyElement animation="fadeUp" delay={200}>
  <YourComponent />
</LazyElement>
```

### LazySection
For deferring render of heavy sections:
- Content only rendered when section enters viewport
- Optional fade animation
- Reduces initial page load

```jsx
import LazySection from '../components/Common/LazySection';

<LazySection rootMargin="200px">
  <HeavyComponent />
</LazySection>
```

---

## Home Page Hero Section

The home page hero section consists of the following components (in order):
- **SiloHoverBanner** - Animated SVG logo with hover effects
- **LogoLoop** - Scrolling partner logos carousel
- **VideoAndWelcome** - Video showcase with animated welcome letters
- **ContentAndDone** - Services cards and case studies section
- **ReadyWhenYouArePrismic** - CTA section (fetched from Prismic)

### Prismic Integration
The Home page fetches all content from the `home_page` Prismic singleton:
- **SEO data** (page title, meta description)
- **Hero SVG image** and tagline
- **Client logos** (repeatable group)
- **Video settings** (show/hide, URL, hero image)
- **Welcome section** (heading, description, CTA buttons)
- **Services section** (heading, service cards)
- **Case studies section** (headings, View All button)

The page falls back to default values if Prismic data is unavailable.

### Responsive Layout
The hero section uses flexible layout with minimum heights to ensure components never overlap on any screen size. Each component maintains its own space regardless of viewport dimensions.

### SiloHoverBanner (Pixi.js Hover Effect)

The `SiloHoverBanner` component uses Pixi.js for an interactive liquid/ripple effect on hover.

**How it works:**
- Desktop: Renders a Pixi.js canvas with a custom shader for the liquid effect
- Mobile: Falls back to a static image (no Pixi.js)

**Key implementation details:**
- Uses `isReady` state to prevent Pixi from initializing before mobile detection completes
- Canvas and fallback images have `draggable="false"` and `user-select: none` to prevent drag behavior
- Custom shader files located in `src/shaders/`

**Props:**
- `svgSrc` - URL of the SVG image to display
- `intensity` - Effect intensity (default: 40)
- `className` - Additional CSS classes

## Services Page

The Services page (`/services`) uses the Relume Layout417 component with Framer Motion for an engaging scroll-driven animation.

### Features
- Scroll-driven card stack animation using Framer Motion
- Cards rotate and translate off-screen as user scrolls
- Large background heading ("CORE SERVICES") behind cards
- Sticky container keeps cards centered during scroll
- Uses `servicesData.jsx` for service content

### Page Structure
- Hero section with "What we do" heading and CTA buttons
- Layout417 scroll cards section
- Interested section with service details grid
- ReadyWhenYouAre CTA section

**Note:** The original GSAP-based services page is archived at `src/pages/Services.jsx.bak`.

### Interested Component

The `Interested.jsx` component (`src/components/servicee/Interested.jsx`) displays service offerings in a 2-column grid layout:

- **4 Service Cards**: Social Strategy & Management, Web Design & Development, Brand Design, Content Strategy
- **Optional Add-ons Card**: A simple list of additional services styled to match the service cards
- **CTA Card**: "Interested in a chat?" button aligned in the grid

All cards share consistent styling:
- Typography: `text-[28px] md:text-[32px]` headings, `text-base` descriptions, `text-sm` bullet lists
- Spacing: `md:p-8 p-0 py-6` padding
- Borders: `border-t` with `md:border-l` for grid lines

---

## Reusable CTA Sections

Two standardized CTA section components are available in `src/components/Common/`:

### ReadyWhenYouAre

A configurable CTA section for general use across the site (Home, About, Services, Job Board).

```jsx
import ReadyWhenYouAre from '../components/Common/ReadyWhenYouAre';

<ReadyWhenYouAre
  heading="Ready when you are."
  description="Whether you're ready to refine your brand..."
  imageSrc="https://..."
  imageAlt="Section image"
  primaryButtonText="For Brands"
  primaryButtonLink="/contact"
  secondaryButtonText="For Creators"
  secondaryButtonLink="/ugc-contact"
/>
```

**Props:**
- `heading` - Main heading text (default: "Ready when you are.")
- `description` - Description text
- `imageSrc` - Image URL
- `imageAlt` - Alt text for image
- `primaryButtonText` / `primaryButtonLink` - Primary CTA button
- `secondaryButtonText` / `secondaryButtonLink` - Secondary CTA button
- `className` - Additional CSS classes

### WantResultsLikeThis

A CTA section specifically for case study pages.

```jsx
import WantResultsLikeThis from '../components/Common/WantResultsLikeThis';

<WantResultsLikeThis
  heading="Want results like this?"
  description="Let's create something that makes your brand impossible to ignore."
  primaryButtonText="Let's talk"
  primaryButtonLink="/contact"
  secondaryButtonText="See more work"
  secondaryButtonLink="/case-studies"
/>
```

**Props:** Same as `ReadyWhenYouAre`, with different defaults appropriate for case studies.

### Prismic-Powered CTA Components

For pages that should pull CTA content from Prismic, use the Prismic wrapper components:

```jsx
// Ready When You Are - pulls from 'ready_when_you_are' singleton
import ReadyWhenYouArePrismic from '../components/Common/ReadyWhenYouArePrismic';

<ReadyWhenYouArePrismic />

// Want Results Like This - pulls from 'want_results_like_this' singleton
import WantResultsLikeThisPrismic from '../components/Common/WantResultsLikeThisPrismic';

<WantResultsLikeThisPrismic />
```

These components:
- Fetch content from Prismic singletons automatically
- Fall back to default values if Prismic data is unavailable
- Support Prismic Link field resolution (internal pages + external URLs)

---

## Case Study Pages

Case study pages use shared components from `src/components/poststudy/` and follow consistent styling:

### Shared Components
- **TitleWithDescription** - Hero title and description with optional media (video/image/iframe)
- **GalleryWithText** - Image gallery with scrolling text on desktop
- **StatsSection** - Three-column statistics display
- **FullScreenImage** - Full-width image section
- **SimpleHeadingText** - Simple heading with text content
- **FourGallery** - Four-image grid layout

### Rich Text Support

Components that display text content support Prismic Rich Text for proper formatting:

```jsx
// GalleryWithText - uses `richText` prop
<GalleryWithText
  heading="Section Title"
  richText={slice.primary?.text_content}  // Prismic rich text field
  images={[...]}
/>

// SimpleHeadingText - uses `richText` prop
<SimpleHeadingText
  heading="Section Title"
  richText={slice.primary?.text_content}  // Prismic rich text field
/>

// TitleWithDescription - uses `richDescription` prop
<TitleWithDescription
  title="Case Study Title"
  richDescription={slice.primary?.section_description}  // Prismic rich text field
  mediaType="video"
  mediaSrc="..."
/>
```

**Supported Formatting:**
- Paragraphs
- Headings (H2, H3)
- Bold and italic text
- Ordered and unordered lists
- Hyperlinks (styled with brand color)

### Spacing & Typography Standards
All case study sections follow these standards:
- **Horizontal padding**: `px-4 md:px-6 lg:px-0` (matches About Hero)
- **Vertical section spacing (mobile)**: Reduced by 30% - varies by component (see below)
- **Vertical section spacing (desktop)**: `md:py-20` or `md:py-24`
- **H2 headings**: `text-2xl md:text-3xl lg:text-4xl`
- **H3 subheadings**: `text-lg md:text-xl`
- **Body text**: `text-base md:text-lg`
- **Max width**: `max-w-[1280px] mx-auto`

### Mobile Section Padding (30% reduced)
| Component | Mobile | Desktop |
|-----------|--------|---------|
| TitleWithDescription | `pt-11` | `md:pt-24` |
| StatsSection | `py-8` | `md:py-20` |
| GalleryWithText | `py-8` | `md:py-20` |
| SimpleHeadingText | `py-11` | `md:py-24` |
| FourGallery | `py-5` | `md:py-12` |
| TwoColumnTextSlice | `py-8` | `md:py-20` |

---

## Global Section Spacing System

A consistent spacing system is used for major section dividers across the site.

### Spacing Rules

| Element | Mobile | Desktop | Tailwind Classes |
|---------|--------|---------|------------------|
| Section dividers | 64px | 96px | `my-16 md:my-24` |
| Subsection spacing | 48px | 64px | `pt-12 md:pt-16` |
| Content gaps | 24px | 32px | `gap-6 md:gap-8` |

### Full-Width Divider Lines

For divider lines that span the full viewport width within constrained containers:

```jsx
<div className="w-[100vw] h-[1px] bg-black my-16 md:my-24 relative left-1/2 -translate-x-1/2" />
```

**Important:** Always use `relative left-1/2 -translate-x-1/2` instead of `absolute` positioning. This keeps the element in normal document flow and avoids complex offset calculations.

### Custom Spacing Tokens

Custom spacing tokens are defined in `tailwind.config.js`:
- `section`: 4rem (64px) - mobile section divider spacing
- `section-lg`: 6rem (96px) - desktop section divider spacing

Usage: `my-section md:my-section-lg`

### Best Practices

1. **Don't use** `relative top-X` or `absolute` positioning for spacing - use margin/padding
2. **Let dividers control rhythm** - section containers should have no vertical padding
3. **Keep spacing consistent** - use the defined tokens, don't create arbitrary values

## Header Navigation

The header component (`src/components/Common/Header.jsx`) features:

### Scroll-Hide Behavior
- **Hides on scroll down**: Navbar slides up out of view when scrolling down the page
- **Shows on scroll up**: Navbar slides back into view when scrolling up
- **Always visible at top**: Navbar stays visible when near the top of the page (< 100px)
- **Smooth transition**: 300ms ease-out animation for professional feel

### Responsive Design
- Desktop: Horizontal navigation with links and CTA button
- Mobile/Tablet: Hamburger menu with curtain dropdown animation

---

## Performance Optimizations

The site implements several performance optimizations for Core Web Vitals:

### Image Optimization
- **Hero image**: Uses `<picture>` element with AVIF and WebP sources
- **Responsive breakpoints**: 320w, 480w, 768w, 1024w, 1280w with quality scaling
- **LazyImage component**: Intersection Observer-based loading with fade-in animations

### Cumulative Layout Shift (CLS) Prevention
- **Footer**: Pre-populated with default case studies data to prevent shifts during Prismic load
- **CSS containment**: `content-visibility: auto` with `contain-intrinsic-size` for footer
- **Font fallbacks**: `@font-face` declarations with `size-adjust` for DM Sans and Epilogue

### Third-Party Script Optimization
- **HubSpot**: Deferred loading 2 seconds after `window.onload` to prioritize core content
- **Google Fonts**: Non-blocking load using `media="print" onload` pattern
- **Font preloading**: Critical font files preloaded in `<head>`

### Preconnect Hints
Early connections established for:
- `fonts.googleapis.com` / `fonts.gstatic.com`
- `images.prismic.io` / `silosite.cdn.prismic.io`
- HubSpot tracking domains (`track-ap1.hubspot.com`, etc.)

---

## Footer

The footer component (`src/components/Common/Footer.jsx`) is shared across all pages and includes:

### Newsletter Subscription Form
- Both desktop and mobile versions of the newsletter form
- Submits to HubSpot via the embedded tracking script
- Redirects to `/thank-you` page after successful submission
- Stores current page path in sessionStorage for return navigation

### Social Media Links
- **Instagram**: [@thesilocreative](https://www.instagram.com/thesilocreative/)
- **TikTok**: [@the.silo.creative](https://www.tiktok.com/@the.silo.creative)
- **LinkedIn**: [The Silo Creative](https://www.linkedin.com/company/the-silo-creative/)

All social links open in new tabs with secure `rel="noopener noreferrer"` attributes.

## Hosting & Deployment

The site uses a dual-environment setup for staging and production.

### Environment Configuration

| Environment | Platform | Branch | URL | Prismic Content |
|-------------|----------|--------|-----|-----------------|
| **Production** | Netlify | `main` | Your domain | Published only |
| **Staging** | Vercel | `main` | Vercel preview URL | Draft + Published |

### How It Works

1. **Push to `main` branch** → Deploys to both Netlify (production) and Vercel (staging)
2. **Edit content in Prismic** → Create/edit as drafts
3. **Preview on staging** → See draft content on Vercel deployment
4. **Publish in Prismic** → Content goes live on production (Netlify)

### Environment Variables

| Variable | Production (Netlify) | Staging (Vercel) |
|----------|---------------------|------------------|
| `VITE_ENV` | `production` | `staging` |

### Configuration Files

- `netlify.toml` - Netlify build settings, SPA routing, security headers
- `vercel.json` - Vercel SPA rewrites and staging environment

---

## Prismic CMS Integration

This project is connected to Prismic for headless content management.

### Configuration
- **Repository**: `silosite` (https://silosite.prismic.io/)
- **Client file**: `src/prismicio.js`

### Packages
- `@prismicio/client` - API client for fetching content
- `@prismicio/react` - React components and hooks

### Content Types

#### Blog Posts (`blog_post`)
- Managed in Prismic with slices for flexible content
- Fetched on `/blog` (listing) and `/blog/:uid` (detail)

#### Case Studies (`case_study`)
- Managed in Prismic with full slice support
- Fetched on `/case-studies` (listing) and `/case-studies/:uid` (detail)
- **Reorderable**: Set `display_order` field (lower = appears first)
- **Homepage feature**: Toggle `show_on_homepage` to display on homepage

#### Navigation (`navigation`)
- **Singleton type** (only one instance)
- Managed in Prismic for global site navigation

**Navigation Fields:**
- `logo` - Site logo image
- `nav_links` - Repeatable group of navigation links:
  - `label` - Link text displayed in nav
  - `link` - Destination (internal page or external URL)
  - `is_visible` - Show/hide individual nav items
- `cta_text` - CTA button text (e.g. "Let's Talk")
- `cta_link` - CTA button destination
- `cta_visible` - Show/hide CTA button

#### Home Page (`home_page`)
- **Singleton type** (only one instance)
- Manages all editable content on the home page

**Home Page Sections:**
- **SEO**: Page title, meta description, OG image
- **Hero Section**: SVG banner image, tagline, client logos (repeatable)
- **Video & Welcome Section**: Video toggle, Vimeo URL, hero image, welcome heading/description, CTA buttons
- **Services Section**: Section heading, service cards (repeatable with image, title, description, link)
- **Case Studies Section**: Heading, subheading, view all button

#### Ready When You Are CTA (`ready_when_you_are`)
- **Singleton type** (only one instance)
- Reusable CTA block used on home page and other pages

**Fields:**
- `heading` - CTA heading text
- `description` - CTA description
- `image` - Section image
- `primary_button_text` / `primary_button_link` - Primary CTA button
- `secondary_button_text` / `secondary_button_link` - Secondary CTA button

#### Want Results Like This CTA (`want_results_like_this`)
- **Singleton type** (only one instance)
- CTA block used on case study pages

**Fields:** Same structure as Ready When You Are CTA, with different default values

#### Footer (`footer`)
- **Singleton type** (only one instance)
- Manages footer links, social media, and newsletter CTA

**Fields:**
- `logo` - Footer logo image
- `tagline` - Footer tagline text
- `services_links` - Repeatable group for Services column links
- `company_links` - Repeatable group for Company column links
- `social_links` - Repeatable group for social media icons/links
- `newsletter_heading` - Newsletter section heading
- `newsletter_description` - Newsletter section description
- `newsletter_button_text` - Newsletter submit button text
- `copyright_text` - Copyright text
- `legal_links` - Repeatable group for legal page links

#### About Page (`about_page`)
- **Singleton type** (only one instance)
- Manages all content on the About page

**Fields:**
- Hero section: `hero_heading`, `hero_description`, `hero_image`
- What Silo Is: `what_silo_is_heading`, `what_silo_is_description`, `what_silo_is_image`
- Things We Believe In: `beliefs` repeatable group with `belief_title`, `belief_description`
- Who We Love Working With: `who_we_love_heading`, `industry_rows` repeatable group

#### Portfolio Page (`portfolio_page`)
- **Singleton type** (only one instance)
- Manages hero section on the Case Studies page

**Fields:**
- `hero_heading` - Page heading (default: "Our Work")
- `hero_description` - Page description

#### Services Page (`services_page`)
- **Singleton type** (only one instance)
- Manages all content on the Services page

**Fields:**
- Hero: `hero_heading`, `hero_description`, `primary_button_text`, `primary_button_link`, `secondary_button_text`, `secondary_button_link`
- Service Cards: `service_cards` repeatable group with `icon`, `title`, `description`

#### Job Board Page (`job_board_page`)
- **Singleton type** (only one instance)
- Manages hero section on the Job Board page

**Fields:**
- `hero_heading`, `hero_description_1`, `hero_description_2`
- `primary_button_text`, `primary_button_link`
- `secondary_button_text`, `secondary_button_link`

#### Careers Page (`careers_page`)
- **Singleton type** (only one instance)
- Manages hero section and empty state on the Careers page

**Fields:**
- `hero_heading`, `hero_description`
- `empty_state_heading`, `empty_state_description`, `empty_state_email`

#### Ramblings Page (`ramblings_page`)
- **Singleton type** (only one instance)
- Manages hero, newsletter, and empty state on the Blog page

**Fields:**
- `hero_heading`, `hero_description`
- `newsletter_heading`, `newsletter_description`
- `empty_state_heading`, `empty_state_description`

#### Contact Page (`contact_page`)
- **Singleton type** (only one instance)
- Manages Brand Contact form page content

**Fields:**
- Hero: `hero_heading`, `hero_description`, `hero_image`
- Secondary CTA: `secondary_cta_heading`, `secondary_cta_description`, `secondary_cta_button_text`, `secondary_cta_button_link`, `secondary_cta_image`

#### UGC Contact Page (`ugc_contact_page`)
- **Singleton type** (only one instance)
- Manages UGC Creator Contact form page content

**Fields:** Same structure as Contact Page

#### Terms Page (`terms_page`)
- **Singleton type** (only one instance)
- Manages Terms & Conditions page content

**Fields:**
- `heading` - Page heading
- `effective_date` - Date terms became effective
- `body` - Rich text content

#### Privacy Page (`privacy_page`)
- **Singleton type** (only one instance)
- Manages Privacy Policy page content

**Fields:** Same structure as Terms Page

#### Legal Page (`legal_page`)
- **Singleton type** (only one instance)
- Manages Legal Information page content

**Fields:**
- `heading` - Page heading
- `effective_date` - Last updated date
- `body` - Rich text content

#### Job Board Newsletter CTA (`job_board_newsletter`)
- **Singleton type** (only one instance)
- Newsletter subscription CTA for job board detail pages

**Fields:**
- `heading` - CTA heading text
- `description` - CTA description
- `email_placeholder` - Placeholder text for email input
- `button_text` - Submit button text
- `terms_text` - Terms agreement prefix text
- `terms_link_text` - Terms link text
- `terms_link` - Link to terms page
- `success_message` - Toast message on successful submission

### Usage
```javascript
import { client } from './prismicio';

// Fetch all documents of a type
const posts = await client.getAllByType('blog_post');

// Fetch case studies ordered by display_order
const caseStudies = await client.getAllByType('case_study', {
  orderings: { field: 'my.case_study.display_order', direction: 'asc' }
});

// Fetch a single document by UID
const page = await client.getByUID('case_study', 'basement-approved');

// Fetch the navigation singleton
const navigation = await client.getSingle('navigation');
```

## Minds in the Silo (Team Members)

The "Minds in the Silo" section on the About page displays team members in a carousel with a special "Join Us" card.

### Features
- **Square Images**: Team member photos use `aspect-square` for consistent sizing
- **Dynamic Card Heights**: All cards (team + special) match height based on card width
- **Responsive Carousel**: Shows 1 card on mobile, 2 on tablet, 3 on desktop
- **Conditional "Join Us" Content**: Changes based on team size:
  - **2 or fewer team members**: "It's not the size that matters." + "View Openings"
  - **3+ team members**: "Think you're the right fit?" + "Current Vacancies" + secondary CTA

### Prismic Integration
Team members are managed via Prismic.

---

## Job Board (UGC Creator Briefs)

The Job Board (`/job-board`) displays brand briefs for UGC creators.

### Features
- **Auto-hide when empty**: Shows "Quiet in here" empty state when no jobs exist
- **Auto-show when populated**: Automatically displays job grid when jobs are added in Prismic
- **Responsive grid**: 1 column mobile, 2 columns tablet, 3 columns desktop
- **Dynamic detail pages**: Each job has its own detail page at `/jobs/:uid`

### Prismic Integration
Job listings are managed via Prismic.

**Job Listing Fields:**
- `uid` - URL slug
- `title` - Brand/job title
- `category` - Category (Food & Drink, Energy, B2B, etc.)
- `card_image` - Image for listing cards
- `primary_image` - Hero image on detail page
- `secondary_image` - Secondary image on detail page
- `client_description` - Rich text description of the client
- `contact_name`, `contact_title`, `contact_email`, `contact_avatar` - Contact info
- `looking_for` - List of what they want
- `not_looking_for` - List of what they don't want
- `publish_date` - Date for chronological ordering (newest first)
- `is_active` - Show/hide toggle

---

## Careers (Internal Job Openings)

The Careers page (`/careers`) displays internal Silo job openings.

### Features
- **Auto-hide when empty**: Shows "No roles live right now" empty state when no jobs exist
- **Auto-show when populated**: Automatically displays job cards when careers are added in Prismic
- **Dynamic detail pages**: Each job has its own detail page at `/job/:uid`
- **Chronological order**: Jobs sorted by publish date (newest first)

### Prismic Integration
Career openings are managed via Prismic.

**Career Opening Fields:**
- `uid` - URL slug
- `title` - Job title
- `department` - Department (Marketing, Design, etc.)
- `location` - Location (Remote, London, Hybrid)
- `contract_type` - Contract type (Permanent, Full-time, Contract)
- `short_description` - Short description for listing page
- `publish_date` - Date for chronological ordering (newest first)
- `is_active` - Show/hide toggle
- `hero_image_1`, `hero_image_2` - Hero images for detail page
- `intro_heading`, `intro_description` - Intro section content
- `what_youll_do` - List of responsibilities
- `benefits` - List of benefits
- `who_you_are` - List of requirements
- `who_youll_be` - List of role outcomes

---

## Thank You Page

The Thank You page (`/thank-you`) is displayed after successful contact form submissions.

### Features
- **Animated entrance**: Staggered letter animations for "THANK YOU" heading
- **SVG checkmark animation**: Circle and checkmark draw in with smooth CSS transitions
- **Floating geometric shapes**: Decorative background elements that animate in
- **Countdown timer**: Visual countdown with progress bar (8 seconds)
- **Auto-redirect**: Automatically navigates to homepage after countdown
- **Skip option**: "Go to homepage now" link for immediate redirect

### Form Integration
The following forms redirect to the Thank You page after submission:
- `/contact` (Brand Contact Form) - Contact2.jsx
- `/ugc-contact` (UGC Creator Contact Form) - Contact.jsx
- Footer Newsletter Subscription (desktop & mobile) - Footer.jsx

