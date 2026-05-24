import React from 'react';
import { GithubIcon, MailIcon } from '../common/Icons';

interface ContactProps {
  t: {
    title: string;
    description: string;
    github: string;
    email: string;
  };
}

export const Contact: React.FC<ContactProps> = ({ t }) => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact__card reveal">
          <h2>{t.title}</h2>
          <p>{t.description}</p>
          <div className="contact__links">
            <a
              href="https://github.com/DavidSiSx"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <GithubIcon width={16} height={16} /> {t.github}
            </a>
            <a href="mailto:davidsierrasosa01@gmail.com" className="btn btn--secondary">
              <MailIcon width={16} height={16} /> {t.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
