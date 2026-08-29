"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Maximize2, CheckCircle2, Database, Cpu, Layers, ChevronLeft, ChevronRight, ChevronDown, Layout, Calendar, CreditCard, ShieldCheck, User, Sparkles, Terminal, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToolItem {
    name: string
    icon: string
}

export interface ArchitectureModule {
    name: string
    description: string
}

export interface GallerySection {
    title: string
    images: { name: string; path: string }[]
}

export interface GalleryCategory {
    name: string
    sections?: GallerySection[]
    images?: { name: string; path: string }[]
}

export interface DeveloperProject {
    id: string
    number: string
    title: string
    subtitle: string
    role: string
    description: string
    image: string
    tools: ToolItem[]
    architecture: ArchitectureModule[]
    overviewText: string[]
    gallery: GalleryCategory[]
}

interface DeveloperModalProps {
    isOpen: boolean
    onClose: () => void
    project: DeveloperProject
}

export function DeveloperModal({ isOpen, onClose, project }: DeveloperModalProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0)
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null) // -1 for main overview image, >=0 for flattened gallery images
    const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState<boolean>(false)

    // Flatten all gallery images for easy lightbox pagination
    const allGalleryImages = useMemo(() => {
        if (!project || !project.gallery) return []
        const list: { name: string; path: string; categoryName: string }[] = []
        project.gallery.forEach((cat) => {
            if (cat.sections && cat.sections.length > 0) {
                cat.sections.forEach((sec) => {
                    sec.images.forEach((img) => {
                        list.push({ ...img, categoryName: `${cat.name} - ${sec.title}` })
                    })
                })
            } else if (cat.images && cat.images.length > 0) {
                cat.images.forEach((img) => {
                    list.push({ ...img, categoryName: cat.name })
                })
            }
        })
        return list
    }, [project])

    // Set initial image when modal opens or project changes
    useEffect(() => {
        if (isOpen && project) {
            setSelectedImage(project.image)
            setActiveCategoryIndex(0)
            setLightboxIndex(null)
            setIsMobileGalleryOpen(false)
        } else {
            setLightboxIndex(null)
            setIsMobileGalleryOpen(false)
        }
    }, [isOpen, project])

    const handleCloseModal = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        setLightboxIndex(null)
        onClose()
    }, [onClose])

    const handleCloseLightbox = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        setLightboxIndex(null)
    }, [])

    // Lightbox navigation
    const handlePrevImage = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        if (lightboxIndex === null) return
        if (lightboxIndex === -1) {
            setLightboxIndex(allGalleryImages.length - 1)
            return
        }
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : -1))
    }, [lightboxIndex, allGalleryImages.length])

    const handleNextImage = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        if (lightboxIndex === null) return
        if (lightboxIndex === -1) {
            setLightboxIndex(0)
            return
        }
        setLightboxIndex((prev) => (prev !== null && prev < allGalleryImages.length - 1 ? prev + 1 : -1))
    }, [lightboxIndex, allGalleryImages.length])

    // Lock body scroll and keyboard listeners
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowX = "hidden"
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowX = "hidden"
            document.body.style.overflowY = "unset"
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex !== null) {
                if (e.key === "ArrowLeft") handlePrevImage()
                if (e.key === "ArrowRight") handleNextImage()
                if (e.key === "Escape") setLightboxIndex(null)
            } else if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflowX = "hidden"
            document.body.style.overflowY = "unset"
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, lightboxIndex, handlePrevImage, handleNextImage, onClose])

    if (!isOpen || !project) return null

    // Helper icon selector for architecture cards
    const getModuleIcon = (name: string, index: number) => {
        const lowerName = name.toLowerCase()
        if (lowerName.includes("cashier") || lowerName.includes("bill") || lowerName.includes("budget") || lowerName.includes("financial")) {
            return <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
        }
        if (lowerName.includes("chef") || lowerName.includes("order") || lowerName.includes("event")) {
            return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
        }
        if (lowerName.includes("admin") || lowerName.includes("officer") || lowerName.includes("security")) {
            return <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 shrink-0" />
        }
        if (lowerName.includes("calendar") || lowerName.includes("planner")) {
            return <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
        }
        if (lowerName.includes("user") || lowerName.includes("student") || lowerName.includes("clerk")) {
            return <User className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
        }
        if (lowerName.includes("job") || lowerName.includes("automation") || lowerName.includes("lead")) {
            return <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 shrink-0" />
        }
        return <Layout className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
    }

    const currentLightboxItem = lightboxIndex === -1
        ? { path: project.image, title: `${project.title} Overview` }
        : lightboxIndex !== null && lightboxIndex >= 0 && lightboxIndex < allGalleryImages.length
            ? { path: allGalleryImages[lightboxIndex].path, title: `${allGalleryImages[lightboxIndex].categoryName} - ${allGalleryImages[lightboxIndex].name}` }
            : null

    const renderGalleryContent = () => (
        <>
            {/* Category Switcher Tabs */}
            {project.gallery.length > 1 && (
                <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
                    {project.gallery.map((cat, idx) => (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategoryIndex(idx)}
                            className={cn(
                                "px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all duration-200 flex-1 text-center truncate",
                                activeCategoryIndex === idx
                                    ? "bg-primary text-white shadow-md"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Thumbnails Sections for Active Category */}
            {(() => {
                const currentCategory = project.gallery[activeCategoryIndex]
                if (!currentCategory) return null

                const sectionsToRender = currentCategory.sections || (currentCategory.images ? [{ title: "", images: currentCategory.images }] : [])

                return (
                    <div className="space-y-4">
                        {sectionsToRender.map((sec, secIdx) => (
                            <div key={`sec-${sec.title}-${secIdx}`} className="space-y-2">
                                {sec.title && (
                                    <div className="flex items-center gap-2 pt-1">
                                        <span className="text-xs font-bold text-white/80 uppercase tracking-wider">{sec.title}</span>
                                        <div className="h-[1px] flex-1 bg-white/10" />
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                                    {sec.images.map((img) => {
                                        const globalIdx = allGalleryImages.findIndex((item) => item.path === img.path)
                                        return (
                                            <div
                                                key={img.path}
                                                onClick={() => {
                                                    setSelectedImage(img.path)
                                                    setLightboxIndex(globalIdx !== -1 ? globalIdx : 0)
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
                                                    alt={img.name}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                                                    <span className="text-[10px] font-semibold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm truncate">
                                                        View Screen
                                                    </span>
                                                    <Maximize2 className="w-3.5 h-3.5 text-white shrink-0" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            })()}
        </>
    )

    return (
        <>
            {/* Main Modal Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="developer-modal-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8"
                    >
                        {/* Backdrop */}
                        <motion.div
                            key="developer-modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md"
                        />

                        {/* Main Modal Window */}
                        <motion.div
                            key="developer-modal-window"
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
                                        {project.role}
                                    </div>
                                    <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight truncate">{project.title}</h2>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0 ml-2"
                                >
                                    <X className="w-5 h-5" />
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>

                            {/* Mobile Docked Gallery Indicator Bar */}
                            <div className="md:hidden border-b border-white/10 bg-black/60 backdrop-blur-md shrink-0">
                                <button
                                    onClick={() => setIsMobileGalleryOpen(!isMobileGalleryOpen)}
                                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 text-primary shrink-0">
                                            <Layers className="w-4 h-4" />
                                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-white uppercase tracking-wider">Content Panels</span>
                                                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-mono font-bold border border-primary/30">
                                                    {allGalleryImages.length} Screens
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground truncate">
                                                {isMobileGalleryOpen ? "Tap to hide panel gallery" : "Docked • Tap to expand screenshots"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-primary text-xs font-semibold shrink-0 ml-2">
                                        <span>{isMobileGalleryOpen ? "Collapse" : "Expand"}</span>
                                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isMobileGalleryOpen && "rotate-180")} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isMobileGalleryOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden border-t border-white/10 bg-black/80 p-3.5 space-y-3 max-h-72 overflow-y-auto custom-scrollbar"
                                        >
                                            {renderGalleryContent()}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Modal Body Container: Sidebar + Content */}
                            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

                                {/* Desktop Sidebar - Gallery Panels */}
                                <div className="hidden md:flex w-80 lg:w-96 bg-black/50 border-r border-white/10 p-4 md:p-6 flex-col gap-4 overflow-y-auto custom-scrollbar shrink-0">
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wider flex items-center gap-2 mb-0.5 sm:mb-1">
                                            <Layers className="w-4 h-4 text-primary" />
                                            Content Panels ({allGalleryImages.length})
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-muted-foreground">Click any screenshot to view full resolution</p>
                                    </div>
                                    {renderGalleryContent()}
                                </div>

                                {/* Main Body - Detailed Project Content */}
                                <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto custom-scrollbar space-y-6 sm:space-y-8 md:space-y-10 bg-gradient-to-b from-transparent to-black/30">

                                    {/* Section 1: Title, Subtitle & Description */}
                                    <div className="space-y-3 sm:space-y-4 max-w-4xl">
                                        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                            {project.title}
                                        </h1>
                                        <p className="text-xs sm:text-sm font-semibold text-primary/80 uppercase tracking-wider">{project.subtitle}</p>
                                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Section 2: Built With (Icons & Names) */}
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

                                    {/* Section 3: System Architecture & Key Modules */}
                                    {project.architecture && project.architecture.length > 0 && (
                                        <div className="space-y-3 sm:space-y-4">
                                            <div className="space-y-1">
                                                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                                    <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                                    System Architecture & Core Modules
                                                </h3>
                                                <p className="text-[11px] sm:text-xs text-muted-foreground">Module breakdown and primary feature sections</p>
                                            </div>

                                            <div className="p-3.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                                    {project.architecture.map((mod, index) => (
                                                        <div
                                                            key={`arch-${mod.name}-${index}`}
                                                            className="flex flex-col gap-2 p-3.5 sm:p-4 rounded-xl bg-black/50 border border-white/10 hover:border-primary/60 transition-all duration-300 shadow-md group"
                                                        >
                                                            <div className="flex items-start gap-2.5">
                                                                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/30 font-mono font-bold text-xs text-primary shrink-0 mt-0.5">
                                                                    {index + 1}
                                                                </div>
                                                                <div className="mt-1 shrink-0">{getModuleIcon(mod.name, index)}</div>
                                                                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug break-words flex-1 min-w-0">{mod.name}</h4>
                                                            </div>
                                                            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed pt-1">
                                                                {mod.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Section 4: Overview & Technical Context */}
                                    {project.overviewText && project.overviewText.length > 0 && (
                                        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10">
                                            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                                Overview & Development Context
                                            </h3>
                                            <div className="space-y-2.5 sm:space-y-3 text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                                                {project.overviewText.map((paragraph, i) => (
                                                    <p key={`overview-p-${i}`}>{paragraph}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox / Fullscreen Image Viewer Modal with Prev/Next Navigation */}
            <AnimatePresence>
                {lightboxIndex !== null && currentLightboxItem && (
                    <motion.div
                        key="developer-lightbox-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 sm:p-8"
                        onClick={handleCloseLightbox}
                    >
                        {/* Header Info & Close Button */}
                        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-20 pointer-events-none">
                            <div className="px-3 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-white text-xs sm:text-sm font-semibold pointer-events-auto">
                                {currentLightboxItem.title}
                            </div>
                            <button
                                onClick={handleCloseLightbox}
                                className="p-2 sm:p-3 rounded-full bg-black/70 hover:bg-white/20 border border-white/15 text-white transition-colors pointer-events-auto shadow-xl"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Previous Button */}
                        {allGalleryImages.length > 0 && (
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-primary border border-white/15 hover:border-primary text-white transition-all shadow-2xl z-20 group"
                                title="Previous Image (Left Arrow)"
                            >
                                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
                            </button>
                        )}

                        {/* Next Button */}
                        {allGalleryImages.length > 0 && (
                            <button
                                onClick={handleNextImage}
                                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-primary border border-white/15 hover:border-primary text-white transition-all shadow-2xl z-20 group"
                                title="Next Image (Right Arrow)"
                            >
                                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
                            </button>
                        )}

                        {/* Image View Container */}
                        <div
                            className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                key={currentLightboxItem.path}
                                src={currentLightboxItem.path}
                                alt="Expanded View"
                                fill
                                className="object-contain"
                                quality={100}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
