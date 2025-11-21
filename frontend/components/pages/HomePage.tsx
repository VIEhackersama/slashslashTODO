"use client";
import { Navbar } from "@/components/common/NavBar";
import { CodeEditor } from "@/components/features/CodeEditor";
import { AnimatedWrapper } from "@/components/common/AnimatedWrapper";
import { AnimatedTitle } from "../common/AnimatedTitle";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors">
      <Navbar />

      <div className="mt-12 flex flex-col items-center">
        <AnimatedTitle />

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <p className="text-center font-semibold text-gray-600 dark:text-gray-300 max-w-3xl mt-3 px-4 leading-relaxed p-3">
            //TODO comments are small but powerful reminders that keep your
            workflow organized. This tool automatically detects //TODO
            annotations from your code, turning them into actionable tasks,
            schedules, or issues — helping you stay productive and keep your
            codebase clean.
          </p>

          <div>
            <Button className="justify-conent-center m-4 p-5">
              Try now below
            </Button>
            <Button
              variant="outline"
              className="justify-conent-center m-4 p-5 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Continue your work
            </Button>
          </div>
        </motion.div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 pt-0">
        <AnimatedWrapper>
          <CodeEditor />
        </AnimatedWrapper>
      </main>
    </div>
  );
}
