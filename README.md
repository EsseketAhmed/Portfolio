# Ahmed Esseket — Portfolio Website

Premium creative portfolio built with Astro, React, TypeScript, Tailwind CSS, Motion for React, and Sanity CMS.

---

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Framework   | Astro 5 (Static Generation)   |
| UI          | React 18 + TypeScript         |
| Styling     | Tailwind CSS 3                |
| Animation   | Motion for React 11           |
| CMS         | Sanity Studio v3              |
| Deployment  | Cloudflare Pages              |

---

## Project Structure

```
/
├── public/
│   ├── fonts/          Pr_1.ttf, Pr_2.ttf (custom fonts)
│   ├── images/         Hero_Chrome_1/2/3.png
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── react/      Hero, MarqueeGallery, ProjectsGrid, FaqAccordion
│   │   ├── blocks/     BlockRenderer (for project page builder)
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── AboutSection.astro
│   │   ├── SocialSection.astro
│   │   └── ContactSection.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   ├── sanity.ts      Sanity client
│   │   ├── queries.ts     All GROQ queries
│   │   └── imageUrl.ts    Image URL builder
│   ├── pages/
│   │   ├── index.astro
│   │   ├── legal.astro
│   │   ├── 404.astro
│   │   └── projects/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── styles/
│   │   └── global.css
│   └── types/
│       └── sanity.ts
└── studio/             Sanity Studio (separate app)
    ├── schemas/
    │   ├── project.ts
    │   ├── homePage.ts
    │   ├── faq.ts
    │   ├── siteSettings.ts
    │   └── blocks/     All 11 content block types
    ├── structure.ts    Custom Studio sidebar
    └── sanity.config.ts
```

---

## 1. Create a Fresh Sanity Project

**Do this before running the dev server.**

Open a terminal and run:

```bash
npm create sanity@latest
```

When prompted:
- **Create new project** → Yes
- **Project name** → `ahmed-esseket-portfolio`
- **Use the default dataset configuration?** → Yes (dataset: `production`)
- **Project output path** → Choose a temporary folder (not this project)

After creation, **copy your Project ID** — it looks like `abc12xyz` and is shown in the terminal output or at [sanity.io/manage](https://sanity.io/manage).

---

## 2. Set Environment Variables

In the **project root**, create a `.env` file:

```env
PUBLIC_SANITY_PROJECT_ID=your_project_id_here
PUBLIC_SANITY_DATASET=production
```

In the **studio folder**, create `studio/.env`:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

Replace `your_project_id_here` with the ID you copied above.

---

## 3. Install Dependencies

```bash
# Install website dependencies
npm install

# Install Studio dependencies
cd studio
npm install
cd ..
```

---

## 4. Run the Dev Server

```bash
# Website (port 4321)
npm run dev

# Studio (port 3333) — open a second terminal
cd studio
npm run dev
```

- Website: http://localhost:4321
- Studio:  http://localhost:3333

---

## 5. Configure CORS in Sanity

Go to [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **CORS Origins**.

Add:
- `http://localhost:4321` (development)
- `https://ahmedesseket.com` (production)

---

## 6. Build for Production

```bash
npm run build
```

Output is in `dist/`. Deploy to Cloudflare Pages by connecting your GitHub repo and setting:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `PUBLIC_SANITY_PROJECT_ID` = your project ID

---

## Content Blocks Available in Project Page Builder

| Block | Description |
|-------|-------------|
| Rich Text | Bold, italic, links, paragraphs |
| Heading | H1–H4, optional gradient style |
| Single Image | Contained or full-width, with caption |
| Image Grid | 2–5 images in a row |
| Image Gallery | Multiple images, grid or masonry |
| Full Width Image | Edge-to-edge image |
| Horizontal Scrolling Gallery | Auto-scrolling marquee |
| Two Column Split | Image+text or image+image |
| Three Column Layout | Three columns with image and/or text |
| Spacer | sm / md / lg / xl |
| Divider | Line / gradient / invisible |

Mix these in any order. Drag to reorder. No limit on number of blocks.

---

## Notes

- The website builds successfully even without Sanity credentials — every section shows sensible fallback content.
- Chrome PNG objects in the hero react to cursor movement on desktop and float automatically on mobile.
- All colours, fonts and gradient styles are defined in `src/styles/global.css` using CSS custom properties.
