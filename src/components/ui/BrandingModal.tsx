"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink } from "lucide-react"

interface BrandingModalProps {
    project: {
        name: string;
        brandingImage: string;
        description: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

export function BrandingModal({ project, isOpen, onClose }: BrandingModalProps) {
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

    if (!isOpen || !project) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl h-[90vh] bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md z-10 shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Scrollable Image Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-950 relative">
                            <div className="relative w-full min-h-full">
                                {/* We use basic img tag or Next Image with raw width to allow natural height scaling */}
                                {/* Since height is variable and massive (16000px+), using width={1400} and height={auto} via style is best */}
                                <Image
                                    src={project.brandingImage}
                                    alt={`${project.name} Branding`}
                                    width={1400}
                                    height={0} // arbitrary, relying on 'h-auto'
                                    className="w-full h-auto object-cover"
                                    style={{ width: '100%', height: 'auto' }}
                                    draggable={false}
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
