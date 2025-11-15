"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold">
        //TODO
      </Link>
      <div className="flex gap-4">
        <Button variant="outline">Đăng nhập</Button>
        <Button>Đăng xuất</Button>
      </div>
    </nav>
  );
}
