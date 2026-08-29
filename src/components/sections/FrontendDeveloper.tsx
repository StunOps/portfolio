"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { DeveloperModal, DeveloperProject } from "@/components/ui/DeveloperModal"

const frontendProjects: DeveloperProject[] = [
    {
        id: "fe-1",
        number: "01",
        title: "ChefMate",
        subtitle: "Restaurant Management System",
        role: "Front-end & Back-end Developer",
        description: "Java-made restaurant management system integrated with an SQL database. Features dedicated operational portals for cashiers and chefs, plus an administrative control panel.",
        image: "/images/Projects/Front-end Developer/1ChefMate/Overview.jpg",
        tools: [
            { name: "Java", icon: "/images/Projects/Front-end Developer/1ChefMate/Tools/Java.png" },
            { name: "Xampp", icon: "/images/Projects/Front-end Developer/1ChefMate/Tools/Xampp.png" },
            { name: "SQL", icon: "/images/Projects/Front-end Developer/1ChefMate/Tools/SQL.png" },
            { name: "Netbeans", icon: "/images/Projects/Front-end Developer/1ChefMate/Tools/Netbeans.png" },
            { name: "Scene Builder", icon: "/images/Projects/Front-end Developer/1ChefMate/Tools/Scene Builder.png" },
        ],
        architecture: [
            {
                name: "Cashier Page",
                description: "Dedicated operational interface for cashiers to process customer transactions, select menu items, calculate bill totals, and manage active ordering sessions."
            },
            {
                name: "Chef Page",
                description: "Live kitchen display system (KDS) for chefs to monitor incoming food orders, track preparation status, and notify servers when meals are ready."
            },
            {
                name: "Admin Page",
                description: "Central management dashboard for administrators to update menu offerings, adjust item pricing, manage staff accounts, and view overall financial reports."
            }
        ],
        overviewText: [
            "ChefMate is a full-featured desktop restaurant management system engineered using Java and JavaFX (Scene Builder), with MySQL/XAMPP handling backend data storage.",
            "The system bridges front-of-house operations (Cashier) with back-of-house kitchen workflows (Chef) and management oversight (Admin), ensuring seamless ordering and real-time status synchronization across all departments."
        ],
        gallery: [
            {
                name: "Login",
                images: ["1.png", "2.png", "3.png", "4.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/1ChefMate/1Login/${img}` }))
            },
            {
                name: "Cashier",
                images: ["1.png", "2.png", "3.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/1ChefMate/2Cashier/${img}` }))
            },
            {
                name: "Chef",
                images: ["1.png", "2.png", "3.png", "4.png", "5.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/1ChefMate/3Chef/${img}` }))
            },
            {
                name: "Admin",
                images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/1ChefMate/4Admin/${img}` }))
            }
        ]
    },
    {
        id: "fe-2",
        number: "02",
        title: "SDaily Planner",
        subtitle: "Personal Planner & Productivity Platform",
        role: "Full-stack Developer & Designer",
        description: "Personal planner platform featuring real-time Supabase sync and a companion mobile app. Includes custom planner cards, financial budget tracking, and AI-automated job lead management connected via n8n.",
        image: "/images/Projects/Front-end Developer/5SDaily Planner/Overview.jpg",
        tools: [
            { name: "Next.js", icon: "/images/Projects/Front-end Developer/5SDaily Planner/Icons/NextJS.png" },
            { name: "Tailwind", icon: "/images/Projects/Front-end Developer/5SDaily Planner/Icons/Tailwind.png" },
            { name: "Supabase", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/Supabasse.png" },
            { name: "n8n", icon: "/images/Projects/AI Automation/Lead&Response System/Icons/n8n.png" },
            { name: "VS Code", icon: "/images/Projects/Front-end Developer/5SDaily Planner/Icons/VSCode.png" },
            { name: "Vercel", icon: "/images/Projects/Front-end Developer/5SDaily Planner/Icons/Vercel.png" },
        ],
        architecture: [
            {
                name: "Overview Page",
                description: "Central dashboard giving a high-level summary of daily productivity metrics, upcoming deadlines, habit trackers, and quick action shortcuts."
            },
            {
                name: "Calendar Planner",
                description: "Interactive calendar interface for scheduling events, setting reminders, and managing multi-day plans with real-time cloud synchronization."
            },
            {
                name: "Custom Planner Cards",
                description: "Modular Kanban-style planning cards with customizable categories, notes, dynamic sub-tasks, and attachment management."
            },
            {
                name: "Financial Goals & Budget Tracker",
                description: "Financial management module for tracking income streams, setting target savings goals, monitoring category budgets, and logging revenue."
            },
            {
                name: "Job Tracker & AI Lead Automation",
                description: "Freelance job management board where incoming client inquiries are automatically qualified and enriched via an AI-powered n8n workflow."
            }
        ],
        overviewText: [
            "SDaily Planner is a personal daily productivity platform built with Next.js on the web and expanded with a mobile application interface.",
            "Integrated with Supabase for real-time cloud data synchronization and n8n for AI lead automation, it bridges schedule planning, financial goal tracking, and freelance client pipelines into one smooth portal."
        ],
        gallery: [
            {
                name: "Web App",
                images: [
                    { name: "Overview.png", path: "/images/Projects/Front-end Developer/5SDaily Planner/Web/Overview.png" },
                    { name: "Planner.png", path: "/images/Projects/Front-end Developer/5SDaily Planner/Web/Planner.png" },
                    { name: "Goals.png", path: "/images/Projects/Front-end Developer/5SDaily Planner/Web/Goals.png" },
                    { name: "Cards.png", path: "/images/Projects/Front-end Developer/5SDaily Planner/Web/Cards.png" },
                    { name: "Revenue.png", path: "/images/Projects/Front-end Developer/5SDaily Planner/Web/Revenue.png" }
                ]
            },
            {
                name: "Mobile App",
                images: [
                    { name: "Mobile View 1", path: "/images/Projects/Front-end Developer/5SDaily Planner/Mobile/Screenshot_2026-02-08-02-31-38-878_com.sdaily.planner_1770489136699edit.jpg" },
                    { name: "Mobile View 2", path: "/images/Projects/Front-end Developer/5SDaily Planner/Mobile/Screenshot_2026-02-08-02-31-43-784_com.sdaily.planner_1770489118711edit.jpg" }
                ]
            }
        ]
    },
    {
        id: "fe-3",
        number: "03",
        title: "Coinnect",
        subtitle: "Research System & Financial Kiosk UI",
        role: "Front-end Developer",
        description: "Front-end interface designed for a currency exchange research kiosk system. Enables self-service hardware-software cash conversion across multiple currency bill and coin formats.",
        image: "/images/Projects/Front-end Developer/4Coinnect/Overview.jpg",
        tools: [
            { name: "Python", icon: "/images/Projects/Front-end Developer/4Coinnect/Tools/Pyhton.png" },
            { name: "QT", icon: "/images/Projects/Front-end Developer/4Coinnect/Tools/QT.png" },
            { name: "VS Code", icon: "/images/Projects/Front-end Developer/4Coinnect/Tools/VSCode.png" },
        ],
        architecture: [
            {
                name: "Dashboard",
                description: "Kiosk main screen presenting real-time system readiness, available coin/bill dispenser balances, and exchange mode selections."
            },
            {
                name: "Coin-to-Bill Conversion",
                description: "Intuitive interface guiding users through inserting coins, calculating total monetary value, and receiving paper bill change."
            },
            {
                name: "Bill-to-Coin Conversion",
                description: "Self-service UI for depositing paper currency bills and dispensing corresponding coin breakdown amounts."
            },
            {
                name: "Bill-to-Bill Conversion",
                description: "Exchange portal for swapping larger bill denominations into smaller currency note increments."
            },
            {
                name: "Information Messages & Alerts",
                description: "Clear hardware prompt overlays, transaction receipt confirmations, and system diagnostic error messages."
            }
        ],
        overviewText: [
            "Coinnect serves as the interactive user-facing front-end component for an automated financial exchange research kiosk system.",
            "As the Front-end Developer, I designed responsive Python QT GUI interfaces engineered to interface seamlessly with physical coin and bill validator hardware."
        ],
        gallery: [
            {
                name: "Kiosk Views",
                sections: [
                    {
                        title: "Dashboard",
                        images: ["1.jpg", "2.jpg", "3.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/1Dashboard/${img}` }))
                    },
                    {
                        title: "Coin-to-Bill",
                        images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/2Coin-to-Bill/${img}` }))
                    },
                    {
                        title: "Bill-to-Coin",
                        images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/3Bill-to-Coin/${img}` }))
                    },
                    {
                        title: "Bill-to-Bill",
                        images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/4Bill-to-Bill/${img}` }))
                    },
                    {
                        title: "Information Messages",
                        images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/5Information Messages/${img}` }))
                    }
                ]
            }
        ]
    },
    {
        id: "fe-4",
        number: "04",
        title: "Sigma",
        subtitle: "School Management System",
        role: "Front-end Developer",
        description: "Front-end application for a comprehensive school management system designed to handle student records, campus events, and organization administration.",
        image: "/images/Projects/Front-end Developer/2Sigma/Overview.jpg",
        tools: [
            { name: "Java", icon: "/images/Projects/Front-end Developer/2Sigma/Tools/Java.png" },
            { name: "Netbeans", icon: "/images/Projects/Front-end Developer/2Sigma/Tools/Netbeans.png" },
            { name: "Scene Builder", icon: "/images/Projects/Front-end Developer/2Sigma/Tools/Scene Builder.png" },
        ],
        architecture: [
            {
                name: "Login Page",
                description: "Secure authentication entry point for academic staff, administrators, and organization officers."
            },
            {
                name: "Dashboard",
                description: "Central statistics view displaying key campus metrics, enrolled student counts, active events, and registered clubs."
            },
            {
                name: "Student Management",
                description: "Module for searching, adding, updating, and maintaining detailed student academic and enrollment profiles."
            },
            {
                name: "Event Management",
                description: "Campus event planner for organizing institutional activities, reserving venues, and tracking student attendance."
            },
            {
                name: "Organization Directory",
                description: "Central portal displaying student clubs, academic societies, and active campus organizations."
            },
            {
                name: "Organization Management",
                description: "Administrative interface for managing club officers, membership rosters, and activity approval requests."
            }
        ],
        overviewText: [
            "Sigma is a Java-based desktop school management platform engineered to streamline administrative workflows across academic departments.",
            "Serving as the Front-end Developer, I designed clean, intuitive JavaFX interfaces using Scene Builder for student record handling and campus event coordination."
        ],
        gallery: [
            {
                name: "Login",
                sections: [
                    {
                        title: "Login Portal",
                        images: ["1.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/1Login/${img}` }))
                    }
                ]
            },
            {
                name: "Management System",
                sections: [
                    {
                        title: "Dashboard",
                        images: ["1.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/2Dashboard/${img}` }))
                    },
                    {
                        title: "Student Management",
                        images: ["1.png", "2.png", "3.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/3Student Management/${img}` }))
                    },
                    {
                        title: "Event Management",
                        images: ["1.png", "2.png", "3.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/4Event Management/${img}` }))
                    },
                    {
                        title: "Organization Directory",
                        images: ["1.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/5Organization/${img}` }))
                    },
                    {
                        title: "Organization Management",
                        images: ["1.png", "2.png", "3.png", "4.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/6Organization Management/${img}` }))
                    }
                ]
            }
        ]
    },
    {
        id: "fe-5",
        number: "05",
        title: "BPIS",
        subtitle: "Barangay Information & Management System",
        role: "Front-end Developer",
        description: "Front-end management portal for Barangay local government services, streamlining resident clearance issuance, incident tracking, and municipal governance.",
        image: "/images/Projects/Front-end Developer/3BPIS/Overview.jpg",
        tools: [
            { name: "Java", icon: "/images/Projects/Front-end Developer/3BPIS/Tools/Java.png" },
            { name: "Netbeans", icon: "/images/Projects/Front-end Developer/3BPIS/Tools/Netbeans.png" },
            { name: "Scene Builder", icon: "/images/Projects/Front-end Developer/3BPIS/Tools/Scene Builder.png" },
        ],
        architecture: [
            {
                name: "Login Page",
                description: "Role-based authentication portal for residents, general clerks, barangay officers, and system administrators."
            },
            {
                name: "User Portal",
                description: "Resident interface for submitting document requests, filing barangay clearance applications, and tracking request progress."
            },
            {
                name: "General Clerk Desk",
                description: "Operational dashboard for barangay clerks to process resident applications, issue residency certificates, and maintain records."
            },
            {
                name: "Officer Panel",
                description: "Official console for barangay leaders to review incident logs, sign clearances, and oversee community programs."
            },
            {
                name: "Admin Console",
                description: "System administration hub for configuring user roles, system permissions, security audit logs, and settings."
            }
        ],
        overviewText: [
            "BPIS (Barangay Information System) is a Java desktop solution crafted to modernize local municipal government record-keeping and public service delivery.",
            "As the Front-end Developer, I built structured, user-friendly JavaFX interfaces focused on role-based access, rapid document processing, and clear data visualization."
        ],
        gallery: [
            {
                name: "Login",
                images: ["1.png", "2.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/3BPIS/1Login/${img}` }))
            },
            {
                name: "User",
                images: ["1.png", "2.png", "3.png", "4.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/3BPIS/2User/${img}` }))
            },
            {
                name: "General Clerk",
                images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/3BPIS/3General Clerk/${img}` }))
            },
            {
                name: "Officer",
                images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/3BPIS/4Officer/${img}` }))
            },
            {
                name: "Admin",
                images: ["1.png", "2.png", "3.png", "4.png", "5.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/3BPIS/5Admin/${img}` }))
            }
        ]
    }
]

export function FrontendDeveloper() {
    const [selectedProject, setSelectedProject] = useState<DeveloperProject | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleProjectClick = (project: DeveloperProject) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {frontendProjects.map((project) => (
                    <div key={project.id} onClick={() => handleProjectClick(project)} className="cursor-pointer">
                        <ProjectCard
                            number={project.number}
                            title={project.title}
                            subtitle={project.subtitle}
                            tools={project.tools}
                            image={project.image}
                        />
                    </div>
                ))}
            </div>

            {selectedProject && (
                <DeveloperModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={selectedProject}
                />
            )}
        </>
    )
}
