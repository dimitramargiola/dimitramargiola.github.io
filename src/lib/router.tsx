/* A tiny History-API router.

   URLs (relative to Vite's BASE_URL, so the site works at user.github.io/<repo>/ and on a custom domain):
     /                 English (default)
     /en/  /el/        English / Greek — shareable; /EN and /EL also work
     /<lang>/work/<slug>   a project page

   The language prefix is kept on every internal link, so a visitor who arrives on /el/ stays in Greek. */
import { useEffect, useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from "react";

export const BASE = import.meta.env.BASE_URL; // always ends with "/"
export type Prefix = "" | "en" | "el";
type Route = { prefix: Prefix; path: string };

const listeners = new Set<() => void>();
let route: Route = parse();

function parse(): Route {
  let p = decodeURI(window.location.pathname);
  const base = BASE.replace(/\/$/, "");
  if (base && p.toLowerCase().startsWith(base.toLowerCase())) p = p.slice(base.length);
  if (!p.startsWith("/")) p = "/" + p;
  const m = p.match(/^\/(el|en)(?=\/|$)/i);
  const prefix = (m ? m[1].toLowerCase() : "") as Prefix;
  let path = (m ? p.slice(m[0].length) : p) || "/";
  path = path.replace(/\/index\.html$/, "/").replace(/(.)\/$/, "$1");
  // /EL/… → /el/… so shared links look tidy
  if (m && m[1] !== prefix) history.replaceState(null, "", build(prefix, path) + location.hash);
  return { prefix, path };
}

function build(prefix: Prefix, path: string) {
  const rest = path.replace(/^\//, "");
  return BASE + (prefix ? prefix + "/" : "") + rest;
}

function emit() {
  route = parse();
  listeners.forEach((l) => l());
}

/** Internal link target, keeping the current language prefix. */
export const href = (to: string) => build(route.prefix, to);
export const asset = (path: string) => BASE + path.replace(/^\//, "");

function scrollToHash(hash: string, smooth: boolean) {
  if (!hash) { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); return; }
  const el = document.getElementById(hash.slice(1));
  if (el) el.scrollIntoView({ behavior: smooth ? "smooth" : ("instant" as ScrollBehavior), block: "start" });
}

export function navigate(to: string) {
  const [path, hashPart] = to.split("#");
  const hash = hashPart ? "#" + hashPart : "";
  const target = href(path || "/") + hash;
  if (!path || path === route.path) {
    history.pushState(null, "", target);
    scrollToHash(hash, true);
    return;
  }
  const swap = () => { history.pushState(null, "", target); emit(); };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduce) doc.startViewTransition(swap);
  else swap();
}

/** Switch language in place: same page, same scroll position, new URL prefix. */
export function switchPrefix(prefix: Prefix) {
  history.pushState(null, "", build(prefix, route.path) + location.hash);
  emit();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  window.addEventListener("popstate", emit);
  return () => { listeners.delete(l); window.removeEventListener("popstate", emit); };
};

export function useRoute() {
  return useSyncExternalStore(subscribe, () => route);
}

export function usePath() {
  const { path } = useRoute();
  // After a page change, honour the hash or start at the top (a language switch keeps the position).
  useEffect(() => {
    const id = requestAnimationFrame(() => scrollToHash(window.location.hash, false));
    return () => cancelAnimationFrame(id);
  }, [path]);
  return path;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };
export function Link({ to, onClick, ...rest }: LinkProps) {
  useRoute(); // re-render when the language prefix changes
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  const [p, h] = to.split("#");
  return <a href={href(p || "/") + (h ? "#" + h : "")} onClick={handle} {...rest} />;
}
