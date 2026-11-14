import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every post is a Markdown (.md) file with a small header ("frontmatter") on top.
const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false), // true = hidden from the live site
  short: z.boolean().default(false), // Variety only: true = show the full text in the list
});

const science = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/science' }),
  schema: postSchema,
});

const variety = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/variety' }),
  schema: postSchema,
});

export const collections = { science, variety };
