"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Maximize2, CheckCircle2, Bot, Database, UserCheck, Mail, Send, Cpu, Layers, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToolItem {
    name: string
    icon: string
}

export interface AutomationProject {
    id: string
    number: string
    title: string
    subtitle: string
    description: string
    image: string
    workflowImage: string
    tools: ToolItem[]
    contentImages: { name: string; path: string }[]
    workflowSteps: string[]
    overviewText: string[]
}

interface AutomationModalProps {
    isOpen: boolean
    onClose: () => void
    project: AutomationProject
}

export function AutomationModal({ isOpen, onClose, project }: AutomationModalProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null) // -1 for workflow image, >=0 for contentImages

    // Navigation handlers for Lightbox
    const handlePrevImage = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        if (lightboxIndex === null) return
        if (lightboxIndex === -1) return // Workflow image view has no prev/next

        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : project.contentImages.length - 1))
    }, [lightboxIndex, project.contentImages.length])

    const handleNextImage = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        if (lightboxIndex === null) return
        if (lightboxIndex === -1) return // Workflow image view has no prev/next

        setLightboxIndex((prev) => (prev !== null && prev < project.contentImages.length - 1 ? prev + 1 : 0))
    }, [lightboxIndex, project.contentImages.length])

    // Lock body scroll and register keyboard navigation
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex !== null) {
                if (e.key === "ArrowLeft") handlePrevImage()
                if (e.key === "ArrowRight") handleNextImage()
                if (e.key === "Escape") setLightboxIndex(null)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = "unset"
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, lightboxIndex, handlePrevImage, handleNextImage])

    if (!isOpen) return null

    // Icons mapping for the 2D workflow nodes
    const getWorkflowIcon = (index: number) => {
        switch (index) {
            case 0: return <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
            case 1: return <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            case 2: return <Search className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 shrink-0" />
            case 3: return <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
            case 4: return <Database className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            case 5: return <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 shrink-0" />
            case 6: return <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            case 7: return <Send className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 shrink-0" />
            case 8: return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" />
            default: return <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
        }
    }

    const currentLightboxSrc = lightboxIndex === -1
        ? project.workflowImage
        : lightboxIndex !== null && lightboxIndex >= 0 && lightboxIndex < project.contentImages.length
            ? project.contentImages[lightboxIndex].path
            : null

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    key="automation-modal-wrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8"
                >
                    {/* Backdrop */}
                    <motion.div
                        key="automation-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Main Modal Window */}
                    <motion.div
                        key="automation-modal-window"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-7xl h-[92vh] flex flex-col bg-[#121316] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl z-10"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-black/40 backdrop-blur-xl shrink-0">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                <div className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shrink-0">
                                    AI Automation
                                </div>
                                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight truncate">{project.title}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0 ml-2"
                            >
                                <X className="w-5 h-5" />
                                <span className="sr-only">Close</span>
                            </button>
                        </div>

                        {/* Modal Body Container: Sidebar + Content */}
                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

                            {/* Sidebar - Images Panel */}
                            <div className="w-full md:w-80 lg:w-96 bg-black/50 border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4 overflow-y-auto custom-scrollbar shrink-0 max-h-48 md:max-h-none">
                                <div>
                                    <h3 className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wider flex items-center gap-2 mb-0.5 sm:mb-1">
                                        <Layers className="w-4 h-4 text-primary" />
                                        Content Panels ({project.contentImages.length})
                                    </h3>
                                    <p className="text-[11px] sm:text-xs text-muted-foreground">Click any screenshot to view full resolution</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-3">
                                    {project.contentImages.map((img, index) => (
                                        <div
                                            key={img.path}
                                            onClick={() => {
                                                setSelectedImage(img.path)
                                                setLightboxIndex(index)
                                            }}
                                            className={cn(
                                                "group relative aspect-video rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 bg-white/5",
                                                selectedImage === img.path
                                                    ? "border-primary ring-2 ring-primary/40"
                                                    : "border-white/10 hover:border-primary/50 hover:scale-[1.02]"
                                            )}
                                        >
                                            <Image
                                                src={img.path}
                                                alt={`Content Panel ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <span className="text-[10px] sm:text-xs font-semibold text-white bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
                                                    View Screen {index + 1}
                                                </span>
                                                <Maximize2 className="w-3.5 h-3.5 text-white" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Body - Detailed Project Content */}
                            <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto custom-scrollbar space-y-6 sm:space-y-8 md:space-y-10 bg-gradient-to-b from-transparent to-black/30">

                                {/* Section 1: Title & Description */}
                                <div className="space-y-2 sm:space-y-4 max-w-4xl">
                                    <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                        {project.title}
                                    </h1>
                                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Section 2: Large Workflow Screenshot */}
                                <div className="space-y-2.5 sm:space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                            n8n Automation Workflow
                                        </h3>
                                        <span className="text-[11px] sm:text-xs text-muted-foreground">(Click to enlarge)</span>
                                    </div>

                                    <div
                                        onClick={() => setLightboxIndex(-1)}
                                        className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:border-primary/50"
                                    >
                                        <Image
                                            src={project.workflowImage}
                                            alt="N8N Workflow Screenshot"
                                            fill
                                            className="object-contain p-1.5 sm:p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                                            quality={100}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                                <Maximize2 className="w-4 h-4" />
                                                Enlarge Workflow
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Built With (Icons & Names) */}
                                <div className="space-y-3 sm:space-y-4">
                                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                        <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        Built With
                                    </h3>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        {project.tools.map((tool) => (
                                            <div
                                                key={tool.name}
                                                className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-200"
                                            >
                                                <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                                                    <Image
                                                        src={tool.icon}
                                                        alt={tool.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <span className="text-xs sm:text-sm font-semibold text-white/90">{tool.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Section 4: Workflow Architecture (No Ellipses, Full Text Display & No Arrows) */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                            2D Workflow Architecture
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-muted-foreground">Step-by-step automated lead qualification & response processing path</p>
                                    </div>

                                    {/* Mobile-Friendly Grid without Ellipses */}
                                    <div className="p-3.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
                                            {project.workflowSteps.map((step, index) => (
                                                <div
                                                    key={`workflow-step-${index}`}
                                                    className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-black/50 border border-white/10 hover:border-primary/60 transition-all duration-300 shadow-md group min-h-[64px]"
                                                >
                                                    <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 border border-primary/30 font-mono font-bold text-xs text-primary shrink-0">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                                        {getWorkflowIcon(index)}
                                                        <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-white leading-snug break-words">
                                                            {step}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Section 5: Overview Text */}
                                <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10">
                                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        Overview & Database Integration
                                    </h3>
                                    <div className="space-y-2.5 sm:space-y-3 text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                                        {project.overviewText.map((paragraph, i) => (
                                            <p key={`overview-para-${i}`}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Lightbox / Fullscreen Image Viewer Modal with Prev/Next Navigation */}
            {lightboxIndex !== null && currentLightboxSrc && (
                <motion.div
                    key="automation-lightbox-wrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 sm:p-8"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Header Info & Close Button */}
                    <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-20 pointer-events-none">
                        <div className="px-3 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-white text-xs sm:text-sm font-semibold pointer-events-auto">
                            {lightboxIndex === -1
                                ? "n8n Workflow Screenshot"
                                : `Content Screen ${lightboxIndex + 1} of ${project.contentImages.length}`}
                        </div>
                        <button
                            onClick={() => setLightboxIndex(null)}
                            className="p-2 sm:p-3 rounded-full bg-black/70 hover:bg-white/20 border border-white/15 text-white transition-colors pointer-events-auto shadow-xl"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {/* Previous Button (for Content Panels) */}
                    {lightboxIndex >= 0 && project.contentImages.length > 1 && (
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-primary border border-white/15 hover:border-primary text-white transition-all shadow-2xl z-20 group"
                            title="Previous Image (Left Arrow)"
                        >
                            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
                        </button>
                    )}

                    {/* Next Button (for Content Panels) */}
                    {lightboxIndex >= 0 && project.contentImages.length > 1 && (
                        <button
                            onClick={handleNextImage}
                            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-primary border border-white/15 hover:border-primary text-white transition-all shadow-2xl z-20 group"
                            title="Next Image (Right Arrow)"
                        >
                            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    )}

                    {/* Image View Container */}
                    <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center pointer-events-auto">
                        <Image
                            key={currentLightboxSrc}
                            src={currentLightboxSrc}
                            alt="Expanded View"
                            fill
                            className="object-contain"
                            quality={100}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
