import Image from "next/image";
import { CopyEmailButton } from "./copy-email-button";
import { EnterAnimation, PortfolioMotion } from "./motion-components";
import { actions, bio, portfolioProjects } from "./portfolio-content";
import { ProjectLightbox } from "./project-lightbox";
import { ThemeSwitcher } from "./theme-switcher";

export default function Home() {
  return (
    <main className="page-shell">
      <PortfolioMotion>
        <EnterAnimation stagger={1} className="top-row">
          <Image
            className="avatar"
            src="/avatar.png"
            alt="Portrait of Alex Lohinov"
            width={40}
            height={40}
            priority
          />
          <ThemeSwitcher />
        </EnterAnimation>

        <EnterAnimation as="header" stagger={2} className="identity">
          <h1 className="identity-name">Alex Lohinov</h1>
          <p className="identity-position">Product Designer</p>
        </EnterAnimation>

        <EnterAnimation stagger={3} className="bio">
          {bio.map((item) => (
            <p key={item} className="bio-text">
              {item}
            </p>
          ))}
        </EnterAnimation>

        <EnterAnimation as="nav" stagger={4} className="actions" ariaLabel="Social links">
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
        </EnterAnimation>

        <section className="projects-section" aria-label="Project visuals">
          {portfolioProjects.map((project, projectIndex) => (
            <EnterAnimation
              as="section"
              className="project-group"
              key={project.title}
              stagger={5 + projectIndex}
              ariaLabel={`${project.title} visuals`}
              dataProject={project.title.toLowerCase()}
            >
              <div className="portfolio-gallery">
                {project.shots.map((shot, shotIndex) => (
                  <ProjectLightbox
                    key={shot.title}
                    title={shot.title}
                    image={shot.image}
                    darkImage={shot.darkImage}
                    width={shot.width}
                    height={shot.height}
                  />
                ))}
              </div>
            </EnterAnimation>
          ))}
        </section>
      </PortfolioMotion>
    </main>
  );
}
