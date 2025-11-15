import { Navbar } from "@/components/common/NavBar";
import { CodeEditor } from "@/components/features/CodeEditor";
import { AnimatedWrapper } from "@/components/common/AnimatedWrapper";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatedWrapper>
          <CodeEditor />
        </AnimatedWrapper>
      </main>
    </div>
  );
}
