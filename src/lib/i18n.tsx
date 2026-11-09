import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react";
import type { L } from "../data/projects";
import { switchPrefix, useRoute } from "./router";

export type Lang = "el" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: L) => string };
const LangContext = createContext<Ctx | null>(null);

/** The language comes from the URL: /el/… is Greek, /en/… and everything else is English. */
export function LangProvider({ children }: { children: ReactNode }) {
  const { prefix } = useRoute();
  const lang: Lang = prefix === "el" ? "el" : "en";
  const setLang = useCallback((l: Lang) => switchPrefix(l), []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const t = useCallback((s: L) => s[lang], [lang]);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang outside LangProvider");
  return c;
}
