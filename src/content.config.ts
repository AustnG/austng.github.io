// Content schemas. Every file in /content is validated against these at build time,
// so a bad edit fails CI instead of breaking the live site.
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const yearMonth = z
  .string()
  .regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM, for example 2026-11');

const profile = defineCollection({
  loader: file('content/profile.yaml'),
  schema: z.object({
    name: z.string(),
    initials: z.string().max(3),
    headline: z.string(),
    role: z.string(),
    company: z.string(),
    companyShort: z.string(),
    location: z.string(),
    intro: z.string(),
    tagline: z.string(),
    summary: z.string(),
    stats: z.array(z.object({ value: z.coerce.string(), label: z.string() })).max(4),
    email: z.email(),
    phone: z.string().regex(/^\+\d{11}$/, 'Use +1 and 10 digits, for example +12705550123'),
    phoneDisplay: z.string(),
    links: z.object({ linkedin: z.url(), github: z.url() }),
    site: z.url(),
    certifications: z.array(z.string()),
    education: z.array(
      z.object({ school: z.string(), degree: z.string(), location: z.string(), years: z.string() }),
    ),
    honors: z.array(z.string()).default([]),
    languages: z.array(z.string()).default([]),
  }),
});

const experience = defineCollection({
  loader: file('content/experience.yaml'),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    location: z.string(),
    start: yearMonth,
    end: yearMonth.optional(),
    tier: z.enum(['main', 'earlier']),
    bullets: z.array(z.string()),
    projects: z
      .array(z.object({ year: z.number(), name: z.string(), desc: z.string() }))
      .default([]),
  }),
});

const skills = defineCollection({
  loader: file('content/skills.yaml'),
  schema: z.object({ order: z.number(), label: z.string(), skills: z.array(z.string()) }),
});

const projects = defineCollection({
  loader: file('content/projects.yaml'),
  schema: z.object({
    name: z.string(),
    mark: z.string().max(4),
    category: z.enum(['work', 'personal', 'play']),
    status: z.enum(['live', 'in-progress', 'next', 'idea', 'paused', 'archived']),
    // Default to internal so new hub entries stay off the public site until explicitly shared.
    visibility: z.enum(['public', 'internal']).default('internal'),
    year: z.number(),
    desc: z.string(),
    platform: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    nextStep: z.string().optional(),
    note: z
      .string()
      .regex(/^hub\/[\w./-]+\.md$/, 'Use a path under hub/, for example hub/projects/my-app.md')
      .optional(),
    repo: z.url().optional(),
    link: z.url().optional(),
    linkText: z.string().optional(),
  }),
});

const bands = defineCollection({
  loader: file('content/bands.yaml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    years: z.string(),
    status: z.enum(['active', 'past']),
    blurb: z.string(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    embed: z.url().optional(),
  }),
});

const sport = defineCollection({
  loader: file('content/sport.yaml'),
  schema: z.object({
    kind: z.enum(['team', 'league', 'timeline']),
    name: z.string(),
    years: z.string().optional(),
    blurb: z.string(),
    link: z.url().optional(),
    linkText: z.string().optional(),
  }),
});

export const collections = { profile, experience, skills, projects, bands, sport };
