import { useState, useCallback } from "react"

export function HugButton() {
  const [isHugging, setIsHugging] = useState(false)
  const [hugCount, setHugCount] = useState(0)

  const handleHug = useCallback(() => {
    setIsHugging(true)
    setHugCount((prev) => prev + 1)
    setTimeout(() => setIsHugging(false), 1500)
  }, [])

  const getHugMessage = () => {
    if (hugCount === 0) return null
    if (hugCount === 1) return "💜"
    if (hugCount <= 3) return "you're loved 💜"
    if (hugCount <= 5) return "so many hugs for you! 💜"
    return "infinite hugs! 💜💜💜"
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleHug}
        className="soft-button w-full sm:w-auto px-5 py-3 rounded-2xl text-foreground/80 font-medium text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
        style={{
          background: "linear-gradient(135deg, #ffe4ec 0%, #ffe8e0 100%)",
        }}
        disabled={isHugging}
        aria-label="Send yourself a virtual hug"
      >
        {isHugging ? "sending... 🤗" : "send me a small hug 🤗"}
      </button>

      {/* Hug message */}
      {hugCount > 0 && !isHugging && (
        <p className="text-xs text-primary/60 animate-fade-in">
          {getHugMessage()}
        </p>
      )}

      {/* Hug overlay animation */}
      {isHugging && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {/* Multiple expanding circles for warmth effect */}
          <div
            className="absolute w-24 h-24 rounded-full animate-hug-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 200, 220, 0.5) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute w-24 h-24 rounded-full animate-hug-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 228, 236, 0.4) 0%, transparent 70%)",
              animationDelay: "0.2s",
            }}
          />
          <div
            className="absolute w-24 h-24 rounded-full animate-hug-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(245, 230, 255, 0.3) 0%, transparent 70%)",
              animationDelay: "0.4s",
            }}
          />
          {/* Center emoji */}
          <span className="text-4xl animate-fade-in z-10">🤗</span>
        </div>
      )}
    </div>
  )
}
