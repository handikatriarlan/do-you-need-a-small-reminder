import { useState } from "react"

interface BreathingBubbleProps {
  onOpen?: () => void
}

export function BreathingBubble({ onOpen }: BreathingBubbleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">(
    "inhale"
  )

  const handleOpen = () => {
    setIsOpen(true)
    setBreathPhase("inhale")
    onOpen?.()
    startBreathingCycle()
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const startBreathingCycle = () => {
    // Inhale for 4s, hold for 4s, exhale for 4s
    setBreathPhase("inhale")

    const holdTimer = setTimeout(() => setBreathPhase("hold"), 4000)
    const exhaleTimer = setTimeout(() => setBreathPhase("exhale"), 8000)
    const resetTimer = setTimeout(() => setBreathPhase("inhale"), 12000)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(exhaleTimer)
      clearTimeout(resetTimer)
    }
  }

  const getPhaseText = () => {
    switch (breathPhase) {
      case "inhale":
        return "breathe in..."
      case "hold":
        return "hold..."
      case "exhale":
        return "breathe out..."
    }
  }

  return (
    <>
      {/* Floating bubble in corner */}
      <button
        onClick={handleOpen}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-12 h-12 rounded-full bg-gradient-to-br from-soft-blue to-lavender animate-breathe shadow-lg flex items-center justify-center z-30 hover:scale-105 transition-transform"
        aria-label="Open breathing exercise"
        style={{
          background: "linear-gradient(135deg, #e8f4ff 0%, #f5e6ff 100%)",
        }}
      >
        <span className="text-lg">🫧</span>
      </button>

      {/* Breathing overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 breathing-overlay z-50 flex flex-col items-center justify-center p-6"
          onClick={handleClose}
        >
          <div
            className="flex flex-col items-center gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-medium text-foreground/80">
              breathe with me 🌬️
            </h2>

            {/* Breathing circle */}
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
                breathPhase === "inhale"
                  ? "scale-125"
                  : breathPhase === "hold"
                  ? "scale-125"
                  : "scale-100"
              }`}
              style={{
                background:
                  "radial-gradient(circle, rgba(200, 180, 255, 0.4) 0%, rgba(255, 228, 236, 0.2) 70%)",
              }}
            >
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-[4000ms] ease-in-out ${
                  breathPhase === "inhale"
                    ? "scale-110"
                    : breathPhase === "hold"
                    ? "scale-110"
                    : "scale-90"
                }`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(200, 180, 255, 0.6) 0%, rgba(255, 228, 236, 0.3) 70%)",
                }}
              />
            </div>

            <p
              className="text-xl font-medium text-foreground/70 animate-fade-in"
              key={breathPhase}
            >
              {getPhaseText()}
            </p>

            <button
              onClick={handleClose}
              className="soft-button px-6 py-2 rounded-full bg-white/50 text-foreground/70 text-sm hover:bg-white/70 transition-colors"
            >
              close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
