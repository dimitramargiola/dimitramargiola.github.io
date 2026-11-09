import { useEffect } from "react";
import { projectBySlug } from "./data/projects";
import { site, ui } from "./data/site";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { LightboxProvider } from "./components/Lightbox";
import { ProjectPage } from "./components/ProjectPage";
import { LangProvider, useLang } from "./lib/i18n";
import { useChapterInk, useReveal } from "./lib/motion";
import { Link, usePath } from "./lib/router";

function Routes() {
  const path = usePath();
  const { t, lang } = useLang();
  const slug = path.match(/^\/work\/([^/]+)$/)?.[1];
  const project = slug ? projectBySlug(slug) : undefined;
  const isHome = path === "/";

  useReveal(`${path}|${lang}`);
  useChapterInk(path);
  useEffect(() => {
    document.title = project ? `${project.title} — ${t(site.name)}` : t(site.seo.title);
    document.querySelector('meta[name="description"]')?.setAttribute("content", project ? t(project.summary) : t(site.seo.description));
  }, [project, t]);

  return (
    <main id="main" tabIndex={-1} key={path}>
      {isHome ? <Home /> : project ? <ProjectPage project={project} /> : (
        <section className="not-found" data-chapter="paper">
          <h1 className="section-title">404<span className="dot">.</span></h1>
          <p className="lead">{t(ui.notFound)}</p>
          <Link to="/" className="btn">{t(ui.home)} <span aria-hidden="true">→</span></Link>
        </section>
      )}
    </main>
  );
}

export default function App() {
  return (
    <LangProvider>
      <LightboxProvider>
        <Header />
        <Routes />
        <Footer />
      </LightboxProvider>
    </LangProvider>
  );
}
