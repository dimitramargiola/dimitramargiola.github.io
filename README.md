# Dimitra Margiola — Portfolio

A bilingual (Ελληνικά / English) portfolio site for graphic designer Dimitra Margiola.
React + Vite + TypeScript, static, deployed to GitHub Pages. No backend, no CMS.

```
npm install        # once
npm run dev        # local site at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

---

## Publishing on GitHub Pages

1. Create a GitHub repository and push this folder to its `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).
   The site appears at `https://<user>.github.io/<repo>/`.

The workflow sets the base path for you, so the site works both as a project site
(`/<repo>/`) and on a custom domain (`/`).

**Custom domain:** add a file `public/CNAME` containing only the domain
(e.g. `dimitramargiola.com`), set the same domain under Settings → Pages, and push.

### Language links

| URL | Shows |
| --- | --- |
| `…/` | English (default) |
| `…/en/` | English |
| `…/el/` | Greek |
| `…/el/work/afiltraristo/` | a project, in Greek |

`/EL` and `/EN` in capitals work too. The EL/EN switch changes the address, so whatever
is in the address bar can be shared as is, and links inside the site keep the language.

Every project has a real URL (`/work/afiltraristo/` and so on): the build writes an HTML
file per project, so direct links and page refreshes work, and each link has its own
title and preview image when shared.

---

## Editing content

All content lives in two files. You never need to touch the components.

| What | Where |
| --- | --- |
| Projects: titles, descriptions, images, layouts, order | `src/data/projects.ts` |
| Biography, education, experience, skills, contact, PDF, interface wording | `src/data/site.ts` |

Every text is bilingual: `{ el: "…", en: "…" }`. Fill in both.

### Reorder, remove or add a project

- **Order:** the order of the `projects` array is the order on the site (index, home page,
  "next project" links). Move an entry up or down.
- **Remove:** delete the entry.
- **Add:** copy an existing entry and change `slug` (used in the URL, lowercase-with-dashes),
  `number`, `title`, the texts and the images. `year` is optional; leave it out if unsure.

The first project is featured large on the home page; the others follow it, each in a
different composition.

### Case-study layouts (`blocks`)

Each project page is a sequence of blocks. Mix them freely:

| Block | Shows |
| --- | --- |
| `full` | one image edge to edge |
| `wide` | one image inside the margins (`size: "medium"` or `"narrow"` to make it smaller) |
| `row` | 2–4 images side by side at the same height, each at its own proportions |
| `offset` | one image beside a short text (`side: "left"` or `"right"`) |
| `statement` | a short passage set large, such as a quotation from the work |

Any block can take `tone: "grey"` or `tone: "ink"` (black band). Images are never cropped
or stretched on project pages, and every image opens full size when clicked.

### Adding images

1. Put the image (JPG, PNG, WebP or TIFF, as large as you have) in
   `artwork/<folder>/<descriptive-name>.jpg`, e.g. `artwork/eleusis/can-mockup.jpg`.
2. Run `npm run images`. This makes web sizes (640–2400 px WebP) in `public/images/` and
   updates `src/data/images.json`.
3. Refer to it in `projects.ts` as `"eleusis/can-mockup"`, with alt text in both languages.

If you change a project's `cover`, run `npm run social` to refresh its sharing image.

### Contact details

Edit `contact` in `src/data/site.ts`. The email link, phone link, contact section and
footer all read from it.

---

## The original PDF

Visitors can **view** the full portfolio in a new tab or **download** it (navigation,
About section, footer, mobile menu). The file is
`public/Dimitra-Margiola-Portfolio-2026.pdf`.

**Why the web edition differs from the master file:** the PDF exported from Illustrator
is 330 MB. GitHub refuses files over 100 MB, and GitHub Pages cannot serve Git LFS
files, so the master cannot be published as is. The web edition (47 MB) was made by:

1. removing Illustrator's hidden editing data (about 150 MB, which a PDF viewer never displays);
2. re-encoding only images stored above 400 ppi, down to 300 ppi at JPEG quality 90.

All 18 pages, every word and every vector shape are untouched. Rendered page by page, the
two files differ by less than 0.5 / 255 on average (checked on every page).

The 330 MB master stays in `assets/source/` and is excluded from Git by `.gitignore`.
**Keep a backup of it elsewhere.** To rebuild the web edition from a new master (Python
with PyMuPDF installed):

```
python scripts/make-web-pdf.py "assets/source/<master>.pdf" public/Dimitra-Margiola-Portfolio-2026.pdf 400 300 90
```

Then update `sizeLabel` in `site.ts` if the size changed.

---

## Notes on the artwork

- All artwork was taken from the PDF at the highest quality it holds, rendered through
  the PDF's own colour pipeline (CMYK images, transparency and the type set over them
  come out as in the document). Nothing was redrawn, recoloured or generated.
- Some pieces are only as sharp as the PDF allows. The photo on the ΕΛΕΥΣΙΣ front label
  is embedded at 321×309 px (its type is vector and stays sharp), and the PillReminder
  screens and Cocktail Festival mockups are around 550–1300 px. Better source files
  dropped into `artwork/` will improve them.
- The At Care company logo on page 15 of the PDF is not shown on the site, since it is
  the client's mark rather than Dimitra's design.

## Structure

```
artwork/               master images (source of public/images)
public/                PDF, favicons, social images, generated web images
scripts/               images.mjs · social-images.mjs · make-web-pdf.py
src/data/              projects.ts · site.ts · images.json (generated)
src/components/        page sections and the image viewer
src/lib/               router (clean URLs on any base path), language, motion
src/styles.css         the whole visual system
```

Typeface: Geologica (SIL Open Font License), self-hosted, Greek and Latin.
