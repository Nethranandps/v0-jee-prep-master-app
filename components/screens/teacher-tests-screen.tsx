"use client";

import { useApp } from "@/lib/app-context";
import { sampleTeacherData } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Plus,
  Users,
  Calendar,
  Sparkles,
} from "lucide-react";

export function TeacherTestsScreen() {
  const { navigate } = useApp();

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground">My Papers</h1>
          <p className="text-sm text-muted-foreground">
            {sampleTeacherData.recentPapers.length} papers created
          </p>
        </div>
        <Button
          onClick={() => navigate("teacher-paper-generator")}
          className="gap-2 rounded-xl bg-primary text-primary-foreground"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>

      {/* Papers List */}
      <div className="flex flex-col gap-3">
        {sampleTeacherData.recentPapers.map((paper, index) => (
          <div
            key={paper.id}
            className="animate-fade-in flex flex-col gap-3 rounded-2xl border border-border bg-card p-4"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">
                  {paper.title}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {paper.created}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {paper.questions} Qs
                  </span>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  paper.assigned
                    ? "bg-accent/15 text-accent"
                    : "bg-warning/15 text-warning"
                }`}
              >
                {paper.assigned ? "Assigned" : "Draft"}
              </span>
            </div>

            {paper.assigned && (
              <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Assigned to {paper.students} students
                </span>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-lg bg-transparent text-xs text-foreground"
              >
                View Paper
              </Button>
              {!paper.assigned && (
                <Button
                  size="sm"
                  className="flex-1 rounded-lg bg-primary text-xs text-primary-foreground"
                >
                  Assign to Class
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Generate New Paper CTA */}
      <button
        onClick={() => navigate("teacher-paper-generator")}
        className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-border p-6 transition-colors hover:border-primary/50 hover:bg-primary/5"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-foreground">
            Generate New Paper with AI
          </span>
          <span className="text-xs text-muted-foreground">
            Create customized JEE papers instantly
          </span>
        </div>
      </button>
    </div>
  );
}
