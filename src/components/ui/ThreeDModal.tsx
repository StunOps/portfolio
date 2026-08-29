"use client"

import { useState, useEffect, useCallback, Component, Suspense, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Canvas } from "@react-three/fiber"
import { Center, OrbitControls, useGLTF, Resize } from "@react-three/drei"
import { X, Maximize2, Loader, Images, Layers, ChevronDown, Box } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ThreeDProject {
    id: string
    number: string
    title: string
    subtitle: string
    category: string
    description: string
    path: string
    tools: { name: string; icon: string }[]
    gallery?: { name: string; images: { name: string; path: string }[] }[]
}

interface ThreeDModalProps {
    isOpen: boolean
    onClose: () => void
    project: ThreeDProject
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
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-[#141414] p-6 text-center">
                    <Box className="w-10 h-10 text-primary/40 mb-2 animate-pulse" />
                    <p className="text-sm text-muted-foreground font-medium">
                        3D Preview temporarily unavailable on this device.
                    </p>
                </div>
            )
        }
        return this.props.children
    }
}

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

function InteractiveModelCanvas({ path }: { path: string }) {
    return (
        <ModelErrorBoundary>
            <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="flex flex-col items-center gap-3 p-4 text-center">
                        <Loader className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-xs text-muted-foreground font-medium">Loading 3D Model...</p>
                    </div>
                </div>
            }>
                <Canvas shadows dpr={[1, 1.5]} camera={{ fov: 45, position: [4, 3, 4] }}>
                    <color attach="background" args={['#141414']} />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    <Model path={path} />
                    <OrbitControls makeDefault autoRotate autoRotateSpeed={0.6} minDistance={1.8} maxDistance={10} enableZoom={true} />
                </Canvas>
            </Suspense>
        </ModelErrorBoundary>
    )
}

export function ThreeDModal({ isOpen, onClose, project }: ThreeDModalProps) {
    const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null)
    const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
            setIsMobileGalleryOpen(false)
            setSelectedLightboxImage(null)
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            if (selectedLightboxImage) {
                setSelectedLightboxImage(null)
            } else if (isOpen) {
                onClose()
            }
        }
    }, [isOpen, onClose, selectedLightboxImage])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    if (!isOpen || !project) return null

    const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery[0].images : []

    const renderGalleryContent = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/90 font-semibold text-xs sm:text-sm">
                    <Images className="w-4 h-4 text-primary" />
                    <span>Render Gallery ({galleryImages.length})</span>
                </div>
            </div>

            {galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {galleryImages.map((img) => (
                        <div
                            key={img.path}
                            onClick={() => setSelectedLightboxImage(img.path)}
                            className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer hover:border-primary/50 hover:scale-[1.02] transition-all duration-300"
                        >
                            <Image
                                src={img.path}
                                alt={img.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                                <Maximize2 className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center border border-white/10 rounded-xl bg-white/5 text-muted-foreground gap-2">
                    <Layers className="w-8 h-8 opacity-30" />
                    <p className="text-xs">No additional render images available.</p>
                </div>
            )}
        </div>
    )

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-7xl h-[92vh] max-h-[900px] bg-[#121212] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-50 p-2 sm:p-2.5 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Mobile Docked Gallery Accordion (visible only on < md) */}
                    <div className="md:hidden w-full border-b border-white/10 bg-black/40 shrink-0">
                        <button
                            onClick={() => setIsMobileGalleryOpen(prev => !prev)}
                            className="w-full flex items-center justify-between p-3 text-xs font-semibold text-white/90"
                        >
                            <div className="flex items-center gap-2">
                                <Images className="w-4 h-4 text-primary" />
                                <span>Content Panels ({galleryImages.length} Renders)</span>
                            </div>
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isMobileGalleryOpen && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                            {isMobileGalleryOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden p-3 pt-0"
                                >
                                    {renderGalleryContent()}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop Side Content Panel (Render Gallery) */}
                    <div className="hidden md:flex w-80 lg:w-96 border-r border-white/10 bg-black/30 flex-col shrink-0 overflow-y-auto custom-scrollbar p-6">
                        {renderGalleryContent()}
                    </div>

                    {/* Main Area: Title, Description, and Interactive 3D Model */}
                    <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto custom-scrollbar gap-4 md:gap-6 min-w-0">
                        {/* Header Info */}
                        <div className="space-y-1.5 pr-10">
                            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest">
                                <span>{project.number}</span>
                                <span>•</span>
                                <span>{project.category}</span>
                            </div>
                            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white break-words [overflow-wrap:anywhere]">
                                {project.title}
                            </h2>
                            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed break-words [overflow-wrap:anywhere]">
                                {project.description}
                            </p>
                        </div>

                        {/* Interactive 3D Canvas Box */}
                        <div className="flex-1 w-full min-h-[280px] sm:min-h-[380px] md:min-h-[440px] bg-black/50 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden relative">
                            <InteractiveModelCanvas path={project.path} />
                            
                            {/* Overlay Interaction Hint */}
                            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 pointer-events-none px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] sm:text-xs text-white/70 font-mono">
                                ✋ Drag to rotate • Scroll to zoom
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Lightbox for Gallery Images */}
                <AnimatePresence>
                    {selectedLightboxImage && (
                        <div
                            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                            onClick={() => setSelectedLightboxImage(null)}
                        >
                            <button
                                className="absolute top-5 right-5 text-white/70 hover:text-white p-2 rounded-full bg-black/50 border border-white/10"
                                onClick={() => setSelectedLightboxImage(null)}
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="relative w-full max-w-5xl h-[85vh]">
                                <Image
                                    src={selectedLightboxImage}
                                    alt="Render Preview"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </AnimatePresence>
    )
}
