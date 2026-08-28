"use client"

import React, { Component, Suspense, useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Center, OrbitControls, useGLTF, Resize } from "@react-three/drei"
import { Loader, Images, Maximize2, ChevronDown, ChevronUp } from "lucide-react"
import { ProjectModal } from "@/components/ui/ProjectModal"

// Define the structure for the modal
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
            <Resize scale={4}>
                <primitive object={scene} />
            </Resize>
        </Center>
    )
}

function LazyModel({ project, isReady }: { project: ProjectData, isReady: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.1 })

    return (
        <div ref={containerRef} className="mx-auto w-[92%] md:w-full h-[400px] md:h-[600px] bg-black/20 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 overflow-hidden relative group">
            {!isReady || !isInView ? (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="flex flex-col items-center gap-3">
                        <Loader className="w-10 h-10 animate-spin text-primary opacity-20" />
                        <p className="text-sm text-muted-foreground font-medium opacity-50">
                            {!isInView ? "Scroll to View 3D" : "Initializing 3D Engine..."}
                        </p>
                    </div>
                </div>
            ) : (
                <ModelErrorBoundary>
                    <Suspense fallback={
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <div className="flex flex-col items-center gap-3">
                                <Loader className="w-10 h-10 animate-spin text-primary" />
                                <p className="text-sm text-muted-foreground font-medium">Loading Model...</p>
                            </div>
                        </div>
                    }>
                        <Canvas shadows dpr={[1, 1.5]} camera={{ fov: 45, position: [4, 4, 4] }}>
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

            {/* Overlay Badges */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 pointer-events-none">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-xs text-white/70 font-mono text-center">
                    .GLB
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10" title="Designed in Fusion 360">
                    <Image
                        src="/images/Projects/3D%20Design/Agri-Scan/Fusion.png"
                        alt="Fusion 360"
                        width={24}
                        height={24}
                        className="object-contain opacity-90"
                    />
                    <span className="text-xs text-white/70 font-mono">Fusion 360</span>
                </div>
            </div>
        </div>
    )
}

export function ThreeDDesigner() {
    const [isReady, setIsReady] = useState(false)
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
    const [visibleCount, setVisibleCount] = useState(3)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const visibleProjects = threeDProjects.slice(0, visibleCount)
    const hiddenCount = threeDProjects.length - visibleCount

    return (
        <>
            <div className="w-full space-y-20 mt-1 pb-32">
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-primary font-medium animate-pulse">
                        <span className="text-sm">Drag to rotate, scroll to zoom</span>
                    </div>
                </div>

                <div className="flex flex-col gap-24">
                    {visibleProjects.map((project, index) => (
                        <div key={project.id} className="flex flex-col gap-6">
                            {/* Title Row */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4">
                                <div>
                                    <h3 className="text-3xl font-bold text-white max-w-lg">{project.title}</h3>
                                    <p className="text-primary text-sm font-medium uppercase tracking-widest mt-1">
                                        {String(index + 1).padStart(2, '0')} — {project.category}
                                    </p>
                                </div>
                                <p className="text-muted-foreground text-sm md:max-w-xs md:text-right">
                                    {project.description}
                                </p>
                            </div>

                            <LazyModel project={project} isReady={isReady} />

                            {/* Gallery Button */}
                            {project.gallery && project.gallery.length > 0 && project.gallery[0].images.length > 0 && (
                                <button
                                    onClick={() => setSelectedProject(project)}
                                    className="w-fit mx-auto px-8 py-3 bg-primary text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 group"
                                >
                                    <Images className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span>View Render Gallery</span>
                                </button>
                            )}

                        </div>
                    ))}
                </div>

                {/* Show More / Show Less */}
                {hiddenCount > 0 && (
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={() => setVisibleCount(threeDProjects.length)}
                            className="group flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                        >
                            <span className="text-sm font-medium">Show More ({hiddenCount} more)</span>
                            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                )}
                {visibleCount > 3 && (
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={() => setVisibleCount(3)}
                            className="group flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                        >
                            <span className="text-sm font-medium">Show Less</span>
                            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                )}
            </div>

            {/* Gallery Modal */}
            {selectedProject && (
                <ProjectModal
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                    project={selectedProject}
                />
            )}
        </>
    )
}
