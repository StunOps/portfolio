"use client"

import { motion } from "framer-motion"

export function FoxIllustration() {
    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-orange-500/20 blur-[90px] rounded-full transform scale-75 animate-pulse-slow" />

            <svg
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full max-w-[400px] relative z-10 drop-shadow-2xl"
            >
                <g transform="translate(50, 50) scale(0.8)">

                    {/* LEFT EAR GROUP */}
                    <motion.g initial={{ y: 0 }} animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                        {/* Outer Ear (Darker Orange) */}
                        <path d="M100 50 L 160 150 L 80 200 Z" fill="#EA580C" /> {/* Dark Orange */}
                        {/* Inner Ear (Lighter Orange) */}
                        <path d="M100 50 L 130 140 L 160 150 Z" fill="#FB923C" /> {/* Light Orange Facet */}
                        <path d="M80 200 L 130 140 L 100 50 Z" fill="#F97316" /> {/* Mid Orange Facet */}
                    </motion.g>

                    {/* RIGHT EAR GROUP */}
                    <motion.g initial={{ y: 0 }} animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                        {/* Outer Ear */}
                        <path d="M400 50 L 340 150 L 420 200 Z" fill="#EA580C" />
                        {/* Inner Ear */}
                        <path d="M400 50 L 370 140 L 340 150 Z" fill="#FB923C" />
                        <path d="M420 200 L 370 140 L 400 50 Z" fill="#F97316" />
                    </motion.g>


                    {/* FACE MAIN GROUP */}
                    <motion.g
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Forehead / Top Head (Main Orange Facet) */}
                        <path d="M160 150 L 340 150 L 250 250 Z" fill="#F97316" />
                        <path d="M160 150 L 250 250 L 130 220 Z" fill="#FB923C" /> {/* Left Temple Light */}
                        <path d="M340 150 L 250 250 L 370 220 Z" fill="#C2410C" /> {/* Right Temple Shadow */}

                        {/* Snout / Bridge of Nose (Central Triangle) */}
                        <path d="M250 250 L 220 380 L 280 380 Z" fill="#FB923C" />

                        {/* Side Cheeks (Left) */}
                        <path d="M130 220 L 250 250 L 220 380 L 150 280 Z" fill="#F97316" />
                        <path d="M130 220 L 150 280 L 80 200 Z" fill="#EA580C" />  {/* Cheek Shadow */}

                        {/* Side Cheeks (Right) */}
                        <path d="M370 220 L 250 250 L 280 380 L 350 280 Z" fill="#EA580C" /> {/* Darker right side for 3D effect */}
                        <path d="M370 220 L 350 280 L 420 200 Z" fill="#C2410C" />

                        {/* Lower Snout Tip (White part connection) */}
                        <path d="M220 380 L 250 450 L 280 380 Z" fill="#FFEDD5" opacity="0.9" /> {/* Cream Tip */}
                    </motion.g>

                    {/* EYES (Almond Shaped) */}
                    <motion.g
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        {/* Left Eye */}
                        <path d="M160 300 Q 190 290 210 320 Q 180 340 160 300 Z" fill="#18181B" />
                        {/* Right Eye */}
                        <path d="M340 300 Q 310 290 290 320 Q 320 340 340 300 Z" fill="#18181B" />
                    </motion.g>

                    {/* NOSE (Triangle) */}
                    <path d="M235 450 L 265 450 L 250 480 Z" fill="#18181B" />

                </g>
            </svg>
        </div>
    )
}
