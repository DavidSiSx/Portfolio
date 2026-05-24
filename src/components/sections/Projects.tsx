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

const PROJECT_THEMES = [
  { // Hexacore - Cyan
    '--project-accent': '#00E5FF',
    '--project-border': 'rgba(0, 229, 255, 0.3)',
    '--project-border-hover': 'rgba(0, 229, 255, 0.6)',
    '--project-glow': 'rgba(0, 229, 255, 0.12)',
    '--project-badge-bg': 'rgba(0, 229, 255, 0.1)',
  },
  { // Invitaciones XV - Pink
    '--project-accent': '#FF69B4',
    '--project-border': 'rgba(255, 105, 180, 0.3)',
    '--project-border-hover': 'rgba(255, 105, 180, 0.6)',
    '--project-glow': 'rgba(255, 105, 180, 0.12)',
    '--project-badge-bg': 'rgba(255, 105, 180, 0.1)',
  },
  { // Smart Farm - Lime Green
    '--project-accent': '#AEEA00',
    '--project-border': 'rgba(174, 234, 0, 0.3)',
    '--project-border-hover': 'rgba(174, 234, 0, 0.6)',
    '--project-glow': 'rgba(174, 234, 0, 0.12)',
    '--project-badge-bg': 'rgba(174, 234, 0, 0.1)',
  },
  { // Zotz Barber - Amber / Red
    '--project-accent': '#FF3366',
    '--project-border': 'rgba(255, 51, 102, 0.3)',
    '--project-border-hover': 'rgba(255, 51, 102, 0.6)',
    '--project-glow': 'rgba(255, 51, 102, 0.12)',
    '--project-badge-bg': 'rgba(255, 51, 102, 0.1)',
  },
  { // AI Dashboard - Neon Emerald
    '--project-accent': '#00FFCC',
    '--project-border': 'rgba(0, 255, 204, 0.3)',
    '--project-border-hover': 'rgba(0, 255, 204, 0.6)',
    '--project-glow': 'rgba(0, 255, 204, 0.12)',
    '--project-badge-bg': 'rgba(0, 255, 204, 0.1)',
  }
];

export const Projects: React.FC<ProjectsProps> = ({ t }) => {
  return (
    <>
      {t.items.map((project, index) => {
        const isRightAligned = index % 2 === 0;
        const themeStyles = PROJECT_THEMES[index % PROJECT_THEMES.length];
        return (
          <section
            key={project.title}
            id={index === 0 ? 'projects' : `project-${index}`}
            className={`project-section ${isRightAligned ? 'project-section--right' : ''}`}
            style={themeStyles as React.CSSProperties}
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
