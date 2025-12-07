import type { Reminder } from "shared"

interface ReminderCardProps {
  reminder: Reminder | null
  isLoading?: boolean
}

export function ReminderCard({ reminder, isLoading }: ReminderCardProps) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-5 md:p-6 w-full text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 animate-pulse" />
          <div className="h-5 bg-primary/10 rounded-lg w-3/4 animate-pulse" />
          <div className="h-4 bg-primary/10 rounded-lg w-1/2 animate-pulse" />
        </div>
      </div>
    )
  }

  if (!reminder) {
    return (
      <div className="glass-card rounded-2xl p-5 md:p-6 w-full text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl">✨</span>
          <p className="text-base text-foreground/60 leading-relaxed">
            tap below to receive a gentle reminder
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="glass-card rounded-2xl p-5 md:p-6 w-full text-center reminder-card-enter"
      key={reminder.message}
    >
      <div className="flex flex-col items-center gap-3 animate-reminder-content">
        <span
          className="text-4xl md:text-5xl animate-reminder-icon"
          role="img"
          aria-label="reminder icon"
        >
          {reminder.icon}
        </span>
        <p className="text-base md:text-lg text-foreground font-medium leading-relaxed animate-reminder-text">
          {reminder.message}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/60 animate-reminder-label">
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span>a {reminder.emotion} reminder</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </div>
  )
}
