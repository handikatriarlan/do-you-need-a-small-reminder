import { useState, useCallback } from "react"

interface FloatingWord {
  id: number
  text: string
}

export function LetItOut() {
  const [inputValue, setInputValue] = useState("")
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!inputValue.trim()) return

      const newWord: FloatingWord = {
        id: Date.now(),
        text: inputValue.trim(),
      }

      setFloatingWords((prev) => [...prev, newWord])
      setInputValue("")

      setTimeout(() => {
        setFloatingWords((prev) => prev.filter((w) => w.id !== newWord.id))
      }, 2500)
    },
    [inputValue]
  )

  return (
    <div className="w-full">
      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-foreground/10" />
        <p className="text-xs text-muted-foreground/50">let it go ✨</p>
        <div className="flex-1 h-px bg-foreground/10" />
      </div>

      {/* Floating words area */}
      <div className="relative h-14 mb-2 overflow-hidden pointer-events-none">
        {floatingWords.map((word) => (
          <div
            key={word.id}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 text-primary/70 font-medium text-lg animate-float-up whitespace-nowrap"
          >
            {word.text}
          </div>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="type what weighs you down..."
          maxLength={30}
          className="w-full px-5 py-3.5 rounded-2xl bg-white/60 border border-white/40 text-center text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white/80 transition-all text-base shadow-sm"
          aria-label="Type a feeling to release"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary/70 transition-colors p-1.5 rounded-full hover:bg-white/50"
          aria-label="Release the word"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </form>

      <p className="text-xs text-center text-muted-foreground/40 mt-2">
        press enter to release
      </p>
    </div>
  )
}
