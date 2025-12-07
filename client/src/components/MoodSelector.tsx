import type { Mood } from "shared"

interface MoodSelectorProps {
  selectedMood: Mood
  onMoodChange: (mood: Mood) => void
}

const moods: { value: Mood; label: string; icon: string }[] = [
  { value: "sad", label: "sad", icon: "💧" },
  { value: "tired", label: "tired", icon: "🌙" },
  { value: "overwhelmed", label: "overwhelmed", icon: "🌊" },
  { value: "numb", label: "numb", icon: "🫧" },
  { value: "okay", label: "okay", icon: "🌸" },
]

export function MoodSelector({
  selectedMood,
  onMoodChange,
}: MoodSelectorProps) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-sm text-center text-muted-foreground mb-3">
        how are you feeling?
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onMoodChange(mood.value)}
            className={`soft-button px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedMood === mood.value
                ? "bg-primary/20 text-foreground shadow-sm scale-105"
                : "bg-white/40 text-foreground/60 hover:bg-white/60"
            }`}
            aria-pressed={selectedMood === mood.value}
          >
            <span className="mr-1">{mood.icon}</span>
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  )
}
