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
- **ContentAndDone** - Additional content section

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

## Footer

The footer component (`src/components/Common/Footer.jsx`) is shared across all pages and includes:

### Social Media Links
- **Instagram**: [@thesilocreative](https://www.instagram.com/thesilocreative/)
- **TikTok**: [@the.silo.creative](https://www.tiktok.com/@the.silo.creative)
- **LinkedIn**: [The Silo Creative](https://www.linkedin.com/company/the-silo-creative/)

All social links open in new tabs with secure `rel="noopener noreferrer"` attributes.

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
Team members can be managed via Prismic. See `scripts/prismic-team-member-type.json` for the custom type definition.

---

## Job Board (UGC Creator Briefs)

The Job Board (`/job-board`) displays brand briefs for UGC creators.

### Features
- **Auto-hide when empty**: Shows "Quiet in here" empty state when no jobs exist
- **Auto-show when populated**: Automatically displays job grid when jobs are added in Prismic
- **Responsive grid**: 1 column mobile, 2 columns tablet, 3 columns desktop
- **Dynamic detail pages**: Each job has its own detail page at `/jobs/:uid`

### Prismic Integration
Job listings are managed via Prismic. See `scripts/prismic-job-listing-type.json` for the custom type definition.

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
Career openings are managed via Prismic. See `scripts/prismic-career-type.json` for the custom type definition.

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
Both contact forms redirect to this page:
- `/contact` (Brand Contact Form) - Contact2.jsx
- `/ugc-contact` (UGC Creator Contact Form) - Contact.jsx

---

## Image Migration (Cloudinary → Prismic)

Scripts are available to migrate images from the old developer's Cloudinary account to Prismic's Media Library.

### Migration Scripts

- `scripts/migrate-images-to-prismic.mjs` - Downloads all Cloudinary images and prepares for Prismic upload
- `scripts/replace-image-urls.mjs` - Replaces old URLs with new Prismic URLs in source files
- `scripts/restore-from-backup.mjs` - Restores original files from .bak backups (reverses the migration)

### Usage

1. **Download all images:**
   ```bash
   node scripts/migrate-images-to-prismic.mjs
   ```
   This will:
   - Scan the codebase for all Cloudinary URLs
   - Download images to the `migrated-images/` folder
   - Generate a mapping file at `scripts/image-url-mapping.json`

2. **Upload to Prismic:**
   - Go to https://silosite.prismic.io/media
   - Drag and drop all images from `migrated-images/` folder
   - For each image, copy the new Prismic URL

3. **Update the mapping file:**
   - Edit `scripts/image-url-mapping.json`
   - Replace placeholder values with actual Prismic URLs

4. **Replace URLs in codebase:**
   ```bash
   # Preview changes (no modifications)
   node scripts/replace-image-urls.mjs --dry-run
   
   # Apply changes
   node scripts/replace-image-urls.mjs
   
   # Apply with backup files
   node scripts/replace-image-urls.mjs --backup
   ```

5. **Revert to Cloudinary (if needed):**
   ```bash
   node scripts/restore-from-backup.mjs
   ```
