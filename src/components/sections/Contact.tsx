import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubIcon, MailIcon, LinkedinIcon } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  t: {
    title: string;
    description: string;
    github: string;
    email: string;
    linkedin: string;
  };
}

export const Contact: React.FC<ContactProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      // Cassette tape emerges with a 3D perspective tilt
      gsap.fromTo(
        card,
        {
          y: 90,
          opacity: 0,
          transform: 'perspective(1000px) rotateX(15deg) scale(0.96)',
        },
        {
          y: 0,
          opacity: 1,
          transform: 'perspective(1000px) rotateX(0deg) scale(1)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
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
          y: -40,
          opacity: 0.2,
          stagger: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
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
      <div className="contact__gradient"></div>

      {/* Decorative lines */}
      <div className="contact__deco-line contact__deco-line--left"></div>
      <div className="contact__deco-line contact__deco-line--right"></div>

      <div className="contact__container">
        {/* Cassette Tape Card wrapper */}
        <div className="contact__cassette-wrap" ref={cardRef}>
          <div className="contact__cassette">
            {/* Cassette shell top lines */}
            <div className="contact__cassette-top">
              <span className="contact__cassette-format">C-90</span>
              <span className="contact__cassette-noise">NR [DOLBY SYSTEM]</span>
            </div>

            {/* Paper label on the tape */}
            <div className="contact__cassette-label">
              <div className="contact__label-header">
                <span className="contact__label-side">A</span>
                <span className="contact__label-brand">CHROME TAPE</span>
              </div>
              
              <div className="contact__label-content">
                <h2 className="contact__label-title">{t.title}</h2>
                <p className="contact__label-desc">{t.description}</p>
              </div>

              {/* Tape Reels Center Window */}
              <div className="contact__cassette-window">
                <div className="contact__window-reel">
                  <div className="contact__window-spindle"></div>
                </div>
                <div className="contact__window-reel">
                  <div className="contact__window-spindle"></div>
                </div>
              </div>
            </div>

            {/* Cassette bottom shell cutout */}
            <div className="contact__cassette-bottom-plate">
              <div className="contact__bottom-screw"></div>
              <div className="contact__bottom-screw"></div>
            </div>
          </div>

          {/* Tape Deck Control buttons */}
          <div className="contact__controls-board">
            <a
              href="mailto:davidsierrasosa01@gmail.com"
              className="contact__deck-btn contact__deck-btn--record"
              title={t.email}
            >
              <div className="contact__btn-cap">
                <MailIcon width={14} height={14} className="contact__btn-svg" />
                <span className="contact__btn-text">REC</span>
              </div>
              <span className="contact__deck-label">{t.email}</span>
            </a>

            <a
              href="https://www.linkedin.com/in/david-sierra-sosa-522297356/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__deck-btn contact__deck-btn--play"
              title={t.linkedin}
            >
              <div className="contact__btn-cap">
                <LinkedinIcon width={14} height={14} className="contact__btn-svg" />
                <span className="contact__btn-text">PLAY</span>
              </div>
              <span className="contact__deck-label">{t.linkedin}</span>
            </a>

            <a
              href="https://github.com/DavidSiSx"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__deck-btn contact__deck-btn--ff"
              title={t.github}
            >
              <div className="contact__btn-cap">
                <GithubIcon width={14} height={14} className="contact__btn-svg" />
                <span className="contact__btn-text">FF</span>
              </div>
              <span className="contact__deck-label">{t.github}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
