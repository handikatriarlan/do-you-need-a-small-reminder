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
      <p className="text-xs text-center text-muted-foreground/50 mb-2.5">
        how are you feeling?
      </p>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-1.5">
          {moods.map((mood, index) => (
            <button
              key={mood.value}
              onClick={() => handlePress(mood.value)}
              className={`soft-button flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedMood === mood.value
                  ? "bg-primary/25 text-foreground shadow-md scale-105 ring-1 ring-primary/30"
                  : "bg-white/50 text-foreground/60 hover:bg-white/70 hover:text-foreground/80 hover:scale-102"
              } ${pressedMood === mood.value ? "scale-95" : ""}`}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
              aria-pressed={selectedMood === mood.value}
              aria-label={`I'm feeling ${mood.label}`}
            >
              <span
                className={`text-sm transition-transform duration-200 ${
                  selectedMood === mood.value ? "animate-bounce-soft" : ""
                }`}
              >
                {mood.icon}
              </span>
              <span className="text-xs">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
