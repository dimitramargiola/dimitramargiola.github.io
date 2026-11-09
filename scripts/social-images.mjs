// Builds favicons and one 1200×630 social card per project (cover contained on black, never cropped).
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const svg = await readFile(root + "public/favicon.svg");
await sharp(svg, { density: 600 }).resize(32, 32).png().toFile(root + "public/favicon-32.png");
await sharp(svg, { density: 600 }).resize(180, 180).png().toFile(root + "public/apple-touch-icon.png");
// Read slug + cover from the data file (simple pattern match; no TypeScript loader needed).
const src = await readFile(root + "src/data/projects.ts", "utf8");
const projects = [...src.matchAll(/slug: "([^"]+)"[\s\S]*?cover: img\("([^"]+)"/g)].map((m) => ({ slug: m[1], cover: m[2] }));
const manifest = JSON.parse(await readFile(root + "src/data/images.json", "utf8"));
await mkdir(root + "public/og", { recursive: true });
for (const p of projects) {
  const m = manifest[p.cover];
  const file = `${root}public/images/${p.cover}-${Math.max(...m.widths)}.webp`;
  const img = await sharp(file).resize(1120, 550, { fit: "inside" }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#0b0b0b" } })
    .composite([{ input: img, gravity: "center" }]).jpeg({ quality: 86 }).toFile(`${root}public/og/${p.slug}.jpg`);
  console.log("og", p.slug);
}
