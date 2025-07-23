"use client"

import { cn } from "@/lib/utils"

interface BorderShineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function BorderShine({ 
  children, 
  className, 
  duration = 3,
  ...props 
}: BorderShineProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden group",
        className
      )}
      {...props}
    >
      {children}
      <div 
        className="absolute inset-0 rounded-md pointer-events-none"
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            rgba(163, 230, 53, 0.2) 20%,
            rgba(163, 230, 53, 0.6) 50%,
            rgba(163, 230, 53, 0.2) 80%,
            transparent
          )`,
          backgroundSize: "200% 100%",
          animation: `borderShine ${duration}s linear infinite`,
        }}
      />
      <style jsx>{`
        @keyframes borderShine {
          0% {
            background-position: 200% 0;
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            background-position: -200% 0;
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}
