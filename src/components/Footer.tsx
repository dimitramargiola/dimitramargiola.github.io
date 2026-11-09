import { site, ui } from "../data/site";
import { useLang } from "../lib/i18n";
import { pdfUrl, PdfLinks } from "./Pdf";

/** The close: an echo of the last page of the printed portfolio, and the name cut by the edge. */
export function Footer() {
  const { t, lang } = useLang();
  const { email, phone, phoneHref } = site.contact;
  const last = site.heroLines[lang][1].replace(/\.$/, "");
  return (
    <footer className="site-footer" data-chapter="ink">
      <div className="site-footer__top">
        <div className="site-footer__close">
          <p className="site-footer__title">Portfolio<span className="dot">.</span> 2026</p>
          <p className="site-footer__sub">{t(site.name)} — {t(site.role)}</p>
          <PdfLinks className="pdf-links--light" />
        </div>
        <ul className="site-footer__links">
          <li><a href={`mailto:${email}`}>{email}</a></li>
          <li><a href={phoneHref} className="tabular">{phone}</a></li>
          <li><a href={pdfUrl()} target="_blank" rel="noopener">{t(ui.originalPortfolio)} <span aria-hidden="true">↗</span></a></li>
        </ul>
      </div>
      <div className="site-footer__legal">
        <span>© 2026 {t(site.name)}</span>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); document.getElementById("main")?.focus({ preventScroll: true }); }}>
          {t(ui.backToTop)} <span aria-hidden="true">↑</span>
        </a>
      </div>
      <p className="site-footer__name" aria-hidden="true">{last}<span className="dot">.</span></p>
    </footer>
  );
}
