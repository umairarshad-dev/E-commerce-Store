# E-commerce Store

A modern, minimal e-commerce storefront built with Next.js, TypeScript and Tailwind CSS  Vercel-ready and optimized for performance and SEO.

Demo: (add your demo URL here)

## Features

- Minimal, responsive product listing and product detail pages
- Shopping cart with context-based state (`CartContext`) and cart page
- Dynamic product routes (`/product/[id]`) with server-rendered product pages
- SEO-friendly pages and metadata (Open Graph / Twitter cards recommended)
- Headless-friendly architecture (components under `src/components`) for easy replacement
- Built with the Next.js App Router and React 19 + TypeScript
- Styling with Tailwind CSS v4 and PostCSS
- Ready for Vercel deployment (zero-config)

## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- UI: React 19
- Styling: Tailwind CSS v4
- State: React Context (`src/context/CartContext.tsx`)
- Icons: `@heroicons/react`
- Notifications: `react-hot-toast`
- Deployment: Vercel

## Project Structure

Top-level layout (important application files):

/
 `app/`  Next.js App Router pages and layouts
    `globals.css`  global styles
    `layout.tsx`  root layout
    `page.tsx`  homepage
    `cart/`  cart page
    `product/[id]/`  dynamic product pages
    `components/`  page-specific components (NewArrivals, Reviews, etc.)
 `src/components/`  reusable components (`ProductReviews.tsx`, `RelatedProducts.tsx`)
 `src/context/`  React contexts (`CartContext.tsx`)
 `public/`  public assets (images, favicon)
 `next.config.ts`  Next.js configuration
 `postcss.config.mjs`  PostCSS config
 `tailwind.config.*`  Tailwind configuration
 `package.json`  scripts & dependencies

Note: adapt folder names if you move files  the App Router expects `app/` in Next.js projects.

## Getting Started

Prerequisites

- Node.js >= 18
- npm (or yarn / pnpm)

Install dependencies

```powershell
npm install
```

Run development server

```powershell
npm run dev
```

Build for production

```powershell
npm run build
```

Start production server (after build)

```powershell
npm start
```

Lint

```powershell
npm run lint
```

The `package.json` in this repo includes these scripts (checked from the project):

- `dev` -> `next dev`
- `build` -> `next build`
- `start` -> `next start`
- `lint` -> `next lint`

## How to add features / content

- Add new page under `app/` (App Router). For dynamic product pages follow `app/product/[id]/page.tsx`.
- Add reusable UI in `src/components/`
- Manage cart state in `src/context/CartContext.tsx` (used across header/cart pages)
- Add public images in `public/` and reference them with `/images/...`

## SEO & Performance

- Use Next.js head/meta utilities in each page to set per-page titles and Open Graph tags.
- Prefer optimized `<Image />` usage (Next.js Image) for faster loads.
- Vercel automatically provides CDN and optimization for production deployments.

## Deployment

Vercel (recommended)

- Push to GitHub and import the repository in Vercel.
- Vercel will install dependencies and run `next build` automatically.

Manual

```powershell
npm run build
npm start
```

The production build output is managed by Next.js and served by `next start`.

## Contributing

- Feel free to open issues or PRs.
- Keep changes focused and add tests where appropriate.

## License

Open source  use as a starter for your own e-commerce projects.

## Suggested GitHub repo description and topics

- Description: "Next.js + TypeScript e-commerce storefront with Tailwind CSS  Vercel-ready."
- Topics: `nextjs`, `typescript`, `tailwind-css`, `ecommerce`, `react`, `vercel`, `seo`, `shopping-cart`, `product-listing`

---

If you'd like, I can:

- add a demo link and screenshots to this README
- create a `vercel.json` or GitHub Action for CI/CD
- add badges (build, license, repo size)

Tell me which of those you'd like next.
