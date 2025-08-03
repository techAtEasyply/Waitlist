"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { Ripple } from "@/components/ripple"
import { FallingStars } from "@/components/falling-stars"

export default function WaitlistPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState("")
  const [token, setToken] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get email parameter - useSearchParams automatically handles URL decoding
  const [email, setEmail] = useState<string | null>(null)
  
  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      // Explicitly decode the parameter to handle cases where Next.js doesn't auto-decode
      const decodedEmail = decodeURIComponent(emailParam)
      setEmail(decodedEmail)
      console.log('Raw email parameter:', emailParam)
      console.log('Decoded email parameter:', decodedEmail)
    } else {
      setEmail(null)
      console.log('No email parameter found')
    }
  }, [searchParams])

  const { toast } = useToast()

  useEffect(() => {
    const joinWaitlist = async () => {
      if (!email) {
        setStatus('error')
        setErrorMessage('Email is required')
        return
      }

      try {
        const response = await fetch('http://backend.easyply.in/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to join waitlist')
        }

        // Extract token from response
        const responseToken = data.token
        setToken(responseToken)
        setStatus('success')

        // Show success message briefly before redirecting
        toast({
          title: "Success!",
          description: "Redirecting to verification...",
          duration: 2000,
        })

        // Redirect to verify page after 2 seconds
        setTimeout(() => {
          router.push(`/verify/${responseToken}`)
        }, 2000)

      } catch (error) {
        console.error('Error joining waitlist:', error)
        setStatus('error')
        setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      }
    }

    joinWaitlist()
  }, [email, router, toast])

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
              <span>←</span>
              Back to home
            </Link>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            {status === 'loading' && (
              <>
                <motion.div
                  className="mb-8 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Loader2 className="w-24 h-24 text-lime-400 animate-spin" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Badge className="mb-6 bg-lime-400/10 text-lime-400 border-lime-400/20 backdrop-blur-sm px-4 py-2">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    JOINING WAITLIST...
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                    Please wait...
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  We're adding{" "}
                  <span className="text-lime-400 font-medium">{email}</span>{" "}
                  to our waitlist. This will only take a moment.
                </motion.p>
              </>
            )}

            {status === 'success' && (
              <>
                <motion.div
                  className="mb-8 flex justify-center"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-24 h-24 text-lime-400" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Badge className="mb-6 bg-lime-400/10 text-lime-400 border-lime-400/20 backdrop-blur-sm px-4 py-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    SUCCESS
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent">
                    Welcome aboard!
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Successfully added{" "}
                  <span className="text-lime-400 font-medium">{email}</span>{" "}
                  to the waitlist. Redirecting to verification...
                </motion.p>
              </>
            )}

            {status === 'error' && (
              <>
                <motion.div
                  className="mb-8 flex justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                >
                  <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Badge className="mb-6 bg-red-500/10 text-red-400 border-red-500/20 backdrop-blur-sm px-4 py-2">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    ERROR
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                    Oops!
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {errorMessage}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Link href="/">
                    <Button className="bg-lime-400 text-black hover:bg-lime-300 font-semibold px-8">
                      Try Again
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <Toaster />
    </div>
  )
}
