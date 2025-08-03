"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CheckCircle, Mail, ArrowLeft, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Confetti } from "@/components/confetti"
import { Ripple } from "@/components/ripple"
import { FallingStars } from "@/components/falling-stars"

export default function VerifyPage() {
  const [email, setEmail] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState("")
  const [responseType, setResponseType] = useState<'success' | 'error'>('success')
  
  const params = useParams()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Extract token from params (for /verify/token) or query params (for /verify?token=token)
  const token = searchParams.get('token') || (params?.token ? (Array.isArray(params.token) ? params.token.join('/') : params.token) : null)

  // Function to extract email from token
  const extractEmailFromToken = (token: string): string => {
    try {
      // In a real implementation, you would decode the JWT token
      // For JWT tokens, you would typically use a library like jose or jsonwebtoken
      // Here's a mock implementation that assumes the token contains email info
      
      // If it's a JWT token, it would look like: header.payload.signature
      const parts = token.split('.')
      if (parts.length === 3) {
        // Decode JWT payload (base64)
        try {
          const payload = JSON.parse(atob(parts[1]))
          return payload.email || payload.sub || ""
        } catch (e) {
          console.error('Error decoding JWT:', e)
        }
      }
      
      // If it's a simple base64 encoded email
      try {
        const decoded = atob(token)
        // Check if it looks like an email
        if (decoded.includes('@')) {
          return decoded
        }
      } catch (e) {
        console.error('Error decoding base64:', e)
      }
      
      // Fallback: return empty string if we can't extract email
      return ""
    } catch (error) {
      console.error('Error extracting email from token:', error)
      return ""
    }
  }

  // Verify token and get user data
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerificationStatus('error')
        setErrorMessage('Invalid verification link')
        setIsLoading(false)
        return
      }

      try {
        // Make API call to verify token with GET request and token as query parameter
        const response = await fetch(`http://backend.easyply.in/verify?token=${encodeURIComponent(token)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed')
        }

        // Extract email and response type from backend response
        const userEmail = data.email
        const responseStatus = data.type // 'success' or 'error'
        
        setEmail(userEmail)
        setResponseType(responseStatus)
        
        if (responseStatus === 'success') {
          setVerificationStatus('success')
          
          // Trigger confetti after successful verification
          setTimeout(() => {
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 100)
          }, 500)
        } else {
          setVerificationStatus('error')
          setErrorMessage(data.message || 'Verification failed')
        }
        
      } catch (error) {
        console.error('Verification error:', error)
        setVerificationStatus('error')
        setErrorMessage(error instanceof Error ? error.message : 'Verification failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [token])

  const handleResendEmail = async () => {
    if (!email) {
      toast({
        title: "Email not found",
        description: "Please try joining the waitlist again.",
        duration: 5000,
        variant: "destructive",
      })
      return
    }

    try {
      // Make API call to resend verification email
      const response = await fetch('http://backend.easyply.in/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to resend email')
      }

      toast({
        title: "Verification email sent!",
        description: "Check your inbox for the verification link.",
        duration: 5000,
      })
    } catch (error) {
      toast({
        title: "Failed to resend email",
        description: "Please try again later.",
        duration: 5000,
        variant: "destructive",
      })
    }
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
            {isLoading ? (
              // Loading State
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
                    VERIFYING...
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
                  We're verifying your email and setting up your waitlist account.
                </motion.p>
              </>
            ) : verificationStatus === 'success' && responseType === 'success' ? (
              // Success State
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
                    <Sparkles className="w-4 h-4 mr-2" />
                    SUCCESSFULLY VERIFIED
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                    Welcome to the
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent">
                    waitlist!
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Congratulations! Your email{" "}
                  <span className="text-lime-400 font-medium">{email}</span>{" "}
                  has been successfully verified and added to our waitlist. You'll be among the first to know when we launch!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Card className="bg-gray-900/40 border-gray-800 backdrop-blur-sm p-6 mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-lime-400" />
                      <h3 className="text-lg font-semibold text-white">You're all set!</h3>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm">
                      We'll notify you via email when Easyply is ready to launch. Keep an eye on your inbox!
                    </p>
                    <Link href="/">
                      <Button className="bg-lime-400 text-black hover:bg-lime-300 font-semibold px-6">
                        Back to Home
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              </>
            ) : (
              // Error State (handles both verificationStatus === 'error' and responseType === 'error')
              <>
                <motion.div
                  className="mb-8 flex justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                >
                  <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-4xl">❌</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Badge className="mb-6 bg-red-500/10 text-red-400 border-red-500/20 backdrop-blur-sm px-4 py-2">
                    {verificationStatus === 'error' ? 'VERIFICATION FAILED' : 'REQUEST FAILED'}
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                    Something went
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                    wrong
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {errorMessage || "We couldn't process your request. Please try again or contact support."}
                  {email && (
                    <>
                      <br />
                      <span className="text-gray-400 text-lg mt-2 block">
                        Email: <span className="text-red-400">{email}</span>
                      </span>
                    </>
                  )}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="space-y-4"
                >
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Link href="/">
                      <Button className="bg-lime-400 text-black hover:bg-lime-300 font-semibold px-8">
                        Try Again
                      </Button>
                    </Link>
                    {email && (
                      <Button
                        onClick={handleResendEmail}
                        variant="outline"
                        className="border-lime-400/30 text-lime-400 hover:bg-lime-400/10 hover:border-lime-400/50 bg-transparent"
                      >
                        Resend Email
                      </Button>
                    )}
                  </div>
                </motion.div>
              </>
            )}
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
