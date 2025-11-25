"use client";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navbar } from "@/components/common/NavBar";
import { AnimatedWrapper } from "@/components/common/AnimatedWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/common/Footer";

const ProfileSettings = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen dark:bg-neutral-950 flex items-center justify-center text-white transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen dark:bg-neutral-950 flex items-center justify-center text-white transition-colors">
        <p>You are not logged in.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatedWrapper>
          <Card className="w-full max-w-2xl border-border/50 shadow-xl overflow-hidden">
            <CardHeader className="relative pb-8 p-0">
              <div className="h-32 bg-linear-to-r from-primary to-secondary opacity-90" />
              <div className="relative -mt-12 flex flex-col items-center px-6">
                <div className="h-24 w-24 rounded-full border-4 border-background bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground overflow-hidden shadow-lg">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="mt-4 text-center">
                  <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                    {user.username}
                  </CardTitle>
                  <CardDescription className="text-lg mt-1">
                    {user.email}
                  </CardDescription>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 capitalize">
                    {user.role || "User"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 mt-4 p-6">
              <div className="grid gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all hover:bg-muted/50">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    User ID
                  </h3>
                  <p className="font-mono text-sm text-foreground/80">
                    {user.id}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all hover:bg-muted/50">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Email
                    </h3>
                    <p className="text-foreground/80">{user.email}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all hover:bg-muted/50">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Role
                    </h3>
                    <p className="capitalize text-foreground/80">
                      {user.role || "user"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-border/50 text-center">
                <p className="text-muted-foreground text-sm italic">
                  Profile settings are currently read-only.
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedWrapper>
      </main>
    </div>
  );
};
export default ProfileSettings;
