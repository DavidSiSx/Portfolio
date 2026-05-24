import React from 'react';

interface NavbarProps {
  lang: 'es' | 'en';
  toggleLang: () => void;
  scrolled: boolean;
  t: {
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ lang, toggleLang, scrolled, t }) => {
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#" className="nav__brand">
          David<span>.</span>
        </a>

        <div className="nav__links">
          <a href="#about" className="nav__link">{t.about}</a>
          <a href="#skills" className="nav__link">{t.skills}</a>
          <a href="#projects" className="nav__link">{t.projects}</a>
          <a href="#contact" className="nav__link">{t.contact}</a>
          <button
            className="nav__lang-btn"
            onClick={toggleLang}
            aria-label="Toggle language"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>

        <button className="nav__mobile-toggle" aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};
