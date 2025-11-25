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
import { Footer } from "@/components/common/Footer";

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen dark:bg-neutral-950 flex flex-col items-center justify-center text-white p-4 transition-colors">
        <div className="bg-destructive/10 border border-destructive/50 rounded-2xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors">
      <Navbar />
      <main className="flex-1 p-4 md:p-8">
        <AnimatedWrapper>
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage users and view system stats
                </p>
              </div>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-muted-foreground text-sm font-medium">
                    Total Users:
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {users.length}
                  </span>
                </CardContent>
              </Card>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-xl text-destructive">
                {error}
              </div>
            )}

            <Card className="overflow-hidden border-border/50 bg-card/50 shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border/50">
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
                  <tbody className="divide-y divide-border/50">
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3 shadow-sm">
                              {u.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {u.username}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {u.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                              u.role === "admin"
                                ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground text-sm">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-muted-foreground font-mono text-[10px] opacity-50">
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
      <Footer />
    </div>
  );
};

export default AdminDashboard;
