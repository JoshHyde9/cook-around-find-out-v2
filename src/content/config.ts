import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const recipeCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    thumbnail: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
  loader: glob({ pattern: "**/**.md", base: "./src/content/recipe" })
});

export const collections = {
  recipe: recipeCollection,
};
