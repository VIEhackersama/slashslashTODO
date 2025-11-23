"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
}

export function useAuth() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getAccessToken = () => {
    return typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;
  };

  const setAccessToken = (token: string | null) => {
    if (typeof window === "undefined") return;
    if (!token) localStorage.removeItem("accessToken");
    else localStorage.setItem("accessToken", token);
  };

  // -----------------------------
  // FETCH CURRENT USER
  // -----------------------------
  const fetchMe = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return null;

    try {
      const res = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.data || res.data.user);
      return res.data;
    } catch (err) {
      console.warn("fetchMe error:", err);
      setUser(null);
      return null;
    }
  }, []);

  // -----------------------------
  // LOGIN
  // -----------------------------
  const login = async (identifier: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // store refresh_token cookie
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // save access token
      setAccessToken(data.accessToken);

      // fetch user
      await fetchMe();

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = async () => {
    try {
      const token = getAccessToken();

      await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });

      setAccessToken(null);
      setUser(null);
      router.push("/auth/login");
    } catch (err) {
      console.error("logout error:", err);
    }
  };

  // -----------------------------
  // On mount → load user automatically
  // -----------------------------
  useEffect(() => {
    (async () => {
      await fetchMe();
      setLoading(false);
    })();
  }, [fetchMe]);

  return {
    user,
    loading,
    login,
    logout,
    fetchMe,
    isAuthenticated: !!user,
  };
}
