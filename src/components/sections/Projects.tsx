import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils"
// Import ProjectCard and ProjectModal
import { ProjectCard } from "@/components/ui/ProjectCard"
import { ProjectModal } from "@/components/ui/ProjectModal"
import { InstagramCarousel } from "@/components/ui/InstagramCarousel"
import { LogoBranding } from "@/components/sections/LogoBranding"
import { MerchDesigns } from "@/components/sections/MerchDesigns"
import { SocialMediaManager } from "@/components/sections/SocialMediaManager"
import { Automation } from "@/components/sections/Automation"
import { FrontendDeveloper } from "@/components/sections/FrontendDeveloper"
import { ThreeDDesigner } from "@/components/sections/ThreeDDesigner"

const categories = [
    "UI/UX Designer",
    "Graphic Designer",
    "Social Media Manager",
    "Automation",
    "Developer",
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
    },
    {
        id: "ui-3",
        number: "03",
        title: "Rent Moto",
        subtitle: "Motorcycle Rental Platform",
        figmaLink: "https://www.figma.com/design/VJyYsrjd7s771lLvFooZVW/Rent-Moto?node-id=0-1&t=VjTn5xBltrihqbRj-1",
        image: "/images/Projects/UI/3Rent Moto/Overview.jpg",
        tools: [
            { name: "Figma", icon: "/images/Projects/UI/3Rent Moto/tools/Figma.png" },
            { name: "Photoshop", icon: "/images/Projects/UI/3Rent Moto/tools/Photoshop.png" },
            { name: "Illustrator", icon: "/images/Projects/UI/3Rent Moto/tools/Illustrator.png" },
        ],
        gallery: [
            {
                name: "Authentication",
                images: [
                    { name: "Login Admin.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Login Admin.png" },
                    { name: "Login Borrower.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Login Borrower.png" },
                    { name: "Signup Borrower.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Signup Borrower.png" }
                ]
            },
            {
                name: "Borrower Home",
                images: [
                    { name: "Home.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Home.png" },
                    { name: "Home Book.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Home Book.png" },
                    { name: "Home Click Card.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Home Click Card.png" },
                    { name: "Home Invalid.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Home Invalid.png" },
                    { name: "Home Success.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Home Success.png" }
                ]
            },
            {
                name: "Borrower Messages",
                images: [
                    { name: "Home Click Message.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Home Click Message.png" },
                    { name: "Messages Direct.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Messages Direct.png" }
                ]
            },
            {
                name: "Borrower Bookings",
                images: [
                    { name: "Bookings Pending.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Bookings Pending.png" },
                    { name: "Bookings Ongoing.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Bookings Ongoing.png" },
                    { name: "Bookings Declined.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Bookings Declined.png" },
                    { name: "Bookings Empty.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Bookings Empty.png" }
                ]
            },
            {
                name: "Borrower Notifications",
                images: [
                    { name: "Notifications.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Notifications.png" },
                    { name: "Notifications Transaction Done.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Notifications Transaction Done.png" },
                    { name: "Notifications Rate Ride.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Notifications Rate Ride.png" }
                ]
            },
            {
                name: "Borrower Profile",
                images: [
                    { name: "Profile.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Profile.png" },
                    { name: "Profile Drivers License.png", path: "/images/Projects/UI/3Rent Moto/images/1Borrower/Profile Drivers License.png" }
                ]
            },
            {
                name: "Admin Dashboard",
                images: [
                    { name: "Dashboard.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Dashboard.png" }
                ]
            },
            {
                name: "Admin Borrower Management",
                images: [
                    { name: "Borrowers - Accout Verification.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Borrowers - Accout Verification.png" },
                    { name: "Borrowers - Accout Verification-1.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Borrowers - Accout Verification-1.png" },
                    { name: "Borrowers - Borrower Information.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Borrowers - Borrower Information.png" }
                ]
            },
            {
                name: "Admin Motorcycle Management",
                images: [
                    { name: "Motorcycle.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Motorcycle.png" },
                    { name: "Motorcycle Add.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Motorcycle Add.png" },
                    { name: "Motorcycle Edit.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Motorcycle Edit.png" }
                ]
            },
            {
                name: "Admin Rental Logs",
                images: [
                    { name: "Rental Logs.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Rental Logs.png" },
                    { name: "Rental Logs-1.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Rental Logs-1.png" },
                    { name: "Rental Logs - Mark as Paid.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Rental Logs - Mark as Paid.png" }
                ]
            },
            {
                name: "Admin Reports",
                images: [
                    { name: "Summary Reports.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Summary Reports.png" },
                    { name: "Summary Reports-1.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Summary Reports-1.png" },
                    { name: "Summary Reports-2.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/Summary Reports-2.png" }
                ]
            },
            {
                name: "Admin Messages",
                images: [
                    { name: "MEssage.png", path: "/images/Projects/UI/3Rent Moto/images/2Admin/MEssage.png" }
                ]
            }
        ]
    },
    {
        id: "ui-4",
        number: "04",
        title: "GENZPEND",
        subtitle: "Financial Literacy App",
        figmaLink: "https://www.figma.com/design/SLk7GdSCXhig54b7g5Dgvh/GENZPEND?node-id=0-1&t=Ts6FjjNgFzaoghp1-1",
        image: "/images/Projects/UI/4GenzPend/Overview.jpg",
        tools: [
            { name: "Figma", icon: "/images/Projects/UI/4GenzPend/tools/Figma.png" },
            { name: "Photoshop", icon: "/images/Projects/UI/4GenzPend/tools/Photoshop.png" },
            { name: "Illustrator", icon: "/images/Projects/UI/4GenzPend/tools/Illustrator.png" },
        ],
        gallery: [
            {
                name: "Starting Page",
                images: [
                    { name: "Starting Page.png", path: "/images/Projects/UI/4GenzPend/1Starting page/Starting Page.png" }
                ]
            },
            {
                name: "Login Page",
                images: [
                    { name: "Starting Page-1.png", path: "/images/Projects/UI/4GenzPend/2Login page/Starting Page-1.png" },
                    { name: "Starting Page-2.png", path: "/images/Projects/UI/4GenzPend/2Login page/Starting Page-2.png" }
                ]
            },
            {
                name: "Home",
                images: [
                    { name: "Home-2.png", path: "/images/Projects/UI/4GenzPend/3Home/Home-2.png" },
                    { name: "Home Below.png", path: "/images/Projects/UI/4GenzPend/3Home/Home Below.png" }
                ]
            },
            {
                name: "Learn",
                images: [
                    { name: "Learn.png", path: "/images/Projects/UI/4GenzPend/4Learn/Learn.png" },
                    { name: "LEARN_ Start Learning.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning.png" },
                    { name: "LEARN_ Start Learning-1.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-1.png" },
                    { name: "LEARN_ Start Learning-2.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-2.png" },
                    { name: "LEARN_ Start Learning-3.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-3.png" },
                    { name: "LEARN_ Start Learning-4.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-4.png" },
                    { name: "LEARN_ Start Learning-5.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-5.png" },
                    { name: "LEARN_ Start Learning-6.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-6.png" },
                    { name: "LEARN_ Start Learning-7.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-7.png" },
                    { name: "LEARN_ Start Learning-8.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-8.png" },
                    { name: "LEARN_ Start Learning-9.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-9.png" },
                    { name: "LEARN_ Start Learning-10.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-10.png" },
                    { name: "LEARN_ Start Learning-11.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-11.png" },
                    { name: "LEARN_ Start Learning-12.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-12.png" },
                    { name: "LEARN_ Start Learning-13.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-13.png" },
                    { name: "LEARN_ Start Learning-14.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-14.png" },
                    { name: "LEARN_ Start Learning-15.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-15.png" },
                    { name: "LEARN_ Start Learning-16.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-16.png" },
                    { name: "LEARN_ Start Learning-17.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-17.png" },
                    { name: "LEARN_ Start Learning-18.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-18.png" },
                    { name: "LEARN_ Start Learning-19.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-19.png" },
                    { name: "LEARN_ Start Learning-20.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-20.png" },
                    { name: "LEARN_ Start Learning-21.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-21.png" },
                    { name: "LEARN_ Start Learning-22.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Start Learning-22.png" },
                    { name: "LEARN_ Ive Read and Unserstand.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Ive Read and Unserstand.png" },
                    { name: "LEARN_ Ive Read and Unserstand-1.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Ive Read and Unserstand-1.png" },
                    { name: "LEARN_ Ive Read and Unserstand-2.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Ive Read and Unserstand-2.png" },
                    { name: "LEARN_ Ive Read and Unserstand-3.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Ive Read and Unserstand-3.png" },
                    { name: "LEARN_ Ive Read and Unserstand-4.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Ive Read and Unserstand-4.png" },
                    { name: "LEARN_ Ive Read and Unserstand-5.png", path: "/images/Projects/UI/4GenzPend/4Learn/LEARN_ Ive Read and Unserstand-5.png" }
                ]
            },
            {
                name: "Track",
                images: [
                    { name: "Home-1.png", path: "/images/Projects/UI/4GenzPend/5Track/Home-1.png" },
                    { name: "TRACK.png", path: "/images/Projects/UI/4GenzPend/5Track/TRACK.png" },
                    { name: "TRACK-1.png", path: "/images/Projects/UI/4GenzPend/5Track/TRACK-1.png" },
                    { name: "TRACK-2.png", path: "/images/Projects/UI/4GenzPend/5Track/TRACK-2.png" },
                    { name: "TRACK-3.png", path: "/images/Projects/UI/4GenzPend/5Track/TRACK-3.png" },
                    { name: "TRACK-4.png", path: "/images/Projects/UI/4GenzPend/5Track/TRACK-4.png" }
                ]
            },
            {
                name: "Quest",
                images: [
                    { name: "QUEST.png", path: "/images/Projects/UI/4GenzPend/6Quest/QUEST.png" },
                    { name: "QUEST-1.png", path: "/images/Projects/UI/4GenzPend/6Quest/QUEST-1.png" }
                ]
            },
            {
                name: "Resources",
                images: [
                    { name: "Home-3.png", path: "/images/Projects/UI/4GenzPend/7Resources/Home-3.png" }
                ]
            },
            {
                name: "Profile",
                images: [
                    { name: "Home-4.png", path: "/images/Projects/UI/4GenzPend/8Profile/Home-4.png" },
                    { name: "Home-5.png", path: "/images/Projects/UI/4GenzPend/8Profile/Home-5.png" },
                    { name: "Home-6.png", path: "/images/Projects/UI/4GenzPend/8Profile/Home-6.png" },
                    { name: "Home-7.png", path: "/images/Projects/UI/4GenzPend/8Profile/Home-7.png" }
                ]
            }
        ]
    },
    {
        id: "ui-5",
        number: "05",
        title: "Skye Paddle",
        subtitle: "Padel Booking & Management System",
        figmaLink: "https://www.figma.com/design/KE8S36CyreMa6q2JIZwZ1J/UI-Design?node-id=669-18&t=gCYzRSHq6oCaxWQ7-1",
        image: "/images/Projects/UI/5Skye Paddle/Overview.jpg",
        tools: [
            { name: "Figma", icon: "/images/Projects/UI/5Skye Paddle/tools/Figma.png" },
            { name: "Photoshop", icon: "/images/Projects/UI/5Skye Paddle/tools/Photoshop.png" },
            { name: "Illustrator", icon: "/images/Projects/UI/5Skye Paddle/tools/Illustrator.png" },
        ],
        gallery: [
            // Customer Categories
            {
                userType: "Customer",
                name: "1Starting page",
                images: [
                    { name: "Login Page-1.png", path: "/images/Projects/UI/5Skye Paddle/Customer/1Starting page/Login Page-1.png" }
                ]
            },
            {
                userType: "Customer",
                name: "2Login page",
                images: [
                    { name: "Login Page.png", path: "/images/Projects/UI/5Skye Paddle/Customer/2Login page/Login Page.png" }
                ]
            },
            {
                userType: "Customer",
                name: "3Book",
                images: [
                    { name: "Dashboard.png", path: "/images/Projects/UI/5Skye Paddle/Customer/3Book/Dashboard.png" },
                    { name: "Cart.png", path: "/images/Projects/UI/5Skye Paddle/Customer/3Book/Cart.png" },
                    { name: "Payment.png", path: "/images/Projects/UI/5Skye Paddle/Customer/3Book/Payment.png" },
                    { name: "Confirmation.png", path: "/images/Projects/UI/5Skye Paddle/Customer/3Book/Confirmation.png" },
                    { name: "Profile Guest.png", path: "/images/Projects/UI/5Skye Paddle/Customer/3Book/Profile Guest.png" }
                ]
            },
            {
                userType: "Customer",
                name: "4OpenPlay",
                images: [
                    { name: "Open Play.png", path: "/images/Projects/UI/5Skye Paddle/Customer/4OpenPlay/Open Play.png" },
                    { name: "Open Play-1.png", path: "/images/Projects/UI/5Skye Paddle/Customer/4OpenPlay/Open Play-1.png" },
                    { name: "Join Open Play.png", path: "/images/Projects/UI/5Skye Paddle/Customer/4OpenPlay/Join Open Play.png" },
                    { name: "Payment Open Play.png", path: "/images/Projects/UI/5Skye Paddle/Customer/4OpenPlay/Payment Open Play.png" },
                    { name: "Confirmation Open Play.png", path: "/images/Projects/UI/5Skye Paddle/Customer/4OpenPlay/Confirmation Open Play.png" }
                ]
            },
            {
                userType: "Customer",
                name: "5Location & Profile",
                images: [
                    { name: "Location & Access.png", path: "/images/Projects/UI/5Skye Paddle/Customer/5Location&Profile/Location & Access.png" },
                    { name: "Profile.png", path: "/images/Projects/UI/5Skye Paddle/Customer/5Location&Profile/Profile.png" }
                ]
            },

            // Admin Categories
            {
                userType: "Admin",
                name: "1Dashboard",
                images: [
                    { name: "Dashboard.png", path: "/images/Projects/UI/5Skye Paddle/Admin/1Dashboard/Dashboard.png" },
                    { name: "Dashboard_Make Payment Booking Fee.png", path: "/images/Projects/UI/5Skye Paddle/Admin/1Dashboard/Dashboard_Make Payment Booking Fee.png" },
                    { name: "Dashboard_Make Payment Booking Fee-1.png", path: "/images/Projects/UI/5Skye Paddle/Admin/1Dashboard/Dashboard_Make Payment Booking Fee-1.png" },
                    { name: "Notification.png", path: "/images/Projects/UI/5Skye Paddle/Admin/1Dashboard/Notification.png" }
                ]
            },
            {
                userType: "Admin",
                name: "2Bookings",
                images: [
                    { name: "Bookings.png", path: "/images/Projects/UI/5Skye Paddle/Admin/2Bookings/Bookings.png" },
                    { name: "Action_Side Panel_Court.png", path: "/images/Projects/UI/5Skye Paddle/Admin/2Bookings/Action_Side Panel_Court.png" },
                    { name: "Action_Side Panel_OPEN PLAY.png", path: "/images/Projects/UI/5Skye Paddle/Admin/2Bookings/Action_Side Panel_OPEN PLAY.png" }
                ]
            },
            {
                userType: "Admin",
                name: "3Courts",
                images: [
                    { name: "Courts.png", path: "/images/Projects/UI/5Skye Paddle/Admin/3Courts/Courts.png" },
                    { name: "Courts_Add New.png", path: "/images/Projects/UI/5Skye Paddle/Admin/3Courts/Courts_Add New.png" },
                    { name: "Courts_Edit.png", path: "/images/Projects/UI/5Skye Paddle/Admin/3Courts/Courts_Edit.png" }
                ]
            },
            {
                userType: "Admin",
                name: "4OpenPlay",
                images: [
                    { name: "Open Play.png", path: "/images/Projects/UI/5Skye Paddle/Admin/4OpenPlay/Open Play.png" },
                    { name: "Add Open Play.png", path: "/images/Projects/UI/5Skye Paddle/Admin/4OpenPlay/Add Open Play.png" },
                    { name: "Edit Open Play.png", path: "/images/Projects/UI/5Skye Paddle/Admin/4OpenPlay/Edit Open Play.png" }
                ]
            },
            {
                userType: "Admin",
                name: "5Payment Gateway",
                images: [
                    { name: "Payment Gateway.png", path: "/images/Projects/UI/5Skye Paddle/Admin/5PaymentGateway/Payment Gateway.png" },
                    { name: "Payment Gateway_ADD.png", path: "/images/Projects/UI/5Skye Paddle/Admin/5PaymentGateway/Payment Gateway_ADD.png" },
                    { name: "Payment Gateway_EDIT.png", path: "/images/Projects/UI/5Skye Paddle/Admin/5PaymentGateway/Payment Gateway_EDIT.png" }
                ]
            },
            {
                userType: "Admin",
                name: "6Location & Access",
                images: [
                    { name: "Location & Access.png", path: "/images/Projects/UI/5Skye Paddle/Admin/6Location&Access/Location & Access.png" }
                ]
            },
            {
                userType: "Admin",
                name: "7New Reservation",
                images: [
                    { name: "New Reservation_Court.png", path: "/images/Projects/UI/5Skye Paddle/Admin/7NewReservation/New Reservation_Court.png" },
                    { name: "Court Reservation.png", path: "/images/Projects/UI/5Skye Paddle/Admin/7NewReservation/Court Reservation.png" },
                    { name: "Court Reservation-1.png", path: "/images/Projects/UI/5Skye Paddle/Admin/7NewReservation/Court Reservation-1.png" },
                    { name: "Court Reservation-2.png", path: "/images/Projects/UI/5Skye Paddle/Admin/7NewReservation/Court Reservation-2.png" },
                    { name: "New Reservation_Open Play.png", path: "/images/Projects/UI/5Skye Paddle/Admin/7NewReservation/New Reservation_Open Play.png" },
                    { name: "New Reservation_Open Play-1.png", path: "/images/Projects/UI/5Skye Paddle/Admin/7NewReservation/New Reservation_Open Play-1.png" },
                    { name: "New Reservation_Open Play-2.png", path: "/images/Projects/UI/5Skye Paddle/Admin/7NewReservation/New Reservation_Open Play-2.png" }
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

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash
            switch (hash) {
                case "#ui-ux": setActiveCategory("UI/UX Designer"); break;
                case "#graphic-artist": setActiveCategory("Graphic Designer"); break;
                case "#social-media": setActiveCategory("Social Media Manager"); break;
                case "#automation": setActiveCategory("Automation"); break;
                case "#frontend": setActiveCategory("Developer"); break;
                case "#3d-cad": setActiveCategory("3D CAD Designer"); break;
            }
        }
        handleHashChange()
        window.addEventListener("hashchange", handleHashChange)
        return () => window.removeEventListener("hashchange", handleHashChange)
    }, [])

    return (
        <section id="projects" className="relative pt-4 md:pt-6 pb-16 md:pb-24">
            {/* Background Glow */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

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

                        {/* Category Pills Bar */}
                        <div className="flex justify-center px-2 md:px-4 w-full">
                            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 p-1.5 bg-white/10 dark:bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-xl shadow-black/20 ring-1 ring-white/10">
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
                                            "relative px-3 py-1.5 md:px-5 md:py-2 text-[11px] md:text-sm font-medium rounded-xl transition-all duration-200 text-center",
                                            activeCategory === category
                                                ? "text-white bg-primary font-semibold shadow-md shadow-primary/30"
                                                : "text-zinc-200 hover:text-white hover:bg-white/15"
                                        )}
                                    >
                                        <span className="md:hidden">
                                            {category === "UI/UX Designer" ? "UI/UX" :
                                                category === "Graphic Designer" ? "Graphics" :
                                                    category === "Social Media Manager" ? "Socials" :
                                                        category === "Automation" ? "Automation" :
                                                            category === "Developer" ? "Dev" :
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
                                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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
                                ) : activeCategory === "Automation" ? (
                                    <Automation />
                                ) : activeCategory === "Developer" ? (
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
