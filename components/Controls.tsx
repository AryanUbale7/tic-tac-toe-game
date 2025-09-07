"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RotateCcw, Users, User } from "lucide-react"
import type { GameMode } from "@/app/page"

interface ControlsProps {
  gameMode: GameMode
  onReset: () => void
  onSwitchMode: () => void
}

export function Controls({ gameMode, onReset, onSwitchMode }: ControlsProps) {
  return (
    <motion.div
      className="flex gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        onClick={onReset}
        className="glassmorphism hover:scale-105 transition-transform bg-transparent"
        variant="outline"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset Game
      </Button>

      <Button
        onClick={onSwitchMode}
        className="glassmorphism hover:scale-105 transition-transform bg-transparent"
        variant="outline"
      >
        {gameMode === "single" ? (
          <>
            <Users className="w-4 h-4 mr-2" />
            Two Player
          </>
        ) : (
          <>
            <User className="w-4 h-4 mr-2" />
            Single Player
          </>
        )}
      </Button>
    </motion.div>
  )
}
