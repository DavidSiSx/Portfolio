import React from 'react';

interface SkillsProps {
  t: {
    eyebrow: string;
    title: string;
    groups: {
      name: string;
      tags: string[];
    }[];
  };
}

export const Skills: React.FC<SkillsProps> = ({ t }) => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section__header reveal">
          <p className="section__eyebrow">{t.eyebrow}</p>
          <h2 className="section__title">{t.title}</h2>
        </div>
        <div className="skills-grid">
          {t.groups.map((group, index) => (
            <div key={group.name} className={`skill-group reveal reveal-delay-${index + 1}`}>
              <h3 className="skill-group__title">{group.name}</h3>
              <div className="skill-group__tags">
                {group.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
