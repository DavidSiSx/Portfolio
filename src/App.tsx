import { useState, useEffect } from 'react';
import './App.css';
import { content } from './data/content';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [scrolled, setScrolled] = useState(false);

  const t = content[lang];

  // Track scroll to show navbar only when the "Sobre Mí" (#about) section is visible/reached
  useEffect(() => {
    const handleScroll = () => {
      const about = document.getElementById('about');
      if (about) {
        const rect = about.getBoundingClientRect();
        // Show navbar when the top of the #about section is within 100px from the top of the viewport
        setScrolled(rect.top <= 100);
      } else {
        setScrolled(window.scrollY > window.innerHeight - 64);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Intersection Observer for scroll reveal effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <>
      {/* Navigation */}
      <Navbar lang={lang} toggleLang={toggleLang} scrolled={scrolled} t={t.nav} />

      {/* Sections */}
      <Hero t={t.hero} />
      <About t={t.about} />
      <Skills t={t.skills} />
      <Projects t={t.projects} />
      <Contact t={t.contact} />

      {/* Footer */}
      <Footer text={t.footer} />
    </>
  );
}
