"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useAnimationFrame, useMotionValue, useTransform, PanInfo } from "framer-motion"
import { Container } from "@/components/ui/Container"

type Tool = {
    name: string
    description: string
    icon: string
    category: "Design" | "Development" | "Engineering"
}

const tools: Tool[] = [
    // Design & Creative
    { name: "Figma", description: "UI/UX Design", icon: "/images/About/Figma.png", category: "Design" },
    { name: "Photoshop", description: "Photo Editing", icon: "/images/About/Photoshop.png", category: "Design" },
    { name: "Illustrator", description: "Vector Design", icon: "/images/About/Illustrator.png", category: "Design" },
    { name: "Canva", description: "Content Creation", icon: "/images/About/Canva.png", category: "Design" },
    { name: "Lightroom", description: "Photo Enhancement", icon: "/images/About/Lightroom.png", category: "Design" },

    // Programming & Databases
    { name: "Java", description: "Backend Programming", icon: "/images/About/Java.png", category: "Development" },
    { name: "Python", description: "Data & Automation", icon: "/images/About/Pyhton.png", category: "Development" },
    { name: "SQL", description: "Database Querying", icon: "/images/About/SQL.png", category: "Development" },
    { name: "XAMPP", description: "Local Server Stack", icon: "/images/About/Xampp.png", category: "Development" },

    // AI & Automation Tools
    { name: "n8n", description: "AI Workflow", icon: "/images/About/n8n.png", category: "Development" },
    { name: "Claude AI", description: "LLM Assistant", icon: "/images/About/Claude.png", category: "Engineering" },
    { name: "Gemini AI", description: "LLM Model", icon: "/images/About/Gemini.png", category: "Engineering" },
    { name: "Serper", description: "Google Search API", icon: "/images/About/Serper.png", category: "Engineering" },
    { name: "Supabase", description: "Backend & Database", icon: "/images/About/Supabasse.png", category: "Development" },
    { name: "HubSpot", description: "CRM & Automation", icon: "/images/About/Hubspot.png", category: "Development" },

    // Development & Productivity
    { name: "Qt", description: "Desktop UI", icon: "/images/About/QT.png", category: "Development" },
    { name: "NetBeans", description: "Java Dev", icon: "/images/About/Netbeans.png", category: "Development" },
    { name: "VS Code", description: "Code Editor", icon: "/images/About/VSCode.png", category: "Development" },
    { name: "Scene Builder", description: "JavaFX UI", icon: "/images/About/Scene Builder.png", category: "Development" },
    { name: "Trello", description: "Project Mgmt", icon: "/images/About/Trello.png", category: "Development" },

    // Web & Engineering
    { name: "Next.js", description: "React Framework", icon: "/images/About/NextJS2.png", category: "Engineering" },
    { name: "Tailwind CSS", description: "Utility Styling", icon: "/images/About/Tailwind.png", category: "Engineering" },
    { name: "Vercel", description: "Deployment", icon: "/images/About/Vercel.png", category: "Engineering" },
    { name: "Fusion 360", description: "3D Modeling", icon: "/images/About/Fusion360.png", category: "Engineering" },
    { name: "AutoCAD", description: "Drafting", icon: "/images/About/AutoCAD.png", category: "Engineering" },
    { name: "Github", description: "Version Control", icon: "/images/About/Github.png", category: "Engineering" },

    // Additional Tools
    { name: "Meta Suite", description: "Social Mgmt", icon: "/images/About/Meta.png", category: "Development" },
    { name: "OBS", description: "Streaming", icon: "/images/About/OBS.png", category: "Design" },
]

export function TechStack() {
    // Duplicate tools to create seamless loop
    const marqueeTools = [...tools, ...tools, ...tools];
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Motion value for percentage (0 to -33.333...)
    const x = useMotionValue(0);
    const xPercent = useTransform(x, (v) => `${v}%`);

    // Auto-scroll loop
    useAnimationFrame((t, delta) => {
        if (!isDragging) {
            let newX = x.get() - 0.02 * (delta / 16);
            if (newX <= -33.333) {
                newX = 0;
            }
            x.set(newX);
        }
    });

    // Manual Drag Handler
    const handlePan = (_: any, info: PanInfo) => {
        if (containerRef.current) {
            const width = containerRef.current.scrollWidth;
            const deltaPercent = (info.delta.x / width) * 100;
            let newX = x.get() + deltaPercent;

            if (newX > 0) {
                newX = -33.333;
            } else if (newX <= -33.333) {
                newX = 0;
            }

            x.set(newX);
        }
    };

    return (
        <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 bg-transparent">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[350px] bg-primary/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
            >
                <Container>
                    <div className="flex flex-col gap-12">
                        {/* Section Title */}
                        <div className="text-center space-y-2">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
                            >
                                Creative & Tech Stack <span className="text-primary">Tools</span>
                            </motion.h2>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-1 w-20 bg-primary mx-auto rounded-full"
                            />
                        </div>
                    </div>
                </Container>

                {/* Marquee Container - Transparent Full Width */}
                <div className="relative w-full mt-12 overflow-hidden bg-transparent">
                    {/* Gradient Side Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none opacity-40 sm:opacity-100" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none opacity-40 sm:opacity-100" />

                    <motion.div
                        ref={containerRef}
                        style={{ x: xPercent, touchAction: "pan-y" }}
                        onPan={handlePan}
                        onPanStart={() => setIsDragging(true)}
                        onPanEnd={() => setIsDragging(false)}
                        className="flex gap-4 sm:gap-6 w-max cursor-grab active:cursor-grabbing pl-4 sm:pl-20 py-4 bg-transparent"
                    >
                        {marqueeTools.map((tool, index) => (
                            <div
                                key={`${tool.name}-${index}`}
                                className="group relative p-4 w-[160px] sm:w-[200px] rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] flex flex-col items-center justify-center gap-3 sm:gap-4 text-center h-[140px] sm:h-[160px] shrink-0 select-none pointer-events-auto backdrop-blur-sm"
                            >
                                <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110">
                                    <Image
                                        src={tool.icon}
                                        alt={tool.name}
                                        fill
                                        className="object-contain drop-shadow-lg pointer-events-none"
                                        sizes="100px"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-white text-sm group-hover:text-primary transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium">
                                        {tool.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
