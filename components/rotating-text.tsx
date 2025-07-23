"use client"

import { useEffect, useState } from "react"

interface RotatingTextProps {
  words: string[]
  duration?: number
  className?: string
}

export function RotatingText({ 
  words = [""], 
  duration = 3000,
  className = "" 
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (words.length <= 1) return

    // Start the animation sequence
    const timer = setInterval(() => {
      // Fade out current word
      setIsVisible(false)
      
      // After fade out, change word and fade in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        setIsVisible(true)
      }, 500) // Half of the animation duration for fade out
      
    }, duration)

    return () => clearInterval(timer)
  }, [words, duration])

  const currentWord = words[currentIndex]

  return (
    <span 
      className={`inline-block transition-all duration-500 ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      {currentWord}
    </span>
  )
}
