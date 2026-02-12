import { z } from 'zod';
import { projectSchema } from './schema';

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(projectSchema),
      },
    },
  },
};

// No params needed for this simple path
export function buildUrl(path: string): string {
  return path;
}
