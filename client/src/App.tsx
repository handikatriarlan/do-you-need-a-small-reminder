import { useState, useCallback, useRef, useEffect } from "react"
import type { Reminder, Mood } from "shared"
import { Button } from "./components/ui/button"
import { Mascot } from "./components/Mascot"
import { ReminderCard } from "./components/ReminderCard"
import { BreathingBubble } from "./components/BreathingBubble"
import { ParticleBackground } from "./components/ParticleBackground"
import { MoodSelector } from "./components/MoodSelector"
import { LetItOut } from "./components/LetItOut"
import { HugButton } from "./components/HugButton"
import { SoundToggle, playChime } from "./components/SoundToggle"
import { SoftGreeting } from "./components/SoftGreeting"

const SERVER_URL = import.meta.env.DEV ? "http://localhost:3000/api" : "/api"

function App() {
  const [reminder, setReminder] = useState<Reminder | null>(null)
  const [reminderKey, setReminderKey] = useState(0) // Key for triggering re-animation
  const [isLoading, setIsLoading] = useState(false)
  const [mood, setMood] = useState<Mood>("okay")
  const [isWiggling, setIsWiggling] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Track shown reminders to prevent duplicates
  const shownRemindersRef = useRef<Set<string>>(new Set())

  // Reset shown reminders when mood changes
  useEffect(() => {
    shownRemindersRef.current.clear()
  }, [mood])

  const fetchReminder = useCallback(async () => {
    setIsLoading(true)
    setIsWiggling(true)

    try {
      const endpoint =
        mood === "okay"
          ? `${SERVER_URL}/reminder`
          : `${SERVER_URL}/reminders/category/${mood}`

      // Try up to 5 times to get a new reminder
      let attempts = 0
      let data: Reminder | null = null

      while (attempts < 5) {
        const res = await fetch(endpoint)
        const fetchedData: Reminder = await res.json()

        // Check if we've shown this reminder before
        if (!shownRemindersRef.current.has(fetchedData.message)) {
          data = fetchedData
          shownRemindersRef.current.add(fetchedData.message)
          break
        }
        attempts++
      }

      // If we couldn't find a new one after 5 tries, use what we got
      if (!data) {
        const res = await fetch(endpoint)
        const fetchedData: Reminder = await res.json()
        data = fetchedData
        if (shownRemindersRef.current.size >= 6) {
          shownRemindersRef.current.clear()
        }
        shownRemindersRef.current.add(data.message)
      }

      setReminder(data)
      setReminderKey((prev) => prev + 1) // Trigger new animation

      // Play chime if sound is enabled
      if (soundEnabled && audioContextRef.current) {
        playChime(audioContextRef.current)
      }
    } catch (error) {
      console.error("Failed to fetch reminder:", error)
    } finally {
      setIsLoading(false)
    }
  }, [mood, soundEnabled])

  const handleSoundChange = useCallback(
    (enabled: boolean, audioContext: AudioContext | null) => {
      setSoundEnabled(enabled)
      audioContextRef.current = audioContext
    },
    []
  )

  const handleMoodChange = useCallback((newMood: Mood) => {
    setMood(newMood)
    setReminder(null)
    setReminderKey((prev) => prev + 1)
  }, [])

  const handleWiggleEnd = useCallback(() => {
    setIsWiggling(false)
  }, [])

  // Get background class based on mood
  const getMoodBackgroundClass = () => {
    switch (mood) {
      case "sad":
        return "mood-sad"
      case "tired":
        return "mood-tired"
      case "overwhelmed":
        return "mood-overwhelmed"
      case "numb":
        return "mood-numb"
      default:
        return "mood-okay"
    }
  }

  return (
    <div
      className={`min-h-screen min-h-dvh ${getMoodBackgroundClass()} transition-all duration-500 relative overflow-x-hidden`}
    >
      {/* Particle background */}
      <ParticleBackground />

      {/* Sound toggle */}
      <SoundToggle onSoundChange={handleSoundChange} />

      {/* Breathing bubble - bottom right corner */}
      <BreathingBubble />

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen min-h-dvh px-4 py-4 safe-area-top safe-area-bottom">
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
          {/* Header section with entrance animation */}
          <div className="flex flex-col items-center gap-2 mb-4 animate-fade-in">
            {/* Mascot */}
            <Mascot
              isWiggling={isWiggling}
              mood={mood}
              onWiggleEnd={handleWiggleEnd}
            />

            {/* Title */}
            <h1 className="text-lg sm:text-xl font-semibold text-foreground/85 text-center leading-tight">
              do you need a small reminder?
            </h1>
            <SoftGreeting />
          </div>

          {/* Mood selector with animation */}
          <div
            className="w-full mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <MoodSelector selectedMood={mood} onMoodChange={handleMoodChange} />
          </div>

          {/* Reminder card - fixed height to prevent layout shift */}
          <div className="w-full mb-4 min-h-[140px] flex items-center">
            <div className="w-full">
              <ReminderCard
                reminder={reminder}
                isLoading={isLoading}
                key={reminderKey}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div
            className="flex flex-col gap-2.5 w-full mb-4 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              onClick={fetchReminder}
              disabled={isLoading}
              className="soft-button w-full px-6 py-3.5 h-auto rounded-2xl bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all text-base active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  finding...
                </span>
              ) : reminder ? (
                "show another reminder ✨"
              ) : (
                "show me a reminder 💜"
              )}
            </Button>

            <HugButton />
          </div>

          {/* Let it out section */}
          <div
            className="w-full animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <LetItOut />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 py-2 bg-gradient-to-t from-white/20 to-transparent">
        <p className="text-center text-xs text-muted-foreground/40">
          made with 💜 by{" "}
          <a
            href="https://handikatriarlan.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary/60 transition-colors underline-offset-2 hover:underline"
          >
            handikatriarlan
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
