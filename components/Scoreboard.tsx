"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { Player } from "@/app/page"

interface ScoreboardProps {
  scores: { X: number; O: number; draws: number }
  currentPlayer: Player | null
}

export function Scoreboard({ scores, currentPlayer }: ScoreboardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <Card className={`glassmorphism ${currentPlayer === "X" ? "ring-2 ring-red-400" : ""}`}>
          <CardContent className="p-4 text-center">
            <div className="glow-x text-2xl font-bold mb-1">X</div>
            <div className="text-sm text-muted-foreground">Player X</div>
            <div className="text-xl font-bold">{scores.X}</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="glassmorphism">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1 text-yellow-400">⚊</div>
            <div className="text-sm text-muted-foreground">Draws</div>
            <div className="text-xl font-bold">{scores.draws}</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <Card className={`glassmorphism ${currentPlayer === "O" ? "ring-2 ring-blue-400" : ""}`}>
          <CardContent className="p-4 text-center">
            <div className="glow-o text-2xl font-bold mb-1">O</div>
            <div className="text-sm text-muted-foreground">Player O</div>
            <div className="text-xl font-bold">{scores.O}</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
