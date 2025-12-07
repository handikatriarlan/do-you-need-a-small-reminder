import { useState, useCallback } from "react"

interface FloatingWord {
  id: number
  text: string
}

export function LetItOut() {
  const [inputValue, setInputValue] = useState("")
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([])
  const [showHint, setShowHint] = useState(true)

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
      setShowHint(false)

      // Remove the word after animation completes
      setTimeout(() => {
        setFloatingWords((prev) => prev.filter((w) => w.id !== newWord.id))
      }, 2500)
    },
    [inputValue]
  )

  return (
    <div className="w-full max-w-xs mx-auto px-2">
      {/* Floating words area - positioned above */}
      <div className="relative h-16 mb-2 overflow-hidden pointer-events-none">
        {floatingWords.map((word) => (
          <div
            key={word.id}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 text-primary/70 font-medium text-lg animate-float-up whitespace-nowrap"
          >
            {word.text}
          </div>
        ))}
      </div>

      {/* Label */}
      <p className="text-sm text-center text-muted-foreground/80 mb-3">
        {showHint ? "let go of what weighs you down ✨" : "let it out ✨"}
      </p>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="type a feeling..."
          maxLength={30}
          className="w-full px-5 py-3 rounded-2xl bg-white/60 border border-white/40 text-center text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white/80 transition-all text-base shadow-sm"
          aria-label="Type a feeling to release"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary/70 transition-colors p-1"
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

      {/* Subtle hint */}
      {showHint && (
        <p className="text-xs text-center text-muted-foreground/40 mt-2">
          press enter to release
        </p>
      )}
    </div>
  )
}
