import type { Mood } from "shared"

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
  return (
    <div className="w-full">
      <p className="text-xs text-center text-muted-foreground/60 mb-3">
        how are you feeling right now?
      </p>

      {/* Horizontal scrollable on mobile, centered grid on desktop */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => onMoodChange(mood.value)}
              className={`soft-button flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedMood === mood.value
                  ? "bg-primary/25 text-foreground shadow-sm scale-105 ring-2 ring-primary/20"
                  : "bg-white/50 text-foreground/60 hover:bg-white/70 hover:text-foreground/80"
              }`}
              aria-pressed={selectedMood === mood.value}
              aria-label={`I'm feeling ${mood.label}`}
            >
              <span className="text-base">{mood.icon}</span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
