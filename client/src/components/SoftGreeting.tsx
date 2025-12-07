import { useMemo } from "react"

export function SoftGreeting() {
  const greeting = useMemo(() => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      return { text: "good morning", emoji: "🌅" }
    } else if (hour >= 12 && hour < 17) {
      return { text: "good afternoon", emoji: "☀️" }
    } else if (hour >= 17 && hour < 21) {
      return { text: "good evening", emoji: "🌇" }
    } else {
      return { text: "hello, night owl", emoji: "🌙" }
    }
  }, [])

  return (
    <p className="text-xs text-muted-foreground/50 flex items-center gap-1">
      <span>{greeting.emoji}</span>
      <span>{greeting.text}</span>
    </p>
  )
}
