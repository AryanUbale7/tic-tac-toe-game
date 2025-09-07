"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Board } from "@/components/Board"
import { Scoreboard } from "@/components/Scoreboard"
import { Controls } from "@/components/Controls"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import confetti from "canvas-confetti"

export type Player = "X" | "O" | null
export type GameMode = "single" | "two-player"

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")
  const [gameMode, setGameMode] = useState<GameMode>("two-player")
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })
  const [winner, setWinner] = useState<Player | "draw" | null>(null)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [gameActive, setGameActive] = useState(true)
  const { theme, setTheme } = useTheme()

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ]

  const checkWinner = (squares: Player[]) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: combination }
      }
    }
    return null
  }

  const makeMove = (index: number) => {
    if (board[index] || !gameActive || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result.winner)
      setWinningLine(result.line)
      setGameActive(false)
      setScores((prev) => ({ ...prev, [result.winner!]: prev[result.winner!] + 1 }))

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } else if (newBoard.every((square) => square !== null)) {
      setWinner("draw")
      setGameActive(false)
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")

      // AI move for single player mode
      if (gameMode === "single" && currentPlayer === "X") {
        setTimeout(() => makeAIMove(newBoard), 500)
      }
    }
  }

  const makeAIMove = (currentBoard: Player[]) => {
    const availableMoves = currentBoard
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null) as number[]

    if (availableMoves.length === 0) return

    // Simple AI: random move
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]
    const newBoard = [...currentBoard]
    newBoard[randomMove] = "O"
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result.winner)
      setWinningLine(result.line)
      setGameActive(false)
      setScores((prev) => ({ ...prev, [result.winner!]: prev[result.winner!] + 1 }))

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } else if (newBoard.every((square) => square !== null)) {
      setWinner("draw")
      setGameActive(false)
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
    } else {
      setCurrentPlayer("X")
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setWinningLine(null)
    setGameActive(true)
  }

  const switchMode = () => {
    setGameMode(gameMode === "single" ? "two-player" : "single")
    resetGame()
  }

  return (
    <div className="min-h-screen game-gradient flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto space-y-6"
      >
        {/* Header with theme toggle */}
        <div className="flex justify-between items-center">
          <motion.h1
            className="text-4xl font-bold text-center text-foreground"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Tic Tac Toe
          </motion.h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="glassmorphism"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Scoreboard */}
        <Scoreboard scores={scores} currentPlayer={gameActive ? currentPlayer : null} />

        {/* Game Board */}
        <Board board={board} onSquareClick={makeMove} winningLine={winningLine} />

        {/* Game Status */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center glassmorphism p-4 rounded-lg"
            >
              <h2 className="text-2xl font-bold">{winner === "draw" ? "It's a Draw!" : `Player ${winner} Wins!`}</h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <Controls gameMode={gameMode} onReset={resetGame} onSwitchMode={switchMode} />
      </motion.div>
    </div>
  )
}
