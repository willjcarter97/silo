# Updates Log

## 2025-12-31

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

