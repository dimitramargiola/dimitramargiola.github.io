import { site, ui } from "../data/site";
import { useLang } from "../lib/i18n";
import { asset } from "../lib/router";

export const pdfUrl = () => asset(site.pdf.file);

/** "View PDF" opens the original portfolio in a new tab; "Download PDF" saves it. */
export function PdfLinks({ className = "" }: { className?: string }) {
  const { t } = useLang();
  return (
    <div className={`pdf-links ${className}`}>
      <a className="btn" href={pdfUrl()} target="_blank" rel="noopener">
        {t(ui.viewPdf)} <span aria-hidden="true">↗</span>
      </a>
      <a className="btn btn--ghost" href={pdfUrl()} download={site.pdf.downloadName}>
        {t(ui.downloadPdf)} <span aria-hidden="true">↓</span>
        <span className="btn__note">{site.pdf.sizeLabel}</span>
      </a>
    </div>
  );
}
