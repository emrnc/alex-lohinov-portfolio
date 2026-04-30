import Image from "next/image";
import { CopyEmailButton } from "./copy-email-button";
import { actions, bio, projects } from "./portfolio-content";
import { ProjectLightbox } from "./project-lightbox";
import { ThemeSwitcher } from "./theme-switcher";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="portfolio-card" aria-label="Portfolio">
        <div className="top-row">
          <Image
            className="avatar"
            src="/avatar.png"
            alt="Portrait of Alex Lohinov"
            width={40}
            height={40}
            priority
          />
          <ThemeSwitcher />
        </div>

        <header className="identity">
          <h1 className="identity-name">Alex Lohinov</h1>
          <p className="identity-position">Product Designer</p>
        </header>

        <div className="bio">
          {bio.map((item) => (
            <p key={item} className="bio-text">
              {item}
            </p>
          ))}
        </div>

        <nav className="actions" aria-label="Social links">
          <CopyEmailButton email="hello.lohinov@gmail.com" />
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              aria-label={action.label}
              className="action-link action-link-secondary"
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {action.label}
            </a>
          ))}
        </nav>

        <section className="projects-section" aria-label="Projects">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-copy">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
              </div>

              <ProjectLightbox title={project.title} image={project.image} darkImage={project.darkImage} />
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
