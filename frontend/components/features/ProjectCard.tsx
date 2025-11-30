"use client";

import { Project } from "@/services/project.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

import { useRouter } from "next/navigation";

// ... inside component
import { todoService } from "@/services/todo.service";
import { useState, useEffect } from "react";

// ... inside component
export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const router = useRouter();
  const [todoCount, setTodoCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const todos = await todoService.getAll(project._id);
        setTodoCount(todos.length);
      } catch (error) {
        console.error("Failed to fetch todo count", error);
      }
    };
    fetchCount();
  }, [project._id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full bg-white/5 backdrop-blur-md border-white/10 hover:border-primary/50 transition-colors overflow-hidden group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <CardHeader className="relative z-10">
          <CardTitle className="flex justify-between items-start gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary truncate">
              {project.name}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(project)}
              className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {project.repository_url && (
            <a
              href={project.repository_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="truncate">{project.repository_url}</span>
            </a>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Updated: {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-emerald-500">
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {todoCount !== null ? `${todoCount} open tasks` : "Loading..."}
            </span>
          </div>
        </CardContent>

        <CardFooter className="relative z-10">
          <Button
            className="w-full bg-gradient-to-r from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary text-white shadow-lg shadow-primary/20"
            onClick={() => router.push(`/projects/${project._id}`)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
