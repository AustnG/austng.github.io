export type ActiveTab = 'home' | 'portfolio' | 'resume' | 'found';

export interface JobExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
  keyProjects?: {
    year: string;
    name: string;
    desc: string;
  }[];
}

export interface SkillCategory {
  category: string;
  subgroups: {
    label?: string;
    skills: string[];
  }[];
}

export interface ProjectItem {
  id: string;
  name: string;
  badge: 'Live' | 'Concept' | 'In Progress';
  desc: string;
  link?: string;
  linkText?: string;
  category: 'professional' | 'personal';
}

