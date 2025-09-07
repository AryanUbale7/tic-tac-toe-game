"use client"

import { motion } from "framer-motion"
import { Square } from "./Square"
import type { Player } from "@/app/page"

interface BoardProps {
  board: Player[]
  onSquareClick: (index: number) => void
  winningLine: number[] | null
}

export function Board({ board, onSquareClick, winningLine }: BoardProps) {
  return (
    <motion.div
      className="glassmorphism p-6 rounded-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => onSquareClick(index)}
            isWinning={winningLine?.includes(index) || false}
          />
        ))}
      </div>
    </motion.div>
  )
}
