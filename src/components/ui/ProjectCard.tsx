"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight, Clock } from "lucide-react"

interface ProjectCardProps {
    number: string
    title: string
    subtitle: string
    description?: string
    tools: { name: string; icon: string }[]
    image: string
    href?: string
    hoverText?: string
    isOngoing?: boolean
}

export function ProjectCard({ number, title, subtitle, description, tools, image, hoverText, isOngoing }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col gap-3 sm:gap-5 p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 h-full"
        >
            {/* Header Section */}
            <div className="flex justify-between items-start gap-2 sm:gap-4">
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold font-mono text-white/90 flex-shrink-0">
                    {number}
                </div>
                <div
                    className="flex flex-col items-end text-right min-w-0 flex-1 overflow-hidden"
                    style={{ containerType: "inline-size" }}
                >
                    <h3 className="font-bold leading-tight whitespace-nowrap text-[clamp(0.75rem,7cqw,1.4rem)] text-white w-full truncate">
                        {title}
                    </h3>
                    <p className="text-primary/90 text-[10px] sm:text-xs font-semibold whitespace-nowrap truncate">{subtitle}</p>
                    {description && (
                        <p className="text-muted-foreground text-[11px] sm:text-xs line-clamp-2 mt-1 leading-relaxed text-right hidden sm:block">
                            {description}
                        </p>
                    )}
                    {/* Tools */}
                    <div className="flex gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                        {tools.map((tool) => (
                            <div key={tool.name} className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110" title={tool.name}>
                                <Image
                                    src={tool.icon}
                                    alt={tool.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black/20 mt-auto">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Optional Status Badge */}
                {isOngoing && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/90 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[11px] font-semibold flex items-center gap-1 sm:gap-1.5 shadow-lg z-10">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
                        Ongoing
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 sm:p-4 text-center">
                    <button className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-xl bg-primary text-white hover:bg-primary/90">
                        {isOngoing ? (
                            <>
                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                                <span className="truncate">{hoverText || "Ongoing"}</span>
                            </>
                        ) : (
                            <>
                                <span className="truncate">{hoverText || "Explore"}</span>
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
