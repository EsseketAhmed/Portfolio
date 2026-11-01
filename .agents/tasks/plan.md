# Implementation Plan — Ahmed Esseket Portfolio

> **Note:** This plan is decomposed into 5 FEAT files under `.agents/tasks/task-ahmed-esseket-portfolio/features/`. The workflow tail has been restructured to execute them sequentially. This file serves as the human-readable summary and fallback for the build loop.

## Stack Decisions

- **Astro 5** (output: 'static') — SSG, no server adapter needed for Cloudflare Pages static deployment
- **Motion for React v11** — imported from `motion/react` (the renamed framer-motion package); NOT from `framer-motion`
- **Tailwind CSS v3** via `@astrojs/tailwind` — v4 is still in beta and lacks the Astro integration; v3 is the stable choice
- **Sanity Studio v3** at `/studio` — manually scaffolded (no `sanity init` CLI call) to avoid auth prompts in automation
- **No Cloudflare adapter** — site uses `output: 'static'`; Cloudflare Pages serves the `dist/` folder directly
- **Font delivery** — custom fonts copied to `public/fonts/` and referenced via absolute URL `/fonts/Pr_N.ttf` in CSS, ensuring Vite doesn't try to inline them

## Windows PowerShell Notes

- Use semicolons (`;`) to chain commands, not `&&`
- Quote all paths with spaces: `"c:\Users\essek\Desktop\Ahmed ess\AHMEDESSEKETCOM"`
- `Copy-Item -Path source -Destination dest` to copy files
- `New-Item -ItemType Directory -Force` to create directories
- `Set-Location path` instead of `cd path` in scripts

---

## FEAT-001 — Project Scaffold & Dependencies

- [ ] 1. Create `package.json` at workspace root with Astro 5, React 18, @astrojs/react, @astrojs/tailwind, @astrojs/sitemap, motion@^11, @sanity/client@^6, @sanity/image-url@^1, tailwindcss@^3, typescript@^5.
      Files: `package.json`
      Verify: `npm install` exits 0; `node_modules/astro` exists.

- [ ] 2. Create `tsconfig.json` with strict mode, JSX preserve, `@/*` path alias → `src/*`.
      Files: `tsconfig.json`
      Verify: `npx tsc --noEmit` runs without crashing (may warn about missing files at this stage).

- [ ] 3. Create `astro.config.mjs` with react(), tailwind(), sitemap() integrations, `output: 'static'`, `site` URL.
      Files: `astro.config.mjs`
      Verify: file parses; `npx astro info` shows integrations listed.

- [ ] 4. Create `tailwind.config.mjs` with content globs, custom fontFamily (Pr_1, Pr_2), colors (accent: #E8FF00, dark: #0A0A0A, surface: #111111), animate-marquee keyframe extension.
      Files: `tailwind.config.mjs`
      Verify: file parses as valid ESM.

- [ ] 5. Create `src/styles/global.css` with @tailwind directives, @font-face for Pr_1 and Pr_2 (referencing `/fonts/Pr_1.ttf`), CSS custom properties.
      Files: `src/styles/global.css`
      Verify: file exists; no syntax errors visible.

- [ ] 6. Create all source directories: `src/assets/fonts/`, `src/assets/images/`, `src/components/react/`, `src/components/blocks/`, `src/layouts/`, `src/lib/`, `src/types/`, `src/pages/projects/`, `public/fonts/`.
      Files: directory tree
      Verify: `Test-Path src/assets/fonts` returns True.

- [ ] 7. Copy pre-existing assets: `Hero_Chrome_1.png`, `Hero_Chrome_2.png`, `Hero_Chrome_3.png` → `src/assets/images/`; `Pr_1.ttf`, `Pr_2.ttf` → `src/assets/fonts/` AND `public/fonts/`.
      Files: `src/assets/images/`, `src/assets/fonts/`, `public/fonts/`
      Verify: all 5 files present in their new locations.

- [ ] 8. Create `.env.example`, `.gitignore`, `public/robots.txt`.
      Files: `.env.example`, `.gitignore`, `public/robots.txt`
      Verify: files exist.

- [ ] 9. Run `npm install` at workspace root.
      Files: `node_modules/` (generated)
      Verify: exit code 0; `node_modules/astro` and `node_modules/motion` exist.

---

## FEAT-002 — Sanity Studio & src/lib/ Integration

- [ ] 10. Create `studio/package.json` with sanity@^3, react@^18, @sanity/vision@^3 dependencies and dev/build/deploy scripts.
       Files: `studio/package.json`
       Verify: file is valid JSON.

- [ ] 11. Create `studio/sanity.config.ts` with projectId/dataset from env, structureTool, visionTool, and all schemas registered.
       Files: `studio/sanity.config.ts`
       Verify: TypeScript parses without errors.

- [ ] 12. Create all four schema files: `studio/schemas/project.ts`, `studio/schemas/homePage.ts`, `studio/schemas/faq.ts`, `studio/schemas/siteSettings.ts`, and `studio/schemas/index.ts` exporting them all.
       Files: `studio/schemas/*.ts`
       Verify: `npx tsc --noEmit --project studio/tsconfig.json` exits 0.

- [ ] 13. Create `src/lib/sanity.ts` (configured @sanity/client), `src/lib/imageUrl.ts` (urlFor helper), `src/lib/queries.ts` (all GROQ query strings).
       Files: `src/lib/sanity.ts`, `src/lib/imageUrl.ts`, `src/lib/queries.ts`
       Verify: `npx tsc --noEmit` — no errors in src/lib/.

- [ ] 14. Run `npm install` inside `studio/`.
       Files: `studio/node_modules/` (generated)
       Verify: exit code 0.

---

## FEAT-003 — All UI Components

- [ ] 15. Create `src/types/sanity.ts` with TypeScript interfaces: Project, HomePage, Faq, SiteSettings, SanityImage, SanityBlock.
       Files: `src/types/sanity.ts`
       Verify: `npx tsc --noEmit` — no errors.

- [ ] 16. Create `src/layouts/BaseLayout.astro` — full HTML shell, global.css import, SEO meta tags, og: tags, favicon link.
       Files: `src/layouts/BaseLayout.astro`
       Verify: file parses as valid Astro component.

- [ ] 17. Create `src/components/Navbar.astro` — sticky nav, logo, nav links, mobile hamburger via inline script.
       Files: `src/components/Navbar.astro`
       Verify: file exists.

- [ ] 18. Create `src/components/Footer.astro` — dark footer, copyright, social links prop, back-to-top.
       Files: `src/components/Footer.astro`
       Verify: file exists.

- [ ] 19. Create `src/components/react/Hero.tsx` — parallax with `useScroll` + `useTransform` from `motion/react`, three chrome image layers, headline animation. Import images as props (src strings).
       Files: `src/components/react/Hero.tsx`
       Verify: `npx tsc --noEmit` — no errors; grep confirms `from 'motion/react'` not `framer-motion`.

- [ ] 20. Create `src/components/react/MarqueeGallery.tsx` — infinite horizontal scroll marquee via CSS animation + motion/react hover pause.
       Files: `src/components/react/MarqueeGallery.tsx`
       Verify: `npx tsc --noEmit` — no errors.

- [ ] 21. Create `src/components/react/ProjectsGrid.tsx` — responsive project card grid, motion.div whileHover, urlFor images, Project type.
       Files: `src/components/react/ProjectsGrid.tsx`
       Verify: `npx tsc --noEmit` — no errors.

- [ ] 22. Create Astro section components: `AboutSection.astro`, `SocialSection.astro`, `FaqSection.astro` (details/summary accordion), `ContactSection.astro` (form with mailto fallback).
       Files: `src/components/AboutSection.astro`, `src/components/SocialSection.astro`, `src/components/FaqSection.astro`, `src/components/ContactSection.astro`
       Verify: files exist.

- [ ] 23. Create `src/components/blocks/BlockRenderer.astro`, `src/components/blocks/PortableTextBlock.astro`, `src/components/blocks/ImageBlock.astro`.
       Files: `src/components/blocks/*.astro`
       Verify: files exist.

---

## FEAT-004 — Pages & Data Wiring

- [ ] 24. Create `src/pages/index.astro` — fetches homePage + faq + siteSettings from Sanity, composes all section components, imports Hero images from `src/assets/images/` via Astro static import, passes .src to Hero React component. Uses fallback data if Sanity returns null.
       Files: `src/pages/index.astro`
       Verify: `npm run build` does not error on this file.

- [ ] 25. Create `src/pages/projects/index.astro` — fetches ALL_PROJECTS_QUERY, renders ProjectsGrid with all projects.
       Files: `src/pages/projects/index.astro`
       Verify: `npm run build` generates `dist/projects/index.html`.

- [ ] 26. Create `src/pages/projects/[slug].astro` — exports `getStaticPaths()`, renders project detail with BlockRenderer, fallback to empty array if no Sanity projects.
       Files: `src/pages/projects/[slug].astro`
       Verify: `npm run build` — no error on dynamic route; if no projects, getStaticPaths returns [].

- [ ] 27. Create `src/pages/404.astro` — minimal 404 page.
       Files: `src/pages/404.astro`
       Verify: `dist/404.html` exists after build.

- [ ] 28. Run full build: `npm run build`.
       Verify: exit 0; `dist/index.html`, `dist/projects/index.html` exist.

---

## FEAT-005 — Finalization, SEO, README, Deploy Config

- [ ] 29. Create `wrangler.toml` — Cloudflare Pages config with pages_build_output_dir = './dist'.
       Files: `wrangler.toml`
       Verify: file exists and is valid TOML.

- [ ] 30. Create `public/favicon.svg` — SVG with letter 'A' in #E8FF00 on #0A0A0A. Update `BaseLayout.astro` to link it.
       Files: `public/favicon.svg`, `src/layouts/BaseLayout.astro`
       Verify: `dist/favicon.svg` exists after build.

- [ ] 31. Create `README.md` with tech stack, getting started, studio dev, build & deploy sections.
       Files: `README.md`
       Verify: file exists.

- [ ] 32. Verify `.env.example` matches all `import.meta.env` references. Verify `dist/sitemap-index.xml` produced by build.
       Files: `.env.example` (update if needed)
       Verify: `Test-Path dist/sitemap-index.xml` returns True.

- [ ] 33. Final `npm run build` — confirm clean exit, no TypeScript errors, all dist/ artifacts present.
       Verify: exit code 0.
