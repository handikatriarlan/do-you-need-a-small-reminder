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
        return "breathe in..."
      case "hold":
        return "hold..."
      case "exhale":
        return "breathe out..."
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
      {/* Floating bubble - bottom right, above footer */}
      <button
        onClick={handleOpen}
        className="fixed bottom-16 right-4 w-12 h-12 rounded-full animate-breathe shadow-lg flex items-center justify-center z-30 hover:scale-110 active:scale-95 transition-transform border border-white/40"
        aria-label="Open breathing exercise"
        style={{
          background:
            "linear-gradient(135deg, rgba(232, 244, 255, 0.95) 0%, rgba(245, 230, 255, 0.95) 100%)",
        }}
      >
        <span className="text-xl">🫧</span>
      </button>

      {/* Breathing overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-all"
          style={{
            background:
              "linear-gradient(180deg, rgba(245, 230, 255, 0.97) 0%, rgba(255, 248, 232, 0.97) 100%)",
            backdropFilter: "blur(20px)",
          }}
          onClick={handleClose}
        >
          <div
            className="flex flex-col items-center gap-6 max-w-xs text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-foreground/80 mb-1">
                breathe with me 🌬️
              </h2>
              <p className="text-xs text-muted-foreground/60">
                follow the circle
              </p>
            </div>

            {/* Breathing circle */}
            <div className="relative flex items-center justify-center w-40 h-40">
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
                    "radial-gradient(circle, rgba(200, 180, 255, 0.15) 0%, transparent 70%)",
                }}
              />

              {/* Main breathing circle */}
              <div
                className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all ease-in-out ${
                  breathPhase === "inhale" || breathPhase === "hold"
                    ? "duration-[4000ms]"
                    : breathPhase === "exhale"
                    ? "duration-[6000ms]"
                    : "duration-[2000ms]"
                } ${getBreathSize()}`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(200, 180, 255, 0.45) 0%, rgba(255, 228, 236, 0.25) 70%)",
                  boxShadow: "0 0 30px rgba(200, 180, 255, 0.25)",
                }}
              >
                <span className="text-2xl">{getPhaseEmoji()}</span>
              </div>
            </div>

            {/* Phase text */}
            <p
              className="text-lg font-medium text-foreground/70 h-8"
              key={breathPhase}
            >
              {getPhaseText()}
            </p>

            {/* Cycle counter */}
            {cycleCount > 0 && (
              <p className="text-xs text-muted-foreground/50">
                {cycleCount} {cycleCount === 1 ? "breath" : "breaths"} 💜
              </p>
            )}

            {/* Close button */}
            <button
              onClick={handleClose}
              className="soft-button px-6 py-2.5 rounded-full bg-white/60 text-foreground/70 font-medium text-sm hover:bg-white/80 transition-all shadow-sm"
            >
              I feel better ✨
            </button>
          </div>
        </div>
      )}
    </>
  )
}
