"use client"

import { motion } from "framer-motion"
import type { Player } from "@/app/page"

interface SquareProps {
  value: Player
  onClick: () => void
  isWinning: boolean
}

export function Square({ value, onClick, isWinning }: SquareProps) {
  return (
    <motion.button
      className={`
        w-20 h-20 glassmorphism rounded-xl flex items-center justify-center text-4xl font-bold
        transition-all duration-200 hover:scale-105 active:scale-95
        ${isWinning ? "winning-line" : ""}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {value && (
        <motion.span
          className={value === "X" ? "glow-x" : "glow-o"}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  )
}
