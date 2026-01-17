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
    createdAt: Date;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [localInput, setLocalInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Initial greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: "greeting",
                    role: "assistant",
                    content: "Hi! I'm Stunley's AI Assistant. Ask me anything about his projects, skills, or experience!",
                    createdAt: new Date(),
                },
            ]);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = localInput.trim();
        if (!trimmedInput || isTyping) return;

        // 1. Add User Message
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: trimmedInput,
            createdAt: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setLocalInput("");
        setIsTyping(true);

        // 2. Simulate AI response delay
        setTimeout(() => {
            const assistantMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Stun is currently working on this AI to help you more efficiently. Please wait a moment. 🦊",
                createdAt: new Date(),
            };
            setMessages((prev) => [...prev, assistantMsg]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[350px] md:w-[400px] h-[500px] rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
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
                                        <span className="text-xs text-zinc-400">{isTyping ? "Thinking..." : "Building..."}</span>
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
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-inter">
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
                                            "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                                            msg.role === "user"
                                                ? "bg-orange-600 text-white rounded-tr-none"
                                                : "bg-zinc-800/50 border border-white/5 text-zinc-200 rounded-tl-none font-medium"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-800/50 border border-white/5 text-zinc-400 p-3 rounded-2xl rounded-tl-none text-xs italic">
                                        Assistant is typing...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <form
                                onSubmit={handleFormSubmit}
                                className="flex items-center gap-2 relative"
                            >
                                <input
                                    type="text"
                                    value={localInput}
                                    onChange={(e) => setLocalInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-inter"
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
