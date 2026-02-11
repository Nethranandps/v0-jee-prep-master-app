"use client";

import { useApp } from "@/lib/app-context";
import { sampleNotifications } from "@/lib/sample-data";
import {
  ArrowLeft,
  Bell,
  FileText,
  Trophy,
  Flame,
  BookOpen,
} from "lucide-react";

const iconMap = {
  test: FileText,
  result: Trophy,
  streak: Flame,
  material: BookOpen,
};

const colorMap = {
  test: "bg-primary/15 text-primary",
  result: "bg-warning/15 text-warning",
  streak: "bg-accent/15 text-accent",
  material: "bg-primary/15 text-primary",
};

export function NotificationsScreen() {
  const { navigate, role } = useApp();

  const goBack = () => {
    navigate(role === "teacher" ? "teacher-home" : "student-home");
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex items-center gap-3">
        <button
          onClick={goBack}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Notifications</h1>
        <div className="ml-auto flex h-6 items-center rounded-full bg-primary/15 px-2.5">
          <span className="text-[11px] font-medium text-primary">
            {sampleNotifications.filter((n) => !n.read).length} new
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {sampleNotifications.map((notif, index) => {
          const Icon = iconMap[notif.type] || Bell;
          const colorClass = colorMap[notif.type] || "bg-muted text-muted-foreground";
          return (
            <div
              key={notif.id}
              className={`animate-fade-in flex items-start gap-3 rounded-2xl border p-4 transition-colors ${
                notif.read
                  ? "border-border bg-card"
                  : "border-primary/20 bg-primary/5"
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorClass}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {notif.title}
                  </span>
                  {!notif.read && (
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {notif.message}
                </p>
                <span className="text-[10px] text-muted-foreground/70">
                  {notif.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
