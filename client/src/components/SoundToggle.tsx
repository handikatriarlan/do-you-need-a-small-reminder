import { useState, useCallback } from "react"

interface SoundToggleProps {
  onSoundChange?: (enabled: boolean) => void
}

export function SoundToggle({ onSoundChange }: SoundToggleProps) {
  const [soundEnabled, setSoundEnabled] = useState(false)

  const handleToggle = useCallback(() => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)
    onSoundChange?.(newValue)
  }, [soundEnabled, onSoundChange])

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center z-30 transition-all duration-300 ${
        soundEnabled
          ? "bg-primary/25 text-foreground shadow-md scale-105"
          : "bg-white/50 text-foreground/50 hover:bg-white/70 hover:scale-105"
      }`}
      aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
      aria-pressed={soundEnabled}
    >
      {soundEnabled ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  )
}
