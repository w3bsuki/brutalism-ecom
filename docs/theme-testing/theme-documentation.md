# Brutalist E-commerce Theme Documentation

## Theme System Overview

The Brutalist E-commerce theme system implements a dual-theme approach that supports switching between a yellow/black theme and a pink/black theme. The theme system uses CSS variables to control colors and styling across the entire application.

## Available Themes

### Default Theme: Black/Yellow

Primary accent color: Yellow (`#fde047` - yellow-300)
Secondary background: Light yellow (#fef9c3 - yellow-50)
Button hover: Darker yellow (#facc15 - yellow-400)
Text: Black (#000000)

### Alternate Theme: Black/Pink

Primary accent color: Pink (`#ec4899` - pink-500)
Secondary background: Light pink (#fce7f3 - pink-50) 
Button hover: Darker pink (#db2777 - pink-600)
Text: Black (#000000)

## CSS Variables

The following CSS variables are used throughout the application to control theming:

| Variable Name | Purpose | Yellow Theme Value | Pink Theme Value |
|---------------|---------|-------------------|------------------|
| `--accent-bg` | Primary accent color | `#fde047` (yellow-300) | `#ec4899` (pink-500) |
| `--secondary-bg` | Secondary/light background | `#fef9c3` (yellow-50) | `#fce7f3` (pink-50) |
| `--button-hover-bg` | Button hover background | `#facc15` (yellow-400) | `#db2777` (pink-600) |
| `--text-primary` | Main text color | `#000000` (black) | `#000000` (black) |
| `--text-on-accent` | Text on accent backgrounds | `#000000` (black) | `#ffffff` (white) |

## Usage in Components

### Basic Usage

When styling components, use CSS variables instead of hardcoded colors:

```jsx
// Incorrect - hardcoded color
<div className="bg-yellow-300 text-black">Content</div>

// Correct - using theme variables
<div className="bg-[color:var(--accent-bg)] text-[color:var(--text-primary)]">Content</div>
```

### Common Patterns

#### Buttons

```jsx
<button className="bg-[color:var(--accent-bg)] text-[color:var(--text-primary)] hover:bg-[color:var(--button-hover-bg)]">
  Click Me
</button>
```

#### Decorative Elements

```jsx
<div className="border-2 border-[color:var(--accent-bg)]">
  Content with themed border
</div>
```

#### Text Accents

```jsx
<h2 className="text-3xl font-bold">
  Regular text with <span className="text-[color:var(--accent-bg)]">themed accent</span>
</h2>
```

## Theme Toggle Implementation

The theme toggle is implemented using a combination of React context and localStorage:

1. `ThemeProvider` component wraps the application and provides theme context
2. `ThemeToggle` component allows users to switch between themes
3. Theme preference is stored in localStorage as `brutalist-theme-preference`
4. System preference is respected by default using `prefers-color-scheme` media query

The toggle maintains theme state and ensures it persists between page refreshes.

## Adding New Themed Components

When creating new components:

1. Never use hardcoded color values like `yellow-300` or `pink-500`
2. Always reference theme variables: `var(--accent-bg)`, `var(--secondary-bg)`, etc.
3. Test your component in both themes
4. Consider contrast ratios for accessibility

## Anti-Flash Script

The application includes an anti-flash script in `layout.tsx` that prevents the theme from flashing incorrect colors during page load:

```jsx
// Anti-flash script
<script 
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          const savedTheme = localStorage.getItem('brutalist-theme-preference');
          const systemTheme = window.matchMedia('(prefers-color-scheme: pink)').matches ? 'pink' : 'yellow';
          document.documentElement.dataset.theme = savedTheme || systemTheme;
        } catch (e) {}
      })()
    `,
  }}
/>
```

This script runs before the page renders, ensuring the correct theme is applied immediately.

## Extending the Theme System

To add a new theme:

1. Add a new theme option in `ThemeProvider.tsx`
2. Define CSS variables for the new theme in `globals.css`
3. Update the theme toggle to include the new option
4. Test thoroughly across all components

## Testing Theme Implementation

Use the following documents for testing:

1. `theme-switching-testing.md` - Checklist for theme toggle functionality
2. `cross-browser-testing.md` - Plan for cross-browser compatibility
3. `accessibility-testing.md` - Guide for accessibility verification
4. `theme-testing-script.md` - Step-by-step test script

## Troubleshooting

### Theme Not Applying

- Ensure the element is within the `ThemeProvider` context
- Check that you're using the correct CSS variable names
- Verify your syntax for using CSS variables in Tailwind (use `bg-[color:var(--accent-bg)]` format)

### Theme Flash on Load

- Check that the anti-flash script is properly implemented in `layout.tsx`
- Ensure localStorage is working correctly

### Theme Inconsistencies

- Look for hardcoded color values that should be replaced with variables
- Make sure all components are properly themed
- Test on different browsers and screen sizes 