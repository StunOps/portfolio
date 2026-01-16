"use client"

import { motion } from "framer-motion"

interface GeometricBackgroundProps {
    opacity?: number
}

export function GeometricBackground({ opacity = 0.1 }: GeometricBackgroundProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
            {/* Large Hexagon */}
            <motion.div
                className="absolute top-1/4 left-10 w-96 h-96 border border-primary/20"
                style={{ opacity }}
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Floating Square */}
            <motion.div
                className="absolute bottom-1/4 right-20 w-64 h-64 border border-orange-500/10 rotate-45"
                style={{ opacity }}
                animate={{
                    rotate: [45, 225],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Small Circle */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-48 h-48 border border-white/5 rounded-full"
                style={{ opacity }}
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Extra Triangle-ish shape */}
            <motion.div
                className="absolute top-20 right-1/3 w-32 h-32 border border-primary/10"
                style={{ opacity }}
                animate={{
                    rotate: [0, -180],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    )
}
