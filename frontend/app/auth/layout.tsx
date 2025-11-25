"use client";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/NavBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col w-full relative">{children}</main>
      <Footer></Footer>
    </div>
  );
}
