"use client"

import { useState, useRef, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Layers, X, ZoomIn, ChevronDown, ChevronUp } from "lucide-react"

// Data Structure
type MerchCategory = {
    id: string
    name: string
    overview: string
    subProjects: {
        name: string
        images: string[]
    }[]
}

const merchData: MerchCategory[] = [
    {
        id: "shirts-polos",
        name: "Shirts & Polos",
        overview: "/images/Projects/Merch/Shirts & Polos/Overview.png",
        subProjects: [
            {
                name: "BPE321",
                images: ["Frame 27.jpg", "Frame 28.jpg", "Frame 29.jpg", "Frame 30.jpg", "Frame 31.jpg", "Frame 32.jpg", "Frame 33.jpg", "Frame 34.jpg", "Frame 36.jpg", "Frame 37.jpg", "Frame 38.jpg", "Frame 39.jpg", "Frame 40.jpg", "Frame 41.jpg", "Frame 42.jpg", "Frame 43.jpg", "Frame 44.jpg", "Frame 45.jpg"].map(img => `/images/Projects/Merch/Shirts & Polos/BPE321/${img}`)
            },
            {
                name: "DEE Intramurals 2025",
                images: ["Frame 27.jpg", "Frame 28.jpg", "Frame 29.jpg", "Frame 30.jpg", "Frame 31.jpg", "Frame 32.jpg", "Frame 33.jpg"].map(img => `/images/Projects/Merch/Shirts & Polos/DEE Intramurals 2025/${img}`)
            },
            {
                name: "Graphic NFL",
                images: ["Frame 33.jpg"].map(img => `/images/Projects/Merch/Shirts & Polos/Graphic NFL/${img}`)
            },
            {
                name: "Pickleball Tagum",
                images: ["Frame 27.jpg", "Frame 28.jpg", "Frame 29.jpg", "Frame 30.jpg"].map(img => `/images/Projects/Merch/Shirts & Polos/Pickleball Tagum/${img}`)
            },
            {
                name: "Red Cross",
                images: ["Frame 31.jpg"].map(img => `/images/Projects/Merch/Shirts & Polos/Red Cross/${img}`)
            },
            {
                name: "Skeptron",
                images: ["Frame 27.jpg", "Frame 29.jpg", "Frame 33.jpg"].map(img => `/images/Projects/Merch/Shirts & Polos/Skeptron/${img}`)
            },
            {
                name: "Tupaz FC",
                images: ["Frame 27.jpg", "Frame 28.jpg", "Frame 29.jpg"].map(img => `/images/Projects/Merch/Shirts & Polos/Tupaz FC/${img}`)
            },
            {
                name: "UM Engineering",
                images: ["Frame 27.jpg", "Frame 28.jpg", "Frame 29.jpg", "Frame 30.jpg", "Frame 31.jpg"].map(img => `/images/Projects/Merch/Shirts & Polos/UM Engineering/${img}`)
            },
            {
                name: "Universities",
                images: ["Frame 27.jpg", "Frame 28.jpg", "Frame 29.jpg", "Frame 33.jpg", "Frame 34.jpg"].map(img => `/images/Projects/Merch/Shirts & Polos/Universities/${img}`)
            }
        ]
    },
    {
        id: "bus",
        name: "Bus",
        overview: "/images/Projects/Merch/Bus/Overview.jpg",
        subProjects: [
            {
                name: "DC Bus",
                images: ["M_Back.jpg", "M_Front.jpg", "M_Side1.jpg", "M_Side2.jpg"].map(img => `/images/Projects/Merch/Bus/DC Bus/${img}`)
            }
        ]
    },
    {
        id: "cap",
        name: "Cap",
        overview: "/images/Projects/Merch/Cap/Overview.jpg",
        subProjects: [
            {
                name: "DEE Cap",
                images: [
                    "Frame 27.jpg", "Frame 28.jpg", "Frame 29.jpg", "Frame 30.jpg",
                    "Frame 31.jpg", "Frame 32.jpg", "Frame 33.jpg", "Frame 34.jpg",
                    "Frame 35.jpg", "Frame 36.jpg", "Frame 37.jpg"
                ].map(img => `/images/Projects/Merch/Cap/DEE Cap/${img}`)
            }
        ]
    },
    {
        id: "jacket",
        name: "Jacket",
        overview: "/images/Projects/Merch/Jacket/Overview.jpg",
        subProjects: [
            {
                name: "DEE Jacket",
                images: [
                    "Frame 27.jpg", "Frame 28.jpg", "Frame 29.jpg",
                    "Frame 30.jpg", "Frame 31.jpg", "Frame 33.jpg"
                ].map(img => `/images/Projects/Merch/Jacket/DEE Jacket/${img}`)
            },
            {
                name: "Sibs Jacket",
                images: ["Frame 32.jpg"].map(img => `/images/Projects/Merch/Jacket/Sibs Jacket/${img}`)
            }
        ]
    },
    {
        id: "lanyard",
        name: "Lanyard",
        overview: "/images/Projects/Merch/Lanyard/Overview.jpg",
        subProjects: [
            {
                name: "DEE Lanyard",
                images: ["Frame 27.jpg"].map(img => `/images/Projects/Merch/Lanyard/DEE Lanyard/${img}`)
            },
            {
                name: "Forces Lanyard",
                images: ["Frame 28.jpg"].map(img => `/images/Projects/Merch/Lanyard/Forces Lanyard/${img}`)
            }
        ]
    },
    {
        id: "packaging",
        name: "Packaging",
        overview: "/images/Projects/Merch/Packaging/Overview.jpg",
        subProjects: [
            {
                name: "KCO Packaging",
                images: [
                    "Frame 27.jpg", "Frame 28.jpg", "Frame 29.jpg", "Frame 30.jpg",
                    "Frame 31.jpg", "Frame 32.jpg", "Frame 33.jpg"
                ].map(img => `/images/Projects/Merch/Packaging/KCO Packaging/${img}`)
            }
        ]
    }
]

export function MerchDesigns() {
    // Keep track of the ORDER of projects. Index 0 is Active (Left). Rest are Stack (Right).
    const [projects, setProjects] = useState(merchData)
    const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({})

    // Changed from boolean to number to support incremental loading
    const [visibleCollectionCount, setVisibleCollectionCount] = useState(2)
    const BATCH_SIZE = 2 // Load 2 more at a time

    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const isDragging = useRef(false)

    const activeProject = projects[0]
    const stackProjects = projects.slice(1)

    // Reset visual states when project changes
    useMemo(() => {
        setVisibleCollectionCount(2) // Reset to initial 2
        setVisibleCounts({})
    }, [activeProject.id])

    const handleShuffle = () => {
        setProjects(prev => {
            if (prev.length < 2) return prev
            const [active, top, ...rest] = prev
            return [active, ...rest, top]
        })
    }

    // Mobile Swipe Logics
    const handleSwipeNext = () => {
        setProjects(prev => {
            const [current, ...rest] = prev
            return [...rest, current]
        })
    }

    const handleSwipePrev = () => {
        setProjects(prev => {
            const last = prev[prev.length - 1]
            const rest = prev.slice(0, prev.length - 1)
            return [last, ...rest]
        })
    }

    const handleSelect = (selectedId: string) => {
        if (isDragging.current) {
            isDragging.current = false
            return
        }

        setProjects(prev => {
            const index = prev.findIndex(p => p.id === selectedId)
            if (index <= 0) return prev

            const newProjects = [...prev]
            const [selected] = newProjects.splice(index, 1)
            newProjects.unshift(selected)
            return newProjects
        })
    }

    const toggleVisibility = (subName: string, total: number) => {
        setVisibleCounts(prev => {
            const current = prev[subName] || 6
            // Toggle between 6 and Total
            const newValue = current > 6 ? 6 : total
            return { ...prev, [subName]: newValue }
        })
    }

    const handleShowMoreCollections = () => {
        setVisibleCollectionCount(prev => prev + BATCH_SIZE)
    }

    const handleShowLessCollections = () => {
        setVisibleCollectionCount(2)
    }

    // Determine which collections to show
    const visibleSubProjects = activeProject.subProjects.slice(0, visibleCollectionCount)
    const totalCollections = activeProject.subProjects.length
    const hiddenCount = totalCollections - visibleCollectionCount

    return (
        <div className="w-full space-y-8 mt-32">
            {/* Header */}
            <div className="px-4 md:px-0 text-center xl:text-left">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Merch <span className="text-primary">Designs</span>
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto xl:mx-0">
                    Select a card from the stack to view details.
                    <span className="xl:hidden block mt-1 text-primary text-sm animate-pulse">
                        &larr; Swipe image to browse &rarr;
                    </span>
                </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 min-h-[600px] relative">

                {/* LEFT: Active View */}
                <div className="w-full xl:w-2/3 relative z-10">
                    <AnimatePresence mode="popLayout" custom={activeProject.id}>
                        <motion.div
                            key={activeProject.id}
                            className="w-full h-full bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden flex flex-col"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {/* Hero Image Area - Swipeable on Mobile */}
                            <motion.div
                                className="relative h-[250px] w-full shrink-0 cursor-grab active:cursor-grabbing touch-pan-y"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, info) => {
                                    const swipeThreshold = 50
                                    if (info.offset.x < -swipeThreshold) {
                                        handleSwipeNext()
                                    } else if (info.offset.x > swipeThreshold) {
                                        handleSwipePrev()
                                    }
                                }}
                            >
                                <Image
                                    src={activeProject.overview}
                                    alt={activeProject.name}
                                    fill
                                    className="object-cover pointer-events-none"
                                    unoptimized
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                                <div className="absolute bottom-6 left-8">
                                    <h3 className="text-3xl font-bold text-white mb-2">{activeProject.name}</h3>
                                    <div className="flex items-center gap-2 text-primary">
                                        <Layers className="w-4 h-4" />
                                        <span className="text-sm font-medium">{activeProject.subProjects.length} Collections</span>
                                    </div>
                                </div>

                                {/* Mobile Interaction Hint */}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 xl:hidden text-white/20">
                                    <ArrowRight className="w-6 h-6 animate-pulse" />
                                </div>
                            </motion.div>

                            {/* Content Area */}
                            <div className="p-6 md:p-8 flex-1 overflow-y-auto min-h-[200px] bg-black/20 backdrop-blur-sm custom-scrollbar">
                                {activeProject.subProjects.length > 0 ? (
                                    <div className="space-y-10">
                                        {visibleSubProjects.map((sub, idx) => {
                                            const limit = visibleCounts[sub.name] || 6
                                            const isExpanded = limit > 6
                                            const visibleImages = sub.images.slice(0, limit)

                                            return (
                                                <div key={`${activeProject.id}-${sub.name}`} className="space-y-4">
                                                    <div className="flex items-center gap-4">
                                                        <h4 className="text-xl font-bold text-white/90">{sub.name}</h4>
                                                        <div className="h-px flex-1 bg-white/10" />
                                                        {sub.images.length > 6 && (
                                                            <button
                                                                onClick={() => toggleVisibility(sub.name, sub.images.length)}
                                                                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded hover:bg-white/5"
                                                            >
                                                                {isExpanded ? "Show Less" : `Show All (${sub.images.length})`}
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        {visibleImages.map((img, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="aspect-square rounded-xl overflow-hidden bg-white/5 relative group/img cursor-pointer transition-all hover:scale-105 border border-white/5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                                                                layoutId={`img-${sub.name}-${i}`}
                                                                onClick={() => setSelectedImage(img)}
                                                            >
                                                                <Image
                                                                    src={img}
                                                                    alt={`${sub.name} ${i + 1}`}
                                                                    fill
                                                                    className="object-cover"
                                                                    sizes="(max-width: 768px) 50vw, 33vw"
                                                                    unoptimized
                                                                />
                                                                {/* Hover Overlay Icon */}
                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <ZoomIn className="w-8 h-8 text-primary drop-shadow-lg" />
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        {/* Show More Collections Button - BATCHED */}
                                        {hiddenCount > 0 && (
                                            <div className="pt-4 flex justify-center border-t border-white/10">
                                                <button
                                                    onClick={handleShowMoreCollections}
                                                    className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <span className="text-sm font-medium">Show {Math.min(hiddenCount, BATCH_SIZE)} More (of {hiddenCount})</span>
                                                    <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-primary" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Show Less Collections Button */}
                                        {visibleCollectionCount > 2 && (
                                            <div className="pt-4 flex justify-center border-t border-white/10">
                                                <button
                                                    onClick={handleShowLessCollections}
                                                    className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <span className="text-sm font-medium">Show Less Collections</span>
                                                    <ChevronUp className="w-5 h-5 group-hover:text-primary" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                                        <Layers className="w-12 h-12 opacity-20" />
                                        <p>No designs in this category yet.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT: The Stack - HIDDEN ON MOBILE/TABLET (lg breakpoint) */}
                <div className="hidden xl:flex w-full xl:w-1/3 relative h-[500px] items-center justify-center pointer-events-none xl:pointer-events-auto">
                    {/* Render stack */}
                    {stackProjects.map((category, index) => {
                        const zIndex = stackProjects.length - index
                        const offset = index * 10
                        const scale = 1 - (index * 0.05)
                        const isTop = index === 0

                        return (
                            <motion.div
                                key={category.id}
                                layoutId={`card-${category.id}`}
                                className="group absolute w-[80%] aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-gray-900 hover:border-primary transition-colors duration-300"
                                style={{
                                    zIndex,
                                    top: 20,
                                    right: 20,
                                    cursor: isTop ? "grab" : "default"
                                }}
                                animate={{
                                    scale,
                                    x: offset,
                                    y: offset,
                                }}
                                whileHover={isTop ? { scale: scale + 0.05, x: offset - 20 } : {}}
                                drag={isTop ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragStart={() => {
                                    if (isTop) isDragging.current = true
                                }}
                                onDragEnd={(e, info) => {
                                    if (!isTop) return
                                    setTimeout(() => isDragging.current = false, 50)
                                    if (Math.abs(info.offset.x) > 100) handleShuffle()
                                }}
                                onClick={() => handleSelect(category.id)}
                            >
                                <Image
                                    src={category.overview}
                                    alt={category.name}
                                    fill
                                    className="object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-40"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <h4 className="text-xl font-bold text-white truncate group-hover:text-primary transition-colors">{category.name}</h4>
                                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                        <span className="text-sm font-medium text-white">Click to View More</span>
                                        <ArrowRight className="w-3 h-3 text-primary" />
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}

                    {/* Hint */}
                    {stackProjects.length > 0 && (
                        <div className="absolute -bottom-12 left-0 right-0 text-center flex justify-center">
                            <p className="text-sm text-primary font-medium animate-pulse">
                                Swipe to view more category
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[110]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            className="relative w-full h-full max-w-7xl max-h-[90vh]"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image area
                        >
                            <Image
                                src={selectedImage}
                                alt="Full screen preview"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
