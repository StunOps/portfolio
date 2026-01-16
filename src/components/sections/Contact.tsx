"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Mail, MapPin, Phone, Facebook, Linkedin, Instagram, ArrowRight, Send, Loader2, CheckCircle2 } from "lucide-react"

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch("https://formsubmit.co/ajax/stundesign.graphics@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                setIsSuccess(true)
            }
        } catch (error) {
            console.error("Failed to send message", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="relative pt-[1px] pb-32 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none translate-y-1/2" />

            <Container>
                <div className="flex flex-col gap-12">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold">
                                Let's <span className="text-primary">Connect</span>
                            </h2>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto w-full">
                        {/* Left Column: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-8"
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col justify-between gap-8 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="space-y-8 relative z-10">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold">Contact Information</h3>
                                        <p className="text-muted-foreground">Feel free to reach out for collaborations or just a friendly hello.</p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Location */}
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-primary">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">Country</h4>
                                                <p className="text-muted-foreground">Philippines</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-primary">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">Email</h4>
                                                <a href="mailto:stundesign.graphics@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                                                    stundesign.graphics@gmail.com
                                                </a>
                                            </div>
                                        </div>

                                        {/* Whatsapp */}
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-primary">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">Whatsapp</h4>
                                                <p className="text-muted-foreground">09924456533</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Socials */}
                                <div className="relative z-10 space-y-4">
                                    <h4 className="font-semibold text-white">Follow Me</h4>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://www.facebook.com/share/1ABUkugja6/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/stun-opeña-8736ab2b2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/yelnutss/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                        >
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Message Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/5 h-full group">
                                {isSuccess ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 border border-green-500/20">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                                            <p className="text-muted-foreground max-w-xs mx-auto">
                                                Thank you for reaching out. I'll check my inbox and get back to you shortly.
                                            </p>
                                        </div>
                                        <Button onClick={() => setIsSuccess(false)} variant="outline" className="border-white/10 hover:bg-white/5 hover:text-white">
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <form className="flex flex-col gap-6 relative z-10 h-full" onSubmit={handleSubmit}>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold">Send Message</h3>
                                            <p className="text-muted-foreground">I'll get back to you as soon as possible.</p>
                                        </div>

                                        {/* Honey Pot to prevent spam */}
                                        <input type="text" name="_honey" className="hidden" />
                                        <input type="hidden" name="_captcha" value="false" />

                                        <div className="space-y-4 flex-1">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    required
                                                    placeholder="Your name"
                                                    className="bg-white/5 border-white/10 focus:border-primary/50 transition-colors h-12 rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="Your email address"
                                                    className="bg-white/5 border-white/10 focus:border-primary/50 transition-colors h-12 rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    placeholder="What would you like to say?"
                                                    className="bg-white/5 border-white/10 focus:border-primary/50 transition-colors min-h-[150px] rounded-xl resize-none"
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 rounded-xl text-base font-semibold group/btn"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
