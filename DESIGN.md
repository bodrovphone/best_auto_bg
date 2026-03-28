# Design & Implementation Guide

This document describes the current landing page implementation — cloned from best-auto.bg and adapted into this Next.js project. Use it as context when continuing design work.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4 with inline `@theme` tokens in `globals.css`
- **Font:** Inter (Google Fonts, subsets: latin + cyrillic), loaded via `next/font/google` in root `layout.tsx`, exposed as `--font-inter` CSS variable
- **i18n:** `next-intl` with `[lang]` dynamic route segment, middleware auto-detects browser locale and redirects to `/bg` or `/en`. Translations live in `src/lib/intl/{bg,en}/common.ts` — **not yet wired into the cloned components** (all text is hardcoded Bulgarian from the original site)
- **Icons:** Custom SVG React components in `src/components/icons.tsx` (28 icons). No external icon library.

## Color Palette

All colors are defined in `globals.css` under `@theme inline`:

| Token | Value | Usage |
|-------|-------|-------|
| `customYellow` | `#E1E100` | Primary brand accent — buttons, headings, highlights, borders |
| `customYellow-dark` | `#C8C800` | Hover state for yellow elements |
| `dark-primary` | `#0F1515` | Main page background (alternating sections) |
| `dark-secondary` | `rgb(17, 24, 39)` | Secondary page background (Tailwind's `gray-900`) |
| `emerald-accent` | `rgb(52, 211, 153)` | Green accent for "Premium" card theme |

Additional colors used directly in components (not tokenized):
- **Orange/amber gradient:** `from-amber-500 to-orange-500` — "Affordable" card theme
- **Green gradient:** `from-emerald-500 to-green-500` — Viber button, Premium CTA
- **Blue gradient:** `from-blue-600 to-sky-400` — countdown timer pills
- **Text gray:** `gray-400` for descriptions, `gray-300` for secondary text
- **Border:** `gray-700/50` for card borders, `white/10` for subtle dividers

## Page Structure

The page is rendered at `src/app/[lang]/page.tsx`. The Navbar and Footer wrap all pages via `src/app/[lang]/layout.tsx`.

### Section Order (top to bottom)

| # | Component | File | Background | Height (approx) |
|---|-----------|------|------------|-----------------|
| 1 | **Navbar** | `Navbar.tsx` | Fixed overlay, transparent → black on scroll | 112px |
| 2 | **HeroSection** | `HeroSection.tsx` | `background3.jpg` with dark gradient overlay | 736px |
| 3 | **TickerBars** | `TickerBars.tsx` | Yellow bar + Black bar | 80px |
| 4 | **OffersSection** | `OffersSection.tsx` | `#0F1515` | ~1080px |
| 5 | **InventorySection** | `InventorySection.tsx` | `gray-900` | ~620px |
| 6 | **MobileAppSection** | `MobileAppSection.tsx` | `#0F1515` | ~728px |
| 7 | **WhyChooseUs** | `WhyChooseUs.tsx` | `gray-900` | ~790px |
| 8 | **HowItWorks** | `HowItWorks.tsx` | `#0F1515` | ~1920px |
| 9 | **ImageGallery** | `ImageGallery.tsx` | `gray-900` | ~494px |
| 10 | **StatsSection** | `StatsSection.tsx` | `#0F1515` | ~425px |
| 11 | **Footer** | `Footer.tsx` | inherited dark | ~419px |

Sections alternate between `#0F1515` and `gray-900` backgrounds. A `.separator` div (1px, yellow gradient glow) sits between each section.

## Component Details

### Navbar (`Navbar.tsx`, client component)
- Fixed position, z-50
- **Top bar** (desktop only): working hours, phone number, Facebook, language selector with flag
- **Main bar**: logo, 8 nav links (Начало active with yellow underline), Viber CTA button
- **Scroll behavior**: after 50px scroll, background transitions from transparent to `black/90 backdrop-blur-md` over 300ms
- **Mobile**: hamburger menu with full-screen overlay, body scroll lock

### HeroSection (`HeroSection.tsx`, server component)
- Background image (`/images/background/background3.jpg`) with `next/image` fill + priority
- Dark gradient overlay: `from-black/70 via-black/50 to-transparent`
- **Left column**: H1 with gradient text ("САЩ И КАНАДА" = yellow-to-amber gradient via `bg-clip-text`), subtitle, two CTA buttons (yellow filled + white outlined)
- **Right column**: "Make Your Choice" panel with two cards:
  - **Premium** (green theme): emerald gradients, car icon
  - **Affordable** (orange theme): amber gradients, wrench icon
  - Cards have hover glow effect via absolutely-positioned gradient overlay
- Responsive: stacks to single column below `lg`, font sizes scale down

### TickerBars (`TickerBars.tsx`, server component)
- Two horizontal marquee bars using CSS `animate-marquee` (defined in globals.css, 30s infinite)
- Yellow bar (`#E1E100` bg, black text) + Black bar (black bg, white text)
- Content duplicated for seamless loop

### OffersSection (`OffersSection.tsx`, client component)
- "Our Top Picks" — two categories: Electric Cars + Motorcycles
- Each category: yellow title with underline, "View all" link, 4-column card grid
- **Car cards**: image area (gray placeholder for Teslas, real images for motorcycles), NEW/HOT badges, name, mileage, location, countdown timer pill
- Mock data hardcoded in component

### InventorySection (`InventorySection.tsx`, client component)
- "Available Cars in Bulgaria" — horizontal scroll of 6 VIP car cards
- Cards: white/light bg, gradient placeholder images, gold VIP badge with crown, yellow price badge, carousel dots, details (name, km, fuel, location)
- "Виж целия инвентар" outlined pill button
- Mock data hardcoded

### MobileAppSection (`MobileAppSection.tsx`, server component)
- Two-column layout: left = text content + feature list + app store buttons + rating; right = CSS-only phone mockup
- Phone mockup: `rounded-[40px]` frame, rotated `-5deg`, with mock app screen inside
- Features use Bell/Heart/Search icons with yellow-tinted backgrounds

### WhyChooseUs (`WhyChooseUs.tsx`, server component)
- 3 feature cards in responsive grid (1/2/3 columns)
- Each card: icon in yellow-tinted square, title, description
- Cards: `border-gray-700/50 rounded-xl p-8`

### HowItWorks (`HowItWorks.tsx`, server component)
- 4 steps with alternating layout (text left/image right, then swapped)
- Each step: numbered badge with icon, two-tone title (white + yellow italic), description, 3 green checkmark bullets, yellow CTA button
- Images from `/images/steps/` and `/images/delivery/`
- Step data in typed `Step[]` array

### ImageGallery (`ImageGallery.tsx`, server component)
- Horizontal scroll gallery of 10 delivery photos (`/images/delivery/3.jpg` through `12.jpg`)
- `hide-scrollbar` class for clean scroll
- CTA button below

### StatsSection (`StatsSection.tsx`, server component)
- 4 stat cards: emoji + number + label
- Cards: `border-customYellow/30 rounded-xl`, responsive 2x2 → 4 columns
- Values: 10+ years, 900+ vehicles, 3000+ clients, 5+ awards

### Footer (`Footer.tsx`, server component)
- 4 columns: brand (with social icons), quick links, services, contact info
- Social icons: Facebook (blue), Instagram (pink), Viber (green) — colored circles
- Bottom bar: copyright + legal links

## Image Assets

All in `public/images/`:

| Path | Description |
|------|-------------|
| `logo.webp` | Best Auto logo |
| `background/background3.jpg` | Hero background (dark car photo) |
| `icons/bulgaria-flag.svg` | BG flag for language selector |
| `icons/localization-icon.svg` | Globe icon |
| `steps/home_Choose.png` | Step 1 image (app screenshot) |
| `steps/home_Limit.jpg` | Step 2 image (man at desk) |
| `steps/home_Import.jpg` | Step 3 image (customs worker) |
| `delivery/2.jpg` | Step 4 image (cars on transport) |
| `delivery/3.jpg` - `12.jpg` | Gallery photos (happy customers with cars) |
| `cars/yamaha.jpg` | Motorcycle listing image |
| `cars/triumph.jpg` | Motorcycle listing image |
| `cars/polaris.jpg` | Motorcycle listing image |
| `cars/bmw_moto.jpg` | Motorcycle listing image |

Pre-existing assets in `public/assets/` (preserved from original project):
- `images/copart_logo.jpg`, `iaai_logo.jpg`, `manheim_logo.jpg`, `map.jpg`, `shipping.jpg`, `shipping2.jpg`
- `video/auction_moto.mp4`

## CSS Architecture

`globals.css` contains:
- Tailwind v4 import + inline theme tokens
- `animate-marquee` keyframe (30s linear infinite translateX)
- `.separator` — gradient yellow glow line between sections
- `.bg-primary-gradient` — blue gradient utility
- `.hide-scrollbar` — cross-browser scrollbar hiding
- `animate-fade-up`, `animate-fade-in` — entrance animations (available but not widely used yet)

## i18n Setup (existing, not yet integrated)

The project has full `next-intl` setup with bg/en translations. The cloned components currently have all text hardcoded in Bulgarian. To internationalize:

1. Translations are in `src/lib/intl/{bg,en}/common.ts` as flat key-value records
2. Import `useTranslations` from `next-intl` in client components, or `getTranslations` in server components
3. Replace hardcoded strings with `t('key.name')` calls
4. The middleware (`middleware.ts`) auto-detects browser language and sets a `preferred-language` cookie (1 year TTL)
5. Routes: `localePrefix: 'always'` means URLs are always `/bg/...` or `/en/...`

## Known Gaps & Improvement Areas

- **Tesla images**: Electric car cards use gray placeholder divs (original images were behind CDN with query params)
- **Inventory car images**: VIP car cards use gradient placeholder divs instead of real photos
- **Text is hardcoded Bulgarian**: i18n translations exist but aren't wired into the cloned components
- **No real interactivity**: buttons/links are `href="#"`, countdown timers show static values
- **No animations on scroll**: entrance animations are defined in CSS but not triggered by IntersectionObserver
- **Mobile app section**: phone mockup is CSS-only (no actual app screenshot)
- **No dark mode toggle**: the site is always dark themed
