"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone: phone || undefined,
          profile_picture: profilePicture || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.map((e: any) => e.msg).join(", "));
        }
        throw new Error(data.message || "Registration failed");
      }

      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <AnimatedWrapper>
          <Card className="w-full max-w-md border-border/50 shadow-xl shadow-primary/5 backdrop-blur-sm bg-card/80">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                Create an account
              </CardTitle>
              <CardDescription className="text-center">
                Fill in your information below
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Phone (optional) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Phone (can be used as username)
                  </label>
                  <Input
                    placeholder="+8434567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Profile Picture URL (optional) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Profile picture URL
                  </label>
                  <Input
                    placeholder="https://example.com/avatar.png"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
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
                  className="w-full bg-linear-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700 text-white shadow-lg shadow-primary/20 transition-all"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary font-medium hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </AnimatedWrapper>
      </main>
    </div>
  );
}
