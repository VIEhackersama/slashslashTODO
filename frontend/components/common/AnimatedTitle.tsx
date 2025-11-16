"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function AnimatedTitle() {
  const text = "//TODO: Don't abandon your workflow";
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let index = 0;
    let timeout: any;

    const type = () => {
      if (index <= text.length) {
        setDisplay(text.slice(0, index));
        index++;
        timeout = setTimeout(type, 90);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.h1
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-6xl font-bold text-center select-none text-gray-900 dark:text-white transition-colors"
    >
      {display}
      <span className="opacity-60">|</span>
    </motion.h1>
  );
}
