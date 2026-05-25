import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from './data/content';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = content[lang];

  useEffect(() => {
    // Show navbar when scrolling past the hero section
    const showNavTrigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 10%',
      onEnter: () => document.querySelector('.nav')?.classList.add('visible'),
      onLeaveBack: () => document.querySelector('.nav')?.classList.remove('visible'),
    });

    return () => {
      showNavTrigger.kill();
    };
  }, []);

  const toggleLang = () => {
    setLang(prev => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <>
      {/* Navigation */}
      <Navbar lang={lang} toggleLang={toggleLang} t={t.nav} />

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
