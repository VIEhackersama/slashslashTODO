"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedWrapper({ children, className }: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full max-w-4xl", className)}
    >
      {children}
    </motion.div>
  );
}
