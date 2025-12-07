import { useMemo } from "react"

// Daily affirmations that change based on the day
const affirmations = [
  "you are worthy of love and kindness 💜",
  "today, you are enough just as you are 🌸",
  "your presence makes the world brighter ✨",
  "you deserve moments of peace and joy 🌿",
  "you are stronger than you know 💪",
  "it's okay to take things one step at a time 🦋",
  "you matter more than you realize 🌟",
  "be gentle with yourself today 🌷",
  "you are doing better than you think 💫",
  "your feelings are valid and important 🤍",
  "every small step forward counts 🌱",
  "you are worthy of rest and care 🌙",
  "today is a fresh start, take it slow 🌅",
  "you bring something special to this world 🌈",
  "you deserve compassion, especially from yourself 💗",
  "breathe deeply, you've got this 🌬️",
  "your journey is unique and beautiful 🦋",
  "you are allowed to ask for help 🤝",
  "small progress is still progress 🌻",
  "you are loved more than you know 💕",
  "take a moment to appreciate yourself 🌺",
  "your best is always good enough 🌼",
  "you make a difference just by being you ⭐",
  "today, choose kindness towards yourself 💐",
  "you are resilient and capable 🌿",
  "it's okay to not have all the answers 🤍",
  "you deserve happiness and peace 🕊️",
  "your heart is full of strength 💜",
  "take things at your own pace 🐢",
  "you are a beautiful work in progress 🎨",
  "today, let yourself just be 🌸",
]

export function DailyAffirmation() {
  const todaysAffirmation = useMemo(() => {
    // Use the day of the year to pick an affirmation
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)

    return affirmations[dayOfYear % affirmations.length]
  }, [])

  return (
    <div className="w-full mb-5 md:mb-6 px-2">
      <div className="glass-card rounded-2xl px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground/60 mb-1 uppercase tracking-wide">
          today's gentle reminder
        </p>
        <p className="text-sm md:text-base text-foreground/80 font-medium leading-relaxed">
          {todaysAffirmation}
        </p>
      </div>
    </div>
  )
}
