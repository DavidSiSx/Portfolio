import React from 'react';

interface AboutProps {
  t: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

export const About: React.FC<AboutProps> = ({ t }) => {
  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <div className="section__header reveal">
          <p className="section__eyebrow">{t.eyebrow}</p>
          <h2 className="section__title">{t.title}</h2>
          <p className="section__description">{t.description}</p>
        </div>
      </div>
    </section>
  );
};
