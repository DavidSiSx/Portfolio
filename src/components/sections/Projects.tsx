import React from 'react';
import { ArrowRightIcon } from '../common/Icons';

interface ProjectsProps {
  t: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      badge: string;
      badgeLabel: string;
      desc: string;
      tech: string[];
      url: string;
    }[];
  };
}

export const Projects: React.FC<ProjectsProps> = ({ t }) => {
  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">{t.eyebrow}</p>
          <h2 className="section__title">{t.title}</h2>
        </div>
        <div className="projects-grid">
          {t.items.map(project => (
            <article key={project.title} className="project-card">
              <div className="project-card__preview">
                <span className="project-card__preview-label">Preview</span>
              </div>
              <div className="project-card__body">
                <span className={`project-card__badge project-card__badge--${project.badge}`}>
                  {project.badgeLabel}
                </span>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
                <div className="project-card__tech">
                  {project.tech.map(techName => (
                    <span key={techName} className="project-card__tech-tag">{techName}</span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  GitHub <ArrowRightIcon width={14} height={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
