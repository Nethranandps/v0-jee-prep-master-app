"use client";

import { useApp } from "@/lib/app-context";
import { sampleResults } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Target,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ArrowLeft,
  Share2,
  BarChart3,
} from "lucide-react";

export function StudentResultsScreen() {
  const { navigate } = useApp();

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("student-home")}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Test Results</h1>
        <button
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
          aria-label="Share results"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* Score Card */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg className="h-28 w-28 -rotate-90" viewBox="0 0 112 112">
            <circle
              cx="56"
              cy="56"
              r="48"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <circle
              cx="56"
              cy="56"
              r="48"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(sampleResults.totalScore / 100) * 301.6} 301.6`}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground">
              {sampleResults.totalScore}%
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            <span className="text-base font-semibold text-foreground">
              Great Performance!
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            Percentile: {sampleResults.percentile}
          </span>
        </div>

        <div className="flex w-full gap-3 pt-2">
          <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-accent/10 p-3">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span className="text-lg font-bold text-foreground">
              {sampleResults.correctAnswers}
            </span>
            <span className="text-[10px] text-muted-foreground">Correct</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-destructive/10 p-3">
            <XCircle className="h-5 w-5 text-destructive" />
            <span className="text-lg font-bold text-foreground">
              {sampleResults.incorrectAnswers}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Incorrect
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-muted p-3">
            <MinusCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-lg font-bold text-foreground">
              {sampleResults.unattempted}
            </span>
            <span className="text-[10px] text-muted-foreground">Skipped</span>
          </div>
        </div>
      </div>

      {/* Subject-wise Breakdown */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            Subject-wise Performance
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {sampleResults.subjectWise.map((sub) => (
            <div key={sub.subject} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">
                  {sub.subject}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {sub.score}/{sub.total * 10}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(sub.score / (sub.total * 10)) * 100}%`,
                    backgroundColor: sub.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold text-foreground">
            Difficulty Breakdown
          </h2>
        </div>
        <div className="flex gap-3">
          {sampleResults.difficultyWise.map((diff) => (
            <div
              key={diff.name}
              className="flex flex-1 flex-col items-center gap-2 rounded-xl bg-muted/50 p-3"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${diff.color}20` }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: diff.color }}
                >
                  {diff.value}
                </span>
              </div>
              <span className="text-[11px] font-medium text-muted-foreground">
                {diff.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("student-feedback")}
          className="flex-1 rounded-2xl bg-transparent py-5 text-foreground"
        >
          Give Feedback
        </Button>
        <Button
          onClick={() => navigate("student-home")}
          className="flex-1 rounded-2xl bg-primary py-5 text-primary-foreground"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
