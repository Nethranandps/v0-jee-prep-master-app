"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Sparkles,
  Clock,
  FileText,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const subjects = ["Physics", "Chemistry", "Mathematics", "All Subjects"];
const difficulties = ["Easy", "Medium", "Hard", "Mixed"];
const examPatterns = ["JEE Main", "JEE Advanced", "Custom"];

export function TeacherPaperGeneratorScreen() {
  const { navigate } = useApp();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [pattern, setPattern] = useState("");
  const [numQuestions, setNumQuestions] = useState("30");
  const [duration, setDuration] = useState("60");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const toggleSubject = (sub: string) => {
    if (sub === "All Subjects") {
      setSelectedSubjects(
        selectedSubjects.includes("All Subjects")
          ? []
          : ["All Subjects"]
      );
      return;
    }
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev.filter((s) => s !== "All Subjects"), sub]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 3000);
  };

  const canGenerate =
    selectedSubjects.length > 0 &&
    difficulty &&
    pattern &&
    numQuestions &&
    duration;

  if (isGenerated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-6 animate-scale-in">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-xl font-bold text-foreground">
              Paper Generated!
            </h2>
            <p className="text-sm text-muted-foreground">
              Your {numQuestions}-question {difficulty.toLowerCase()} paper has
              been created with the {pattern} pattern.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Subject</span>
              <span className="text-xs font-medium text-foreground">
                {selectedSubjects.join(", ")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Questions</span>
              <span className="text-xs font-medium text-foreground">
                {numQuestions}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Duration</span>
              <span className="text-xs font-medium text-foreground">
                {duration} min
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Difficulty</span>
              <span className="text-xs font-medium text-foreground">
                {difficulty}
              </span>
            </div>
          </div>
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("teacher-tests")}
              className="flex-1 rounded-xl bg-transparent py-5 text-foreground"
            >
              View Papers
            </Button>
            <Button
              onClick={() => {
                setIsGenerated(false);
                setSelectedSubjects([]);
                setDifficulty("");
                setPattern("");
              }}
              className="flex-1 rounded-xl bg-primary py-5 text-primary-foreground"
            >
              Create Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-muted" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-lg font-bold text-foreground">
              Generating Paper...
            </h2>
            <p className="text-sm text-muted-foreground">
              AI is creating {numQuestions} questions based on your criteria
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("teacher-home")}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-bold text-foreground">
            AI Paper Generator
          </h1>
          <p className="text-xs text-muted-foreground">
            Create custom JEE papers with AI
          </p>
        </div>
      </div>

      {/* Subject Selection */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          Select Subjects
        </Label>
        <div className="flex flex-wrap gap-2">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => toggleSubject(sub)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                selectedSubjects.includes(sub)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Pattern */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          Exam Pattern
        </Label>
        <div className="flex flex-wrap gap-2">
          {examPatterns.map((p) => (
            <button
              key={p}
              onClick={() => setPattern(p)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                pattern === p
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          Difficulty Level
        </Label>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                difficulty === d
                  ? d === "Easy"
                    ? "bg-accent text-accent-foreground"
                    : d === "Hard"
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Questions */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          Number of Questions
        </Label>
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="rounded-xl border-border bg-card text-foreground"
            min="5"
            max="200"
          />
        </div>
      </div>

      {/* Duration */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          Duration (minutes)
        </Label>
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="rounded-xl border-border bg-card text-foreground"
            min="10"
            max="360"
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-2">
        <Button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="w-full gap-2 rounded-2xl bg-primary py-6 text-base font-semibold text-primary-foreground"
          size="lg"
        >
          <Sparkles className="h-5 w-5" />
          Generate Paper with AI
        </Button>
      </div>
    </div>
  );
}
