"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
      ) : (
        <Sun className="w-4 h-4 text-slate-600 dark:text-slate-300" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}
