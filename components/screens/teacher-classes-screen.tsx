"use client";

import { sampleTeacherData } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import {
  Users,
  Plus,
  TrendingUp,
  BarChart3,
  ChevronRight,
} from "lucide-react";

export function TeacherClassesScreen() {
  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground">My Classes</h1>
          <p className="text-sm text-muted-foreground">
            {sampleTeacherData.classes.length} active classes
          </p>
        </div>
        <Button
          className="gap-2 rounded-xl bg-primary text-primary-foreground"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Summary */}
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl border border-border bg-card p-4">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold text-foreground">
            {sampleTeacherData.classes.reduce(
              (sum, c) => sum + c.students,
              0
            )}
          </span>
          <span className="text-[10px] text-muted-foreground">
            Total Students
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl border border-border bg-card p-4">
          <TrendingUp className="h-5 w-5 text-accent" />
          <span className="text-lg font-bold text-foreground">
            {Math.round(
              sampleTeacherData.classes.reduce(
                (sum, c) => sum + c.avgScore,
                0
              ) / sampleTeacherData.classes.length
            )}
            %
          </span>
          <span className="text-[10px] text-muted-foreground">
            Overall Avg
          </span>
        </div>
      </div>

      {/* Classes List */}
      <div className="flex flex-col gap-3">
        {sampleTeacherData.classes.map((cls, index) => (
          <div
            key={cls.id}
            className="animate-fade-in flex flex-col gap-4 rounded-2xl border border-border bg-card p-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">
                  {cls.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {cls.students} students enrolled
                </span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Average Score
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {cls.avgScore}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${
                      cls.avgScore >= 75
                        ? "bg-accent"
                        : cls.avgScore >= 65
                        ? "bg-primary"
                        : "bg-warning"
                    }`}
                    style={{ width: `${cls.avgScore}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-lg bg-transparent text-xs text-foreground"
              >
                View Students
              </Button>
              <Button
                size="sm"
                className="flex-1 rounded-lg bg-primary text-xs text-primary-foreground"
              >
                Assign Test
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
