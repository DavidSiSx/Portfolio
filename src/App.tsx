import { useState, useEffect } from 'react'
import './App.css'

// ─── Icons (inline SVG — no emoji, per ui-ux-pro-max rules) ──────
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

// ─── Bilingual Content ───────────────────────────────────────────
const content = {
  es: {
    nav: { about: 'Sobre Mí', skills: 'Habilidades', projects: 'Proyectos', contact: 'Contacto' },
    hero: {
      eyebrow: 'Ingeniería en TI',
      title: ['Construyendo', 'soluciones digitales', 'robustas.'],
      description: 'Soy David Alejandro Sierra Sosa, estudiante de Ingeniería en TI en la Universidad Tecnológica de Cancún. Me especializo en arquitectura limpia, desarrollo full-stack y experiencias de usuario de alto impacto.',
      cta1: 'Ver Proyectos',
      cta2: 'Contacto',
    },
    about: {
      eyebrow: 'SOBRE MÍ',
      title: 'Un poco de contexto',
      description: 'Me apasiona resolver problemas complejos de flujo de datos, estructurar backends modulares y diseñar interfaces interactivas de primera calidad. Actualmente curso mi carrera en la UT de Cancún, donde cada proyecto es una oportunidad para aplicar principios de ingeniería real.',
    },
    skills: {
      eyebrow: 'HABILIDADES',
      title: 'Stack técnico',
      groups: [
        { name: 'Frontend', tags: ['React 19', 'Next.js 16', 'TypeScript', 'Tailwind v4', 'Mapbox GL', 'Chart.js', 'Recharts'] },
        { name: 'Backend & DB', tags: ['NestJS 11', 'Node.js', 'Express', 'TypeORM', 'Prisma', 'PostgreSQL', 'MySQL'] },
        { name: 'Herramientas', tags: ['Git / GitHub', 'Firebase', 'RAG / Vector DBs', 'LLM APIs', 'Vitest / Jest', 'CI/CD'] },
      ],
    },
    projects: {
      eyebrow: 'PROYECTOS',
      title: 'Trabajo seleccionado',
      items: [
        {
          title: 'Hexacore',
          badge: 'personal',
          badgeLabel: 'Iniciativa Personal',
          desc: 'Asesor táctico de Pokémon competitivo impulsado por RAG, pgvector y Gemini structured outputs.',
          tech: ['React 19', 'PostgreSQL', 'pgvector', 'Gemini API', 'Transformers.js'],
          url: 'https://github.com/DavidSiSx/hexacore',
        },
        {
          title: 'Invitaciones XV',
          badge: 'school',
          badgeLabel: 'Proyecto Escolar',
          desc: 'Sistema modular de confirmación de asistencia y asignación de mesas con NestJS y 3 frontends independientes.',
          tech: ['NestJS', 'TypeORM', 'MySQL', 'React', 'DTOs'],
          url: 'https://github.com/DavidSiSx/Sistema-InvitacionesXV',
        },
        {
          title: 'Gestor Agrícola',
          badge: 'school',
          badgeLabel: 'Proyecto Escolar',
          desc: 'Plataforma IoT agrícola con trazado geoespacial de parcelas vía Mapbox GL y gráficas de telemetría.',
          tech: ['React', 'Mapbox GL', 'Chart.js', 'Firebase', 'Express', 'JWT'],
          url: 'https://github.com/DavidSiSx/Front-Gestor-agricola-Terminado',
        },
        {
          title: 'Zotz Barber',
          badge: 'school',
          badgeLabel: 'Proyecto Escolar',
          desc: 'Portal web de citas y geolocalización de sucursales integrado con Google Maps JavaScript API.',
          tech: ['React', 'React Router v6', 'Google Maps API', 'CSS'],
          url: 'https://github.com/DavidSiSx/Zotz-Gestion-Para-Barberia',
        },
        {
          title: 'AI Dashboard',
          badge: 'school',
          badgeLabel: 'Proyecto Escolar',
          desc: 'Panel analítico Next.js 16 para procesar y graficar el impacto académico de la IA.',
          tech: ['Next.js 16', 'PapaParse', 'Recharts', 'Tailwind v4'],
          url: 'https://github.com/DavidSiSx/DashobardImpactodeIAenAlumnos',
        },
      ],
    },
    contact: {
      title: '¿Hablamos?',
      description: 'Estoy disponible para ofertas de residencia profesional, colaboraciones de código abierto o proyectos full-stack.',
      github: 'GitHub',
      email: 'Email',
    },
    footer: '© 2026 David Alejandro Sierra Sosa — Universidad Tecnológica de Cancún',
  },
  en: {
    nav: { about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    hero: {
      eyebrow: 'IT Engineering',
      title: ['Building', 'robust digital', 'solutions.'],
      description: 'I am David Alejandro Sierra Sosa, an IT Engineering student at the Universidad Tecnológica de Cancún. I specialize in clean architecture, full-stack development, and high-impact user experiences.',
      cta1: 'View Projects',
      cta2: 'Contact Me',
    },
    about: {
      eyebrow: 'ABOUT ME',
      title: 'A bit of context',
      description: 'I am passionate about solving complex data pipeline problems, structuring modular backends, and designing high-fidelity interactive user interfaces. I am currently pursuing my degree at UT Cancún, where every project is an opportunity to apply real engineering principles.',
    },
    skills: {
      eyebrow: 'SKILLS',
      title: 'Tech stack',
      groups: [
        { name: 'Frontend', tags: ['React 19', 'Next.js 16', 'TypeScript', 'Tailwind v4', 'Mapbox GL', 'Chart.js', 'Recharts'] },
        { name: 'Backend & DB', tags: ['NestJS 11', 'Node.js', 'Express', 'TypeORM', 'Prisma', 'PostgreSQL', 'MySQL'] },
        { name: 'Tooling', tags: ['Git / GitHub', 'Firebase', 'RAG / Vector DBs', 'LLM APIs', 'Vitest / Jest', 'CI/CD'] },
      ],
    },
    projects: {
      eyebrow: 'PROJECTS',
      title: 'Selected work',
      items: [
        {
          title: 'Hexacore',
          badge: 'personal',
          badgeLabel: 'Personal Initiative',
          desc: 'AI-powered competitive Pokémon team builder using RAG, pgvector on PostgreSQL, and Gemini validation.',
          tech: ['React 19', 'PostgreSQL', 'pgvector', 'Gemini API', 'Transformers.js'],
          url: 'https://github.com/DavidSiSx/hexacore',
        },
        {
          title: 'Invitaciones XV',
          badge: 'school',
          badgeLabel: 'School Project',
          desc: 'Modular guest RSVP and table management platform with NestJS API and multiple React frontend apps.',
          tech: ['NestJS', 'TypeORM', 'MySQL', 'React', 'DTOs'],
          url: 'https://github.com/DavidSiSx/Sistema-InvitacionesXV',
        },
        {
          title: 'Smart Farm',
          badge: 'school',
          badgeLabel: 'School Project',
          desc: 'Full-stack IoT dashboard featuring Mapbox GL coordinates routing, Chart.js graphs, and Firebase syncing.',
          tech: ['React', 'Mapbox GL', 'Chart.js', 'Firebase', 'Express', 'JWT'],
          url: 'https://github.com/DavidSiSx/Front-Gestor-agricola-Terminado',
        },
        {
          title: 'Zotz Barber',
          badge: 'school',
          badgeLabel: 'School Project',
          desc: 'Barbershop appointment scheduler and dynamic branch locator integrated with Google Maps JavaScript API.',
          tech: ['React', 'React Router v6', 'Google Maps API', 'CSS'],
          url: 'https://github.com/DavidSiSx/Zotz-Gestion-Para-Barberia',
        },
        {
          title: 'AI Dashboard',
          badge: 'school',
          badgeLabel: 'School Project',
          desc: 'Next.js 16 analytics client parsing CSV datasets locally and outputting interactive Recharts.',
          tech: ['Next.js 16', 'PapaParse', 'Recharts', 'Tailwind v4'],
          url: 'https://github.com/DavidSiSx/DashobardImpactodeIAenAlumnos',
        },
      ],
    },
    contact: {
      title: "Let's Connect",
      description: 'I am available for professional residency programs, open-source collaborations, or full-stack web roles.',
      github: 'GitHub',
      email: 'Email',
    },
    footer: '© 2026 David Alejandro Sierra Sosa — Universidad Tecnológica de Cancún',
  },
}

// ─── App Component ───────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const [scrolled, setScrolled] = useState(false)

  const t = content[lang]

  // Track scroll for nav shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── Navigation ── */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#" className="nav__brand">
            David<span>.</span>
          </a>

          <div className="nav__links">
            <a href="#about" className="nav__link">{t.nav.about}</a>
            <a href="#skills" className="nav__link">{t.nav.skills}</a>
            <a href="#projects" className="nav__link">{t.nav.projects}</a>
            <a href="#contact" className="nav__link">{t.nav.contact}</a>
            <button
              className="nav__lang-btn"
              onClick={() => setLang(prev => (prev === 'es' ? 'en' : 'es'))}
              aria-label="Toggle language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>

          <button className="nav__mobile-toggle" aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero__content">
            <span className="hero__eyebrow">{t.hero.eyebrow}</span>
            <h1 className="hero__title">
              {t.hero.title[0]}<br />
              <em>{t.hero.title[1]}</em><br />
              {t.hero.title[2]}
            </h1>
            <p className="hero__description">{t.hero.description}</p>
            <div className="hero__actions">
              <a href="#projects" className="btn btn--primary">{t.hero.cta1}</a>
              <a href="#contact" className="btn btn--secondary">{t.hero.cta2}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section section--alt">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow">{t.about.eyebrow}</p>
            <h2 className="section__title">{t.about.title}</h2>
            <p className="section__description">{t.about.description}</p>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="section">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow">{t.skills.eyebrow}</p>
            <h2 className="section__title">{t.skills.title}</h2>
          </div>
          <div className="skills-grid">
            {t.skills.groups.map(group => (
              <div key={group.name} className="skill-group">
                <h3 className="skill-group__title">{group.name}</h3>
                <div className="skill-group__tags">
                  {group.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="section section--alt">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow">{t.projects.eyebrow}</p>
            <h2 className="section__title">{t.projects.title}</h2>
          </div>
          <div className="projects-grid">
            {t.projects.items.map(project => (
              <article key={project.title} className="project-card">
                <div className="project-card__preview">
                  <span className="project-card__preview-label">Preview</span>
                </div>
                <div className="project-card__body">
                  <span className={`project-card__badge project-card__badge--${project.badge}`}>
                    {project.badgeLabel}
                  </span>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.desc}</p>
                  <div className="project-card__tech">
                    {project.tech.map(t => (
                      <span key={t} className="project-card__tech-tag">{t}</span>
                    ))}
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                  >
                    GitHub <ArrowRightIcon width={14} height={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section">
        <div className="container">
          <div className="contact__card">
            <h2>{t.contact.title}</h2>
            <p>{t.contact.description}</p>
            <div className="contact__links">
              <a
                href="https://github.com/DavidSiSx"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <GithubIcon width={16} height={16} /> {t.contact.github}
              </a>
              <a href="mailto:davidsierrasosa01@gmail.com" className="btn btn--secondary">
                <MailIcon width={16} height={16} /> {t.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <p className="footer__text">{t.footer}</p>
        </div>
      </footer>
    </>
  )
}
