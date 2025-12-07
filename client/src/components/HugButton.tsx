import { useState, useCallback } from "react"

export function HugButton() {
  const [isHugging, setIsHugging] = useState(false)

  const handleHug = useCallback(() => {
    setIsHugging(true)
    setTimeout(() => setIsHugging(false), 1500)
  }, [])

  return (
    <>
      <button
        onClick={handleHug}
        className="soft-button px-5 py-2 rounded-full bg-gradient-to-r from-soft-pink to-peach text-foreground/80 font-medium text-sm shadow-sm hover:shadow-md transition-all"
        style={{
          background: "linear-gradient(135deg, #ffe4ec 0%, #ffe8e0 100%)",
        }}
        disabled={isHugging}
      >
        send me a small hug 🤗
      </button>

      {/* Hug overlay animation */}
      {isHugging && (
        <div className="hug-overlay">
          <div className="hug-circle animate-hug-pulse" />
        </div>
      )}
    </>
  )
}
