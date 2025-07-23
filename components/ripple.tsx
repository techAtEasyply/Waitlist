"use client"

import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 top-0 select-none overflow-hidden", className)}
      style={{ height: "60vh" }}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70
        const opacity = mainCircleOpacity - i * 0.03
        const animationDelay = `${i * 0.06}s`
        return (
          <div
            key={i}
            className="absolute rounded-full border border-white/20 animate-ripple"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.max(opacity, 0.02),
                animationDelay,
                top: "0",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
})

Ripple.displayName = "Ripple"
