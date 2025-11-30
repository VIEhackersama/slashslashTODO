import api from "@/lib/api";

export interface Todo {
  _id?: string;
  project_id: string;
  assigned_to_user_id?: string;
  file_path: string;
  line_number: number;
  content: string;
  status: "open" | "resolved" | "ignored";
  priority?: "low" | "medium" | "high";
  due_date?: string;
  context?: {
    snippet: string;
  };
}

export const todoService = {
  create: async (projectId: string, data: Partial<Todo>) => {
    const response = await api.post(`/projects/${projectId}/todos`, data);
    return response.data.data;
  },

  getAll: async (projectId: string) => {
    const response = await api.get(`/projects/${projectId}/todos`);
    return response.data.data;
  },

  update: async (projectId: string, todoId: string, data: Partial<Todo>) => {
    const response = await api.put(
      `/projects/${projectId}/todos/${todoId}`,
      data
    );
    return response.data.data;
  },

  delete: async (projectId: string, todoId: string) => {
    await api.delete(`/projects/${projectId}/todos/${todoId}`);
  },
};
