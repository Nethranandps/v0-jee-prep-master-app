"use client";

import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/lib/app-context";
import { sampleQuestions } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export function StudentTestActiveScreen() {
  const { navigate, setCompletedTestId, activeTestId } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(sampleQuestions.length).fill(null)
  );
  const [flagged, setFlagged] = useState<boolean[]>(
    new Array(sampleQuestions.length).fill(false)
  );
  const [timeLeft, setTimeLeft] = useState(3600);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = newAnswers[currentQ] === optionIdx ? null : optionIdx;
    setAnswers(newAnswers);
  };

  const toggleFlag = () => {
    const newFlagged = [...flagged];
    newFlagged[currentQ] = !newFlagged[currentQ];
    setFlagged(newFlagged);
  };

  const handleSubmit = () => {
    setCompletedTestId(activeTestId);
    navigate("student-results");
  };

  const question = sampleQuestions[currentQ];
  const answeredCount = answers.filter((a) => a !== null).length;
  const flaggedCount = flagged.filter(Boolean).length;

  if (showSubmitConfirm) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warning/15">
            <AlertTriangle className="h-8 w-8 text-warning" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-lg font-bold text-foreground">Submit Test?</h2>
            <p className="text-sm text-muted-foreground">
              You have answered {answeredCount} of {sampleQuestions.length}{" "}
              questions.
              {flaggedCount > 0 && ` ${flaggedCount} flagged for review.`}
            </p>
          </div>
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSubmitConfirm(false)}
              className="flex-1 rounded-xl bg-transparent py-5 text-foreground"
            >
              Review
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 rounded-xl bg-primary py-5 text-primary-foreground"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/95 px-4 py-3 backdrop-blur-xl">
        <button
          onClick={() => setShowSubmitConfirm(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
          aria-label="Exit test"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span
            className={`text-sm font-mono font-semibold ${
              timeLeft < 300 ? "text-destructive" : "text-foreground"
            }`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
        <button
          onClick={toggleFlag}
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
            flagged[currentQ]
              ? "bg-warning/15 text-warning"
              : "text-muted-foreground hover:bg-muted"
          }`}
          aria-label={flagged[currentQ] ? "Remove flag" : "Flag question"}
        >
          <Flag className="h-5 w-5" />
        </button>
      </header>

      {/* Question Navigator */}
      <div className="flex gap-1.5 overflow-x-auto px-4 py-3">
        {sampleQuestions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentQ(idx)}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium transition-all ${
              idx === currentQ
                ? "bg-primary text-primary-foreground"
                : answers[idx] !== null
                ? "bg-accent/15 text-accent"
                : flagged[idx]
                ? "bg-warning/15 text-warning"
                : "bg-muted text-muted-foreground"
            }`}
            aria-label={`Question ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Question Content */}
      <div className="flex flex-1 flex-col gap-6 px-4 pb-32 pt-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {question.subject}
          </span>
          <span className="text-xs text-muted-foreground">
            Q{currentQ + 1} of {sampleQuestions.length}
          </span>
        </div>

        <p className="text-base font-medium leading-relaxed text-foreground">
          {question.text}
        </p>

        <div className="flex flex-col gap-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                answers[currentQ] === idx
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                  answers[currentQ] === idx
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </div>
              <span
                className={`text-sm ${
                  answers[currentQ] === idx
                    ? "font-medium text-foreground"
                    : "text-foreground"
                }`}
              >
                {option}
              </span>
              {answers[currentQ] === idx && (
                <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="flex-1 gap-1 rounded-xl bg-transparent py-5 text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          {currentQ === sampleQuestions.length - 1 ? (
            <Button
              onClick={() => setShowSubmitConfirm(true)}
              className="flex-1 rounded-xl bg-accent py-5 text-accent-foreground"
            >
              Submit Test
            </Button>
          ) : (
            <Button
              onClick={() =>
                setCurrentQ(
                  Math.min(sampleQuestions.length - 1, currentQ + 1)
                )
              }
              className="flex-1 gap-1 rounded-xl bg-primary py-5 text-primary-foreground"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
