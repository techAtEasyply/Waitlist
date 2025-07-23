"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  angle: number
  delay: number
}

export function FallingStars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const createStar = (): Star => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: -20,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 30 - 15, // -15 to 15 degrees
      delay: Math.random() * 2,
    })

    // Create initial stars
    const initialStars = Array.from({ length: 50 }, createStar)
    setStars(initialStars)

    // Add new stars periodically
    const interval = setInterval(() => {
      setStars((prev) => {
        // Remove stars that are off screen
        const activeStars = prev.filter((star) => star.y < window.innerHeight + 100)

        // Add new stars if we need more
        if (activeStars.length < 50) {
          return [...activeStars, createStar()]
        }

        return activeStars
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`,
            }}
            initial={{
              x: star.x,
              y: star.y,
            }}
            animate={{
              x: star.x + Math.sin((star.angle * Math.PI) / 180) * 200,
              y: window.innerHeight + 100,
            }}
            transition={{
              duration: star.speed,
              delay: star.delay,
              ease: "linear",
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Shooting stars */}
      <ShootingStars />
    </div>
  )
}

function ShootingStars() {
  const [shootingStars, setShootingStars] = useState<Star[]>([])

  useEffect(() => {
    const createShootingStar = (): Star => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.3,
      size: Math.random() * 2 + 2,
      opacity: Math.random() * 0.8 + 0.4,
      speed: Math.random() * 1 + 0.8,
      angle: 45,
      delay: 0,
    })

    const interval = setInterval(
      () => {
        const newStar = createShootingStar()
        setShootingStars((prev) => [...prev, newStar])

        // Remove the star after animation
        setTimeout(
          () => {
            setShootingStars((prev) => prev.filter((star) => star.id !== newStar.id))
          },
          newStar.speed * 1000 + 500,
        )
      },
      3000 + Math.random() * 5000,
    ) // Random interval between 3-8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          initial={{
            x: star.x,
            y: star.y,
            opacity: 0,
          }}
          animate={{
            x: star.x + 300,
            y: star.y + 300,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: star.speed,
            ease: "easeOut",
          }}
        >
          {/* Shooting star trail */}
          <div
            className="absolute bg-gradient-to-r from-white to-transparent rounded-full"
            style={{
              width: "60px",
              height: "2px",
              transform: "rotate(45deg)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            }}
          />
          {/* Shooting star head */}
          <div
            className="absolute bg-white rounded-full"
            style={{
              width: star.size,
              height: star.size,
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.9)`,
            }}
          />
        </motion.div>
      ))}
    </>
  )
}
