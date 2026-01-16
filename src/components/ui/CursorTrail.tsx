"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorTrail() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        window.addEventListener("mousemove", moveCursor)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
        }
    }, [cursorX, cursorY])

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            {/* Core of the flame */}
            <div className="absolute inset-0 rounded-full bg-orange-0 blur-sm" />

            {/* Outer glow/halo - The 'Fox Fire' */}
            <div className="absolute -inset-4 rounded-full bg-orange-600/40 blur-xl" />

            {/* Inner intense white/yellow center for hot fire look */}
            <div className="absolute inset-2 rounded-full bg-yellow-200 blur-[2px]" />
        </motion.div>
    )
}
