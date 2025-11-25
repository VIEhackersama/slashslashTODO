"use client";
import { Navbar } from "@/components/common/NavBar";
import { CodeEditor } from "@/components/features/CodeEditor";
import { AnimatedWrapper } from "@/components/common/AnimatedWrapper";
import { AnimatedTitle } from "../common/AnimatedTitle";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/common/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors relative overflow-hidden">
      {/* Colorful Background Blob */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <div className="mt-8 flex flex-col items-center z-10">
        <AnimatedTitle />

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <p className="text-center font-semibold text-muted-foreground max-w-3xl mt-3 px-4 leading-relaxed p-3">
            //TODO comments are small but powerful reminders that keep your
            workflow organized. This tool automatically detects //TODO
            annotations from your code, turning them into actionable tasks,
            schedules, or issues — helping you stay productive and keep your
            codebase clean.
          </p>

          <div className="flex flex-col items-center sm:flex-row gap-4 mt-6">
            <Button className="px-8 py-6 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              Try now below
            </Button>

            <Button
              variant="outline"
              className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/5"
            >
              Continue your work
            </Button>

            {/* 🌟 NÚT CHATBOT THÊM VÀO ĐÂY */}
            <Button
              variant="default"
              className="px-8 py-6 text-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20"
              onClick={() => (window.location.href = "/chat")}
            >
              💬 Chat with bot
            </Button>
          </div>
        </motion.div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-8 z-10">
        <AnimatedWrapper>
          <CodeEditor />
        </AnimatedWrapper>
      </main>

      <Footer />
    </div>
  );
}
