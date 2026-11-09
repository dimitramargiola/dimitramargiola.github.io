import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Img } from "../data/projects";
import { ui } from "../data/site";
import { useLang } from "../lib/i18n";
import { largest, meta } from "./Artwork";

type Ctx = { open: (list: Img[], index: number) => void };
const LightboxContext = createContext<Ctx>({ open: () => {} });
export const useLightbox = () => useContext(LightboxContext);

/** Full-resolution viewer for close inspection of the artwork.
    Native <dialog>: focus is trapped, Esc closes, focus returns to the opener. */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const { t } = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  const [list, setList] = useState<Img[]>([]);
  const [i, setI] = useState(0);
  const touch = useRef<number | null>(null);

  const open = useCallback((l: Img[], index: number) => {
    setList(l); setI(index);
    ref.current?.showModal();
    document.documentElement.classList.add("is-locked");
  }, []);
  const close = () => ref.current?.close();
  const go = useCallback((d: number) => setI((x) => (list.length ? (x + d + list.length) % list.length : 0)), [list.length]);

  useEffect(() => {
    const dlg = ref.current!;
    const onClose = () => document.documentElement.classList.remove("is-locked");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    };
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("keydown", onKey);
    return () => { dlg.removeEventListener("close", onClose); dlg.removeEventListener("keydown", onKey); };
  }, [go]);

  const item = list[i];
  const m = item ? meta(item.src) : null;
  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        className="lightbox"
        aria-label={item ? t(item.alt) : undefined}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        {item && m && (
          <>
            <figure className="lightbox__figure" key={item.src}>
              <img src={largest(item.src)} width={m.w} height={m.h} alt={t(item.alt)} />
              <figcaption>
                <span>{t(item.caption ?? item.alt)}</span>
                {list.length > 1 && <span className="tabular">{i + 1} / {list.length}</span>}
              </figcaption>
            </figure>
            <div className="lightbox__bar">
              {list.length > 1 && (
                <>
                  <button type="button" className="lightbox__btn" onClick={() => go(-1)}>
                    <span aria-hidden="true">←</span> {t(ui.previous)}
                  </button>
                  <button type="button" className="lightbox__btn" onClick={() => go(1)}>
                    {t(ui.nextImage)} <span aria-hidden="true">→</span>
                  </button>
                </>
              )}
              <button type="button" className="lightbox__btn lightbox__close" onClick={close} autoFocus>
                {t(ui.close)} <span aria-hidden="true">×</span>
              </button>
            </div>
          </>
        )}
      </dialog>
    </LightboxContext.Provider>
  );
}
