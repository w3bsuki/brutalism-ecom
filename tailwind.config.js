const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        // Brutalist theme colors
        brutalist: {
          primary: {
            DEFAULT: "hsl(var(--brutalist-primary))",
            foreground: "hsl(var(--brutalist-primary-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--brutalist-accent))",
            foreground: "hsl(var(--brutalist-accent-foreground))",
          },
          background: "hsl(var(--brutalist-background))",
          foreground: "hsl(var(--brutalist-foreground))",
          highlight: "hsl(var(--brutalist-highlight))",
          button: "hsl(var(--brutalist-button))",
          "button-hover": "hsl(var(--brutalist-button-hover))",
          border: "hsl(var(--brutalist-border))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        "brutalist-shake": {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, 2px)' },
          '20%': { transform: 'translate(3px, -1px)' },
          '30%': { transform: 'translate(-3px, 1px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '50%': { transform: 'translate(-2px, 3px)' },
          '60%': { transform: 'translate(3px, 0px)' },
          '70%': { transform: 'translate(-2px, -1px)' },
          '80%': { transform: 'translate(1px, 2px)' },
          '90%': { transform: 'translate(-1px, -2px)' },
        },
        "pulse-slow": {
          '0%, 100%': { opacity: 0.9 },
          '50%': { opacity: 0.5 },
        },
        accordionOpen: {
          from: { height: 0, opacity: 0 },
          to: { height: "var(--radix-accordion-content-height)", opacity: 1 },
        },
        accordionClosed: {
          from: { height: "var(--radix-accordion-content-height)", opacity: 1 },
          to: { height: 0, opacity: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 30s linear infinite",
        "shine": "shine 8s ease-in-out infinite",
        "brutalist-shake": "brutalist-shake 0.5s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        accordionOpen: "accordionOpen 300ms ease-out",
        accordionClosed: "accordionClosed 300ms ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    // Add a plugin to generate dynamic CSS classes for brutalist theme colors
    function({ addUtilities }) {
      const newUtilities = {
        '.bg-brutalist-accent': { backgroundColor: 'hsl(var(--brutalist-accent))' },
        '.text-brutalist-accent': { color: 'hsl(var(--brutalist-accent))' },
        '.border-brutalist-accent': { borderColor: 'hsl(var(--brutalist-accent))' },
      }
      addUtilities(newUtilities)
    }
  ],
}; 