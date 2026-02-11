"use client";

import { useState, useRef, useEffect } from "react";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Sparkles, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

const suggestedQuestions = [
  "Explain Newton's laws of motion",
  "How to solve quadratic equations?",
  "What is Le Chatelier's principle?",
  "Tips for time management in JEE",
];

const aiResponses: Record<string, string> = {
  default:
    "That's a great question! Let me help you understand this concept. In JEE preparation, building strong fundamentals is key. I'd recommend practicing problems from HC Verma for Physics, Morrison & Boyd for Chemistry, and RD Sharma for Mathematics. Would you like me to explain any specific topic in more detail?",
  newton:
    "Newton's three laws of motion are foundational in physics:\n\n1. First Law (Inertia): An object remains at rest or in uniform motion unless acted upon by an external force.\n\n2. Second Law: F = ma. The net force on an object equals its mass times acceleration.\n\n3. Third Law: For every action, there is an equal and opposite reaction.\n\nFor JEE, focus on applying these laws to solve problems involving free-body diagrams, friction, and connected bodies.",
  quadratic:
    "To solve quadratic equations (ax² + bx + c = 0), you can use:\n\n1. Factoring: Split the middle term\n2. Quadratic Formula: x = (-b ± √(b²-4ac)) / 2a\n3. Completing the square\n\nFor JEE, also learn about:\n- Nature of roots using discriminant (D = b² - 4ac)\n- Sum and product of roots\n- Relation between roots and coefficients",
  chatelier:
    "Le Chatelier's Principle states that if a system at equilibrium is disturbed, it will shift to counteract the disturbance.\n\nKey applications for JEE:\n- Adding reactant → equilibrium shifts forward\n- Increasing pressure → shifts toward fewer moles of gas\n- Increasing temperature → shifts in endothermic direction\n\nPractice numerical problems on Kp, Kc, and their relationships.",
  tips: "Time management tips for JEE:\n\n1. Solve easy questions first (under 2 min each)\n2. Mark and skip difficult questions, return later\n3. Physics: 45 min, Chemistry: 45 min, Math: 60 min\n4. Keep last 10 minutes for review\n5. Don't spend more than 3 minutes on any single question\n\nPractice with timed mock tests regularly!",
};

export function AIChatScreen() {
  const { navigate, role } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (lower.includes("newton")) return aiResponses.newton;
    if (lower.includes("quadratic") || lower.includes("equation"))
      return aiResponses.quadratic;
    if (lower.includes("chatelier") || lower.includes("equilibrium"))
      return aiResponses.chatelier;
    if (lower.includes("time") || lower.includes("tips") || lower.includes("manage"))
      return aiResponses.tips;
    return aiResponses.default;
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: getAIResponse(msg),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const goBack = () => {
    navigate(role === "teacher" ? "teacher-home" : "student-home");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-xl">
        <button
          onClick={goBack}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              AI Study Assistant
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isTyping ? "Typing..." : "Online"}
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-4 px-4 py-6 pb-24">
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-lg font-semibold text-foreground">
                Ask me anything about JEE
              </h2>
              <p className="max-w-xs text-sm text-muted-foreground">
                I can help with concepts, problem solving, study tips, and exam strategies.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-muted/50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "ai" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground"
              }`}
            >
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {msg.content}
              </p>
            </div>
            {msg.role === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="rounded-2xl border border-border bg-card px-4 py-3">
              <div className="flex gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary p-0 text-primary-foreground"
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
