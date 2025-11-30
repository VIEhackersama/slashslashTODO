"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav
      className="
        w-full h-16 border-b 
        bg-white dark:bg-neutral-900 
        border-gray-200 dark:border-neutral-800 
      "
    >
      <div className="max-w-screen-xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            //TODO
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link
              href="/projects"
              className="nav-item hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/todos"
              className="nav-item hover:text-primary transition-colors"
            >
              Todos
            </Link>
            <span className="nav-item cursor-pointer">About Us</span>
            <span className="nav-item cursor-pointer">Contact</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Input
              placeholder="Search documentation..."
              className="
                bg-gray-100 dark:bg-neutral-800
                border border-gray-300 dark:border-neutral-700 
                text-sm w-64 rounded-lg pl-4 pr-10
                text-gray-800 dark:text-gray-200
              "
            />
            <span className="absolute right-3 top-2 text-xs text-gray-400 dark:text-gray-500">
              Ctrl K
            </span>
          </div>

          <ThemeToggle />

          {/* If logged in */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">
                Hello, <span className="font-semibold">{user.username}</span>
              </span>

              <Button
                variant="outline"
                onClick={logout}
                className="dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800 px-4"
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              {/* Login Button */}
              <Button
                variant="outline"
                className="dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800 px-4"
              >
                <Link href="/auth/login">Login</Link>
              </Button>

              {/* Register Button */}
              <Button className="dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 px-4">
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
