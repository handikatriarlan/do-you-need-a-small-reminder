import { useState, useCallback, useEffect, useRef } from "react"

interface SoundToggleProps {
  onSoundChange?: (enabled: boolean) => void
}

export function SoundToggle({ onSoundChange }: SoundToggleProps) {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize audio context on first user interaction
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const handleToggle = useCallback(() => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)
    onSoundChange?.(newValue)

    // Initialize audio context if enabling sound
    if (newValue && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)()
    }
  }, [soundEnabled, onSoundChange])

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-30 transition-all ${
        soundEnabled
          ? "bg-primary/20 text-foreground shadow-sm"
          : "bg-white/40 text-foreground/50"
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

// Export a function to play the chime sound
export function playChime(audioContext: AudioContext | null) {
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  // Soft, gentle chime frequency
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
  oscillator.type = "sine"

  // Very short, soft sound
  gainNode.gain.setValueAtTime(0, audioContext.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05)
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.3)
}
