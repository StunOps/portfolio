"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Facebook, MessageCircle, Download } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { Button, buttonVariants } from "@/components/ui/Button"
import { Typewriter } from "@/components/ui/Typewriter"
import { ProfileFlame } from "@/components/ui/ProfileFlame"
import { AuroraBackground } from "@/components/ui/AuroraBackground"
import ChatWidget from "@/components/ui/ChatWidget"
import { About } from "@/components/sections/About"
import { Projects } from "@/components/sections/Projects"
import { Education } from "@/components/sections/Education"
import { Contact } from "@/components/sections/Contact"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Home() {
    const { scrollY } = useScroll();
    // Fade out scroll indicator as user scrolls down (0 to 100px)
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [0.7, 0]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const targetId = href.substring(1)
        const element = document.getElementById(targetId)

        if (element) {
            window.scrollTo({
                top: element.offsetTop - 50,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="flex flex-col relative">

            {/* --- HOME / HERO SECTION --- */}
            <motion.section
                id="home"
                className="relative min-h-[calc(100vh-4rem)] flex flex-col overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >

                {/* Aurora Background */}
                <div className="absolute inset-0 -z-20">
                    <AuroraBackground className="h-full w-full bg-transparent dark:bg-transparent" showRadialGradient={true}>
                    </AuroraBackground>
                </div>

                {/* Decorative localized glow / Smoke Effect - Top Background */}
                <div className="absolute -top-40 left-0 w-full h-[500px] bg-primary/60 rounded-[100%] blur-[120px] -z-10 animate-smoke-drift opacity-80" />
                <div className="absolute -top-20 right-0 w-[600px] h-[400px] bg-orange-500/50 rounded-full blur-[100px] -z-10 animate-smoke-drift [animation-delay:3s]" />

                <Container className="flex-grow py-12 md:pt-32 md:pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-8 lg:gap-12 items-center lg:items-start h-full">

                        {/* Left Column */}
                        <div className="flex flex-col items-start gap-6 order-2 lg:order-1 lg:pt-15">


                            <div className="space-y-2">
                                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary uppercase tracking-wider backdrop-blur-sm">
                                    Available for work
                                </div>
                                <h3 className="text-xl md:text-2xl text-muted-foreground">Hey there, I am</h3>
                                <div className="min-h-[4rem] flex items-center">
                                    <Typewriter
                                        text={["Stunley Opeña", "Stun", "Stunning", "Stunned"]}
                                        speed={0.1}
                                        deleteSpeed={0.05}
                                        waitTime={1500}
                                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-white py-1 leading-tight"
                                        cursorClassName="inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-baseline animate-pulse"
                                    />
                                </div>
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                                A creative designer crafting digital visuals and interfaces that are simple, impactful, and <span className="text-primary font-bold">STUNning</span>.
                            </p>
                        </div>

                        {/* Center Column - Profile Image */}
                        <div className="flex justify-center items-center order-1 lg:order-2 animate-float">
                            <ProfileFlame />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col items-end gap-6 order-3 lg:order-3 lg:pl-12 lg:pt-8">
                            <div className="min-h-[3.5rem] md:min-h-[5rem] h-auto flex items-center w-full justify-end py-1">
                                <Typewriter
                                    text={[
                                        "UI/UX Designer",
                                        "Graphic Designer",
                                        "Social Media Manager",
                                        "Frontend Developer",
                                        "3D CAD Designer"
                                    ]}
                                    speed={0.05}
                                    deleteSpeed={0.02}
                                    waitTime={1000}
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-right w-full"
                                />
                            </div>

                            <div className="space-y-4 w-full">
                                <p className="text-muted-foreground text-lg text-right">
                                    Bachelor of Science in Computer Engineering with expertise in Digital Visuals.
                                </p>

                                <div className="flex flex-col gap-4 pt-2 w-full">
                                    <Link
                                        href="#projects"
                                        onClick={(e) => scrollToSection(e, "#projects")}
                                        className={buttonVariants({ size: "lg", className: "w-full rounded-[10px] bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" })}
                                    >
                                        View My Work
                                    </Link>
                                    <a
                                        href="/Stun CV.pdf"
                                        download="Stun_CV.pdf"
                                        className={buttonVariants({ variant: "outline", size: "lg", className: "w-full rounded-[10px] border-primary/50 text-primary hover:bg-primary/10 flex items-center justify-center" })}
                                    >
                                        Download CV <Download className="ml-2 w-4 h-4" />
                                    </a>
                                </div>

                                <div className="flex gap-3 pt-1 justify-end">
                                    <Link href="https://www.facebook.com/share/1ABUkugja6/" target="_blank" className="p-2 rounded-[10px] glass hover:bg-primary hover:text-white transition-all duration-300 text-muted-foreground">
                                        <Facebook className="w-5 h-5" />
                                        <span className="sr-only">Facebook</span>
                                    </Link>
                                    <Link href="https://www.behance.net/stunleyopea" target="_blank" className="p-2 rounded-[10px] glass hover:bg-primary hover:text-white transition-all duration-300 text-muted-foreground group">
                                        <div className="relative w-5 h-5">
                                            <Image
                                                src="/images/About/Behancee2.png"
                                                alt="Behance"
                                                fill
                                                className="object-contain invert dark:invert-0 group-hover:invert-0 group-hover:brightness-0 group-hover:invert"
                                            />
                                        </div>
                                        <span className="sr-only">Behance</span>
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            alert("Working on it")
                                        }}
                                        className="p-2 rounded-[10px] glass hover:bg-primary hover:text-white transition-all duration-300 text-muted-foreground cursor-pointer"
                                    >
                                        <Github className="w-5 h-5" />
                                        <span className="sr-only">GitHub</span>
                                    </button>
                                    <Link href="https://www.linkedin.com/in/stun-opeña-8736ab2b2" target="_blank" className="p-2 rounded-[10px] glass hover:bg-primary hover:text-white transition-all duration-300 text-muted-foreground">
                                        <Linkedin className="w-5 h-5" />
                                        <span className="sr-only">LinkedIn</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>

                {/* Bottom Decorative Lines/Shapes (Now locked to this section) */}
                <div className="absolute bottom-0 left-0 w-full h-[30vh] pointer-events-none -z-10 overflow-hidden opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        {/* Dynamic angled lines */}
                        <path fill="none" className="animate-pulse-slow" stroke="var(--primary)" strokeWidth="1" d="M0,320 C 300, 100 800, 280 1600, 100" />
                        <path fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="10 10" d="M-100,350 C 500, 200 1000, 350 1600, 150" />

                        {/* Geometric Outlines */}
                        <circle cx="10%" cy="80%" r="100" stroke="var(--primary)" strokeWidth="0.5" fill="none" opacity="0.5" />
                        <rect x="85%" y="60%" width="150" height="150" stroke="#ffffff" strokeWidth="0.5" fill="none" transform="rotate(15 0 0)" opacity="0.3" />
                    </svg>
                </div>

                {/* Scroll Indicator (Now fades out on scroll) */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 animate-bounce-subtle"
                >
                    <div className="p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5 text-primary"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                </motion.div>

            </motion.section>
            {/* --- END HOME / HERO SECTION --- */}

            {/* --- ABOUT SECTION --- */}
            <About />

            {/* --- PROJECTS SECTION --- */}
            <Projects />

            {/* --- EDUCATION SECTION --- */}
            <Education />

            {/* --- CONTACT SECTION --- */}
            <Contact />

            {/* Fixed Chat Icon (Global) */}
            <ChatWidget />

        </div>
    )
}
