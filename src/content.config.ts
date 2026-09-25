import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      short: z.string().max(40),
      tagline: z.string(),
      description: z.string().max(170),
      kind: z.enum(["android", "web"]),
      category: z.string(),
      year: z.number().int(),
      order: z.number().int(),
      status: z.enum(["live", "offline", "in-use"]),
      role: z.string(),
      stack: z.array(z.string()).min(1),
      client: z.string().optional(),
      location: z.string().optional(),
      version: z.string().optional(),
      released: z.coerce.date().optional(),
      updated: z.coerce.date().optional(),
      packageName: z.string().optional(),
      monetization: z.string().optional(),
      playUrl: z.url().optional(),
      liveUrl: z.url().optional(),
      links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
      icon: image().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverFrame: z.enum(["phone", "desktop", "wide"]).default("desktop"),
      shots: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
            frame: z.enum(["phone", "desktop", "wide"]),
          }),
        )
        .default([]),
      services: z.array(z.string()).default([]),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    // Başlık uzunsa arama sonuçları için kısa bir <title>.
    seoTitle: z.string().max(55).optional(),
    description: z.string().max(170),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    topic: z.string(),
    relatedWork: z.array(z.string()).default([]),
    relatedService: z.string().optional(),
  }),
});

export const collections = { work, posts };
