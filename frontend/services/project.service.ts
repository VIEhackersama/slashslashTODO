import api from "@/lib/api";

export interface Project {
  _id: string;
  name: string;
  repository_url?: string;
  last_scanned_at?: string;
  createdAt: string;
  updatedAt: string;
}

export const projectService = {
  getAll: async () => {
    const response = await api.get("/projects");
    return response.data.data;
  },

  create: async (data: { name: string; repository_url?: string }) => {
    const response = await api.post("/projects", data);
    return response.data.data;
  },

  update: async (
    id: string,
    data: { name: string; repository_url?: string }
  ) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};
