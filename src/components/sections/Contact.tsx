import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubIcon, MailIcon } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  t: {
    title: string;
    description: string;
    github: string;
    email: string;
  };
}

export const Contact: React.FC<ContactProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const bgText = bgTextRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      // Giant background text parallax
      if (bgText) {
        gsap.set(bgText, { xPercent: -50, yPercent: -50 });
        const tlText = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          }
        });
        tlText.fromTo(bgText,
          { y: -150, xPercent: -50, yPercent: -50 },
          { y: 150, ease: 'none', xPercent: -50, yPercent: -50 },
          0
        );
        tlText.fromTo(bgText,
          { opacity: 0 },
          { opacity: 0.015, duration: 0.2, ease: 'power1.out' },
          0
        );
        tlText.to(bgText,
          { opacity: 0, duration: 0.2, ease: 'power1.in' },
          0.8
        );
      }
      // Card emerges from below
      gsap.fromTo(
        card,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );

      // Decorative lines float upwards
      const lines = section.querySelectorAll('.contact__deco-line');
      gsap.fromTo(
        lines,
        { y: 60, opacity: 0 },
        {
          y: -20,
          opacity: 0.15,
          stagger: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      {/* Parallax Background Giant Text */}
      <div className="contact__bg-text" ref={bgTextRef}>
        CONTACT
      </div>

      <div className="contact__gradient"></div>

      {/* Decorative lines */}
      <div className="contact__deco-line contact__deco-line--left"></div>
      <div className="contact__deco-line contact__deco-line--right"></div>

      <div className="contact__card" ref={cardRef}>
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
    </section>
  );
};
