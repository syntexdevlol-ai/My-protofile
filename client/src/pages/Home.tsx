import { useState } from "react";
import { useProjects, type Project } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { Loader2, Terminal, Code2, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: projects, isLoading, error, refetch } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewMore = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
        </div>
        <p className="text-muted-foreground font-medium animate-pulse">Scanning repositories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md p-8 rounded-2xl bg-destructive/5 border border-destructive/20 text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4 text-destructive">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-destructive mb-2">Connection Error</h2>
          <p className="text-muted-foreground mb-6">
            Failed to load projects. Ensure the server is running and the projects directory exists.
          </p>
          <Button onClick={() => refetch()} variant="outline" className="border-destructive/30 hover:bg-destructive/10 hover:text-destructive">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />
      
      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <header className="mb-20 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio & Projects</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <span className="block text-foreground">Building the</span>
            <span className="gradient-text">Future of Code</span>
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            A curated collection of my latest experiments, applications, and open-source contributions. 
            Dive into the code and see what I've been working on.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in zoom-in duration-700 delay-300">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
              <Terminal className="w-4 h-4" />
              <span>{projects?.length || 0} Repositories</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
              <Code2 className="w-4 h-4" />
              <span>TypeScript / React</span>
            </div>
          </div>
        </header>

        {/* Projects Grid */}
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onViewMore={handleViewMore}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-3xl bg-muted/30 border border-dashed border-border">
            <FolderOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground">No projects found</h3>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Add folders to your <code>projects</code> directory to see them here.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-20 bg-muted/10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Project Portfolio. Built with React & TanStack Query.</p>
        </div>
      </footer>

      {/* Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
