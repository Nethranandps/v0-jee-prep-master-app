"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { sampleTests } from "@/lib/sample-data";
import {
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Filter,
} from "lucide-react";

const filters = ["All", "Assigned", "Completed"];

export function StudentTestsScreen() {
  const { navigate, setActiveTestId } = useApp();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTests = sampleTests.filter((test) => {
    if (activeFilter === "All") return true;
    return test.status === activeFilter.toLowerCase();
  });

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground">My Tests</h1>
        <p className="text-sm text-muted-foreground">
          {sampleTests.length} tests available
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === filter
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Test List */}
      <div className="flex flex-col gap-3">
        {filteredTests.map((test, index) => (
          <button
            key={test.id}
            onClick={() => {
              if (test.status === "assigned") {
                setActiveTestId(test.id);
                navigate("student-test-active");
              } else {
                navigate("student-results");
              }
            }}
            className="animate-fade-in flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/50"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                test.status === "completed" ? "bg-accent/15" : "bg-primary/10"
              }`}
            >
              {test.status === "completed" ? (
                <CheckCircle2 className="h-6 w-6 text-accent" />
              ) : (
                <BookOpen className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-sm font-semibold text-foreground">
                {test.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {test.subject}
              </span>
              <div className="flex items-center gap-3 pt-1">
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {test.duration} min
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {test.questions} Qs
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    test.difficulty === "Hard"
                      ? "bg-destructive/15 text-destructive"
                      : test.difficulty === "Medium"
                      ? "bg-warning/15 text-warning"
                      : "bg-accent/15 text-accent"
                  }`}
                >
                  {test.difficulty}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {test.score !== null && (
                <span className="text-lg font-bold text-primary">
                  {test.score}%
                </span>
              )}
              <span className="text-[10px] text-muted-foreground">
                {test.dueDate}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
