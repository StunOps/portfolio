import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils"
// Import ProjectCard and ProjectModal
import { ProjectCard } from "@/components/ui/ProjectCard"
import { ProjectModal } from "@/components/ui/ProjectModal"
import { InstagramCarousel } from "@/components/ui/InstagramCarousel"
import { LogoBranding } from "@/components/sections/LogoBranding"
import { MerchDesigns } from "@/components/sections/MerchDesigns"
import { SocialMediaManager } from "@/components/sections/SocialMediaManager"
import { FrontendDeveloper } from "@/components/sections/FrontendDeveloper"
import { ThreeDDesigner } from "@/components/sections/ThreeDDesigner"

const categories = [
    "UI/UX Designer",
    "Graphic Designer",
    "Social Media Manager",
    "Front-end Developer",
    "3D CAD Designer"
]

const uiUxProjects = [
    {
        id: "ui-1",
        number: "01",
        title: "Madayaw Bus Tap Admin",
        subtitle: "Internal Management Portal",
        figmaLink: "https://www.figma.com/design/KE8S36CyreMa6q2JIZwZ1J/Madayaw-Bus-Tap-UI?node-id=199-704&t=26Skz9s4I54ICX7y-1",
        image: "/images/Projects/UI/1Madayaw Bus Tap Admin/Overview.jpg",
        tools: [
            { name: "Figma", icon: "/images/Projects/UI/1Madayaw Bus Tap Admin/tools/Figma.png" },
            { name: "Photoshop", icon: "/images/Projects/UI/1Madayaw Bus Tap Admin/tools/Photoshop.png" },
            { name: "Illustrator", icon: "/images/Projects/UI/1Madayaw Bus Tap Admin/tools/Illustrator.png" },
        ],
        gallery: [
            {
                name: "Authentication",
                images: [
                    { name: "Login.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/1Authentication/Login.png" },
                    { name: "Login-1.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/1Authentication/Login-1.png" }
                ]
            },
            {
                name: "Dashboard",
                images: [
                    { name: "Dashboard.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/2Dashboard/Dashboard.png" }
                ]
            },
            {
                name: "Accounts",
                images: [
                    { name: "Accounts.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/3Accounts/Accounts.png" },
                    { name: "Accounts_Add-1.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/3Accounts/Accounts_Add-1.png" },
                    { name: "Accounts_Add-2.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/3Accounts/Accounts_Add-2.png" },
                    { name: "Accounts_Add.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/3Accounts/Accounts_Add.png" },
                    { name: "Accounts_Delete.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/3Accounts/Accounts_Delete.png" },
                    { name: "Accounts_Edit-1.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/3Accounts/Accounts_Edit-1.png" },
                    { name: "Accounts_Edit-2.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/3Accounts/Accounts_Edit-2.png" },
                    { name: "Accounts_Edit.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/3Accounts/Accounts_Edit.png" }
                ]
            },
            {
                name: "Driver Approvals",
                images: [
                    { name: "Accounts-1.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/4Driver Approavals/Accounts-1.png" }
                ]
            },
            {
                name: "Routes & Buses",
                images: [
                    { name: "Buses & Routes.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/5Routes & Buses/Buses & Routes.png" },
                    { name: "Buses & Routes-1.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/5Routes & Buses/Buses & Routes-1.png" },
                    { name: "Buses & Routes-2.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/5Routes & Buses/Buses & Routes-2.png" },
                    { name: "Buses & Routes-3.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/5Routes & Buses/Buses & Routes-3.png" },
                    { name: "Buses & Routes-4.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/5Routes & Buses/Buses & Routes-4.png" },
                    { name: "Buses & Routes-5.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/5Routes & Buses/Buses & Routes-5.png" },
                    { name: "Buses & Routes-6.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/5Routes & Buses/Buses & Routes-6.png" }
                ]
            },
            {
                name: "Notification",
                images: [
                    { name: "Notifications.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/6Notification/Notifications.png" }
                ]
            },
            {
                name: "Analytics",
                images: [
                    { name: "Analytics.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/7Analytics/Analytics.png" }
                ]
            },
            {
                name: "System Settings",
                images: [
                    { name: "System Settings.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/8System Settings/System Settings.png" },
                    { name: "System Settings-1.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/8System Settings/System Settings-1.png" },
                    { name: "System Settings-2.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/8System Settings/System Settings-2.png" },
                    { name: "System Settings-3.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/8System Settings/System Settings-3.png" },
                    { name: "System Settings-4.png", path: "/images/Projects/UI/1Madayaw Bus Tap Admin/images/8System Settings/System Settings-4.png" }
                ]
            }
        ]
    },
    {
        id: "ui-2",
        number: "02",
        title: "Madayaw Bus Tap Users",
        subtitle: "Mobile App UI/UX",
        figmaLink: "https://www.figma.com/design/KE8S36CyreMa6q2JIZwZ1J/Madayaw-Bus-Tap-UI?node-id=3-2&t=26Skz9s4I54ICX7y-1",
        image: "/images/Projects/UI/2Madayaw Bus Tap Users/Overview.jpg",
        tools: [
            { name: "Figma", icon: "/images/Projects/UI/1Madayaw Bus Tap Admin/tools/Figma.png" },
            { name: "Photoshop", icon: "/images/Projects/UI/1Madayaw Bus Tap Admin/tools/Photoshop.png" },
            { name: "Illustrator", icon: "/images/Projects/UI/1Madayaw Bus Tap Admin/tools/Illustrator.png" },
        ],
        gallery: [
            {
                name: "Passenger Authentication",
                images: [
                    { name: "User Login.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/1Passenger Authentication/User Login.png" },
                    { name: "User Login-1.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/1Passenger Authentication/User Login-1.png" },
                    { name: "User Sign up.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/1Passenger Authentication/User Sign up.png" },
                    { name: "User Sign up-1.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/1Passenger Authentication/User Sign up-1.png" },
                    { name: "User Sign up-2.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/1Passenger Authentication/User Sign up-2.png" }
                ]
            },
            {
                name: "Passenger Dashboard",
                images: [
                    { name: "Splash Screen.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/2Passenger Dashboard/Splash Screen.png" },
                    { name: "User - Home.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/2Passenger Dashboard/User - Home.png" }
                ]
            },
            {
                name: "Passenger Route",
                images: [
                    { name: "My Route - Active.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/3Passenger Route/My Route - Active.png" },
                    { name: "My Route -View in Map.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/3Passenger Route/My Route -View in Map.png" },
                    { name: "My Route - Ticket Support.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/3Passenger Route/My Route - Ticket Support.png" },
                    { name: "My Route - Completed Filters.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/3Passenger Route/My Route - Completed Filters.png" },
                    { name: "My Route - Favorites Filters.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/3Passenger Route/My Route - Favorites Filters.png" }
                ]
            },
            {
                name: "Passenger QR",
                images: [
                    { name: "QR - Home.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/4Passenger QR/QR - Home.png" },
                    { name: "QR- Search.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/4Passenger QR/QR- Search.png" },
                    { name: "User - QR.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/4Passenger QR/User - QR.png" },
                    { name: "User - Added to Favorites.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/4Passenger QR/User - Added to Favorites.png" }
                ]
            },
            {
                name: "Passenger Wallet",
                images: [
                    { name: "Wallet - Home.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/5Passenger Wallet/Wallet - Home.png" },
                    { name: "Wallet - Top Up GCash.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/5Passenger Wallet/Wallet - Top Up GCash.png" }
                ]
            },
            {
                name: "Passenger Profile",
                images: [
                    { name: "Profile- Home.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/6Passenger Profile/Profile- Home.png" },
                    { name: "Profile- Profile Details.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/6Passenger Profile/Profile- Profile Details.png" },
                    { name: "Profile- Profile Details-1.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/6Passenger Profile/Profile- Profile Details-1.png" },
                    { name: "Profile- Profile Details-2.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/6Passenger Profile/Profile- Profile Details-2.png" },
                    { name: "Profile- Profile Details-3.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/6Passenger Profile/Profile- Profile Details-3.png" },
                    { name: "Profile- Notifications.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/6Passenger Profile/Profile- Notifications.png" },
                    { name: "Profile- Help & Contact.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/6Passenger Profile/Profile- Help & Contact.png" },
                    { name: "Profile- About Us.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/6Passenger Profile/Profile- About Us.png" }
                ]
            },
            {
                name: "Conductor Authentication",
                images: [
                    { name: "Conductor Login.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/8Conductor Authentication/Conductor Login.png" },
                    { name: "Conductor Sign Up.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/8Conductor Authentication/Conductor Sign Up.png" },
                    { name: "Conductor Sign Up Onboarding.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/8Conductor Authentication/Conductor Sign Up Onboarding.png" },
                    { name: "Conductor OTP2.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/8Conductor Authentication/Conductor OTP2.png" },
                    { name: "ConductorOTP.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/8Conductor Authentication/ConductorOTP.png" }
                ]
            },
            {
                name: "Conductor Home",
                images: [
                    { name: "Conductor- Home.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/9Conductor Home/Conductor- Home.png" },
                    { name: "Conductor- Home-1.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/9Conductor Home/Conductor- Home-1.png" },
                    { name: "Conductor- Home-2.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/9Conductor Home/Conductor- Home-2.png" },
                    { name: "Conductor- Home-3.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/9Conductor Home/Conductor- Home-3.png" },
                    { name: "Conductor- Home-4.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/9Conductor Home/Conductor- Home-4.png" }
                ]
            },
            {
                name: "Conductor Trip Log",
                images: [
                    { name: "Conductor- Trip Log.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/10Conductor Trip Log/Conductor- Trip Log.png" },
                    { name: "Conductor- Trip Log-1.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/10Conductor Trip Log/Conductor- Trip Log-1.png" },
                    { name: "Conductor- Trip Log-2.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/10Conductor Trip Log/Conductor- Trip Log-2.png" }
                ]
            },
            {
                name: "Driver Authentication",
                images: [
                    { name: "Driver Login.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Authentication/Driver Login.png" },
                    { name: "Driver Sign Up.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Authentication/Driver Sign Up.png" },
                    { name: "Driver Sign Up Onboarding.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Authentication/Driver Sign Up Onboarding.png" },
                    { name: "Driver OTP.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Authentication/Driver OTP.png" },
                    { name: "Driver OTP2.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Authentication/Driver OTP2.png" },
                    { name: "Driver.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Authentication/Driver.png" },
                    { name: "Driver-1.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Authentication/Driver-1.png" }
                ]
            },
            {
                name: "Driver Home",
                images: [
                    { name: "Driver - Home.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Home/Driver - Home.png" },
                    { name: "Driver - Home-1.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Home/Driver - Home-1.png" },
                    { name: "Driver - Home-2.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/12Driver Home/Driver - Home-2.png" }
                ]
            },
            {
                name: "Driver Trip Log",
                images: [
                    { name: "Driver - Trip Log.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/13Driver Trip Log/Driver - Trip Log.png" },
                    { name: "Driver - Trip Log-1.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/13Driver Trip Log/Driver - Trip Log-1.png" },
                    { name: "Driver - Trip Log-2.png", path: "/images/Projects/UI/2Madayaw Bus Tap Users/images/13Driver Trip Log/Driver - Trip Log-2.png" }
                ]
            }
        ]
    }
]

const frontendProjects = [
    {
        id: "fe-1",
        number: "01",
        title: "ChefMate",
        subtitle: "Web Application",
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
        subtitle: "Web Application",
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
        subtitle: "Web Application",
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
    },
    {
        id: "fe-4",
        number: "04",
        title: "Coinnect",
        subtitle: "Web Application",
        image: "/images/Projects/Front-end Developer/4Coinnect/Overview.jpg",
        tools: [
            { name: "QT", icon: "/images/Projects/Front-end Developer/4Coinnect/Tools/QT.png" },
            { name: "VS Code", icon: "/images/Projects/Front-end Developer/4Coinnect/Tools/VSCode.png" },
        ],
        gallery: [
            {
                name: "Dashboard",
                images: ["1.png", "2.png", "3.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/1Dashboard/${img}` }))
            },
            {
                name: "Coin-to-Bill",
                images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/2Coin-to-Bill/${img}` }))
            },
            {
                name: "Bill-to-Coin",
                images: ["1.png", "2.png", "3.png", "4.png", "5.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/3Bill-to-Coin/${img}` }))
            },
            {
                name: "Bill-to-Bill",
                images: ["1.png", "2.png", "3.png", "4.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/4Bill-to-Bill/${img}` }))
            },
            {
                name: "Information Messages",
                images: ["1.png", "2.png", "3.png"].map(img => ({ name: img, path: `/images/Projects/Front-end Developer/4Coinnect/5Information Messages/${img}` }))
            }
        ]
    }
]

export function Projects() {
    const [activeCategory, setActiveCategory] = useState(categories[0])
    const [selectedProject, setSelectedProject] = useState<typeof uiUxProjects[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleProjectClick = (project: any) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    // ... (keep hash effect) ...
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash
            switch (hash) {
                case "#ui-ux": setActiveCategory("UI/UX Designer"); break;
                case "#graphic-artist": setActiveCategory("Graphic Designer"); break;
                case "#social-media": setActiveCategory("Social Media Manager"); break;
                case "#frontend": setActiveCategory("Front-end Developer"); break;
                case "#3d-cad": setActiveCategory("3D CAD Designer"); break;
            }
        }
        handleHashChange()
        window.addEventListener("hashchange", handleHashChange)
        return () => window.removeEventListener("hashchange", handleHashChange)
    }, [])

    // ... rest of the component
    return (

        <section id="projects" className="relative pt-[1px] md:pt-[50px] pb-96">
            {/* Background Glow */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div>
                <Container>
                    <div className="flex flex-col gap-12">
                        {/* Title and Segmented Control */}
                        <div className="flex flex-col items-center gap-8 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ duration: 0.6 }}
                                className="text-center space-y-4"
                            >
                                <h2 className="text-4xl md:text-5xl font-bold">
                                    My <span className="text-primary">Projects</span>
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                    A collection of my work across different domains.
                                </p>
                            </motion.div>
                        </div>

                        <div className="sticky top-20 z-40 py-4 flex justify-center px-2 md:px-4 pointer-events-none">
                            <div className="pointer-events-auto flex flex-nowrap items-center justify-between w-full md:w-auto md:justify-center gap-1 p-1.5 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-white/5 transition-all duration-300">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setActiveCategory(category)
                                            const element = document.getElementById("projects")
                                            if (element) {
                                                const offset = 80
                                                const bodyRect = document.body.getBoundingClientRect().top
                                                const elementRect = element.getBoundingClientRect().top
                                                const elementPosition = elementRect - bodyRect
                                                const offsetPosition = elementPosition - offset

                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: "smooth"
                                                })
                                            }
                                        }}
                                        className={cn(
                                            "relative flex-1 md:flex-none px-1 py-2 md:px-6 md:py-2.5 text-[10px] md:text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap text-center",
                                            activeCategory === category ? "text-white shadow-lg shadow-primary/25" : "text-muted-foreground hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {activeCategory === category && (
                                            <motion.div
                                                layoutId="activeCategory"
                                                className="absolute inset-0 bg-primary rounded-xl -z-10"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <span className="md:hidden">
                                            {category === "UI/UX Designer" ? "UI/UX" :
                                                category === "Graphic Designer" ? "Graphics" :
                                                    category === "Social Media Manager" ? "Socials" :
                                                        category === "Front-end Developer" ? "Front Dev" :
                                                            "3D CAD"}
                                        </span>
                                        <span className="hidden md:inline">{category}</span>
                                    </button>
                                ))}
                            </div>
                        </div>


                        {/* Content Area */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeCategory === "UI/UX Designer" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {uiUxProjects.map((project) => (
                                            <div key={project.id} onClick={() => handleProjectClick(project)} className="cursor-pointer">
                                                <ProjectCard {...project} />
                                            </div>
                                        ))}
                                    </div>
                                ) : activeCategory === "Graphic Designer" ? (
                                    <div className="space-y-20">
                                        <InstagramCarousel />
                                        <LogoBranding />
                                        <MerchDesigns />
                                    </div>
                                ) : activeCategory === "Social Media Manager" ? (
                                    <SocialMediaManager />
                                ) : activeCategory === "Front-end Developer" ? (
                                    <FrontendDeveloper />
                                ) : activeCategory === "3D CAD Designer" ? (
                                    <ThreeDDesigner />
                                ) : (
                                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
                                        <p className="text-muted-foreground">
                                            Projects for <span className="text-primary font-medium">{activeCategory}</span> coming soon.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Container>

                {/* Project Modal */}
                {selectedProject && (
                    <ProjectModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        project={selectedProject}
                    />
                )}
            </div>
        </section>
    )
}
