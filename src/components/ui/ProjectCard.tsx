"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface ProjectCardProps {
    number: string
    title: string
    subtitle: string
    tools: { name: string; icon: string }[]
    image: string
    href?: string
}

export function ProjectCard({ number, title, subtitle, tools, image, href = "#" }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col gap-6 p-6 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
        >
            {/* Header Section */}
            <div className="flex justify-between items-start gap-4">
                <div className="text-4xl md:text-5xl font-bold font-mono text-white/90 flex-shrink-0">
                    {number}
                </div>
                <div
                    className="flex flex-col items-end text-right min-w-0 flex-1 overflow-hidden"
                    style={{ containerType: "inline-size" }}
                >
                    <h3 className="font-bold leading-tight whitespace-nowrap text-[clamp(0.8rem,8cqw,1.5rem)] text-white w-full">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm whitespace-nowrap">{subtitle}</p>
                    {/* Tools */}
                    <div className="flex gap-2 mt-2">
                        {tools.map((tool) => (
                            <div key={tool.name} className="relative w-6 h-6 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110" title={tool.name}>
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
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/20">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                        Explore <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
