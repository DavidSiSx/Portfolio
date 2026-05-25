import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  t: {
    status: string;
    title: string;
    subtitle: string;
    scrollText: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const bgText = bgTextRef.current;
    if (!section || !card || !bgText) return;

    const ctx = gsap.context(() => {
      // Player card shrinks and fades as user scrolls past hero
      gsap.to(card, {
        scale: 0.85,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Background text parallax — moves slower than scroll
      gsap.to(bgText, {
        y: -200,
        opacity: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero__bg-text" ref={bgTextRef}>SIERRA SOSA</div>

      <div className="hero__player-card" ref={cardRef}>
        <div className="hero__album-wrapper">
          <div className="hero__album-glow"></div>
          <img src="/preview.gif" alt="Portfolio Live Preview" className="hero__album-art" />
        </div>

        <div className="hero__player-body">
          <div className="hero__track-info">
            <div className="hero__track-meta">
              <span className="hero__track-status">{t.status}</span>
              <h1 className="hero__track-title">{t.title}</h1>
              <p className="hero__track-artist">{t.subtitle}</p>
            </div>
            <button className="hero__track-like" aria-label="Like track">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          {/* Progress Area */}
          <div className="hero__player-progress">
            <div className="hero__progress-bar">
              <div className="hero__progress-fill"></div>
            </div>
            <div className="hero__player-time">
              <span>0:26</span>
              <span>20:26</span>
            </div>
          </div>

          {/* Controls */}
          <div className="hero__player-controls">
            <button className="player-control-btn" aria-label="Shuffle">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </button>

            <button className="player-control-btn" aria-label="Previous">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <polygon points="19,20 9,12 19,4" />
                <rect x="5" y="4" width="2" height="16" />
              </svg>
            </button>

            <button className="player-control-btn player-control-btn--play" aria-label="Play">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>

            <button className="player-control-btn" aria-label="Next">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <polygon points="5,4 15,12 5,20" />
                <rect x="17" y="4" width="2" height="16" />
              </svg>
            </button>

            <button className="player-control-btn" aria-label="Repeat">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14M7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-down">
        <span>{t.scrollText}</span>
        <div className="hero__scroll-indicator-arrow">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};
