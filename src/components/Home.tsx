import { useState, type CSSProperties } from "react";
import { projects, type Project } from "../data/projects";
import { site, ui } from "../data/site";
import { useLang } from "../lib/i18n";
import { Link } from "../lib/router";
import { Artwork } from "./Artwork";
import { PdfLinks } from "./Pdf";

const d = (i: number) => ({ "--d": i } as CSSProperties);

/* ── First screen: the name across two fields ─────────────────────────── */
function Hero() {
  const { t, lang } = useLang();
  const lines = site.heroLines[lang];
  const name = (
    <>
      {lines.map((l, i) => (
        <span className="hero__line" key={l}>
          <span style={d(i)}>{l.replace(/\.$/, "")}{l.endsWith(".") && <span className="dot">.</span>}</span>
        </span>
      ))}
    </>
  );
  return (
    <section className="hero" aria-labelledby="hero-title" data-chapter="paper">
      <div className="hero__seam" data-chapter="ink" aria-hidden="true" />
      <h1 id="hero-title" className="hero__name hero__name--ink">
        {name}
      </h1>
      <div className="hero__name hero__name--paper" aria-hidden="true">{name}</div>
      <div className="hero__foot">
        <p className="hero__role" data-reveal style={d(4)}>
          {t(site.role)}
          <span>{t(site.disciplines)}</span>
        </p>
        <p className="hero__intro" data-reveal style={d(5)}>{t(site.intro)}</p>
        <Link to="/#work" className="btn btn--light hero__cta" data-reveal style={d(6)}>
          {t(ui.seeWork)} <span className="arrow-down" aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
}

/* ── The thesis, featured on the black field that continues from the hero ── */
function Featured({ p }: { p: Project }) {
  const { t } = useLang();
  const extra = p.blocks.flatMap((b) => ("image" in b ? [b.image] : "images" in b ? b.images : []));
  const poster = extra.find((i) => i.src.endsWith("city-poster"))!;
  return (
    <section className="featured" data-chapter="ink" aria-labelledby="featured-title">
      <div className="featured__text">
        <p className="numeral" data-reveal>{p.number}.</p>
        <h2 id="featured-title" className="featured__title" data-reveal style={d(1)}>
          {p.title}<span className="dot">.</span>
        </h2>
        <p className="meta-line" data-reveal style={d(2)}>
          {t(p.category)} · {t(p.context)} · {p.year}
        </p>
        <p className="featured__summary" data-reveal style={d(3)}>{t(p.description[0])}</p>
        <Link to={`/work/${p.slug}`} className="btn btn--light" data-reveal style={d(4)}>
          {t(ui.viewProject)} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <Link to={`/work/${p.slug}`} className="featured__cover media-link" tabIndex={-1} aria-hidden="true" data-reveal>
        <Artwork image={p.cover} sizes="(min-width: 900px) 62vw, 100vw" />
      </Link>
      <Link to={`/work/${p.slug}`} className="featured__poster media-link" tabIndex={-1} aria-hidden="true" data-reveal>
        <Artwork image={poster} sizes="(min-width: 900px) 30vw, 100vw" />
      </Link>
      <Link to={`/work/${p.slug}`} className="featured__bottles media-link" tabIndex={-1} aria-hidden="true" data-reveal style={d(1)}>
        <Artwork image={p.feature} sizes="(min-width: 900px) 58vw, 100vw" />
      </Link>
    </section>
  );
}

/* ── Index: a quiet ledger that previews each project on hover/focus ──── */
function Index() {
  const { t } = useLang();
  const [active, setActiveRaw] = useState<number | null>(null);
  const [shown, setShown] = useState(0); // the preview keeps the last project shown
  const setActive = (i: number | null) => { setActiveRaw(i); if (i !== null) setShown(i); };
  return (
    <section id="work" className="index" data-chapter="paper" aria-labelledby="work-title">
      <h2 id="work-title" className="section-title" data-reveal>{t(ui.selectedWork)}</h2>
      <p className="index__count tabular" data-reveal style={d(1)}>
        {String(projects.length).padStart(2, "0")} {t({ el: "έργα", en: "projects" })}
      </p>
      <ol className="ledger" data-active={active !== null || undefined} onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <li key={p.slug} className={active === i ? "is-active" : undefined} data-reveal style={d(i)}>
            <Link
              to={`/work/${p.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className="ledger__no tabular">{p.number}</span>
              <span className="ledger__title">{p.title}</span>
              <span className="ledger__kind">{t(p.category)}</span>
              <span className="ledger__year tabular">{p.year ?? ""}</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="ledger__preview" aria-hidden="true">
        {projects.map((p, i) => (
          <Artwork key={p.slug} image={p.cover} sizes="26vw" className={shown === i ? "is-shown" : undefined} />
        ))}
      </div>
    </section>
  );
}

/* ── The exhibition: each remaining project in its own composition ────── */
const LAYOUTS = ["a", "b", "c", "d", "e", "f"];

function Exhibit({ p, layout }: { p: Project; layout: string }) {
  const { t } = useLang();
  const to = `/work/${p.slug}`;
  const id = `exhibit-${p.slug}`;
  return (
    <article className={`exhibit exhibit--${layout}`} aria-labelledby={id}>
      <Link to={to} className="exhibit__media media-link" tabIndex={-1} aria-hidden="true" data-reveal>
        <Artwork image={p.feature} sizes={layout === "c" ? "100vw" : "(min-width: 900px) 55vw, 100vw"} />
      </Link>
      <div className="exhibit__text">
        <p className="numeral numeral--small" data-reveal>{p.number}.</p>
        <h3 id={id} className="exhibit__title" data-reveal style={d(1)}>
          <Link to={to}>{p.title}<span className="dot">.</span></Link>
        </h3>
        <p className="meta-line" data-reveal style={d(2)}>
          {t(p.category)}{p.year ? ` · ${p.year}` : ""}
        </p>
        <p className="exhibit__summary" data-reveal style={d(3)}>{t(p.summary)}</p>
        <Link to={to} className="text-link" data-reveal style={d(4)}>
          {t(ui.viewProject)} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

/* ── About: the belief, the portrait, the record, the original PDF ────── */
function About() {
  const { t } = useLang();
  return (
    <section id="about" className="about" data-chapter="ink" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title" data-reveal>{t({ el: "Σχετικά με εμένα", en: "About me" })}</h2>
      <figure className="about__portrait" data-reveal style={d(1)}>
        <Artwork image={{ src: "about/portrait", alt: { el: "Πορτρέτο της Δήμητρας Μαργιώλα", en: "Portrait of Dimitra Margiola" } }} sizes="(min-width: 900px) 28vw, 80vw" />
      </figure>
      <div className="about__body">
        <p className="statement" data-reveal style={d(2)}>{t(site.belief)}</p>
        <div className="about__bio">
          {site.bio.map((b, i) => <p key={i} data-reveal style={d(3 + i)}>{t(b)}</p>)}
        </div>
        <dl className="facts">
          {site.facts.map((f, i) => (
            <div key={i} className="facts__row" data-reveal style={d(i)}>
              <dt>{t(f.label)}</dt>
              <dd>{t(f.value)}</dd>
              <dd className="tabular facts__when">{typeof f.when === "string" ? f.when : t(f.when)}</dd>
            </div>
          ))}
          <div className="facts__row" data-reveal style={d(3)}>
            <dt>{t(ui.skills)}</dt>
            <dd className="facts__skills">{site.skills.map((s) => t(s)).join(", ")}</dd>
          </div>
        </dl>
        <div className="about__pdf" data-reveal>
          <h3>{t(ui.originalPortfolio)}</h3>
          <p>{t(ui.pdfNote)}</p>
          <PdfLinks />
        </div>
      </div>
    </section>
  );
}

/* ── Contact: the address set as display rows ────────────────────────── */
function Contact() {
  const { t } = useLang();
  const { email, phone, phoneHref } = site.contact;
  const mail = `mailto:${email}?subject=${encodeURIComponent(t(ui.mailSubject))}`;
  return (
    <section id="contact" className="contact" data-chapter="paper" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title contact__title" data-reveal>{t(ui.contact)}</h2>
      <ul className="contact__rows">
        <li data-reveal>
          <a className="contact__big" href={mail}>{email}</a>
        </li>
        <li data-reveal style={d(1)}>
          <a className="contact__big tabular" href={phoneHref} aria-label={`${t(ui.phone)}: ${phone}`}>{phone}</a>
        </li>
        <li className="contact__hello" data-reveal style={d(2)}>
          <span className="contact__big">{t(ui.sayHello)}</span>
          <a className="round-btn" href={mail} aria-label={t(ui.writeMe)}>
            <span aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export function Home() {
  const [first, ...rest] = projects;
  return (
    <>
      <Hero />
      <Featured p={first} />
      <Index />
      <section className="exhibition" data-chapter="paper" aria-label="Projects">
        {rest.map((p, i) => <Exhibit key={p.slug} p={p} layout={LAYOUTS[i % LAYOUTS.length]} />)}
      </section>
      <About />
      <Contact />
    </>
  );
}
