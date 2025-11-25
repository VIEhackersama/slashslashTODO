"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/authContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedWrapper } from "@/components/common/AnimatedWrapper";
import { Footer } from "@/components/common/Footer";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(identifier, password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    router.push("/");
  };
  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <AnimatedWrapper>
          <Card className="w-full max-w-md border-border/50 shadow-xl shadow-primary/5 backdrop-blur-sm bg-card/80">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* identifier */}
                <div className="space-y-2">
                  <Input
                    placeholder="Email or Username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* password */}
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-500 text-center font-medium">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700 text-white shadow-lg shadow-primary/20 transition-all"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 text-sm pt-2">
              <div className="text-center text-muted-foreground">
                Don’t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary font-medium hover:underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </AnimatedWrapper>
      </main>
    </div>
  );
}
