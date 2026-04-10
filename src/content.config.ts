import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const problemSchema = z.object({
  number: z.number(),
  name: z.string(),
  grade: z.string(),
  info: z.string().optional().default(''),
  video: z.union([z.string(), z.array(z.string())]).optional().default(''),
});

const topoSchema = z.object({
  image: z.string(),
  alt: z.string().optional().default(''),
});

const boulderSchema = z.object({
  name: z.string(),
  id: z.string(),
  topos: z.array(topoSchema),
  problems: z.array(problemSchema),
});

const sectionSchema = z.object({
  name: z.string(),
  gps: z.object({ lat: z.number(), lng: z.number() }).optional(),
  boulders: z.array(boulderSchema),
});

const areas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/areas' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    map_image: z.string(),
    gps: z.object({ lat: z.number(), lng: z.number() }),
    problem_count: z.number(),
    boulder_count: z.number(),
    grade_range: z.string(),
    thumbnail: z.string(),
    order: z.number().optional().default(0),
    boulders: z.array(boulderSchema).optional(),
    sections: z.array(sectionSchema).optional(),
  }),
});

export const collections = { areas };
