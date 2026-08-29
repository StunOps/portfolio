"use client"

import React, { Component, Suspense, useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Center, OrbitControls, useGLTF, Resize } from "@react-three/drei"
import { Loader, Images, ChevronDown, ChevronUp, ArrowRight, Box } from "lucide-react"
import { ThreeDModal, ThreeDProject } from "@/components/ui/ThreeDModal"

// Define the structure for the project data
interface ProjectData {
    title: string
    subtitle: string
    tools: { name: string; icon: string }[]
    gallery: { name: string; images: { name: string; path: string }[] }[]
    description: string
    path: string
    category: string
    id: string
}

class ModelErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props)
        this.state = { hasError: false }
    }
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    componentDidCatch(error: any) {
        console.error("3D Model Render Error:", error)
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="absolute inset-0 flex items-center justify-center text-white bg-black/40 p-6 text-center">
                    <p className="text-sm text-muted-foreground font-medium">
                        3D Preview temporarily unavailable on this device.
                    </p>
                </div>
            )
        }
        return this.props.children
    }
}

const threeDProjects: ProjectData[] = [
    {
        id: "3d-1",
        title: "Air Monitoring",
        category: "Environmental Monitoring",
        subtitle: "Enclosure & Sensor Design",
        path: "/images/Projects/3D%20Design/Air%20Monitoring/Air-Monitoring.gltf",
        description: "IoT air quality monitoring device enclosure.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-2",
        title: "TAOB",
        category: "Product Design",
        subtitle: "Product Design Concept",
        path: "/images/Projects/3D%20Design/TAOB/TAOB.gltf",
        description: "Ergonomic tactile interface device.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: [
            {
                name: "Renderings",
                images: [
                    { name: "View 1", path: "/images/Projects/3D%20Design/TAOB/Images/1.png" },
                    { name: "View 2", path: "/images/Projects/3D%20Design/TAOB/Images/2.png" },
                    { name: "View 3", path: "/images/Projects/3D%20Design/TAOB/Images/3.png" },
                ]
            }
        ]
    },
    {
        id: "3d-3",
        title: "Leaf Monitoring",
        category: "Agricultural Tech",
        subtitle: "Sensor Holder & Casing",
        path: "/images/Projects/3D%20Design/Leaf%20Monitoring/Leaf%20Monitor%20Holder.gltf",
        description: "Field-ready plant leaf monitoring holder.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-4",
        title: "Agri-Scan",
        category: "Prototype Design",
        subtitle: "Prototype Design",
        path: "/images/Projects/3D%20Design/Agri-Scan/Agri-Scan.gltf",
        description: "Advanced agricultural scanning device prototype.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: [
            {
                name: "Renderings",
                images: [
                    { name: "View 1", path: "/images/Projects/3D%20Design/Agri-Scan/Images/1.png" },
                    { name: "View 2", path: "/images/Projects/3D%20Design/Agri-Scan/Images/2.png" },
                    { name: "View 3", path: "/images/Projects/3D%20Design/Agri-Scan/Images/3.png" },
                ]
            }
        ]
    },
    {
        id: "3d-5",
        title: "Coin Sorter",
        category: "Mechanical Engineering",
        subtitle: "Mechanical Engineering",
        path: "/images/Projects/3D%20Design/Coin%20Dispenser/Coin%20Dispenser.gltf",
        description: "Precision coin sorting unit.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: [
            {
                name: "Renderings",
                images: [
                    { name: "View 1", path: "/images/Projects/3D%20Design/Coin%20Dispenser/Images/1.png" },
                    { name: "View 2", path: "/images/Projects/3D%20Design/Coin%20Dispenser/Images/2.png" },
                ]
            }
        ]
    },
    {
        id: "3d-6",
        title: "Drone Monitoring",
        category: "Enclosure Design",
        subtitle: "Drone Monitor Mount & Enclosure",
        path: "/images/Projects/3D%20Design/Drone%20Monitoring/Drone%20Monitor%20Holder.gltf",
        description: "Custom drone monitoring system holder and casing.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-7",
        title: "Water Dispenser",
        category: "Automated System",
        subtitle: "Smart Dispensing Unit",
        path: "/images/Projects/3D%20Design/Water%20Dispenser/Water-Dispenser.gltf",
        description: "Automated smart water dispensing mechanism.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-8",
        title: "Bill Dispenser",
        category: "Mechanical Engineering",
        subtitle: "Mechanical Engineering",
        path: "/images/Projects/3D%20Design/Bill%20Dispenser/Bill%20Dispenser.gltf",
        description: "Automated bill dispensing mechanism.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: [
            {
                name: "Renderings",
                images: [
                    { name: "View 1", path: "/images/Projects/3D%20Design/Bill%20Dispenser/Images/1.png" },
                    { name: "View 2", path: "/images/Projects/3D%20Design/Bill%20Dispenser/Images/2.png" },
                    { name: "View 3", path: "/images/Projects/3D%20Design/Bill%20Dispenser/Images/3.png" },
                ]
            }
        ]
    },
    {
        id: "3d-9",
        title: "Blind Monitoring",
        category: "Assistive Technology",
        subtitle: "Tactile Smart Device Casing",
        path: "/images/Projects/3D%20Design/Blind%20Monitoring/Blind%20Monitoring.gltf",
        description: "Wearable assistive device for visually impaired navigation.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-10",
        title: "Bus Passenger Monitoring",
        category: "Transit Analytics",
        subtitle: "Passenger Counter Enclosure",
        path: "/images/Projects/3D%20Design/Bus%20Passenger%20Monitoring/Bus%20Passenger%20Monitoring.gltf",
        description: "Automated passenger counting & monitoring module.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-11",
        title: "Cheat Monitoring",
        category: "Proctoring Hardware",
        subtitle: "Exam Monitoring Sensor Unit",
        path: "/images/Projects/3D%20Design/Cheat%20Monitoring/Cheat%20Monitoring.gltf",
        description: "Smart monitoring casing for automated exam proctoring.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-12",
        title: "Cloud Monitoring",
        category: "IoT Enclosure",
        subtitle: "Cloud Connected Sensor Hub",
        path: "/images/Projects/3D%20Design/Cloud%20Monitoring/Cloud-Monitoring.gltf",
        description: "Compact cloud data telemetry & environmental sensor hub.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-13",
        title: "IT Heartbeat",
        category: "Server & IT Hardware",
        subtitle: "Server Status Monitor Unit",
        path: "/images/Projects/3D%20Design/IT%20Heartbeat/IT-Heartbeat.gltf",
        description: "Hardware telemetry monitor unit for server racks.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-14",
        title: "Pill Dispenser",
        category: "Medical Automation",
        subtitle: "Automated Medication Manager",
        path: "/images/Projects/3D%20Design/Pill%20Dispenser/Pill-Dispenser.gltf",
        description: "Smart timed pill dispensing mechanism.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: []
    },
    {
        id: "3d-15",
        title: "UV Holder",
        category: "Mounting Device",
        subtitle: "Mounting for Device Design",
        path: "/images/Projects/3D%20Design/UV%20Holder/UV%20Holder.gltf",
        description: "Precision UV light mounting bracket system.",
        tools: [{ name: "Fusion 360", icon: "/images/Projects/3D%20Design/Agri-Scan/Fusion.png" }],
        gallery: [
            {
                name: "Renderings",
                images: [
                    { name: "View 1", path: "/images/Projects/3D%20Design/UV%20Holder/Images/1.png" },
                    { name: "View 2", path: "/images/Projects/3D%20Design/UV%20Holder/Images/2.png" },
                ]
            }
        ]
    }
]

function Model({ path }: { path: string }) {
    const { scene } = useGLTF(path)
    return (
        <Center>
            <Resize scale={3.2}>
                <primitive object={scene} />
            </Resize>
        </Center>
    )
}

function LazyModel({ project, isReady, isPaused }: { project: ProjectData, isReady: boolean, isPaused: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.1 })

    if (isPaused) {
        return (
            <div ref={containerRef} className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-2 p-2 text-center">
                    <Box className="w-8 h-8 text-primary/40" />
                    <p className="text-[11px] text-muted-foreground font-medium">3D Model Active in Modal</p>
                </div>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="w-full h-full bg-[#1a1a1a] relative group">
            {!isReady || !isInView ? (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="flex flex-col items-center gap-2 sm:gap-3 p-2 text-center">
                        <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary opacity-20" />
                        <p className="text-[11px] sm:text-xs text-muted-foreground font-medium opacity-50">
                            {!isInView ? "Scroll to View 3D" : "Initializing 3D..."}
                        </p>
                    </div>
                </div>
            ) : (
                <ModelErrorBoundary key={project.id}>
                    <Suspense fallback={
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <div className="flex flex-col items-center gap-2 sm:gap-3 p-2 text-center">
                                <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary" />
                                <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">Loading Model...</p>
                            </div>
                        </div>
                    }>
                        <Canvas shadows dpr={[1, 1.5]} camera={{ fov: 45, position: [4, 3, 4] }}>
                            <color attach="background" args={['#1a1a1a']} />
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                            <pointLight position={[-10, -10, -10]} intensity={0.5} />
                            <Model path={project.path} />
                            <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} minDistance={2} maxDistance={10} enableZoom={true} />
                        </Canvas>
                    </Suspense>
                </ModelErrorBoundary>
            )}
        </div>
    )
}

export function ThreeDDesigner() {
    const [isReady, setIsReady] = useState(false)
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
    const [visibleCount, setVisibleCount] = useState(6)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const step = isDesktop ? 3 : 2
    const visibleProjects = threeDProjects.slice(0, visibleCount)
    const hiddenCount = threeDProjects.length - visibleCount

    return (
        <>
            <div className="w-full space-y-12 md:space-y-20 mt-1 pb-32">

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {visibleProjects.map((project, index) => {
                        const projectNumber = String(index + 1).padStart(2, '0')

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedProject(project)}
                                className="group relative flex flex-col gap-3 sm:gap-5 p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 h-full cursor-pointer"
                            >
                                {/* Header Section (Matching Dev / Automation Card) */}
                                <div className="flex justify-between items-start gap-2 sm:gap-4">
                                    <div className="text-2xl sm:text-4xl md:text-5xl font-bold font-mono text-white/90 flex-shrink-0">
                                        {projectNumber}
                                    </div>
                                    <div
                                        className="flex flex-col items-end text-right min-w-0 flex-1 overflow-hidden"
                                        style={{ containerType: "inline-size" }}
                                    >
                                        <h3 className="font-bold leading-tight whitespace-nowrap text-[clamp(0.75rem,7cqw,1.4rem)] text-white w-full truncate">
                                            {project.title}
                                        </h3>
                                        <p className="text-primary/90 text-[10px] sm:text-xs font-semibold whitespace-nowrap truncate">{project.subtitle}</p>
                                        
                                        {/* Tools & Format */}
                                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                                            <span className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-[9px] sm:text-[10px] font-mono text-white/70">
                                                .GLB
                                            </span>
                                            {project.tools.map((tool) => (
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

                                {/* Preview Box (Non-draggable with Explore hover button) */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black/20 mt-auto">
                                    <div className="absolute inset-0 pointer-events-none">
                                        <LazyModel project={project} isReady={isReady} isPaused={!!selectedProject} />
                                    </div>

                                    {/* Hover Overlay with Explore Button */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 sm:p-4 text-center z-10">
                                        <button className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-xl bg-primary text-white hover:bg-primary/90">
                                            <span>Explore</span>
                                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Show More / Show Less */}
                {hiddenCount > 0 && (
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={() => setVisibleCount((prev) => prev + step)}
                            className="group flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                        >
                            <span className="text-sm font-medium">Show {Math.min(hiddenCount, step)} More ({hiddenCount} remaining)</span>
                            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                )}
                {visibleCount > 6 && (
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={() => setVisibleCount(6)}
                            className="group flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                        >
                            <span className="text-sm font-medium">Show Less</span>
                            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                )}
            </div>

            {/* 3D Detail Modal */}
            {selectedProject && (
                <ThreeDModal
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                    project={{
                        ...selectedProject,
                        number: String(threeDProjects.findIndex(p => p.id === selectedProject.id) + 1).padStart(2, '0')
                    }}
                />
            )}
        </>
    )
}
