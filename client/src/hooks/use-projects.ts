import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

// Re-defining schema here to ensure strict type safety on the client
// In a larger app, this would be imported from shared/schema directly
const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  excerpt: z.string(),
  fullDescription: z.string(),
  url: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await res.json();
      
      // Validate response against our schema
      const result = z.array(ProjectSchema).safeParse(data);
      if (!result.success) {
        console.error("Project validation failed:", result.error);
        throw new Error("Invalid data format received from server");
      }
      
      return result.data;
    },
  });
}
