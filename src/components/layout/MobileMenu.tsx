"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
]

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    // Scroll Handler
    const handleScroll = (href: string) => {
        setIsOpen(false)
        const element = document.getElementById(href.substring(1))
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 50,
                behavior: "smooth"
            })
        }
    }

    // Animation Variants
    const menuVars: Variants = {
        initial: {
            scaleY: 0,
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0] as const,
            },
        },
        exit: {
            scaleY: 0,
            transition: {
                delay: 0.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    }

    const containerVars: Variants = {
        initial: {
            transition: {
                staggerChildren: 0.09,
                staggerDirection: -1,
            },
        },
        open: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.09,
                staggerDirection: 1,
            },
        },
    }

    const mobileLinkVars: Variants = {
        initial: {
            y: "30vh",
            transition: {
                duration: 0.5,
                ease: [0.37, 0, 0.63, 1] as const,
            },
        },
        open: {
            y: 0,
            transition: {
                ease: [0, 0.55, 0.45, 1] as const,
                duration: 0.7,
            },
        },
    }

    return (
        <div className="md:hidden">
            {/* Toggle Button */}
            <Button
                variant="ghost"
                onClick={() => setIsOpen(true)}
                className="relative z-50 text-foreground hover:bg-transparent h-10 w-10 p-0"
            >
                <Menu className="w-6 h-6" />
            </Button>

            {/* Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVars}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed left-0 top-0 w-full h-screen origin-top bg-background/95 backdrop-blur-xl z-[100] p-8 flex flex-col justify-center items-center"
                    >
                        {/* Close Button */}
                        <div className="absolute top-6 right-6">
                            <Button
                                variant="ghost"
                                onClick={() => setIsOpen(false)}
                                className="text-foreground hover:bg-transparent h-10 w-10 p-0"
                            >
                                <X className="w-8 h-8" />
                            </Button>
                        </div>

                        {/* Staggered Links */}
                        <motion.div
                            variants={containerVars}
                            initial="initial"
                            animate="open"
                            exit="initial"
                            className="flex flex-col gap-6 text-center font-bold text-3xl md:text-4xl text-white"
                        >
                            {navItems.map((item) => (
                                <div key={item.name} className="overflow-hidden">
                                    <motion.div variants={mobileLinkVars}>
                                        <button
                                            onClick={() => handleScroll(item.href)}
                                            className="hover:text-primary transition-colors flex items-center gap-4 group"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {item.name}
                                            <span className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
