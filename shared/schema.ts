import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We'll primarily use file-system for projects, but we can define the shape here
export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  excerpt: z.string(),
  fullDescription: z.string(),
  url: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;

// Just in case we need a simple DB table later
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  siteName: text("site_name").default("My Projects"),
});

export const insertSettingsSchema = createInsertSchema(settings);
export type Settings = typeof settings.$inferSelect;
