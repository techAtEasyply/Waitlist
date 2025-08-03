"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CheckCircle, Mail, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { Confetti } from "@/components/confetti"
import { Ripple } from "@/components/ripple"
import { FallingStars } from "@/components/falling-stars"

export default function VerifyPage() {
  const [email, setEmail] = useState("user@example.com")
  const [showConfetti, setShowConfetti] = useState(false)
  const { toast } = useToast()
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Trigger confetti on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 100)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleResendEmail = () => {
    toast({
      title: "Verification email sent!",
      description: "Check your inbox for the verification link.",
      duration: 5000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <Ripple mainCircleSize={300} mainCircleOpacity={0.15} numCircles={8} className="opacity-60" />
      <FallingStars />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Animated gradients */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% ${backgroundY}, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)`,
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 30% 70%, rgba(163,230,53,0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 30%, rgba(163,230,53,0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(163,230,53,0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 70%, rgba(163,230,53,0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-24 h-24 text-lime-400" />
            </motion.div>

            {/* Success Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Badge className="mb-6 bg-lime-400/10 text-lime-400 border-lime-400/20 backdrop-blur-sm px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                SUCCESSFULLY JOINED
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                You're on the
              </span>
              <br />
              <span className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent">
                waitlist!
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Thank you for joining! We've sent a verification email to{" "}
              <span className="text-lime-400 font-medium">{email}</span>. Please check your inbox and click the
              verification link.
            </motion.p>

            {/* Email Verification Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Card className="bg-gray-900/40 border-gray-800 backdrop-blur-sm p-6 mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-lime-400" />
                  <h3 className="text-lg font-semibold text-white">Verify your email</h3>
                </div>
                <p className="text-gray-400 mb-4 text-sm">
                  Didn't receive the email? Check your spam folder or request a new one.
                </p>
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="border-lime-400/30 text-lime-400 hover:bg-lime-400/10 hover:border-lime-400/50 bg-transparent"
                >
                  Resend verification email
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confetti */}
      <Confetti trigger={showConfetti} />

      {/* Toast Container */}
      <Toaster />
    </div>
  )
}
