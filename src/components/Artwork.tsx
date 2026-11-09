import type { CSSProperties } from "react";
import manifest from "../data/images.json";
import type { Img } from "../data/projects";
import { asset } from "../lib/router";
import { useLang } from "../lib/i18n";

type Entry = { w: number; h: number; widths: number[] };
const images = manifest as Record<string, Entry>;

export const meta = (src: string): Entry => {
  const m = images[src];
  if (!m) throw new Error(`Image "${src}" is missing from images.json — run npm run images`);
  return m;
};
export const ratio = (src: string) => meta(src).w / meta(src).h;
export const url = (src: string, w: number) => asset(`images/${src}-${w}.webp`);
export const largest = (src: string) => url(src, Math.max(...meta(src).widths));

type Props = {
  image: Img;
  /** The `sizes` attribute: how wide the image is shown at each breakpoint. */
  sizes: string;
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** A responsive, lazily loaded image at its true proportions (never cropped or stretched). */
export function Artwork({ image, sizes, eager, className, style }: Props) {
  const { t } = useLang();
  const m = meta(image.src);
  const srcSet = m.widths.map((w) => `${url(image.src, w)} ${w}w`).join(", ");
  const fallback = url(image.src, m.widths.find((w) => w >= 1280) ?? Math.max(...m.widths));
  return (
    <img
      className={className}
      style={{ aspectRatio: `${m.w} / ${m.h}`, ...style }}
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={t(image.alt)}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
    />
  );
}
