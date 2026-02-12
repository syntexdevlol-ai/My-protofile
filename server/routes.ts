import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import fs from 'fs/promises';
import path from 'path';

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.projects.list.path, async (req, res) => {
    const projectsDir = path.join(process.cwd(), 'projects');
    
    // Ensure directory exists
    try {
      await fs.access(projectsDir);
    } catch {
      await fs.mkdir(projectsDir, { recursive: true });
    }

    try {
      const entries = await fs.readdir(projectsDir, { withFileTypes: true });
      const projects = [];
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const readmePath = path.join(projectsDir, entry.name, 'README.md');
          let fullDescription = '';
          try {
            fullDescription = await fs.readFile(readmePath, 'utf-8');
          } catch (e) {
            fullDescription = '# ' + entry.name + '\nNo README.md found for this project.';
          }

          // Create excerpt (first 2 non-empty lines)
          const lines = fullDescription.split('\n').filter(line => line.trim() !== '');
          const excerpt = lines.slice(0, 2).join('\n');

          projects.push({
            id: entry.name,
            name: entry.name,
            excerpt,
            fullDescription,
            url: '' 
          });
        }
      }
      res.json(projects);
    } catch (error) {
      console.error('Error reading projects:', error);
      res.status(500).json({ message: 'Failed to read projects directory' });
    }
  });

  return httpServer;
}
