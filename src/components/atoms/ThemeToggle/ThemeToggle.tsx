"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggleProps } from "./types"

/**
 * ThemeToggle component
 * 
 * A brutalist toggle button that switches between "blackYellow" (default) and "pinkBlack" themes.
 * Features smooth animations and visual feedback when toggling themes.
 * 
 * @example
 * <ThemeToggle />
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Ensure component is only rendered client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className={cn("w-10 h-10 theme-border bg-gray-200", className)}></div>
  }
  
  const isPinkTheme = theme === "pinkBlack"
  
  const toggleTheme = () => {
    // Add animation state
    setIsAnimating(true)
    
    // Toggle theme
    setTheme(isPinkTheme ? "blackYellow" : "pinkBlack")
    
    // Reset animation after the transition completes
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative theme-border p-2 transition-all duration-200 ease-in-out",
        "hover:theme-shadow active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
        isAnimating && "animate-brutalist-shake",
        isPinkTheme 
          ? "bg-pink-500 text-black hover:bg-pink-400" 
          : "bg-yellow-300 text-black hover:bg-yellow-400",
        className
      )}
      aria-label={`Switch to ${isPinkTheme ? "black and yellow" : "pink and black"} theme`}
      title={`Switch to ${isPinkTheme ? "black and yellow" : "pink and black"} theme`}
    >
      <span className={cn(
        "relative block transition-opacity duration-200",
        isPinkTheme ? "opacity-100" : "opacity-0"
      )}>
        <Sun className="h-5 w-5 absolute top-0 left-0" />
      </span>
      <span className={cn(
        "relative block transition-opacity duration-200",
        !isPinkTheme ? "opacity-100" : "opacity-0"
      )}>
        <Moon className="h-5 w-5" />
      </span>
    </button>
  )
} 