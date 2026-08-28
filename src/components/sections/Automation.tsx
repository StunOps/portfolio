"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { AutomationModal, AutomationProject } from "@/components/ui/AutomationModal"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Clock, AlertCircle } from "lucide-react"

const automationProjects: (AutomationProject & { isOngoing?: boolean; hoverText?: string })[] = [
    {
        id: "automation-1",
        number: "01",
        title: "AI Lead Qualification & CRM Automation",
        subtitle: "Lead & Response System",
        description: "An AI-powered lead management system that analyzes incoming inquiries, researches the company or lead's online profile using Serper, qualifies the lead, and generates a personalized email response. Once a human approves the lead, the system automatically sends the email and updates the CRM.",
        image: "/images/Projects/AI Automation/Lead&Response System/Overview.jpg",
        workflowImage: "/images/Projects/AI Automation/Lead&Response System/Workflow.png",
        tools: [
            { name: "n8n", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/n8n.png" },
            { name: "Google Gemini", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Gemini.png" },
            { name: "Serper", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Serper.png" },
            { name: "Gmail", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Gmail.png" },
            { name: "Supabase", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Supabasse.png" },
            { name: "Notion", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Notion.png" },
            { name: "HubSpot", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Hubspot.png" },
        ],
        contentImages: [
            { name: "1.png", path: "/images/Projects/AI Automation/Lead&Response System/Content/1.png" },
            { name: "2.png", path: "/images/Projects/AI Automation/Lead&Response System/Content/2.png" },
            { name: "3.png", path: "/images/Projects/AI Automation/Lead&Response System/Content/3.png" },
            { name: "4.png", path: "/images/Projects/AI Automation/Lead&Response System/Content/4.png" },
            { name: "5.png", path: "/images/Projects/AI Automation/Lead&Response System/Content/5.png" },
            { name: "6.png", path: "/images/Projects/AI Automation/Lead&Response System/Content/6.png" },
            { name: "7.png", path: "/images/Projects/AI Automation/Lead&Response System/Content/7.png" }
        ],
        workflowSteps: [
            "Customer Inquiry",
            "AI Lead Analysis",
            "Online Company & Lead Web Researching",
            "Lead Qualification & Scoring",
            "Supabase Database",
            "Human Approval",
            "AI-Generated Email",
            "Automatic Email Response",
            "HubSpot CRM"
        ],
        overviewText: [
            "Automates the lead journey from initial inquiry to CRM management. AI handles lead analysis, online research, qualification, and email drafting, while human approval ensures that only verified leads receive an automatic response.",
            "Supabase serves as the database for the internal lead management system, storing lead information, status, AI-generated summaries, email drafts, and other relevant data."
        ]
    },
    {
        id: "automation-2",
        number: "02",
        title: "Customer Feedback Mining",
        subtitle: "Voice of Customer Analysis",
        description: "An AI-driven analysis system that ingests customer reviews, support tickets, and feedback channels to extract actionable insights, sentiment scores, and key topic trends.",
        image: "/images/Projects/AI Automation/Overview2.jpg",
        workflowImage: "/images/Projects/AI Automation/Overview2.jpg",
        isOngoing: true,
        hoverText: "Project Ongoing",
        tools: [
            { name: "n8n", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/n8n.png" },
            { name: "Google Gemini", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Gemini.png" },
            { name: "Supabase", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Supabasse.png" },
            { name: "Notion", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Notion.png" },
        ],
        contentImages: [],
        workflowSteps: ["Feedback Collection", "AI Sentiment Analysis", "Topic Extraction", "Insight Storage", "Dashboard Summary"],
        overviewText: ["Project currently under active development. Voice of Customer analysis pipeline is being tuned for multi-channel feedback."]
    },
    {
        id: "automation-3",
        number: "03",
        title: "AI Voice Receptionist for Missed Calls",
        subtitle: "Voice AI System",
        description: "An intelligent voice automation agent that handles missed business calls, converses naturally with callers, collects inquiry details, and instantly sends summaries & appointments to CRM.",
        image: "/images/Projects/AI Automation/Overview3.jpg",
        workflowImage: "/images/Projects/AI Automation/Overview3.jpg",
        isOngoing: true,
        hoverText: "Project Ongoing",
        tools: [
            { name: "n8n", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/n8n.png" },
            { name: "Google Gemini", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Gemini.png" },
            { name: "Gmail", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Gmail.png" },
            { name: "HubSpot", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Hubspot.png" },
        ],
        contentImages: [],
        workflowSteps: ["Missed Call Detection", "Voice AI Conversation", "Speech-to-Text Parsing", "Appointment Scheduling", "CRM Logging"],
        overviewText: ["Project currently under active development. Voice AI integration and real-time appointment booking logic are in progress."]
    }
]

export function Automation() {
    const [selectedProject, setSelectedProject] = useState<AutomationProject & { isOngoing?: boolean } | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [ongoingProject, setOngoingProject] = useState<(AutomationProject & { isOngoing?: boolean }) | null>(null)

    const handleProjectClick = (project: AutomationProject & { isOngoing?: boolean }) => {
        if (project.isOngoing) {
            setOngoingProject(project)
        } else {
            setSelectedProject(project)
            setIsModalOpen(true)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {automationProjects.map((project) => (
                    <div key={project.id} onClick={() => handleProjectClick(project)} className="cursor-pointer">
                        <ProjectCard
                            number={project.number}
                            title={project.title}
                            subtitle={project.subtitle}
                            tools={project.tools}
                            image={project.image}
                            hoverText={project.hoverText}
                            isOngoing={project.isOngoing}
                        />
                    </div>
                ))}
            </div>

            {/* Main Modal for Completed Projects */}
            {selectedProject && !selectedProject.isOngoing && (
                <AutomationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={selectedProject}
                />
            )}

            {/* Modal / Dialog for Ongoing Projects */}
            <AnimatePresence>
                {ongoingProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            key="ongoing-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOngoingProject(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md"
                        />

                        <motion.div
                            key="ongoing-modal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-[#141519] border border-primary/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-center space-y-6"
                        >
                            {/* Header Badge & Close */}
                            <div className="flex items-center justify-between">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-semibold">
                                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                                    Project Ongoing
                                </div>
                                <button
                                    onClick={() => setOngoingProject(null)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Project Preview Image */}
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                                <Image
                                    src={ongoingProject.image}
                                    alt={ongoingProject.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Project Information */}
                            <div className="space-y-2 text-left">
                                <h3 className="text-xl font-bold text-white leading-tight">
                                    {ongoingProject.title}
                                </h3>
                                <p className="text-xs text-primary font-medium">{ongoingProject.subtitle}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                                    {ongoingProject.description}
                                </p>
                            </div>

                            {/* Information Note */}
                            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-left flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <p className="text-xs text-white/80 leading-relaxed">
                                    This project is currently under active development. Detailed workflow diagrams and content panels will be published upon completion.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
