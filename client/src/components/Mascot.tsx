import { useEffect, useState } from "react"

interface MascotProps {
  isWiggling?: boolean
  mood?: "sad" | "tired" | "overwhelmed" | "numb" | "okay"
  onWiggleEnd?: () => void
}

export function Mascot({
  isWiggling = false,
  mood = "okay",
  onWiggleEnd,
}: MascotProps) {
  const [wiggling, setWiggling] = useState(false)
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    if (isWiggling) {
      setWiggling(true)
      const timer = setTimeout(() => {
        setWiggling(false)
        onWiggleEnd?.()
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isWiggling, onWiggleEnd])

  // Random blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 150)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [])

  const getExpression = () => {
    switch (mood) {
      case "sad":
      case "tired":
        return "sleepy"
      case "overwhelmed":
      case "numb":
        return "gentle"
      default:
        return "happy"
    }
  }

  const expression = getExpression()

  return (
    <div
      className={`relative transition-transform duration-300 ${
        wiggling ? "animate-wiggle" : "animate-gentle-float"
      }`}
      aria-label="Friendly mascot companion"
    >
      <svg
        width="72"
        height="72"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Cloud body with gradient */}
        <defs>
          <linearGradient
            id="cloudGradient"
            x1="8"
            y1="20"
            x2="72"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f5e6ff" />
            <stop offset="50%" stopColor="#ffe4ec" />
            <stop offset="100%" stopColor="#fff8e8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main cloud body */}
        <g filter="url(#glow)">
          <ellipse cx="40" cy="45" rx="30" ry="23" fill="url(#cloudGradient)" />
          <circle cx="20" cy="40" r="14" fill="url(#cloudGradient)" />
          <circle cx="60" cy="40" r="14" fill="url(#cloudGradient)" />
          <circle cx="30" cy="30" r="11" fill="url(#cloudGradient)" />
          <circle cx="50" cy="30" r="11" fill="url(#cloudGradient)" />
          <circle cx="40" cy="26" r="9" fill="url(#cloudGradient)" />
        </g>

        {/* Soft inner glow */}
        <ellipse cx="40" cy="43" rx="24" ry="16" fill="white" opacity="0.4" />

        {/* Eyes */}
        <g
          style={{
            transform: blinking ? "scaleY(0.1)" : "scaleY(1)",
            transformOrigin: "40px 42px",
            transition: "transform 0.1s ease",
          }}
        >
          {expression === "happy" ? (
            <>
              <path
                d="M28 42 Q32 38, 36 42"
                stroke="#6b5b7a"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M44 42 Q48 38, 52 42"
                stroke="#6b5b7a"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : expression === "sleepy" ? (
            <>
              <ellipse cx="32" cy="42" rx="4" ry="2" fill="#6b5b7a" />
              <ellipse cx="48" cy="42" rx="4" ry="2" fill="#6b5b7a" />
            </>
          ) : (
            <>
              <circle cx="32" cy="42" r="3" fill="#6b5b7a" />
              <circle cx="48" cy="42" r="3" fill="#6b5b7a" />
            </>
          )}
        </g>

        {/* Blush */}
        <ellipse cx="24" cy="48" rx="5" ry="3" fill="#ffb5c5" opacity="0.5" />
        <ellipse cx="56" cy="48" rx="5" ry="3" fill="#ffb5c5" opacity="0.5" />

        {/* Mouth */}
        {expression === "happy" ? (
          <path
            d="M36 52 Q40 56, 44 52"
            stroke="#6b5b7a"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        ) : expression === "sleepy" ? (
          <ellipse cx="40" cy="52" rx="3" ry="2" fill="#6b5b7a" opacity="0.6" />
        ) : (
          <path
            d="M37 52 L43 52"
            stroke="#6b5b7a"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}

        {/* Sparkle decorations */}
        <g className="animate-pulse" style={{ animationDuration: "2s" }}>
          <circle cx="12" cy="30" r="2" fill="#ffd700" opacity="0.6" />
          <circle cx="68" cy="35" r="1.5" fill="#ffd700" opacity="0.5" />
          <circle cx="65" cy="25" r="1" fill="#ff69b4" opacity="0.4" />
        </g>
      </svg>
    </div>
  )
}
