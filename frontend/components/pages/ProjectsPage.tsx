"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/common/NavBar";
import { Footer } from "@/components/common/Footer";
import { AnimatedTitle } from "@/components/common/AnimatedTitle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { projectService, Project } from "@/services/project.service";
import { ProjectCard } from "@/components/features/ProjectCard";
import { ProjectModal } from "@/components/features/ProjectModal";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
      } else {
        fetchProjects();
      }
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) return null; // Or a loading spinner

  const handleCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: {
    name: string;
    repository_url?: string;
  }) => {
    if (editingProject) {
      await projectService.update(editingProject._id, data);
    } else {
      await projectService.create(data);
    }
    await fetchProjects();
  };

  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 z-10">
        <div className="flex flex-col items-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary mb-4"
          >
            My Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center max-w-2xl"
          >
            Manage your repositories and track your TODOs in one place.
          </motion.p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-semibold text-white">
            {projects.length} Projects
          </div>
          <Button
            onClick={handleCreate}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg shadow-primary/20 gap-2"
          >
            <Plus className="h-5 w-5" />
            New Project
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">
              No projects found.
            </p>
            <Button onClick={handleCreate} variant="outline">
              Create your first project
            </Button>
          </div>
        )}
      </main>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProject}
      />

      <Footer />
    </div>
  );
}
