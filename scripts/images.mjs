// Builds responsive WebP sizes for every master image in /artwork and writes
// src/data/images.json (dimensions + available widths) for the <Artwork> component.
//
//   artwork/<project>/<name>.(jpg|jpeg|png|webp|tif|tiff)
//     -> public/images/<project>/<name>-640.webp, -1280.webp, -2000.webp, -<full>.webp
//
// Existing outputs are kept; pass --force to regenerate everything.
import { readdir, mkdir, stat, writeFile, unlink } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "artwork");
const OUT = join(ROOT, "public", "images");
const MANIFEST = join(ROOT, "src", "data", "images.json");
const WIDTHS = [640, 1280, 2000];
const MAX = 2400;
const force = process.argv.includes("--force");
const exists = (p) => stat(p).then(() => true, () => false);

const manifest = {};
for (const project of (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory())) {
  const files = (await readdir(join(SRC, project.name))).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
  await mkdir(join(OUT, project.name), { recursive: true });
  for (const file of files) {
    const name = parse(file).name;
    const input = sharp(join(SRC, project.name, file)).rotate();
    const meta = await input.metadata();
    const full = Math.min(meta.width, MAX);
    const widths = [...new Set([...WIDTHS.filter((w) => w < full), full])];
    for (const w of widths) {
      const target = join(OUT, project.name, `${name}-${w}.webp`);
      if (!force && (await exists(target))) continue;
      await input.clone().resize({ width: w }).webp({ quality: 86, effort: 6 }).toFile(target);
      console.log("wrote", target);
    }
    const height = Math.round((meta.height * full) / meta.width);
    manifest[`${project.name}/${name}`] = { w: full, h: height, widths };
  }
}
// Remove generated files that no longer belong to a master (renamed or deleted artwork).
const keep = new Set(Object.entries(manifest).flatMap(([k, v]) => v.widths.map((w) => `${k}-${w}.webp`)));
for (const project of await readdir(OUT, { withFileTypes: true })) {
  if (!project.isDirectory()) continue;
  for (const f of await readdir(join(OUT, project.name))) {
    if (!keep.has(`${project.name}/${f}`)) { await unlink(join(OUT, project.name, f)); console.log("removed", f); }
  }
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 1) + "\n");
console.log(`images.json: ${Object.keys(manifest).length} images`);
