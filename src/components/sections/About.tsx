import { useEffect, useRef, Fragment } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CodeIcon, MapPinIcon, UserIcon } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  t: {
    eyebrow: string;
    title: string;
    bio: string;
    items: {
      icon: string;
      text: string;
    }[];
  };
}

export const About: React.FC<AboutProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return <CodeIcon width={18} height={18} />;
      case 'map': return <MapPinIcon width={18} height={18} />;
      case 'user': return <UserIcon width={18} height={18} />;
      default: return null;
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const bio = bioRef.current;
    const visual = visualRef.current;
    const details = detailsRef.current;
    if (!section || !bio || !visual || !details) return;

    const ctx = gsap.context(() => {
      // Animate characters with ScrollTrigger scrub
      const chars = bio.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { opacity: 0.25 },
        {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: bio,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 0.5,
          },
        }
      );

      // Photo parallax — moves faster than text
      gsap.to(visual, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        },
      });

      // Detail items stagger reveal
      const items = details.querySelectorAll('.about__detail-item');
      gsap.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: details,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, [t.bio]);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__container">
        {/* Left: Visual / Avatar */}
        <div className="about__visual" ref={visualRef}>
          <div className="about__photo-wrapper">
            <div className="about__photo-glow"></div>
            <img 
              src="/Landscape2.gif" 
              alt="David Sierra Sosa" 
              className="about__photo"
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="about__content">
          <span className="about__eyebrow">{t.eyebrow}</span>
          <h2 className="about__title">{t.title}</h2>

          {/* Bio — Render words and chars declaratively so GSAP can animate them and React handles language switching correctly */}
          <p className="about__bio" ref={bioRef}>
            {t.bio.split(' ').map((word, wordIndex, wordsArr) => (
              <Fragment key={wordIndex}>
                <span
                  className="about__word"
                  style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                >
                  {Array.from(word).map((char, charIndex) => (
                    <span key={charIndex} className="char">
                      {char}
                    </span>
                  ))}
                </span>
                {wordIndex < wordsArr.length - 1 && ' '}
              </Fragment>
            ))}
          </p>

          {/* Detail items */}
          <div className="about__details" ref={detailsRef}>
            {t.items.map((item, index) => (
              <div key={index} className="about__detail-item">
                <div className="about__detail-icon">
                  {getIcon(item.icon)}
                </div>
                <span className="about__detail-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
