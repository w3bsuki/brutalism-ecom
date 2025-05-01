# Theme System Documentation

## Overview

This project uses a brutalist theme system with two primary themes:

1. **blackYellow** (default) - Black with yellow accents
2. **pinkBlack** - Black with pink accents

The theme system is built on CSS custom properties (variables) and utility classes to ensure consistent styling throughout the application.

## How to Use the Theme System

### 1. Basic Theme Colors

Instead of hardcoding colors or using direct CSS variables, use the theme utility classes:

```jsx
// Don't do this:
<div className="bg-[color:var(--accent-bg)] text-black">Content</div>

// Do this instead:
<div className="theme-accent-bg text-black">Content</div>
```

### 2. Available Utility Classes

| Utility Class | Purpose | Example |
|---------------|---------|---------|
| `theme-accent-bg` | Background with theme's primary color | `<div className="theme-accent-bg">` |
| `theme-accent-text` | Text with theme's primary color | `<span className="theme-accent-text">` |
| `theme-border` | Standard black border | `<div className="theme-border">` |
| `theme-accent-border` | Border with theme's primary color | `<div className="theme-accent-border">` |
| `theme-shadow` | Standard black shadow | `<div className="theme-shadow">` |
| `theme-accent-shadow` | Shadow with theme's primary color | `<div className="theme-accent-shadow">` |
| `theme-hover-accent` | Hover effect with theme's primary color | `<button className="theme-hover-accent">` |
| `theme-hover-transform` | Subtle transform on hover | `<div className="theme-hover-transform">` |
| `theme-brutalist-card` | Styled card with theme-aware design | `<div className="theme-brutalist-card">` |
| `theme-brutalist-button` | Black button with theme-aware hover | `<button className="theme-brutalist-button">` |
| `theme-brutalist-accent-button` | Accent colored button | `<button className="theme-brutalist-accent-button">` |

### 3. Common Patterns

#### Buttons

```jsx
// Primary button
<button className="theme-brutalist-button">
  Click Me
</button>

// Accent button
<button className="theme-brutalist-accent-button">
  Click Me
</button>

// Custom button with theme utilities
<button className="bg-white text-black theme-border theme-hover-accent">
  Click Me
</button>
```

#### Cards

```jsx
// Standard card with theme styling
<div className="theme-brutalist-card">
  <h3 className="font-bold">Card Title</h3>
  <p>Card content goes here</p>
</div>

// Custom card with theme elements
<div className="bg-white p-4 theme-border theme-accent-shadow">
  <h3 className="theme-accent-text font-bold">Themed Title</h3>
  <p>Content with theme-aware styling</p>
</div>
```

#### Decorative Elements

```jsx
// Accent line
<div className="h-1 w-full theme-accent-bg"></div>

// Corner accent
<div className="absolute -top-1 -right-1 w-3 h-3 theme-accent-bg transform rotate-45"></div>
```

### 4. Programmatically Access Theme

If you need to access the current theme in your components:

```jsx
"use client";

import { useTheme } from "next-themes";

export function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  // Check if using pink theme
  const isPinkTheme = theme === "pinkBlack";
  
  // Change theme programmatically
  const toggleTheme = () => {
    setTheme(isPinkTheme ? "blackYellow" : "pinkBlack");
  };
  
  return (
    // Your component JSX
  );
}
```

### 5. Theme Structure

The theme system uses HSL color format for flexibility:

```css
.blackYellow {
  /* Base color values */
  --theme-hue: 50;
  --theme-saturation: 100%;
  --theme-lightness: 50%;
  
  /* Derived HSL variables */
  --theme-primary: var(--theme-hue) var(--theme-saturation) var(--theme-lightness);
  --theme-primary-light: var(--theme-hue) var(--theme-saturation) 60%;
  --theme-primary-dark: var(--theme-hue) var(--theme-saturation) 40%;
}
```

### 6. Adding New Components

When creating new components:

1. Use the utility classes for all theme-related styling
2. Avoid hardcoding colors that should change with themes
3. Use `theme-border` instead of explicit `border-2 border-black`
4. Test your component in both themes

## Debugging Theme Issues

If you encounter theme-related issues:

1. Check that the component is using utility classes, not direct CSS variables
2. Verify that transitions are properly applied for smooth theme changes
3. Ensure hover states properly use theme colors
4. Test in both light and dark mode as well as different themes

## Adding New Themes

To add a new theme:

1. Add a new class in `globals.css` following the pattern of existing themes
2. Set base color values with appropriate HSL values
3. Update the ThemeToggle component to support the new theme option 