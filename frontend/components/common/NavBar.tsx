"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Input } from "@/components/ui/input";

export function Navbar() {
  return (
    <nav
      className="
        w-full h-16 border-b 
        bg-white dark:bg-neutral-900 
        border-gray-200 dark:border-neutral-800 
      "
    >
      {/* Centered container */}
      <div className="max-w-screen-xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            //TODO
          </Link>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <span className="nav-item">Your works</span>
            <span className="nav-item">About Us</span>
            <span className="nav-item">Contact</span>
            {/* <span className="nav-item">Blog</span>
            <span className="nav-item">Templates</span>
            <span className="nav-item">Enterprise</span> */}
          </div>
        </div>

        {/* Right: Search + Buttons */}
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

          <Button
            variant="outline"
            className="dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800 px-4"
          >
            Login
          </Button>

          <Button className="dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 px-4">
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
}
