import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { content } from './data/content';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = content[lang];

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    (window as any).lenis = lenis;

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis raf
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    // Show navbar when scrolling past the hero section
    const showNavTrigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 10%',
      onEnter: () => document.querySelector('.nav')?.classList.add('visible'),
      onLeaveBack: () => document.querySelector('.nav')?.classList.remove('visible'),
    });

    return () => {
      showNavTrigger.kill();
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      delete (window as any).lenis;
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
    </>
  );
}
