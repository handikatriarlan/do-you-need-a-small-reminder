import { useState, useCallback } from "react"

export function HugButton() {
  const [isHugging, setIsHugging] = useState(false)
  const [hugCount, setHugCount] = useState(0)

  const handleHug = useCallback(() => {
    setIsHugging(true)
    setHugCount((prev) => prev + 1)
    setTimeout(() => setIsHugging(false), 2500)
  }, [])

  const getHugMessage = () => {
    if (hugCount === 0) return null
    if (hugCount === 1) return "💜"
    if (hugCount <= 3) return "you're loved"
    if (hugCount <= 5) return "so many hugs for you!"
    return "infinite hugs!"
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleHug}
        className="soft-button w-full px-5 py-3 rounded-2xl text-foreground/80 font-medium text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
        style={{
          background: "linear-gradient(135deg, rgba(253, 205, 219, 1)%, rgba(255, 232, 224, 1) 100%)",
        }}
        disabled={isHugging}
        aria-label="Send yourself a virtual hug"
      >
        {isHugging ? "sending love..." : "send a small hug"}
      </button>

      {/* Hug message - with better contrast */}
      {hugCount > 0 && !isHugging && (
        <p className="text-xs text-foreground/70 font-medium animate-fade-in bg-white/40 px-3 py-1 rounded-full">
          {getHugMessage()} 💜
        </p>
      )}

      {/* Large immersive hug overlay animation */}
      {isHugging && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          {/* Full screen warm glow */}
          <div
            className="absolute inset-0 animate-hug-glow"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255, 200, 220, 0.4) 0%, rgba(255, 228, 236, 0.2) 40%, transparent 70%)",
            }}
          />

          {/* Multiple expanding circles for warmth effect */}
          <div
            className="absolute w-40 h-40 rounded-full animate-hug-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 180, 200, 0.6) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute w-40 h-40 rounded-full animate-hug-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 200, 220, 0.5) 0%, transparent 70%)",
              animationDelay: "0.3s",
            }}
          />
          <div
            className="absolute w-40 h-40 rounded-full animate-hug-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(245, 210, 255, 0.4) 0%, transparent 70%)",
              animationDelay: "0.6s",
            }}
          />
          <div
            className="absolute w-40 h-40 rounded-full animate-hug-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 230, 240, 0.3) 0%, transparent 70%)",
              animationDelay: "0.9s",
            }}
          />

          {/* Center heart animation */}
          <div className="relative z-10 flex flex-col items-center gap-3 animate-hug-heart">
            <span className="text-6xl md:text-7xl drop-shadow-lg">🤗</span>
            <p className="text-lg md:text-xl font-medium text-foreground/80 bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
              you are loved 💕
            </p>
          </div>

          {/* Floating hearts */}
          {/* <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="absolute text-2xl animate-float-heart"
                style={{
                  left: `${10 + i * 12}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + (i % 3) * 0.5}s`,
                }}
              >
                💕
              </span>
            ))}
          </div> */}
        </div>
      )}
    </div>
  )
}
