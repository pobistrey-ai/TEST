// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
    coverImage: z.string().optional(),
    updatedDate: z.date().optional(),
    type: z.enum(['post', 'news']),
  }),
});

const albums = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts, albums };
