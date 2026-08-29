"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { buttonVariants } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { MobileMenu } from "./MobileMenu"

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" }, // Placeholder ID
    { name: "Contact", href: "#contact" },     // Placeholder ID
]

export function Navbar() {
    const [activeSection, setActiveSection] = useState("home")
    const [activeProjectCategory, setActiveProjectCategory] = useState("")
    const [isVisible, setIsVisible] = useState(true)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const prevScrollY = lastScrollY.current

            // Determine Navbar visibility: show when scrolling UP or near top (< 50px), hide when scrolling DOWN
            if (currentScrollY < 50) {
                setIsVisible(true)
            } else if (currentScrollY > prevScrollY && currentScrollY - prevScrollY > 5) {
                setIsVisible(false)
            } else if (currentScrollY < prevScrollY && prevScrollY - currentScrollY > 5) {
                setIsVisible(true)
            }

            lastScrollY.current = currentScrollY

            const sections = ["home", "about", "projects", "education", "contact"]
            let current = ""

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= window.innerHeight * 0.7 && rect.bottom >= 100) {
                        current = section
                    }
                }
            }

            if (current) {
                setActiveSection(current)
            }
        }

        const handleHashChange = () => {
            setActiveProjectCategory(window.location.hash)
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("hashchange", handleHashChange)

        // Trigger once on mount
        handleScroll()
        handleHashChange()

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("hashchange", handleHashChange)
        }
    }, [])

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const targetId = href.substring(1)

        if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" })
            setActiveSection("home")
            return
        }

        const element = document.getElementById(targetId)
        if (element) {
            const navbarOffset = 70
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: elementPosition - navbarOffset,
                behavior: "smooth"
            })
            setActiveSection(targetId)
        }
    }

    const handleProjectCategoryClick = (e: React.MouseEvent, hash: string) => {
        e.preventDefault()

        // 1. Update URL without reload
        window.history.pushState(null, "", hash)

        // 2. Trigger hashchange event manually so Projects.tsx detects it
        window.dispatchEvent(new Event("hashchange"))

        // 3. Scroll to Projects section
        const element = document.getElementById("projects")
        if (element) {
            const navbarOffset = 70
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: elementPosition - navbarOffset,
                behavior: "smooth"
            })
        }
    }

    return (
        <header className={cn(
            "fixed top-0 inset-x-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40 transition-transform duration-300 ease-in-out",
            isVisible ? "translate-y-0" : "-translate-y-full"
        )}>
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="#home"
                        onClick={(e) => scrollToSection(e, "#home")}
                        className="font-bold text-xl tracking-tighter text-primary flex items-center gap-2"
                    >
                        <div className="relative w-10 h-10 md:w-8 md:h-8">
                            <Image
                                src="/images/Home/SD Logo2.png"
                                alt="SD Logo2"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="inline-block bg-gradient-to-l from-white to-orange-400 bg-clip-text text-transparent">Stun Design</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1 font-medium">
                        {/* 1. Home & About */}
                        {navItems.slice(0, 2).map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={cn(
                                    "relative px-4 py-2 text-sm transition-colors hover:text-primary",
                                    activeSection === item.href.substring(1)
                                        ? "text-primary font-bold"
                                        : "text-foreground/80"
                                )}
                            >
                                {item.name}
                                {activeSection === item.href.substring(1) && (
                                    <motion.div
                                        layoutId="active-nav-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </a>
                        ))}

                        {/* 2. Projects Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn("flex items-center gap-1 p-0 pr-2 text-sm font-medium transition-colors hover:text-primary text-foreground/80 outline-none", activeSection === "projects" && "text-primary font-bold")}>
                                <span className="relative px-4 py-2">
                                    Projects
                                    {activeSection === "projects" && (
                                        <motion.div
                                            layoutId="active-nav-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </span>
                                <ChevronDown className="w-4 h-4 opacity-50" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass-panel border-primary/20">
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="#ui-ux"
                                        onClick={(e) => handleProjectCategoryClick(e, "#ui-ux")}
                                        className={cn("cursor-pointer hover:text-primary focus:text-primary", activeProjectCategory === "#ui-ux" && "text-primary font-bold")}
                                    >
                                        UI/UX Designer
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="#graphic-artist"
                                        onClick={(e) => handleProjectCategoryClick(e, "#graphic-artist")}
                                        className={cn("cursor-pointer hover:text-primary focus:text-primary", activeProjectCategory === "#graphic-artist" && "text-primary font-bold")}
                                    >
                                        Graphic Designer
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="#social-media"
                                        onClick={(e) => handleProjectCategoryClick(e, "#social-media")}
                                        className={cn("cursor-pointer hover:text-primary focus:text-primary", activeProjectCategory === "#social-media" && "text-primary font-bold")}
                                    >
                                        Social Media Manager
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="#automation"
                                        onClick={(e) => handleProjectCategoryClick(e, "#automation")}
                                        className={cn("cursor-pointer hover:text-primary focus:text-primary", activeProjectCategory === "#automation" && "text-primary font-bold")}
                                    >
                                        Automation
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="#frontend"
                                        onClick={(e) => handleProjectCategoryClick(e, "#frontend")}
                                        className={cn("cursor-pointer hover:text-primary focus:text-primary", activeProjectCategory === "#frontend" && "text-primary font-bold")}
                                    >
                                        Developer
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="#3d-cad"
                                        onClick={(e) => handleProjectCategoryClick(e, "#3d-cad")}
                                        className={cn("cursor-pointer hover:text-primary focus:text-primary", activeProjectCategory === "#3d-cad" && "text-primary font-bold")}
                                    >
                                        3D CAD Designer
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* 3. Education & Contact */}
                        {navItems.slice(2).map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={cn(
                                    "relative px-4 py-2 text-sm transition-colors hover:text-primary",
                                    activeSection === item.href.substring(1)
                                        ? "text-primary font-bold"
                                        : "text-foreground/80"
                                )}
                            >
                                {item.name}
                                {activeSection === item.href.substring(1) && (
                                    <motion.div
                                        layoutId="active-nav-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </a>
                        ))}
                    </nav>
                    {/* Mobile Menu */}
                    <MobileMenu />
                </div>
            </Container>
        </header>
    )
}
