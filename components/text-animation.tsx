"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TextAnimationProps {
  words: string[]
  duration?: number
  className?: string
}

export function TextAnimation({ words = [""], duration = 3000, className = "" }: TextAnimationProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className="relative h-[1.2em] overflow-hidden inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: -100, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: 100, opacity: 0, rotateX: 90 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
          }}
          className={`absolute inset-0 ${className}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
