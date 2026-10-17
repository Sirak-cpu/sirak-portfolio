"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  ChevronDown,
  CornerDownLeft,
  Loader2,
  Maximize2,
  Minimize2,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { MarkdownMessage } from "@/components/chatbot/markdown-message";
import { Button } from "@/components/ui/button";
import { AI_PERSONA } from "@/config/ai-persona";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "👋 **Hello! I'm Sirak's AI Digital Twin.**\n\n" +
    "Ask me anything about my **AI & RAG projects** (*Wanderbot-RAG*, *EquipFlow*), **n8n automations** (21+ workflows), **AWS Bedrock** systems, or my **10+ years leading healthcare data operations** in Ethiopia.\n\n" +
    "What would you like to explore?",
};

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCallout, setShowCallout] = useState(true);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-dismiss initial callout after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCallout(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const assistantMsgId = `assistant-${Date.now()}`;
    // Add placeholder assistant message
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: "assistant", content: "" },
    ]);

    try {
      // Build conversation history payload
      const payloadMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      if (!res.body) {
        throw new Error("No response stream returned.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: fullContent } : msg
          )
        );
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content:
                  "⚠️ *I encountered a temporary connection error. Please verify that your `OPENROUTER_API_KEY` is configured in `.env` or try asking again in a few moments.*",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  return (
    <>
      {/* Floating Action Button & Callout (positioned comfortably above footer icons/call sign) */}
      <div className="fixed bottom-20 right-5 sm:bottom-24 sm:right-6 z-50 flex flex-col items-end gap-2">
        {/* Callout Badge (First-time visitor prompt) */}
        <AnimatePresence>
          {!isOpen && showCallout && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="relative max-w-xs bg-card/95 backdrop-blur-md text-card-foreground border border-border px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => {
                setIsOpen(true);
                setShowCallout(false);
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-xs font-medium">
                💬 <span className="font-semibold text-primary">Chat with Sirak&apos;s AI Twin</span>
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCallout(false);
                }}
                className="text-muted-foreground hover:text-foreground p-0.5"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowCallout(false);
          }}
          className={cn(
            "relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-2",
            isOpen
              ? "bg-background text-foreground border-border hover:bg-muted"
              : "bg-primary text-primary-foreground border-primary/20 shadow-primary/25"
          )}
          aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6" />
          ) : (
            <>
              <div className="relative w-full h-full rounded-full overflow-hidden p-0.5">
                <Image
                  src={profileImg}
                  alt={siteConfig.authorName}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
              <div className="absolute -top-1 -right-1 bg-background/90 text-primary border border-primary/30 p-1 rounded-full shadow">
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              </div>
            </>
          )}
        </motion.button>
      </div>

      {/* Main Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } }}
            className={cn(
              "fixed bottom-36 right-4 sm:bottom-40 sm:right-6 z-50 bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300",
              isExpanded
                ? "w-[95vw] sm:w-[600px] h-[82vh] max-h-[800px]"
                : "w-[92vw] sm:w-[420px] h-[540px] max-h-[calc(100vh-12rem)]"
            )}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40 flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-full border-2 border-primary/40 overflow-hidden flex-shrink-0">
                  <Image
                    src={profileImg}
                    alt={siteConfig.authorName}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-background rounded-full" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-sm truncate">
                      Sirak&apos;s AI Twin
                    </h3>
                    <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
                      AI Copy
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">
                    AI Automation & Agentic AI Specialist
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground hidden sm:inline-flex"
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse window" : "Expand window"}
                  aria-label="Toggle window size"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2.5 max-w-[88%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
                  )}
                >
                  {/* Message Avatar */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs border",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted border-border"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>

                  {/* Speech Bubble */}
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2.5 shadow-sm text-sm break-words",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-card border border-border text-card-foreground rounded-tl-none"
                    )}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <>
                        <MarkdownMessage content={msg.content} />
                        {msg.content === "" && isLoading && (
                          <div className="flex items-center gap-1.5 py-1 text-muted-foreground text-xs">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                            <span>Thinking & synthesizing...</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Quick Prompt Starter Chips (Shown when only welcome message exists) */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">
                    Suggested Questions:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {AI_PERSONA.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt.replace(/^[^\w]+/, "").trim())}
                        className="text-left text-xs bg-muted/60 hover:bg-accent border border-border/70 hover:border-primary/40 px-3 py-2 rounded-xl transition-all flex items-center justify-between text-muted-foreground hover:text-foreground group"
                      >
                        <span>{prompt}</span>
                        <CornerDownLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input & Action Area */}
            <div className="p-3 border-t border-border bg-muted/30 flex-shrink-0 space-y-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center gap-2 bg-background border border-border rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Sirak's AI Twin anything..."
                  rows={1}
                  disabled={isLoading}
                  className="w-full resize-none bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none max-h-24 disabled:opacity-50"
                  style={{ minHeight: "36px" }}
                />

                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-8 w-8 rounded-lg flex-shrink-0"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>

              {/* Subtext info */}
              <div className="flex items-center justify-between px-1 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" /> Powered by OpenRouter
                </span>
                <span>Grounded in verified CV data</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
