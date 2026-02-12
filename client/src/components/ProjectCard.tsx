import { motion } from "framer-motion";
import { ArrowRight, FolderOpen, Github, Globe } from "lucide-react";
import type { Project } from "@/hooks/use-projects";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  onViewMore: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onViewMore, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden group">
        <div className="h-2 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-primary/10 rounded-lg text-primary mb-3">
              <FolderOpen className="w-6 h-6" />
            </div>
            {project.url && (
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
          <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {project.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="prose prose-sm dark:prose-invert line-clamp-3 text-muted-foreground">
            {project.excerpt || "No description provided."}
          </div>
        </CardContent>
        
        <CardFooter className="pt-4 border-t border-border/30">
          <Button 
            onClick={() => onViewMore(project)}
            variant="ghost" 
            className="w-full group/btn hover:bg-primary/5 hover:text-primary justify-between"
          >
            <span>Read Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
