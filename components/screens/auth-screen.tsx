"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Zap,
  GraduationCap,
  BookOpen,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

export function AuthScreen() {
  const { navigate, setRole, setUserName } = useApp();
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | null>(null);
  const [authMethod, setAuthMethod] = useState<"google" | "phone" | "email" | null>(null);
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!selectedRole) return;
    setRole(selectedRole);
    if (name.trim()) {
      setUserName(name.trim());
    } else {
      setUserName(selectedRole === "student" ? "Rahul" : "Dr. Sharma");
    }
    navigate(selectedRole === "student" ? "student-home" : "teacher-home");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center gap-2 px-6 pt-12">
        <Zap className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold text-foreground">JEE Prep Master</span>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-12">
        <div className="animate-fade-in flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground text-balance">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue your JEE preparation journey
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label className="text-sm font-medium text-foreground">
              I am a...
            </Label>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedRole("student")}
                className={`flex flex-1 flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all ${
                  selectedRole === "student"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    selectedRole === "student"
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                >
                  <GraduationCap
                    className={`h-6 w-6 ${
                      selectedRole === "student"
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    selectedRole === "student"
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  Student
                </span>
              </button>
              <button
                onClick={() => setSelectedRole("teacher")}
                className={`flex flex-1 flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all ${
                  selectedRole === "teacher"
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    selectedRole === "teacher"
                      ? "bg-accent"
                      : "bg-muted"
                  }`}
                >
                  <BookOpen
                    className={`h-6 w-6 ${
                      selectedRole === "teacher"
                        ? "text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    selectedRole === "teacher"
                      ? "text-accent"
                      : "text-foreground"
                  }`}
                >
                  Teacher
                </span>
              </button>
            </div>
          </div>

          {selectedRole && (
            <div className="animate-fade-in flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder={selectedRole === "student" ? "e.g. Rahul Kumar" : "e.g. Dr. Sharma"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border-border bg-card py-5 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label className="text-sm font-medium text-foreground">
                  Continue with
                </Label>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuthMethod("google");
                    handleLogin();
                  }}
                  className="flex items-center gap-3 rounded-2xl border-border bg-card py-6 text-foreground hover:bg-muted"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuthMethod("phone");
                    handleLogin();
                  }}
                  className="flex items-center gap-3 rounded-2xl border-border bg-card py-6 text-foreground hover:bg-muted"
                >
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  Continue with Phone
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuthMethod("email");
                    handleLogin();
                  }}
                  className="flex items-center gap-3 rounded-2xl border-border bg-card py-6 text-foreground hover:bg-muted"
                >
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  Continue with Email
                </Button>
              </div>

              <Button
                onClick={handleLogin}
                disabled={!selectedRole}
                className="mt-2 w-full gap-2 rounded-2xl bg-primary py-6 text-base font-semibold text-primary-foreground"
                size="lg"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <p className="px-6 pb-8 text-center text-xs text-muted-foreground">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}
