# Atomic Design Structure Guide

This document outlines the atomic design structure we will implement for the Brutalist Hat Store project. It provides guidelines for component categorization, naming conventions, and organization.

## Atomic Design Principles

Our implementation follows Brad Frost's atomic design methodology with adaptations for our React/Next.js project:

1. **Atoms**: Basic building blocks that can't be broken down further
2. **Molecules**: Simple groups of UI elements functioning together
3. **Organisms**: Complex UI components composed of molecules and/or atoms
4. **Templates**: Page-level structures without real content
5. **Pages**: Specific instances of templates with real content

## Directory Structure

```
src/
└── components/
    ├── atoms/        # Fundamental building blocks
    ├── molecules/    # Simple combinations of atoms
    ├── organisms/    # Complex combinations of molecules/atoms
    ├── templates/    # Page layouts without content
    ├── pages/        # Page-specific components
    ├── layouts/      # Layout components
    └── shared/       # Shared utilities and higher-order components
```

## Component Categories

### Atoms
- Basic UI elements that can't be broken down further
- Examples: Button, Input, Typography, Icon, Badge

#### Criteria:
- Single responsibility
- No dependencies on other UI components
- Can have business logic but minimal
- Should be highly reusable

### Molecules
- Simple combinations of atoms forming a cohesive component
- Examples: FormField (Label + Input), Card, SearchBar, NavigationItem

#### Criteria:
- Composed of multiple atoms
- Serves a specific purpose
- Still relatively simple and focused
- Should be reusable in different contexts

### Organisms
- Complex UI sections composed of molecules and atoms
- Examples: Navigation, ProductGrid, CartSummary, Footer

#### Criteria:
- Composed of multiple molecules and/or atoms
- Represents a distinct section of the interface
- Can contain significant business logic
- Less generic, may be more specific to the application

### Templates
- Page-level structures without real content
- Examples: ProductPageTemplate, CheckoutTemplate, HomePageTemplate

#### Criteria:
- Defines the structure of a page
- Composed of organisms, molecules, and atoms
- Uses placeholder content
- Focuses on content structure, not the content itself

### Pages
- Actual page implementations with real content
- Located in the `app/` directory for Next.js App Router

## Naming Conventions

### Component Files
- PascalCase for all component files
- Suffix with component type for clarity (optional)
- Examples: `Button.tsx`, `CardAtom.tsx`, `ProductGridOrganism.tsx`

### Component Props
- Interface named `[ComponentName]Props`
- Example: `ButtonProps`, `CardProps`

### Custom Hooks
- Prefix with `use`
- Camel case
- Example: `useProductData.ts`, `useShoppingCart.ts`

## Implementation Guidelines

### Props and Types
- All components should have well-defined props interfaces
- Use TypeScript for type safety
- Document complex props

### Composition
- Prefer composition over inheritance
- Use React children prop for flexible components
- Implement compound components where appropriate

### Styling
- Use Tailwind CSS consistently
- For complex components, consider CSS modules
- Maintain brutalist aesthetic across all components

### State Management
- Atoms and molecules should be mostly stateless
- Organisms can manage their own state
- Pages/templates coordinate application state
- Use React Context for global state where appropriate

## Documentation Standards

Each component should include:

1. Brief description of purpose
2. Props documentation
3. Usage examples
4. Variations (if applicable)

## Refactoring Strategy

When refactoring existing components:

1. Identify the atomic level of the component
2. Extract smaller components where needed
3. Standardize props and interfaces
4. Move to appropriate directory
5. Update imports in all files
6. Test functionality

## Storybook-style Documentation

While we're not using Storybook, aim to document components with:

- All possible states
- Prop combinations
- Responsive behavior
- Accessibility considerations 