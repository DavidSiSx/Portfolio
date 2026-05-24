export interface Translation {
  nav: {
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    scrollText: string;
    status: string;
  };
  about: {
    eyebrow: string;
    title: string;
    items: {
      icon: string;
      text: string;
    }[];
  };
  skills: {
    eyebrow: string;
    title: string;
    groups: {
      name: string;
      tags: string[];
    }[];
  };
  projects: {
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
  contact: {
    title: string;
    description: string;
    github: string;
    email: string;
  };
  footer: string;
}

export const content: { es: Translation; en: Translation } = {
  es: {
    nav: { about: 'Sobre Mí', skills: 'Habilidades', projects: 'Proyectos', contact: 'Contacto' },
    hero: {
      eyebrow: 'Ingeniería en TI',
      title: 'DAVID SIERRA',
      subtitle: 'Ingeniería en TI • Cancún, MX',
      scrollText: 'SCROLL PARA MÁS DETALLES',
      status: 'REPRODUCIENDO AHORA'
    },
    about: {
      eyebrow: 'SOBRE MÍ',
      title: 'Un poco de contexto',
      items: [
        { icon: 'code', text: 'Apasionado por traducir diseños complejos en código limpio y eficiente con React y Next.js.' },
        { icon: 'map', text: 'Actualmente cursando Ingeniería en la UT de Cancún.' },
        { icon: 'user', text: 'Centrado en aplicar principios de ingeniería real para potenciar la experiencia del usuario.' }
      ]
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
      title: 'DAVID SIERRA',
      subtitle: 'IT Engineering • Cancún, MX',
      scrollText: 'SCROLL FOR CONTEXT',
      status: 'NOW PLAYING'
    },
    about: {
      eyebrow: 'ABOUT ME',
      title: 'A bit of context',
      items: [
        { icon: 'code', text: 'Passionate about translating complex designs into clean and efficient code with React and Next.js.' },
        { icon: 'map', text: 'Currently pursuing an IT Engineering degree at UT Cancún.' },
        { icon: 'user', text: 'Focused on applying real-world engineering principles to enhance user experiences.' }
      ]
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
};
