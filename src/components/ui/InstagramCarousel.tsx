"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useMotionValue, animate } from "framer-motion"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const images = [
    "/images/Projects/GraphicDesign/images/COD Team Banner2.jpg",
    "/images/Projects/GraphicDesign/images/Acquintance Announcment copy.jpg",
    "/images/Projects/GraphicDesign/images/Band Poster.jpg",
    "/images/Projects/GraphicDesign/images/Blitz.jpg",
    "/images/Projects/GraphicDesign/images/Christmas 2025 copy.jpg",
    "/images/Projects/GraphicDesign/images/DEE Intramurals Official Shirt.jpg",
    "/images/Projects/GraphicDesign/images/DEE Mutya 2024.jpg",
    "/images/Projects/GraphicDesign/images/Ethereal.jpg",
    "/images/Projects/GraphicDesign/images/Light.jpg",
    "/images/Projects/GraphicDesign/images/Outgoing DSG 2024-2025.jpg",
    "/images/Projects/GraphicDesign/images/Reshlie.jpg",
    "/images/Projects/GraphicDesign/images/Space Oddity.jpg",
    "/images/Projects/GraphicDesign/images/Teachers d copy.jpg",
    "/images/Projects/GraphicDesign/images/Try New Things.jpg",
    "/images/Projects/GraphicDesign/images/Wave.jpg",
    "/images/Projects/GraphicDesign/images/Yellow and Orange Illustrated Special Promo Burger Poster  (1).png",
    "/images/Projects/GraphicDesign/images/1)Code&Craft Services3D Services.jpg"
]

export function InstagramCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)

    // Calculate drag constraints and snap points
    // Basic implementation: One image per view

    const handleDragEnd = (event: any, info: any) => {
        const threshold = 50
        const offset = info.offset.x
        const velocity = info.velocity.x

        if (offset < -threshold || velocity < -500) {
            // Next
            if (currentIndex < images.length - 1) {
                setCurrentIndex(currentIndex + 1)
            }
        } else if (offset > threshold || velocity > 500) {
            // Prev
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1)
            }
        }
    }

    // Animate to the current index
    useEffect(() => {
        if (containerRef.current) {
            // Assuming full width slider
            // We'll standardise the width of the display area
            // BUT, for a "carousel" feel, we might want to just animate the x value
            // Let's use a simpler approach: Just sliding the track
            // Since we can't easily get the width in pixels without measuring, 
            // we'll assume the container is roughly 100% width
            // Actually, let's look at the reference image.
            // It's a pile of images or a strip? 
            // "drag the images from left to right, then of course it can snap"
            // Let's stick to a standard carousel inside the phone frame.
        }
    }, [currentIndex])

    return (
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-20 w-full max-w-6xl mx-auto p-4">

            {/* Phone Frame */}
            <div className="relative w-full max-w-[380px] aspect-[9/19] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col shrink-0">

                {/* Status Bar (Mock) */}
                <div className="h-7 w-full flex justify-between items-center px-6 pt-2">
                    <span className="text-[10px] font-semibold text-white">9:41</span>
                    <div className="flex gap-1.5 item-center">
                        <div className="w-4 h-2.5 bg-white rounded-[2px]" /> {/* Battery */}
                    </div>
                </div>

                {/* App Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black z-10">
                    <div className="flex items-center gap-2">
                        {/* Logo/Avatar */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-2 border-black">
                                <Image src="/images/Projects/GraphicDesign/SDLogo2.jpg" alt="SD" width={32} height={32} className="object-cover" />
                            </div>
                        </div>
                        <span className="text-white font-semibold text-sm">Stun Design</span>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-white" />
                </div>

                {/* Main Content (Carousel) */}
                <div className="flex-1 relative bg-black flex items-center overflow-hidden">
                    <motion.div
                        className="flex h-full w-full"
                        animate={{ x: `-${currentIndex * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                    >
                        {images.map((src, index) => (
                            <div key={index} className="min-w-full h-full relative flex items-center justify-center bg-zinc-900">
                                <div className="relative w-full aspect-[4/5]">
                                    <Image
                                        src={src}
                                        alt={`Design ${index + 1}`}
                                        fill
                                        className="object-contain"
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Navigation Overlays (Invisible, enabling tap to nav as well) */}
                    <div className="absolute inset-y-0 left-0 w-1/4 z-10" onClick={() => currentIndex > 0 && setCurrentIndex(curr => curr - 1)} />
                    <div className="absolute inset-y-0 right-0 w-1/4 z-10" onClick={() => currentIndex < images.length - 1 && setCurrentIndex(curr => curr + 1)} />

                    {/* Counter Indicator (Top Right optional) */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-xs font-medium text-white/90">
                        {currentIndex + 1}/{images.length}
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="px-4 py-3 space-y-3 bg-black">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <Heart className="w-6 h-6 text-white hover:text-red-500 transition-colors cursor-pointer" />
                            <MessageCircle className="w-6 h-6 text-white hover:text-primary transition-colors cursor-pointer" />
                            <Send className="w-6 h-6 text-white hover:text-primary transition-colors cursor-pointer" />
                        </div>
                        <Bookmark className="w-6 h-6 text-white hover:text-primary transition-colors cursor-pointer" />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">1,000 likes</p>
                        <p className="text-sm text-white">
                            <span className="font-semibold mr-2">Stunley Opeña</span>
                            Showcasing a collection of some of my graphic design works, from event posters to branding materials. Swipe to see more! 🦊✨
                        </p>
                        <p className="text-xs text-white/50 uppercase">View all 50 comments</p>
                        <p className="text-[10px] text-white/40 uppercase">2 DAYS AGO</p>
                    </div>
                </div>

                {/* Bottom Nav Mock */}
                <div className="h-12 border-t border-white/10 flex justify-around items-center px-2">
                    {/* Just simple icons */}
                    <div className="w-6 h-6 rounded-full bg-white/10" />
                    <div className="w-6 h-6 rounded-full bg-white/10" />
                    <div className="w-6 h-6 rounded-full bg-white/10" />
                    <div className="w-6 h-6 rounded-full bg-white/20 ring-1 ring-white" /> {/* Profile active */}
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white rounded-full opacity-50" />
            </div>

            {/* Right Side Text */}
            <div className="flex flex-col gap-6 text-center lg:text-left max-w-md">
                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        Social Media <span className="text-primary">Post Design</span>
                    </h2>
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[80px] rounded-full opacity-60 pointer-events-none" />
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                    Creating engaging visuals for social platforms, from personal posters and promotional banners to event posters and daily content that capture attention and drive engagement.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-2xl glass-panel border border-white/5 bg-white/5">
                        <p className="text-3xl font-bold text-white mb-1">200+</p>
                        <p className="text-sm text-muted-foreground font-medium">Designs Created</p>
                    </div>
                    <div className="p-4 rounded-2xl glass-panel border border-white/5 bg-white/5">
                        <p className="text-3xl font-bold text-white mb-1">100%</p>
                        <p className="text-sm text-muted-foreground font-medium">Engagement</p>
                    </div>
                </div>

                {/* Navigation hint */}
                <div className="flex items-center gap-2 justify-center lg:justify-start pt-4 text-primary font-medium animate-pulse">
                    <span className="text-sm">Swipe or Tap to Navigate</span>
                </div>
            </div>
        </div>
    )
}
