# Muhammad Dimas Hadiyanto — Graphic & 3D Creator

A dark, animation-driven portfolio landing page built with React + TypeScript +
Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Sections

1. **Hero** — gradient headline, magnetic portrait, navbar, tagline.
2. **Marquee** — two rows of real work that scroll horizontally with the page.
3. **About** — decorative 3D objects, gradient heading, per-character scroll-reveal bio.
4. **Services** — Brand Identity · Social & Campaigns · Digital Experience · 3D & Motion.
5. **Projects** — sticky-stacking cards (Delisari Nusantara, Firstpage.id, Kemensos RI).

All content lives in `src/data.ts`; all imagery is self-hosted under `public/`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build -> dist/
npm run preview
```

> On Windows paths containing `&` (e.g. `Web & App`), the npm `.bin` shims can
> fail. Run the tools directly instead:
>
> ```bash
> node node_modules/typescript/bin/tsc --noEmit
> node node_modules/vite/bin/vite.js build
> ```

## Assets

- `public/portrait.png` — hero photo (red ID-photo background removed via
  chroma-key + border flood-fill + despill).
- `public/projects/*.webp` — project card imagery (real client work).
- `public/marquee/*.webp` — marquee tiles (real work).
- `public/decor/*.png` — decorative 3D objects in the About section.

Respects `prefers-reduced-motion`: reveal/magnet/scroll animations are softened
or disabled.
