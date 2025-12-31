# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
