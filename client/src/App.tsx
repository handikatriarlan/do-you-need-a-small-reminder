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
import { DailyAffirmation } from "./components/DailyAffirmation"

const SERVER_URL = import.meta.env.DEV ? "http://localhost:3000/api" : "/api"

function App() {
  const [reminder, setReminder] = useState<Reminder | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mood, setMood] = useState<Mood>("okay")
  const [isWiggling, setIsWiggling] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Track shown reminders to prevent duplicates
  const shownRemindersRef = useRef<Set<string>>(new Set())
  const [retryCount, setRetryCount] = useState(0)

  // Reset shown reminders when mood changes
  useEffect(() => {
    shownRemindersRef.current.clear()
    setRetryCount(0)
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

      // If we couldn't find a new one after 5 tries, clear history and use what we got
      if (!data) {
        const res = await fetch(endpoint)
        const fetchedData: Reminder = await res.json()
        data = fetchedData
        // If all reminders shown, reset and start fresh
        if (shownRemindersRef.current.size >= 6) {
          shownRemindersRef.current.clear()
        }
        shownRemindersRef.current.add(data.message)
      }

      setReminder(data)
      setRetryCount(0)

      // Play chime if sound is enabled
      if (soundEnabled && audioContextRef.current) {
        playChime(audioContextRef.current)
      }
    } catch (error) {
      console.error("Failed to fetch reminder:", error)
      setRetryCount((prev) => prev + 1)
    } finally {
      setIsLoading(false)
    }
  }, [mood, soundEnabled])

  const handleSoundChange = useCallback((enabled: boolean) => {
    setSoundEnabled(enabled)
    if (enabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)()
    }
  }, [])

  const handleMoodChange = useCallback((newMood: Mood) => {
    setMood(newMood)
    setReminder(null)
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
      className={`min-h-screen min-h-dvh ${getMoodBackgroundClass()} transition-all duration-700 relative overflow-x-hidden`}
    >
      {/* Particle background */}
      <ParticleBackground />

      {/* Sound toggle */}
      <SoundToggle onSoundChange={handleSoundChange} />

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center min-h-screen min-h-dvh px-4 py-6 md:py-8 safe-area-top">
        <div className="flex flex-col items-center w-full max-w-md mx-auto flex-1">
          {/* Header section - compact on mobile */}
          <div className="flex flex-col items-center gap-3 mb-4 md:mb-6">
            {/* Mascot */}
            <Mascot
              isWiggling={isWiggling}
              mood={mood}
              onWiggleEnd={handleWiggleEnd}
            />

            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground/90 mb-1">
                do you need a small reminder?
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground/70">
                a cozy place for when you need comfort ✨
              </p>
            </div>
          </div>

          {/* Daily affirmation - new feature */}
          <DailyAffirmation />

          {/* Mood selector */}
          <div className="w-full mb-4 md:mb-6">
            <MoodSelector selectedMood={mood} onMoodChange={handleMoodChange} />
          </div>

          {/* Reminder card */}
          <div className="w-full mb-4 md:mb-6">
            <ReminderCard reminder={reminder} isLoading={isLoading} />
            {retryCount > 0 && (
              <p className="text-xs text-center text-muted-foreground/50 mt-2">
                having trouble connecting... try again?
              </p>
            )}
          </div>

          {/* Action buttons - stacked on mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-6">
            <Button
              onClick={fetchReminder}
              disabled={isLoading}
              className="soft-button w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all text-sm md:text-base"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  finding...
                </span>
              ) : reminder ? (
                "show another reminder"
              ) : (
                "show me a reminder"
              )}
            </Button>

            <HugButton />
          </div>

          {/* Let it out section */}
          <div className="w-full mb-6">
            <LetItOut />
          </div>

          {/* Spacer to push footer down */}
          <div className="flex-1 min-h-4" />
        </div>
      </main>

      {/* Breathing bubble */}
      <BreathingBubble />

      {/* Footer */}
      <footer className="relative z-10 pb-6 safe-area-bottom">
        <div className="text-center">
          <p className="text-xs text-muted-foreground/50 mb-1">
            made with 💜 for you
          </p>
          <a
            href="https://handikatriarlan.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/40 hover:text-primary/60 transition-colors underline-offset-2 hover:underline"
          >
            handikatriarlan
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
