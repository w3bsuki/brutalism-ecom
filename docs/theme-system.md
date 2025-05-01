# Theme System Documentation

## Overview

The application uses a brutalist theme system with two main themes:

1. **blackYellow** (default) - Black background with yellow accent colors
2. **pinkBlack** - Black background with pink accent colors

The theme system is built on top of [next-themes](https://github.com/pacocoursey/next-themes) with custom CSS variables and utility classes.

## Architecture

### Core Components

- **ThemeProvider** (`src/components/atoms/ThemeProvider/ThemeProvider.tsx`): Wraps the application with theme context
- **ThemeToggle** (`src/components/atoms/ThemeToggle/ThemeToggle.tsx`): Button to toggle between themes
- **Global CSS** (`src/app/globals.css`): Defines theme variables and utility classes

### CSS Variables

Each theme defines a set of CSS variables:

```css
/* Black and Yellow (Default) Brutalist Theme */
.blackYellow {
  --theme-hue: 50;
  --theme-saturation: 100%;
  --theme-lightness: 50%;
  --theme-primary: var(--theme-hue) var(--theme-saturation) var(--theme-lightness);
  --theme-primary-light: var(--theme-hue) var(--theme-saturation) 60%;
  --theme-primary-dark: var(--theme-hue) var(--theme-saturation) 40%;
  /* Additional variables... */
}

/* Pink and Black Brutalist Theme */
.pinkBlack {
  --theme-hue: 330;
  --theme-saturation: 100%;
  --theme-lightness: 60%;
  /* Additional variables... */
}
```

### Utility Classes

For better consistency and easier maintenance, the system provides utility classes:

```css
.theme-accent-bg {
  @apply bg-[color:hsl(var(--theme-primary))];
}

.theme-accent-text {
  @apply text-[color:hsl(var(--theme-primary))];
}

.theme-border {
  @apply border-2 border-black;
}

/* Additional utility classes... */
```

## Usage Guidelines

### Do's
- ✅ Use theme utility classes for colors that should change with theme
- ✅ Test components in both themes when making changes
- ✅ Place theme-related styles in globals.css

### Don'ts
- ❌ Hardcode color values that should change with theme (e.g., avoid `bg-yellow-400` or `text-pink-500`)
- ❌ Use older theme variables (e.g., `--brutalist-primary`, `--button-bg`) which are only maintained for backward compatibility
- ❌ Override theme styles in component CSS files

### Adding New Components

When creating new components:

1. Use the utility classes for theme-specific styling
2. Test the component in both themes
3. Use the `theme-` prefixed classes for any elements that should change with the theme

### Adding a New Theme

To add a new theme:

1. Add the theme class in globals.css following the pattern of existing themes
2. Add the theme name to the `themes` array in ThemeProvider
3. Update the ThemeToggle component to handle the new theme option
4. Test existing components in the new theme

## Testing

Follow the checklist in `docs/theme-testing/theme-switching-testing.md` to ensure proper theme functionality. 