"use client";

import { useState } from "react";
import { sampleLibrary } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Upload,
  FileText,
  BookOpen,
  FolderOpen,
} from "lucide-react";

export function TeacherLibraryScreen() {
  const [search, setSearch] = useState("");

  const filtered = sampleLibrary.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground">Library</h1>
          <p className="text-sm text-muted-foreground">
            Manage study materials
          </p>
        </div>
        <Button
          className="gap-2 rounded-xl bg-primary text-primary-foreground"
          size="sm"
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Quick Stats */}
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold text-foreground">
            {sampleLibrary.filter((l) => l.type === "PDF").length}
          </span>
          <span className="text-[10px] text-muted-foreground">PDFs</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3">
          <BookOpen className="h-5 w-5 text-accent" />
          <span className="text-sm font-bold text-foreground">
            {sampleLibrary.filter((l) => l.type === "Question Bank").length}
          </span>
          <span className="text-[10px] text-muted-foreground">Q Banks</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3">
          <FolderOpen className="h-5 w-5 text-warning" />
          <span className="text-sm font-bold text-foreground">
            {sampleLibrary.reduce((sum, l) => sum + l.chapters, 0)}
          </span>
          <span className="text-[10px] text-muted-foreground">Chapters</span>
        </div>
      </div>

      {/* Materials List */}
      <div className="flex flex-col gap-3">
        {filtered.map((item, index) => (
          <div
            key={item.id}
            className="animate-fade-in flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                item.subject === "Physics"
                  ? "bg-primary/10"
                  : item.subject === "Chemistry"
                  ? "bg-accent/10"
                  : item.subject === "Mathematics"
                  ? "bg-warning/10"
                  : "bg-muted"
              }`}
            >
              <FileText
                className={`h-6 w-6 ${
                  item.subject === "Physics"
                    ? "text-primary"
                    : item.subject === "Chemistry"
                    ? "text-accent"
                    : item.subject === "Mathematics"
                    ? "text-warning"
                    : "text-muted-foreground"
                }`}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-sm font-semibold text-foreground">
                {item.title}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {item.subject}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.chapters} chapters
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload CTA */}
      <button className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-8 transition-colors hover:border-primary/50 hover:bg-primary/5">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-foreground">
            Upload New Material
          </span>
          <span className="text-xs text-muted-foreground">
            PDF, DOCX, or images supported
          </span>
        </div>
      </button>
    </div>
  );
}
