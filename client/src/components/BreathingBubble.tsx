import { useState, useEffect, useCallback, useRef } from "react"

export function BreathingBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [breathPhase, setBreathPhase] = useState<
    "inhale" | "hold" | "exhale" | "rest"
  >("inhale")
  const [cycleCount, setCycleCount] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setBreathPhase("inhale")
    setCycleCount(0)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [])

  // Breathing cycle effect
  useEffect(() => {
    if (!isOpen) return

    const runCycle = () => {
      // Inhale 4s -> Hold 4s -> Exhale 6s -> Rest 2s
      setBreathPhase("inhale")

      timerRef.current = setTimeout(() => {
        setBreathPhase("hold")

        timerRef.current = setTimeout(() => {
          setBreathPhase("exhale")

          timerRef.current = setTimeout(() => {
            setBreathPhase("rest")
            setCycleCount((prev) => prev + 1)

            timerRef.current = setTimeout(() => {
              runCycle()
            }, 2000)
          }, 6000)
        }, 4000)
      }, 4000)
    }

    runCycle()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isOpen])

  const getPhaseText = () => {
    switch (breathPhase) {
      case "inhale":
        return "breathe in slowly..."
      case "hold":
        return "hold gently..."
      case "exhale":
        return "breathe out slowly..."
      case "rest":
        return "rest..."
    }
  }

  const getPhaseEmoji = () => {
    switch (breathPhase) {
      case "inhale":
        return "🌬️"
      case "hold":
        return "✨"
      case "exhale":
        return "🍃"
      case "rest":
        return "💫"
    }
  }

  const getBreathSize = () => {
    switch (breathPhase) {
      case "inhale":
        return "scale-125"
      case "hold":
        return "scale-125"
      case "exhale":
        return "scale-75"
      case "rest":
        return "scale-100"
    }
  }

  return (
    <>
      {/* Floating bubble in corner */}
      <button
        onClick={handleOpen}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-14 h-14 rounded-full animate-breathe shadow-lg flex items-center justify-center z-30 hover:scale-110 active:scale-95 transition-transform border-2 border-white/30"
        aria-label="Open breathing exercise"
        style={{
          background:
            "linear-gradient(135deg, rgba(232, 244, 255, 0.9) 0%, rgba(245, 230, 255, 0.9) 100%)",
        }}
      >
        <span className="text-2xl">🫧</span>
      </button>

      {/* Breathing overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 transition-all"
          style={{
            background:
              "linear-gradient(180deg, rgba(245, 230, 255, 0.95) 0%, rgba(255, 248, 232, 0.95) 100%)",
            backdropFilter: "blur(20px)",
          }}
          onClick={handleClose}
        >
          <div
            className="flex flex-col items-center gap-8 max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-foreground/80 mb-2">
                breathe with me 🌬️
              </h2>
              <p className="text-sm text-muted-foreground/60">
                follow the circle to calm your mind
              </p>
            </div>

            {/* Breathing circle */}
            <div className="relative flex items-center justify-center w-48 h-48 md:w-56 md:h-56">
              {/* Outer glow ring */}
              <div
                className={`absolute w-full h-full rounded-full transition-all ease-in-out ${
                  breathPhase === "inhale" || breathPhase === "hold"
                    ? "duration-[4000ms]"
                    : breathPhase === "exhale"
                    ? "duration-[6000ms]"
                    : "duration-[2000ms]"
                } ${getBreathSize()}`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(200, 180, 255, 0.2) 0%, transparent 70%)",
                }}
              />

              {/* Main breathing circle */}
              <div
                className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center transition-all ease-in-out ${
                  breathPhase === "inhale" || breathPhase === "hold"
                    ? "duration-[4000ms]"
                    : breathPhase === "exhale"
                    ? "duration-[6000ms]"
                    : "duration-[2000ms]"
                } ${getBreathSize()}`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(200, 180, 255, 0.5) 0%, rgba(255, 228, 236, 0.3) 70%)",
                  boxShadow: "0 0 40px rgba(200, 180, 255, 0.3)",
                }}
              >
                <span className="text-3xl mb-2">{getPhaseEmoji()}</span>
              </div>
            </div>

            {/* Phase text */}
            <div className="h-12">
              <p
                className="text-xl md:text-2xl font-medium text-foreground/70 animate-fade-in"
                key={breathPhase}
              >
                {getPhaseText()}
              </p>
            </div>

            {/* Cycle counter */}
            {cycleCount > 0 && (
              <p className="text-sm text-muted-foreground/50">
                {cycleCount} {cycleCount === 1 ? "breath" : "breaths"} completed
                💜
              </p>
            )}

            {/* Close button */}
            <button
              onClick={handleClose}
              className="soft-button px-8 py-3 rounded-full bg-white/60 text-foreground/70 font-medium hover:bg-white/80 transition-all shadow-sm"
            >
              I feel better now ✨
            </button>

            {/* Tip */}
            <p className="text-xs text-muted-foreground/40 max-w-xs">
              tip: try to complete at least 3 breathing cycles for best results
            </p>
          </div>
        </div>
      )}
    </>
  )
}
