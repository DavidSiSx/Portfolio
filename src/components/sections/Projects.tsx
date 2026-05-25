import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRightIcon } from '../common/Icons';
import { LOGO_SVGS } from '../common/LogoSvgs';

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

const TITLE_GENRE_CLASSES = [
  'project-title--panic',
  'project-title--chayanne',
  'project-title--greenday',
  'project-title--jazz',
  'project-title--jpop'
];

const ProjectSleeveArt: React.FC<{ index: number }> = ({ index }) => {
  const albumData = [
    { src: `${import.meta.env.BASE_URL}abums/hexacorealbum.webp`, alt: 'Portada del álbum Hexacore Chiptunes' },
    { src: `${import.meta.env.BASE_URL}abums/XVAlbum.webp`, alt: 'Portada del álbum Invitaciones Sinfónicas' },
    { src: `${import.meta.env.BASE_URL}abums/GestorAlbum.webp`, alt: 'Portada del álbum Harvest Folk' },
    { src: `${import.meta.env.BASE_URL}abums/BarberAlbum.webp`, alt: 'Portada del álbum Barber Chair Blues' },
    { src: `${import.meta.env.BASE_URL}abums/AIalbum.webp`, alt: 'Portada del álbum Neural Beats AI' }
  ];
  
  const album = albumData[index];
  if (!album) return null;

  return (
    <img
      src={album.src}
      alt={album.alt}
      className="projects__sleeve-img"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
};

const ProjectLabelIcon: React.FC<{ index: number }> = ({ index }) => {
  const accent = PROJECT_THEMES[index % PROJECT_THEMES.length]['--project-accent'];
  
  const renderLabelDesign = () => {
    switch (index) {
      case 0: // Hexacore - Panic! at the Disco (Circus / Theatrical Gothic Serif)
        return (
          <>
            <circle cx="12" cy="12" r="10" stroke="#000" strokeWidth="1.2" fill="none" opacity="0.4" />
            <path d="M 2.5,12 L 21.5,12" stroke="#000" strokeWidth="1.2" />
            <circle cx="12" cy="12" r="3.2" fill="#0d0d0d" stroke="#000" strokeWidth="1" />
            <text x="12" y="6.8" textAnchor="middle" fill="#000" fontSize="1.8" fontWeight="800" fontFamily="'Cinzel Decorative', Georgia, serif" letterSpacing="0.2">POKE</text>
            <text x="12" y="19" textAnchor="middle" fill="#000" fontSize="1.8" fontWeight="800" fontFamily="'Cinzel Decorative', Georgia, serif" letterSpacing="0.2">CORE</text>
          </>
        );
      case 1: // Invitaciones XV - Chayanne (Elegant Latin Romantic Pop)
        return (
          <>
            <circle cx="12" cy="12" r="9" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" fill="none" />
            <path d="M 5,6 L 11,18 M 11,6 L 5,18" stroke="#000" strokeWidth="1" opacity="0.6" />
            <path d="M 13,6 L 17,18 21,6" stroke="#000" strokeWidth="1" opacity="0.6" />
            <text x="12" y="5.2" textAnchor="middle" fill="#000" fontSize="1.5" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontWeight="700">XV RECORD</text>
            <text x="12" y="20.5" textAnchor="middle" fill="#000" fontSize="1.5" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontWeight="700">SIDE A</text>
          </>
        );
      case 2: // Gestor Agrícola - Green Day (Typewriter Punk Rock)
        return (
          <>
            <circle cx="12" cy="12" r="9.2" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" fill="none" />
            <path d="M12 4c-1.5 2-2 3.5-1.5 6 1.5-2.5 3-3 4-5.5.3.8.3 1.8-.2 2.5-.8 1-2.2 2-2.3 3" stroke="#000" strokeWidth="0.8" fill="none" opacity="0.75" />
            <text x="12" y="19.5" textAnchor="middle" fill="#000" fontSize="1.5" fontFamily="'Special Elite', Courier, monospace" fontWeight="700" letterSpacing="0.05em">FARM LP</text>
          </>
        );
      case 3: // Zotz Barber - Jazz (Classy High-Contrast Blue Note Jazz)
        return (
          <>
            <circle cx="12" cy="12" r="9.2" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" fill="none" />
            <g transform="translate(8, 7) scale(0.65)" stroke="#000" strokeWidth="1.2" fill="none" opacity="0.7">
              <circle cx="4" cy="4" r="2.5" />
              <circle cx="4" cy="12" r="2.5" />
              <line x1="6.5" y1="5.5" x2="14" y2="13" />
              <line x1="6.5" y1="10.5" x2="14" y2="3" />
            </g>
            <text x="12" y="20.5" textAnchor="middle" fill="#000" fontSize="1.4" fontFamily="'Bodoni Moda', 'Didot', serif" fontWeight="800" fontStyle="italic" letterSpacing="0.05em">BARBER</text>
          </>
        );
      case 4: // AI Dashboard - J-Pop (Futuristic Geometric J-Pop)
        return (
          <>
            <circle cx="12" cy="12" r="9.2" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" fill="none" />
            <g stroke="#000" strokeWidth="0.8" fill="none" opacity="0.6">
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <circle cx="12" cy="12" r="2.5" fill={accent} stroke="#000" strokeWidth="0.8" />
            </g>
            <text x="12" y="20.5" textAnchor="middle" fill="#000" fontSize="1.4" fontFamily="'Righteous', sans-serif" fontWeight="700" letterSpacing="0.05em">AI CORE</text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" style={{ color: '#0b0b0b' }}>
      <circle cx="12" cy="12" r="11" fill={accent} />
      <circle cx="12" cy="12" r="10.2" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.3" />
      <circle cx="12" cy="12" r="5.2" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.3" />
      
      {renderLabelDesign()}
      
      {/* Center Hole */}
      <circle cx="12" cy="12" r="1.5" fill="#1b0c0c" stroke="#000" strokeWidth="0.5" />
    </svg>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const desktopContainer = desktopContainerRef.current;
    if (!section || !desktopContainer) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Desktop: Turntable Pinned scroll animation
      mm.add('(min-width: 769px)', () => {
        const infos = desktopContainer.querySelectorAll('.projects__info-card');
        const vinyls = desktopContainer.querySelectorAll('.projects__vinyl');
        const sleeves = desktopContainer.querySelectorAll('.projects__sleeve-jacket');
        const tonearm = desktopContainer.querySelector('.projects__tonearm-wrapper');
        const total = t.items.length;
        if (!tonearm || infos.length !== total || vinyls.length !== total || sleeves.length !== total) return;

        const totalScrollHeight = window.innerHeight * 3.5;

        // Pin the parent section container
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${totalScrollHeight}`,
            invalidateOnRefresh: true,
          },
        });

        // Set initial positions
        gsap.set(vinyls[0], { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 });
        gsap.set(sleeves[0], { opacity: 1, x: 0 });
        gsap.set(infos[0], { opacity: 1, y: 0 });
        gsap.set(tonearm, { rotation: 28 }); // 28deg = landed on record

        // Inactive items start off-stage
        for (let i = 1; i < total; i++) {
          gsap.set(vinyls[i], { x: -220, y: 30, scale: 0.6, rotation: -45, opacity: 0 });
          gsap.set(sleeves[i], { opacity: 0, x: -50 });
          gsap.set(infos[i], { opacity: 0, y: 40 });
        }



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

            // Fade out current info, sleeve, and current vinyl
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
            tl.to(vinyls[i], {
              opacity: 0,
              ease: 'power2.in',
              duration: transitionDuration
            }, '<');

            // Fade in next info, sleeve, and next vinyl (at sleeve position)
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
            tl.to(vinyls[next], {
              opacity: 1,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
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
                      <h3 className={`projects__info-title ${TITLE_GENRE_CLASSES[index % TITLE_GENRE_CLASSES.length]}`}>
                        {project.title}
                      </h3>
                      <p className="projects__info-desc">{project.desc}</p>
                      
                      <div className="projects__info-tech">
                        {project.tech.map((techName) => {
                          let lookupName = techName;
                          if (techName.startsWith('React')) lookupName = 'React 19';
                          if (techName.startsWith('Next.js')) lookupName = 'Next.js 16';
                          if (techName.startsWith('NestJS')) lookupName = 'NestJS 11';
                          if (techName === 'MySQL' || techName === 'PostgreSQL') lookupName = techName;

                          const LogoIcon = LOGO_SVGS[lookupName];
                          return (
                            <span key={techName} className="projects__info-tech-tag">
                              {LogoIcon ? (
                                <LogoIcon width="12" height="12" className="projects__tech-icon" style={{ fill: 'currentColor' }} />
                              ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" className="projects__tech-icon">
                                  <path d="M16 18L22 12L16 6M8 6L2 12L8 18" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                              {techName}
                            </span>
                          );
                        })}
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
                  <div className="projects__turntable-brand">TECHNICS-96</div>
                  <div className="projects__turntable-power"></div>
                  <div className="projects__turntable-led-target"></div>
                  <div className="projects__turntable-btn-start"></div>
                  <div className="projects__turntable-speeds">
                    <div className="projects__turntable-speed-btn"></div>
                    <div className="projects__turntable-speed-btn"></div>
                  </div>
                  <div className="projects__turntable-pitch-track">
                    <div className="projects__turntable-pitch-thumb"></div>
                  </div>

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
                    return (
                      <div
                        key={`desktop-sleeve-${project.title}`}
                        className="projects__sleeve-jacket"
                        style={theme as React.CSSProperties}
                      >
                        <span className="projects__sleeve-tracknumber">
                          {`STEREO LP • SIDE A • 0${index + 1}`}
                        </span>
                        <ProjectSleeveArt index={index} />
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

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
                    {`STEREO LP • SIDE A • 0${index + 1}`}
                  </span>
                    <ProjectSleeveArt index={index} />
                </div>

                {/* Info Details */}
                <div className="projects__mobile-info">
                  <span className="projects__info-badge">{project.badgeLabel}</span>
                  <h3 className={`projects__mobile-title ${TITLE_GENRE_CLASSES[index % TITLE_GENRE_CLASSES.length]}`}>
                    {project.title}
                  </h3>
                  <p className="projects__mobile-desc">{project.desc}</p>
                  
                  <div className="projects__mobile-tech">
                    {project.tech.map((techName) => {
                      let lookupName = techName;
                      if (techName.startsWith('React')) lookupName = 'React 19';
                      if (techName.startsWith('Next.js')) lookupName = 'Next.js 16';
                      if (techName.startsWith('NestJS')) lookupName = 'NestJS 11';
                      if (techName === 'MySQL' || techName === 'PostgreSQL') lookupName = techName;

                      const LogoIcon = LOGO_SVGS[lookupName];
                      return (
                        <span key={techName} className="projects__mobile-tech-tag">
                          {LogoIcon ? (
                            <LogoIcon width="12" height="12" className="projects__tech-icon" style={{ fill: 'currentColor' }} />
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" className="projects__tech-icon">
                              <path d="M16 18L22 12L16 6M8 6L2 12L8 18" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {techName}
                        </span>
                      );
                    })}
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


