"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function ProfileFlame() {
    const [isBursting, setIsBursting] = useState(false)

    const triggerBurst = () => {
        if (isBursting) return
        setIsBursting(true)
        setTimeout(() => setIsBursting(false), 2000)
    }

    // Generate random fire particles
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: Math.random() * 360,
        distance: 120 + Math.random() * 100, // How far they fly
        size: 10 + Math.random() * 20,       // Random sizing
        delay: Math.random() * 0.1,          // Slight stagger
        duration: 0.8 + Math.random() * 0.6  // Random lifespan
    }))

    return (
        <div
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer group select-none"
            onClick={triggerBurst}
        >
            {/* Existing Pulse Effect - Fades out during burst */}
            <div className={`absolute inset-0 rounded-full border-2 border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.3)] animate-pulse-slow ${isBursting ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />

            {/* The Image Container */}
            <div className="absolute inset-4 rounded-full overflow-hidden z-10 bg-background/50">
                <Image
                    src="/images/Home/Me3.jpg"
                    alt="Stunley Opeña"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority
                />
            </div>

            {/* Fire Burst Particles */}
            <AnimatePresence>
                {isBursting && particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 0.5
                        }}
                        animate={{
                            x: Math.cos(p.angle * Math.PI / 180) * p.distance,
                            y: Math.sin(p.angle * Math.PI / 180) * p.distance,
                            opacity: 0,
                            scale: 0
                        }}
                        transition={{
                            duration: p.duration,
                            ease: "easeOut",
                            delay: p.delay
                        }}
                        className="absolute left-1/2 top-1/2 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 blur-md z-20 pointer-events-none mix-blend-screen"
                        style={{
                            width: p.size,
                            height: p.size,
                            marginLeft: -p.size / 2,
                            marginTop: -p.size / 2,
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Central Shockwave/Flash */}
            <AnimatePresence>
                {isBursting && (
                    <>
                        <motion.div
                            initial={{ opacity: 0.8, scale: 0.8 }}
                            animate={{ opacity: 0, scale: 1.4 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 rounded-full bg-orange-500 blur-2xl z-20 pointer-events-none mix-blend-screen"
                        />
                        <motion.div
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ opacity: 0, scale: 2 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute inset-4 rounded-full border-4 border-orange-400 z-20 pointer-events-none blur-sm"
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
