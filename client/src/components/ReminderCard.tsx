import type { Reminder } from "shared"

interface ReminderCardProps {
  reminder: Reminder | null
  isLoading?: boolean
}

export function ReminderCard({ reminder, isLoading }: ReminderCardProps) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 md:p-8 max-w-md mx-auto text-center animate-pulse">
        <div className="h-8 bg-primary/10 rounded-lg mb-4" />
        <div className="h-6 bg-primary/10 rounded-lg w-3/4 mx-auto" />
      </div>
    )
  }

  if (!reminder) {
    return (
      <div className="glass-card rounded-2xl p-6 md:p-8 max-w-md mx-auto text-center">
        <p className="reminder-text text-foreground/70">
          tap below to receive a gentle reminder ✨
        </p>
      </div>
    )
  }

  return (
    <div
      className="glass-card rounded-2xl p-6 md:p-8 max-w-md mx-auto text-center animate-fade-in animate-soft-glow"
      key={reminder.message}
    >
      <span
        className="text-3xl md:text-4xl mb-4 block"
        role="img"
        aria-label="reminder icon"
      >
        {reminder.icon}
      </span>
      <p className="reminder-text text-foreground font-medium leading-relaxed">
        {reminder.message}
      </p>
      <p className="text-sm text-muted-foreground mt-4 opacity-70">
        — a {reminder.emotion} reminder
      </p>
    </div>
  )
}
