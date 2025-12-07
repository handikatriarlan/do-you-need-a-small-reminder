import { useState, useCallback, useRef } from "react"

interface SoundToggleProps {
  onSoundChange?: (enabled: boolean, audioContext: AudioContext | null) => void
}

export function SoundToggle({ onSoundChange }: SoundToggleProps) {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  const handleToggle = useCallback(() => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)

    // Initialize audio context if enabling sound
    if (newValue && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)()
    }

    // Resume audio context if it was suspended
    if (newValue && audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume()
    }

    onSoundChange?.(newValue, audioContextRef.current)

    // Play a test sound when enabling
    if (newValue && audioContextRef.current) {
      playChime(audioContextRef.current)
    }
  }, [soundEnabled, onSoundChange])

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center z-30 transition-all duration-300 ${
        soundEnabled
          ? "bg-primary/25 text-foreground shadow-md scale-110"
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

// Improved chime sound - softer and more pleasant
export function playChime(audioContext: AudioContext | null) {
  if (!audioContext || audioContext.state !== "running") return

  try {
    // Create a more pleasant bell-like sound
    const oscillator1 = audioContext.createOscillator()
    const oscillator2 = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Two harmonics for a richer sound
    oscillator1.frequency.setValueAtTime(880, audioContext.currentTime) // A5
    oscillator1.type = "sine"

    oscillator2.frequency.setValueAtTime(1320, audioContext.currentTime) // E6
    oscillator2.type = "sine"

    // Gentle envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.5
    )

    oscillator1.start(audioContext.currentTime)
    oscillator2.start(audioContext.currentTime)
    oscillator1.stop(audioContext.currentTime + 0.5)
    oscillator2.stop(audioContext.currentTime + 0.5)
  } catch (e) {
    console.warn("Failed to play chime:", e)
  }
}
