"use client";

import { Navbar } from "@/components/common/NavBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col">
      <Navbar />

      <main className="flex-1 grid place-items-center px-4 pt-20 pb-10">
        {children}
      </main>
    </div>
  );
}
