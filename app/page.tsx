"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Image from "next/image"
import { Plus, Calendar, Users } from "lucide-react"
import { useRef } from "react"
import { Confetti } from "@/components/confetti"
import { RotatingText } from "@/components/rotating-text"
import { Ripple } from "@/components/ripple"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { Footer } from "@/components/footer"
import { HeroVideoDialog } from "@/components/video-box"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 60,
    hours: 13,
    minutes: 22,
    seconds: 19,
  })

  const { toast } = useToast()
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Handle scroll to hide/show brand name
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100) // Hide after scrolling 100px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Show toast notification
      toast({
        title: "Thank you for joining the waitlist!",
        description: "We will get back to you soon.",
        duration: 5000,
      })

      // Trigger confetti
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 100)

      // Clear email
      setEmail("")
    }
  }

  const faqItems = [
    {
      question: "What is Easyply?",
      answer:
        "Easyply is your complete job search companion. We offer AI-powered resume building, ATS score analysis, job matching, interview preparation, and more - all in one platform to streamline your job hunting journey.",
    },
    {
      question: "Is my data secure with Easyply?",
      answer:
        "Absolutely! We use enterprise-grade security measures to protect your personal information and resume data. Your information is encrypted and stored securely, and we never share your data with third parties without your explicit consent.",
    },
    {
      question: "Can Easyply help me practice interviews?",
      answer:
        "Yes! Our AI interview simulator conducts realistic mock interviews tailored to your target role. Get instant feedback on your responses, body language, and speaking pace to boost your confidence before the real interview.",
    },
    {
      question: "Do I need technical skills to use Easyply?",
      answer: "Not at all! Easyply is designed for job seekers of all backgrounds. Our intuitive interface makes it easy to build resumes, analyze ATS scores, and practice interviews - no technical expertise required.",
    },
    {
      question: "What will Easyply cost?",
      answer: "We're currently in development and will announce our pricing plans closer to launch. Join our waitlist to be among the first to know about our pricing and get exclusive early access benefits.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Ripple Background */}
      <Ripple mainCircleSize={300} mainCircleOpacity={0.2} numCircles={10} className="opacity-80" />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Subtle gradient overlays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% ${backgroundY}, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)`,
        }}
      />

      {/* Additional animated gradients */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(163,230,53,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(163,230,53,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(163,230,53,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(163,230,53,0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Top Left Brand Name - Hides on scroll */}
      <motion.div
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50"
        initial={{ opacity: 0, x: -30 }}
        animate={{ 
          opacity: isScrolled ? 0 : 1, 
          x: isScrolled ? -30 : 0,
          pointerEvents: isScrolled ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ 
          position: 'fixed',
          willChange: 'transform, opacity'
        }}
      >
        <h1 className="text-xl md:text-2xl font-bold text-gray-300 select-none">
          Easyply
        </h1>
      </motion.div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          {/* Logo */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="/logo2.png"
              alt="Company Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Badge className="mb-8 bg-lime-400/10 text-lime-400 border-lime-400/20 hover:bg-lime-400/20 backdrop-blur-sm">
              <motion.div
                className="w-2 h-2 bg-lime-400 rounded-full mr-2"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              AVAILABLE IN 2025
            </Badge>
          </motion.div>

          {/* Main heading with TextAnimation */}
          <div className="text-5xl md:text-7xl font-bold mb-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <span className="bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                Join The 
              </span>
              <span className="bg-gradient-to-b from-lime-400 to-lime-500 bg-clip-text text-transparent">
                Waitlist!
              </span>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            className="w-full mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div 
              className="text-xl text-gray-300 leading-relaxed backdrop-blur-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <TextGenerateEffect 
                words="Be amongst the first to experience Easyply. Sign up to be notified when we launch!"
              />
            </motion.div>
          </motion.div>

          {/* Email form with enhanced glowing effect */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div
              className="flex-1 relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-lime-400 transition-all duration-500 backdrop-blur-sm
                  shadow-[0_0_20px_rgba(163,230,53,0.2)]
                  hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] 
                  hover:border-lime-400/70 
                  hover:bg-gray-900/70
                  focus:shadow-[0_0_40px_rgba(163,230,53,0.6)]
                  group-hover:shadow-[0_0_25px_rgba(163,230,53,0.3)]"
                required
              />
              <motion.div
                className="absolute inset-0 rounded-md border border-lime-400/0 pointer-events-none"
                whileHover={{
                  borderColor: "rgba(163,230,53,0.5)",
                  boxShadow: "0 0 20px rgba(163,230,53,0.2)",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button
                type="submit"
                className="bg-lime-400 text-black hover:bg-lime-300 font-semibold px-8 shadow-lg hover:shadow-lime-400/25 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Join waitlist</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-100, 200] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                    ease: "linear",
                  }}
                />
              </Button>
            </motion.div>
          </motion.form>

          {/* Social proof */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-gray-900 overflow-hidden"
                  initial={{ opacity: 0, x: -20, scale: 0 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.1 + i * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.2,
                    zIndex: 10,
                    boxShadow: "0 0 20px rgba(163,230,53,0.3)",
                  }}
                >
                  <Image
                    src={`/avatar${i}.png`}
                    alt={`Avatar ${i}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              Join 100+ others on the waitlist
            </motion.p>
          </motion.div>

          {/* Enhanced Countdown timer */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            {/* Mobile Layout (2x2 Grid) */}
            <div className="block md:hidden">
              {/* First Row: Days and Hours */}
              <div className="flex justify-center items-center gap-4 text-3xl sm:text-4xl font-mono font-bold mb-4">
                {[
                  { value: timeLeft.days.toString(), label: "DAYS" },
                  { value: timeLeft.hours.toString().padStart(2, "0"), label: "HOURS" },
                ].map((item, index) => (
                  <div key={item.label} className="flex items-center">
                    <motion.div className="text-center">
                      <motion.div
                        className="bg-gray-900/60 rounded-lg p-3 border border-gray-800 backdrop-blur-sm relative overflow-hidden"
                        whileHover={{
                          scale: 1.05,
                          borderColor: "rgb(163 230 53 / 0.5)",
                          boxShadow: "0 0 30px rgba(163,230,53,0.2)",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                      >
                        <div className="relative z-10 flex">
                          {item.value.split('').map((digit, digitIndex) => (
                            <div key={digitIndex} className="overflow-hidden">
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={`${item.label}-${digitIndex}-${digit}`}
                                  initial={{ y: -30, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 30, opacity: 0 }}
                                  transition={{ 
                                    duration: 0.4,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                  }}
                                  className="block"
                                >
                                  {digit}
                                </motion.span>
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                      <div className="text-xs text-gray-400 mt-2 font-medium">{item.label}</div>
                    </motion.div>
                    {index < 1 && (
                      <motion.div
                        className="text-gray-600 mx-3 text-3xl sm:text-4xl font-mono flex items-center justify-center"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        style={{ lineHeight: 1, height: "fit-content", transform: "translateY(-8px)" }}
                      >
                        :
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Second Row: Minutes and Seconds */}
              <div className="flex justify-center items-center gap-4 text-3xl sm:text-4xl font-mono font-bold mb-4">
                {[
                  { value: timeLeft.minutes.toString().padStart(2, "0"), label: "MINUTES" },
                  { value: timeLeft.seconds.toString().padStart(2, "0"), label: "SECONDS" },
                ].map((item, index) => (
                  <div key={item.label} className="flex items-center">
                    <motion.div className="text-center">
                      <motion.div
                        className="bg-gray-900/60 rounded-lg p-3 border border-gray-800 backdrop-blur-sm relative overflow-hidden"
                        whileHover={{
                          scale: 1.05,
                          borderColor: "rgb(163 230 53 / 0.5)",
                          boxShadow: "0 0 30px rgba(163,230,53,0.2)",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                      >
                        <div className="relative z-10 flex">
                          {item.value.split('').map((digit, digitIndex) => (
                            <div key={digitIndex} className="overflow-hidden">
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={`${item.label}-${digitIndex}-${digit}`}
                                  initial={{ y: -30, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 30, opacity: 0 }}
                                  transition={{ 
                                    duration: 0.4,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                  }}
                                  className="block"
                                >
                                  {digit}
                                </motion.span>
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                      <div className="text-xs text-gray-400 mt-2 font-medium">{item.label}</div>
                    </motion.div>
                    {index < 1 && (
                      <motion.div
                        className="text-gray-600 mx-3 text-3xl sm:text-4xl font-mono flex items-center justify-center"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        style={{ lineHeight: 1, height: "fit-content", transform: "translateY(-8px)" }}
                      >
                        :
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout (Single Row) */}
            <div className="hidden md:flex justify-center items-center gap-2 text-4xl md:text-6xl font-mono font-bold mb-4 flex-wrap">
              {[
                { value: timeLeft.days.toString(), label: "DAYS" },
                { value: timeLeft.hours.toString().padStart(2, "0"), label: "HOURS" },
                { value: timeLeft.minutes.toString().padStart(2, "0"), label: "MINUTES" },
                { value: timeLeft.seconds.toString().padStart(2, "0"), label: "SECONDS" },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center">
                  <motion.div className="text-center">
                    <motion.div
                      className="bg-gray-900/60 rounded-lg p-4 border border-gray-800 backdrop-blur-sm relative overflow-hidden"
                      whileHover={{
                        scale: 1.05,
                        borderColor: "rgb(163 230 53 / 0.5)",
                        boxShadow: "0 0 30px rgba(163,230,53,0.2)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                    >
                      <div className="relative z-10 flex">
                        {item.value.split('').map((digit, digitIndex) => (
                          <div key={digitIndex} className="overflow-hidden">
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={`${item.label}-${digitIndex}-${digit}`}
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 30, opacity: 0 }}
                                transition={{ 
                                  duration: 0.4,
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25
                                }}
                                className="block"
                              >
                                {digit}
                              </motion.span>
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    <div className="text-xs text-gray-400 mt-2 font-medium">{item.label}</div>
                  </motion.div>
                  {index < 3 && (
                    <motion.div
                      className="text-gray-600 mx-2 text-4xl md:text-6xl font-mono flex items-center justify-center"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      style={{ lineHeight: 1, height: "fit-content", transform: "translateY(-8px)" }}
                    >
                      :
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            
            <motion.div
              className="flex items-center justify-center gap-2 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.9 }}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">LEFT UNTIL FULL RELEASE</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Video Section */}
        <ScrollRevealSection>
          <div className="container mx-auto px-4 py-16">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                See It In Action
              </h2>
              <motion.div 
                className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <TextGenerateEffect 
                  words="Watch how Easyply transforms the way you manage waitlists and engage with your audience."
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Decorative glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-gray-600/20 via-transparent to-gray-600/20 rounded-3xl blur-xl" />
                <div className="relative">
                  <HeroVideoDialog
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/6a3Dz8gwjdg"
                    thumbnailSrc="https://i.ytimg.com/vi/6a3Dz8gwjdg/maxresdefault.jpg"
                    thumbnailAlt="Easyply Demo Video"
                    className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-gray-600/10 transition-all duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollRevealSection>

        {/* FAQ Section */}
        <ScrollRevealSection>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  Frequently asked questions
                </h2>
                <motion.div 
                  className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <TextGenerateEffect 
                    words="Everything you need to know about Easyply. Find answers to the most common questions below."
                  />
                </motion.div>
              </motion.div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FAQItem question={item.question} answer={item.answer} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollRevealSection>

        {/* Footer */}
        <Footer />
      </div>

      {/* Confetti Component */}
      <Confetti trigger={showConfetti} />

      {/* Toast Container */}
      <Toaster />
    </div>
  )
}

function ScrollRevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div layout whileHover={!isOpen ? { scale: 1.01 } : {}} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={`bg-gray-900/40 border-gray-800 transition-all duration-300 overflow-hidden ${isOpen ? 'backdrop-blur-0' : 'backdrop-blur-sm hover:backdrop-blur-sm'} hover:border-gray-700 hover:bg-gray-900/60`}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex items-center justify-between group"
          whileHover={{ backgroundColor: "rgba(75, 85, 99, 0.1)" }}
        >
          <span className="text-lg font-medium text-white group-hover:text-lime-400 transition-colors">{question}</span>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <Plus className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
          </motion.div>
        </motion.button>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {isOpen && (
            <div className="px-6 pb-6">
              <motion.p
                className="text-gray-300 leading-relaxed"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {answer}
              </motion.p>
            </div>
          )}
        </motion.div>
      </Card>
    </motion.div>
  )
}
