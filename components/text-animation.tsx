"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TextAnimationProps {
  words: string[]
  duration?: number
  className?: string
}

export function TextAnimation({ words = [""], duration = 3000, className = "" }: TextAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  // Only show two words at a time, alternating between them
  const currentWord = words[currentIndex % words.length]
  const nextWord = words[(currentIndex + 1) % words.length]

  return (
    <div className="relative inline-block overflow-hidden" style={{ minHeight: "1.2em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "tween"
          }}
          className={`inline-block ${className}`}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
