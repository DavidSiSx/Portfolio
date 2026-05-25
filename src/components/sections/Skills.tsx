import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOGO_SVGS } from '../common/LogoSvgs';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  t: {
    eyebrow: string;
    title: string;
    groups: {
      name: string;
      tags: string[];
    }[];
  };
}



// Rich details mapped to all 20 skills in both languages
const SKILL_METADATA: Record<string, {
  year: string;
  type: string;
  mastery: number;
  gradient: string;
  projects: string[];
  descEs: string;
  descEn: string;
}> = {
  'React 19': {
    year: '2013',
    type: 'Library',
    mastery: 82,
    gradient: 'linear-gradient(135deg, #00d8ff 0%, #002b36 100%)',
    projects: ['Hexacore', 'Invitaciones XV', 'Gestor Agrícola', 'Zotz Barber'],
    descEs: 'Arquitectura de componentes estructurados, ganchos avanzados de React 19, optimización del virtual DOM y sincronización ágil de estados globales con Context y Zustand.',
    descEn: 'Structured component architecture, advanced React 19 hooks, virtual DOM optimization, and global state management with Context and Zustand.'
  },
  'Next.js 16': {
    year: '2016',
    type: 'Framework',
    mastery: 75,
    gradient: 'linear-gradient(135deg, #333333 0%, #000000 100%)',
    projects: ['AI Dashboard'],
    descEs: 'Enrutamiento avanzado con App Router, optimización SEO nativa, estrategias de carga híbrida (SSR, SSG, ISR) e integración de endpoints internos seguros.',
    descEn: 'App Router architecture, native SEO optimization, hybrid rendering models (SSR, SSG, ISR), and secure route handlers integration.'
  },
  'TypeScript': {
    year: '2012',
    type: 'Language',
    mastery: 78,
    gradient: 'linear-gradient(135deg, #3178c6 0%, #0e3762 100%)',
    projects: ['Hexacore', 'Invitaciones XV', 'Gestor Agrícola', 'AI Dashboard'],
    descEs: 'Tipado estricto, genéricos reutilizables complejos, aserciones seguras de tipo, utilerías avanzadas y configuraciones robustas para evitar errores en tiempo de ejecución.',
    descEn: 'Strict typing, reusable generic architectures, custom type guards, utility types, and compiler configs to eliminate runtime failures.'
  },
  'Tailwind v4': {
    year: '2017',
    type: 'CSS Engine',
    mastery: 85,
    gradient: 'linear-gradient(135deg, #38b2ac 0%, #1a5c59 100%)',
    projects: ['Hexacore', 'AI Dashboard'],
    descEs: 'Composición de layouts responsivos complejos, extensión de temas vía tokens de diseño y diseño adaptativo dinámico sin hojas de estilo monolíticas.',
    descEn: 'Complex responsive layout building, custom theme extension using utility tokens, and fluid layout design without monolithic css rules.'
  },
  'Mapbox GL': {
    year: '2014',
    type: 'GIS Tech',
    mastery: 68,
    gradient: 'linear-gradient(135deg, #4264fb 0%, #152259 100%)',
    projects: ['Gestor Agrícola'],
    descEs: 'Integración geoespacial, dibujado de polígonos GeoJSON dinámicos, trazados interactivos de rutas agrícolas y mapas optimizados para WebGL.',
    descEn: 'Geospatial visualization layers, dynamic GeoJSON parsing, interactive farm routing, and high-performance WebGL-optimized maps.'
  },
  'Chart.js': {
    year: '2013',
    type: 'Visuals',
    mastery: 72,
    gradient: 'linear-gradient(135deg, #ff6384 0%, #611e2b 100%)',
    projects: ['Gestor Agrícola'],
    descEs: 'Visualización interactiva de métricas mediante gráficos canvas ligeros, customización de eventos hover y renderizado dinámico de telemetría IoT.',
    descEn: 'Interactive data charts via lightweight canvas graphics, customized hover actions, and real-time telemetry IoT rendering.'
  },
  'Recharts': {
    year: '2015',
    type: 'Visuals',
    mastery: 78,
    gradient: 'linear-gradient(135deg, #3182bd 0%, #1c3e59 100%)',
    projects: ['AI Dashboard'],
    descEs: 'Gráficos declarativos nativos en React, integración directa de datos dinámicos, personalización fina de ejes y curvas svg adaptables.',
    descEn: 'Native declarative React components, responsive SVG chart containers, dynamic data feed formatting, and custom chart grids.'
  },
  'NestJS 11': {
    year: '2017',
    type: 'Framework',
    mastery: 70,
    gradient: 'linear-gradient(135deg, #e0234e 0%, #4f0312 100%)',
    projects: ['Invitaciones XV'],
    descEs: 'Arquitectura modular escalable basada en decoradores, inyección de dependencias, filtros de excepción, pipes de validación estrictos y DTOs.',
    descEn: 'Scalable modular enterprise patterns, controller-service isolation, dependency injection, validation pipes, exception filters, and strict DTOs.'
  },
  'Node.js': {
    year: '2009',
    type: 'Runtime',
    mastery: 76,
    gradient: 'linear-gradient(135deg, #339933 0%, #123e12 100%)',
    projects: ['Invitaciones XV', 'Gestor Agrícola'],
    descEs: 'Programación asíncrona de I/O eficiente no bloqueante, manejo nativo de sistemas de archivos, optimización del event loop y consumo de APIs de streams.',
    descEn: 'Efficient asynchronous, non-blocking backends, file system access, event loop optimization, streams orchestration, and scalable microservices.'
  },
  'Express': {
    year: '2010',
    type: 'EP Micro',
    mastery: 78,
    gradient: 'linear-gradient(135deg, #222 0%, #444 100%)',
    projects: ['Gestor Agrícola'],
    descEs: 'Enrutamiento veloz REST, configuración de capas de middleware (CORS, body-parser, JWT) y desarrollo ligero de microservicios funcionales.',
    descEn: 'Fast REST API endpoint structures, custom middleware chains (CORS, parser, JWT security), and lightweight microservice architectures.'
  },
  'TypeORM': {
    year: '2016',
    type: 'ORM Layer',
    mastery: 64,
    gradient: 'linear-gradient(135deg, #e53935 0%, #5d1210 100%)',
    projects: ['Invitaciones XV'],
    descEs: 'Modelado relacional con clases decoradas de TS, migraciones automatizadas e inyección segura de repositorios para consultas transaccionales.',
    descEn: 'Object-Relational Mapping via TypeScript entities, SQL query runner scripts, automated schema migrations, and secure repository query interfaces.'
  },
  'Prisma': {
    year: '2019',
    type: 'ORM Layer',
    mastery: 74,
    gradient: 'linear-gradient(135deg, #0c344b 0%, #1b8a5a 100%)',
    projects: [],
    descEs: 'Definición declarativa de bases de datos mediante prisma schemas, autogeneración del cliente tipado de base de datos y control de histórico de cambios.',
    descEn: 'Type-safe declarative database client schemas, auto-generated query clients, entity relationship mappings, and historical migration tracks.'
  },
  'PostgreSQL': {
    year: '1996',
    type: 'Database',
    mastery: 75,
    gradient: 'linear-gradient(135deg, #336791 0%, #173347 100%)',
    projects: ['Hexacore'],
    descEs: 'Administración de bases de datos relacionales, optimización de índices, llaves foráneas y búsquedas vectoriales avanzadas con la extensión pgvector.',
    descEn: 'Relational database schema structure, indices optimizations, relational constraints, and high-performance vector operations using pgvector.'
  },
  'MySQL': {
    year: '1995',
    type: 'Database',
    mastery: 70,
    gradient: 'linear-gradient(135deg, #00758f 0%, #003642 100%)',
    projects: ['Invitaciones XV'],
    descEs: 'Esquemas relacionales optimizados, procedimientos almacenados básicos, normalización de tablas y optimización de indexado para consultas masivas.',
    descEn: 'Optimized relational schema designs, database table normalization rules, standard SQL triggers, and query index performance tuning.'
  },
  'Git / GitHub': {
    year: '2005',
    type: 'Versioning',
    mastery: 82,
    gradient: 'linear-gradient(135deg, #f05032 0%, #681f12 100%)',
    projects: ['Hexacore', 'Invitaciones XV', 'Gestor Agrícola', 'Zotz Barber', 'AI Dashboard'],
    descEs: 'Control de versiones granular, flujos de trabajo colaborativos (Gitflow), resolución rápida de conflictos y automatización de despliegues vía GitHub Actions.',
    descEn: 'Granular version control operations, collaborative branching models (Gitflow), merge conflict resolutions, and build actions pipelines.'
  },
  'Firebase': {
    year: '2011',
    type: 'BaaS Layer',
    mastery: 74,
    gradient: 'linear-gradient(135deg, #ffca28 0%, #a75000 100%)',
    projects: ['Gestor Agrícola'],
    descEs: 'Sincronización en tiempo real con Firestore, reglas de seguridad robustas, autenticación social OAuth integrada y hosting ágil estático.',
    descEn: 'Real-time database sync with Firestore NoSQL, granular security rule configurations, OAuth authentication, and cloud deployment pipelines.'
  },
  'RAG / Vector DBs': {
    year: '2023',
    type: 'AI Tooling',
    mastery: 65,
    gradient: 'linear-gradient(135deg, #7b1fa2 0%, #310744 100%)',
    projects: ['Hexacore'],
    descEs: 'Diseño de flujos RAG con embeddings de texto, indexado semántico en bases vectoriales, e inyección precisa de contexto relevante a LLMs.',
    descEn: 'Retrieval-Augmented Generation workflows, text embedding conversions, semantic indexing in vector stores, and custom context inject strategies.'
  },
  'LLM APIs': {
    year: '2022',
    type: 'AI Tooling',
    mastery: 72,
    gradient: 'linear-gradient(135deg, #0288d1 0%, #014368 100%)',
    projects: ['Hexacore'],
    descEs: 'Consumo avanzado de API de Gemini y OpenAI, validación de salidas estructuradas JSON Schema y optimización de prompts dinámicos.',
    descEn: 'Direct orchestration of Gemini and OpenAI APIs, strict validation via JSON schemas, dynamic system prompting, and token budget management.'
  }
};

const ALBUM_DESIGNS: Record<string, {
  artist: string;
  album: string;
  genre: string;
  themeColor: string;
  styleType: 'synth' | 'indie' | 'jazz' | 'disco' | 'ambient' | 'techno' | 'punk' | 'soul' | 'metal' | 'grunge' | 'pop';
}> = {
  'React 19': { artist: 'THE VIRTUAL DOMS', album: 'HOOKED ON YOU', genre: 'Synth-Pop', themeColor: '#00d8ff', styleType: 'synth' },
  'Next.js 16': { artist: 'THE APP ROUTERS', album: 'SERVER SIDE STORY', genre: 'Indie Rock', themeColor: '#ffffff', styleType: 'indie' },
  'TypeScript': { artist: 'STRICT COMPILATION', album: 'TYPE-SAFE SESSIONS', genre: 'Classic Jazz', themeColor: '#3178c6', styleType: 'jazz' },
  'Tailwind v4': { artist: 'UTILITY WAVES', album: 'FLUID SATELLITES', genre: 'Disco/New Wave', themeColor: '#38b2ac', styleType: 'disco' },
  'Mapbox GL': { artist: 'THE CARTOGRAPHERS', album: 'GEO-RHYTHMS', genre: 'Ambient Folk', themeColor: '#4264fb', styleType: 'ambient' },
  'Chart.js': { artist: 'THE DATA POINTS', album: 'CANVAS CONCERTO', genre: 'Orchestral', themeColor: '#ff6384', styleType: 'ambient' },
  'Recharts': { artist: 'VECTOR GROOVE', album: 'SVG COMPOSITIONS', genre: 'Lo-Fi Chill', themeColor: '#3182bd', styleType: 'ambient' },
  'NestJS 11': { artist: 'MODULAR SYNERGY', album: 'DECORATOR BEATS', genre: 'Prog Rock', themeColor: '#e0234e', styleType: 'grunge' },
  'Node.js': { artist: 'THE EVENT LOOP', album: 'NON-BLOCKING LIVES', genre: 'Techno', themeColor: '#339933', styleType: 'techno' },
  'Express': { artist: 'FAST ROUTING', album: 'MIDDLEWARE MAGIC', genre: 'Garage Punk', themeColor: '#888888', styleType: 'punk' },
  'TypeORM': { artist: 'SQL RELATIONS', album: 'ENTITIES IN LOVE', genre: 'Motown Soul', themeColor: '#e53935', styleType: 'soul' },
  'Prisma': { artist: 'SCHEMA SOUND', album: 'THE QUERY RUN', genre: 'Electro Funk', themeColor: '#1b8a5a', styleType: 'disco' },
  'PostgreSQL': { artist: 'ELEPHANT DRUMS', album: 'ACID RELATIONS', genre: 'Heavy Metal', themeColor: '#336791', styleType: 'metal' },
  'MySQL': { artist: 'THE QUERY STRINGS', album: 'JOIN THE RHYTHM', genre: 'Vintage Rock', themeColor: '#00758f', styleType: 'soul' },
  'Git / GitHub': { artist: 'MERGE CONFLICT', album: 'BRANCHING OUT', genre: 'Grunge/Alt', themeColor: '#f05032', styleType: 'grunge' },
  'Firebase': { artist: 'THE REAL-TIMERS', album: 'CLOUD STRATUM', genre: 'Dream Pop', themeColor: '#ffca28', styleType: 'pop' },
  'RAG / Vector DBs': { artist: 'SEMANTIC SEARCH', album: 'EMBEDDING MEMORIES', genre: 'Psych Rock', themeColor: '#7b1fa2', styleType: 'grunge' },
  'LLM APIs': { artist: 'NEURAL PROMPT', album: 'GENERATIVE GROOVES', genre: 'Synth Ambient', themeColor: '#0288d1', styleType: 'synth' },
};

interface SkillAlbumCoverProps {
  name: string;
  isActive?: boolean;
  isPlaying?: boolean;
}

const SkillAlbumCover: React.FC<SkillAlbumCoverProps> = ({ name, isActive = false, isPlaying = false }) => {
  const design = ALBUM_DESIGNS[name] || {
    artist: 'THE CODERS',
    album: 'DEFAULT COMPILATION',
    genre: 'Software',
    themeColor: '#FFDE42',
    styleType: 'synth' as const
  };

  const LogoIcon = LOGO_SVGS[name] || null;

  return (
    <div className="skills__album-cover-gradient" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`grad-${name.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={design.themeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1B0C0C" />
          </linearGradient>
          <radialGradient id={`vinyl-grad-${name.replace(/[^a-zA-Z0-9]/g, '')}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#222" />
            <stop offset="60%" stopColor="#151515" />
            <stop offset="90%" stopColor="#080808" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>

        <rect width="100" height="100" fill={`url(#grad-${name.replace(/[^a-zA-Z0-9]/g, '')})`} />
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" />

        {design.styleType === 'synth' && (
          <>
            <path d="M 0,90 L 100,90 M 0,95 L 100,95 M 0,85 L 100,85 M 0,80 L 100,80" stroke="rgba(255, 222, 66, 0.15)" strokeWidth="0.3" />
            <path d="M 10,80 L 0,100 M 30,80 L 20,100 M 50,80 L 50,100 M 70,80 L 80,100 M 90,80 L 100,100" stroke="rgba(255, 222, 66, 0.15)" strokeWidth="0.3" />
            <circle cx="50" cy="50" r="18" fill="none" stroke={design.themeColor} strokeWidth="1.5" opacity="0.8" />
            <line x1="30" y1="55" x2="70" y2="55" stroke="#1B0C0C" strokeWidth="1.5" />
            <line x1="32" y1="60" x2="68" y2="60" stroke="#1B0C0C" strokeWidth="1.5" />
            <line x1="35" y1="64" x2="65" y2="64" stroke="#1B0C0C" strokeWidth="1.5" />
          </>
        )}

        {design.styleType === 'disco' && (
          <>
            <path d="M -10,30 L 110,60" stroke={design.themeColor} strokeWidth="6" opacity="0.3" />
            <path d="M -10,40 L 110,70" stroke="#FFDE42" strokeWidth="6" opacity="0.25" />
            <path d="M -10,50 L 110,80" stroke="#FF3366" strokeWidth="6" opacity="0.15" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.4" />
          </>
        )}

        {design.styleType === 'jazz' && (
          <>
            <path d="M 5,50 C 30,30 70,70 95,50" fill="none" stroke={design.themeColor} strokeWidth="0.4" opacity="0.4" />
            <path d="M 10,55 C 30,40 70,80 90,55" fill="none" stroke={design.themeColor} strokeWidth="0.4" opacity="0.3" />
            <path d="M 15,60 C 30,50 70,90 85,60" fill="none" stroke={design.themeColor} strokeWidth="0.4" opacity="0.2" />
            <circle cx="50" cy="50" r="26" fill="none" stroke={design.themeColor} strokeWidth="0.3" strokeDasharray="2 2" opacity="0.2" />
          </>
        )}

        {design.styleType === 'techno' && (
          <>
            <circle cx="50" cy="50" r="25" fill="none" stroke={design.themeColor} strokeWidth="0.5" strokeDasharray="1 3" opacity="0.6" />
            <circle cx="50" cy="50" r="20" fill="none" stroke={design.themeColor} strokeWidth="0.3" strokeDasharray="4 2" opacity="0.4" />
            <circle cx="50" cy="50" r="16" fill="none" stroke={design.themeColor} strokeWidth="0.8" opacity="0.3" />
          </>
        )}

        {design.styleType === 'grunge' && (
          <>
            <path d="M 10,15 L 30,35 M 25,12 L 45,32 M 70,65 L 90,85 M 65,70 L 85,90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.6" />
            <path d="M 30,15 L 10,35 M 45,12 L 25,32 M 90,65 L 70,85 M 85,70 L 65,90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.6" />
            <rect x="5" y="5" width="90" height="90" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
          </>
        )}

        {design.styleType === 'punk' && (
          <>
            <polygon points="5,5 95,20 90,25 10,10" fill={design.themeColor} opacity="0.15" />
            <polygon points="5,80 95,95 90,98 10,85" fill={design.themeColor} opacity="0.15" />
            <line x1="15" y1="45" x2="85" y2="55" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
          </>
        )}

        {design.styleType === 'soul' && (
          <>
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,222,66,0.12)" strokeWidth="1" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,222,66,0.1)" strokeWidth="2" />
            <path d="M 20,20 A 42,42 0 0,1 80,80" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.4" />
          </>
        )}

        {design.styleType === 'pop' && (
          <>
            <circle cx="25" cy="25" r="8" fill="rgba(255,255,255,0.04)" />
            <circle cx="75" cy="30" r="10" fill="rgba(255,255,255,0.03)" />
            <circle cx="70" cy="75" r="12" fill="rgba(255,255,255,0.04)" />
            <circle cx="30" cy="70" r="6" fill="rgba(255,255,255,0.03)" />
          </>
        )}

        {design.styleType === 'metal' && (
          <>
            <rect x="8" y="8" width="84" height="84" fill="none" stroke={design.themeColor} strokeWidth="0.5" opacity="0.4" />
            <rect x="12" y="12" width="76" height="76" fill="none" stroke={design.themeColor} strokeWidth="0.2" opacity="0.3" />
            <line x1="8" y1="8" x2="20" y2="20" stroke={design.themeColor} strokeWidth="0.4" opacity="0.4" />
            <line x1="92" y1="8" x2="80" y2="20" stroke={design.themeColor} strokeWidth="0.4" opacity="0.4" />
            <line x1="8" y1="92" x2="20" y2="80" stroke={design.themeColor} strokeWidth="0.4" opacity="0.4" />
            <line x1="92" y1="92" x2="80" y2="80" stroke={design.themeColor} strokeWidth="0.4" opacity="0.4" />
          </>
        )}

        {design.styleType === 'indie' && (
          <>
            <rect x="6" y="6" width="88" height="54" fill="rgba(0,0,0,0.2)" rx="1" />
            <line x1="6" y1="65" x2="94" y2="65" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          </>
        )}

        <g className={isActive && isPlaying ? "skills__album-vinyl-spin" : ""}>
          <circle cx="50" cy="50" r="13" fill={`url(#vinyl-grad-${name.replace(/[^a-zA-Z0-9]/g, '')})`} stroke="#000" strokeWidth="1" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.5" />

          <g transform="translate(42, 42) scale(0.65)" style={{ color: design.themeColor }}>
            {LogoIcon && <LogoIcon width="24" height="24" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8))' }} />}
          </g>
          
          <circle cx="50" cy="50" r="1.8" fill="#1B0C0C" stroke="#000" strokeWidth="0.4" />
        </g>

        <text 
          x="50" 
          y="15" 
          textAnchor="middle" 
          fill="#FFF" 
          fontSize="4.2" 
          fontWeight="800" 
          fontFamily="var(--font-display)" 
          letterSpacing="0.8"
          style={{ textTransform: 'uppercase', opacity: 0.95, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.7))' }}
        >
          {design.artist}
        </text>

        <text 
          x="50" 
          y="88" 
          textAnchor="middle" 
          fill={design.themeColor} 
          fontSize="3.8" 
          fontWeight="600" 
          fontFamily="var(--font-mono)" 
          letterSpacing="0.4"
          style={{ textTransform: 'uppercase', opacity: 0.9, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.7))' }}
        >
          {design.album}
        </text>

        <g transform="translate(85, 76) scale(0.85)" opacity="0.3">
          <rect width="8" height="4" fill="#fff" />
          <line x1="1" y1="0.5" x2="1" y2="3.5" stroke="#000" strokeWidth="0.4" />
          <line x1="2" y1="0.5" x2="2" y2="3.5" stroke="#000" strokeWidth="0.2" />
          <line x1="3" y1="0.5" x2="3" y2="3.5" stroke="#000" strokeWidth="0.5" />
          <line x1="4.5" y1="0.5" x2="4.5" y2="3.5" stroke="#000" strokeWidth="0.3" />
          <line x1="5.5" y1="0.5" x2="5.5" y2="3.5" stroke="#000" strokeWidth="0.2" />
          <line x1="6.5" y1="0.5" x2="6.5" y2="3.5" stroke="#000" strokeWidth="0.4" />
        </g>

        <text 
          x="8" 
          y="79" 
          fill="#FFF" 
          fontSize="2.2" 
          fontFamily="var(--font-mono)" 
          letterSpacing="0.1"
          opacity="0.35"
        >
          STEREO LP
        </text>

        <text 
          x="8" 
          y="81.5" 
          fill={design.themeColor} 
          fontSize="1.8" 
          fontFamily="var(--font-mono)" 
          letterSpacing="0.1"
          opacity="0.4"
        >
          33 1/3 RPM
        </text>

        <g transform="translate(6, 8) scale(0.7)" opacity="0.35">
          <rect x="0" y="0" width="13" height="5.5" fill="#000" rx="0.5" />
          <rect x="0.2" y="0.2" width="12.6" height="5.1" fill="none" stroke="#fff" strokeWidth="0.15" />
          <text x="6.5" y="2" textAnchor="middle" fill="#fff" fontSize="1.3" fontWeight="900" fontFamily="var(--font-display)">PARENTAL</text>
          <text x="6.5" y="3.4" textAnchor="middle" fill="#fff" fontSize="1.3" fontWeight="900" fontFamily="var(--font-display)">ADVISORY</text>
          <text x="6.5" y="4.6" textAnchor="middle" fill="#fff" fontSize="0.9" fontFamily="var(--font-mono)">EXPLICIT CODING</text>
        </g>
      </svg>
    </div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ t }) => {
  const isSpanish = t.eyebrow === 'HABILIDADES';
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  // 3D Card Hover Perspective Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Rotate relative to center position
    const angleX = (yc - y) / 10;
    const angleY = (x - xc) / 10;
    
    card.style.transform = `perspective(600px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-6px) scale3d(1.03, 1.03, 1.03)`;
    card.style.boxShadow = `0 20px 40px rgba(27, 12, 12, 0.12), 0 0 25px rgba(76, 92, 45, 0.05)`;
    
    const logoWrapper = card.querySelector('.skills__album-cover-gradient') as HTMLDivElement;
    if (logoWrapper) {
      logoWrapper.style.transform = `scale(1.04) translateZ(15px)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.boxShadow = '';
    
    const logoWrapper = card.querySelector('.skills__album-cover-gradient') as HTMLDivElement;
    if (logoWrapper) {
      logoWrapper.style.transform = '';
    }
  };

  // Flatten all skills tags from groups into a list with categories
  const allSkills = React.useMemo(() => {
    const list: { name: string; category: string }[] = [];
    t.groups.forEach(group => {
      group.tags.forEach(tag => {
        // Map category properly
        let category = 'Tooling';
        if (group.name === 'Frontend') category = 'Frontend';
        else if (group.name === 'Backend & DB') category = 'Backend & DB';
        list.push({ name: tag, category });
      });
    });
    return list;
  }, [t.groups]);

  // States
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState<boolean>(false);

  // Filter skills based on chosen pill
  const filteredSkills = React.useMemo(() => {
    if (activeCategory === 'All') return allSkills;
    return allSkills.filter(s => s.category === activeCategory);
  }, [allSkills, activeCategory]);

  const currentSkill = filteredSkills[currentTrackIndex] || filteredSkills[0] || allSkills[0];
  const metadata = SKILL_METADATA[currentSkill.name] || {
    year: '2026',
    type: 'Skill',
    mastery: 80,
    gradient: 'linear-gradient(135deg, var(--color-forest) 0%, var(--color-shadow) 100%)',
    projects: [],
    descEs: 'Competencia técnica profesional en desarrollo de software moderno.',
    descEn: 'Professional software engineering technical competence.'
  };

  // Stagger animation on grid updates
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.skills__album-card');
    
    gsap.killTweensOf(cards);
    gsap.fromTo(cards, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05, 
        duration: 0.4, 
        ease: 'power2.out',
        overwrite: 'auto'
      }
    );
  }, [activeCategory]);

  // Scroll Trigger Parallax Effects (spotlight + giant background text)
  useEffect(() => {
    const section = sectionRef.current;
    const bgText = bgTextRef.current;
    const spotlight = spotlightRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (bgText) {
        gsap.fromTo(bgText,
          { xPercent: -50, x: '15%' },
          {
            xPercent: -50,
            x: '-15%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            }
          }
        );
      }

      if (spotlight) {
        gsap.to(spotlight, {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Controls implementations
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (trackName: string) => {
    const idx = filteredSkills.findIndex(s => s.name === trackName);
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      setIsPlaying(true);
      setSidebarOpen(true);
      if (window.innerWidth <= 768) {
        setMobileDetailsOpen(true);
      }
    }
  };

  // Determine current category display label
  const getCategoryLabel = (category: string) => {
    if (category === 'Frontend') return isSpanish ? 'Frontend Hits' : 'Frontend Hits';
    if (category === 'Backend & DB') return isSpanish ? 'Backend & DB Classics' : 'Backend & DB Classics';
    return isSpanish ? 'Tooling Essentials' : 'Tooling Essentials';
  };

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      {/* Spotlight Ambient Glow */}
      <div className="skills-section__spotlight" ref={spotlightRef} style={{ background: metadata.gradient }}></div>

      {/* Parallax Background Giant Text */}
      <div className="skills-section__bg-text" ref={bgTextRef}>
        PLAYLIST
      </div>

      <div className="skills-section__container">
        {/* Header with Title and Spotify Category Pills */}
        <div className="skills-section__header">
          <div>
            <p className="skills-section__eyebrow">{t.eyebrow}</p>
            <h2 className="skills-section__title">{t.title}</h2>
          </div>

          {/* Spotify-style Home View Filters */}
          <div className="skills-section__filters">
            <button 
              className={`filter-pill ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('All'); setCurrentTrackIndex(0); }}
            >
              {isSpanish ? 'Todo' : 'All'}
            </button>
            <button 
              className={`filter-pill ${activeCategory === 'Frontend' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('Frontend'); setCurrentTrackIndex(0); }}
            >
              Frontend
            </button>
            <button 
              className={`filter-pill ${activeCategory === 'Backend & DB' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('Backend & DB'); setCurrentTrackIndex(0); }}
            >
              Backend & DB
            </button>
            <button 
              className={`filter-pill ${activeCategory === 'Tooling' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('Tooling'); setCurrentTrackIndex(0); }}
            >
              {isSpanish ? 'Herramientas' : 'Tooling'}
            </button>
          </div>
        </div>

        {/* Content Layout: Left Grid, Right Sidebar */}
        <div className="skills-section__layout">
          
          {/* 1. Spotify Albums Library Grid */}
          <div className="skills-section__grid-wrapper">
            <div className="skills-section__grid" ref={gridRef}>
              {filteredSkills.map((skill) => {
                const isActive = skill.name === currentSkill.name;
                const skillMeta = SKILL_METADATA[skill.name];

                return (
                  <div 
                    key={skill.name} 
                    className={`skills__album-card ${isActive ? 'active' : ''}`}
                    onClick={() => selectTrack(skill.name)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Album Art Canvas */}
                    <div className="skills__album-cover-wrapper">
                      <SkillAlbumCover name={skill.name} isActive={isActive} isPlaying={isPlaying} />

                      {/* Hover play button */}
                      <button 
                        className="skills__album-play-btn"
                        aria-label={`Play ${skill.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isActive) {
                            handlePlayPause();
                          } else {
                            selectTrack(skill.name);
                          }
                        }}
                      >
                        {isActive && isPlaying ? (
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Card Metadata */}
                    <div className="skills__album-details">
                      <h3 className="skills__album-name">{skill.name}</h3>
                      <p className="skills__album-meta">
                        {skillMeta?.type} • {skillMeta?.year}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Spotify "Now Playing View" Sidebar */}
          {sidebarOpen && (
            <div className="skills-section__sidebar">
              <div className="skills-sidebar__card">
                <div className="skills-sidebar__header">
                  <h3 className="skills-sidebar__panel-title">
                    {isSpanish ? 'Vista Reproduciendo' : 'Now Playing View'}
                  </h3>
                  <button 
                    className="skills-sidebar__close-btn"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close panel"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Big Album Art */}
                <div className="skills-sidebar__large-cover">
                  <SkillAlbumCover name={currentSkill.name} isActive={isPlaying} isPlaying={isPlaying} />
                </div>

                {/* Album Details */}
                <div className="skills-sidebar__track-info">
                  <h4 className="skills-sidebar__track-title">{currentSkill.name}</h4>
                  <p className="skills-sidebar__track-category">
                    {getCategoryLabel(currentSkill.category)}
                  </p>
                </div>

                {/* Description - "About the Album" */}
                <div className="skills-sidebar__about">
                  <h5>{isSpanish ? 'Sobre esta tecnología' : 'About this technology'}</h5>
                  <p>{isSpanish ? metadata.descEs : metadata.descEn}</p>
                </div>

                {/* Featured Projects - "Featured In" list */}
                {metadata.projects && metadata.projects.length > 0 && (
                  <div className="skills-sidebar__projects">
                    <h5>{isSpanish ? 'Aparece en' : 'Featured in'}</h5>
                    <div className="skills-sidebar__project-chips">
                      {metadata.projects.map(proj => (
                        <a key={proj} href="#projects" className="project-chip">
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                          {proj}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Drawer (Now Playing Bottom Sheet) */}
      {mobileDetailsOpen && (
        <div className="skills-mobile-sheet">
          <div className="skills-mobile-sheet__backdrop" onClick={() => setMobileDetailsOpen(false)}></div>
          <div className="skills-mobile-sheet__content">
            <div className="skills-mobile-sheet__header">
              <div className="skills-mobile-sheet__handle" onClick={() => setMobileDetailsOpen(false)}></div>
              <button 
                className="skills-mobile-sheet__close"
                onClick={() => setMobileDetailsOpen(false)}
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
            
            <div className="skills-mobile-sheet__scroll">
              <div className="skills-mobile-sheet__cover">
                <SkillAlbumCover name={currentSkill.name} isActive={isPlaying} isPlaying={isPlaying} />
              </div>
              
              <div className="skills-mobile-sheet__info">
                <h3 className="skills-mobile-sheet__title">{currentSkill.name}</h3>
                <p className="skills-mobile-sheet__category">{getCategoryLabel(currentSkill.category)}</p>
              </div>

              <div className="skills-mobile-sheet__about">
                <h4>{isSpanish ? 'Sobre esta tecnología' : 'About this technology'}</h4>
                <p>{isSpanish ? metadata.descEs : metadata.descEn}</p>
              </div>

              {metadata.projects && metadata.projects.length > 0 && (
                <div className="skills-mobile-sheet__projects">
                  <h4>{isSpanish ? 'Aparece en' : 'Featured in'}</h4>
                  <div className="skills-mobile-sheet__project-chips">
                    {metadata.projects.map(proj => (
                      <a key={proj} href="#projects" className="project-chip" onClick={() => setMobileDetailsOpen(false)}>
                        {proj}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
