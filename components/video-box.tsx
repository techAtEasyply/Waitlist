/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out"

interface HeroVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
}

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const selectedAnimation = animationVariants[animationStyle]

  return (
    <div className={cn("relative", className)}>
      <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-[1.06]" onClick={() => setIsVideoOpen(true)}>
        <img
          src={thumbnailSrc || "/placeholder.svg"}
          alt={thumbnailAlt}
          width={800}
          height={450}
          className="w-full aspect-video rounded-xl border-0 shadow-2xl transition-all duration-300 ease-out group-hover:brightness-[0.8] backdrop-blur-sm"
        />
        <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-xl transition-all duration-300 ease-out group-hover:scale-100">
          <div className="flex size-28 items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-gray-600/30 group-hover:border-gray-500/50 transition-all duration-300">
            <div className="relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-gray-700/40 to-gray-800/60 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:shadow-gray-800/30">
              <Play
                className="size-8 scale-100 fill-white text-white transition-transform duration-300 ease-out group-hover:scale-105"
                style={{
                  filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-600/0 via-gray-600/5 to-gray-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsVideoOpen(false)}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              {...selectedAnimation}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
            >
              <motion.button
                className="absolute -top-16 right-0 rounded-full bg-gray-900/80 p-2 text-xl text-white ring-1 ring-gray-700 backdrop-blur-md hover:bg-lime-400/20 hover:ring-lime-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <XIcon className="size-5" />
              </motion.button>
              <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-lime-400/30 shadow-2xl shadow-lime-400/10">
                <iframe
                  src={videoSrc}
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
