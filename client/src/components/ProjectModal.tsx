import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import type { Project } from "@/hooks/use-projects";
import { FolderGit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl">
        <div className="p-6 border-b border-border/50 bg-muted/20 flex items-start justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <FolderGit2 className="w-8 h-8" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                {project.name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-base">
                Project Documentation & Details
              </DialogDescription>
            </div>
          </div>
          {/* Close button is handled by DialogPrimitive, but we can add custom actions here if needed */}
        </div>

        <ScrollArea className="flex-grow p-6 md:p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20">
            <ReactMarkdown>
              {project.fullDescription || "# No content available\n\nThis project does not have a detailed README."}
            </ReactMarkdown>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border/50 bg-muted/20 flex justify-end gap-2">
           <Button variant="outline" onClick={onClose}>
            Close
           </Button>
           {project.url && (
             <Button onClick={() => window.open(project.url, '_blank')}>
               Visit Project
             </Button>
           )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
