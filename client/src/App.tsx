import { useState, useCallback, useRef, useEffect } from "react"
import type { Reminder, Mood } from "shared"
import { Button } from "./components/ui/button"
import { Mascot } from "./components/Mascot"
import { ReminderCard } from "./components/ReminderCard"
import { BreathingBubble } from "./components/BreathingBubble"
import { ParticleBackground } from "./components/ParticleBackground"
import { MoodSelector } from "./components/MoodSelector"
import { HugButton } from "./components/HugButton"

const SERVER_URL = import.meta.env.DEV ? "http://localhost:3000/api" : "/api"

function App() {
  const [reminder, setReminder] = useState<Reminder | null>(null)
  const [reminderKey, setReminderKey] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [mood, setMood] = useState<Mood>("okay")
  const [isWiggling, setIsWiggling] = useState(false)

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

      let attempts = 0
      let data: Reminder | null = null

      while (attempts < 5) {
        const res = await fetch(endpoint)
        const fetchedData: Reminder = await res.json()

        if (!shownRemindersRef.current.has(fetchedData.message)) {
          data = fetchedData
          shownRemindersRef.current.add(fetchedData.message)
          break
        }
        attempts++
      }

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
      setReminderKey((prev) => prev + 1)
    } catch (error) {
      console.error("Failed to fetch reminder:", error)
    } finally {
      setIsLoading(false)
    }
  }, [mood])

  const handleMoodChange = useCallback((newMood: Mood) => {
    setMood(newMood)
    setReminder(null)
    setReminderKey((prev) => prev + 1)
  }, [])

  const handleWiggleEnd = useCallback(() => {
    setIsWiggling(false)
  }, [])

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

      {/* Breathing bubble - bottom right corner */}
      <BreathingBubble />

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center min-h-screen min-h-dvh px-5 py-8">
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
          {/* Section 1: Welcome Header */}
          <section className="flex flex-col items-center text-center mb-6 animate-fade-in">
            <Mascot
              isWiggling={isWiggling}
              mood={mood}
              onWiggleEnd={handleWiggleEnd}
            />
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground/90 mt-3 mb-1">
              do you need a small reminder?
            </h1>
            <p className="text-sm text-muted-foreground/60">
              your healing space 🤍
            </p>
          </section>

          {/* Divider */}
          <div className="w-16 h-px bg-foreground/10 mb-6" />

          {/* Section 2: Mood Selection */}
          <section
            className="w-full mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <MoodSelector selectedMood={mood} onMoodChange={handleMoodChange} />
          </section>

          {/* Section 3: Reminder Card */}
          <section className="w-full mb-5">
            <ReminderCard
              reminder={reminder}
              isLoading={isLoading}
              key={reminderKey}
            />
          </section>

          {/* Section 4: Action Buttons */}
          <section
            className="w-full mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex flex-col gap-2.5">
              <Button
                onClick={fetchReminder}
                disabled={isLoading}
                className="soft-button w-full py-3 h-auto rounded-2xl bg-primary text-primary-foreground font-medium text-base shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    finding...
                  </span>
                ) : reminder ? (
                  "another reminder"
                ) : (
                  "show me a reminder"
                )}
              </Button>
              <HugButton />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
