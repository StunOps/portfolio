"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/Container"
import { FoxIllustration } from "@/components/ui/FoxIllustration"
import { TechStack } from "@/components/sections/TechStack"
import { ChevronRight, ChevronLeft } from "lucide-react"

const stats = [
    { label: "YEARS EXPERIENCE", value: "5+" },
    { label: "DESIGNS DONE", value: "1,000+" },
    { label: "PERSONAL CLIENTS", value: "50+" },
]

const slides = [
    {
        title: "About Me",
        subtitle: "Investing time in digital projects that create real impact.",
        content: [
            "I am Stun, a passionate designer who combines creativity and strategy to build meaningful visual identities. My digital journey began in 2020, a time when many of us were reflecting on what path was best for ourselves.",
            "I am currently pursuing a Bachelor’s degree in Computer Engineering at the University of Mindanao, where I continue to develop both my technical skills and creative thinking through academic and hands-on projects.",
            "With a background in both engineering and design, I believe effective branding goes beyond visuals. It builds trust, communicates values, and creates impact across different platforms. I enjoy turning ideas into clear, functional designs that solve real problems."
        ]
    },
    {
        title: "A Fox",
        subtitle: "This is my brand identity.",
        content: [
            "I am productive at night and efficient in the morning. My work rhythm reflects focus during quiet hours and clarity during execution, allowing me to move from ideas to output with intention. This balance shapes how I approach digital design, a calm, controlled, and purpose-driven rather than rushed or reactive.",
            "I can switch tools fast, adjust concepts when something doesn’t work, and refine instead of restarting. This adaptability is a core fox trait and a key part of how I design, a flexible with process, precise with results, and always moving forward without unnecessary resets."
        ]
    }
]

export function About() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (

        <section
            id="about"
            className="relative py-0 md:py-0.5 overflow-hidden"
        >

            <Container>
                <div className="relative">
                    {/* Glassmorphism Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.8 }}
                        className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/10 relative z-10 transition-all duration-500"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* Left Side: Fox Illustration */}
                            <motion.div
                                className="relative flex justify-center lg:justify-start"
                            >
                                <FoxIllustration />
                            </motion.div>

                            {/* Right Side: Content */}
                            <div
                                className="flex flex-col gap-6 relative min-h-[550px]"
                            >
                                {/* Static Header & Navigation */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <AnimatePresence mode="wait">
                                            <motion.h2
                                                key={`title-${currentSlide}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-3xl md:text-4xl font-bold"
                                            >
                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                                    {slides[currentSlide].title.split(" ").slice(0, -1).join(" ")}
                                                </span>
                                                {" "}
                                                <span className="text-primary">
                                                    {slides[currentSlide].title.split(" ").slice(-1)}
                                                </span>
                                            </motion.h2>
                                        </AnimatePresence>

                                        {/* Navigation Arrow - Static */}
                                        <button
                                            onClick={currentSlide === 0 ? nextSlide : prevSlide}
                                            className="p-2 rounded-full bg-primary/20 hover:bg-primary text-primary hover:text-white transition-all duration-300"
                                            aria-label={currentSlide === 0 ? "Next slide" : "Previous slide"}
                                        >
                                            {currentSlide === 0 ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={`subtitle-${currentSlide}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-primary italic text-lg font-medium"
                                        >
                                            {slides[currentSlide].subtitle}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                                {/* Animated Content Body */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`content-${currentSlide}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base"
                                    >
                                        {slides[currentSlide].content.map((paragraph, idx) => (
                                            <p key={idx}>{paragraph}</p>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-2 md:gap-6 pt-8 border-t border-white/10 mt-auto">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="flex flex-col gap-1">
                                            <span className="text-2xl md:text-4xl font-bold text-primary tracking-tight">
                                                {stat.value}
                                            </span>
                                            <span className="text-[10px] md:text-sm font-semibold text-muted-foreground uppercase tracking-widest break-words">
                                                {stat.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tech Stack Section */}
                <TechStack />
            </Container>
        </section >
    )
}
