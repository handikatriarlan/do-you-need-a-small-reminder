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

  useEffect(() => {
    if (isWiggling) {
      setWiggling(true)
      const timer = setTimeout(() => {
        setWiggling(false)
        onWiggleEnd?.()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isWiggling, onWiggleEnd])

  // Expression based on mood
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
      className={`relative transition-all duration-300 ${
        wiggling ? "animate-wiggle" : "animate-gentle-float"
      }`}
      aria-label="Friendly mascot companion"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Cloud body */}
        <ellipse cx="40" cy="45" rx="32" ry="25" fill="url(#cloudGradient)" />
        <circle cx="20" cy="40" r="15" fill="url(#cloudGradient)" />
        <circle cx="60" cy="40" r="15" fill="url(#cloudGradient)" />
        <circle cx="30" cy="30" r="12" fill="url(#cloudGradient)" />
        <circle cx="50" cy="30" r="12" fill="url(#cloudGradient)" />
        <circle cx="40" cy="25" r="10" fill="url(#cloudGradient)" />

        {/* Soft glow */}
        <ellipse cx="40" cy="45" rx="28" ry="20" fill="white" opacity="0.3" />

        {/* Eyes */}
        {expression === "happy" ? (
          <>
            {/* Happy curved eyes */}
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
            {/* Sleepy half-closed eyes */}
            <ellipse cx="32" cy="42" rx="4" ry="2" fill="#6b5b7a" />
            <ellipse cx="48" cy="42" rx="4" ry="2" fill="#6b5b7a" />
          </>
        ) : (
          <>
            {/* Gentle dot eyes */}
            <circle
              cx="32"
              cy="42"
              r="3"
              fill="#6b5b7a"
              className="animate-mascot-blink"
            />
            <circle
              cx="48"
              cy="42"
              r="3"
              fill="#6b5b7a"
              className="animate-mascot-blink"
            />
          </>
        )}

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

        {/* Gradient definitions */}
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
        </defs>
      </svg>
    </div>
  )
}
