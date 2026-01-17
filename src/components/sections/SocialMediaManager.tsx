"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight, X, ChevronLeft, ChevronRight, Play, SkipForward, SkipBack, LayoutList } from "lucide-react"

type SMMProject = {
    id: string
    name: string
    description: string
    dateRange: string
    ads?: string
    status: "Active" | "Inactive"
    skills: { name: string; level: number }[]
    duration: string
    years: number
    role: string
    logo: string
    color: string
    contentImages: string[]
    insightImages: string[]
}



const liveData = [
    {
        id: "e-sports",
        title: "E-Sports Overlays",
        thumbnail: "/images/Projects/SMM/Live Overlays/E-Sports/Overview.jpg",
        images: [
            { src: "/images/Projects/SMM/Live Overlays/E-Sports/MLBB Instrams Tryout Initial copy.jpg", title: "Tryout Initial Screen" },
            { src: "/images/Projects/SMM/Live Overlays/E-Sports/ML Initial Overlay copy.jpg", title: "ML Initial Overlay" },
            { src: "/images/Projects/SMM/Live Overlays/E-Sports/PICKING OVERLAY copy.jpg", title: "Picking Phase Overlay" },
            { src: "/images/Projects/SMM/Live Overlays/E-Sports/MLBB Instrams Tryout Picking copy.jpg", title: "Draft/Picking Phase" },
            { src: "/images/Projects/SMM/Live Overlays/E-Sports/No Tracking ML Overlay copy.jpg", title: "In-Game Overlay" },

        ]
    },
    {
        id: "seminars",
        title: "Webinar & Seminar Overlays",
        thumbnail: "/images/Projects/SMM/Live Overlays/Seminars/Overview.jpg",
        images: [
            { src: "/images/Projects/SMM/Live Overlays/Seminars/PakigDEEmamat Workshop.jpg", title: "Workshop Overlay" },
            { src: "/images/Projects/SMM/Live Overlays/Seminars/Seminar Live Stream copy.jpg", title: "Live Stream Layout" },
            { src: "/images/Projects/SMM/Live Overlays/Seminars/PakigDEEmamat Workshops copy.jpg", title: "Workshop Waiting Screen" },
        ]
    }
]

const smmData: SMMProject[] = [
    {
        id: "dee-umtc",
        name: "DEE-UMTC",
        description: "A Department of Engineering Education Organization.",
        dateRange: "August 2025 - January 2026",
        ads: "None",
        status: "Active",
        skills: [
            { name: "Strategy Development", level: 90 },
            { name: "Content Creation", level: 90 },
            { name: "Community Management", level: 70 },
            { name: "Analytics & Reporting", level: 100 },
            { name: "Trend Monitoring", level: 90 },
        ],
        duration: "2 Years",
        years: 2,
        role: "Social Media Manager",
        logo: "/images/Projects/SMM/DEE-UMTC/Logo.png",
        color: "bg-blue-500",
        contentImages: Array.from({ length: 20 }, (_, i) => `/images/Projects/SMM/DEE-UMTC/Contents/Frame ${36 + i}.jpg`),
        insightImages: [
            "/images/Projects/SMM/DEE-UMTC/Insights/Frame 35.jpg",
            "/images/Projects/SMM/DEE-UMTC/Insights/Frame 56.jpg",
            "/images/Projects/SMM/DEE-UMTC/Insights/Frame 57.jpg",
            "/images/Projects/SMM/DEE-UMTC/Insights/Frame 58.jpg",
            "/images/Projects/SMM/DEE-UMTC/Insights/Frame 59.jpg",
            "/images/Projects/SMM/DEE-UMTC/Insights/Frame 60.jpg",
        ]
    },
    {
        id: "code-craft",
        name: "Code&Craft",
        description: "A creative coding and design company.",
        dateRange: "August 2024 - January 2025",
        ads: "None",
        status: "Active",
        skills: [
            { name: "Strategy Development", level: 50 },
            { name: "Content Creation", level: 60 },
            { name: "Community Management", level: 20 },
            { name: "Analytics & Reporting", level: 70 },
            { name: "Trend Monitoring", level: 40 },
        ],
        duration: "1 Year",
        years: 1,
        role: "Social Media Manager",
        logo: "/images/Projects/SMM/Code&Craft/Logo.png",
        color: "bg-purple-500",
        contentImages: [
            "/images/Projects/SMM/Code&Craft/Contents/Frame 36.jpg",
            "/images/Projects/SMM/Code&Craft/Contents/Frame 37.jpg",
            "/images/Projects/SMM/Code&Craft/Contents/Frame 38.jpg",
            "/images/Projects/SMM/Code&Craft/Contents/Frame 39.jpg",
        ],
        insightImages: [
            "/images/Projects/SMM/Code&Craft/Insights/Frame 35.jpg",
            "/images/Projects/SMM/Code&Craft/Insights/Frame 56.jpg",
            "/images/Projects/SMM/Code&Craft/Insights/Frame 57.jpg",
            "/images/Projects/SMM/Code&Craft/Insights/Frame 58.jpg",
            "/images/Projects/SMM/Code&Craft/Insights/Frame 59.jpg",
            "/images/Projects/SMM/Code&Craft/Insights/Frame 60.jpg",
        ]
    },
    {
        id: "etch-bros",
        name: "Etch Bros",
        description: "Specialized laser etching and personalization services.",
        dateRange: "January 2024 - January 2025",
        ads: "None",
        status: "Inactive",
        skills: [
            { name: "Strategy Development", level: 80 },
            { name: "Content Creation", level: 100 },
            { name: "Community Management", level: 100 },
            { name: "Analytics & Reporting", level: 80 },
            { name: "Trend Monitoring", level: 70 },
        ],
        duration: "9 Months",
        years: 0.75,
        role: "Social Media Manager",
        logo: "/images/Projects/SMM/Etch Bros/Logo.png",
        color: "bg-orange-500",
        contentImages: [
            "/images/Projects/SMM/Etch Bros/Contents/Frame 36.jpg",
            "/images/Projects/SMM/Etch Bros/Contents/Frame 37.jpg",
            "/images/Projects/SMM/Etch Bros/Contents/Frame 38.jpg",
        ],
        insightImages: [
            "/images/Projects/SMM/Etch Bros/Insights/Frame 35.jpg",
            "/images/Projects/SMM/Etch Bros/Insights/Frame 56.jpg",
            "/images/Projects/SMM/Etch Bros/Insights/Frame 57.jpg",
            "/images/Projects/SMM/Etch Bros/Insights/Frame 58.jpg",
            "/images/Projects/SMM/Etch Bros/Insights/Frame 61.jpg",
        ]
    }
]

export function SocialMediaManager() {
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [selectedProject, setSelectedProject] = useState<SMMProject | null>(null)
    const maxYears = 2.5

    return (
        <div className="w-full max-w-5xl mx-auto mt-1 px-4">
            <div className="text-center mb-32 space-y-4 relative z-20">
                <h3 className="text-3xl md:text-4xl font-bold text-white/90">
                    Experience <span className="text-primary">Timeline</span>
                </h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    A visual representation of my social media management journey, highlighting the duration and impact of each role.
                </p>
                <p className="text-primary text-sm font-medium animate-pulse pt-4">
                    (↑ Hover/Tap graph for details)
                </p>
            </div>

            <div className="relative h-[400px] flex items-end justify-center gap-8 md:gap-20 border-b border-white/10">
                {/* Y-Axis Grid Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    {[2, 1.5, 1, 0.5].map((val) => (
                        <div
                            key={val}
                            className="absolute w-full border-t border-dashed border-white/20 left-0"
                            style={{ bottom: `${(val / maxYears) * 100}%` }}
                        >
                            <span className="absolute -left-8 -top-2.5 text-xs text-white/50">{val}y</span>
                        </div>
                    ))}
                </div>

                {smmData.map((project, index) => {
                    const heightPercentage = (project.years / maxYears) * 100
                    const isHovered = hoveredId === project.id

                    return (
                        <div
                            key={project.id}
                            className="relative group flex flex-col items-center justify-end h-full w-24 md:w-32 z-10"
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Logo Hover Reveal - Floating Top */}
                            <div
                                style={{ bottom: `${heightPercentage}%`, marginBottom: '12px' }}
                                className="absolute flex flex-col items-center gap-3 w-32 md:w-40 pointer-events-none z-20 transition-all duration-300 ease-out origin-bottom
                                opacity-100 scale-100 translate-y-0
                                md:opacity-0 md:scale-90 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:translate-y-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-3 shadow-2xl relative overflow-hidden">
                                    <Image
                                        src={project.logo}
                                        alt={project.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="text-center bg-black/80 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-white/10 mb-2 shadow-xl">
                                    <p className="text-white font-bold text-xs md:text-sm whitespace-nowrap">{project.name}</p>
                                    <p className="text-primary text-[10px] md:text-xs font-semibold">{project.duration}</p>
                                </div>
                            </div>

                            {/* The Bar */}
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: `${heightPercentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.2, type: "spring", bounce: 0.2 }}
                                className={cn(
                                    "w-full rounded-t-2xl relative cursor-pointer transition-colors duration-300 overflow-hidden",
                                    "bg-white/10 border border-white/20 hover:border-primary",
                                    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity"
                                )}
                            >
                                {/* Explore Button - INSIDE BAR */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center gap-1.5 bg-primary px-3 py-1 rounded-full border border-primary shadow-lg shadow-primary/20">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-wide">Explore</span>
                                    <ArrowRight className="w-3 h-3 text-white" />
                                </div>
                            </motion.div>
                        </div>
                    )
                })}
            </div>

            {/* Legend / Stats */}
            {/* Legend / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl mx-auto">
                {smmData.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-white/20 transition-all cursor-pointer hover:bg-white/10 hover:scale-105 active:scale-95 duration-200"
                    >
                        <div className="h-10 w-10 relative shrink-0 rounded-full bg-white/5 p-2">
                            <Image
                                src={project.logo}
                                alt={project.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">{project.name}</h4>
                            <p className="text-xs text-muted-foreground">{project.duration}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <SMMModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            <div className="mt-32 pt-20 border-t border-white/10">
                <LiveOverlayGallery />
            </div>
        </div>
    )
}

function SMMModal({ project, onClose }: { project: SMMProject; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'contents' | 'insights'>('contents')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isSkillsOpen, setIsSkillsOpen] = useState(false)

    // Reset index when tab changes
    useEffect(() => {
        setCurrentIndex(0)
    }, [activeTab])

    const images = activeTab === 'contents' ? project.contentImages : project.insightImages

    const handleNext = () => {
        if (images.length === 0) return
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const handlePrev = () => {
        if (images.length === 0) return
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 overflow-y-auto custom-scrollbar"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-6xl bg-gray-900 rounded-3xl border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl h-auto md:h-[80vh] my-8 md:my-0 shrink-0"
            >
                {/* Header / Sidebar (Mobile: Top, Desktop: Left) */}
                <div className="w-full md:w-[350px] shrink-0 bg-primary/10 border-b md:border-b-0 md:border-r border-white/10 p-6 md:p-8 flex flex-col gap-6 relative overflow-y-auto custom-scrollbar">
                    {/* Close Button Mobile */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-3 shrink-0">
                                <Image
                                    src={project.logo}
                                    alt={project.name}
                                    width={64}
                                    height={64}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                                <div className={cn("self-start px-2 py-0.5 rounded text-[10px] font-bold border", project.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30')}>
                                    {project.status}
                                </div>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Timeline</p>
                        <p className="text-primary font-medium">{project.dateRange}</p>
                    </div>

                    {project.ads && (
                        <div className="space-y-1">
                            <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Ads</p>
                            <p className="text-white font-medium">{project.ads}</p>
                        </div>
                    )}

                    {/* Skills Progress Bars */}
                    <div className="space-y-3 py-2 border-t border-white/5 pt-4">
                        <button
                            onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                            className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest font-bold hover:text-primary transition-colors w-full group"
                        >
                            <span>Role Breakdown</span>
                            <ChevronRight
                                className={cn(
                                    "w-4 h-4 transition-transform duration-300",
                                    isSkillsOpen ? "rotate-90 text-primary" : "text-white/20 group-hover:text-primary"
                                )}
                            />
                        </button>

                        <AnimatePresence>
                            {isSkillsOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-3 overflow-hidden"
                                >
                                    {project.skills.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between text-xs text-white/70 mb-1">
                                                <span>{skill.name}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className="h-full bg-primary rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 mt-auto md:mt-0">
                        {(['contents', 'insights'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab)
                                    setCurrentIndex(0)
                                }}
                                className={cn(
                                    "flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize",
                                    activeTab === tab
                                        ? "bg-primary text-white shadow-lg"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Body / Gallery Area */}
                <div className="flex-1 relative bg-primary/5 flex flex-col">
                    {/* Close Button Desktop */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all duration-300"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Image Display */}
                    <div className="flex-1 relative flex items-center justify-center p-4 md:p-12 overflow-hidden group/gallery">
                        {images.length > 0 && images[currentIndex] ? (
                            <>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full max-h-[600px] aspect-[4/5] md:aspect-video rounded-xl overflow-hidden shadow-2xl"
                                    >
                                        <Image
                                            src={images[currentIndex]}
                                            alt={`${project.name} ${activeTab} ${currentIndex + 1}`}
                                            fill
                                            className="object-contain bg-black/50"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary hover:border-primary transition-colors opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 disabled:opacity-0"
                                    disabled={images.length <= 1}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary hover:border-primary transition-colors opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 disabled:opacity-0"
                                    disabled={images.length <= 1}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>

                                {/* Counter */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-medium text-white">
                                    {currentIndex + 1} / {images.length}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                                <p>No {activeTab} available yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

function LiveOverlayGallery() {
    const [activeCategory, setActiveCategory] = useState(0)
    const [currentImage, setCurrentImage] = useState(0)

    const category = liveData[activeCategory]
    const image = category.images[currentImage]

    // Safety check just in case
    if (!category || !image) return null;

    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % category.images.length)
    }

    const handlePrev = () => {
        setCurrentImage((prev) => (prev - 1 + category.images.length) % category.images.length)
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-600/20">
                    <Play className="w-6 h-6 text-white fill-current" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Live Section</h3>
                    <p className="text-muted-foreground text-sm">Streaming overlays and broadcast designs</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Player Area */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
                        <Image
                            src={image.src}
                            alt={image.title}
                            fill
                            className="object-contain"
                        />

                        {/* Overlay Controls (YouTube style hover) */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-8">
                            <button onClick={handlePrev} className="p-2 hover:bg-white/20 rounded-full transition-colors text-white">
                                <SkipBack className="w-8 h-8 fill-current" />
                            </button>
                            <button onClick={handleNext} className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors text-white shadow-lg scale-100 hover:scale-110 active:scale-95 duration-200">
                                <Play className="w-8 h-8 fill-current ml-1" />
                            </button>
                            <button onClick={handleNext} className="p-2 hover:bg-white/20 rounded-full transition-colors text-white">
                                <SkipForward className="w-8 h-8 fill-current" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <h4 className="text-xl font-bold text-white">{image.title}</h4>
                            <div className="flex gap-2">
                                <button onClick={handlePrev} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={handleNext} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar (Forward Bar) */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{currentImage + 1}</span>
                            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group/progress">
                                <motion.div
                                    className="h-full bg-red-600 relative overflow-hidden"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentImage + 1) / category.images.length) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-2 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                                </motion.div>
                            </div>
                            <span>{category.images.length}</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Playlist */}
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col h-full max-h-[500px]">
                    <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
                        <h4 className="font-bold text-white">Up Next</h4>
                        <LayoutList className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                        {liveData.map((cat, idx) => (
                            <div
                                key={cat.id}
                                onClick={() => { setActiveCategory(idx); setCurrentImage(0); }}
                                className={cn(
                                    "p-2 flex gap-3 cursor-pointer transition-colors rounded-lg",
                                    activeCategory === idx ? "bg-white/10 border border-white/5" : "hover:bg-white/5 border border-transparent"
                                )}
                            >
                                <div className="relative w-32 aspect-video rounded-md overflow-hidden shrink-0 bg-black shadow-lg">
                                    <Image src={cat.thumbnail} alt={cat.title} fill className="object-cover" />
                                    {activeCategory === idx && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <div className="flex gap-1 items-end h-3">
                                                <span className="w-1 bg-red-600 animate-[bounce_1s_infinite] h-2"></span>
                                                <span className="w-1 bg-red-600 animate-[bounce_1.2s_infinite] h-3"></span>
                                                <span className="w-1 bg-red-600 animate-[bounce_0.8s_infinite] h-1"></span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-center min-w-0">
                                    <h5 className={cn("text-xs font-bold line-clamp-2 leading-tight mb-1", activeCategory === idx ? "text-white" : "text-gray-300")}>
                                        {cat.title}
                                    </h5>
                                    <p className="text-[10px] text-white/40">{cat.images.length} videos</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
