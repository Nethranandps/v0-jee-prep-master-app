"use client";

import { sampleProgress } from "@/lib/sample-data";
import {
  TrendingUp,
  Flame,
  Target,
  Award,
  Users,
  BarChart3,
} from "lucide-react";

export function StudentProgressScreen() {
  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground">My Progress</h1>
        <p className="text-sm text-muted-foreground">
          Track your JEE preparation journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            #{sampleProgress.overallRank}
          </span>
          <span className="text-[11px] text-muted-foreground">
            Overall Rank
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
            <Users className="h-5 w-5 text-accent" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            {(sampleProgress.totalStudents / 1000).toFixed(0)}K
          </span>
          <span className="text-[11px] text-muted-foreground">
            Total Students
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15">
            <Flame className="h-5 w-5 text-warning" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            {sampleProgress.streak}
          </span>
          <span className="text-[11px] text-muted-foreground">Day Streak</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            {sampleProgress.testsCompleted}
          </span>
          <span className="text-[11px] text-muted-foreground">
            Tests Done
          </span>
        </div>
      </div>

      {/* Rank History Chart */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            Rank History
          </h2>
        </div>
        <div className="flex h-40 items-end gap-2">
          {sampleProgress.rankHistory.map((point, idx) => {
            const maxRank = Math.max(
              ...sampleProgress.rankHistory.map((p) => p.rank)
            );
            const height = ((maxRank - point.rank) / maxRank) * 100 + 20;
            return (
              <div
                key={point.week}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-[10px] font-medium text-muted-foreground">
                  {point.rank}
                </span>
                <div
                  className="w-full rounded-t-lg bg-primary/80 transition-all"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {point.week}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic Mastery */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold text-foreground">
            Topic Mastery
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {sampleProgress.topicMastery.map((topic) => (
            <div key={topic.topic} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">
                  {topic.topic}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {topic.mastery}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${
                    topic.mastery >= 85
                      ? "bg-accent"
                      : topic.mastery >= 70
                      ? "bg-primary"
                      : "bg-warning"
                  }`}
                  style={{ width: `${topic.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
