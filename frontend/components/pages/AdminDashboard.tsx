"use client";

import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/common/NavBar";
import { AnimatedWrapper } from "@/components/common/AnimatedWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserData {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && user?.role === "admin") {
      fetchUsers();
    } else if (!authLoading && user?.role !== "admin") {
      setLoading(false); // Stop loading if not admin, will show access denied
    }
  }, [authLoading, user]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await api.get("/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status === "success") {
        setUsers(res.data.data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen dark:bg-neutral-950 flex items-center justify-center text-white transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen dark:bg-neutral-950 flex flex-col items-center justify-center text-white p-4 transition-colors">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-300">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors">
      <main className="flex-1 p-8">
        <AnimatedWrapper>
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text  bg-linear-to-r text-muted-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage users and view system stats
                </p>
              </div>
              <Card className="bg-card border-border">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-muted-foreground text-sm">
                    Total Users:
                  </span>
                  <span className="text-xl font-bold">{users.length}</span>
                </CardContent>
              </Card>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400">
                {error}
              </div>
            )}

            <Card className="overflow-hidden border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        User
                      </th>
                      <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Role
                      </th>
                      <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="hover:bg-muted/50 transition-colors group"
                      >
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                              {u.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium">{u.username}</div>
                              <div className="text-sm text-muted-foreground">
                                {u.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              u.role === "admin"
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                : "bg-muted text-muted-foreground border-border"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-muted-foreground font-mono text-xs opacity-50">
                          {u._id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {users.length === 0 && !error && (
                <div className="p-8 text-center text-muted-foreground">
                  No users found.
                </div>
              )}
            </Card>
          </div>
        </AnimatedWrapper>
      </main>
    </div>
  );
};

export default AdminDashboard;
