"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getAccessToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const setAccessToken = (token: string | null) => {
    if (typeof window === "undefined") return;
    if (!token) localStorage.removeItem("accessToken");
    else localStorage.setItem("accessToken", token);
  };

  // -----------------------------
  // Fetch current user
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
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  // -----------------------------
  // Login
  // -----------------------------
  const login = async (identifier: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // refresh token cookie
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setAccessToken(data.accessToken);
      await fetchMe();

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  // -----------------------------
  // Refresh Access Token
  // -----------------------------
  const refresh = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users/refresh-token", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setAccessToken(data.accessToken);
      await fetchMe();
    } catch {
      setUser(null);
    }
  };

  // -----------------------------
  // Logout
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
    } catch (e) {
      console.error("logout error:", e);
    }
  };

  // -----------------------------
  // Load user on first mount
  // -----------------------------
  useEffect(() => {
    (async () => {
      await fetchMe();
      setLoading(false);
    })();
  }, [fetchMe]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refresh,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
