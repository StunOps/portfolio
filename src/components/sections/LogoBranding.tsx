"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { BrandingModal } from "@/components/ui/BrandingModal"
import { cn } from "@/lib/utils"

// List of folder names found in the directory
const logoProjects = [
    { name: "CFIC", folder: "1CFIC", description: "Caraga Fincorp Identity" },
    { name: "RIC", folder: "2RIC", description: "UMTC Organization" },
    { name: "AYE Leader", folder: "3AYE Leader", description: "Youth leadership program branding" },
    { name: "Madayaw", folder: "4Madayaw", description: "Villas and Cafe Resort" },
    { name: "ADS", folder: "ADS", description: "Digital solutions agency logo" },
    { name: "ADS Swim Team", folder: "ADS Swim Team", description: "Sports team mascot and identity" },
    { name: "ASEAN Foundation", folder: "ASEAN Foundation", description: "International organization branding" },
    { name: "Ace for Gate", folder: "Ace for Gate", description: "Real estate development logo" },
    { name: "CARAGA Tourism", folder: "CARAGA Tourism", description: "Tourism campaign visual identity" },
    { name: "DASURECO 50th", folder: "DASURECO 50th", description: "Anniversary milestone branding" },
    { name: "DEE CB", folder: "DEE CB", description: "Departmental branding" },
    { name: "DSG-DEE", folder: "DSG-DEE", description: "Educational institution identity" },
    { name: "EDSART", folder: "EDSART", description: "Artistic collective logo" },
    { name: "Etch Bros", folder: "Etch Bros", description: "Laser engraving business identity" },
    { name: "Gensan Agri-Fishery", folder: "Gensan Agri-Fishery", description: "Government agricultural department" },
    { name: "Indino-Digal Dental Clinic", folder: "Indino-Digal Dental Clinic", description: "Medical practice visual identity" },
    { name: "LCC 80th", folder: "LCC 80th", description: "College anniversary branding" },
    { name: "Luna Apayao", folder: "Luna Apayao", description: "Local government unit identity" },
    { name: "MCWD", folder: "MCWD", description: "Water district corporate logo" },
    { name: "MILC", folder: "MILC", description: "Learning center branding" },
    { name: "Naliyagan Draft", folder: "Naliyagan Draft", description: "Festival concept exploration" },
    { name: "Naliyagan Rev1", folder: "Naliyagan Rev1", description: "Festival branding refinement" },
    { name: "PDRRMO", folder: "PDRRMO", description: "Disaster response unit logo" },
    { name: "Tupaz FC", folder: "Tupaz FC", description: "Football club sports identity" },
    { name: "UMTC Intrams 2023", folder: "UMTC Intrams 2023", description: "University sports event branding" },
    { name: "UMTC Intrams 2024", folder: "UMTC Intrams 2024", description: "Annual sports meet visual system" },
    { name: "Vietnam-Philippines 50th", folder: "Vietnam-Philippines 50th", description: "Diplomatic anniversary logo" },
    { name: "WLTS", folder: "WLTS", description: "Logistics and transport identity" }
]

export function LogoBranding() {
    const [selectedProject, setSelectedProject] = useState<{ name: string, brandingImage: string, description: string } | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [constraint, setConstraint] = useState(0)

    // Motion value for drag position
    const x = useMotionValue(0)
    // Map drag position to progress percentage
    const progress = useTransform(x, [0, constraint], ["0%", "100%"])

    // Calculate drag constraints on mount/resize
    useEffect(() => {
        const calculateConstraints = () => {
            if (containerRef.current && trackRef.current) {
                const containerWidth = containerRef.current.offsetWidth
                const trackWidth = trackRef.current.scrollWidth
                setConstraint(containerWidth - trackWidth - 48) // 48px padding buffer
            }
        }

        calculateConstraints()
        window.addEventListener('resize', calculateConstraints)
        return () => window.removeEventListener('resize', calculateConstraints)
    }, [])

    const handlePrev = () => {
        if (!containerRef.current) return
        const cardWidth = containerRef.current.offsetWidth < 768 ? 360 : 440
        const currentX = x.get()
        const targetX = Math.min(0, currentX + cardWidth)
        animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 })
    }

    const handleNext = () => {
        if (!containerRef.current) return
        const cardWidth = containerRef.current.offsetWidth < 768 ? 360 : 440
        const currentX = x.get()
        const targetX = Math.max(constraint, currentX - cardWidth)
        animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 })
    }

    const handleProjectClick = (project: typeof logoProjects[0]) => {
        setSelectedProject({
            name: project.name,
            brandingImage: `/images/Projects/LogoBranding/${project.folder}/Branding.png`,
            description: project.description
        })
    }

    return (
        <div className="w-full space-y-8 mt-20">
            {/* Section Header */}
            <div className="text-center md:text-left px-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Logo <span className="text-primary">Branding</span>
                </h2>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-2 max-w-2xl">
                    <p className="text-muted-foreground">
                        A collection of brand identities and logo marks.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium animate-pulse text-sm">
                        <span>Swipe to Navigate</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Draggable Carousel Container with Side Navigation Arrows */}
            <div className="relative group/carousel w-full">
                {/* Left Side Arrow Button */}
                <button
                    onClick={handlePrev}
                    className="hidden md:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-primary border border-white/20 hover:border-primary text-white backdrop-blur-md shadow-2xl transition-all duration-300 opacity-80 hover:opacity-100 active:scale-90 cursor-pointer items-center justify-center"
                    aria-label="Previous logo card"
                >
                    <ChevronLeft className="w-6 h-6 -translate-x-0.5" />
                </button>

                {/* Right Side Arrow Button */}
                <button
                    onClick={handleNext}
                    className="hidden md:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-primary border border-white/20 hover:border-primary text-white backdrop-blur-md shadow-2xl transition-all duration-300 opacity-80 hover:opacity-100 active:scale-90 cursor-pointer items-center justify-center"
                    aria-label="Next logo card"
                >
                    <ChevronRight className="w-6 h-6 translate-x-0.5" />
                </button>

                {/* Side Gradient Blending */}
                <div className="absolute left-0 top-0 bottom-8 w-12 sm:w-16 bg-gradient-to-r from-background via-background/60 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-8 w-12 sm:w-16 bg-gradient-to-l from-background via-background/60 to-transparent z-10 pointer-events-none" />

                {/* Track */}
                <div
                    ref={containerRef}
                    className="w-full overflow-hidden px-4 md:px-0 cursor-grab active:cursor-grabbing"
                >
                <motion.div
                    ref={trackRef}
                    drag="x"
                    dragConstraints={{ right: 0, left: constraint }}
                    dragElastic={0.1}
                    style={{ x }}
                    className="flex gap-10 w-max pb-8"
                >
                    {logoProjects.map((project, index) => (
                        <motion.div
                            key={project.folder}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            onClick={() => handleProjectClick(project)}
                            className="relative group shrink-0 w-[280px] sm:w-[350px] md:w-[400px] aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary transition-colors duration-300 pointer-events-auto"
                        >
                            {/* Image */}
                            <Image
                                src={`/images/Projects/LogoBranding/${project.folder}/Overview.png`}
                                alt={project.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:via-transparent md:to-transparent md:bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">

                                {/* Centered Button - Matching UI/UX Card exactly */}
                                <div className="absolute inset-0 hidden md:flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 pointer-events-none">
                                        Explore <ArrowRight className="w-4 h-4 text-white" />
                                    </button>
                                </div>

                                {/* Bottom Text */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 text-left">
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-gray-300 group-hover:text-white/90 transition-colors duration-300 mt-1 line-clamp-1">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Spacer for right padding */}
                    <div className="w-4 shrink-0" />
                </motion.div>
            </div>
            </div>

            {/* Custom Scroll Indicator */}
            <div className="flex justify-center items-center px-4">
                <div className="w-full max-w-xs h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        style={{ width: progress }}
                    />
                </div>
            </div>

            <BrandingModal
                isOpen={!!selectedProject}
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    )
}
