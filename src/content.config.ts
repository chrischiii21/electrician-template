import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const servicesCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/services" }),
    schema: z.object({
        category: z.string(),
        href: z.string(),
        order: z.number(),
        services: z.array(
            z.object({
                label: z.string(),
                href: z.string(),
            })
        ),
    }),
});

const serviceAreasCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/service-areas" }),
    schema: z.object({
        name: z.string(),
        href: z.string(),
        order: z.number(),
    }),
});

export const collections = {
    services: servicesCollection,
    serviceAreas: serviceAreasCollection,
};
