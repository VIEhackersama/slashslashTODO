"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/common/NavBar";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { todoService, Todo } from "@/services/todo.service";
import { projectService, Project } from "@/services/project.service";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge"; // adjust path if needed

interface ProjectDetailPageProps {
  projectId: string;
}

export default function ProjectDetailPage({
  projectId,
}: ProjectDetailPageProps) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [projectRes, todosRes] = await Promise.all([
        projectService.getById(projectId),
        todoService.getAll(projectId),
      ]);

      setProject(projectRes ?? null);
      setTodos(todosRes ?? []);
    } catch (error) {
      console.error("Failed to fetch data", error);
      setProject(null);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    fetchData();
  }, [authLoading, isAuthenticated, router, fetchData]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen dark:bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen dark:bg-neutral-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Button onClick={() => router.push("/projects")}>
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 z-10">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/projects")}
            className="mb-4 hover:bg-white/10 text-muted-foreground hover:text-white gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>

          {/* ✅ This block was missing in your paste */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {project.name}
            </h1>

            {project.repository_url && (
              <a
                href={project.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {project.repository_url}
              </a>
            )}
          </motion.div>
        </div>

        <div className="grid gap-4">
          {todos.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
              <p className="text-muted-foreground">
                No TODOs found for this project.
              </p>
              <Button
                variant="link"
                onClick={() => router.push("/todos")}
                className="text-primary hover:text-primary/80"
              >
                Add some TODOs
              </Button>
            </div>
          ) : (
            todos.map((todo, index) => (
              <motion.div
                key={todo._id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium text-gray-200">
                        {todo.content}
                      </CardTitle>

                      <Badge
                        variant={
                          todo.status === "resolved" ? "default" : "secondary"
                        }
                        className={
                          todo.status === "open"
                            ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                            : todo.status === "resolved"
                            ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                            : "bg-gray-500/20 text-gray-500"
                        }
                      >
                        {todo.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-mono bg-black/30 px-2 py-0.5 rounded text-xs">
                          {todo.file_path}:{todo.line_number}
                        </span>
                      </div>

                      {todo.priority && (
                        <div className="flex items-center gap-1">
                          <AlertCircle
                            className={`h-4 w-4 ${
                              todo.priority === "high"
                                ? "text-red-500"
                                : todo.priority === "medium"
                                ? "text-yellow-500"
                                : "text-blue-500"
                            }`}
                          />
                          <span className="capitalize">
                            {todo.priority} Priority
                          </span>
                        </div>
                      )}

                      {todo.due_date && (
                        <div className="flex items-center gap-1 text-primary font-medium">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Due: {new Date(todo.due_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
