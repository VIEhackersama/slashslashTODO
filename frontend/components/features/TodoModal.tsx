"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Trash2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/services/project.service";
import { Todo } from "@/services/todo.service";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectId: string, todos: Partial<Todo>[]) => Promise<void>;
  initialTodos: Partial<Todo>[];
  projects: Project[];
}

export function TodoModal({
  isOpen,
  onClose,
  onSubmit,
  initialTodos,
  projects,
}: TodoModalProps) {
  const [todos, setTodos] = useState<Partial<Todo>[]>([]);
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTodos(initialTodos);
      // Default to first project if available
      if (projects.length > 0 && !projectId) {
        setProjectId(projects[0]._id);
      }
    }
  }, [isOpen, initialTodos, projects]);

  const handleTodoChange = (index: number, field: keyof Todo, value: any) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], [field]: value };
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    if (newTodos.length === 0) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    setLoading(true);
    try {
      await onSubmit(projectId, todos);
      onClose();
    } catch (error) {
      console.error("Failed to submit todos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl z-50 max-h-[90vh] flex flex-col"
          >
            <div className="bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-full">
              <div className="p-6 border-b border-white/10 flex justify-between items-center shrink-0">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {todos.length > 1 ? `Add ${todos.length} Todos` : "Add Todo"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <form
                  id="todo-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Select Project
                    </label>
                    <select
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary/50 text-white"
                      required
                    >
                      <option value="" disabled>
                        Select a project...
                      </option>
                      {projects.map((p) => (
                        <option
                          key={p._id}
                          value={p._id}
                          className="bg-neutral-900"
                        >
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    {todos.map((todo, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-3 relative group"
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            onClick={() => removeTodo(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground">
                            Content
                          </label>
                          <Input
                            value={todo.content || ""}
                            onChange={(e) =>
                              handleTodoChange(index, "content", e.target.value)
                            }
                            placeholder="Todo content..."
                            required
                            className="bg-black/20 border-white/10 focus:border-primary/50"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">
                              File Path
                            </label>
                            <Input
                              value={todo.file_path || ""}
                              onChange={(e) =>
                                handleTodoChange(
                                  index,
                                  "file_path",
                                  e.target.value
                                )
                              }
                              placeholder="src/main.ts"
                              className="bg-black/20 border-white/10 focus:border-primary/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">
                              Line Number
                            </label>
                            <Input
                              type="number"
                              value={todo.line_number || ""}
                              onChange={(e) =>
                                handleTodoChange(
                                  index,
                                  "line_number",
                                  parseInt(e.target.value) || 1
                                )
                              }
                              placeholder="1"
                              className="bg-black/20 border-white/10 focus:border-primary/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">
                              Priority
                            </label>
                            <select
                              value={todo.priority || "low"}
                              onChange={(e) =>
                                handleTodoChange(
                                  index,
                                  "priority",
                                  e.target.value
                                )
                              }
                              className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary/50 text-white"
                            >
                              <option value="low" className="bg-neutral-900">
                                Low
                              </option>
                              <option value="medium" className="bg-neutral-900">
                                Medium
                              </option>
                              <option value="high" className="bg-neutral-900">
                                High
                              </option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">
                              Due Date
                            </label>
                            <Input
                              type="date"
                              value={
                                todo.due_date
                                  ? new Date(todo.due_date)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={(e) =>
                                handleTodoChange(
                                  index,
                                  "due_date",
                                  e.target.value
                                )
                              }
                              className="bg-black/20 border-white/10 focus:border-primary/50"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-white/10 flex justify-end gap-3 shrink-0 bg-neutral-900">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="todo-form"
                  disabled={loading || todos.length === 0 || !projectId}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg shadow-primary/20"
                >
                  {loading ? "Saving..." : "Save Todos"}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
