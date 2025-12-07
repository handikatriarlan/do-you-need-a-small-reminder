import { Hono } from "hono"
import { cors } from "hono/cors"
import type {
  Reminder,
  ReminderResponse,
  RemindersResponse,
  Mood,
} from "shared/dist"

const app = new Hono().basePath("/api")

app.use(cors())

// Reminder data store with psychologically-grounded, warm messages
const reminders: Reminder[] = [
  // Sad category (10 reminders)
  {
    message: "it's okay to feel sad. your feelings are valid.",
    emotion: "gentle",
    icon: "💜",
    category: "sad",
  },
  {
    message: "you don't have to smile right now. just breathe.",
    emotion: "soft",
    icon: "🌸",
    category: "sad",
  },
  {
    message: "sadness passes like clouds. you're still here.",
    emotion: "warm",
    icon: "☁️",
    category: "sad",
  },
  {
    message: "it's okay to not be okay today.",
    emotion: "gentle",
    icon: "🤍",
    category: "sad",
  },
  {
    message: "your tears are not weakness. they're release.",
    emotion: "soft",
    icon: "💧",
    category: "sad",
  },
  {
    message: "even on hard days, you matter so much.",
    emotion: "warm",
    icon: "💛",
    category: "sad",
  },
  {
    message: "let yourself feel what you need to feel.",
    emotion: "gentle",
    icon: "🌙",
    category: "sad",
  },
  {
    message: "you're allowed to have hard days. this is one.",
    emotion: "soft",
    icon: "🌧️",
    category: "sad",
  },
  {
    message: "grief and sadness mean you loved deeply.",
    emotion: "warm",
    icon: "💗",
    category: "sad",
  },
  {
    message: "this feeling won't last forever. hold on.",
    emotion: "gentle",
    icon: "🌈",
    category: "sad",
  },

  // Tired category (10 reminders)
  {
    message: "being tired doesn't mean you've failed.",
    emotion: "gentle",
    icon: "🌙",
    category: "tired",
  },
  {
    message: "rest is not laziness. it's healing.",
    emotion: "soft",
    icon: "✨",
    category: "tired",
  },
  {
    message: "you're allowed to slow down today.",
    emotion: "warm",
    icon: "🍃",
    category: "tired",
  },
  {
    message: "today, rest counts as progress too.",
    emotion: "gentle",
    icon: "🌿",
    category: "tired",
  },
  {
    message: "your body knows what it needs. listen to it.",
    emotion: "soft",
    icon: "💫",
    category: "tired",
  },
  {
    message: "it's okay to take a moment to breathe.",
    emotion: "warm",
    icon: "🌬️",
    category: "tired",
  },
  {
    message: "you've been carrying so much. set it down for now.",
    emotion: "gentle",
    icon: "🎒",
    category: "tired",
  },
  {
    message: "sleep is not a reward. it's a necessity.",
    emotion: "soft",
    icon: "😴",
    category: "tired",
  },
  {
    message: "give yourself permission to do less today.",
    emotion: "warm",
    icon: "🛋️",
    category: "tired",
  },
  {
    message: "you can't pour from an empty cup. rest.",
    emotion: "gentle",
    icon: "☕",
    category: "tired",
  },

  // Overwhelmed category (10 reminders)
  {
    message: "one small step is still a step forward.",
    emotion: "gentle",
    icon: "🪴",
    category: "overwhelmed",
  },
  {
    message: "you don't have to solve everything today.",
    emotion: "soft",
    icon: "🌈",
    category: "overwhelmed",
  },
  {
    message: "breathe. you're doing more than you realize.",
    emotion: "warm",
    icon: "🌻",
    category: "overwhelmed",
  },
  {
    message: "it's okay to ask for help. you're not alone.",
    emotion: "gentle",
    icon: "🤝",
    category: "overwhelmed",
  },
  {
    message: "take things one moment at a time.",
    emotion: "soft",
    icon: "⏳",
    category: "overwhelmed",
  },
  {
    message: "you're handling more than most people see.",
    emotion: "warm",
    icon: "💪",
    category: "overwhelmed",
  },
  {
    message: "break it down into smaller pieces. you've got this.",
    emotion: "gentle",
    icon: "🧩",
    category: "overwhelmed",
  },
  {
    message: "not everything needs your attention right now.",
    emotion: "soft",
    icon: "🎯",
    category: "overwhelmed",
  },
  {
    message: "pause. the world can wait for a moment.",
    emotion: "warm",
    icon: "⏸️",
    category: "overwhelmed",
  },
  {
    message: "you are not your to-do list.",
    emotion: "gentle",
    icon: "📝",
    category: "overwhelmed",
  },

  // Numb category (10 reminders)
  {
    message: "feeling nothing is still feeling something.",
    emotion: "gentle",
    icon: "🫧",
    category: "numb",
  },
  {
    message: "you're still here. that matters.",
    emotion: "soft",
    icon: "🌟",
    category: "numb",
  },
  {
    message: "it's okay to just exist right now.",
    emotion: "warm",
    icon: "🌊",
    category: "numb",
  },
  {
    message: "sometimes the quiet is what we need.",
    emotion: "gentle",
    icon: "🕊️",
    category: "numb",
  },
  {
    message: "you don't have to feel anything specific.",
    emotion: "soft",
    icon: "🌙",
    category: "numb",
  },
  {
    message: "being here is enough. you are enough.",
    emotion: "warm",
    icon: "💗",
    category: "numb",
  },
  {
    message: "your worth isn't measured by how you feel.",
    emotion: "gentle",
    icon: "⭐",
    category: "numb",
  },
  {
    message: "emptiness can be a space for new things.",
    emotion: "soft",
    icon: "🌱",
    category: "numb",
  },
  {
    message: "you don't have to explain your feelings.",
    emotion: "warm",
    icon: "🤫",
    category: "numb",
  },
  {
    message: "just existing takes courage. you're brave.",
    emotion: "gentle",
    icon: "🦁",
    category: "numb",
  },

  // Okay category (10 reminders)
  {
    message: "you're moving at your own pace, not anyone else's.",
    emotion: "gentle",
    icon: "🦋",
    category: "okay",
  },
  {
    message: "small victories still count as victories.",
    emotion: "soft",
    icon: "🎉",
    category: "okay",
  },
  {
    message: "you're doing your best, and that's beautiful.",
    emotion: "warm",
    icon: "🌸",
    category: "okay",
  },
  {
    message: "every moment is a fresh start if you want it to be.",
    emotion: "gentle",
    icon: "🌅",
    category: "okay",
  },
  {
    message: "you deserve moments of peace. this is one.",
    emotion: "soft",
    icon: "☀️",
    category: "okay",
  },
  {
    message: "you're allowed to feel content. embrace it.",
    emotion: "warm",
    icon: "🌻",
    category: "okay",
  },
  {
    message: "being okay is a gift. savor it.",
    emotion: "gentle",
    icon: "🎁",
    category: "okay",
  },
  {
    message: "you've made it through 100% of your hard days.",
    emotion: "soft",
    icon: "💯",
    category: "okay",
  },
  {
    message: "your calm is a strength, not complacency.",
    emotion: "warm",
    icon: "🧘",
    category: "okay",
  },
  {
    message: "appreciate the quiet moments between storms.",
    emotion: "gentle",
    icon: "🌤️",
    category: "okay",
  },
]

// Helper function to get random reminder
function getRandomReminder(pool: Reminder[] = reminders): Reminder {
  return pool[Math.floor(Math.random() * pool.length)]!
}

// GET /api/reminder - Get a random reminder
app.get("/reminder", (c) => {
  const reminder = getRandomReminder()
  return c.json<ReminderResponse>(reminder, { status: 200 })
})

// GET /api/reminders - Get all reminders
app.get("/reminders", (c) => {
  const response: RemindersResponse = {
    reminders,
    count: reminders.length,
  }
  return c.json(response, { status: 200 })
})

// GET /api/reminders/random - Get a random reminder (alias)
app.get("/reminders/random", (c) => {
  const reminder = getRandomReminder()
  return c.json<ReminderResponse>(reminder, { status: 200 })
})

// GET /api/reminders/category/:id - Get reminders by mood/category
app.get("/reminders/category/:id", (c) => {
  const category = c.req.param("id") as Mood
  const validCategories: Mood[] = [
    "sad",
    "tired",
    "overwhelmed",
    "numb",
    "okay",
  ]

  if (!validCategories.includes(category)) {
    return c.json(
      {
        error:
          "Invalid category. Valid options: sad, tired, overwhelmed, numb, okay",
      },
      { status: 400 }
    )
  }

  const filteredReminders = reminders.filter((r) => r.category === category)

  // Return a random one from the category
  const reminder = getRandomReminder(filteredReminders)
  return c.json<ReminderResponse>(reminder, { status: 200 })
})

// Root endpoint
app.get("/", (c) => {
  return c.json({
    message: "Do You Need a Small Reminder? API",
    totalReminders: reminders.length,
    endpoints: [
      "GET /api/reminder",
      "GET /api/reminders",
      "GET /api/reminders/random",
      "GET /api/reminders/category/:id",
    ],
  })
})

export default app
