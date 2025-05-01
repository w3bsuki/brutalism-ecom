"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * ThemeProvider component
 * 
 * A wrapper around next-themes that provides theme context to the application.
 * 
 * Our theme system supports two brutalist themes:
 * - blackYellow: Black background with yellow accent colors (default)
 * - pinkBlack: Black background with pink accent colors
 * 
 * Theme configuration:
 * 1. Each theme defines CSS variables in globals.css with --theme-primary as the main color
 * 2. Utility classes (theme-accent-bg, theme-accent-text, etc.) use these variables
 * 3. Component styles should use utility classes instead of direct color values
 * 
 * The theme is stored in localStorage under the key "theme" and also respects
 * the user's system preferences when first loaded.
 * 
 * @example
 * <ThemeProvider attribute="class" defaultTheme="blackYellow" enableSystem>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 