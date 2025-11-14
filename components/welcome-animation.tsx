"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function WelcomeAnimation() {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (!showWelcome) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-nam-navy via-nam-blue to-nam-teal"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="mb-8"
          >
            <img
              src="/images/nam-logo.png"
              alt="NAM - New Age Men"
              className="h-24 w-auto mx-auto filter brightness-0 invert animate-logo-glow"
            />
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.8,
            }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Bem-vindo à
          </motion.h1>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 1.2,
            }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-nam-teal via-nam-gray-light to-nam-light bg-clip-text text-transparent mb-6"
          >
            New Age Men
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 1.8,
            }}
            className="text-xl md:text-2xl text-nam-gray-light font-light"
          >
            Estética e Cuidados Masculinos
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 2.2,
            }}
            className="mt-8 flex justify-center"
          >
            <div className="w-16 h-1 bg-gradient-to-r from-nam-teal to-nam-blue rounded-full"></div>
          </motion.div>
        </div>

        {/* Particles Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [null, -100],
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 3,
              }}
              className="absolute w-2 h-2 bg-nam-teal rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
