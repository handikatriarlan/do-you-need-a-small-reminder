export type Mood = "sad" | "tired" | "overwhelmed" | "numb" | "okay"

export type Reminder = {
  message: string
  emotion: string
  icon: string
  category: Mood
}

export type ReminderResponse = Reminder

export type RemindersResponse = {
  reminders: Reminder[]
  count: number
}

export type ApiResponse = {
  message: string
  success: boolean
}
