import { useEffect } from "react";

/** Reveals every [data-reveal] element once as it enters the viewport.
    Content is only hidden when <html> has the "js" class (set in index.html),
    so nothing stays invisible if scripts fail. */
export function useReveal(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    // Jumps (anchor links, fast flicks) can carry elements past the viewport without
    // ever intersecting it; reveal anything whose top is already above the bottom edge.
    let raf = 0;
    const sweep = () => {
      raf = 0;
      const limit = window.innerHeight * 0.95;
      for (const e of els) {
        if (!e.classList.contains("is-in") && e.getBoundingClientRect().top < limit) {
          e.classList.add("is-in"); io.unobserve(e);
        }
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sweep); };
    window.addEventListener("scroll", onScroll, { passive: true });
    sweep();
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [dep]);
}

/** Tells the fixed header which chapter colour is underneath it. */
export function useChapterInk(dep: unknown) {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;
    let raf = 0;
    const probe = () => {
      raf = 0;
      const y = header.offsetHeight / 2;
      let ink = "paper";
      for (const el of document.querySelectorAll<HTMLElement>("[data-chapter]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) ink = el.dataset.chapter!;
      }
      header.dataset.on = ink;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(probe); };
    probe();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [dep]);
}
