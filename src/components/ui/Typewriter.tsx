"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"

interface TypewriterProps {
    text: string | string[]
    speed?: number
    waitTime?: number
    deleteSpeed?: number
    loop?: boolean
    className?: string
    cursorClassName?: string
}

export function Typewriter({
    text,
    speed = 0.05,
    waitTime = 2000,
    deleteSpeed = 0.03,
    loop = true,
    className,
    cursorClassName,
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [textIndex, setTextIndex] = useState(0)

    const textArray = Array.isArray(text) ? text : [text]
    const currentText = textArray[textIndex % textArray.length]

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const handleTyping = () => {
            if (isDeleting) {
                // Deleting logic
                if (displayedText.length > 0) {
                    setDisplayedText(currentText.substring(0, displayedText.length - 1))
                    timeout = setTimeout(handleTyping, deleteSpeed * 1000)
                } else {
                    // Finished deleting, move to next text
                    setIsDeleting(false)
                    setTextIndex((prev) => prev + 1)
                    timeout = setTimeout(handleTyping, 500)
                }
            } else {
                // Typing logic
                if (displayedText.length < currentText.length) {
                    setDisplayedText(currentText.substring(0, displayedText.length + 1))
                    timeout = setTimeout(handleTyping, speed * 1000)
                } else {
                    // Finished typing, wait before deleting
                    if (loop || textIndex < textArray.length - 1) {
                        timeout = setTimeout(() => setIsDeleting(true), waitTime)
                    }
                }
            }
        }

        timeout = setTimeout(handleTyping, 100)

        return () => clearTimeout(timeout)
    }, [displayedText, isDeleting, textIndex, currentText, speed, waitTime, deleteSpeed, loop, textArray.length])

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className={cursorClassName || "inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"}
            />
        </span>
    )
}
