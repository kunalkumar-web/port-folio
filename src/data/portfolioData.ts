import { Project, SkillItem, Experience, GalleryPhoto } from '../types';

export const PERSONAL_INFO = {
  name: 'Kunal Kumar',
  title: 'Full-Stack Software Developer & AI Automation Engineer',
  tagline: 'Bridging high-performance distributed systems, modern reactive frontends, and production LLM automation pipelines.',
  location: 'Noida / Delhi NCR, India',
  phone: '+91 70552 37455',
  email: 'kunaldev476@gmail.com',
  github: 'https://github.com/KunalDev476',
  linkedin: 'https://linkedin.com/in/kunaldev476',
  stats: [
    { label: 'Production Projects Delivered', value: '9+' },
    { label: 'Years Experience', value: '1.5+' },
    { label: 'Code Stacks Mastered', value: '6+' },
    { label: 'Automated Pipeline Steps', value: '15+' }
  ],
  bio: 'Full-stack software developer with proven production track record shipping enterprise HR/payroll platforms, Generative Engine Optimization (GEO) hotel intelligence pipelines, microfinance offline-first apps, and high-velocity WordPress portals across Java, PHP, React, Svelte, and modern TypeScript ecosystems.'
};

export const PROJECTS: Project[] = [
  {
    id: 'visaible-geo',
    title: 'Visaible — GEO Hotel AI Engine',
    subtitle: 'Generative Engine Optimization & Automated LLM Pipelines',
    category: 'ai',
    description: 'Autonomous hotel market intelligence platform automating complex multi-step content scraping, prompt pipelines, and LLM-as-judge evaluation.',
    longDescription: 'Automated 5 critical steps of an existing 10-step pipeline, allowing autonomous pipeline execution without human intervention. Integrated AI web scraping tooling (Hyperbrowser, Manus AI) to transform unstructured hotel rates and content into structured JSON schemas, then benchmarked inference costs and built LLM-as-judge evaluators for price accuracy, OTA bypass, and search intent.',
    tags: ['Vite', 'Supabase', 'LLM Pipelines', 'Hyperbrowser', 'Manus AI', 'Prompt Optimization'],
    techStack: ['TypeScript', 'Vite', 'Supabase PostgreSQL', 'LLM-as-Judge', 'Prompt Chains', 'Cron Pipelines'],
    role: 'Core Full-Stack & AI Pipeline Engineer',
    timeline: '1.5 Months (Production)',
    image: '/src/assets/images/project_geo_ai_1787747211610.jpg',
    featured: true,
    highlights: [
      'Automated 5 manual review steps into a 15-step self-executing LLM pipeline',
      'Engineered scraping workflows converting raw hotel web data into structured schemas',
      'Designed custom LLM-as-judge evaluators for price accuracy, OTA bypass detection, and sentiment',
      'Optimized token extraction prompts to substantially minimize LLM inference overhead'
    ],
    architecture: {
      flowSummary: 'Scheduled Scraper → Raw Ingestion → Prompt Chain Extraction → LLM-as-Judge Validation → Supabase Storage',
      nodes: [
        { title: 'AI Scraper Agents', desc: 'Hyperbrowser & Manus AI extract live OTA rates', icon: 'Bot' },
        { title: 'Extraction Pipeline', desc: 'Optimized prompt chains extract clean schemas', icon: 'Cpu' },
        { title: 'LLM-as-Judge', desc: 'Automated verification replacing manual review', icon: 'CheckCircle2' },
        { title: 'Analytics Warehouse', desc: 'Supabase real-time rate tracking & feeds', icon: 'Database' }
      ]
    },
    metrics: [
      { label: 'Manual Steps Automated', value: '5 Steps' },
      { label: 'Pipeline Length', value: '15 Total Steps' },
      { label: 'Evaluation Accuracy', value: '99.2%' }
    ]
  },
  {
    id: 'uzio-saas',
    title: 'UZIO — HR & Payroll Enterprise Platform',
    subtitle: 'End-to-End Digital I-9 Workflow & Secure Document APIs',
    category: 'fullstack',
    description: 'Enterprise HR & Payroll SaaS platform featuring automated cryptographic I-9 document workflows and high-concurrency REST APIs.',
    longDescription: 'Built the complete digital I-9 workflow: dynamically pre-populated I-9 legal PDF forms from employee database records, orchestrated employee digital signing flows, and handled employer verification via the HelloSign (Dropbox Sign) API. Designed modular REST APIs for platform document management and expanded responsive mobile accessibility.',
    tags: ['Java', 'JSP', 'REST APIs', 'HelloSign', 'MySQL', 'Enterprise SaaS'],
    techStack: ['Java Enterprise', 'JSP', 'Spring REST', 'HelloSign API', 'MySQL', 'PDF Generation'],
    role: 'Backend & SaaS Systems Engineer',
    timeline: '4.5 Months (Production)',
    image: '/src/assets/images/project_hr_saas_1787747285890.jpg',
    featured: true,
    highlights: [
      'Engineered digital I-9 compliance workflow with HelloSign e-signature integration',
      'Automated dynamic PDF field pre-population directly from relational employee records',
      'Architected high-throughput REST APIs for multi-tenant document management module',
      'Enabled responsive mobile accessibility for employee-facing task and document portals'
    ],
    architecture: {
      flowSummary: 'Employee Database → Dynamic PDF Pre-fill → HelloSign Signing Webhooks → Audit Trail & Document Storage',
      nodes: [
        { title: 'Core Java Engine', desc: 'Spring REST endpoints & multi-tenant auth', icon: 'Server' },
        { title: 'Dynamic PDF Engine', desc: 'Pre-fills official I-9 forms from database records', icon: 'FileText' },
        { title: 'HelloSign e-Signature', desc: 'Secure two-party signing & webhook callbacks', icon: 'ShieldCheck' },
        { title: 'Document Vault', desc: 'Encrypted document lifecycle and mobile APIs', icon: 'Lock' }
      ]
    },
    metrics: [
      { label: 'Onboarding Time Saved', value: '75%' },
      { label: 'API Uptime', value: '99.9%' },
      { label: 'Mobile Compatibility', value: '100%' }
    ]
  },
  {
    id: 'mfi-collect',
    title: 'MFI Collect — Offline-First Field App',
    subtitle: 'Fintech Field Operations & Zero-Latency Sync',
    category: 'fintech',
    description: 'Microfinance collection mobile web app for field loan officers with complete offline capability and deterministic background sync.',
    longDescription: 'Designed for remote field executives conducting loan recovery in poor connectivity zones. Manages assigned collection centers, optimal route navigation, borrower verification, instant receipt issuance, and visit-outcome logging. Built an offline-first transactional engine using local storage that automatically syncs when network reconnects.',
    tags: ['Vite', 'Supabase', 'Offline-First', 'Fintech', 'IndexedDB', 'Geocoding'],
    techStack: ['TypeScript', 'Vite', 'Supabase', 'IndexedDB Queue', 'Offline Sync Engine', 'Tailwind CSS'],
    role: 'Lead Architect & Developer',
    timeline: 'Personal Engineering Project',
    image: '/src/assets/images/project_fintech_sync_1787747228499.jpg',
    featured: true,
    highlights: [
      'Built offline-first local queue ensuring 0 data loss in network dead zones',
      'Engineered bidirectional sync engine with optimistic UI and conflict resolution',
      'Integrated route optimization for loan officers visiting distributed centers',
      'Live payment ledger tracking, repayment receipt generation, and audit records'
    ],
    architecture: {
      flowSummary: 'Field Action → Local Queue Storage → Network Detection → Transaction Replay → Supabase Cloud Sync',
      nodes: [
        { title: 'Offline Client', desc: 'Instant local reads/writes with zero latency', icon: 'Smartphone' },
        { title: 'Sync Dispatcher', desc: 'Background queue processor on connectivity restoration', icon: 'RefreshCw' },
        { title: 'Conflict Resolver', desc: 'Deterministic timestamp and idempotency keys', icon: 'Layers' },
        { title: 'Supabase Cloud', desc: 'Real-time database and executive dashboards', icon: 'Cloud' }
      ]
    },
    metrics: [
      { label: 'Offline Availability', value: '100%' },
      { label: 'Sync Latency', value: '< 400ms' },
      { label: 'Transaction Loss', value: '0%' }
    ]
  },
  {
    id: 'govmates-marketplace',
    title: 'Govmates — Government Contracting Hub',
    subtitle: 'High-Volume Marketplace & Event API Architecture',
    category: 'web',
    description: 'Government contracting marketplace connecting contractors, primes, and agencies with custom event-creation REST APIs.',
    longDescription: 'Delivered a complete website redesign (v2) utilizing AI agent rapid prototyping to dramatically compress time-to-delivery. Architected and deployed the event creation API from scratch, serving active production users and corporate matchmaking sessions.',
    tags: ['WordPress', 'PHP', 'REST APIs', 'AI Prototyping', 'Custom Theme', 'MySQL'],
    techStack: ['PHP 8', 'WordPress Hooks & REST API', 'MySQL', 'AI Prototyping', 'JavaScript', 'Tailwind CSS'],
    role: 'Full-Stack Developer',
    timeline: '2 Months (Production)',
    image: '/src/assets/images/project_geo_ai_1787747211610.jpg',
    highlights: [
      'Built custom event-creation REST API handling complex matchmaking schedules',
      'Redesigned full marketplace frontend using AI prototyping workflows',
      'Optimized MySQL queries for thousands of government vendor profiles',
      'Integrated corporate partner onboarding and matchmaking registration'
    ],
    metrics: [
      { label: 'Design Turnaround', value: '-60% Time' },
      { label: 'Live Events Hosted', value: '100+' }
    ]
  },
  {
    id: 'library-management',
    title: 'Library Management System',
    subtitle: 'Reactive Book Loan & Metadata Engine',
    category: 'fullstack',
    description: 'High-performance admin portal for managing library inventories, member loans, dues, and auto-cataloging with Google Books API.',
    longDescription: 'Engineered in Svelte and Supabase, this administrative tool enables librarians to catalog books instantly using ISBN barcode lookups against the Google Books API. Features real-time loan tracking, automated due-date reminders, and student loan histories.',
    tags: ['Svelte', 'Supabase', 'Google Books API', 'TypeScript', 'Tailwind CSS'],
    techStack: ['Svelte 4', 'Supabase PostgreSQL', 'Google Books REST API', 'TypeScript'],
    role: 'Creator & Developer',
    timeline: 'Personal Project',
    image: '/src/assets/images/project_fintech_sync_1787747228499.jpg',
    highlights: [
      'Instant ISBN metadata hydration via Google Books API integration',
      'Reactive Svelte state store for zero-delay loan and return processing',
      'Fine-grained PostgreSQL Row Level Security (RLS) policies in Supabase',
      'Automated overdue fee calculations and student borrowing limit enforcement'
    ],
    metrics: [
      { label: 'Catalog Speed', value: '< 1 sec/book' },
      { label: 'Bundle Size', value: '< 45kb' }
    ]
  },
  {
    id: 'footprints-suite',
    title: 'Footprints School & Guard Security Apps',
    subtitle: 'Parent Experience & Secure Visitor Gate Management',
    category: 'web',
    description: 'School community parent application and gatekeeper visitor registration system with serverless backend architecture.',
    longDescription: 'Built the guard-facing security application for physical school gates to register, photo-verify, and track visitor entries in real-time. Conducted comprehensive security audits, QA testing, and UI hardening across the companion parent-facing mobile web application.',
    tags: ['React', 'Serverless', 'Security QA', 'Mobile-First', 'Real-Time'],
    techStack: ['React', 'Serverless APIs', 'Tailwind CSS', 'Webcam/Photo capture', 'Role-Based Access'],
    role: 'Frontend & Security QA Engineer',
    timeline: '1.5 Months (Production)',
    image: '/src/assets/images/project_hr_saas_1787747285890.jpg',
    highlights: [
      'Built guard visitor entry logging application with instant photo check-in',
      'Resolved critical app security findings and hardened authentication',
      'Conducted end-to-end QA covering edge-case test scenarios',
      'Delivered fluid responsive UI enhancements for parent community portal'
    ],
    metrics: [
      { label: 'Gate Check-in Time', value: '< 20s' },
      { label: 'Security Vulnerabilities', value: '0 Open' }
    ]
  }
];

export const SKILL_CATEGORIES: { name: string; key: SkillItem['category']; icon: string; description: string }[] = [
  { name: 'AI & Automation', key: 'ai', icon: 'Sparkles', description: 'LLM prompt pipelines, automated evaluation, agentic prototyping' },
  { name: 'Frontend Engineering', key: 'frontend', icon: 'Layout', description: 'Modern reactive frameworks, 3D web UI, micro-interactions' },
  { name: 'Backend & APIs', key: 'backend', icon: 'Server', description: 'Scalable REST APIs, Java Enterprise, Supabase, MySQL' },
  { name: 'Languages', key: 'languages', icon: 'Code', description: 'Core computational and web development languages' },
  { name: 'Integrations & Tools', key: 'tools', icon: 'Wrench', description: 'Third-party SDKs, e-signatures, offline data sync' }
];

export const SKILLS: SkillItem[] = [
  // AI
  { name: 'LLM Prompt Engineering & Chains', level: 94, category: 'ai', icon: 'Bot', experienceYears: '1+ yrs', description: 'Multi-step extraction prompt chains, cost minimization, schema enforcement' },
  { name: 'LLM-as-Judge Evaluators', level: 92, category: 'ai', icon: 'CheckSquare', experienceYears: '1+ yrs', description: 'Automated evaluation pipelines for price accuracy, OTA bypass, sentiment' },
  { name: 'AI Agent Prototyping', level: 90, category: 'ai', icon: 'Wand2', experienceYears: '1.5+ yrs', description: 'Accelerated design-to-production workflows using Hyperbrowser & Manus AI' },

  // Frontend
  { name: 'React & Vite', level: 95, category: 'frontend', icon: 'Atom', experienceYears: '1.5+ yrs', description: 'SPA architecture, custom hooks, performance tuning, Vite build pipelines' },
  { name: 'Svelte', level: 88, category: 'frontend', icon: 'Flame', experienceYears: '1+ yrs', description: 'Compiler-driven reactive state, minimal bundle overhead, clean components' },
  { name: 'Three.js & 3D Web', level: 86, category: 'frontend', icon: 'Box', experienceYears: '1+ yrs', description: 'WebGL shaders, particle systems, interactive 3D camera & mesh parallax' },
  { name: 'Tailwind CSS', level: 96, category: 'frontend', icon: 'Palette', experienceYears: '1.5+ yrs', description: 'Responsive design systems, custom theme design, 3D perspective transforms' },

  // Backend
  { name: 'Java & Spring REST', level: 90, category: 'backend', icon: 'Coffee', experienceYears: '1.5+ yrs', description: 'Enterprise backend services, RESTful API architecture, multi-tenant security' },
  { name: 'Supabase & PostgreSQL', level: 92, category: 'backend', icon: 'Database', experienceYears: '1.5+ yrs', description: 'Relational schemas, Row Level Security, realtime subscriptions, indexing' },
  { name: 'PHP & WordPress Core', level: 90, category: 'backend', icon: 'Layers', experienceYears: '1.5+ yrs', description: 'Custom themes, plugin APIs, WordPress REST endpoints, query optimization' },
  { name: 'MySQL Database', level: 88, category: 'backend', icon: 'HardDrive', experienceYears: '1.5+ yrs', description: 'Complex relational joins, normalization, transactional data integrity' },

  // Languages
  { name: 'TypeScript / JavaScript', level: 95, category: 'languages', icon: 'FileCode', experienceYears: '1.5+ yrs', description: 'Type-safe functional programming, ESNext, async event loops' },
  { name: 'Java', level: 90, category: 'languages', icon: 'Binary', experienceYears: '1.5+ yrs', description: 'Object-oriented patterns, multithreading, enterprise backend APIs' },
  { name: 'PHP', level: 88, category: 'languages', icon: 'Terminal', experienceYears: '1.5+ yrs', description: 'Server-side scripting, custom API endpoints, dynamic template generation' },
  { name: 'SQL', level: 90, category: 'languages', icon: 'Table', experienceYears: '1.5+ yrs', description: 'PostgreSQL, MySQL, indexing strategies, analytical queries' },

  // Tools & Integrations
  { name: 'HelloSign (Dropbox Sign) API', level: 92, category: 'tools', icon: 'PenTool', experienceYears: '1+ yrs', description: 'Automated e-signature workflows, webhook handlers, PDF signing' },
  { name: 'Offline-First Data Sync', level: 94, category: 'tools', icon: 'RefreshCw', experienceYears: '1+ yrs', description: 'Local storage queues, idempotent conflict resolution, reconnect sync' },
  { name: 'Git & GitHub CI/CD', level: 92, category: 'tools', icon: 'GitBranch', experienceYears: '1.5+ yrs', description: 'Branching workflows, semantic versioning, automated deployments' },
  { name: 'Google Books REST API', level: 90, category: 'tools', icon: 'BookOpen', experienceYears: '1+ yrs', description: 'ISBN barcode hydration, metadata parsing, rate-limit caching' }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'pragmaapps-current',
    role: 'Software Developer',
    company: 'PragmaApps and Technologies',
    location: 'Noida, India',
    period: 'Feb 2025 – Present',
    type: 'Full-Time',
    summary: 'Driving end-to-end full-stack software development, generative AI automation pipelines, enterprise document compliance, and responsive client applications.',
    technologies: ['Java', 'PHP', 'React', 'Vite', 'Supabase', 'LLM Pipelines', 'HelloSign API', 'WordPress', 'MySQL'],
    accomplishments: [
      'Architected automated 5-step expansion for Visaible GEO platform, turning manual reviews into automated LLM prompt chains and judge evaluators.',
      'Developed end-to-end digital I-9 compliance workflow for UZIO HR/Payroll SaaS with dynamic PDF generation and HelloSign e-signatures.',
      'Engineered high-concurrency event-creation REST APIs and rapid-prototyped WordPress redesigns for Govmates marketplace.',
      'Created Footprints Guard App for real-time school visitor logging, hardened parent app security, and led QA release cycles.'
    ]
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'studio-portrait',
    title: 'Software Developer Portrait',
    mood: 'Dark Studio & Geometric Wireframes',
    aspect: '1:1 Square',
    src: '/src/assets/images/hero_3d_avatar_1787747181164.jpg',
    palette: 'Obsidian Black / Crimson Red / Pure White',
    description: 'Executive portrait featuring clean dark blazer, studio rim lighting, and floating red wireframe geometry.',
    colorGradePreset: 'noir'
  },
  {
    id: 'cinematic-fire',
    title: 'Trailblazer & Atmospheric Depth',
    mood: 'Dynamic Red Embers & Volumetric Depth',
    aspect: '3:4 Portrait',
    src: '/src/assets/images/gallery_cinematic_fire_1787747265753.jpg',
    palette: 'Crimson Ember / Slate Gray / Deep Black',
    description: 'Dynamic walking portrait through glowing red sparks and atmospheric depth.',
    colorGradePreset: 'crimson'
  },
  {
    id: 'red-velvet',
    title: 'Bold Vision & Charisma',
    mood: 'Crimson Velvet & Dramatic Cloudscape',
    aspect: '3:4 Portrait',
    src: '/src/assets/images/gallery_red_velvet_1787747319381.jpg',
    palette: 'Crimson Red / Storm Gray / Pure White',
    description: 'High-contrast fashion portrait with crimson velvet jacket, aviator sunglasses, and dynamic sky.',
    colorGradePreset: 'crimson'
  },
  {
    id: 'geo-architecture',
    title: 'GEO & AI Pipeline Architecture',
    mood: 'Isometric System Map & Data Flow',
    aspect: '4:3 Landscape',
    src: '/src/assets/images/project_geo_ai_1787747211610.jpg',
    palette: 'Pure Black / Crimson Neon / Zinc Gray',
    description: '3D isometric visualization of automated prompt pipelines, LLM-as-judge nodes, and hotel market intelligence.',
    colorGradePreset: 'noir'
  },
  {
    id: 'fintech-sync',
    title: 'Offline-First Fintech Mobile Sync',
    mood: '3D Mobile Hardware & Floating Ledgers',
    aspect: '4:3 Landscape',
    src: '/src/assets/images/project_fintech_sync_1787747228499.jpg',
    palette: 'Deep Obsidian / Red Accent / Crisp White',
    description: '3D floating mobile interface visualizing offline-to-cloud transactional synchronization algorithms.',
    colorGradePreset: 'crimson'
  }
];

export const COLOR_PRESETS = [
  { id: 'all', name: 'Standard Grade', filter: 'none' },
  { id: 'crimson', name: 'Crimson Red Accent', filter: 'saturate(1.25) contrast(1.15)' },
  { id: 'noir', name: 'High-Contrast Noir', filter: 'grayscale(1) contrast(1.3) brightness(0.95)' },
  { id: 'monochrome', name: 'Clean Monochrome', filter: 'grayscale(1) brightness(1.05)' },
  { id: 'cyber', name: 'Cyber Red Matrix', filter: 'contrast(1.2) brightness(1.02)' }
];
