import React from 'react';

// For Resume Data
export interface Skill {
  category: string;
  items: string[];
}

export interface JobRole {
  title: string;
  period: string;
  duration?: string;
  location?: string;
  type?: string;
  description: string[];
  skills?: string;
}

export interface Experience {
  company: string;
  logo?: string;
  type?: string;
  totalDuration?: string;
  roles: JobRole[];
}

export interface Education {
  degree: string;
  university: string;
  period: string;
}

export interface ResumeData {
  name: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education;
  projects: {
    description: string;
    link: string;
  };
}

// For Portfolio Data
export interface Project {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  status: string;
  link?: string;
  isInternal?: boolean;
}

export interface PortfolioData {
  professional: Project[];
  personal: Project[];
}


// For Soccer Timeline Data
export interface TimelineEvent {
    name: string;
    years: string;
    description: string;
}
