import type { Reminder } from "shared"

interface ReminderCardProps {
  reminder: Reminder | null
  isLoading?: boolean
}

export function ReminderCard({ reminder, isLoading }: ReminderCardProps) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 w-full text-center min-h-[120px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-2xl animate-spin-slow">✨</span>
          <p className="text-sm text-muted-foreground/60">
            finding your reminder...
          </p>
        </div>
      </div>
    )
  }

  if (!reminder) {
    return (
      <div className="glass-card rounded-2xl p-6 w-full text-center min-h-[120px] flex items-center justify-center hover-lift">
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl animate-bounce-soft">✨</span>
          <p className="text-base text-foreground/60 leading-relaxed">
            tap the button below
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-6 w-full text-center min-h-[120px] reminder-card-enter hover-lift">
      <div className="flex flex-col items-center gap-3">
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
      </div>
    </div>
  )
}
