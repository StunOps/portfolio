"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { ProjectModal } from "@/components/ui/ProjectModal"

const frontendProjects = [
    {
        id: "fe-1",
        number: "01",
        title: "ChefMate",
        subtitle: "Restaurant Management System",
        image: "/images/Projects/Front-end Developer/1ChefMate/Overview.jpg",
        tools: [
            { name: "Netbeans", icon: "/images/Projects/Front-end Developer/1ChefMate/Tools/Netbeans.png" },
            { name: "Scene Builder", icon: "/images/Projects/Front-end Developer/1ChefMate/Tools/Scene Builder.png" },
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
        title: "Sigma",
        subtitle: "School Management System",
        image: "/images/Projects/Front-end Developer/2Sigma/Overview.jpg",
        tools: [
            { name: "Netbeans", icon: "/images/Projects/Front-end Developer/2Sigma/Tools/Netbeans.png" },
            { name: "Scene Builder", icon: "/images/Projects/Front-end Developer/2Sigma/Tools/Scene Builder.png" },
        ],
        gallery: [
            {
                name: "Login",
                images: ["1.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/1Login/${img}` }))
            },
            {
                name: "Dashboard",
                images: ["1.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/2Dashboard/${img}` }))
            },
            {
                name: "Student Management",
                images: ["1.png", "2.png", "3.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/3Student Management/${img}` }))
            },
            {
                name: "Event Management",
                images: ["1.png", "2.png", "3.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/4Event Management/${img}` }))
            },
            {
                name: "Organization",
                images: ["1.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/5Organization/${img}` }))
            },
            {
                name: "Organization Management",
                images: ["1.png", "2.png", "3.png", "4.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/2Sigma/6Organization Management/${img}` }))
            }
        ]
    },
    {
        id: "fe-3",
        number: "03",
        title: "BPIS",
        subtitle: "Barangay Management System",
        image: "/images/Projects/Front-end Developer/3BPIS/Overview.jpg",
        tools: [
            { name: "Netbeans", icon: "/images/Projects/Front-end Developer/3BPIS/Tools/Netbeans.png" },
            { name: "Scene Builder", icon: "/images/Projects/Front-end Developer/3BPIS/Tools/Scene Builder.png" },
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
                images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/3BPIS/3General Clerk/${img}` }))
            },
            {
                name: "Officer",
                images: ["1.png", "2.png", "3.png", "4.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/3BPIS/4Officer/${img}` }))
            },
            {
                name: "Admin",
                images: ["1.png", "2.png", "3.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/3BPIS/5Admin/${img}` }))
            }
        ]
    },
    {
        id: "fe-4",
        number: "04",
        title: "Coinnect",
        subtitle: "Web App for Financial Kiosk",
        image: "/images/Projects/Front-end Developer/4Coinnect/Overview.jpg",
        tools: [
            { name: "QT", icon: "/images/Projects/Front-end Developer/4Coinnect/Tools/QT.png" },
            { name: "VS Code", icon: "/images/Projects/Front-end Developer/4Coinnect/Tools/VSCode.png" },
        ],
        gallery: [
            {
                name: "Dashboard",
                images: ["1.jpg", "2.jpg", "3.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/1Dashboard/${img}` }))
            },
            {
                name: "Coin-to-Bill",
                images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/2Coin-to-Bill/${img}` }))
            },
            {
                name: "Bill-to-Coin",
                images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/3Bill-to-Coin/${img}` }))
            },
            {
                name: "Bill-to-Bill",
                images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/4Bill-to-Bill/${img}` }))
            },
            {
                name: "Information Messages",
                images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/5Information Messages/${img}` }))
            }
        ]
    }
]

export function FrontendDeveloper() {
    const [selectedProject, setSelectedProject] = useState<typeof frontendProjects[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleProjectClick = (project: typeof frontendProjects[0]) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {frontendProjects.map((project) => (
                    <div key={project.id} onClick={() => handleProjectClick(project)} className="cursor-pointer">
                        <ProjectCard {...project} />
                    </div>
                ))}
            </div>

            {selectedProject && (
                <ProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={selectedProject}
                />
            )}
        </>
    )
}
