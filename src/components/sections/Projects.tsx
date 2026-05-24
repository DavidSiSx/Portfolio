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
    <>
      {t.items.map((project, index) => {
        const isRightAligned = index % 2 !== 0;
        return (
          <section
            key={project.title}
            id={index === 0 ? 'projects' : `project-${index}`}
            className={`project-section ${isRightAligned ? 'project-section--right' : ''}`}
          >
            <div className="container project-section__container">
              <div className="project-section__content reveal">
                <span className="project-section__eyebrow">
                  {t.eyebrow} — 0{index + 1}
                </span>
                <span className={`project-card__badge project-card__badge--${project.badge}`}>
                  {project.badgeLabel}
                </span>
                <h2 className="project-section__title">{project.title}</h2>
                <p className="project-section__desc">{project.desc}</p>
                <div className="project-card__tech">
                  {project.tech.map((techName) => (
                    <span key={techName} className="project-card__tech-tag">
                      {techName}
                    </span>
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

              <div className="project-section__visual reveal reveal-delay-2">
                <div className="project-card__preview">
                  <span className="project-card__preview-label">Preview Active</span>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};
