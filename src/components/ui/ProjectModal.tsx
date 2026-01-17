"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronDown, ChevronRight, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectImage {
    name: string
    path: string
}

interface ProjectCategory {
    name: string
    images: ProjectImage[]
}

interface ProjectModalProps {
    isOpen: boolean
    onClose: () => void
    project: {
        title: string
        subtitle: string
        tools: { name: string; icon: string }[]
        gallery?: ProjectCategory[]
        figmaLink?: string
    }
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [expandedCategories, setExpandedCategories] = useState<string[]>([])

    // Initialize state when modal opens or project changes
    useEffect(() => {
        if (isOpen && project.gallery && project.gallery.length > 0) {
            // Default to first image of first category
            const firstCategory = project.gallery[0]
            if (firstCategory.images.length > 0) {
                setSelectedImage(firstCategory.images[0].path)
            }
            // Expand all categories by default for visibility
            setExpandedCategories(project.gallery.map(c => c.name))
        }
    }, [isOpen, project])

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        )
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* ... (keep backdrop) */}
                    <motion.div
                        // ... (keep modal animation props)
                        className="fixed inset-4 md:inset-10 z-50 flex flex-col bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <div className="flex items-center gap-4">
                                        <p className="text-muted-foreground">{project.subtitle}</p>
                                        <div className="hidden md:block h-4 w-[1px] bg-white/20" />
                                        <div className="flex gap-2">
                                            {project.tools.map((tool) => (
                                                <div key={tool.name} className="relative w-5 h-5 hover:scale-110 transition-transform" title={tool.name}>
                                                    <Image src={tool.icon} alt={tool.name} fill className="object-contain" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Figma Button for Mobile */}
                                    {project.figmaLink && (
                                        <div className="md:hidden">
                                            <a
                                                href={project.figmaLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full text-xs font-medium text-primary transition-colors"
                                            >
                                                <Image src="/images/Projects/UI/1Madayaw Bus Tap Admin/tools/Figma.png" alt="Figma" width={14} height={14} className="object-contain" />
                                                <span>Open in Figma</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {project.figmaLink && (
                                    <a
                                        href={project.figmaLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hidden md:flex items-center gap-2 p-2 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium text-white transition-colors"
                                        title="Open in Figma"
                                    >
                                        <Image src="/images/Projects/UI/1Madayaw Bus Tap Admin/tools/Figma.png" alt="Figma" width={16} height={16} className="object-contain" />
                                        <span>Open in Figma</span>
                                    </a>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                                >
                                    <X className="w-6 h-6 text-white/70 group-hover:text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                            {/* Main Image Display */}
                            <div className="flex-shrink-0 md:flex-1 h-[40vh] md:h-auto bg-black/40 p-4 md:p-8 overflow-auto custom-scrollbar flex items-center justify-center relative">
                                {selectedImage ? (
                                    <div className="relative w-full h-full min-h-[200px] md:min-h-[400px] flex items-center justify-center">
                                        <Image
                                            src={selectedImage}
                                            alt="Project Detail"
                                            fill
                                            className="object-contain"
                                            quality={100}
                                        />
                                    </div>
                                ) : (
                                    <div className="text-white/30 flex flex-col items-center gap-2">
                                        <Maximize2 className="w-8 h-8" />
                                        <p>Select an image to view</p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Navigation */}
                            <div className="w-full md:w-80 bg-[#111] border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto custom-scrollbar flex-1 md:flex-none">
                                <div className="p-4 space-y-4">
                                    <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Project Gallery</h3>

                                    {project.gallery?.map((category) => (
                                        <div key={category.name} className="space-y-1">
                                            <button
                                                onClick={() => toggleCategory(category.name)}
                                                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-left group transition-colors"
                                            >
                                                <span className="font-medium text-white/90 group-hover:text-primary transition-colors">
                                                    {category.name.replace(/^\d+/, '')} {/* Remove sorting numbers logic for display */}
                                                </span>
                                                {expandedCategories.includes(category.name) ? (
                                                    <ChevronDown className="w-4 h-4 text-white/50" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4 text-white/50" />
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {expandedCategories.includes(category.name) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden bg-black/20"
                                                    >
                                                        <div className="grid grid-cols-2 gap-2 p-2">
                                                            {category.images.map((img) => (
                                                                <button
                                                                    key={img.path}
                                                                    onClick={() => setSelectedImage(img.path)}
                                                                    className={cn(
                                                                        "relative aspect-video w-full rounded-md overflow-hidden border-2 transition-all hover:border-primary/50",
                                                                        selectedImage === img.path
                                                                            ? "border-primary ring-2 ring-primary/20"
                                                                            : "border-transparent"
                                                                    )}
                                                                >
                                                                    <Image
                                                                        src={img.path}
                                                                        alt={img.name}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
