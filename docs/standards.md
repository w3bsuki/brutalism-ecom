# Development Standards & Best Practices

This document outlines our coding standards, conventions, and best practices for the brutalist e-commerce project. Following these guidelines ensures consistency, maintainability, and quality across the codebase.

## Code Organization

### File & Directory Structure

- Follow the established project structure outlined in `Project-plan.md`
- Maintain the atomic design pattern for components
- Keep files focused on a single responsibility
- Limit file size to 300 lines maximum; split larger files
- Use index files for clean exports

### Component Organization

- One component per file (except for tightly-coupled helper components)
- Use the following order for component elements:
  1. Imports
  2. Types/Interfaces
  3. Constants
  4. Component function
  5. Helper functions (if small and only used by this component)
  6. Exports

### Import Order

Use the following import order pattern:
```tsx
// 1. React and Next.js imports
import { useState, useEffect } from 'react'
import Image from 'next/image'

// 2. External libraries
import { motion } from 'framer-motion'
import { z } from 'zod'

// 3. Components, hooks, and utilities from our codebase
import { Button } from '@/components/atoms/Button'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { formatCurrency } from '@/lib/utils'

// 4. Types
import type { Product } from '@/types'

// 5. Styles (if not using CSS modules or Tailwind directly)
import './styles.css'
```

## Naming Conventions

### General

- Use `camelCase` for variables, functions, methods, and instances
- Use `PascalCase` for components, classes, interfaces, types, and enums
- Use `UPPER_SNAKE_CASE` for constants
- Use `kebab-case` for file names of non-component files
- Use `PascalCase` for component file names

### Components

- Component files should match the component name: `Button.tsx`
- Component directories should match the component name: `Button/`
- Component prop interfaces should be named `{ComponentName}Props`

### CSS Classes with Tailwind

- Use consistent, descriptive class naming
- Break long class strings into multiple lines for readability
- Group related classes together (layout, typography, colors, etc.)
- Consider extracting very complex class combinations to component-level Tailwind classes

## TypeScript Guidelines

- Use TypeScript for all new code
- Avoid using `any` type; use more specific types or `unknown`
- Create reusable interfaces and types in appropriate type files
- Use zod for runtime validations, especially for API data
- Use type inference where it improves readability
- Export shared types from dedicated type files

### Props and Component Types

```tsx
// Define props interface
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// Use with component
export function Button({ 
  variant, 
  size = 'md', 
  children, 
  onClick, 
  disabled = false 
}: ButtonProps) {
  // Component implementation
}
```

## React Patterns

### Functional Components

- Use functional components with hooks exclusively
- Export named components rather than default exports
- Use destructuring for props
- Provide default values for optional props
- Extract complex conditional rendering to variables or helper functions

### Hooks Usage

- Follow React Hooks rules (only call at top level, only call from React functions)
- Create custom hooks for reusable stateful logic
- Keep hooks focused and composable
- Name custom hooks with `use` prefix

### State Management

- Use local state for component-specific UI state
- Use React Context for shared state needed by many components
- Consider jotai for complex shared state with minimal boilerplate
- Prefer lifting state up over deep prop drilling

### Rendering Optimization

- Use memoization (`useMemo`, `useCallback`, `memo`) only when there's a measurable performance benefit
- Apply key prop to list items using stable, unique identifiers
- Avoid anonymous function props where re-rendering is a concern

## Next.js Practices

### Data Fetching

- Use React Server Components for data fetching where appropriate
- Implement proper error and loading states
- Use Suspense for async operations
- Prefer static generation for pages that don't need frequent updates

### Routing

- Use the App Router's nested layout pattern effectively
- Keep route handlers clean and focused
- Use route groups for organizing similar routes
- Use dynamic routes for content-based paths

### Image Optimization

- Always use Next.js `<Image>` component for images
- Specify proper width, height, and alt text for all images
- Use appropriate image formats (WebP, AVIF where supported)
- Implement responsive images with multiple sizes
- Lazy load images below the fold

## Styling with Tailwind CSS

### General Guidelines

- Use Tailwind utility classes directly in components
- Create custom utility classes for frequently used combinations
- Use design token variables for consistent values
- Apply responsive designs using the built-in breakpoint prefixes
- Use Tailwind's theme extension for custom values

### Brutalist Design Implementation

- Emphasize high contrast, bold typography, and exposed structure
- Use raw, unfiltered visual elements aligned with brutalist principles
- Maintain accessibility despite the brutalist aesthetic
- Use custom animation classes that adhere to brutalist motion principles
- Apply intentional "roughness" through consistent patterns

## Accessibility Standards

- All interactive elements must be keyboard accessible
- Maintain adequate color contrast (WCAG AA minimum)
- Provide appropriate ARIA attributes when needed
- Ensure proper heading hierarchy
- Include skip links for keyboard navigation
- Support screen readers with appropriate role attributes
- Test regularly with accessibility tools (axe, Lighthouse)
- Respect user preferences (reduced motion, color scheme)

## Performance Guidelines

- Bundle size monitoring and optimization
- Implement code splitting via dynamic imports
- Lazy load below-fold content and non-critical resources
- Optimize and preload critical assets
- Minimize main thread work
- Implement smart caching strategies
- Follow Core Web Vitals standards

## Testing Approach

### Unit Testing

- Test business logic and utilities thoroughly
- Test individual components in isolation
- Mock external dependencies
- Test happy paths and edge cases
- Maintain high test coverage for critical paths

### Integration Testing

- Test component compositions and interactions
- Test form submissions and user flows
- Test key application features end-to-end
- Simulate realistic user scenarios

### Test Structure

```tsx
// Component tests should follow this pattern
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test default rendering
  })

  it('should handle specific interaction', () => {
    // Test a specific user interaction
  })

  it('should display correct state after action', () => {
    // Test state changes
  })
})
```

## Git & Collaboration Workflow

### Branch Naming

- `feature/feature-name`: New features
- `fix/issue-description`: Bug fixes
- `refactor/scope`: Code refactoring
- `docs/subject`: Documentation updates

### Commit Messages

- Use the imperative mood: "Add feature" not "Added feature"
- Start with a capital letter
- Keep the subject line under 50 characters
- Include the issue/ticket number if applicable
- Provide details in the commit body if needed

### Pull Requests

- Reference relevant issues in PRs
- Keep PRs focused on a single change
- Provide clear descriptions of changes
- Include screenshots for UI changes
- Address all review comments before merging

## Documentation

- Document complex functions and components with JSDoc
- Keep README files updated
- Document known issues and workarounds
- Add inline comments for complex logic
- Create usage examples for reusable components

## Error Handling

- Implement proper error boundaries
- Provide user-friendly error messages
- Log errors appropriately
- Handle edge cases explicitly
- Implement graceful degradation

## Security Practices

- Validate all user inputs
- Sanitize data displayed to users
- Implement proper authentication and authorization
- Follow OWASP security guidelines
- Keep dependencies updated
- Avoid exposing sensitive information

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) 