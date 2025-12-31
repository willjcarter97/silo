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

## Case Study Pages

Case study pages use shared components from `src/components/poststudy/` and follow consistent styling:

### Shared Components
- **TitleWithDescription** - Hero title and description with optional media (video/image/iframe)
- **GalleryWithText** - Image gallery with scrolling text on desktop
- **StatsSection** - Three-column statistics display
- **FullScreenImage** - Full-width image section
- **SimpleHeadingText** - Simple heading with text content
- **FourGallery** - Four-image grid layout

### Spacing & Typography Standards
All case study sections follow these standards:
- **Horizontal padding**: `px-4 md:px-6 lg:px-0` (matches About Hero)
- **Vertical section spacing**: `py-12 md:py-20`
- **H2 headings**: `text-2xl md:text-3xl lg:text-4xl`
- **H3 subheadings**: `text-lg md:text-xl`
- **Body text**: `text-base md:text-lg`
- **Max width**: `max-w-[1280px] mx-auto`

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
