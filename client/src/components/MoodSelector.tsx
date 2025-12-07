import type { Mood } from "shared"
import { useState } from "react"

interface MoodSelectorProps {
  selectedMood: Mood
  onMoodChange: (mood: Mood) => void
}

const moods: { value: Mood; label: string; icon: string }[] = [
  { value: "sad", label: "sad", icon: "💧" },
  { value: "tired", label: "tired", icon: "🌙" },
  { value: "overwhelmed", label: "anxious", icon: "🌊" },
  { value: "numb", label: "numb", icon: "🫧" },
  { value: "okay", label: "okay", icon: "🌸" },
]

export function MoodSelector({
  selectedMood,
  onMoodChange,
}: MoodSelectorProps) {
  const [pressedMood, setPressedMood] = useState<Mood | null>(null)

  const handlePress = (mood: Mood) => {
    setPressedMood(mood)
    onMoodChange(mood)
    setTimeout(() => setPressedMood(null), 200)
  }

  return (
    <div className="w-full">
      <p className="text-sm text-center text-foreground/60 font-medium mb-3">
        how are you feeling?
      </p>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-2">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handlePress(mood.value)}
              className={`soft-button flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedMood === mood.value
                  ? "bg-primary/30 text-foreground shadow-md scale-105 ring-1 ring-primary/40"
                  : "bg-white/60 text-foreground/70 hover:bg-white/80 hover:text-foreground/90"
              } ${pressedMood === mood.value ? "scale-95" : ""}`}
              aria-pressed={selectedMood === mood.value}
              aria-label={`I'm feeling ${mood.label}`}
            >
              <span
                className={`text-base ${
                  selectedMood === mood.value ? "animate-bounce-soft" : ""
                }`}
              >
                {mood.icon}
              </span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
