"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [localInput, setLocalInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [mobileStyle, setMobileStyle] = useState<React.CSSProperties>({});
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "greeting",
            role: "assistant",
            content: "Hi! I'm Stunley's AI Assistant 🦊. Ask me anything about his projects, skills, or experience!",
        },
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    // Precise Mobile Virtual Keyboard Auto-Lifting & Resizing
    useEffect(() => {
        if (typeof window === "undefined") return;

        const updatePosition = () => {
            if (window.innerWidth < 640 && window.visualViewport) {
                const vv = window.visualViewport;
                // Calculate exact height of the open virtual keyboard
                const keyboardHeight = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
                const activeHeight = Math.min(vv.height - 24, 520);

                setMobileStyle({
                    position: "fixed",
                    bottom: `${keyboardHeight + 12}px`,
                    left: "12px",
                    right: "12px",
                    width: "calc(100vw - 24px)",
                    height: `${activeHeight}px`,
                    maxHeight: `${activeHeight}px`,
                    zIndex: 100,
                });
            } else {
                setMobileStyle({});
            }
        };

        const vv = window.visualViewport;
        vv?.addEventListener("resize", updatePosition);
        vv?.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);
        updatePosition();

        return () => {
            vv?.removeEventListener("resize", updatePosition);
            vv?.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
        };
    }, [isOpen]);

    const handleInputFocus = () => {
        setTimeout(() => {
            scrollToBottom();
        }, 150);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = localInput.trim();
        if (!trimmedInput || isTyping) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: trimmedInput,
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setLocalInput("");
        setIsTyping(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const rawText = await response.text();
            let data: any = {};

            try {
                data = JSON.parse(rawText);
            } catch {
                throw new Error(rawText || "Server returned non-JSON response");
            }

            if (!response.ok) {
                throw new Error(data.error || rawText || "Failed to fetch AI response");
            }

            const aiResponseText = data.text || "Hello! How can I help you today? 🦊";

            setMessages((prev) => [
                ...prev,
                { id: Date.now().toString(), role: "assistant", content: aiResponseText },
            ]);
        } catch (error: any) {
            console.error("Chat error:", error);
            const errDetail = error?.message || "Connection error";
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: `⚠️ API Notice: ${errDetail}\n\nMake sure GOOGLE_GENERATIVE_AI_API_KEY is set in Vercel settings!`,
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-4 max-w-[calc(100vw-2rem)]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={mobileStyle}
                        className="sm:w-[380px] md:w-[400px] sm:h-[500px] rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden overscroll-contain transition-[bottom,height] duration-150 ease-out"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                                    <Image
                                        src="/images/Home/AI.jpg"
                                        alt="AI Assistant"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm">SD's AI Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-2 h-2 rounded-full ${isTyping ? "bg-orange-500 animate-bounce" : "bg-green-500 animate-pulse"}`} />
                                        <span className="text-xs text-zinc-400">{isTyping ? "Thinking..." : "Online"}</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div
                            onWheel={(e) => {
                                const el = e.currentTarget;
                                const isAtTop = el.scrollTop === 0 && e.deltaY < 0;
                                const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2 && e.deltaY > 0;
                                if (isAtTop || isAtBottom) {
                                    e.stopPropagation();
                                }
                            }}
                            className="flex-1 overflow-y-auto overscroll-y-contain p-4 space-y-4 font-inter"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex w-full",
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[88%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                                            msg.role === "user"
                                                ? "bg-orange-600 text-white rounded-tr-none"
                                                : "bg-zinc-800/80 border border-white/10 text-zinc-100 rounded-tl-none font-normal"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-800/50 border border-white/5 text-zinc-400 p-3 rounded-2xl rounded-tl-none text-xs italic">
                                        Assistant is thinking... 🦊
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 sm:p-4 border-t border-white/10 bg-white/5 shrink-0">
                            <form
                                onSubmit={handleFormSubmit}
                                className="flex items-center gap-2 relative"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={localInput}
                                    onChange={(e) => setLocalInput(e.target.value)}
                                    onFocus={handleInputFocus}
                                    placeholder="Ask about Stun's projects or skills..."
                                    className="w-full bg-zinc-900/90 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-inter"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!localInput.trim() || isTyping}
                                    className="absolute right-1 w-8 h-8 rounded-full bg-orange-600 hover:bg-orange-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    size="lg"
                    className="rounded-full w-14 h-14 bg-orange-600 hover:bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all duration-300 p-0 items-center justify-center border-2 border-white/10"
                >
                    <MessageCircle className="w-6 h-6 text-white" />
                </Button>
            )}

            {/* Close Circle when open */}
            {isOpen && (
                <Button
                    onClick={() => setIsOpen(false)}
                    size="lg"
                    className="rounded-full w-14 h-14 bg-zinc-800 hover:bg-zinc-700 border border-white/10 shadow-lg p-0 items-center justify-center text-white"
                >
                    <X className="w-6 h-6" />
                </Button>
            )}
        </div>
    );
}

export default ChatWidget;
