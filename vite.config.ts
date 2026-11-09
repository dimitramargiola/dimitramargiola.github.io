import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { projects } from "./src/data/projects";
import { site } from "./src/data/site";

/* Deployment base path.
   • GitHub Pages project site (user.github.io/<repo>/): BASE_PATH=/<repo>/
   • Custom domain or user site:                       BASE_PATH=/ (default)
   The GitHub Actions workflow sets this automatically. */
const base = (process.env.BASE_PATH || "/").replace(/\/?$/, "/");
/* Absolute site URL for social cards, e.g. https://user.github.io/repo (optional). */
const siteUrl = (process.env.SITE_URL || "").replace(/\/$/, "");

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Writes one HTML file per route and language so direct links and refreshes work on static
    hosting, each with its own language, title, description and social card. Also writes 404.html
    (which also catches /EL and /EN in capitals). */
function staticRoutes(): Plugin {
  return {
    name: "static-routes",
    apply: "build",
    closeBundle() {
      const dist = join(process.cwd(), "dist");
      const html = readFileSync(join(dist, "index.html"), "utf8");
      const url = (p: string) => (siteUrl ? siteUrl + "/" : base) + p.replace(/^\//, "");
      const page = (lang: "el" | "en", path: string, title: string, desc: string, image: string) => {
        const og = [
          `<meta property="og:type" content="website" />`,
          `<meta property="og:site_name" content="${esc(site.name[lang])}" />`,
          `<meta property="og:title" content="${esc(title)}" />`,
          `<meta property="og:description" content="${esc(desc)}" />`,
          `<meta property="og:image" content="${url(image)}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:locale" content="${lang === "el" ? "el_GR" : "en_GB"}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          siteUrl ? `<meta property="og:url" content="${url(lang + path)}" />` : "",
          siteUrl ? `<link rel="canonical" href="${url(lang + path)}" />` : "",
          `<link rel="alternate" hreflang="en" href="${url("en" + path)}" />`,
          `<link rel="alternate" hreflang="el" href="${url("el" + path)}" />`,
          `<link rel="alternate" hreflang="x-default" href="${url(path)}" />`,
        ].filter(Boolean).join("\n    ");
        return html
          .replace(/<html lang="[a-z]+"/, `<html lang="${lang}"`)
          .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${esc(desc)}" />`)
          .replace(/<!--og-->.*?<!--\/og-->/s, og);
      };
      const write = (dir: string, content: string) => {
        mkdirSync(join(dist, dir), { recursive: true });
        writeFileSync(join(dist, dir, "index.html"), content);
      };
      for (const prefix of ["", "en", "el"] as const) {
        const lang = prefix === "el" ? "el" : "en";
        write(prefix, page(lang, "/", site.seo.title[lang], site.seo.description[lang], "og.jpg"));
        for (const p of projects) {
          write(join(prefix, "work", p.slug), page(lang, `/work/${p.slug}/`, `${p.title} — ${site.name[lang]}`, p.summary[lang], `og/${p.slug}.jpg`));
        }
      }
      writeFileSync(join(dist, "404.html"), page("en", "/", site.seo.title.en, site.seo.description.en, "og.jpg"));
      writeFileSync(join(dist, ".nojekyll"), "");
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), staticRoutes()],
  build: { target: "es2020", assetsInlineLimit: 0 },
});
