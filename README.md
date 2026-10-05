# Hubbard College Modern Portal — rebuild

A faithful rebuild of the [Hubbard College Modern Portal](https://hubbard-modern-lead.base44.app/):
the marketing homepage, the course catalog, and the cart / order flow.

## Quick start

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command                 | What it does                                                       |
| ----------------------- | ------------------------------------------------------------------ |
| `npm run dev`           | Start the dev server on port 5173                                  |
| `npm run build`         | Type-check and build to `dist/` (also emits sitemap.xml/robots.txt) |
| `npm run preview`       | Serve the production build on port 4173                            |
| `npm run typecheck`     | TypeScript only                                                    |
| `npm run qa:functional` | Drive every interaction in Chromium (needs a running server)       |
| `npm run qa:screens`    | Full-page screenshots of every route at 10 breakpoints             |

The QA scripts take an optional base URL, e.g. `npm run qa:functional -- http://localhost:4173`.
They need Playwright's Chromium (`npx playwright install chromium`).

## Routes

| Path       | Page                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------ |
| `/`        | Homepage: hero, quote, services (with the Sales Workshop modal), curriculum, events, contact, footer |
| `/courses` | Course catalog: search, category filters, add to cart                                       |
| `/cart`    | Cart: quantities, remove, order summary, checkout form, confirmation screen                 |
| `*`        | 404 page. As on the original, this includes `/home`                                         |

## Stack

React 18 + TypeScript, Vite 6, Tailwind CSS 3 (with `tailwindcss-animate`), Framer Motion 11,
React Router 6, Radix Select, and Lucide icons: the same libraries and versions the original portal ships.
Components and classes are transcribed from the original's production bundle, so spacing,
colours, breakpoints and animation timings match it.

```
src/
  pages/            Home, Courses, Cart, NotFound (Courses/Cart/NotFound are code-split)
  components/
    home/           Navbar, Hero, About, Services, SalesWorkshopModal, CurriculumSection, Events, Contact, Footer
    courses/        CourseCard
    cart/           CartItemRow, OrderSummary
    layout/         PortalHeader (catalog + cart header)
    ui/             Input, Textarea, Select, SectionHeading, Reveal
  lib/              cart (context + localStorage), courses, orders, auth, site constants
  hooks/useSeo.ts   Per-route title, description, canonical, Open Graph, JSON-LD
  data/courses.json Snapshot of the original's 16 published courses
public/images/      Original images, hosted locally (photos converted to WebP)
assets/             Full-resolution source images the WebP files were made from
scripts/            QA scripts
```

## Environment variables

Nothing is required to run locally. Copy `.env.example` to `.env` to override:

| Variable              | Purpose                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`       | Public URL used for canonical/Open Graph URLs, `sitemap.xml` and `robots.txt`. Set it for production. |
| `VITE_COURSES_URL`    | Optional live course feed (same JSON shape as `src/data/courses.json`). Falls back to the snapshot. |
| `VITE_ORDER_ENDPOINT` | Optional URL that receives orders as a JSON `POST`. Without it, orders are saved in the browser. |

## Cart and orders

- The cart is stored in `localStorage` under `hca_cart` (the same key as the original) and stays in sync across tabs.
- Courses have no prices. They show "Contact for Pricing" and "TBD", as on the original.
- "Place Order" needs an email and phone number. It sends `{ items, status, notes, customer_email, customer_name }`
  to `VITE_ORDER_ENDPOINT` if that's set, and otherwise appends the order to `localStorage["hca_orders"]`.

## Deploying

Live site: https://olwethubb.github.io/hubbard-college-portal/

Every push to `main` builds and deploys the site automatically via `.github/workflows/deploy.yml`
(it can also be re-run by hand from the repo's Actions tab).

`dist/` is a static single-page app. The build also writes `404.html` (a copy of `index.html`), so deep links
like `/courses` work on GitHub Pages. To serve the site from a sub-path, set `BASE_PATH` (e.g. `/my-repo/`)
when building. On other hosts, serve `index.html` for unknown paths (for example, a Netlify `_redirects` rule
`/* /index.html 200`, or Vercel rewrites).

## Differences from the original

- The "Edit with Base44" badge belongs to the original's hosting platform and isn't part of the app, so it's left out.
- The original is "public without login", so visitors are always anonymous. Like the original, the catalog shows
  "Welcome," with no name and the confirmation says "Thank you, !". `src/lib/auth.ts` is the hook for real auth.
- On the original, the mobile menu's section links don't scroll the page in Chromium; here they scroll once the
  menu has closed.
- If an order request fails, the original stays on "Placing Order..." indefinitely; here an error message is shown.
- The contact form only shows "Message Sent ✓" for 3 seconds, exactly like the original. It doesn't send anything.
- Several footer items, "Book Now", and some "Learn More" buttons do nothing, and the LinkedIn link points to `#`.
  This matches the original.
- The accent blue `hsl(207 57% 53%)` and some translucent white text don't meet WCAG AA contrast for small text.
  They're kept as-is for visual fidelity; adjust the `--accent` token in `src/index.css` if needed.
