# Sarah Jane E. Villanueva — Portfolio

Personal portfolio built with Next.js 16, React 19 and Tailwind CSS v4. Single page with light and dark themes.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

All text lives in [`data/portfolio.ts`](data/portfolio.ts): profile, about, education, skills, projects and certificates. Edit it there; the sections update automatically.

- **Add a certificate:** put the file in `public/certificates/`, a preview image in `public/images/certificates/`, then add an entry to `certificates`.
- **Add a project:** put screenshots in `public/images/projects/`, then add an entry to `projects`. The first image is shown as the tall feature image.

## Themes

Colors are defined once in [`app/globals.css`](app/globals.css). Both themes use the font (Poppins) and colors (navy + yellow) of `assets/design-references/dark-mode.jpg`; light mode uses the reference's light lavender sections and a deeper gold for text accents so they stay readable on white.

Visitors get their system theme by default; the toggle in the header remembers their choice.

Poppins is self-hosted from `app/fonts/` (SIL Open Font License), so the site builds without internet access.

## Navigation

On large screens the menu is an upright bar on the left, styled after `assets/design-references/bottom-nav.jpg`; on phones the same design sits at the bottom of the screen.

## Project mockups

Each project screen in `data/portfolio.ts` is shown as a desktop window with a phone overlapping it. The phone shows the desktop image fitted to its screen until you add a dedicated `mobile` image for that screen. Set `desktopFit: "cover"` for tall images such as posters.

## Logo and icons

`public/images/logo-mark.svg` is the SJ "design selection" logo (navy badge, dashed selection frame, handles and cursor in yellow). `app/icon.png` and `app/apple-icon.png` are rendered from it. The previous gold-on-black badge is archived in `assets/originals/logo/`.

## Folders

```
app/                  layout, page and section components
data/portfolio.ts     all portfolio content
public/images/        optimized profile, project and certificate images
public/certificates/  certificate files linked from the site
assets/originals/     untouched original uploads (not deployed)
assets/design-references/  design inspiration (not deployed)
```
