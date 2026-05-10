import Image from "next/image";
import { CopyEmailButton } from "./copy-email-button";
import { actions, bio, portfolioProjects } from "./portfolio-content";
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

        <section className="projects-section" aria-label="Project visuals">
          {portfolioProjects.map((project, projectIndex) => (
            <section className="project-group" key={project.title} aria-labelledby={`project-${project.title}`}>
              <h2 className="project-title" id={`project-${project.title}`}>
                {project.title}
              </h2>
              <div className="portfolio-gallery">
                {project.shots.map((shot, shotIndex) => (
                  <ProjectLightbox
                    key={shot.title}
                    title={shot.title}
                    image={shot.image}
                    darkImage={shot.darkImage}
                    width={shot.width}
                    height={shot.height}
                    priority={projectIndex === 0 && shotIndex === 0}
                  />
                ))}
              </div>
            </section>
          ))}
        </section>
      </section>
    </main>
  );
}
