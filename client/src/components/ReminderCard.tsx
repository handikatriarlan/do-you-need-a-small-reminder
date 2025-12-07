import type { Reminder } from "shared"

interface ReminderCardProps {
  reminder: Reminder | null
  isLoading?: boolean
}

export function ReminderCard({ reminder, isLoading }: ReminderCardProps) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-5 w-full text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 animate-pulse flex items-center justify-center">
            <span className="text-xl animate-spin-slow">✨</span>
          </div>
          <div className="h-4 bg-primary/10 rounded-lg w-2/3 animate-pulse" />
          <div className="h-3 bg-primary/10 rounded-lg w-1/2 animate-pulse" />
        </div>
      </div>
    )
  }

  if (!reminder) {
    return (
      <div className="glass-card rounded-2xl p-5 w-full text-center hover-lift">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl animate-bounce-soft">✨</span>
          <p className="text-sm text-foreground/60 leading-relaxed">
            tap below to receive a gentle reminder
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-5 w-full text-center reminder-card-enter hover-lift">
      <div className="flex flex-col items-center gap-2.5">
        <span
          className="text-4xl animate-reminder-icon"
          role="img"
          aria-label="reminder icon"
        >
          {reminder.icon}
        </span>
        <p className="text-base text-foreground font-medium leading-relaxed animate-reminder-text">
          {reminder.message}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/50 animate-reminder-label">
          <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
          <span>a {reminder.emotion} reminder</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  )
}
