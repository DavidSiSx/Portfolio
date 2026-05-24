import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRightIcon } from '../common/Icons';
import { PokeBattle } from '../common/PokeBattle';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  t: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      badge: string;
      badgeLabel: string;
      desc: string;
      tech: string[];
      url: string;
    }[];
  };
}

const PROJECT_THEMES = [
  { // Hexacore - Grass Route Green
    '--project-accent': '#a8e356',
    '--project-border': 'rgba(120, 200, 80, 0.4)',
    '--project-border-hover': 'rgba(120, 200, 80, 0.8)',
    '--project-glow': 'rgba(120, 200, 80, 0.15)',
    '--project-badge-bg': 'rgba(120, 200, 80, 0.15)',
  },
  { // Invitaciones XV - Pink
    '--project-accent': '#FF69B4',
    '--project-border': 'rgba(255, 105, 180, 0.3)',
    '--project-border-hover': 'rgba(255, 105, 180, 0.6)',
    '--project-glow': 'rgba(255, 105, 180, 0.12)',
    '--project-badge-bg': 'rgba(255, 105, 180, 0.1)',
  },
  { // Smart Farm - Lime Green
    '--project-accent': '#AEEA00',
    '--project-border': 'rgba(174, 234, 0, 0.3)',
    '--project-border-hover': 'rgba(174, 234, 0, 0.6)',
    '--project-glow': 'rgba(174, 234, 0, 0.12)',
    '--project-badge-bg': 'rgba(174, 234, 0, 0.1)',
  },
  { // Zotz Barber - Amber / Red
    '--project-accent': '#FF3366',
    '--project-border': 'rgba(255, 51, 102, 0.3)',
    '--project-border-hover': 'rgba(255, 51, 102, 0.6)',
    '--project-glow': 'rgba(255, 51, 102, 0.12)',
    '--project-badge-bg': 'rgba(255, 51, 102, 0.1)',
  },
  { // AI Dashboard - Neon Emerald
    '--project-accent': '#00FFCC',
    '--project-border': 'rgba(0, 255, 204, 0.3)',
    '--project-border-hover': 'rgba(0, 255, 204, 0.6)',
    '--project-glow': 'rgba(0, 255, 204, 0.12)',
    '--project-badge-bg': 'rgba(0, 255, 204, 0.1)',
  }
];

const ProjectSleeveArt: React.FC<{ index: number }> = ({ index }) => {
  switch (index) {
    case 1: // Invitaciones XV
      return (
        <svg className="projects__sleeve-svg" viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <radialGradient id="pinkGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4d122b" />
              <stop offset="100%" stopColor="#1a060f" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#pinkGrad)" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#FF69B4" strokeWidth="0.3" strokeDasharray="3 3" opacity="0.3" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#FF69B4" strokeWidth="0.5" opacity="0.2" />
          <polygon points="50,15 54,34 73,34 58,45 64,64 50,53 36,64 42,45 27,34 46,34" fill="none" stroke="#FF69B4" strokeWidth="0.8" opacity="0.6" />
          <text x="50" y="82" textAnchor="middle" fill="#FF69B4" fontSize="5" fontFamily="var(--font-mono)" letterSpacing="2" opacity="0.8">XV SPECIAL EDITION</text>
        </svg>
      );
    case 2: // Gestor Agrícola
      return (
        <svg className="projects__sleeve-svg" viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <radialGradient id="farmGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1b2e0c" />
              <stop offset="100%" stopColor="#081003" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#farmGrad)" />
          <path d="M -10,30 Q 30,20 40,60 T 110,50" fill="none" stroke="#AEEA00" strokeWidth="0.4" opacity="0.2" />
          <path d="M -10,45 Q 30,35 40,75 T 110,65" fill="none" stroke="#AEEA00" strokeWidth="0.4" opacity="0.3" />
          <path d="M -10,60 Q 30,50 40,90 T 110,80" fill="none" stroke="#AEEA00" strokeWidth="0.4" opacity="0.4" />
          <text x="50" y="82" textAnchor="middle" fill="#AEEA00" fontSize="5" fontFamily="var(--font-mono)" letterSpacing="2" opacity="0.8">SMART FARM IoT</text>
        </svg>
      );
    case 3: // Zotz Barber
      return (
        <svg className="projects__sleeve-svg" viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <radialGradient id="barberGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3d0e19" />
              <stop offset="100%" stopColor="#140307" />
            </radialGradient>
            <pattern id="barberStripes" width="15" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="7.5" height="15" fill="rgba(255, 51, 102, 0.08)" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#barberGrad)" />
          <rect width="100" height="100" fill="url(#barberStripes)" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#FF3366" strokeWidth="0.5" opacity="0.3" />
          <g transform="translate(43, 40) scale(0.6)" stroke="#FF3366" strokeWidth="1.5" fill="none" opacity="0.7">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="9" y1="8" x2="20" y2="19" />
            <line x1="9" y1="16" x2="20" y2="5" />
          </g>
          <text x="50" y="82" textAnchor="middle" fill="#FF3366" fontSize="5" fontFamily="var(--font-mono)" letterSpacing="2" opacity="0.8">ZOTZ BARBER SHOP</text>
        </svg>
      );
    case 4: // AI Dashboard
      return (
        <svg className="projects__sleeve-svg" viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <radialGradient id="aiGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#042a22" />
              <stop offset="100%" stopColor="#010d0a" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#aiGrad)" />
          <g stroke="#00FFCC" strokeWidth="0.2" opacity="0.3">
            <line x1="20" y1="30" x2="50" y2="20" />
            <line x1="50" y1="20" x2="80" y2="35" />
            <line x1="20" y1="30" x2="40" y2="60" />
            <line x1="40" y1="60" x2="80" y2="35" />
            <line x1="50" y1="20" x2="60" y2="70" />
            <line x1="40" y1="60" x2="60" y2="70" />
          </g>
          <g fill="#00FFCC" opacity="0.6">
            <circle cx="20" cy="30" r="1" />
            <circle cx="50" cy="20" r="1.5" />
            <circle cx="80" cy="35" r="1" />
            <circle cx="40" cy="60" r="1.5" />
            <circle cx="60" cy="70" r="1" />
          </g>
          <text x="50" y="82" textAnchor="middle" fill="#00FFCC" fontSize="5" fontFamily="var(--font-mono)" letterSpacing="2" opacity="0.8">ACADEMIC AI IMPACT</text>
        </svg>
      );
    default:
      return null;
  }
};

const ProjectLabelIcon: React.FC<{ index: number }> = ({ index }) => {
  switch (index) {
    case 0: // Hexacore - Pokéball
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="#0d0d0d" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 1: // Invitaciones XV - Script XV
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6l6 12M10 6l-6 12" />
          <path d="M14 6l4 12 4-12" />
        </svg>
      );
    case 2: // Gestor Agrícola - Seedling Leaf
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2a7 7 0 0 1-9 8.8Z" />
          <path d="M19 2c-2.26 4.33-5.27 7.14-8 9" />
        </svg>
      );
    case 3: // Zotz Barber - Crossed Scissors
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="9" y1="8" x2="20" y2="19" />
          <line x1="9" y1="16" x2="20" y2="5" />
        </svg>
      );
    case 4: // AI Dashboard - Neural node network
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
          <line x1="12" y1="7" x2="12" y2="17" />
          <line x1="7" y1="12" x2="17" y2="12" />
        </svg>
      );
    default:
      return null;
  }
};

export const Projects: React.FC<ProjectsProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const desktopContainer = desktopContainerRef.current;
    const progressFill = progressFillRef.current;
    const bgText = bgTextRef.current;
    if (!section || !desktopContainer || !progressFill) return;

    const mm = gsap.matchMedia();

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
          { y: 150, xPercent: -50, yPercent: -50 },
          { y: -150, ease: 'none', xPercent: -50, yPercent: -50 },
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
      // Desktop: Turntable Pinned scroll animation
      mm.add('(min-width: 769px)', () => {
        const infos = desktopContainer.querySelectorAll('.projects__info-card');
        const vinyls = desktopContainer.querySelectorAll('.projects__vinyl');
        const sleeves = desktopContainer.querySelectorAll('.projects__sleeve-jacket');
        const tonearm = desktopContainer.querySelector('.projects__tonearm-wrapper');
        const total = t.items.length;
        if (!tonearm || infos.length !== total || vinyls.length !== total || sleeves.length !== total) return;

        const totalScrollHeight = window.innerHeight * 3.5;

        // Pin the desktop container
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopContainer,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${totalScrollHeight}`,
            invalidateOnRefresh: true,
          },
        });

        // Set initial positions
        gsap.set(vinyls[0], { x: 0, y: 0, scale: 1, rotation: 0 });
        gsap.set(sleeves[0], { opacity: 1, x: 0 });
        gsap.set(infos[0], { opacity: 1, y: 0 });
        gsap.set(tonearm, { rotation: 28 }); // 28deg = landed on record

        // Inactive items start off-stage
        for (let i = 1; i < total; i++) {
          gsap.set(vinyls[i], { x: -220, y: 30, scale: 0.6, rotation: -45 });
          gsap.set(sleeves[i], { opacity: 0, x: -50 });
          gsap.set(infos[i], { opacity: 0, y: 40 });
        }

        // Sync progress bar
        tl.to(progressFill, {
          width: '100%',
          ease: 'none',
        }, 0);

        // Build transitions
        const transitionDuration = 0.5;
        const armDuration = 0.3;
        const playDuration = 1.5;

        for (let i = 0; i < total; i++) {
          // Play current vinyl (rotation scrub)
          tl.to(vinyls[i], {
            rotation: '+=720',
            ease: 'none',
            duration: playDuration
          });

          if (i < total - 1) {
            const next = i + 1;

            // Lift tonearm
            tl.to(tonearm, {
              rotation: 0,
              ease: 'power1.inOut',
              duration: armDuration
            });

            // Slide current vinyl back to sleeve
            tl.to(vinyls[i], {
              x: -220,
              y: 30,
              scale: 0.6,
              rotation: -45,
              ease: 'power1.inOut',
              duration: transitionDuration
            }, '<');

            // Fade out current info and sleeve
            tl.to(infos[i], {
              opacity: 0,
              y: -40,
              ease: 'power2.in',
              duration: transitionDuration
            });
            tl.to(sleeves[i], {
              opacity: 0,
              x: -50,
              ease: 'power2.in',
              duration: transitionDuration
            }, '<');

            // Fade in next info and sleeve
            tl.to(infos[next], {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              duration: transitionDuration
            });
            tl.to(sleeves[next], {
              opacity: 1,
              x: 0,
              ease: 'power2.out',
              duration: transitionDuration
            }, '<');

            // Slide next vinyl onto platter
            tl.to(vinyls[next], {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              ease: 'power1.inOut',
              duration: transitionDuration
            });

            // Lower tonearm onto next vinyl
            tl.to(tonearm, {
              rotation: 28,
              ease: 'power1.inOut',
              duration: armDuration
            });
          }
        }
      });

      // Mobile: standard reveal animation on cards
      mm.add('(max-width: 768px)', () => {
        const cards = section.querySelectorAll('.projects__mobile-card');
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section.querySelector('.projects__mobile-list'),
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      {/* Parallax Background Giant Text */}
      <div className="projects__bg-text" ref={bgTextRef}>
        DISCOGRAPHY
      </div>

      {/* 1. DESKTOP VIEW (min-width: 769px) */}
      <div className="projects__desktop-view" ref={desktopContainerRef}>
        <div className="projects__pinned">
          <div className="projects__container">
            
            {/* Left Side: Info cards */}
            <div className="projects__info-side">
              <div className="projects__header">
                <p className="projects__eyebrow">{t.eyebrow}</p>
                <h2 className="projects__title">{t.title}</h2>
              </div>
              
              <div className="projects__info-stack">
                {t.items.map((project, index) => {
                  const theme = PROJECT_THEMES[index % PROJECT_THEMES.length];
                  return (
                    <div
                      key={`desktop-info-${project.title}`}
                      className="projects__info-card"
                      style={theme as React.CSSProperties}
                    >
                      <span className="projects__info-badge">
                        {project.badgeLabel}
                      </span>
                      <h3 className="projects__info-title">{project.title}</h3>
                      <p className="projects__info-desc">{project.desc}</p>
                      
                      <div className="projects__info-tech">
                        {project.tech.map((techName) => (
                          <span key={techName} className="projects__info-tech-tag">
                            {techName}
                          </span>
                        ))}
                      </div>
                      
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__info-link"
                      >
                        GitHub <ArrowRightIcon width={14} height={14} />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Turntable Deck */}
            <div className="projects__player-side">
              <div className="projects__player-deck">
                
                {/* Turntable box player */}
                <div className="projects__turntable">
                  {/* Metal rim platter */}
                  <div className="projects__turntable-platter-ring"></div>
                  <div className="projects__turntable-platter">
                    <div className="projects__turntable-spindle"></div>
                  </div>

                  {/* Vinyls stack overlaying the platter */}
                  {t.items.map((project, index) => {
                    const theme = PROJECT_THEMES[index % PROJECT_THEMES.length];
                    return (
                      <div
                        key={`desktop-vinyl-${project.title}`}
                        className="projects__vinyl"
                        style={theme as React.CSSProperties}
                      >
                        <div className="projects__vinyl-conic"></div>
                        <div className="projects__vinyl-grooves"></div>
                        <div className="projects__vinyl-label">
                          <ProjectLabelIcon index={index} />
                        </div>
                        <div className="projects__vinyl-centerhole"></div>
                      </div>
                    );
                  })}

                  {/* Tonearm mechanical arm pivot */}
                  <div className="projects__tonearm-wrapper">
                    <svg className="projects__tonearm-svg" viewBox="0 0 100 250" width="80" height="200">
                      <circle cx="50" cy="50" r="14" fill="#333" stroke="#555" strokeWidth="2" />
                      <circle cx="50" cy="50" r="6" fill="#111" />
                      <rect x="43" y="12" width="14" height="24" rx="3" fill="#222" stroke="#444" />
                      <path d="M 50,50 L 50,150 L 35,210 L 35,230" fill="none" stroke="#dcdcdc" strokeWidth="4" strokeLinecap="round" />
                      <rect x="27" y="225" width="16" height="15" rx="2" fill="#151515" stroke="#333" />
                      <polygon points="31,238 39,238 35,246" fill="var(--color-sun, #FFDE42)" />
                    </svg>
                  </div>
                </div>

                {/* Sleeves Stack to the left of turntable */}
                <div className="projects__sleeves-stack">
                  {t.items.map((project, index) => {
                    const theme = PROJECT_THEMES[index % PROJECT_THEMES.length];
                    const isHexacore = index === 0;
                    return (
                      <div
                        key={`desktop-sleeve-${project.title}`}
                        className="projects__sleeve-jacket"
                        style={theme as React.CSSProperties}
                      >
                        <span className="projects__sleeve-tracknumber">
                          {`>_ TRACK_0${index + 1}`}
                        </span>
                        {isHexacore ? (
                          <div className="poke-battle-wrapper">
                            <PokeBattle />
                          </div>
                        ) : (
                          <ProjectSleeveArt index={index} />
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>

          <div className="projects__progress">
            <div className="projects__progress-fill" ref={progressFillRef}></div>
          </div>
        </div>
      </div>

      {/* 2. MOBILE VIEW (max-width: 768px) */}
      <div className="projects__mobile-view">
        <div className="projects__mobile-header">
          <p className="projects__eyebrow">{t.eyebrow}</p>
          <h2 className="projects__title">{t.title}</h2>
        </div>
        
        <div className="projects__mobile-list">
          {t.items.map((project, index) => {
            const theme = PROJECT_THEMES[index % PROJECT_THEMES.length];
            const isHexacore = index === 0;
            return (
              <div
                key={`mobile-card-${project.title}`}
                className="projects__mobile-card"
                style={theme as React.CSSProperties}
              >
                {/* Vinyl peeking out top */}
                <div className="projects__mobile-vinyl">
                  <div className="projects__vinyl-conic"></div>
                  <div className="projects__vinyl-grooves"></div>
                  <div className="projects__vinyl-label">
                    <ProjectLabelIcon index={index} />
                  </div>
                  <div className="projects__vinyl-centerhole"></div>
                </div>

                {/* Sleeve cover */}
                <div className={`projects__mobile-sleeve ${isHexacore ? 'projects__mobile-sleeve--interactive' : ''}`}>
                  <span className="projects__sleeve-tracknumber">
                    {`>_ TRACK_0${index + 1}`}
                  </span>
                  {isHexacore ? (
                    <div className="poke-battle-wrapper">
                      <PokeBattle />
                    </div>
                  ) : (
                    <ProjectSleeveArt index={index} />
                  )}
                </div>

                {/* Info Details */}
                <div className="projects__mobile-info">
                  <span className="projects__info-badge">{project.badgeLabel}</span>
                  <h3 className="projects__mobile-title">{project.title}</h3>
                  <p className="projects__mobile-desc">{project.desc}</p>
                  
                  <div className="projects__mobile-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="projects__mobile-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects__mobile-link"
                  >
                    GitHub <ArrowRightIcon width={14} height={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


