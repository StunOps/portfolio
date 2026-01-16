"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"

type EducationItem = {
    id: string
    degree: string
    school: string
    year: string
    status?: string // e.g., "Senior", "Graduated"
    description: string
    achievements: string[]
}

const educationData: EducationItem[] = [
    {
        id: "college",
        degree: "Bachelor of Science in Computer Engineering",
        school: "University of Mindanao – Tagum College",
        year: "2021–2026",
        status: "Senior",
        description: "A program that specializes in both software and hardware design, focusing on building efficient systems through engineering and technology.",
        achievements: [
            "Completed system development, hardware design, prototypes, and application development",
            "Gained hands-on experience in integrating hardware and software solutions"
        ]
    },
    {
        id: "shs",
        degree: "Senior High School – Computer Programming",
        school: "Tagum National Trade School, Tagum City",
        year: "2019–2020",
        status: "Graduated",
        description: "Focused on computer programming, particularly in Java, JavaScript, HTML, and CSS. Developed foundational skills in creating systems and web applications.",
        achievements: [
            "With honors",
            "Gained solid experience in programming, system development, and digital technologies"
        ]
    },
    {
        id: "jhs",
        degree: "Junior High School – Science, Technology, and Engineering (STE)",
        school: "National High School, Sta. Josefa, Agusan del Sur",
        year: "2015–2018",
        status: "Graduated",
        description: "Built a strong foundation in mathematics and science, with early exposure to computer studies and basic technology concepts.",
        achievements: [
            "With honors",
            "Experienced in basic prototypes, and science-related projects"
        ]
    }
]

export function Education() {
    return (
        <section id="education" className="relative pt-[1px] pb-96 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none -translate-y-1/2" />

            <Container>
                <div className="flex flex-col gap-16">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                My <span className="text-primary">Education</span>
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                My academic journey and the knowledge foundation that drives my passion in the digital world.
                            </p>
                        </motion.div>
                    </div>

                    {/* Timeline / Cards */}
                    <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto w-full">
                        {educationData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Glass Card */}
                                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/5">

                                    {/* Hover Gradient Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8">
                                        {/* Icon / Year Column */}
                                        <div className="flex flex-col items-start gap-4 md:w-48 shrink-0">
                                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                                                <GraduationCap className="w-8 h-8 text-primary" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-primary font-bold">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{item.year}</span>
                                                </div>
                                                <div className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 border border-white/10 w-fit text-muted-foreground group-hover:text-white transition-colors">
                                                    {item.status}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                                    {item.degree}
                                                </h3>
                                                <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm md:text-base">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{item.school}</span>
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground leading-relaxed">
                                                {item.description}
                                            </p>

                                            {/* Achievements */}
                                            <div className="pt-2 space-y-3">
                                                <div className="flex items-center gap-2 text-sm font-bold text-white/80 uppercase tracking-wider">
                                                    <Award className="w-4 h-4 text-primary" />
                                                    <span>Key Achievements:</span>
                                                </div>
                                                <ul className="space-y-2">
                                                    {item.achievements.map((achievement, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0 group-hover:bg-primary transition-colors" />
                                                            <span>{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
