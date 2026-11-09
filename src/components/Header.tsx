import { useEffect, useRef, useState } from "react";
import { site, ui } from "../data/site";
import { useLang, type Lang } from "../lib/i18n";
import { Link, usePath } from "../lib/router";
import { PdfLinks, pdfUrl } from "./Pdf";

function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang" role="group" aria-label={t(ui.language)}>
      {(["el", "en"] as Lang[]).map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} lang={l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const path = usePath();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); menuBtn.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { to: "/#work", label: t(ui.work) },
    { to: "/#about", label: t(ui.about) },
    { to: "/#contact", label: t(ui.contact) },
  ];

  return (
    <header className="site-header" data-on="paper" data-open={open || undefined}>
      <a className="skip" href="#main">{t(ui.skip)}</a>
      <div className="site-header__bar">
        <Link to="/" className="wordmark" aria-label={`${t(site.name)} — ${t(ui.home)}`}>
          {t(site.name)}<span className="dot">.</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          <a href={pdfUrl()} target="_blank" rel="noopener">PDF <span aria-hidden="true">↗</span></a>
        </nav>
        <LangSwitch />
        <button
          ref={menuBtn}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? t(ui.close) : t(ui.menu)}
        </button>
      </div>
      <div id="menu" className="menu" hidden={!open}>
        <nav aria-label="Menu">
          {links.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>)}
        </nav>
        <div className="menu__foot">
          <p>{t(ui.originalPortfolio)}</p>
          <PdfLinks />
        </div>
      </div>
    </header>
  );
}
