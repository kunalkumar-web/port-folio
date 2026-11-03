export type ProjectCategory = 'all' | 'ai' | 'fullstack' | 'fintech' | 'web';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  longDescription: string;
  tags: string[];
  techStack: string[];
  role: string;
  timeline: string;
  image: string;
  highlights: string[];
  architecture?: {
    nodes: { title: string; desc: string; icon: string }[];
    flowSummary: string;
  };
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  links?: {
    live?: string;
    github?: string;
    demo?: string;
  };
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: 'languages' | 'frontend' | 'backend' | 'ai' | 'tools';
  icon: string;
  experienceYears: string;
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  accomplishments: string[];
  technologies: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  mood: string;
  aspect: string;
  src: string;
  palette: string;
  description: string;
  colorGradePreset: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  budget?: string;
  message: string;
}
