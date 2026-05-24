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
import { ThreeCanvas } from './components/common/ThreeCanvas';

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

  // Bulletproof Scroll Reveal Trigger (Scroll + Resize + Mount snap checks)
  useEffect(() => {
    const handleReveal = () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Element is intersecting the viewport (with 40px buffer)
        const isVisible = rect.top < window.innerHeight - 40 && rect.bottom > 40;
        if (isVisible) {
          el.classList.add('visible');
        }
      });
    };

    handleReveal();
    window.addEventListener('scroll', handleReveal, { passive: true });
    window.addEventListener('resize', handleReveal);
    
    // Run after HMR or snap paint completes
    const timer = setTimeout(handleReveal, 150);

    return () => {
      window.removeEventListener('scroll', handleReveal);
      window.removeEventListener('resize', handleReveal);
      clearTimeout(timer);
    };
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <>
      {/* Background WebGL Scene */}
      <ThreeCanvas />

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
