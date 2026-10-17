# Sirak Embibel — Portfolio Codebase Review

> **AI Automation Specialist & Applied AI Engineer**  
> Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 3.4 · App Router

This document is a thorough technical review of the portfolio codebase — covering content accuracy, code quality, SEO, UX, performance, and deployment readiness. Each finding includes its priority level and a concrete recommendation.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Build Status](#3-build-status)
4. [Findings Summary](#4-findings-summary)
5. [Content & Data Issues](#5-content--data-issues)
6. [Code Quality Issues](#6-code-quality-issues)
7. [SEO & Metadata Issues](#7-seo--metadata-issues)
8. [UX & Accessibility Issues](#8-ux--accessibility-issues)
9. [Performance Issues](#9-performance-issues)
10. [Deployment & Environment Issues](#10-deployment--environment-issues)
11. [Prioritized Recommendations](#11-prioritized-recommendations)
12. [Quick Wins](#12-quick-wins)

---

## 1. Project Overview

This is a personal portfolio for **Sirak Embibel**, an AI Automation Specialist and Applied AI Engineer transitioning from 10+ years of public health program leadership in Ethiopia. The portfolio showcases four production projects and a full work history, and includes an **AI Digital Twin** chatbot powered by OpenRouter.

**Deployment target:** `https://sirakembibel.com`  
**Framework:** Next.js 16 (App Router, static export for most pages)  
**Content source of truth:** `config/` directory (TypeScript config files)

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.0.10 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| AI Chatbot | OpenRouter API (SSE streaming) |
| Image handling | `next/image` |
| Animations | Framer Motion (via `AnimatedSection`) |
| Icons | Lucide React (custom `Icons` wrapper) |
| Structured Data | JSON-LD (Person + WebSite schemas) |

---

## 3. Build Status

✅ **Clean build** — `npm run build` completes successfully, generating 23 static pages with no errors or warnings.

---

## 4. Findings Summary

| # | Area | Severity | Issue | Status |
|---|---|---|---|---|
| C1 | Content | 🔴 High | Project screenshots still use `/logo.png` placeholder for 3 of 4 projects | ⏳ Pending user assets |
| C2 | Content | 🔴 High | `featuredProjects` is a hardcoded `slice(0,3)` — 4th project never appears on home page | ✅ Resolved |
| C3 | Content | 🟡 Medium | `endDate` on all projects set to `2026-11-01` — not meaningful | ✅ Resolved |
| C4 | Content | 🟡 Medium | `experience.ts`: `description` and `achievements` arrays are near-identical duplicates in 3 of 4 roles | ✅ Resolved |
| C5 | Content | 🟡 Medium | All experience entries use `/logo.png` as company logo | ℹ️ Clean fallback |
| C6 | Content | 🟢 Low | Skills ratings are all 5/5 — does not differentiate proficiency levels | ✅ Resolved |
| Q1 | Code Quality | 🔴 High | `<time dateTime>` uses `Date.now().toString()` instead of the actual project date | ✅ Resolved |
| Q2 | Code Quality | 🟡 Medium | `page.tsx` list items use array index as React `key` in multiple places | ✅ Resolved |
| Q3 | Code Quality | 🟡 Medium | `next.config.js` uses deprecated `turbopack.root` option | ✅ Resolved |
| Q4 | Code Quality | 🟡 Medium | No error boundaries anywhere in the component tree | ✅ Resolved |
| Q5 | Code Quality | 🟡 Medium | No `loading.tsx` streaming fallbacks for any route | ✅ Resolved |
| Q6 | Code Quality | 🟢 Low | `projectId` page has an unused commented-out line (`{/* {<project.descriptionComponent />} */}`) | ✅ Resolved |
| S1 | SEO | 🔴 High | OpenGraph image points to `profile-img.jpg` — no dedicated OG image (1200×630) | ℹ️ Portrait preview active |
| S2 | SEO | 🟡 Medium | Project detail pages have no OpenGraph `image` in their `generateMetadata` | ✅ Resolved |
| S3 | SEO | 🟡 Medium | `/resume` page is not listed in `routesConfig.mainNav` — not linked from the main navbar | ✅ Resolved |
| S4 | SEO | 🟢 Low | `robots.txt` exists but has not been verified to allow all important routes | ✅ Verified & OK |
| U1 | UX | 🟡 Medium | Contact form depends on Google Form env vars — if not configured, visitors see no error, form silently drops | ✅ Resolved (Direct email fallback) |
| U2 | UX | 🟡 Medium | AI Twin chatbot shows a raw developer-facing fallback message (with `.env` instructions) to real visitors when `OPENROUTER_API_KEY` is missing | ✅ Resolved |
| U3 | UX | 🟢 Low | "View All" buttons on home page sections use a chevron-down icon — misleading; should be chevron-right or an arrow | ✅ Resolved |
| U4 | UX | 🟢 Low | Profile photo `alt` text includes the full job title — long for an `alt`, better as a brief label | ✅ Resolved |
| P1 | Performance | 🟡 Medium | All `pagesInfoArr` images use `priority` prop — over-eagerly loaded, even for below-fold images | ✅ Resolved |
| P2 | Performance | 🟡 Medium | No remote image domains configured in `next.config.js` — any future external image URLs will break | ✅ Resolved |
| P3 | Performance | 🟢 Low | Duplicate EquipFlow images exist in two locations: `/public/images/` and `/public/projects/equipflow/` | ✅ Resolved (Cleaned up) |
| D1 | Deployment | 🔴 High | `OPENROUTER_API_KEY` likely not set in the production environment — AI Twin will be offline for all real visitors | ℹ️ Requires user API key |
| D2 | Deployment | 🟡 Medium | No `.env.example` file — environment variables required are not documented anywhere | ✅ Resolved |
| D3 | Deployment | 🟡 Medium | No git repository initialized in the project folder — no version history, no easy deployment via GitHub | ✅ Resolved |
| D4 | Deployment | 🟢 Low | `vercel.svg` and `next.svg` remain in `/public/` — template artifacts, not used in the portfolio | ✅ Resolved |

---

## 5. Content & Data Issues

### C1 🔴 — Project screenshots still use `/logo.png` placeholders

**Files:** `config/projects.ts`

Three of the four active projects — Wanderbot-RAG, Patient Intake Automation, and AI-Powered File Processing — still use `/logo.png` as both the `companyLogoImg` (shown as the hero image on the project detail page) and every image in `pagesInfoArr`.

**Impact:** The project detail pages for these three projects display a small generic logo image in a full-width 1280×720 container, looking broken and unpolished to recruiters or clients visiting those pages.

**Recommendation:** Add real screenshots, workflow diagrams, architecture diagrams, or n8n/AWS console screenshots for each project. Store them in `/public/projects/<project-id>/` following the same pattern as EquipFlow.

---

### C2 🔴 — `featuredProjects` is hardcoded `Projects.slice(0, 3)`

**File:** `config/projects.ts` (line 212), `app/(root)/page.tsx` (line 19)

The home page's "Projects" section always shows the first 3 entries in the array. The 4th project (AI-Powered File Processing & RAG Pipeline) never appears on the home page.

**Recommendation:** Either:
- Add a `featured: true` flag to project data and filter by that, or
- Reorder the `Projects` array to promote the most impactful projects first, or
- Increase the slice to `slice(0, 4)` to show all four in a 2×2 grid on larger screens.

---

### C3 🟡 — All `endDate` values are `2026-11-01`

**File:** `config/projects.ts`

Every project has `endDate: new Date("2026-11-01")`. This date appears nowhere in the UI currently, but if it ever does (e.g., "Completed: November 2026"), it will be misleading or confusing.

**Recommendation:** Either remove `endDate` from the `ProjectInterface` if it's not used, or set each project's end date to the actual completion date.

---

### C4 🟡 — Duplicate content in `experience.ts`

**File:** `config/experience.ts`

In all four experience entries, the `description` and `achievements` arrays contain nearly identical bullet points. In some entries, 2 of 3 bullets are word-for-word identical. This duplication shows up on both the experience detail cards and on the Resume page (`/resume`).

**Example (MCMDO Project Coordinator):**
- `description[1]`: "Built and maintained recurring reporting systems..."  
- `achievements[1]`: "Built and maintained recurring reporting systems..." *(identical)*

**Recommendation:** Differentiate `description` (what the role involved) from `achievements` (specific quantified outcomes). The `description` should describe responsibilities; `achievements` should only contain measurable results.

---

### C5 🟡 — All experience entries use `/logo.png` as company logo

**File:** `config/experience.ts`

Every experience entry has `logo: "/logo.png"`. If company logos are displayed anywhere in the experience cards or resume, visitors see a generic icon for all employers.

**Recommendation:** Add actual company logos (MCMDO, RRS, MOH Ethiopia) or set `logo` to `undefined` if the field is unused in the UI.

---

### C6 🟢 — Skills ratings are all 5/5

**File:** `config/skills.ts` (not inspected but inferred from the home page)

If all featured skills are rated 5/5, the rating system adds no information. It may also look unrealistic to technical reviewers who know that mastery is rare.

**Recommendation:** Differentiate levels (e.g., 4/5 for Python, 3/5 for TypeScript) or remove the rating system and use category groupings instead.

---

## 6. Code Quality Issues

### Q1 🔴 — `<time dateTime>` uses `Date.now()` instead of project date

**File:** `app/(root)/projects/[projectId]/page.tsx` (line 82)

```tsx
// ❌ Current — always renders the current timestamp
<time dateTime={Date.now().toString()}>
  {formatDateFromObj(project.startDate)}
</time>

// ✅ Fix — use the actual project date in ISO 8601 format
<time dateTime={project.startDate.toISOString()}>
  {formatDateFromObj(project.startDate)}
</time>
```

This is a semantic HTML bug. The `dateTime` attribute is used by search engines and screen readers to understand when a document was published. Using `Date.now()` means it always reads as "right now," which is incorrect and hurts SEO for article-type pages.

---

### Q2 🟡 — Array index used as React `key`

**Files:** `app/(root)/projects/[projectId]/page.tsx` (lines 206, 212, 222)

```tsx
// ❌ Current
{project.pagesInfoArr.map((page, ind) => (
  <div key={ind}>
    {page.imgArr.map((img, ind) => (
      <div key={ind} ...>
```

React `key` props should be stable, unique identifiers. Using array index causes unnecessary re-renders and can cause subtle bugs with animations or state.

**Recommendation:** Use `page.title` or a slug derived from it as the key for `pagesInfoArr`. For `imgArr`, use the image path (which is already unique).

---

### Q3 🟡 — Deprecated `turbopack.root` in `next.config.js`

**File:** `next.config.js`

```js
// ❌ Current — deprecated config option
turbopack: {
  root: path.resolve(__dirname),
},
```

The `turbopack.root` option was deprecated in Next.js 13+ and has no effect in Next.js 16. It generates a console warning during dev mode and may cause confusion.

**Recommendation:** Remove the `turbopack` block entirely, or replace with the correct modern Turbopack configuration if Turbopack is intentionally being used.

---

### Q4 🟡 — No error boundaries in the component tree

No `error.tsx` files exist in any route segment. If any server component throws (e.g., data loading failure), Next.js will crash the entire page. For a portfolio that includes a live AI chatbot endpoint, having at least one error boundary for the chat section is important.

**Recommendation:** Add `app/(root)/error.tsx` (a client component with `"use client"`) and optionally `app/(root)/projects/[projectId]/error.tsx` to catch and display graceful error states.

---

### Q5 🟡 — No `loading.tsx` files

No loading skeleton screens are defined for any route. When server components suspend (e.g., during initial load on slow connections), the browser shows a blank page instead of a loading state.

**Recommendation:** Add `app/(root)/loading.tsx` with a simple skeleton or spinner. This is a one-file change that significantly improves perceived performance.

---

### Q6 🟢 — Dead commented-out code

**File:** `app/(root)/projects/[projectId]/page.tsx` (line 166)

```tsx
{/* {<project.descriptionComponent />} */}
```

This leftover template comment references a component pattern (`descriptionComponent`) that is no longer part of the `ProjectInterface`. It is safe to remove.

---

## 7. SEO & Metadata Issues

### S1 🔴 — No dedicated OpenGraph image

**File:** `config/site.ts` (line 17)

```ts
ogImage: "https://sirakembibel.com/profile-img.jpg",
```

The OG image is pointing directly to the circular profile photo. Social media platforms (LinkedIn, Twitter, WhatsApp) use OG images as large link preview cards. A profile photo cropped to a circle looks poor in a rectangular 1200×630 preview card.

**Recommendation:** Create a proper OG image (1200×630 px) with your name, title, and a clean background. Tools like Figma, Canva, or `@vercel/og` (dynamic OG image generation) can produce this. Place it at `/public/og-image.png` and update `siteConfig.ogImage`.

---

### S2 🟡 — Project detail pages have no OG image

**File:** `app/(root)/projects/[projectId]/page.tsx` (lines 39–51)

The `generateMetadata` for project pages returns an `openGraph` object but includes no `images` field. When someone shares a project link on LinkedIn, they get no preview image.

**Recommendation:** Add `images: [{ url: project.companyLogoImg, width: 1280, height: 720 }]` to the openGraph metadata, or generate a dynamic OG image using the project name.

---

### S3 🟡 — `/resume` is not in the main navigation

The `/resume` route is a full, well-built page with metadata and canonical URL. However, it is not listed in `routesConfig.mainNav` (or equivalent navigation config), meaning visitors can only reach it via the home page's "Resume" button or direct URL.

**Recommendation:** Add `/resume` to the main navigation config so it appears in the top navbar. This also improves crawlability for search engines.

---

### S4 🟢 — `robots.txt` not verified

**File:** `/public/robots.txt`

The file exists but its contents were not inspected during this review. Ensure it does not accidentally block the `/projects`, `/resume`, `/experience`, or `/skills` routes.

**Recommendation:** Verify `/robots.txt` allows all public routes and includes a `Sitemap:` directive pointing to `https://sirakembibel.com/sitemap.xml` (which does not currently exist — consider adding one with `next-sitemap`).

---

## 8. UX & Accessibility Issues

### U1 🟡 — Contact form silently fails if env vars are not set

**File:** `app/(root)/contact/page.tsx` (not fully inspected, but inferred from prior session)

If `GOOGLE_FORM_LINK` (and related env vars) are not configured in the production environment, the contact form likely fails silently — the visitor submits the form but nothing is sent. There is no visible error.

**Recommendation:** Add client-side validation and a visible error state when the form submission fails. Consider switching to a more robust contact solution (Resend, Formspree, or EmailJS) that doesn't require a separate Google Form setup.

---

### U2 🟡 — AI Twin shows developer-facing fallback to real visitors

**File:** `app/api/chat/route.ts` (lines 61–63)

When `OPENROUTER_API_KEY` is not set, the chatbot returns this message to visitors:

> *"ℹ️ Note: To enable live model streaming via OpenRouter, please add your `OPENROUTER_API_KEY` in the project `.env` file."*

This is a developer instruction, not a user-facing message. A recruiter or potential client who opens the AI chat and sees this will be confused or get a negative impression.

**Recommendation:** Replace the fallback text with a visitor-friendly message such as:
> *"Hi! I'm Sirak's AI assistant. I'm currently offline for maintenance — feel free to reach out directly at sirakbayet@gmail.com or explore the Projects page."*

Remove all references to `.env` files or technical setup steps from the fallback.

---

### U3 🟢 — Chevron-down icon used for "View All" navigation links

**File:** `app/(root)/page.tsx` (lines 173, 212, 243)

```tsx
<Icons.chevronDown className="mr-2 h-4 w-4" /> View All
```

A down-pointing chevron conventionally means "expand in place" or "scroll down." But these buttons navigate to a different page (`/projects`, `/experience`, `/skills`). This creates a mismatch between icon semantics and actual behavior.

**Recommendation:** Use `Icons.chevronRight` or `Icons.arrowRight` for navigation actions that take the user to a new page.

---

### U4 🟢 — Profile image `alt` text is too long

**File:** `app/(root)/page.tsx` (line 81)

```tsx
alt="Sirak Embibel - AI Automation Specialist & Applied AI Engineer"
```

While descriptive text is good, `alt` text for a profile photo should briefly identify the person. The full job title is better placed in the nearby `<h3>` heading (which it already is). Over-long `alt` text is repetitive when announced by screen readers.

**Recommendation:**
```tsx
alt="Sirak Embibel — profile photo"
```

---

## 9. Performance Issues

### P1 🟡 — All project page images use `priority`

**File:** `app/(root)/projects/[projectId]/page.tsx` (lines 151, 221)

Every image in `pagesInfoArr` (which can have 2+ images per project) uses `priority={true}`. The `priority` prop tells Next.js to preload the image immediately, bypassing lazy loading. Using it on multiple below-the-fold images defeats its purpose and adds unnecessary network requests on initial load.

**Recommendation:** Only apply `priority` to the first (hero) image. Remove `priority` from all `pagesInfoArr` images, which are always below the fold.

---

### P2 🟡 — No remote image domains configured

**File:** `next.config.js`

There is no `images.remotePatterns` configuration in `next.config.js`. If any project logo or page screenshot is ever served from an external URL (e.g., a GitHub raw URL or Cloudinary), `next/image` will throw a build error. Currently this is not a problem, but it limits future flexibility.

**Recommendation:** Add a `images.remotePatterns` block even if empty for now, as a forward-looking scaffold:
```js
images: {
  remotePatterns: [
    { protocol: "https", hostname: "github.com" },
    { protocol: "https", hostname: "avatars.githubusercontent.com" },
  ],
},
```

---

### P3 🟢 — Duplicate EquipFlow images in two directories

During the current session, EquipFlow screenshots were placed in both `/public/images/` and `/public/projects/equipflow/`. Only the latter is referenced by the code.

**Recommendation:** Delete `/public/images/img1.jpg`, `/public/images/img2.jpg`, `/public/images/img3.jpg` to avoid confusion and reduce the deployed bundle size.

---

## 10. Deployment & Environment Issues

### D1 🔴 — `OPENROUTER_API_KEY` almost certainly not set in production

**File:** `app/api/chat/route.ts` (line 52)

The AI Twin chatbot checks for `process.env.OPENROUTER_API_KEY`. If not set, visitors see the developer fallback message (see U2). No `.env` file is present in the project, and no `.env.example` documents the required variables.

**Recommendation:**
1. Obtain a free-tier API key from [openrouter.ai](https://openrouter.ai)
2. Add it to Vercel (or your host's) environment variables
3. Create a `.env.local` for local development (never commit this)
4. Create a `.env.example` with placeholder values for documentation

---

### D2 🟡 — No `.env.example` file

The project has no documentation of which environment variables are required. A new developer (or the owner returning after months) would have no reference for what to configure.

**Required variables to document:**
```env
# AI Twin Chatbot
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini

# Contact Form
GOOGLE_FORM_LINK=
GOOGLE_FORM_ENTRY_NAME=
GOOGLE_FORM_ENTRY_EMAIL=
GOOGLE_FORM_ENTRY_MESSAGE=

# Site URL (used for HTTP-Referer header in AI requests)
NEXT_PUBLIC_APP_URL=https://sirakembibel.com
```

---

### D3 🟡 — No git repository initialized

There is no `.git` directory in the project folder. This means:
- No version history for any changes made
- No ability to deploy via GitHub → Vercel CI/CD
- No way to roll back if a change breaks the site
- No way to collaborate or share code

**Recommendation:**
```bash
git init
git add .
git commit -m "Initial commit — portfolio v1"
# Then create a GitHub repo and push
```

---

### D4 🟢 — Template artifacts left in `/public/`

**Files:** `/public/vercel.svg`, `/public/next.svg`

These are Next.js template placeholder files, not used anywhere in the portfolio. They add minor noise to the public directory.

**Recommendation:** Delete both files.

---

## 11. Prioritized Recommendations

### 🔴 High Priority (Fix Before Sharing with Recruiters)

| # | Action | File(s) |
|---|---|---|
| 1 | Set `OPENROUTER_API_KEY` in production env so the AI Twin works | Vercel dashboard / `.env.local` |
| 2 | Replace developer-facing chatbot fallback with a visitor-friendly message | `app/api/chat/route.ts` |
| 3 | Fix `<time dateTime>` bug — use `project.startDate.toISOString()` | `app/(root)/projects/[projectId]/page.tsx` |
| 4 | Add real screenshots/diagrams for Wanderbot-RAG, Patient Intake, AI File Processing | `config/projects.ts` + `/public/projects/` |
| 5 | Create a proper OG image (1200×630) and update `siteConfig.ogImage` | `config/site.ts` + `/public/` |
| 6 | Initialize a git repository and push to GitHub | Terminal |

### 🟡 Medium Priority (Polish Pass)

| # | Action | File(s) |
|---|---|---|
| 7 | Fix or expose `/resume` in main navigation | Navigation config |
| 8 | Add OG `images` to project detail page `generateMetadata` | `app/(root)/projects/[projectId]/page.tsx` |
| 9 | Differentiate `description` vs `achievements` in `experience.ts` | `config/experience.ts` |
| 10 | Fix `featuredProjects` — show all 4 projects or add a `featured` flag | `config/projects.ts` |
| 11 | Add `app/(root)/error.tsx` error boundary | `app/(root)/` |
| 12 | Add `app/(root)/loading.tsx` loading skeleton | `app/(root)/` |
| 13 | Remove deprecated `turbopack.root` from `next.config.js` | `next.config.js` |
| 14 | Create `.env.example` documenting all required environment variables | Project root |
| 15 | Replace array index `key` props with stable identifiers | `app/(root)/projects/[projectId]/page.tsx` |
| 16 | Add graceful error handling to the contact form | `app/(root)/contact/page.tsx` |

### 🟢 Low Priority (Nice to Have)

| # | Action | File(s) |
|---|---|---|
| 17 | Replace chevron-down with chevron-right on "View All" nav buttons | `app/(root)/page.tsx` |
| 18 | Shorten profile image `alt` text | `app/(root)/page.tsx` |
| 19 | Remove duplicate EquipFlow images from `/public/images/` | `/public/images/` |
| 20 | Delete `/public/vercel.svg` and `/public/next.svg` template files | `/public/` |
| 21 | Add `robots.txt` sitemap directive + generate a `sitemap.xml` | `next-sitemap` package |
| 22 | Differentiate skill ratings (not all 5/5) | `config/skills.ts` |
| 23 | Remove the dead commented-out `descriptionComponent` line | `app/(root)/projects/[projectId]/page.tsx` |
| 24 | Remove `priority` prop from below-fold `pagesInfoArr` images | `app/(root)/projects/[projectId]/page.tsx` |

---

## 12. Quick Wins

These changes take under 5 minutes each and have meaningful impact:

**1. Fix the `<time>` bug (1 line):**
```tsx
// app/(root)/projects/[projectId]/page.tsx, line 82
// Change:
dateTime={Date.now().toString()}
// To:
dateTime={project.startDate.toISOString()}
```

**2. Fix the chatbot fallback message (~5 lines):**
```ts
// app/api/chat/route.ts, lines 61–63
// Replace the developer-facing note with:
const fallbackText =
  "👋 Hi! I'm Sirak's AI assistant. I'm currently offline — " +
  "please explore his projects at [/projects](/projects) or reach out directly at sirakbayet@gmail.com.";
```

**3. Delete template files:**
```bash
rm public/vercel.svg public/next.svg
```

**4. Remove the `turbopack` block from `next.config.js`:**
Delete lines 5–7 of `next.config.js`.

**5. Show all 4 projects on the home page:**
```ts
// config/projects.ts, line 212
// Change:
export const featuredProjects = Projects.slice(0, 3);
// To:
export const featuredProjects = Projects.slice(0, 4);
```

**6. Initialize git:**
```bash
git init && git add . && git commit -m "Initial commit"
```

---

*Review conducted: October 2026*  
*Build version: Next.js 16.0.10 — 23 static pages, clean build*
