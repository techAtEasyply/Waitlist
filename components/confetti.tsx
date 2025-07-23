"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
  velocity: { x: number; y: number }
}

export function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (trigger) {
      const newPieces: ConfettiPiece[] = []
      const colors = ["#a3e635", "#ffffff", "#22c55e", "#fbbf24", "#f472b6"]

      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight / 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          rotation: Math.random() * 360,
          velocity: {
            x: (Math.random() - 0.5) * 10,
            y: Math.random() * -15 - 5,
          },
        })
      }

      setPieces(newPieces)

      // Clear confetti after animation
      setTimeout(() => setPieces([]), 3000)
    }
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              backgroundColor: piece.color,
              width: piece.size,
              height: piece.size,
              borderRadius: "2px",
            }}
            initial={{
              x: piece.x,
              y: piece.y,
              rotate: piece.rotation,
              opacity: 1,
            }}
            animate={{
              x: piece.x + piece.velocity.x * 100,
              y: piece.y + piece.velocity.y * 50 + 1000,
              rotate: piece.rotation + 720,
              opacity: 0,
            }}
            transition={{
              duration: 3,
              ease: "easeOut",
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
