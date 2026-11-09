import type { CSSProperties } from "react";
import { projects, type Block, type Img, type Project } from "../data/projects";
import { ui } from "../data/site";
import { useLang } from "../lib/i18n";
import { Link } from "../lib/router";
import { Artwork, ratio } from "./Artwork";
import { useLightbox } from "./Lightbox";

const d = (i: number) => ({ "--d": i } as CSSProperties);
const chapterOf = (tone?: string) => (tone === "ink" ? "ink" : tone === "grey" ? "grey" : "paper");

/** An image that opens the full-size viewer. */
function Zoomable({ image, all, sizes, eager }: { image: Img; all: Img[]; sizes: string; eager?: boolean }) {
  const { t } = useLang();
  const { open } = useLightbox();
  return (
    <figure className="plate">
      <button
        type="button"
        className="plate__btn"
        onClick={() => open(all, all.indexOf(image))}
        aria-label={`${t(ui.openImage)}: ${t(image.alt)}`}
      >
        <Artwork image={image} sizes={sizes} eager={eager} />
      </button>
      {image.caption && <figcaption>{t(image.caption)}</figcaption>}
    </figure>
  );
}

function BlockView({ block, all, first }: { block: Block; all: Img[]; first: boolean }) {
  const { t } = useLang();
  const tone = "tone" in block ? block.tone : undefined;
  const cls = `block block--${block.kind} tone--${tone ?? "paper"}`;
  const chapter = chapterOf(tone);

  switch (block.kind) {
    case "full":
      return (
        <section className={cls} data-chapter={chapter} data-reveal>
          <Zoomable image={block.image} all={all} sizes="100vw" eager={first} />
        </section>
      );
    case "wide":
      return (
        <section className={`${cls} block--${block.size ?? "wide"}`} data-chapter={chapter} data-reveal>
          <Zoomable image={block.image} all={all} sizes={block.size === "narrow" ? "66vw" : "(min-width: 900px) 90vw, 100vw"} eager={first} />
        </section>
      );
    case "row":
      return (
        <section className={cls} data-chapter={chapter}>
          {block.title && <h2 className="block__title" data-reveal>{t(block.title)}</h2>}
          <div className="row" data-count={block.images.length}>
            {block.images.map((im, i) => {
              const share = (ratio(im.src) / block.images.reduce((s, x) => s + ratio(x.src), 0)) * 100;
              return (
                <div key={im.src} className="row__item" style={{ ...d(i), "--r": ratio(im.src) } as CSSProperties} data-reveal>
                  <Zoomable image={im} all={all} sizes={`(min-width: 700px) ${Math.round(share)}vw, 100vw`} />
                </div>
              );
            })}
          </div>
        </section>
      );
    case "offset":
      return (
        <section className={`${cls} offset--${block.side}`} data-chapter={chapter}>
          <div className="offset__media" data-reveal>
            <Zoomable image={block.image} all={all} sizes="(min-width: 900px) 45vw, 100vw" />
          </div>
          <div className="offset__text">
            {block.title && <h2 className="block__title" data-reveal>{t(block.title)}</h2>}
            <p className="lead" data-reveal style={d(1)}>{t(block.text)}</p>
          </div>
        </section>
      );
    case "statement":
      return (
        <section className={cls} data-chapter={chapter}>
          <blockquote data-reveal>
            <p className="statement">{t(block.text)}</p>
            {block.source && <footer>{t(block.source)}</footer>}
          </blockquote>
        </section>
      );
  }
}

export function ProjectPage({ project: p }: { project: Project }) {
  const { t } = useLang();
  const all = p.blocks.flatMap((b) => ("image" in b ? [b.image] : "images" in b ? b.images : []));
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const chars = p.title.length + 1;

  return (
    <article className="project" aria-labelledby="project-title">
      <header className="project__head" data-chapter="paper">
        <p className="numeral" data-reveal>{p.number}.</p>
        <h1 id="project-title" className="project__title" style={{ "--chars": chars } as CSSProperties} data-reveal>
          <span style={d(1)}>{p.title}<span className="dot">.</span></span>
        </h1>
        <dl className="project__meta">
          <div data-reveal style={d(2)}><dt>{t(ui.category)}</dt><dd>{t(p.category)}</dd></div>
          <div data-reveal style={d(3)}><dt>{t(ui.context)}</dt><dd>{t(p.context)}</dd></div>
          {p.year && <div data-reveal style={d(4)}><dt>{t(ui.year)}</dt><dd className="tabular">{p.year}</dd></div>}
          <div data-reveal style={d(5)}>
            <dt>{t(ui.deliverables)}</dt>
            <dd><ul>{p.deliverables.map((x) => <li key={x.en}>{t(x)}</li>)}</ul></dd>
          </div>
        </dl>
        <div className="project__desc">
          <p className="statement" data-reveal style={d(2)}>{t(p.summary)}</p>
          {p.description.map((x, i) => <p key={i} data-reveal style={d(3 + i)}>{t(x)}</p>)}
        </div>
      </header>

      {p.blocks.map((b, i) => <BlockView key={i} block={b} all={all} first={i === 0} />)}

      <nav className="next" data-chapter="ink" aria-label={t(ui.next)}>
        <Link to={`/work/${next.slug}`} className="next__link">
          <span className="next__label">{t(ui.next)}</span>
          <span className="next__title">
            <span className="tabular">{next.number}.</span> {next.title}<span className="dot">.</span>
          </span>
          <span className="next__media" aria-hidden="true">
            <Artwork image={next.cover} sizes="(min-width: 900px) 30vw, 60vw" />
          </span>
        </Link>
        <Link to="/#work" className="text-link next__all">
          <span aria-hidden="true">←</span> {t(ui.allWork)}
        </Link>
      </nav>
    </article>
  );
}
