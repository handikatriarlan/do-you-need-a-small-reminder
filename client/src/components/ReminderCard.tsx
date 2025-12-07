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
          <p className="text-xs text-muted-foreground/40">
            we have one just for you
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="glass-card rounded-2xl p-5 md:p-6 w-full text-center animate-fade-in animate-soft-glow"
      key={reminder.message}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="text-3xl md:text-4xl"
          role="img"
          aria-label="reminder icon"
        >
          {reminder.icon}
        </span>
        <p className="text-base md:text-lg text-foreground font-medium leading-relaxed">
          {reminder.message}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span>a {reminder.emotion} reminder for you</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </div>
  )
}
